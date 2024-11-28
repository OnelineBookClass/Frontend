import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { Container, TitleContainer } from "./style/HeaderStyle";
import Title from "../../asset/component/Title";

const ContentContainer = styled.div`
    background: ${(props) =>
        props.isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(26, 41, 63, 0.05)"};
    border-radius: 16px;
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: clamp(1.1rem, 3vw, 1.3rem);
    color: #ff9933;
    margin-bottom: 1rem;
`;

const Content = styled.p`
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    line-height: 1.6;
    margin: 0.5rem 0;
`;

const KeywordContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const Keyword = styled.span`
    background: #ff9933;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
`;

const PerspectiveCard = styled.div`
    background: ${(props) =>
        props.isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(26, 41, 63, 0.08)"};
    padding: 1rem;
    border-radius: 8px;
    margin: 0.5rem 0;
`;

const ParticipantName = styled.span`
    font-weight: bold;
    color: #ff9933;
`;

const BookInfoSection = styled.div`
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: ${(props) =>
        props.isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(26, 41, 63, 0.03)"};
    border-radius: 12px;
`;

const BookThumbnail = styled.img`
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
`;

const BookDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const BookTitle = styled.h2`
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    margin: 0;
`;

const BookAuthor = styled.p`
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    opacity: 0.8;
    margin: 0;
`;

function MyDiscussionRecordPage() {
    const { discussionId } = useParams();
    const [discussionData, setDiscussionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiscussionRecord = async () => {
            try {
                const response = await axiosInstance.get(
                    `/mongdangbul/library/discussion/${discussionId}`
                );
                setDiscussionData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("토론 기록 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscussionRecord();
    }, [discussionId]);

    if (loading) return <div>로딩중...</div>;
    if (!discussionData) return <div>데이터를 불러올 수 없습니다.</div>;

    const { book, summary } = discussionData;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    return (
        <Container>
            <TitleContainer>
                <Title>토론 기록</Title>
            </TitleContainer>

            <ContentContainer>
                <BookInfoSection>
                    <BookThumbnail src={book.thumbnail} alt={book.title} />
                    <BookDetails>
                        <BookTitle>{book.title}</BookTitle>
                        <BookAuthor>{book.author}</BookAuthor>
                        <Content>
                            토론 일시:{" "}
                            {formatDate(discussionData.discussionDate)}
                        </Content>
                        <Content>방 제목: {discussionData.roomTitle}</Content>
                    </BookDetails>
                </BookInfoSection>

                <Section>
                    <SectionTitle>토론 주제</SectionTitle>
                    <Content>{summary.topic}</Content>
                </Section>

                <Section>
                    <SectionTitle>주요 논점</SectionTitle>
                    <Content>{summary.keyPoints}</Content>
                </Section>

                <Section>
                    <SectionTitle>토론자들의 관점</SectionTitle>
                    {Object.entries(summary.perspectives).map(
                        ([name, opinion]) => (
                            <PerspectiveCard key={name}>
                                <ParticipantName>{name}</ParticipantName>:{" "}
                                {opinion}
                            </PerspectiveCard>
                        )
                    )}
                </Section>

                <Section>
                    <SectionTitle>결론</SectionTitle>
                    <Content>{summary.conclusion}</Content>
                </Section>

                <Section>
                    <SectionTitle>주요 키워드</SectionTitle>
                    <KeywordContainer>
                        {summary.keywords.map((keyword) => (
                            <Keyword key={keyword}>{keyword}</Keyword>
                        ))}
                    </KeywordContainer>
                </Section>

                <Section>
                    <SectionTitle>토론의 의의</SectionTitle>
                    {summary.significance.map((point, index) => (
                        <Content key={index}>• {point}</Content>
                    ))}
                </Section>
            </ContentContainer>
        </Container>
    );
}

export default MyDiscussionRecordPage;
