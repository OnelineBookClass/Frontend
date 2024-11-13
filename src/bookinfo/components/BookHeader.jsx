import {
    BookHead,
    BookImage,
    BookDetails,
    Title,
    Author,
    Publisher,
} from "../style/BookHeaderStyles";

function BookHeader({ book }) {
    return (
        <BookHead>
            <BookImage
                src={book?.thumbnail || "https://via.placeholder.com/150"}
                alt={book?.title}
            />
            <BookDetails>
                <Title>{book?.title}</Title>
                <Author>저자: {book?.author}</Author>
                <Publisher>출판사: {book?.publisher}</Publisher>
            </BookDetails>
        </BookHead>
    );
}

export default BookHeader;
