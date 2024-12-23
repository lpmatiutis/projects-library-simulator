import { MagazineCategory } from "./MagazineCategory";
import { Publication } from "./Publication";

export class Magazine extends Publication {
    issueNumber: number;
    category: MagazineCategory;

    constructor(title: string, year: number, issueNumber: number) {
        super(title, year);
        this.issueNumber = issueNumber;
    }

    getDetails(): string {
        return `${this.title}, Issue ${this.issueNumber}, published in ${this.year}`;
    }
}