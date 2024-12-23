import { Book } from "./Book";
import fs from "fs";
import { Publication } from "./Publication";
import { Magazine } from "./Magazine";
import { BookCategory } from "./BookCategory";
import { MagazineCategory } from "./MagazineCategory";

export class Library implements Subject {
  private static instance: Library;
  private items: Map<string, Publication> = new Map();
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

  addItem(item: Publication): void {
    // if (this.books.has(book.title)) {
    //     throw new Error(`The book "${book.title}" already exists in the library.`);
    // }
    this.items.set(item.title, item);
  }

  removeBook(title: string): boolean {
    return this.items.delete(title);
  }

  findItem(title: string): Publication | null {
    return this.items.get(title) || null;
  }

  listItems(): string[] {
    return Array.from(this.items.values()).map((item) => {
      return item.getDetails();
    });
  }

  public findBooksByCategory(category: BookCategory): Book[] {
    return Array.from(this.items.values()).filter(
      (item) => isBook(item) && item.category === category
    ) as Book[];
  }

  public findMagazinesByCategory(category: MagazineCategory): Magazine[] {
    return Array.from(this.items.values()).filter(
      (item) => isMagazine(item) && item.category === category
    ) as Magazine[];
  }

  public lendItem(title: string): boolean {
    const item = this.findItem(title);
    if (item && item.isAvailable) {
      item.isAvailable = false;
      this.notify("Book Lent", item);
      return true;
    }
    return false;
  }

  public returnItem(title: string): boolean {
    const item = this.findItem(title);
    if (item && !item.isAvailable) {
      item.isAvailable = true;
      this.notify("Book Returned", item);
      return true;
    }
    return false;
  }

  public saveToFile(filename: string): void {
    const data = JSON.stringify(Array.from(this.items.values()));
    fs.writeFileSync(filename, data, "utf-8");
  }

  public loadFromFile(filename: string): void {
    const data = fs.readFileSync(filename, "utf-8");
    const booksArray = JSON.parse(data);
    booksArray.forEach((bookData: any) => {
      const book = Book.fromJSON(bookData);
      this.items.set(book.title, book);
    });
  }
}

function isBook(publication: Publication): publication is Book {
  return (publication as Book).author !== undefined;
}

function isMagazine(publication: Publication): publication is Magazine {
  return (publication as Magazine).issueNumber !== undefined;
}
