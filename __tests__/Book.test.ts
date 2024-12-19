import { Book } from "../app/Book";
import { BookCategory } from "../app/BookCategory";

describe('Book class', () => {
    it('should return book details correctly', () => {
        const book = new Book('1984', 'George Orwell', 1949, BookCategory.Fiction);
        expect(book.getDetails()).toBe('1984 by George Orwell, published in 1949');
    });

    it('shouild compare books by year', () => {
        const book1 = new Book('1984', 'George Orwell', 1949, BookCategory.Fiction);
        const book2 = new Book('Brave New World', 'Aldous Huxley', 1932, BookCategory.Fiction);
        expect(Book.compareByYear(book1, book2)).toBe(17);
    });
});

describe('Book class - Invalid input', () => {
    it('should throw an error if title is empty', () => {
        expect(() => new Book("", "George Orwell", 1949, BookCategory.Fiction)).toThrow("Title cannot be empty");
    });

    it('should throw an error if year is negative', () => {
        expect(() => new Book("1984", "George Orwell", -1949, BookCategory.Fiction)).toThrow("Year must be positive");
    });
});

describe('Book.compareByYear - Edge cases', () => {
    it('should return 0 when books have the same year', () => {
        const book1 = new Book("1984", "George Orwell", 1949, BookCategory.Fiction);
        const book2 = new Book("Brave New World", "Aldous Huxley", 1949, BookCategory.Fiction);
        expect(Book.compareByYear(book1, book2)).toBe(0);
    });
});