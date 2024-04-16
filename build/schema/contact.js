"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageModel = new mongoose_1.default.Schema({
    FullName: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phone: {
        type: String,
        required: [true, "phone  is required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    }
});
const ContactModel = mongoose_1.default.model("Contact Us", MessageModel);
exports.default = ContactModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvY29udGFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUE2RDtBQVk3RCxNQUFNLFlBQVksR0FBcUIsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUN2RCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQztLQUN2QztJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDO0tBQ3hDO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUM7S0FDekM7SUFDRixPQUFPLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQztLQUNyQztDQUNKLENBQUMsQ0FBQztBQUdILE1BQU0sWUFBWSxHQUFvQixrQkFBUSxDQUFDLEtBQUssQ0FBVyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFM0Ysa0JBQWUsWUFBWSxDQUFDIn0=