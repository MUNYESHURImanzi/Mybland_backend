"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../schema/contact"));
const Contact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { FullName, email, phone, message } = req.body;
    try {
        const newContact = new contact_1.default({
            FullName: FullName,
            email: email,
            phone: phone,
            message: message
        });
        const savedContact = yield newContact.save();
        res.status(201).json({ message: "you have successfull sent message", Data: savedContact });
    }
    catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = Contact;
