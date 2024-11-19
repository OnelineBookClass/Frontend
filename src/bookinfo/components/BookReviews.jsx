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
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editRating, setEditRating] = useState(5);
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

    const handleEdit = (review) => {
        setEditingReviewId(review.reviewId);
        setEditContent(review.content);
        setEditRating(review.rating);
    };

    const handleUpdate = async (reviewId) => {
        try {
            await axiosInstance.put("/mongdangbul/books/reviews/modify", {
                reviewId,
                content: editContent,
                rating: editRating,
            });
            setEditingReviewId(null);
            onReviewSubmit();
        } catch (error) {
            console.error("리뷰 수정 실패:", error);
            alert("리뷰 수정에 실패했습니다.");
        }
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm("리뷰를 삭제하시겠습니까?")) {
            try {
                await axiosInstance.delete(
                    "/mongdangbul/books/reviews/delete",
                    {
                        data: { reviewId },
                    }
                );
                onReviewSubmit();
            } catch (error) {
                console.error("리뷰 삭제 실패:", error);
                alert("리뷰 삭제에 실패했습니다.");
            }
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
                    <ReviewItem key={review.reviewId}>
                        <ReviewHeader>
                            <ReviewUser>{review.nickName}</ReviewUser>
                            {editingReviewId === review.reviewId ? (
                                <RatingSelect
                                    value={editRating}
                                    onChange={(e) =>
                                        setEditRating(Number(e.target.value))
                                    }
                                >
                                    {[5, 4, 3, 2, 1].map((num) => (
                                        <option key={num} value={num}>
                                            {"★".repeat(num)}
                                        </option>
                                    ))}
                                </RatingSelect>
                            ) : (
                                <Rating>{"★".repeat(review.rating)}</Rating>
                            )}
                        </ReviewHeader>
                        {editingReviewId === review.reviewId ? (
                            <>
                                <TextArea
                                    value={editContent}
                                    onChange={(e) =>
                                        setEditContent(e.target.value)
                                    }
                                />
                                <ButtonGroup>
                                    <button
                                        onClick={() =>
                                            handleUpdate(review.reviewId)
                                        }
                                    >
                                        수정완료
                                    </button>
                                    <button
                                        onClick={() => setEditingReviewId(null)}
                                    >
                                        취소
                                    </button>
                                </ButtonGroup>
                            </>
                        ) : (
                            <>
                                <ReviewContent>{review.content}</ReviewContent>
                                {String(userId) === String(review.userId) && (
                                    <ButtonGroup>
                                        <button
                                            onClick={() => handleEdit(review)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(review.reviewId)
                                            }
                                        >
                                            삭제
                                        </button>
                                    </ButtonGroup>
                                )}
                            </>
                        )}
                    </ReviewItem>
                ))}
            </ReviewList>
        </ReviewsSection>
    );
}

export default BookReviews;
