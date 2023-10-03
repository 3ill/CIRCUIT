import { ethers } from 'ethers'
import { abi } from './abi'
const contractAddress = process.env.CONTRACT_ADDRESS || 'defaultcontractaddress'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

interface Props {
  id: number
};

export const vote = async({id}: Props) => {
  const circuit = new ethers.Contract(contractAddress, abi, signer)
  try {
    await circuit.vote(id);
    return "You Voted"
  } catch (error) { 
    console.error(error);
    return 'Transaction error'
  }
}