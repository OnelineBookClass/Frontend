import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const GenreButton = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    backgroundColor: 'white',
    border: '0.5px solid #d3d3d3',
    cursor: 'pointer',
}));

function GenreButtonComponent({ icon, name }) {
    return (
        <GenreButton>
            <Avatar sx={{ width: 36, height: 36, bgcolor: '#e3e3e3', mr: 2 }}>
                {icon}
            </Avatar>
            <Typography variant="body1" sx={{ mr: 1 }}>
                {name}
            </Typography>
        </GenreButton>
    );
}

export default GenreButtonComponent;
