import { Request, Response } from 'express'

import { getAsync, keysAsync } from '../utils/redisConfig'
import { Event } from '../utils/types'
import * as aspects from '../lists/imageTypes'
import { fetchAndCache } from '../utils/cache'

async function eventsAPI(req: Request, res: Response): Promise<any> {
    const keys: string[] = await keysAsync('*')
    const events: string[] = keys.filter((key) =>
        key.includes('/public/events')
    )
    const eventsData: Event[] = []
    for await (const event of events) {
        const data = await getAsync(event)
        if (data) {
            eventsData.push(JSON.parse(data))
        }
    }

    const { eventID }: any = req.params

    if (eventID) {
        const event: Event | undefined = eventsData.find(
            (data) => data.id === +eventID
        )

        if (event) {
            const { category }: any = req.params
            if (!category) {
                return res.status(200).json(event)
            } else if (category === 'comics') {
                return res.status(200).json(event.comics.items)
            } else if (category === 'characters') {
                return res.status(200).json(event.characters.items)
            } else if (category === 'series') {
                return res.status(200).json(event.series.items)
            } else if (category === 'stories') {
                return res.status(200).json(event.stories.items)
            } else if (category === 'thumbnail') {
                return res.status(200).json({
                    thumbnail:
                        event?.thumbnail?.path +
                        aspects.PORTRAIT_ASPECT.portrait_xlarge +
                        event?.thumbnail?.extension,
                })
            } else if (category === 'creators') {
                return res.status(200).json(event.creators.items)
            } else {
                return res
                    .status(400)
                    .send({ errorMessage: 'category doesnt exist' })
            }
        } else {
            try {
                const baseURI: string =
                    'http://gateway.marvel.com/v1/public/events/'
                const eventToFetch: string = baseURI + eventID
                await fetchAndCache(eventToFetch)
                return eventsAPI(req, res)
            } catch (error) {
                return res
                    .status(400)
                    .send({ errorMessage: "event doesn't exist." })
            }
        }
    }

    return res.status(200).json(eventsData)
}

export default eventsAPI
