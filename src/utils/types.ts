interface Thumbnail {
    path: string
    extension: string
}

interface Data {
    items: object[]
}

interface SharedProperties {
    id: number
    name?: string
    title?: string
    fullName?: string
    thumbnail?: Thumbnail
}

export interface Character extends SharedProperties {
    comics: Data
    series: Data
    stories: Data
    events: Data
}

export interface Comic extends SharedProperties {
    series: Data
    characters: Data
    creators: Data
    stories: Data
    events: Data
}

export interface Story extends SharedProperties {
    creators: Data
    characters: Data
    series: Data
    comics: Data
    events: Data
}

export interface Event extends SharedProperties {
    creators: Data
    characters: Data
    stories: Data
    comics: Data
    series: Data
}

export interface Serie extends SharedProperties {
    creators: Data
    characters: Data
    stories: Data
    comics: Data
    events: Data
}

export interface Creator extends SharedProperties {
    comics: Data
    series: Data
    stories: Data
    events: Data
}
