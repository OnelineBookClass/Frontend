import { useState, useContext } from "react";
import { UserContext } from "../../login/context/LoginContext";
import axiosInstance from "../../utils/axiosConfig";
import {
    ReviewsSection,
    SectionTitle,
    ReviewList,
    ReviewItem,
    ReviewHeader,
    ReviewUser,
    Rating,
    ReviewContent,
    LikeButton,
    TitleContainer,
    WriteButton,
    ReviewForm,
    TextArea,
    ButtonGroup,
    RatingSelect,
} from "../style/ReviewStyles";

function BookReviews({ reviews, isbn, onReviewSubmit }) {
    const [showWriteForm, setShowWriteForm] = useState(false);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const { userId } = useContext(UserContext);

    const handleSubmit = async () => {
        try {
            await axiosInstance.post("/mongdangbul/books/reviews", {
                userId,
                isbn,
                content,
                rating,
            });

            // 폼 초기화
            setContent("");
            setRating(5);
            setShowWriteForm(false);

            // 부모 컴포넌트의 데이터 새로고침 함수 호출
            onReviewSubmit();
        } catch (error) {
            console.error("리뷰 작성 실패:", error);
            alert("리뷰 작성에 실패했습니다.");
        }
    };

    return (
        <ReviewsSection>
            <TitleContainer>
                <SectionTitle>리뷰</SectionTitle>
                <WriteButton onClick={() => setShowWriteForm(!showWriteForm)}>
                    리뷰 작성하기
                </WriteButton>
            </TitleContainer>

            {showWriteForm && (
                <ReviewForm>
                    <RatingSelect
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        {[5, 4, 3, 2, 1].map((num) => (
                            <option key={num} value={num}>
                                {"★".repeat(num)}
                            </option>
                        ))}
                    </RatingSelect>
                    <TextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='리뷰를 작성해주세요...'
                    />
                    <ButtonGroup>
                        <button onClick={handleSubmit}>작성하기</button>
                        <button onClick={() => setShowWriteForm(false)}>
                            취소하기
                        </button>
                    </ButtonGroup>
                </ReviewForm>
            )}

            <ReviewList>
                {reviews.map((review) => (
                    <ReviewItem key={review.id}>
                        <ReviewHeader>
                            <ReviewUser>{review.nickName}</ReviewUser>
                            <Rating>{"★".repeat(review.rating)}</Rating>
                        </ReviewHeader>
                        <ReviewContent>{review.content}</ReviewContent>
                        <LikeButton>👍 {review.likes}</LikeButton>
                    </ReviewItem>
                ))}
            </ReviewList>
        </ReviewsSection>
    );
}

export default BookReviews;
