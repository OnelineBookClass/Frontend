import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function DiscussionRoomCard({ room }) {
    return (
        <Card sx={{ minWidth: 160, flex: '0 0 auto' }}>
            <CardContent>
                <Typography variant="caption" color="textSecondary">
                    {room.genre}
                </Typography>
                <Box sx={{ height: 80, backgroundColor: '#f5f5f5', mb: 1 }} display="flex" justifyContent="center" alignItems="center">
                    {room.image}
                </Box>
                <Typography variant="body2" fontWeight="bold">
                    {room.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {room.tags.map((tag) => `#${tag}`).join(' ')}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DiscussionRoomCard;
