import mongoose, { Schema, Document, Model } from "mongoose";


interface ISignIn extends Document {
    name: string;
    email: string;
    password: string;
}


const signInSchema: Schema<ISignIn> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});


const SignInModel: Model<ISignIn> = mongoose.model<ISignIn>("signIn", signInSchema);

export default SignInModel;
