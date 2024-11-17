import React from 'react';
import { ScrollContainer } from "../style/RecommendedDiscussionsAndBooksStyle";
import DiscussionRoomCard from '../components/DiscussionRoomCard';



function DiscussionList({rooms}) {
    return (
        <ScrollContainer>
            {rooms.map((room) => (
                <DiscussionRoomCard key={room.roomId} room={room} />
            ))}
        </ScrollContainer>
    );
}

export default DiscussionList;
