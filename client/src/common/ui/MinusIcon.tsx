import React from 'react';
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const MinusIcon = () => {


    return (
        <IconButton color={"info"} sx={{padding: 0}}>
            <RemoveCircleIcon sx={{width: '32px', height: '32px'}}/>
        </IconButton>
    );
};

