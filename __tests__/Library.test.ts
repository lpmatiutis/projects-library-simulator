import { Book } from "../app/Book";
import { BookCategory } from "../app/BookCategory";
import { Library } from "../app/Library";

describe('Library Singleton', () => {
    it('should return the same instance', () => {
        const library1 = Library.getInstance();
        const library2 = Library.getInstance();

        expect(library1).toBe(library2); // Deben ser la misma instancia
    });
});

describe('Library Singleton Data Sharing', () => {
    it('should share data between instances', () => {
        const library1 = Library.getInstance();
        library1.addItem(new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true));

        const library2 = Library.getInstance();
        const books = library2.listItems();

        expect(books).toContain("1984 by George Orwell, published in 1949");
    });
});

describe('Library Singleton Methods', () => {
    let library: Library;

    beforeEach(() => {
        library = Library.getInstance();
        // Limpia el estado interno (si es necesario)
        library['books'] = new Map(); // Si tienes acceso directo, limpia los libros
    });

    it('should add and find a book', () => {
        library.removeItem("1984");
        const book = new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true);
        library.addItem(book);

        const foundBook = library.findItem("1984");
        expect(foundBook?.title).toBe("1984");
    });

    it('should remove a book', () => {
        library.removeItem("1984");
        const book = new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true);
        library.addItem(book);

        const removed = library.removeItem("1984");
        expect(removed).toBe(true);

        const foundBook = library.findItem("1984");
        expect(foundBook).toBeNull();
    });

    it('should return null for non-existent books', () => {
        const foundBook = library.findItem("Nonexistent Book");
        expect(foundBook).toBeNull();
    });

    it('should find books by category', () => {
        const library = Library.getInstance();
        library.addItem(new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true));
        library.addItem(new Book("A Brief History of Time", "Stephen Hawking", 1988, BookCategory.History, true));
    
        const fictionBooks = library.findBooksByCategory(BookCategory.Fiction);
        expect(fictionBooks).toHaveLength(1);
        expect(fictionBooks[0].title).toBe("1984");
    });

    it('should lend and return a book', () => {
        const library = Library.getInstance();
        library.removeItem("1984");
        const book = new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true);
        library.addItem(book);
    
        const lendResult = library.lendItem("1984");
        expect(lendResult).toBe(true);
        expect(book.isAvailable).toBe(false);
    
        const returnResult = library.returnItem("1984");
        expect(returnResult).toBe(true);
        expect(book.isAvailable).toBe(true);
    });

    it('should save and load library data to/from a file', () => {
        const library = Library.getInstance();
        library.removeItem("1984");
        library.addItem(new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true));
    
        const filePath = './library.json';
        library.saveToFile(filePath);
    
        const newLibrary = Library.getInstance();
        newLibrary.loadFromFile(filePath);
    
        const books = newLibrary.listItems();
        // expect(books).toContain("1984 by George Orwell, published in 1949, category: Fiction");
    
        // Cleanup
        // fs.unlinkSync(filePath);
    });
});

describe('Library Loan History', () => {
    let library: Library;
    it('should record loan history', () => {
        const library = Library.getInstance();
        library.removeItem("1984");
        const book = new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true);
        library.addItem(book);
    
        library.lendItem("1984");
        const loanHistory = library.getLoanHistory(); // Método a implementar
        expect(loanHistory).toHaveLength(2);
        expect(loanHistory[0].title).toBe("1984");
    });
    
})