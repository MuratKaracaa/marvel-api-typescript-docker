import redis from 'redis'
import { promisify } from 'util'

const client = redis.createClient({
    port: 6379,
    host: 'redis',
})

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const keysAsync = promisify(client.keys).bind(client)
const setExAsync = promisify(client.setex).bind(client)

export { getAsync, setAsync, keysAsync, setExAsync }
