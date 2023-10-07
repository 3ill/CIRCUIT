import { ethers } from 'ethers'
import { abi } from './abi'
import { hexToNumber } from 'viem'
import { contract_address } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const getMemberCount = async () => {
  const circuit = new ethers.Contract(contract_address, abi, signer)
  try {
    const count = await circuit.memberCounter()
    const manualCount = hexToNumber(count)

    return manualCount
  } catch (error) {
    return error
  }
}
