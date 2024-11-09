import {
    MeetingsSection,
    SectionTitle,
    MeetingList,
    MeetingItem,
    MeetingInfo,
    MeetingTitle,
    LastActive,
} from "../style/BookDiscussionStyles";
import { useNavigate } from "react-router-dom";

function BookDiscussions({ discussions }) {
    const navigate = useNavigate();

    const handleDiscussionClick = (discussionId) => {
        navigate(`/discussion/${discussionId}`);
    };

    return (
        <MeetingsSection>
            <SectionTitle>모임</SectionTitle>
            <MeetingList>
                {discussions.map((discussion) => (
                    <MeetingItem
                        key={discussion.id}
                        onClick={() => handleDiscussionClick(discussion.id)}
                    >
                        <MeetingInfo>
                            <MeetingTitle>{discussion.title}</MeetingTitle>
                            <LastActive>
                                Last Active: {discussion.lastActive}
                            </LastActive>
                        </MeetingInfo>
                    </MeetingItem>
                ))}
            </MeetingList>
        </MeetingsSection>
    );
}

export default BookDiscussions;
