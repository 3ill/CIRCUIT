import { contract_address } from './keys'
import { ethers } from 'ethers'
import { abi } from './abi'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const isMember = async ({
  memberAddress,
}: {
  memberAddress: string
}) => {
  if (contract_address) {
    const circuit = new ethers.Contract(contract_address, abi, signer)
    try {
      const validation = await circuit.addressToHasMember(memberAddress)
      console.log(validation)

      if (validation === true) {
        return 'Already a member'
      }
    } catch (error) {
      console.error(error)
    }
  }
}
