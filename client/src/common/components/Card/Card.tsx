import React, {MouseEventHandler, useState} from 'react';
import FavIconDefault from "../../../assets/Favorites/sprites/Fav.svg";
import FavIconAdded from "../../../assets/Favorites/sprites/FavIconAdded.svg";
import {appActions} from "../../../app/appSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import './Card.css'
import {Photos} from "../../api/types";
import {Tooltip} from "../Tooltip/Tooltip";
import {FullScreenImage} from "../FullScreenImage/FullScreenImage";

type Props = {
    photo: Photos
    isDescription?: boolean
}

export const Card = ({photo, isDescription}: Props) => {
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0});
    const [fullScreen, setFullScreen] = useState(false)

    const dispatch = useAppDispatch();

    const addFavorites = (albumId: string, photoId: string) => {
        dispatch(appActions.toggleFavorites({photoId, albumId}))
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setVisible(true);
        setPosition({x: event.clientX, y: event.clientY});
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setPosition({x: event.clientX, y: event.clientY});
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    const handleToggleFullScreen = () => {
        setFullScreen(!fullScreen)
    }

    const handlerAddFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        addFavorites(photo.albumId, photo.id)
    }

    const isFavorite = photo.isFavorite
    const icon = isFavorite ? FavIconAdded : FavIconDefault

    return (
        <div className='photo__body'
             onMouseEnter={handleMouseEnter}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             onClick={handleToggleFullScreen}>

            <img src={photo.url} alt=""/>

            <button className='button' onClick={handlerAddFavorite}
                    onMouseEnter={handleMouseLeave}>

                <img src={icon} alt='icon'/>
            </button>

            {fullScreen && <FullScreenImage onClose={handleToggleFullScreen} src={photo.url}/>}

            {visible && !isFavorite && !fullScreen && <Tooltip position={position} text={photo.title}/>}

            {isDescription && <p className='description'>{photo.title}</p>}
        </div>
    );
};

