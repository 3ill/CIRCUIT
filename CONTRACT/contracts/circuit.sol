// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title Circuit
 * @author 3illBaby
 * @notice Still in development
 */

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function mint(address to, uint256 amount) external returns (bool);
}

contract circuit {
    //! Project Events
    event tokenMinted(address indexed _to, uint256 _quantity);
    event registration(address indexed _memberAddress, Tier _memberTier);
    event removal(address indexed _memberAddress, Tier _memberTier);
    event usernameUpdated(address indexed _memberAddress, string username);
    event profilePictureUpdated(address indexed _memberAddress);

    //!Project Enums
    enum ProposalState {
        pending,
        reviewed
    }

    enum Decision {
        approved,
        rejected
    }

    enum Tier {
        gold,
        silver,
        bronze
    }

    //! Project Struct
    struct Rule {
        string rule;
        uint256 lastModified;
    }

    struct Member {
        uint256 id;
        string username;
        string profilePicture;
        address memberAddress;
        uint256 balance;
        Tier userTier;
        uint256 proposalsCreated;
        uint256 proposalsParticipated;
        uint256 authority;
        bool eligibility;
        bool isAdmin;
        bool isCouncilMember;
    }

    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 voteCount;
        address[] voters;
        ProposalState proposalState;
        Decision decision;
    }

    //! Project State
    Rule public daoRule;
    address private immutable owner;
    address[] private councilMembersAddress;

    Member[] public allMembers;

    uint256[] public memberIds;
    uint256[] public proposalIds;
    uint256 public memberCounter = 0;
    uint256 public councilMemberCounter = 0;
    uint256 public proposalCounter = 0;
    uint256 public adminCounter = 0;

    uint256 public surgeMintFee;
    uint256 public surgeInCirculation = 0;
    uint256 public goldTokenQuantity = 100e18;
    uint256 public silverTokenQuantity = 50e18;
    uint256 public bronzeTokenQuantity = 25e18;
    uint256 public goldAuthority = 3;
    uint256 public silverAuthority = 2;
    uint256 public bronzeAuthority = 1;

    mapping(uint256 => Member) public members;
    mapping(address => Tier) private memberTier;
    mapping(address => Member) public addressToMember;
    mapping(address => Proposal) private proposals;
    mapping(address => Proposal[]) private userProposals;
    mapping(address => bool) private addressToHasMember;

    IERC20 public surge;

    //! Project Contstructor
    constructor(
        string memory _daoRules,
        address _tokenAddress,
        uint256 _surgeTokenPrice
    ) {
        Rule memory newDaoRule = Rule({
            rule: _daoRules,
            lastModified: block.timestamp
        });
        daoRule = newDaoRule;
        owner = msg.sender;

        surgeMintFee = _surgeTokenPrice;

        surge = IERC20(_tokenAddress);
    }

    //! Project Modifiers
    modifier onlyCouncilMembers() {
        require(
            addressToMember[msg.sender].isCouncilMember == true,
            "Only councilMembers can call this function"
        );
        _;
    }

    modifier onlyAdmins() {
        require(
            addressToMember[msg.sender].isAdmin == true,
            "only admins can call this function"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function");
        _;
    }

    modifier registrationCompliance(
        string memory _username,
        string memory _profilePicture
    ) {
        require(
            bytes(_username).length > 0 && bytes(_profilePicture).length > 0,
            "can't leave fields blank"
        );
        _;
    }

    //! PROJECT FUNCTIONS
    //? This function updates the Dao Rule
    function updateDaoRules(
        string memory _newRule
    ) external onlyCouncilMembers {
        Rule memory updatedDaoRule = Rule({
            rule: _newRule,
            lastModified: block.timestamp
        });

        daoRule = updatedDaoRule;
    }

    //! TOKEN FUNCTIONS
    //? This function allows users to mint surge tokens
    function mintSurge(uint256 _quantity) external payable {
        require(_quantity > 0, "Invalid Quantity");
        require(
            msg.value >= surgeMintFee,
            "Insufficient funds to complete this transaction"
        );

        surge.transfer(msg.sender, _quantity);

        surgeInCirculation += _quantity;
        address payable contractAddress = payable(address(this));
        contractAddress.transfer(msg.value);

        if (msg.value > surgeMintFee) {
            uint256 refundAmount = msg.value - surgeMintFee;
            address payable senderAddress = payable(msg.sender);
            senderAddress.transfer(refundAmount);
        }

        updateUserBalance(msg.sender);
        assignTier(msg.sender);
        assignAuthority(msg.sender);
        assignEligibility(msg.sender);

        emit tokenMinted(msg.sender, _quantity);
    }

    //! MEMBER FUNCTIONS
    function addMember(
        string memory _username,
        string memory _profilePicture
    ) external registrationCompliance(_username, _profilePicture) {
        require(!addressToHasMember[msg.sender], "Already a member");
        Member storage member = allMembers.push();

        member.id = memberCounter++;
        member.username = _username;
        member.profilePicture = _profilePicture;
        member.memberAddress = msg.sender;
        member.balance = checkTokenBalance(msg.sender);

        member.proposalsCreated = 0;
        member.proposalsParticipated = 0;
        member.authority = 0;
        member.eligibility = assignEligibility(msg.sender);
        member.isAdmin = false;
        member.isCouncilMember = false;

        memberIds.push(member.id);
        members[member.id] = member;
        memberTier[member.memberAddress] = member.userTier;

        addressToMember[member.memberAddress] = member;
        addressToHasMember[member.memberAddress] = true;
        assignTier(member.memberAddress);
        assignAuthority(msg.sender);

        emit registration(member.memberAddress, member.userTier);
    }

    function removeMember(address _memberAddress) external {
        address memberAddress = _memberAddress;
        Member storage member = addressToMember[memberAddress];
        require(member.memberAddress == memberAddress, "Member not found");
        require(
            msg.sender == owner ||
                msg.sender == memberAddress ||
                member.isAdmin,
            "Unauthorized to remove member"
        );

        member.userTier = Tier.bronze;
        member.authority = 1;
        member.eligibility = false;
        if (member.isCouncilMember) {
            member.isCouncilMember = false;
            councilMemberCounter--;
        }
        uint256 memberId = member.id;
        uint256 lastIndex = allMembers.length - 1;
        if (memberId != lastIndex) {
            Member storage lastMember = allMembers[lastIndex];
            allMembers[memberId] = lastMember;
            members[lastMember.id] = member;
        }
        allMembers.pop();
        uint256[] storage newMemberIds = memberIds;
        for (uint256 i = 0; i < newMemberIds.length; i++) {
            if (newMemberIds[i] == memberId) {
                newMemberIds[i] = newMemberIds[newMemberIds.length - 1];
                newMemberIds.pop();
                break;
            }
        }
        delete memberTier[memberAddress];
        memberCounter--;
        emit removal(memberAddress, Tier.bronze);
    }

    function updateUserName(string memory _userName) external {
        require(bytes(_userName).length > 0, "cannot leave username empty");
        require(addressToHasMember[msg.sender] == true, "Not a member");
        Member storage member = addressToMember[msg.sender];
        member.username = _userName;

        emit usernameUpdated(member.memberAddress, _userName);
    }

    function updateTier() external {
        require(addressToHasMember[msg.sender] == true, "Not a member");
        Member storage member = addressToMember[msg.sender];
        updateUserBalance(msg.sender);

        if (member.balance >= goldTokenQuantity) {
            member.userTier = Tier.gold;
        } else if (member.balance >= silverTokenQuantity) {
            member.userTier = Tier.silver;
        } else {
            member.userTier = Tier.bronze;
        }
    }

    function checkUserBalance() external returns (uint256) {
        require(addressToHasMember[msg.sender] == true, "Not a member");
        uint256 userBalance = updateUserBalance(msg.sender);

        return userBalance;
    }

    function getAllMembers() external view returns (Member[] memory) {
        Member[] memory result = new Member[](memberIds.length);
        for (uint256 i = 0; i < memberIds.length; i++) {
            result[i] = members[memberIds[i]];
        }
        return result;
    }

    function updateProfilePicture(string memory _profilePicture) external {
        require(bytes(_profilePicture).length > 0, "cannot leave fields empty");
        require(addressToHasMember[msg.sender] == true, "Not a member");
        Member storage member = addressToMember[msg.sender];

        member.profilePicture = _profilePicture;
        emit profilePictureUpdated(member.memberAddress);
    }

    //! GOVERNANCE FUNCTIONS
    function createProposal() external {}

    function vote() external {}

    function updateMemberEligibility() external {}

    function proposalDecision() external {}

    function updateProposalState() external {}

    function fetchAllProposals() external {}

    //! INTERNAL FUNCTIONS
    function checkTier(address _userAddress) internal view returns (Tier) {
        return addressToMember[_userAddress].userTier;
    }

    function assignTier(address _userAddress) internal returns (Tier) {
        Member storage member = addressToMember[_userAddress];

        if (member.balance >= goldTokenQuantity) {
            member.userTier = Tier.gold;
        } else if (member.balance >= silverTokenQuantity) {
            member.userTier = Tier.silver;
        } else {
            member.userTier = Tier.bronze;
        }

        return member.userTier;
    }

    function assignAuthority(address _userAddress) internal {
        Member storage member = addressToMember[_userAddress];
        Tier newmemberTier = member.userTier;

        if (newmemberTier == Tier.gold) {
            member.authority = goldAuthority;
        } else if (newmemberTier == Tier.silver) {
            member.authority = silverAuthority;
        } else if (newmemberTier == Tier.bronze) {
            member.authority = bronzeAuthority;
        } else {
            member.authority = 1;
        }
    }

    function checkIsAdmin() internal {}

    function checkIsCouncilMember() internal {}

    function checkIsEligible() internal {}

    function assignEligibility(
        address _userAddress
    ) internal view returns (bool) {
        if (
            checkTier(_userAddress) == Tier.gold ||
            checkTier(_userAddress) == Tier.silver
        ) {
            return true;
        } else {
            return false;
        }
    }

    function checkTokenBalance(
        address _address
    ) internal view returns (uint256 _balance) {
        return surge.balanceOf(_address);
    }

    function updateUserBalance(
        address _memberAddress
    ) internal returns (uint256) {
        Member storage member = addressToMember[_memberAddress];
        return member.balance = checkTokenBalance(_memberAddress);
    }

    receive() external payable {}
}
