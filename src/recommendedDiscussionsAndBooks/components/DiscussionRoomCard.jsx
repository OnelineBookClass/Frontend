import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function DiscussionRoomCard({ room }) {
    return (
        <Card sx={{ minWidth: 160, flex: '0 0 auto' }}>
            <CardContent>
                <Typography variant="caption" color="textSecondary">
                    태그 : {room.tag}
                </Typography>
                <Box sx={{ height: 80, backgroundColor: '#f5f5f5', mb: 1 }} display="flex" justifyContent="center" alignItems="center">
                    임시 이미지 {room.image}
                </Box>
                <Typography variant="body2" fontWeight="bold">
                    {room.roomTitle}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {room.createdAt} | {room.hostNickname}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DiscussionRoomCard;
