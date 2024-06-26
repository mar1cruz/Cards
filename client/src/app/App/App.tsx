import React from 'react';
import styles from './App.module.scss'
import {NavLink, Outlet} from "react-router-dom";

function App() {
    return (
        <div className={styles.App}>
            <nav className={styles.body__link}>
                <NavLink className={({isActive}) => isActive ? styles.active + ' ' + styles.link : styles.link}
                         to={'/catalog'}>Каталог</NavLink>
                <NavLink className={({isActive}) => isActive ? styles.active + ' ' + styles.link : styles.link}
                         to={'/favorites'}>Избранное</NavLink>
            </nav>

            <Outlet/>
        </div>
    );
}

export default App;
