import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

type Props = {
  id: number
}

export const vote = async ({ id }: Props) => {
  const circuit = new ethers.Contract(contract_address, abi, signer)
  try {
    await circuit.vote(id)
    return 'You Voted'
  } catch (error) {
    console.error(error)
    return 'Transaction error'
  }
}
