import { useLocation } from "react-router-dom";
import BookMeetings from "./components/BookDiscussions";
import BookReviews from "./components/BookReviews";
import BookHeader from "./components/BookHeader";
import { Container } from "./style/BookInfoStyles";

// 더미 데이터
const dummyMeetings = [
    {
        id: 1,
        title: "토론방 1",
        lastActive: "2 hours ago",
        participants: 5,
    },
    {
        id: 2,
        title: "토론방 2",
        lastActive: "1 day ago",
        participants: 3,
    },
];

const dummyReviews = [
    {
        id: 1,
        user: "리뷰어 1",
        rating: 5,
        content: "한상 깔끔한 책!",
        likes: 10,
    },
    {
        id: 2,
        user: "리뷰어 2",
        rating: 5,
        content: "정말 좋았어요",
        likes: 8,
    },
    {
        id: 3,
        user: "리뷰어 3",
        rating: 5,
        content: "완전 최고의 책이었어요!!",
        likes: 15,
    },
];

function BookInfo() {
    const location = useLocation();
    const book = location.state?.book;
    console.log(book);

    // API 호출 부분 (주석처리)
    /*
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const [meetingsRes, reviewsRes] = await Promise.all([
                    axiosInstance.get(`/mongdangbul/books/${book.id}/meetings`),
                    axiosInstance.get(`/mongdangbul/books/${book.id}/reviews`)
                ]);
                setMeetings(meetingsRes.data);
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error('Failed to fetch book data:', error);
            }
        };
        fetchBookData();
    }, [book.id]);
    */

    return (
        <Container>
            <BookHeader book={book} />

            <BookMeetings discussions={dummyMeetings} />
            <BookReviews reviews={dummyReviews} />
        </Container>
    );
}

export default BookInfo;
