import React, {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {ControlledAccordions} from '../Accordion/Accordion';
import {appThunks} from '../../../app/appSlice';
import {status, Users} from "../../api/types";
import {Circular} from "../Circular/Circular";

export const Catalog = () => {
    const dispatch = useAppDispatch();
    const users = useSelector<AppRootStateType, Users[]>(state => state.app.users);
    const appStatus = useSelector<AppRootStateType, status>(state => state.app.appStatus)

    useEffect(() => {
        if (!users.length) {
            dispatch(appThunks.getUsers())
        }
    }, [dispatch]);


    return (
        <div className="container">
            {appStatus === 'loading' && <Circular size={80}/>}

            <ul>
                {users.map(user => <ControlledAccordions key={user.id} user={user}/>)}
            </ul>
        </div>
    );
};
