import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

interface Props {
  value: number
}

export const mintSurge = async ({ value }: Props) => {
  const circuit = new ethers.Contract(contract_address, abi, signer)

  try {
    const mint = await circuit.mintSurge(value)
    await mint.wait()
    return `Successfully minted ${value} SURGE`
  } catch (error) {
    console.error(error)
    return 'Mint Failed'
  }
}
