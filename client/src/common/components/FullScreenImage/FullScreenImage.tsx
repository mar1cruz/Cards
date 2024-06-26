import React, {useEffect} from 'react';
import styles from './FullScreenImage.module.scss'

type Props = {
    onClose: () => void
    src: string
}

export const FullScreenImage = ({onClose, src}: Props) => {

    useEffect(() => {
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.classList.add(styles.noScroll);

        return () => {
            document.body.style.paddingRight = originalPaddingRight;
            document.body.classList.remove(styles.noScroll);
        };
    }, []);

    return (
        <div className={styles.full__screen}>
            <div className={styles.close__btn} onClick={onClose}></div>
            <img className={styles.full__screen_image} src={src} alt=""/>
        </div>
    );
};
