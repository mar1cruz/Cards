import React from 'react';
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const PlusIcon = () => {
    return (
        <IconButton color={"info"} sx={{padding: 0}}>
            <AddCircleIcon sx={{width: '32px', height: '32px'}}/>
        </IconButton>
    );
};

