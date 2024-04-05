import ContactModel from '../schema/contact';
import { Request, Response } from "express";

const Contact = async (req: Request, res: Response) => {
    const { FullName, email, phone, message } = req.body;
    try {
        const newContact = new ContactModel({
            FullName: FullName,
            email: email,
            phone: phone,
            message: message
        });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default Contact;
