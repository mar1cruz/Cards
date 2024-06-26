import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Album, Photos, status, Users} from "../common/api/types";
import {usersAPI} from "../common/api/api";

const initialState: {
    users: Users[];
    albums: Record<string, Album[]>
    photos: Record<string, Photos[]>
    favorites: Photos[]
    appStatus: status
} = {
    users: [],
    albums: {},
    photos: {},
    favorites: [],
    appStatus: 'idle'
};

export const getUsers = createAsyncThunk('app/getUsers', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const response = await usersAPI.getUsers();

        dispatch(appActions.setAppStatus({status: 'success'}))
        return response.data;

    } catch (error) {
        dispatch(appActions.setAppStatus({status: 'error'}))
        return rejectWithValue(error);
    }

});

export const getUserAlbum = createAsyncThunk('app/getUserAlbum', async ({id}: { id: string }, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setUserStatus({userId: id, status: 'loading'}))

        const response = await usersAPI.getUserAlbum(id);
        dispatch(appActions.setUserStatus({userId: id, status: 'success'}))


        return {userId: id, albums: response.data};

    } catch (error) {
        dispatch(appActions.setUserStatus({userId: id, status: 'error'}))
        return rejectWithValue(error);
    }
});

export const getPhotos = createAsyncThunk('app/getPhotos', async ({albumId, userId}: {
    albumId: string,
    userId: string
}, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setAlbumStatus({status: 'loading', albumId, userId}))

        const response = await usersAPI.getPhotos(albumId);
        dispatch(appActions.setAlbumStatus({status: 'success', albumId, userId}))

        return {photos: response.data, userId, albumId}

    } catch (error) {
        dispatch(appActions.setAlbumStatus({status: 'error', albumId, userId}))
        return rejectWithValue(error);
    }
});

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleFavorites: (state, action: PayloadAction<{ albumId: string, photoId: string }>) => {
            const {albumId, photoId} = action.payload;
            const photo = state.photos[albumId]?.find(p => p.id === photoId);

            if (photo) {
                photo.isFavorite = !photo.isFavorite;

                if (photo.isFavorite) {
                    state.favorites.push(photo);
                } else {
                    state.favorites = state.favorites.filter(p => p.id !== photoId);
                }
            }
        },
        setAppStatus: (state, action: PayloadAction<{ status: status }>) => {
            state.appStatus = action.payload.status;
        },
        setUserStatus: (state, action: PayloadAction<{ userId: string, status: status }>) => {
            const user = state.users.find(user => user.id === action.payload.userId);

            if (user) {
                user.status = action.payload.status;
            }
        },
        setAlbumStatus: (state, action: PayloadAction<{ albumId: string, userId: string, status: status }>) => {
            const album = state.albums[action.payload.userId].find((al) => al.albumId === action.payload.albumId);

            if (album) {
                album.status = action.payload.status;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.map(u => ({...u, status: 'idle'}));
            })
            .addCase(getUserAlbum.fulfilled, (state, action) => {
                state.albums[action.payload.userId] = action.payload.albums.map(p => ({...p, status: 'idle'}))
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.photos[action.payload.albumId] = action.payload.photos.map(p => ({...p, isFavorite: false}))
            })
    },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
export const appThunks = {getUsers, getUserAlbum, getPhotos};