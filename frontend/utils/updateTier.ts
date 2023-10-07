import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const updateTier = async () => {
  const circuit = new ethers.Contract(contract_address, abi, signer)

  try {
    await circuit.updateTier()
    return 'Tier Updated Successfully'
  } catch (error) {
    console.error(error)
  }
}
