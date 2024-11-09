import styled from "styled-components";
export const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start; /* 왼쪽 정렬 */
    position: relative;
    width: 100%; /* Wrapper가 화면 너비를 꽉 채우도록 */
    :hover {
        background: lightgrey;
    }
`;

export const OuterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* 양쪽 끝에 배치 */
    width: 100%; /* 가로 크기 100% */
    align-items: flex-start;
`;

export const ContentText = styled.p`
    font-size: 14px;
    margin: 0;
`;

export const StyledHr = styled.hr`
    width: 100%; /* 구분선의 너비를 100%로 확장 */
    border: 0;
    border-top: 2px solid #ccc; /* 구분선 색 */
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
    margin-top: 8px; /* 구분선과 내용 사이의 간격 */
`;

export const LeftWrapper = styled.div`
    display: flex;
    margin-left: 1rem;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1; /* 이 영역이 가능한 한 왼쪽 끝으로 확장 */
`;

export const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;