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

    function safeMint(address to, uint256 amount) external view returns (bool);
}

contract circuit {
    //! Project Events

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
        bool eligibitiy;
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
    uint256 public memberCounter;
    uint256 public councilMemberCounter;
    uint256 public proposalCounter;
    uint256 public adminCounter;

    uint256 public surgeMintFee;
    uint256 public goldTokenQuantity = 100;
    uint256 public silverTokenQuantity = 50;
    uint256 public bronzeTokenQuantity = 25;

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

    //? This function updates the Dao Rule
    function updateDaoRules() public onlyCouncilMembers {}

    //! TOKEN FUNCTIONS
    //? This function allows users to mint surge tokens
    function mintSurge() external payable {}

    function transferSurge() external {}

    //! MEMBER FUNCTIONS
    function addMember() external {}

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
    function checkTier() internal {}

    function checkIsAdmin() internal {}

    function checkIsCouncilMember() internal {}

    function checkIsEligible() internal {}

    function checkTokenBalance() internal {}
}
