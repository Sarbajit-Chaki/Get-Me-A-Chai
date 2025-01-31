"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchPayments, fetchUser, initiate } from '@/actions/useractions.js'
import { toast, Bounce } from 'react-toastify'
import { useSearchParams, useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const router = useRouter()

    const [paymentform, setPaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    })
    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const [currUser, setCurrUser] = useState({});
    const [paymentsList, setPaymentsList] = useState([]);

    const getData = async () => {
        let u = await fetchUser(username)
        setCurrUser(u)
        let dbpayments = await fetchPayments(username)
        setPaymentsList(dbpayments) 
    }

    useEffect(() => {
        if (username) {
            getData()
        }
    }, [])


    useEffect(() => {
        if (searchParams.get("paymentdone") == "true"){
            toast.success('Payment transfered successfully!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                transition: Bounce,
            });
        }

        router.push(`/${username}`)
    }, [])
    
    const Pay = async (amount) => {
        if (!paymentform.name.trim() || !paymentform.message.trim() || !amount || isNaN(amount) || Number(amount) <= 0) {
            alert("All fields are required, and amount must be a positive number!");
            return;
        }

        // Get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id;

        var options = {
            "key": currUser?.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": currUser?.profilepic,
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": `${currUser?.name}`, //your customer's name
                "email": `${currUser?.email}`,
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options)
        rzp1.open();

        setPaymentform({
            name: '',
            message: '',
            amount: ''
        })
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover w-full relative ">
                <img className=' w-full h-60 sm:h-96 object-cover border-b border-slate-700' src={currUser?.coverpic || '/default-cover.jpg'} alt="user-cover" />
                <div className=' absolute left-1/2 -translate-x-1/2 size-32 -bottom-16 '>
                    <img className=' w-32 h-32 object-cover rounded-full border-2 border-white' src={currUser.profilepic || '/default-profile.jpg'} alt="user-profile" />
                </div>
            </div>

            <div className="info flex justify-center items-center my-24 flex-col gap-2">
                <div className=' font-bold text-lg'>
                    @{username}
                </div>
                <div className=' text-slate-400'>
                    Lets help {username} get a chai!
                </div>
                <div className=' text-slate-400 flex items-center gap-2'>
                    <span>₹{paymentsList.reduce((a,b) => a + b.amount ,0)} raised</span>
                    •
                    <span>{paymentsList.length} Payments</span>
                    •
                    <span>₹{(paymentsList.reduce((a,b) => a + b.amount ,0)/paymentsList.length).toFixed(0)} /person</span>
                    
                </div>

                <div className='payment flex flex-col md:flex-row items-center gap-10 w-[90vw] md:w-[80vw] mt-20 '>
                    <div className='supporters w-full md:w-1/2 min-h-[380px] bg-slate-800 p-2 sm:p-4 md:p-8 text-white rounded-lg'>
                        <h2 className=' font-bold text-2xl mb-4'>Top Supporters</h2>
                        <div className=' mx-2 md:mx-5 text-base max-h-[300px] sm:max-h-[250px] overflow-y-auto '>
                            {paymentsList.length == 0 && <div className=' font-semibold'>No Payments Yet</div>}
                            {
                                paymentsList.map((payment, i) => (
                                    ((i < 10) ? (
                                        <div key={i} className=' mb-5 sm:mb-4 flex gap-2 items-center'>
                                        <img width={33} src="/avatar.gif" alt="" />
                                        <span>
                                            <span className=' font-semibold'>{payment.name}</span> donated <span className=' font-bold'>₹{payment.amount}</span> with a message <span className=' font-semibold'>&apos;{payment.message}&apos;</span>
                                        </span>
                                    </div>
                                    ) : (null))
                                ))
                            }
                        </div>
                    </div>

                    <div className='payment-box w-full md:w-1/2 max-h-[380px] bg-slate-800 p-2 sm:p-4 md:p-8 text-white rounded-lg'>
                        <h2 className=' font-bold text-2xl mb-5'>Make a Payment</h2>
                        <div className=' w-full flex flex-col gap-2'>
                            <input onChange={handleChange} value={paymentform.name} maxLength={25} name='name' type="text" id="" autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Name" required />
                            <input onChange={handleChange} value={paymentform.message} maxLength={60} name='message' type="text" id="" autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Message" required />
                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="number" id="" autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Amount" required />
                            <button onClick={() => Pay(paymentform.amount)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                            <div className=' flex items-center gap-2 mt-4'>
                                <button className=' font-bold bg-slate-700 border border-gray-500 p-2 rounded-lg'
                                    onClick={() => Pay(10)}>Pay ₹10
                                </button>
                                <button className=' font-bold bg-slate-700 border border-gray-500 p-2 rounded-lg'
                                    onClick={() => Pay(20)}>Pay ₹20
                                </button>
                                <button className=' font-bold bg-slate-700 border border-gray-500 p-2 rounded-lg'
                                    onClick={() => Pay(30)}>Pay ₹30
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
