class LibraryNotifier implements Observer {
    update(event: string, data: any): void {
        console.log(`Notification: ${event} - ${data.title} by ${data.author}`);
    }
}