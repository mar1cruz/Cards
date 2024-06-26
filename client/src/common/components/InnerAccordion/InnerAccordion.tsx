import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {PlusIcon} from '../../ui/PlusIcon';
import {MinusIcon} from '../../ui/MinusIcon';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import styles from './InnerAccordion.module.scss';
import {Card} from '../Card/Card';
import {useAccordionState} from "../../hooks/useAccordionState";
import {useOpenPhotos} from "../../hooks/useOpenPhotos";
import {Photos, ResponseAlbum, status} from "../../api/types";
import {Circular} from "../Circular/Circular";

type Props = {
    album: ResponseAlbum;
};

export const InnerAccordion = React.memo(({album}: Props) => {
    const {userId, albumId, title} = album;
    const photos = useSelector<AppRootStateType, Photos[]>(state => state.app.photos[albumId]);
    const albumStatus = useSelector<AppRootStateType, status | undefined>(state => state.app.albums[album.userId].find(user => user.albumId === albumId)?.status);
    const hasPhotos = photos && photos.length > 0;

    const {expanded, handleChange} = useAccordionState();
    const {isOpenPhotos, onOpenPhotos} = useOpenPhotos(userId, albumId, hasPhotos);

    const activeIcon = expanded === albumId ? <MinusIcon/> : <PlusIcon/>;

    return (
        <Accordion expanded={expanded === albumId} onChange={handleChange(albumId)} sx={{boxShadow: 'none'}}>
            <AccordionSummary
                sx={{
                    flexDirection: 'row-reverse',
                    gap: '24px',
                    minHeight: 'auto',
                    boxShadow: 'none',
                    padding: '24px 72px 24px 56px',
                    margin: '0',
                    borderRadius: 0,
                    '& .MuiAccordionSummary-content': {
                        margin: 0,
                        padding: 0,
                        '&.Mui-expanded': {
                            margin: 0
                        }
                    },
                }}
                expandIcon={activeIcon}
                aria-controls={`panel${albumId}-content`}
                id={`panel${albumId}-header`}
                onClick={onOpenPhotos}>

                <p className={styles.title}>{title}</p>
            </AccordionSummary>

            <AccordionDetails className={albumStatus === 'loading' ? '' : styles.photos__wrapper}
                              sx={{paddingBottom: '0'}}>

                {albumStatus === 'loading' &&
                    <div style={{height: '100px', position: 'relative'}}><Circular size={40}/></div>}

                {photos?.map((photo) => (
                    <Card key={photo.id} photo={photo}/>
                ))}
            </AccordionDetails>

        </Accordion>
    );
});
