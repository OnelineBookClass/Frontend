import styled from "styled-components";
import ButtonStyled from "@mui/material/Button";
export const DiscussionTitle = styled.div`
  margin-top: 3rem;
  font-size: clamp(1rem, 5vw, 2rem);
  text-align: left;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  :hover {
    background: lightgrey;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* 제목과 버튼을 양 끝으로 배치 */
  align-items: center;
  width: 100%;
`;

export const StyledButton = styled(ButtonStyled)`
  font-size: 1rem; 
  padding: 0.5rem 1rem; 
  background-color: white;
  border-radius: 1rem;
  color: black;
  box-shadow: none; 
  &:hover {
    background-color: #000000; 
    color : white;
  }
`;