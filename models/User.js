import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    profilepic: {
        type: String
    },
    coverpic: {
        type: String
    },
    razorpayId: {
        type: String
    },
    razorpaySec: {
        type: String
    },
},{ timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);