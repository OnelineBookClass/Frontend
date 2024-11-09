import styled from "styled-components";
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
  justify-content: space-between; 
  align-items: center;
  width: 100%;
`;