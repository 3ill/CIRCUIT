const { ethers } = require('hardhat');
require('dotenv').config();
const { CONTRACT_ADDRESS, GOERLI_URL, PRIVATE_KEY, OWNER } = process.env;

const provider = new ethers.JsonRpcProvider(GOERLI_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const formatter = (value) => {
  return ethers.formatUnits(value);
};

const ethFormatter = (value) => {
  return ethers.formatEther(value);
};

const main = async () => {
  const circuitContract = await ethers.getContractAt(
    'circuit',
    CONTRACT_ADDRESS,
    signer
  );

  //! STATE FUNCTIONS
  //? This function checks the dao rule
  const getDaoRule = await circuitContract.daoRule();
  console.log(getDaoRule);

  //? This function checks the member count
  const getMemberCount = await circuitContract.memberCounter();

  console.log(getMemberCount);

  //? Get council Member Count
  const getCouncilMemberCount = await circuitContract.councilMemberCounter();
  console.log(getCouncilMemberCount);

  //? Get The total number of proposals created
  const getProposalCount = await circuitContract.proposalCounter();
  console.log(getProposalCount);

  //? get the number of admins available
  const getAdminCount = await circuitContract.adminCounter();
  console.log(getAdminCount);

  const getApprovedProposalCount =
    await circuitContract.approvedProposalCounter();
  console.log(getApprovedProposalCount);

  const getRejectedProposalCount =
    await circuitContract.rejectedProposalCounter();
  console.log(getRejectedProposalCount);

  //? get the amount required to mint a surge token
  const getMintPrice = await circuitContract.surgeMintFee();
  console.log(`${ethFormatter(getMintPrice)} ETH`);

  //? get the amount of surge token in circulation
  const getCirculation = await circuitContract.surgeInCirculation();
  console.log(getCirculation);

  //? get the number of token required for gold tier
  const getGoldTokenQuantity = await circuitContract.goldTokenQuantity();
  console.log(`${formatter(getGoldTokenQuantity)}`);

  //? Get the authority value for a gold tier member
  const getGoldAuthorityValue = await circuitContract.goldAuthority();
  console.log(getGoldAuthorityValue);

  //! MEMBER FUNCTIONS
  // const name = 'Thrill';
  // const profilePicture = 'this_is_an_ipfs_address';
  // await circuitContract.addMember(name, profilePicture);

  //? This function checks the users token balance
  const userBalance = await circuitContract.checkUserBalance();
  console.log(userBalance);

  // //? This function gets the member details
  const getMemberDetails = await circuitContract.addressToMember(OWNER);
  console.log(getMemberDetails.username);
  console.log(getMemberDetails.profilePicture);
  let userTier;
  let councilMessage;
  let adminMessage;
  if (formatter(getMemberDetails.userTier) == 0) {
    userTier = 'Gold';
  } else if (formatter(getMemberDetails.userTier) == 1) {
    userTier = 'Silver';
  } else if (formatter(getMemberDetails.userTier) == 2) {
    userTier = 'Bronze';
  }

  if (getMemberDetails.isCouncilMember == false) {
    councilMessage = 'not a council member';
  } else {
    councilMessage = 'A council member';
  }

  if (getMemberDetails.isAdmin == false) {
    adminMessage = 'not a Administrator';
  } else {
    adminMessage = 'An Administrator';
  }

  console.log(userTier);
  //console.log(formatter(getMemberDetails.userTier));
  console.log(councilMessage);
  console.log(adminMessage);

  //? This function returns each member
  // const getAllMembers = await circuitContract.getAllMembers();
  // getAllMembers.map((member) => console.log(member));

  //? This function updates the member username
  let username = '3illbaby';
  // await circuitContract.updateUserName(username);

  let title = 'Genesis Proposal';
  let description = 'This is the initial proposal';
  // await circuitContract.createProposal(title, description);

  //await circuitContract.vote(0);

  // const userProposals = await circuitContract.getUserProposals();
  // console.log(userProposals);

  // await circuitContract.assignAdminRole(OWNER);

  // await circuitContract.assignCouncilRole(OWNER);

  // const getMemberDetail = await circuitContract.addressToMember(OWNER);
  // console.log(getMemberDetail);

  // await circuitContract.approveProposal(0);

  await circuitContract.vote(0);
};

main().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
