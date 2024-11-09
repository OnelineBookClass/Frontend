import React from "react";
import styled from "styled-components";
import ButtonStyled from "@mui/material/Button";
import UserInfo from "./profile/UserInfo";
import DiscussionList from "./profile/DIscussionList";

const Container = styled.div`
 display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;`;

const Title = styled.div`
    font-weight: bold;
    font-size: clamp(1rem, 5vw, 2rem);
    text-align: left;
    align-items: flex-start;
    margin-bottom: 1rem;
`;

const StyledHr = styled.hr`
  width: 100%; /* 구분선의 너비 */
  border: 0;
  border-top: 2px solid #ccc; /* 구분선 색 */
  margin: 0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
`;


function MyPage() {

    const discussions = [{
        id : 1,
        content : "채식주의자 1",
        date : "2024.10.31"
    },
    {
        id : 2,
        content : "채식주의자 2",
        date : "2024.10.31"
    },
    {
        id : 3,
        content : "채식주의자 3",
        date : "2024.10.31"
    },
    {
        id : 4,
        content : "채식주의자 4",
        date : "2024.10.31"
    },
]
    return (
        <Container>
            <Title>MyPage</Title>
            <StyledHr></StyledHr>

            <UserInfo></UserInfo>
            <ButtonStyled
                variant="contained"
                sx={{
                    padding: "1rem", fontSize: "1.3rem", whiteSpace: "nowrap",
                    backgroundColor: "black", borderRadius : "1rem"
                }}
                white>
                개인정보 수정
            </ButtonStyled>
            <DiscussionList discussions={discussions}>
            </DiscussionList>
        </Container>
    );
}


export default MyPage;
