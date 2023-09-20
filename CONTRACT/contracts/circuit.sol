// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title Circuit
 * @author 3illBaby
 * @notice Still in development
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external view returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function mint(address to, uint256 amount) external view returns (bool);
}

contract circuit {
    //! Project Events
    event tokenMinted(address indexed _to, uint256 _quantity);
    event registration(address indexed _memberAddress, Tier _memberTier);

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
    uint256 public goldTokenQuantity = 100;
    uint256 public silverTokenQuantity = 50;
    uint256 public bronzeTokenQuantity = 25;
    uint256 public goldAuthority = 3;
    uint256 public silverAuthority = 2;
    uint256 public bronzeAuthority = 1;

    mapping(uint256 => Member) public members;
    mapping(address => Tier) private memberTier;
    mapping(address => Member) public addressToMember;
    mapping(address => Proposal) private proposals;
    mapping(address => Proposal[]) private userProposals;

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

        surge.mint(msg.sender, _quantity);
        surgeInCirculation += _quantity;

        emit tokenMinted(msg.sender, _quantity);
    }

    function transferSurge(address _to, uint256 _quantity) external view {
        require(_to != address(0), "address field is empty");
        require(_quantity > 0, "Invalid Quantity");
        require(
            checkTokenBalance(msg.sender) >= _quantity,
            "Insufficient amount of tokens to complete transfer"
        );

        surge.transfer(_to, _quantity);
    }

    //! MEMBER FUNCTIONS
    function addMember(
        string memory _username,
        string memory _profilePicture
    ) external registrationCompliance(_username, _profilePicture) {
        uint256 id = memberCounter++;
        address memberAddress = msg.sender;
        uint256 balance = checkTokenBalance(memberAddress);
        Tier userTier = assignTier(memberAddress);
        uint256 proposalCreated = 0;
        uint256 proposalParticipated = 0;
        uint256 authority = assignAuthority(memberAddress);
        bool eligibility = assignEligibility(memberAddress);

        Member memory newMember = Member({
            id: id,
            username: _username,
            profilePicture: _profilePicture,
            memberAddress: memberAddress,
            balance: balance,
            userTier: userTier,
            proposalsCreated: proposalCreated,
            proposalsParticipated: proposalParticipated,
            authority: authority,
            eligibility: eligibility,
            isAdmin: false,
            isCouncilMember: false
        });

        memberIds.push(newMember.id);
        members[newMember.id] = newMember;
        memberTier[newMember.memberAddress] = newMember.userTier;
        allMembers.push(newMember);
        addressToMember[newMember.memberAddress] = newMember;
        memberCounter++;

        emit registration(newMember.memberAddress, newMember.userTier);
    }

    function removeMember() external {}

    function updateUserName() external {}

    function getAllMembers() external {}

    function updateProfilePicture() external {}

    function upgradeTier() external {}

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

    function assignTier(address _userAddress) internal view returns (Tier) {
        Member memory member = addressToMember[_userAddress];

        if (member.balance >= goldTokenQuantity) {
            member.userTier = Tier.gold;
        } else if (member.balance >= silverTokenQuantity) {
            member.userTier = Tier.silver;
        } else {
            member.userTier = Tier.bronze;
        }

        return member.userTier;
    }

    function assignAuthority(
        address _userAddress
    ) internal view returns (uint256) {
        Member memory member = addressToMember[_userAddress];

        if (checkTier(_userAddress) == Tier.gold) {
            member.authority = goldAuthority;
        } else if (checkTier(_userAddress) == Tier.silver) {
            member.authority = silverAuthority;
        } else {
            member.authority = bronzeAuthority;
        }

        return member.authority;
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
}
