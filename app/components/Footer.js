import React from 'react'
import { FaRegHeart } from "react-icons/fa";

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className=' bg-[#000814] border-b border-t-slate-700 text-white text-sm font-medium py-1 w-full flex justify-center sm:justify-between px-2 md:px-12 lg:px-36'>
            <div className=' hidden sm:flex items-center gap-x-1'>
                <span>Created with</span>
                <FaRegHeart className=' text-red-500'/>
                <span className=' hover:underline cursor-pointer'><a href="https://www.linkedin.com/in/sarbajit-chaki/" target='_blank'>by SarbajitChaki</a></span>
            </div>
            <div className=' text-center'>
                <span className=' text-center'>Copyright &copy; {currYear} Get Me A Chai - All rights reserved!</span>
            </div>
        </footer>
    )
}

export default Footer
