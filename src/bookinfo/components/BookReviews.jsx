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
} from "../style/ReviewStyles";

function BookReviews({ reviews }) {
    return (
        <ReviewsSection>
            <SectionTitle>리뷰</SectionTitle>
            <ReviewList>
                {reviews.map((review) => (
                    <ReviewItem key={review.id}>
                        <ReviewHeader>
                            <ReviewUser>{review.user}</ReviewUser>
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
