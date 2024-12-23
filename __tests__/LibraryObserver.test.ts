import { Book } from "../app/Book";
import { BookCategory } from "../app/BookCategory";
import { Library } from "../app/Library";

class MockObserver {
    public events: string[] = [];

    update(event: string, data: any): void {
        this.events.push(`${event}: ${data.title}`);
    }
}

describe('Library Observer', () => {
    it('should notify observers on book lending', () => {
        const library = Library.getInstance();
        const observer = new MockObserver();
        library.addObserver(observer);

        const book = new Book("1984", "George Orwell", 1949, BookCategory.Fiction, true);
        library.addItem(book);
        library.lendItem("1984");

        expect(observer.events).toContain("Book Lent: 1984");
    });

    // it('should notify observers on book returning', () => {
    //     const library = Library.getInstance();
    //     const observer = new MockObserver();
    //     library.addObserver(observer);

    //     const book = new Book("1984", "George Orwell", 1949, BookCategory.Fiction, false);
    //     library.addItem(book);
    //     library.returnItem("1984");

    //     expect(observer.events).toContain("Book Returned: 1984");
    // });
});