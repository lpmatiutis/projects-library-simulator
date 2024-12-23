import { Book } from "./Book";
import fs from 'fs';

export class Library implements Subject {
    private static instance: Library;
    private books: Map<string, Book> = new Map();
    private observers: Observer[] = [];
    
    private constructor() {}

    public static getInstance(): Library {
        if (!Library.instance) {
            Library.instance = new Library();
        }
        return Library.instance;
    }

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    public notify(event: string, data: any): void {
        this.observers.forEach((observer) => observer.update(event, data));
    }

    addBook(book: Book): void {
        // if (this.books.has(book.title)) {
        //     throw new Error(`The book "${book.title}" already exists in the library.`);
        // }
        this.books.set(book.title, book);
    }

    removeBook(title: string): boolean {
        return this.books.delete(title);
    }

    findBook(title: string): Book | null {
        return this.books.get(title) || null;
    }

    listBooks(): string[] {
        return Array.from(this.books.values()).map((book) => {
            return book.getDetails();
        });
    }

    findBooksByCategory(category: string): Book[] {
        return Array.from(this.books.values()).filter((book) => book.category === category);
    }

    public lendBook(title: string): boolean {
        const book = this.findBook(title);
        if (book && book.isAvailable) {
            book.isAvailable = false;
            this.notify('Book Lent', book);
            return true;
        }
        return false;
    }

    public returnBook(title: string): boolean {
        const book = this.findBook(title);
        if (book && !book.isAvailable) {
            book.isAvailable = true;
            this.notify("Book Returned", book);
            return true;
        }
        return false;
    }

    public saveToFile(filename: string): void {
        const data = JSON.stringify(Array.from(this.books.values()));
        fs.writeFileSync(filename, data, 'utf-8');
    }

    public loadFromFile(filename: string): void {
        const data = fs.readFileSync(filename, 'utf-8');
        const booksArray = JSON.parse(data);
        booksArray.forEach((bookData: any) => {
            const book = Book.fromJSON(bookData);
            this.books.set(book.title, book);
        });
    }
}