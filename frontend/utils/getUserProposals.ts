import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const getUserProposals = async () => {
  const circuit = new ethers.Contract(contract_address, abi, signer)

  try {
    const userProposals = await circuit.getUserProposals()
    return userProposals
  } catch (error) {
    console.error(error)
  }
}
