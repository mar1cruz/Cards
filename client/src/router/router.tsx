import {createBrowserRouter, Navigate} from "react-router-dom";
import {Catalog} from "../common/components/Catalog/Catalog";
import {Favorites} from "../common/components/Favorites/Favorites";
import App from "../app/App/App";
import './../index.css'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Navigate to='/catalog'/>,
            },
            {
                path: '/catalog',
                element: <Catalog/>,
            },
            {
                path: '/favorites',
                element: <Favorites/>,
            },
        ]
    },
])