
export interface Borrowable {
    borrow(memberName: string): string; // return message like "Item X borrowed by Y"
    returnItem(): string;               // return message like "Item X returned"
    isAvailable(): boolean;
}
