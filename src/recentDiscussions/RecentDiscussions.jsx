import React from "react";
import styled from "styled-components";
import Title from "./components/Title";
import StyledHr from "./components/StyledHr";
import CreateRoomButton from "./components/CreateRoomButton";
import SearchInput from "./components/SearchInput";
import RoomList from "./components/RoomList";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;
    margin-bottom: 2rem;
`;



function RecentDiscussions() {

    const rooms = [{
        id : 1,
        roomName : "작은 아씨들",
        personnel : "8/10",
        hashtag : "#Novel"
       
    },
    {
        id : 2,
        roomName : "인간 실격",
        personnel : "5/10",
        hashtag : "#Philosopy"
       
    },
    {
        id : 3,
        roomName : "작은 아씨들",
        personnel : "8/10",
        hashtag: "#Novel"
       
    },
    {
        id : 4,
        roomName : "인간 실격",
        personnel : "6/10",
        hashtag : "#Philosopy"
       
    }, {
        id : 5,
        roomName : "인간 실격",
        personnel : "6/10",
        hashtag : "#Philosopy"
       
    },
    {
        id : 6,
        roomName : "인간 실격",
        personnel : "6/10",
        hashtag : "#Philosopy"
       
    }, {
        id : 7,
        roomName : "인간 실격2",
        personnel : "6/10",
        hashtag : "#Philosopy"
       
    }]

    return (
        <Container>
            <Title>최신 토론방 목록</Title>
            <StyledHr />
            <CreateRoomButton />
            <SearchInput />
            <RoomList rooms = {rooms}></RoomList>
        </Container>
    );
}

export default RecentDiscussions;
