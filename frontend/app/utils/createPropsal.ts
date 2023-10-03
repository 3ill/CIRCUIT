import { ethers } from 'ethers'
import { abi } from './abi'

const contractAddress = ''

export const createProposal = async ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const signer = provider.getSigner()

  const circuit = new ethers.Contract(contractAddress, abi, signer)

  try {
    const tx = await circuit.createProposal(title, description)
    await tx.wait()
    return 'Proposal Successfully Created'
  } catch (error) {
    console.log(error)
    return 'Proposal Failed'
  }
}
