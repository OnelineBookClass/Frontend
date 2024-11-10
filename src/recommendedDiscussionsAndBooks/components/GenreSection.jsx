import React from 'react';
import { Grid, Box, Avatar, Typography } from '@mui/material';
import GenreButtonComponent from './GenreButton';

const genres = [
    { name: '전체', icon: '📚' },
    { name: '예술', icon: '🎨' },
    { name: '문학', icon: '📘' },
    { name: '어학', icon: '🌐' },
    { name: '철학', icon: '🧠' },
    { name: '심리학', icon: '🔍' },
];

function GenreSection() {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6">장르</Typography>
            <Grid container spacing={2}>
                {genres.map((genre) => (
                    <Grid item xs={4} sm={2} key={genre.name}>
                        <GenreButtonComponent icon={genre.icon} name={genre.name}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: '#e3e3e3', mr: 2 }}>
                                {genre.icon}
                            </Avatar>
                            <Typography variant="body1" sx={{ mr: 1, display : 'inline-flex',alignItems: 'center'}}>
                                {genre.name}
                            </Typography>
                        </GenreButtonComponent>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default GenreSection;
