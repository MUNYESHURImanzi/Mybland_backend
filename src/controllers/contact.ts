import ContactModel from '../schema/contact';
import { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  
    service: 'gmail',
    auth: {
        user: 'munyeshurimanzi@gmail.com',
        pass: 'vjvi bjue yman hpim'
    }
});

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
        res.status(201).json({ message: "You have successfully sent a message", Data: savedContact });
        
        
        sendEmail(email, message); 
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const sendEmail = async (to: string, message: string) => {
    const mailOptions = {
        from: 'munyeshurimanzi@gmail.com',
        to: to,
        subject: 'Thank you for contact us ',
        
        html: `
       
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333; text-align: center;">Thank You for Contacting Us</h1>
            <p style="color: #666666; line-height: 1.6;">We have received your message and will get back to you as soon as possible.</p>
            <p style="color: #666666; line-height: 1.6;">In the meantime, feel free to explore more of our website.</p>
    
        </div>
    </div>
        
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

const getAllContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await ContactModel.find();
        res.status(200).json({ contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { Contact, getAllContacts };
