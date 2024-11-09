import styled from "styled-components";

export const MeetingsSection = styled.section`
    margin-bottom: 30px;
`;

export const SectionTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 15px;
`;

export const MeetingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MeetingItem = styled.div`
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

export const MeetingInfo = styled.div``;

export const MeetingTitle = styled.h3`
    font-size: 16px;
    margin-bottom: 5px;
`;

export const LastActive = styled.p`
    font-size: 14px;
    color: #666;
`;