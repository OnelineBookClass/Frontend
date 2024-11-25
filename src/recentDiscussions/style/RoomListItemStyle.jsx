import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px;
    width: 100%;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
    }
`;

export const OuterWrapper = styled.div`
    display: flex;
    gap: 24px;
    width: 100%;
    align-items: flex-start;
`;

export const InfoSection = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
`;

export const BookImage = styled.img`
    width: 140px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
`;

export const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const BookTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

export const AuthorText = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin: 0;
`;

export const RoomInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const RoomTitle = styled.h4`
    font-size: 1.1rem;
    font-weight: 500;
    color: #444;
    margin: 0;
`;

export const IntroText = styled.p`
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
    margin: 0;
`;

export const ParticipantsInfo = styled.div`
    font-size: 0.9rem;
    color: #555;
    background: #f5f5f5;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
`;

export const RightWrapper = styled.div`
    padding-left: 16px;
`;

export const TagBadge = styled.div`
    background: #007bff;
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
`;

export const StyledHr = styled.hr`
    margin-top: 20px;
    border: none;
    height: 1px;
    background: #eee;
`;
