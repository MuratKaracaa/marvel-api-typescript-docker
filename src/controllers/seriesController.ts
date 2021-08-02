import { Request, Response } from 'express'

import { getAsync, keysAsync } from '../utils/redisConfig'
import { Serie } from '../utils/types'
import * as aspects from '../lists/imageTypes'
import { fetchAndCache } from '../utils/cache'

async function seriesAPI(req: Request, res: Response): Promise<any> {
    const keys: string[] = await keysAsync('*')
    const series: string[] = keys.filter((key) =>
        key.includes('/public/series')
    )
    const seriesData: Serie[] = []
    for await (const serie of series) {
        const data = await getAsync(serie)
        if (data) {
            seriesData.push(JSON.parse(data))
        }
    }

    const { serieID }: any = req.params

    if (serieID) {
        const serie: Serie | undefined = seriesData.find(
            (data) => data.id === +serieID
        )

        if (serie) {
            const { category }: any = req.params
            if (!category) {
                return res.status(200).json(serie)
            } else if (category === 'events') {
                return res.status(200).json(serie.events.items)
            } else if (category === 'characters') {
                return res.status(200).json(serie.characters.items)
            } else if (category === 'comics') {
                return res.status(200).json(serie.comics.items)
            } else if (category === 'stories') {
                return res.status(200).json(serie.stories.items)
            } else if (category === 'thumbnail') {
                return res.status(200).json({
                    thumbnail:
                        serie?.thumbnail?.path +
                        aspects.PORTRAIT_ASPECT.portrait_xlarge +
                        serie?.thumbnail?.extension,
                })
            } else if (category === 'creators') {
                return res.status(200).json(serie.creators.items)
            } else {
                return res
                    .status(400)
                    .send({ errorMessage: 'category doesnt exist' })
            }
        } else {
            try {
                const baseURI: string =
                    'http://gateway.marvel.com/v1/public/series/'
                const serieToFetch: string = baseURI + serieID
                return fetchAndCache(serieToFetch).then(() => {
                    seriesAPI(req, res)
                })
            } catch (error) {
                return res
                    .status(400)
                    .send({ errorMessage: "serie doesn't exist." })
            }
        }
    }

    return res.status(200).json(seriesData)
}

export default seriesAPI
