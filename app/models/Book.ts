import { Column, Entity } from "typeorm";
import { BookCategory } from "../BookCategory";
import { Publication } from "./Publication";

@Entity()
export class Book extends Publication {
  @Column()
  author: string;

  @Column()
  isAvailable: boolean;

  @Column( {type: "varchar"} )
  category: BookCategory;
  constructor(
    title: string,
    author: string,
    year: number,
    category: BookCategory,
    isAvailable: boolean
  ) {
    super(title, year, isAvailable);
    if (!title?.trim()) {
      throw new Error("Title cannot be empty");
    }

    if (year <= 0) {
      throw new Error("Year must be positive");
    }

    this.author = author;
    this.category = category;
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
