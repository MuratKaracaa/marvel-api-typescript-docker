import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cron from 'node-cron'

import { initialCache } from './utils/cache'
import * as routers from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.use('/api/v1/characters', routers.charactersRouter)
app.use('/api/v1/comics', routers.comicsRouter)
app.use('/api/v1/creators', routers.creatorsRouter)
app.use('/api/v1/events', routers.eventsRouter)
app.use('/api/v1/series', routers.seriesRouter)
app.use('/api/v1/stories', routers.storiesRouter)

initialCache().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})

cron.schedule('0 0 0 15 * *', async () => {
    await initialCache()
})
