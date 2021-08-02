import { Request, Response } from 'express'

import { getAsync, keysAsync } from '../utils/redisConfig'
import { Comic } from '../utils/types'
import * as aspects from '../lists/imageTypes'
import { fetchAndCache } from '../utils/cache'

async function comicsAPI(req: Request, res: Response): Promise<any> {
    const keys: string[] = await keysAsync('*')
    const comics: string[] = keys.filter((key) =>
        key.includes('/public/comics')
    )
    const comicsData: Comic[] = []
    for await (const comic of comics) {
        const data = await getAsync(comic)
        if (data) {
            comicsData.push(JSON.parse(data))
        }
    }

    const { comicID }: any = req.params

    if (comicID) {
        const comic: Comic | undefined = comicsData.find(
            (data) => data.id === +comicID
        )

        if (comic) {
            const { category }: any = req.params
            if (!category) {
                return res.status(200).json(comic)
            } else if (category === 'events') {
                return res.status(200).json(comic.events.items)
            } else if (category === 'characters') {
                return res.status(200).json(comic.characters.items)
            } else if (category === 'series') {
                return res.status(200).json(comic.series.items)
            } else if (category === 'stories') {
                return res.status(200).json(comic.stories.items)
            } else if (category === 'thumbnail') {
                return res.status(200).json({
                    thumbnail:
                        comic?.thumbnail?.path +
                        aspects.PORTRAIT_ASPECT.portrait_xlarge +
                        comic?.thumbnail?.extension,
                })
            } else if (category === 'creators') {
                return res.status(200).json(comic.creators.items)
            } else {
                return res
                    .status(400)
                    .send({ errorMessage: 'category doesnt exist' })
            }
        } else {
            try {
                const baseURI: string =
                    'http://gateway.marvel.com/v1/public/comics/'
                const comicToFetch: string = baseURI + comicID
                return fetchAndCache(comicToFetch).then(() => {
                    comicsAPI(req, res)
                })
            } catch (error) {
                return res
                    .status(400)
                    .send({ errorMessage: "comic doesn't exist." })
            }
        }
    }

    return res.status(200).json(comicsData)
}

export default comicsAPI
