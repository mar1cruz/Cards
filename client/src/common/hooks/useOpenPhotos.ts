import {useState} from 'react';
import {useAppDispatch} from "./useAppDispatch";
import {appThunks} from "../../app/appSlice";

export const useOpenPhotos = (userId: string, albumId: string, hasPhotos: boolean) => {
    const [isOpenPhotos, setOpenPhotos] = useState(false);
    const dispatch = useAppDispatch();

    const onOpenPhotos = () => {
        if (!isOpenPhotos && !hasPhotos) {
            dispatch(appThunks.getPhotos({userId, albumId}));
        }
        setOpenPhotos(!isOpenPhotos);
    };

    return {isOpenPhotos, onOpenPhotos};
};
