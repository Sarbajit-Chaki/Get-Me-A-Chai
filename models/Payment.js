import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
    name: {
        type: String,
        requried: true,
    },
    to_user: {
        type: String,
        requried: true,
    },
    oid: {
        type: String,
        requried: true,
    },
    amount: {
        type: Number,
        requried: true,
    },
    message: {
        type: String,
    },
    done: {
        type: Boolean,
        default: false
    },
},{ timestamps: true });

export const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);