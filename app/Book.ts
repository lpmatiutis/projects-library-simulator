import { BookCategory } from "./BookCategory";

export class Book {
  title: string;

  author: string;

  year: number;

  isAvailable: boolean;

  category: BookCategory;
  constructor(
    title: string,
    author: string,
    year: number,
    category: BookCategory,
    isAvailable: boolean
  ) {
    if (!title.trim()) {
      throw new Error("Title cannot be empty");
    }

    if (year <= 0) {
      throw new Error("Year must be positive");
    }

    this.title = title;
    this.author = author;
    this.year = year;
    this.category = category;
    this.isAvailable = isAvailable;
  }

  public getDetails(): string {
    return `${this.title} by ${this.author}, published in ${this.year}`;
  }

  static compareByYear(book1: Book, book2: Book): number {
    return book1.year - book2.year;
  }

  public static fromJSON(json: any): Book {
    return new Book(
      json.title,
      json.author,
      json.year,
      json.category,
      json.isAvailable
    );
  }
}
