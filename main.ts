import { Book, DVD_TH, Headphone_CS2425, Magazine } from "./item";
import { Library } from "./Library";
import { LibraryMember } from "./member";

// สร้าง Library และใส่ข้อมูลตั้งต้น
const lib = new Library();
lib.addItem(new Book("TypeScript Guide", "B001", "John Doe"));
lib.addItem(new Magazine("Tech Monthly", "M001", "2023-09"));
lib.addItem(new DVD_TH("Interstellar", "D001", 169));
lib.addItem(new Headphone_CS2425("Interstellar", "H001"));
lib.addItem(new Headphone_CS2425("HeadPhone.com/bommerrangthailand", "H002"));

const userName = prompt("Enter your name:");
let member = lib.findMemberById(userName!);
if (!member && userName) {
    alert(`Welcome new member, ${userName}!`);
    member = new LibraryMember(userName, userName);
    lib.addMember(member);
}

let exit = false;
while (!exit) {
    const choice = prompt(
        "====== Library Menu ======\n" +
        "1. ตรวจสอบของที่มีทั้งหมด\n" +
        "2. ยืมหนังสือ\n" +
        "3. คืนหนังสือ\n" +
        "4. ออกจากระบบ\n\n" +
        "เลือกเมนู (1-4):"
    );

    switch (choice) {
        case "1":
            alert("📚 รายการหนังสือทั้งหมด:\n" + lib.getLibrarySummary());
            break;

        case "2":
            const borrowId = prompt("ใส่รหัสหนังสือที่ต้องการยืม:");
            if (borrowId) {
                alert(lib.borrowItem(member!.memberId, borrowId));
            }
            break;

        case "3":
            const returnId = prompt("ใส่รหัสหนังสือที่ต้องการคืน:");
            if (returnId) {
                alert(lib.returnItem(member!.memberId, returnId));
            }
            break;

        case "4":
            alert("ออกจากระบบแล้ว 👋");
            exit = true;
            break;

        default:
            alert("❌ เลือกเมนูไม่ถูกต้อง");
    }
}