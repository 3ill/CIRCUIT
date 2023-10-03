import { ethers } from 'ethers'
import { abi } from './abi'
const contractAddress = process.env.CONTRACT_ADDRESS || 'defaultcontractaddress'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const getAllProposals = async () => {
  const circuit = new ethers.Contract(contractAddress, abi, signer)

  try {
    const allProposals = await circuit.getAllProposals()
    return allProposals
  } catch (error) {
    console.error(error)
  }
}
