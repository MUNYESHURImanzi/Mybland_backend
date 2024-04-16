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
