import * as B from "../style/BookDiscussionStyles";
import { useNavigate } from "react-router-dom";

function BookDiscussions({ discussions, imageURL, isbn }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const handleDiscussionClick = (discussionId) => {
        navigate(`/chattingroom/${discussionId}/${userId}`);
    };

    const handleCreateGroup = () => {
        navigate(`/create-group`, { state: { isbn } }); // 변경 가능
    };

    // discussions가 없거나 빈 배열일 때
    if (!discussions || discussions.length === 0) {
        return (
            <B.MeetingsSection>
                <B.SectionTitle>모임</B.SectionTitle>
                <B.EmptyStateContainer>
                    <B.CreateGroupButton onClick={handleCreateGroup}>
                        모임이 없습니다. 새로운 모임을 만들어보세요!
                    </B.CreateGroupButton>
                </B.EmptyStateContainer>
            </B.MeetingsSection>
        );
    }

    return (
        <B.MeetingsSection>
            <B.SectionTitle>모임</B.SectionTitle>
            <B.MeetingList>
                {discussions.map((discussion) => (
                    <B.MeetingItem
                        key={discussion.roomId}
                        onClick={() => handleDiscussionClick(discussion.roomId)}
                    >
                        <B.MeetingInfo>
                            <B.MeetingImage
                                src={imageURL}
                                alt={discussion.title}
                            />
                            <B.Host>{discussion.hostNickName}</B.Host>
                            <B.MeetingTitle>{discussion.title}</B.MeetingTitle>
                            <B.LastActive>{discussion.intro}</B.LastActive>
                            <B.CurrentMember>
                                인원수: {discussion.currentParticipants}/
                                {discussion.maximum}
                            </B.CurrentMember>
                        </B.MeetingInfo>
                    </B.MeetingItem>
                ))}
            </B.MeetingList>
        </B.MeetingsSection>
    );
}

export default BookDiscussions;
