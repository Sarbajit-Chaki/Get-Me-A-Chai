import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { Payment } from "@/models/Payment";
import { connectDB } from "@/config/database";
import { User } from "@/models/User";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    //Check if razorpayOrderId is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    
    if (!p) {
        return NextResponse.json({success: "failed", message:"Order Id is not found"})
    }

    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: p.to_user})
    const user_secret = user.razorpaySec

    // Verify the payment
    let x = validatePaymentVerification({
        "order_id": body.razorpay_order_id,
        "payment_id": body.razorpay_payment_id
    },
        body.razorpay_signature,
        user_secret
    )

    if (x) {
        // Update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else {
        return NextResponse.json({success: "failed", message:"Payment Verification Failed"})
    }
}