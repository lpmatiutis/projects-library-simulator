import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  
  @Column()
  year: number;
  
  @Column()
  isAvailable: boolean = true;

  constructor(title: string, year: number, isAvailable: boolean = true) {
    this.title = title;
    this.year = year;
    this.isAvailable = isAvailable;
  }

  getDetails(): string {
    return `${this.title}, published in (${this.year})`;
  }
}
