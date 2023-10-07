import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

type addMemberProps = {
  name: string
  hash: string
}

export const addMember = async ({ name, hash }: addMemberProps) => {
  const circuit = new ethers.Contract(contract_address, abi, signer)
  try {
    const transaction = await circuit.addMember(name, hash)

    await transaction.wait()

    return 'Member Added'
  } catch (error) {
    console.error(error)
    throw error
  }
}
