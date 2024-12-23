interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notify(event: string, data: any): void;
}