import React from 'react';
import styles from './Tooltip.module.scss'

type Props = {
    position: { x: number; y: number };
    text: string
}

export const Tooltip = ({position, text}: Props) => {
    return (
        <div className={styles.tooltip} style={{top: position.y + 30, left: position.x - 67}}>
            {text}
        </div>
    );
};

