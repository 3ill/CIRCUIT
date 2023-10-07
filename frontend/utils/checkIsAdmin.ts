import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

type Props = {
  memberAddress: string
}

export const checkIsAdmin = async ({ memberAddress }: Props) => {
  const circuit = new ethers.Contract(contract_address, abi, signer)

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
