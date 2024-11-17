import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "./components/Title";
import StyledHr from "./components/StyledHr";
import CreateRoomButton from "./components/CreateRoomButton";
import SearchInput from "./components/SearchInput";
import RoomList from "./components/RoomList";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;
    margin-bottom: 2rem;
`;



function RecentDiscussions() {

    const mockData ={
        "rooms" : [
            {
                "roomId" : 1,
                "roomTitle" : "string",
                "createdAt" : "date",
                "hostNickname" : "string",
                "tag" : "잔잔한"    
            },
            {
                "roomId" : 2,
                "roomTitle" : "string",
                "createdAt" : "date",
                "hostNickname" : "string",
                "tag" : "잔잔한"    
            },
            {
                "roomId" : 3,
                "roomTitle" : "string",
                "createdAt" : "date",
                "hostNickname" : "string",
                "tag" : "잔잔한"    
            },
            {
                "roomId" : 4,
                "roomTitle" : "string",
                "createdAt" : "date",
                "hostNickname" : "string",
                "tag" : "잔잔한"    
            },
            {
                "roomId" : 5,
                "roomTitle" : "string",
                "createdAt" : "date",
                "hostNickname" : "string",
                "tag" : "잔잔한"    
            },
        ]
    }

    const location = useLocation();
    const userId = location.state?.userId;

    const [recentDiscussionsData , setRecentDiscussionsData] = useState(mockData);


    useEffect (()=>{
        const fetchRecentDiscussionsData = async() =>{
            try{
                if(userId){ // 일단 mock 객체를 위해 일단 조건 부여
                    const response = await axiosInstance.get(`/mongdangbul/books/recent`);
                    setRecentDiscussionsData(response.data);
                }
            }
            catch(error){
                console.error("최신 토론 조회 실패");
            }
        };
        fetchRecentDiscussionsData();
    },[])
    return (
        <Container>
            <Title>최신 토론방 목록</Title>
            <StyledHr />
            <CreateRoomButton />
            <SearchInput />
            <RoomList rooms = {recentDiscussionsData.rooms}></RoomList>
        </Container>
    );
}

export default RecentDiscussions;
