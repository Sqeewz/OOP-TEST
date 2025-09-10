import { LibraryItem } from "./item";

export class LibraryMember {
    private _memberName: string;
    private _memberId: string;
    private _borrowedItems: LibraryItem[] = [];

    constructor(memberName: string, memberId: string) {
        this._memberName = memberName;
        this._memberId = memberId;
    }

    public get memberName(): string {
        return this._memberName;
    }

    public get memberId(): string {
        return this._memberId;
    }

    // borrowItem: attempt to borrow a LibraryItem
    // return message string (per spec)
    public borrowItem(item: LibraryItem): string {
        // validate availability
        if (!item.isAvailable()) {
            return `Item not available`;
        }

        // Ask item to borrow (item will update its state)
        const msg = item.borrow(this._memberName);

        // If borrow succeeded (item becomes unavailable), add to member's borrowed list
        if (!item.isAvailable()) {
            this._borrowedItems.push(item);
        }

        return msg;
    }

    // returnItem by itemId
    public returnItem(itemId: string): string {
        const idx = this._borrowedItems.findIndex(it => it.getId() === itemId);
        if (idx === -1) {
            return `Member ${this._memberName} does not have item ${itemId}`;
        }
        const item = this._borrowedItems[idx];
        const msg = item.returnItem();

        // remove from borrowed list if returned successfully (i.e., item.isAvailable() === true)
        if (item.isAvailable()) {
            this._borrowedItems.splice(idx, 1);
        }
        return msg;
    }

    // listBorrowedItems returns a string (can be used in UI or slide)
    public listBorrowedItems(): string {
        if (this._borrowedItems.length === 0) return `${this._memberName} has no borrowed items`;
        const lines = this._borrowedItems.map(it => it.getDetails());
        return `${this._memberName} borrowed:\n- ${lines.join("\n- ")}`;
    }
}
