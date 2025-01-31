"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
    const { data: session } = useSession()
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className=" w-full h-16 flex justify-between items-center bg-[#000814] border-b border-b-slate-700 px-2 sm:px-12 lg:px-36 bg-opacity-95 ">
            <div className=" flex items-center gap-2 cursor-pointer">
                <Image className=' rounded-full' height={48} width={48} src="/coffee.jpg" alt="logo" />
                <Link href={"/"}>
                    <div className=" text-white font-bold text-xl sm:text-2xl">GetMeAChai!</div>
                </Link>
            </div>

            <div className=' flex items-center'>

                {!session &&
                    <Link href={"/login"}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Sign In
                        </button>
                    </Link>
                }

                {session &&
                    <div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} className=' relative'>
                        <button type="button" className=" inline-flex items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Accounts
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdown" className={`z-10 ${showDropdown ? "" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-32 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                </li>
                                <li>
                                    <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar
