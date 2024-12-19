import { Book } from "./Book";

export class Library {
    private static instance: Library;
    private books: Map<string, Book> = new Map();
    
    private constructor() {}

    public static getInstance(): Library {
        if (!Library.instance) {
            Library.instance = new Library();
        }
        return Library.instance;
    }

    addBook(book: Book): void {
        if (this.books.has(book.title)) {
            throw new Error(`The book "${book.title}" already exists in the library.`);
        }
        this.books.set(book.title, book);
    }

    removeBook(title: string): boolean {
        return this.books.delete(title);
    }

    findBook(title: string): Book | null {
        return this.books.get(title) || null;
    }

    listBooks(): string[] {
        return Array.from(this.books.values()).map((book) => book.getDetails());
    }

    public findBooksByCategory(category: string): Book[] {
        return Array.from(this.books.values()).filter((book) => book.category === category);
    }
}