import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {Card} from "../Card/Card";
import {Photos} from "../../api/types";
import emptyImage from './../../../assets/Favorites/sprites/emptyFavorites.svg'
import styles from './Favorites.module.scss'

export const Favorites = () => {
    const favorites = useSelector<AppRootStateType, Photos[]>(state => state.app.favorites);

    return (
        <>
            {favorites.length === 0
                ? <div className={styles.empty__body}>
                    <img className={styles.empty__image} src={emptyImage} alt=""/>
                    <p className={styles.empty__title}>Список избранного пуст</p>
                    <p className={styles.empty__text}>Добавляйте изображения, нажимая на звездочки</p>
                </div>
                : <div className='photo__wrapper'>
                    {favorites.map(favorite => <Card key={favorite.id} photo={favorite} isDescription={true}/>)}
                </div>}
        </>
    );
};

