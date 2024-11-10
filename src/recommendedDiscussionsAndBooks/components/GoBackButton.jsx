import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function GoBackButton() {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <IconButton onClick={handleGoBack} sx={{ position: 'absolute', left: 16, top: 16 }}>
            <ArrowBackIosNewIcon />
        </IconButton>
    );
}

export default GoBackButton;
