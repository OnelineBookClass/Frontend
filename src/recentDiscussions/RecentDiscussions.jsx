import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Title from "../asset/component/Title";
import StyledHr from "./components/StyledHr";
import CreateRoomButton from "./components/CreateRoomButton";
import SearchInput from "./components/SearchInput";
import axiosInstance from "../utils/axiosConfig";
import CloseButton from "../asset/component/CloseButton";
import RoomItems from "../asset/component/RoomItems";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;
    margin-bottom: 10rem;
`;

function RecentDiscussions() {
    const [recentDiscussionsData, setRecentDiscussionsData] = useState([]);

    useEffect(() => {
        const fetchRecentDiscussionsData = async () => {
            try {
                const response = await axiosInstance.get(
                    "/mongdangbul/rooms/list/all"
                );
                setRecentDiscussionsData(response.data);
            } catch (error) {
                console.error("최신 토론 조회 실패:", error);
            } finally {
            }
        };

        fetchRecentDiscussionsData();
    }, []);

    return (
        <Container>
            <Title>최신 모임</Title>
            {/* <StyledHr /> */}
            <CreateRoomButton />
            {/* <SearchInput /> */}
            <RoomItems rooms={recentDiscussionsData && recentDiscussionsData} />
        </Container>
    );
}

export default RecentDiscussions;
