import React from 'react';
import { ScrollContainer } from "../style/RecommendedDiscussionsAndBooksStyle";
import DiscussionRoomCard from '../components/DiscussionRoomCard';

const discussionRooms = [
    { genre: '문학', title: '문학의 세계', tags: ['잔잔한', '20대'], image: '문학 책 이미지' },
    { genre: '어학', title: '영어회화 마스터', tags: ['공포', '충격적인'], image: '어학 책 이미지' },
    { genre: '철학', title: '삶의 의미', tags: ['후기 필독'], image: '철학 책 이미지' },
    { genre: '문학', title: '문학의 세계', tags: ['잔잔한', '20대'], image: '문학 책 이미지' },
    { genre: '어학', title: '영어회화 마스터', tags: ['공포', '충격적인'], image: '어학 책 이미지' },
    { genre: '철학', title: '삶의 의미', tags: ['후기 필독'], image: '철학 책 이미지' },
    { genre: '문학', title: '문학의 세계', tags: ['잔잔한', '20대'], image: '문학 책 이미지' },
    { genre: '어학', title: '영어회화 마스터', tags: ['공포', '충격적인'], image: '어학 책 이미지' },
    { genre: '철학', title: '삶의 의미', tags: ['후기 필독'], image: '철학 책 이미지' },
];

function DiscussionList() {
    return (
        <ScrollContainer>
            {discussionRooms.map((room) => (
                <DiscussionRoomCard key={room.title} room={room} />
            ))}
        </ScrollContainer>
    );
}

export default DiscussionList;
