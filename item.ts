import { Borrowable } from "./BorrowAble";


// -------------------------
export abstract class LibraryItem implements Borrowable {
    // encapsulated attributes
    private _title: string;
    protected itemId: string;
    private _available: boolean;

    constructor(title: string, itemId: string, available: boolean = true) {
        this._title = title;
        this.itemId = itemId;
        this._available = available;
    }

    // getter for title
    public get title(): string {
        return this._title;
    }

    // getter for id
    public getId(): string {
        return this.itemId;
    }

    // setter for available (could include extra validation)
    public set available(av: boolean) {
        this._available = av;
    }

    // implement isAvailable()
    public isAvailable(): boolean {
        return this._available;
    }

    // implement borrow(memberName)
    public borrow(memberName: string): string {
        if (!this._available) {
            return `Item ${this.getId()} ("${this._title}") is not available`;
        }
        this._available = false;
        return `${this.getDetails()} borrowed by ${memberName}`;
    }

    // implement returnItem()
    public returnItem(): string {
        if (this._available) {
            return `${this.getDetails()} was not borrowed`;
        }
        this._available = true;
        return `${this.getDetails()} returned`;
    }

    // subclass must override to give specific details
    public abstract getDetails(): string;
}


export class Book extends LibraryItem {
    private author: string;

    constructor(title: string, itemId: string, author: string, available: boolean = true) {
        super(title, itemId, available);
        this.author = author;
    }

    public getDetails(): string {
        return `Book: ${this.title} by ${this.author} (ID: ${this.getId()})`;
    }
}

export class Magazine extends LibraryItem {
    private issueDate: string;

    constructor(title: string, itemId: string, issueDate: string, available: boolean = true) {
        super(title, itemId, available);
        this.issueDate = issueDate;
    }

    public getDetails(): string {
        return `Magazine: ${this.title} (Issue: ${this.issueDate}) (ID: ${this.getId()})`;
    }
}

export class DVD_TH extends LibraryItem {
    private durationMin: number;

    constructor(title: string, itemId: string, durationMin: number, available: boolean = true) {
        super(title, itemId, available);
        this.durationMin = durationMin;
    }

    public getDetails(): string {
        return `DVD: ${this.title} (${this.durationMin} min) (ID: ${this.getId()})`;
    }
}

export class NoteBook_CS2455 extends LibraryItem {

    constructor(title: string, itemId: string, available: boolean = true) {
        super(title, itemId, available);

    }

    public getDetails(): string {
        return `NoteBook: ${this.title} (ID: ${this.getId()})`;
    }
}


export class Headphone_CS2425 extends LibraryItem {

    constructor(title: string, itemId: string, available: boolean = true) {
        super(title, itemId, available);
    }

    public getDetails(): string {
        return `HeadPhone: ${this.title}(ID: ${this.getId()})`;
    }
}




