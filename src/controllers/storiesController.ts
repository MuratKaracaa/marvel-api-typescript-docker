import { Request, Response } from 'express'

import { getAsync, keysAsync } from '../utils/redisConfig'
import { Story } from '../utils/types'
import { fetchAndCache } from '../utils/cache'

async function storiesAPI(req: Request, res: Response): Promise<any> {
    const keys: string[] = await keysAsync('*')
    const stories: string[] = keys.filter((key) =>
        key.includes('/public/stories')
    )
    const storiesData: Story[] = []
    for await (const story of stories) {
        const data = await getAsync(story)
        if (data) {
            storiesData.push(JSON.parse(data))
        }
    }

    const { storyID }: any = req.params

    if (storyID) {
        const story: Story | undefined = storiesData.find(
            (data) => data.id === +storyID
        )

        if (story) {
            const { category }: any = req.params
            if (!category) {
                return res.status(200).json(story)
            } else if (category === 'events') {
                return res.status(200).json(story.events.items)
            } else if (category === 'characters') {
                return res.status(200).json(story.characters.items)
            } else if (category === 'series') {
                return res.status(200).json(story.series.items)
            } else if (category === 'comics') {
                return res.status(200).json(story.comics.items)
            } else if (category === 'creators') {
                return res.status(200).json(story.creators.items)
            } else {
                return res
                    .status(400)
                    .send({ errorMessage: 'category doesnt exist' })
            }
        } else {
            try {
                const baseURI: string =
                    'http://gateway.marvel.com/v1/public/stories/'
                const storyToFetch: string = baseURI + storyID
                return fetchAndCache(storyToFetch).then(() => {
                    storiesAPI(req, res)
                })
            } catch (error) {
                return res
                    .status(400)
                    .send({ errorMessage: "story doesn't exist." })
            }
        }
    }

    return res.status(200).json(storiesData)
}

export default storiesAPI
