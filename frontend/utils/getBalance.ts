import { ethers } from 'ethers'
import { tokenABI } from './tokenAbi'
import { TOKEN_ADDRESS } from './keys'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

export const getBalance = async (address: string) => {
  const surge = new ethers.Contract(TOKEN_ADDRESS, tokenABI, signer)

  try {
    const balance = await surge.balanceOf(address)

    const formattedBalance = ethers.utils.formatUnits(balance)

    return formattedBalance.toString()
  } catch (error) {
    console.error(error)
  }
}
