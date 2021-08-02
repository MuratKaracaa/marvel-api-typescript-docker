import fetch, { Response } from 'node-fetch'

import * as auth from './apiAuth'
import { Character } from './types'

async function fetchCharacters(): Promise<Character[]> {
    const responses: Response[] = []
    const data: Character[] = []

    for (let i = 0; i <= 0; i += 20) {
        const response: Response = await fetch(
            `${
                auth.baseAPIurl + 'characters' + auth.urlSuffix
            }&offset=${i}&limit=5`
        )

        responses.push(response)
    }

    const resolvedResponses = await Promise.all(responses)

    for await (const promise of resolvedResponses) {
        const pageData = await promise.json()
        data.push(...pageData.data.results)
    }

    return data
}

export default fetchCharacters
