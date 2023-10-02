import { ethers } from 'ethers';
import { abi } from './abi';

const contractAddress = '';

export const isMember = async ({ memberAddress }) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const circuit = new ethers.Contract(contractAddress, abi, signer);

    const validation = await circuit.addressToHasMember(memberAddress);

    return validation;
  } catch (error) {
    console.error(error);
  }
};
