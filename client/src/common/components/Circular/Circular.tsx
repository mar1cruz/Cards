import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
    size: number
}

export const Circular = ({size}: Props) => {
    return (
        <Box sx={{
            position: 'absolute',
            zIndex: '2',
            height: '40px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <CircularProgress size={size} thickness={5}/>
        </Box>
    );
}