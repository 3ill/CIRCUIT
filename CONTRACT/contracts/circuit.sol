// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract circuit {
    //! Project Events
    event tokenMinted(address indexed _to, uint256 _quantity);
    event registration(address indexed _memberAddress, Tier _memberTier);
    event removal(address indexed _memberAddress, Tier _memberTier);
    event usernameUpdated(address indexed _memberAddress, string username);
    event profilePictureUpdated(address indexed _memberAddress);
    event PropsalCreated(address indexed _memberAddress, string title);
    event hasVoted(address indexed _memberAddress, uint256 _authority);

    //!Project Enums
    enum ProposalState {
        pending,
        reviewing,
        reviewed
    }

    enum Decision {
        pending,
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
        uint256 time;
    }

    //! Project State
    Rule public daoRule;
    address private immutable owner;
    address[] private councilMembersAddress;

    Member[] public allMembers;
    Proposal[] public allProposals;

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
    mapping(uint256 => Proposal) private proposals;
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

    modifier memberCompliance(address _memberAddress) {
        require(addressToHasMember[_memberAddress] == true, "not a member");
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

    function removeMember(
        address _memberAddress
    ) external memberCompliance(_memberAddress) onlyAdmins {
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

    function updateTier() external memberCompliance(msg.sender) {
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

    function checkUserBalance()
        external
        view
        memberCompliance(msg.sender)
        returns (uint256)
    {
        uint256 userBalance = checkTokenBalance(msg.sender);

        return userBalance;
    }

    function getAllMembers() external view returns (Member[] memory) {
        Member[] memory result = new Member[](memberIds.length);
        for (uint256 i = 0; i < memberIds.length; i++) {
            result[i] = members[memberIds[i]];
        }
        return result;
    }

    function updateProfilePicture(
        string memory _profilePicture
    ) external memberCompliance(msg.sender) {
        require(bytes(_profilePicture).length > 0, "cannot leave fields empty");
        require(addressToHasMember[msg.sender] == true, "Not a member");
        Member storage member = addressToMember[msg.sender];

        member.profilePicture = _profilePicture;
        emit profilePictureUpdated(member.memberAddress);
    }

    //! GOVERNANCE FUNCTIONS
    function createProposal(
        string memory _title,
        string memory _description
    )
        external
        registrationCompliance(_title, _description)
        memberCompliance(msg.sender)
    {
        Member storage member = addressToMember[msg.sender];
        require(
            member.userTier == Tier.silver || member.userTier == Tier.gold,
            "Bronze tier members cannot create proposal"
        );
        Proposal memory newProposal = Proposal({
            id: proposalCounter++,
            proposer: msg.sender,
            title: _title,
            description: _description,
            voteCount: 0,
            voters: new address[](0),
            proposalState: ProposalState.pending,
            decision: Decision.pending,
            time: block.timestamp
        });

        member.proposalsCreated++;

        proposalIds.push(newProposal.id);
        allProposals.push(newProposal);
        proposals[newProposal.id] = newProposal;
        userProposals[msg.sender].push(newProposal);

        emit PropsalCreated(msg.sender, newProposal.title);
    }

    function getAllProposals() external view returns (Proposal[] memory) {
        Proposal[] memory allProposal = new Proposal[](proposalIds.length);

        for (uint256 i = 0; i < proposalIds.length; i++) {
            allProposal[i] = proposals[proposalIds[i]];
        }

        return allProposal;
    }

    function getUserProposals() external view returns (Proposal[] memory) {
        Member storage member = addressToMember[msg.sender];
        uint256 userProposalCount = 0;

        for (uint256 i = 0; i < member.proposalsCreated; i++) {
            if (userProposals[msg.sender][i].proposer == msg.sender) {
                userProposalCount++;
            }
        }

        Proposal[] memory userProposal = new Proposal[](userProposalCount);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < member.proposalsCreated; i++) {
            if (userProposals[msg.sender][i].proposer == msg.sender) {
                userProposal[currentIndex] = userProposals[msg.sender][i];
                currentIndex++;
            }
        }

        return userProposal;
    }

    function getApprovedProposals() external view returns (Proposal[] memory) {
        uint256 approvedProposalCount = 0;

        for (uint256 i = 0; i < allProposals.length; i++) {
            if (allProposals[i].decision == Decision.approved) {
                approvedProposalCount++;
            }
        }

        Proposal[] memory approvedProposals = new Proposal[](
            approvedProposalCount
        );

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < allProposals.length; i++) {
            if (allProposals[i].decision == Decision.approved) {
                approvedProposals[currentIndex] = allProposals[i];
                currentIndex++;
            }
        }

        return approvedProposals;
    }

    function vote(uint256 _proposalID) external memberCompliance(msg.sender) {
        Member storage member = addressToMember[msg.sender];
        uint256 voteTimeLimit = 2 days;

        require(_proposalID < allProposals.length, "Invalid proposal ID");
        Proposal storage proposal = allProposals[_proposalID];

        for (uint256 i = 0; i < proposal.voters.length; i++) {
            require(
                proposal.voters[i] != msg.sender,
                "You have already voted on this proposal"
            );
        }

        require(
            proposal.proposalState == ProposalState.pending ||
                proposal.proposalState == ProposalState.reviewing,
            "This proposal has already been reviewed"
        );
        require(
            block.timestamp <= proposal.time + voteTimeLimit,
            "voting time has elapsed"
        );

        proposal.voteCount += member.authority;

        if (proposal.proposalState == ProposalState.pending) {
            proposal.proposalState = ProposalState.reviewing;
        }

        member.proposalsParticipated++;
        proposal.voters.push(msg.sender);
        emit hasVoted(msg.sender, member.authority);
    }

    function updateMemberEligibility()
        external
        view
        memberCompliance(msg.sender)
    {
        assignEligibility(msg.sender);
    }

    function approveProposal(uint256 _proposalId) external onlyCouncilMembers {
        require(_proposalId < allProposals.length, "Invalid proposal ID");
        Proposal storage proposal = allProposals[_proposalId];
        proposal.decision = Decision.approved;
    }

    function rejectProposal(uint256 _proposalId) external onlyCouncilMembers {
        require(_proposalId < allProposals.length, "Invalid proposal ID");
        Proposal storage proposal = allProposals[_proposalId];
        proposal.decision = Decision.rejected;
    }

    function assignCouncilRole(
        address _memberAddress
    ) external onlyAdmins memberCompliance(msg.sender) {
        Member storage member = addressToMember[_memberAddress];
        require(!member.isCouncilMember, "already a council member");

        require(
            member.userTier == Tier.gold,
            "Only gold tier users can be council members"
        );
        member.isCouncilMember = true;
        councilMemberCounter++;
    }

    function revokeCouncilRole(
        address _memberAddress
    ) external onlyAdmins memberCompliance(msg.sender) {
        Member storage member = addressToMember[_memberAddress];
        require(member.isCouncilMember, "not a council member");

        member.isCouncilMember = false;
        councilMemberCounter--;
    }

    function assignAdminRole(
        address _memberAddress
    ) external onlyOwner memberCompliance(_memberAddress) {
        Member storage member = addressToMember[_memberAddress];

        require(!member.isAdmin, "already an admin");

        require(
            member.userTier == Tier.gold || member.userTier == Tier.silver,
            "Only gold or silver tier members can be assigned as administrators"
        );

        member.isAdmin = true;
        adminCounter++;
    }

    function revokeAdminRole(
        address _memberAddress
    ) external onlyOwner memberCompliance(_memberAddress) {
        Member storage member = addressToMember[_memberAddress];

        require(member.isAdmin, "not an admin");

        member.isAdmin = false;
        adminCounter--;
    }

    function checkIsAdmin(
        address _memberAddress
    ) external view memberCompliance(_memberAddress) returns (bool) {
        Member memory member = addressToMember[_memberAddress];

        return member.isAdmin;
    }

    function checkIsCouncilMember(
        address _memberAddress
    ) external view memberCompliance(_memberAddress) returns (bool) {
        Member memory member = addressToMember[_memberAddress];
        return member.isCouncilMember;
    }

    function checkIsEligible(
        address _memberAddress
    ) external view memberCompliance(_memberAddress) returns (bool) {
        Member memory member = addressToMember[_memberAddress];
        return member.eligibility;
    }

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

    function updateProposalState(uint256 _proposalId) internal {
        Proposal storage proposal = allProposals[_proposalId];
        proposal.proposalState = ProposalState.reviewed;
    }

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
