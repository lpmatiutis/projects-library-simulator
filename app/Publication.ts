export class Publication {
  title: string;
  year: number;
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
