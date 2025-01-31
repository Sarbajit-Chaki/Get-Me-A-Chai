import React from 'react'
import PaymentPage from '../components/PaymentPage.js'
import { connectDB } from '@/config/database.js'
import { User } from '@/models/User.js'
import { notFound } from 'next/navigation.js'

const Username = async ({ params }) => {
  const { username } = await params
  
  // If username is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ username: username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()

  return (
    <>
      <PaymentPage username={username} />
    </>
  )
}

export default Username

export async function generateMetadata({ username }) {
  return {
    title: `Support ${username} - Get Me A Chai`,
  }
}