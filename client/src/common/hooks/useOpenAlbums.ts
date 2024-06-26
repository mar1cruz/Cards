import {useState} from 'react';
import {useAppDispatch} from "./useAppDispatch";
import {appThunks} from "../../app/appSlice";


export const useOpenAlbums = (id: string, hasAlbums: boolean) => {
    const [isOpenAlbums, setOpenAlbums] = useState(false);
    const dispatch = useAppDispatch();

    const onOpenAlbums = () => {
        if (!isOpenAlbums && !hasAlbums) {
            dispatch(appThunks.getUserAlbum({id}));
        }
        setOpenAlbums(!isOpenAlbums);
    };

    return {isOpenAlbums, onOpenAlbums};
};
