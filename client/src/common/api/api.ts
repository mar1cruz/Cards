import axios from "axios";
import {ResponseAlbum, ResponsePhotos, ResponseUsers} from "./types";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

export const usersAPI = {
    getUsers: () => {
        return instance.get<ResponseUsers[]>('/users')
    },
    getUserAlbum: (userId: string) => {
        return instance.get<ResponseAlbum[]>(`/albums/${userId}`)
    },
    getPhotos: (albumId: string) => {
        return instance.get<ResponsePhotos[]>(`/photos/${albumId}`)
    }
}


