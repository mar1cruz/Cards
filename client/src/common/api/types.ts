export type ResponseUsers = {
    id: string
    name: string
    username: string
    email: string
}

export type ResponseAlbum = {
    albumId: string
    userId: string
    title: string
}

export type ResponsePhotos = {
    albumId: string
    id: string
    title: string
    url: string
}

export type status = 'loading' | 'error' | 'success' | 'warning' | 'idle';

export type Users = ResponseUsers & {
    status: status
}

export type Album = ResponseAlbum & {
    status: status
}

export type Photos = ResponsePhotos & { isFavorite: boolean }