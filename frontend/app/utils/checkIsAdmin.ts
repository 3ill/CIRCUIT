import { ethers } from 'ethers'
import { abi } from './abi'
const contractAddress = process.env.CONTRACT_ADDRESS || 'defaultcontractaddress'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

interface Props {
  memberAddress: string
}

export const checkIsAdmin = async ({ memberAddress }: Props) => {
  const circuit = new ethers.Contract(contractAddress, abi, signer)

  try {
    const isAdmin = await circuit.checkIsAdmin(memberAddress)
    if (isAdmin === true) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return 'An error occurred'
  }
}
