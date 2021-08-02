import { Request, Response } from 'express'

import { getAsync, keysAsync } from '../utils/redisConfig'
import { Creator } from '../utils/types'
import * as aspects from '../lists/imageTypes'
import { fetchAndCache } from '../utils/cache'

async function creatorsAPI(req: Request, res: Response): Promise<any> {
    const keys: string[] = await keysAsync('*')
    const creators: string[] = keys.filter((key) =>
        key.includes('/public/creators')
    )
    const creatorsData: Creator[] = []
    for await (const creator of creators) {
        const data = await getAsync(creator)
        if (data) {
            creatorsData.push(JSON.parse(data))
        }
    }

    const { creatorID }: any = req.params

    if (creatorID) {
        const creator: Creator | undefined = creatorsData.find(
            (data) => data.id === +creatorID
        )

        if (creator) {
            const { category }: any = req.params
            if (!category) {
                return res.status(200).json(creator)
            } else if (category === 'events') {
                return res.status(200).json(creator.events.items)
            } else if (category === 'series') {
                return res.status(200).json(creator.series.items)
            } else if (category === 'stories') {
                return res.status(200).json(creator.stories.items)
            } else if (category === 'thumbnail') {
                return res.status(200).json({
                    thumbnail:
                        creator?.thumbnail?.path +
                        aspects.PORTRAIT_ASPECT.portrait_xlarge +
                        creator?.thumbnail?.extension,
                })
            } else if (category === 'comics') {
                return res.status(200).json(creator.comics.items)
            } else {
                return res
                    .status(400)
                    .send({ errorMessage: 'category doesnt exist' })
            }
        } else {
            try {
                const baseURI: string =
                    'http://gateway.marvel.com/v1/public/creators/'
                const creatorToFetch: string = baseURI + creatorID
                return fetchAndCache(creatorToFetch).then(() => {
                    creatorsAPI(req, res)
                })
            } catch (error) {
                return res
                    .status(400)
                    .send({ errorMessage: "creator doesn't exist." })
            }
        }
    }

    return res.status(200).json(creatorsData)
}

export default creatorsAPI
