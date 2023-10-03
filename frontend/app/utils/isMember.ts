import { ethers } from 'ethers'
import { abi } from './abi'

const contractAddress = ''
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const isMember = async ({
  memberAddress,
}: {
  memberAddress: string
}) => {
  const circuit = new ethers.Contract(contractAddress, abi, signer)
  try {
    const validation = await circuit.addressToHasMember(memberAddress)
    await validation.wait()
    if (validation === true) {
      return 'Already a member'
    }
  } catch (error) {
    console.error(error)
  }
}
