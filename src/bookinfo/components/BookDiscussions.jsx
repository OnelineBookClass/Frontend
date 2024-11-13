import * as B from "../style/BookDiscussionStyles";
import { useNavigate } from "react-router-dom";

function BookDiscussions({ discussions, imageURL }) {
    const navigate = useNavigate();
    console.log(discussions);

    const handleDiscussionClick = (discussionId) => {
        navigate(`/discussion/${discussionId}`);
    };

    return (
        <B.MeetingsSection>
            <B.SectionTitle>모임</B.SectionTitle>
            <B.MeetingList>
                {discussions.map((discussion) => (
                    <B.MeetingItem
                        key={discussion.id}
                        onClick={() => handleDiscussionClick(discussion.id)}
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
                                {discussion.current}/{discussion.maximum}
                            </B.CurrentMember>
                        </B.MeetingInfo>
                    </B.MeetingItem>
                ))}
            </B.MeetingList>
        </B.MeetingsSection>
    );
}

export default BookDiscussions;
