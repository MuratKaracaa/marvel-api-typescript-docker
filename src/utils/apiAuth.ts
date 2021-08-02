import dotenv from 'dotenv'
import crypto from 'crypto-js'

dotenv.config()

const public_key: string = process.env.PUBLIC_KEY!
const private_key: string = process.env.PRIVATE_KEY!

const date = Date.now()
const hash = crypto.MD5(`${date + private_key + public_key}`).toString()

const baseAPIurl = 'http://gateway.marvel.com/v1/public/'
const urlSuffix = `?ts=${date}&apikey=${public_key}&hash=${hash}`

export { public_key, private_key, date, hash, baseAPIurl, urlSuffix }
