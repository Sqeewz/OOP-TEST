// -------------------------
// Library (Aggregation of items and members)

import { LibraryItem } from "./item";
import { LibraryMember } from "./member";

// -------------------------
export class Library {
    private items: LibraryItem[] = [];
    private members: LibraryMember[] = [];

    // addItem: avoid duplicate itemId
    public addItem(item: LibraryItem): void {
        if (this.findItemById(item.getId())) {
            throw new Error(`Item with ID ${item.getId()} already exists`);
        }
        this.items.push(item);
    }

    // addMember: avoid duplicate memberId
    public addMember(member: LibraryMember): void {
        if (this.findMemberById(member.memberId)) {
            throw new Error(`Member with ID ${member.memberId} already exists`);
        }
        this.members.push(member);
    }

    public findItemById(itemId: string): LibraryItem | undefined {
        return this.items.find(i => i.getId() === itemId);
    }

    public findMemberById(memberId: string): LibraryMember | undefined {
        return this.members.find(m => m.memberId === memberId);
    }

    // borrowItem by ids: will find member and item and call member.borrowItem(item)
    public borrowItem(memberId: string, itemId: string): string {
        const member = this.findMemberById(memberId);
        if (!member) return `Member ${memberId} not found`;

        const item = this.findItemById(itemId);
        if (!item) return `Item ${itemId} not found`;

        // delegate borrow to member (member will check availability and call item.borrow)
        const result = member.borrowItem(item);
        return result;
    }

    // returnItem by ids: find member, then call member.returnItem(itemId)
    public returnItem(memberId: string, itemId: string): string {
        const member = this.findMemberById(memberId);
        if (!member) return `Member ${memberId} not found`;

        const item = this.findItemById(itemId);
        if (!item) return `Item ${itemId} not found`;

        // delegate to member
        const result = member.returnItem(itemId);
        return result;
    }

    // summary (string)
    public getLibrarySummary(): string {
        const itemsSummary = this.items.map(it =>
            `${it.getDetails()} - ${it.isAvailable() ? "available" : "borrowed"}`
        ).join("\n");
        const membersSummary = this.members.map(m => `${m.memberName} (ID: ${m.memberId})`).join("\n");
        return `Library Summary:\n\nItems:\n${itemsSummary || "(no items)"}\n\nMembers:\n${membersSummary || "(no members)"}`;
    }
}
