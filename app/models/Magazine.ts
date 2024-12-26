import { Column, Entity } from "typeorm";
import { MagazineCategory } from "../MagazineCategory";
import { Publication } from "../models/Publication";

@Entity()
export class Magazine extends Publication {
    @Column()
    issueNumber: number;
    
    @Column()
    category: MagazineCategory;

    constructor(title: string, year: number, issueNumber: number) {
        super(title, year);
        this.issueNumber = issueNumber;
    }

    getDetails(): string {
        return `${this.title}, Issue ${this.issueNumber}, published in ${this.year}`;
    }
}