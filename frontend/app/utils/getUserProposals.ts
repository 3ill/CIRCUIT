import { ethers } from 'ethers'
import { abi } from './abi'
const contractAddress = process.env.CONTRACT_ADDRESS || 'defaultcontractaddress'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const getUserProposals = async () => {
  const circuit = new ethers.Contract(contractAddress, abi, signer)

  try {
    const userProposals = await circuit.getUserProposals()
    return userProposals
  } catch (error) {
    console.error(error)
  }
}
