import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {PlusIcon} from '../../ui/PlusIcon';
import {MinusIcon} from '../../ui/MinusIcon';
import {InnerAccordion} from '../InnerAccordion/InnerAccordion';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import styles from './Accordion.module.scss';
import {useAccordionState} from "../../hooks/useAccordionState";
import {useOpenAlbums} from "../../hooks/useOpenAlbums";
import {ResponseAlbum, status, Users} from "../../api/types";
import {Circular} from "../Circular/Circular";


type Props = {
    user: Users;
};

export const ControlledAccordions = React.memo(({user}: Props) => {
    const {id, name} = user;
    const albums = useSelector<AppRootStateType, ResponseAlbum[]>(state => state.app.albums[id]);
    const userStatus = useSelector<AppRootStateType, status | undefined>(state => state.app.users.find(user => user.id === id)?.status);
    const hasAlbums = albums && albums.length > 0;


    const {expanded, handleChange} = useAccordionState();
    const {isOpenAlbums, onOpenAlbums} = useOpenAlbums(id, hasAlbums);

    const activeIcon = expanded === 'panel4' ? <MinusIcon/> : <PlusIcon/>;

    const accordionStyles = {
        flexDirection: 'row-reverse',
        gap: '24px',
        minHeight: 'auto',
        boxShadow: 'none',
        padding: '24px 0',
        margin: '0',
        borderRadius: 0,

        '& .MuiAccordionSummary-content': {
            margin: 0,
            padding: 0,
            '&.Mui-expanded': {
                margin: 0
            }
        },
    }


    return (
        <li>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{boxShadow: 'none'}}>
                <AccordionSummary
                    sx={accordionStyles}
                    expandIcon={activeIcon}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                    onClick={onOpenAlbums}
                >
                    <p className={styles.title}>{name}</p>
                </AccordionSummary>
                <AccordionDetails sx={{padding: 0}}>

                    {userStatus === 'loading' &&
                        <div style={{height: '100px', position: 'relative'}}><Circular size={40}/></div>}

                    {albums?.map(al => (
                        <div key={al.albumId}><InnerAccordion album={al}/></div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </li>
    );
});
