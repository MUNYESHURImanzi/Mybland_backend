import mongoose, { Schema, Document, Model } from "mongoose";


interface IContact extends Document {
    FullName: string;
    email: string;
    phone: string;
    message:string;
    subject:string

}


const MessageModel: Schema<IContact> = new mongoose.Schema({
    FullName: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    subject:{
        type: String,
    },
    phone: {
        type: String,
       
    },
   message: {
   type: String,
   required: [true, "message is required"]
    }
});


const ContactModel: Model<IContact> = mongoose.model<IContact>("Contact Us", MessageModel);

export default ContactModel;
