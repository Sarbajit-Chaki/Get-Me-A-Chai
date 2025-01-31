"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updateUser } from '@/actions/useractions'
import { toast, Bounce } from 'react-toastify'

const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter()

  const [setCurrUser, setSetCurrUser] = useState({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    profilepic: '',
    coverpic: '',
    razorpayId: '',
    razorpaySec: ''
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    update()
    let a = await updateUser(form, session.user.username)

    toast.success('Data updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
  }

  const getData = async () => {
    let u = await fetchUser(session.user.username)
    // console.log(u)
    setForm({
      name: u.name || '',
      email: u.email || '',
      username: u.username || '',
      profilepic: u.profilepic || '',
      coverpic: u.coverpic || '',
      razorpayId: u.razorpayId || '',
      razorpaySec: u.razorpaySec || ''
    });
  }

  useEffect(() => {
    document.title = "Dashboard - Get Me A Chai";

    if (!session) {
      router.push('/login')
    }
    if(session){
      getData();
    }

  }, [session, router])

  return (
    <>
      <div className=' w-full'>
        <h2 className=' text-xl font-bold text-center mt-5 mb-2'>Welcome to Your Dashboard</h2>
        <div className=' mx-auto flex flex-col gap-4 md:gap-1 items-center'>
          <div>
            <div className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</div>
            <input onChange={handleChange} value={form.name} name='name' type="text"  autoComplete='off' className=" w-[80vw] md:w-[40vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Name" />
          </div>
          <div>
            <div className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</div>
            <input value={form.email} readOnly disabled name='email' type="text"  autoComplete='off' className=" w-[80vw] md:w-[40vw] cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Email" />
          </div>
          <div>
            <div className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</div>
            <input onChange={handleChange} value={form.username} name='username' type="text"  autoComplete='off' className=" w-[80vw] md:w-[40vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username" />
          </div>
          <div>
            <div className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'>Profile Picture</div>
            <input onChange={handleChange} value={form.profilepic} name='profilepic' type="text"  autoComplete='off' className=" w-[80vw] md:w-[40vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter picture URL" />
          </div>
          <div>
            <div className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'>Cover picture</div>
            <input onChange={handleChange} value={form.coverpic} name='coverpic' type="text"  autoComplete='off' className=" w-[80vw] md:w-[40vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter picture URL" />
          </div>
          <div>
            <div className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Id</div>
            <input onChange={handleChange} value={form.razorpayId} name='razorpayId' type="text"  autoComplete='off' className=" w-[80vw] md:w-[40vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Razorpay Id" />
          </div>
          <div>
            <div className=' mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Secret</div>
            <input onChange={handleChange} value={form.razorpaySec} name='razorpaySec' type="password"  autoComplete='off' className=" w-[80vw] md:w-[40vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Razorpay Secret" />
          </div>
          <button onClick={handleSubmit} className=" w-[80vw] md:w-[40vw] mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </div>
    </>
  )
}

export default Dashboard
