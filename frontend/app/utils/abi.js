export const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_daoRules',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_surgeTokenPrice',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
    ],
    name: 'PropsalCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_authority',
        type: 'uint256',
      },
    ],
    name: 'hasVoted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'profilePictureUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum circuit.Tier',
        name: '_memberTier',
        type: 'uint8',
      },
    ],
    name: 'registration',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum circuit.Tier',
        name: '_memberTier',
        type: 'uint8',
      },
    ],
    name: 'removal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
    ],
    name: 'tokenMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
    ],
    name: 'usernameUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_profilePicture',
        type: 'string',
      },
    ],
    name: 'addMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'addressToHasMember',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'addressToMember',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'profilePicture',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'memberAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
      {
        internalType: 'enum circuit.Tier',
        name: 'userTier',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'proposalsCreated',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalsParticipated',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'authority',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'eligibility',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isAdmin',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isCouncilMember',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adminCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allMembers',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'profilePicture',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'memberAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
      {
        internalType: 'enum circuit.Tier',
        name: 'userTier',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'proposalsCreated',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalsParticipated',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'authority',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'eligibility',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isAdmin',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isCouncilMember',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allProposals',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'proposer',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'voteCount',
        type: 'uint256',
      },
      {
        internalType: 'enum circuit.ProposalState',
        name: 'proposalState',
        type: 'uint8',
      },
      {
        internalType: 'enum circuit.Decision',
        name: 'decision',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'time',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'approveProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'approvedProposalCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'assignAdminRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'assignCouncilRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bronzeAuthority',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bronzeTokenQuantity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'checkIsAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'checkIsCouncilMember',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'checkIsEligible',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'checkUserBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'councilMemberCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'daoRule',
    outputs: [
      {
        internalType: 'string',
        name: 'rule',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'lastModified',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllMembers',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'username',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'profilePicture',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'memberAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
          {
            internalType: 'enum circuit.Tier',
            name: 'userTier',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'proposalsCreated',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'proposalsParticipated',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'authority',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'eligibility',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isAdmin',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCouncilMember',
            type: 'bool',
          },
        ],
        internalType: 'struct circuit.Member[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'proposer',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'voteCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'voters',
            type: 'address[]',
          },
          {
            internalType: 'enum circuit.ProposalState',
            name: 'proposalState',
            type: 'uint8',
          },
          {
            internalType: 'enum circuit.Decision',
            name: 'decision',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        internalType: 'struct circuit.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getApprovedProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'proposer',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'voteCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'voters',
            type: 'address[]',
          },
          {
            internalType: 'enum circuit.ProposalState',
            name: 'proposalState',
            type: 'uint8',
          },
          {
            internalType: 'enum circuit.Decision',
            name: 'decision',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        internalType: 'struct circuit.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUserProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'proposer',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'voteCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'voters',
            type: 'address[]',
          },
          {
            internalType: 'enum circuit.ProposalState',
            name: 'proposalState',
            type: 'uint8',
          },
          {
            internalType: 'enum circuit.Decision',
            name: 'decision',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'time',
            type: 'uint256',
          },
        ],
        internalType: 'struct circuit.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
      {
        internalType: 'address[][]',
        name: '',
        type: 'address[][]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'goldAuthority',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'goldTokenQuantity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'memberCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'memberIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'members',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'profilePicture',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'memberAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
      {
        internalType: 'enum circuit.Tier',
        name: 'userTier',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'proposalsCreated',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalsParticipated',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'authority',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'eligibility',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isAdmin',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isCouncilMember',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
    ],
    name: 'mintSurge',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proposalCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'proposalIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_proposalId',
        type: 'uint256',
      },
    ],
    name: 'rejectProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rejectedProposalCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'removeMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'revokeAdminRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_memberAddress',
        type: 'address',
      },
    ],
    name: 'revokeCouncilRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'silverAuthority',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'silverTokenQuantity',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'surge',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'surgeInCirculation',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'surgeMintFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_newRule',
        type: 'string',
      },
    ],
    name: 'updateDaoRules',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'updateMemberEligibility',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_profilePicture',
        type: 'string',
      },
    ],
    name: 'updateProfilePicture',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'updateTier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_userName',
        type: 'string',
      },
    ],
    name: 'updateUserName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_proposalID',
        type: 'uint256',
      },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];
