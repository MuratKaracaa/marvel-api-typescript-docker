import { Request, Response } from 'express'

import { getAsync, keysAsync } from '../utils/redisConfig'
import { Character } from '../utils/types'
import * as aspects from '../lists/imageTypes'

async function charactersAPI(req: Request, res: Response): Promise<Response> {
    const keys: string[] = await keysAsync('*')
    const characters: string[] = keys.filter((key) =>
        key.includes('/public/characters')
    )
    const charactersData: Character[] = []
    for await (const character of characters) {
        const data = await getAsync(character)
        if (data) {
            charactersData.push(JSON.parse(data))
        }
    }

    const { characterID }: any = req.params

    if (characterID) {
        const character: Character | undefined = charactersData.find(
            (data) => data.id === +characterID
        )

        if (character) {
            const { category }: any = req.params
            if (!category) {
                return res.status(200).json(character)
            } else if (category === 'events') {
                return res.status(200).json(character.events.items)
            } else if (category === 'comics') {
                return res.status(200).json(character.comics.items)
            } else if (category === 'series') {
                return res.status(200).json(character.series.items)
            } else if (category === 'stories') {
                return res.status(200).json(character.stories.items)
            } else if (category === 'thumbnail') {
                return res.status(200).json({
                    thumbnail:
                        character.thumbnail?.path +
                        aspects.PORTRAIT_ASPECT.portrait_xlarge +
                        character.thumbnail?.extension,
                })
            } else {
                return res
                    .status(400)
                    .send({ errorMessage: 'category doesnt exist' })
            }
        } else {
            return res.status(404).send('nope')
        }
    }

    return res.status(200).json(charactersData)
}

export default charactersAPI
