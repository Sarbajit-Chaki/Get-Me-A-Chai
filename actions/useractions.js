"use server"

import Razorpay from "razorpay"
import { connectDB } from "@/config/database.js"
import { Payment } from "@/models/Payment"
import { User } from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()

    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: to_username})
    const user_secret = user.razorpaySec
    const user_razorpayId = user.razorpayId

    var instance = new Razorpay({ key_id: user_razorpayId, key_secret: user_secret })

    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR"
    }

    let x = await instance.orders.create(options)
    console.log("orderID:",x)

    // create a payment object which shows a pending payment in database
    await Payment.create({
        oid: x.id, 
        to_user: to_username, 
        amount: amount, 
        name: paymentform.name, 
        message: paymentform.message
    })

    return x
}


export const fetchPayments = async (username) => {
    await connectDB()
    let payments = await Payment.find({to_user: username, done: true}).sort({amount: -1})
    return JSON.parse(JSON.stringify(payments));
}

export const fetchUser = async (username) => {
    await connectDB()
    let user = await User.findOne({username})
    return JSON.parse(JSON.stringify(user));
}

export const updateUser = async (data, oldusername) => {
    await connectDB()

    if (oldusername !== data.username){
        let u = await User.findOne({username: data.username})
        if (u) {
            return {error: "Username already exist"}
        }
        // Update all the usernames in the Payments table
        await Payment.updateMany({to_user: oldusername}, {to_user: data.username})
    }

    await User.updateOne({email: data.email}, data);
}