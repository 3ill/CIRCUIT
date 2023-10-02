import { ethers } from 'ethers'
import { abi } from './abi'

const contractAddress = ''
export const addMember = async ({
  name,
  profilePicture,
}: {
  name: string
  profilePicture: string
}) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const circuit = new ethers.Contract(contractAddress, abi, signer)

    const transaction = await circuit.addMember(name, profilePicture)

    await transaction.wait()

    return 'Member Added'
  } catch (error) {
    console.error(error)
  }
}
