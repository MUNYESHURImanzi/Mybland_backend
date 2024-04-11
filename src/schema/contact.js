"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MessageModel = new mongoose_1.default.Schema({
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
var ContactModel = mongoose_1.default.model("Contact Us", MessageModel);
exports.default = ContactModel;
