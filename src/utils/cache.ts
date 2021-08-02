import fetch from 'node-fetch'

import { setExAsync, setAsync } from './redisConfig'
import * as auth from './apiAuth'
import fetchCharacters from './fetchAllCharacters'
import { Character } from './types'

const oneWeek = 1 * 60 * 60 * 24 * 7

const initialCache = async (): Promise<void> => {
    const characterData: Character[] = await fetchCharacters()

    const characterBaseUrl: string =
        'http://gateway.marvel.com/v1/public/characters/'

    characterData.forEach(async (character: Character) => {
        const { id } = character
        await setAsync(`${characterBaseUrl + id}`, JSON.stringify(character))
    })
}

const fetchAndCache = async (url: string): Promise<void> => {
    const data = (await (await fetch(url + auth.urlSuffix)).json()).data
        .results[0]
    await setExAsync(url, oneWeek, JSON.stringify(data))
}

export { initialCache, fetchAndCache }
