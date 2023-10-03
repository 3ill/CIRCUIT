import { ethers } from 'ethers'
import { abi } from './abi'
const contractAddress = process.env.CONTRACT_ADDRESS || 'defaultcontractaddress'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const getApprovedProposals = async () => {
  const circuit = new ethers.Contract(contractAddress, abi, signer)
  try {
    const approvedProposals = await circuit.getApprovedProposals()
    return approvedProposals
  } catch (error) {
    console.error(error)
  }
}
