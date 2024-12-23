export class LoandRecord {
    title: string;
    loanDate: Date;
    returnDate: Date | null;
    constructor(title: string, loanDate: Date) {
      this.title = title;
      this.loanDate = loanDate;
      this.returnDate = null;
    }

    public returnBook(): void {
        this.returnDate = new Date();
    }
  }