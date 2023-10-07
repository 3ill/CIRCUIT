import { API_KEY, API_SECRET } from './keys'
import { create } from 'kubo-rpc-client'

type UploadToIpfsProps = {
  image: File
}

const auth =
  'Basic ' + Buffer.from(API_KEY + ':' + API_SECRET).toString('base64')
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

export const uploadToIPFS = async ({ image }: UploadToIpfsProps) => {
  try {
    const file = await ipfs.add(image)
    ipfs.pin.add(file.cid)
    return file.cid.toString()
  } catch (error) {
    console.log(error)
    return error
  }
}
