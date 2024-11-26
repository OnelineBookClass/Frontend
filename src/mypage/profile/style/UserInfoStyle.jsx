import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    min-height: 10vh;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
`;

export const InnerContainer = styled.div`
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
`;
export const FixedAvatar = styled(Avatar)`
    background-color: #e9e9e9;
    border: none;
`;
