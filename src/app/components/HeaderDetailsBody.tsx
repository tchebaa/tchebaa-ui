"use client"

import {useState, useEffect} from 'react'
import { BsPersonCircle, BsCalendarPlus} from "react-icons/bs";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineAddchart, MdOutlineNotificationsActive} from "react-icons/md";
import { FiMessageSquare} from "react-icons/fi";
import { IoTicketOutline} from "react-icons/io5";
import { RiDashboardLine} from "react-icons/ri";
import { AiOutlinePlusSquare} from "react-icons/ai";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



export default function HeaderDetailsBody({headerPage}:{headerPage: string}) {

    const [accountModal, setAccountModal] = useState(false)

    const router = useRouter()


    const handleChangeLanguage = () => {
  
    
  
        Cookies.set('NEXT_LOCALE', 'en')
  
        console.log('chnaged')
        router.refresh();
    
      }

    /**
     * {!currentUser ? 
            <Link className="cursor-pointer" href={{ pathname: './pages/authPage', query:{loginType: true} }}>
                <div className='cursor-pointer hover:bg-gray-100 p-1 text-black'>Login</div>
            </Link>: null}
            {!currentUser ? 
            <Link className="cursor-pointer" href={{ pathname: './pages/authPage', query:{signType: true} }}>
                <div className='cursor-pointer hover:bg-gray-100 p-1 text-black'>Sign up</div>
            </Link>: null}
                
            {currentUser ? <div className='cursor-pointer hover:bg-gray-100  p-1 text-black' onClick={()=> signOut(auth)}>Sign out</div>: null}
     */



    return(
        <div className="flex flex-row items-center lg:justify-between w-full">
            <div className="flex items-center flex-row">
                <div className="border-sky-500 hover:border-b-2 p-1 cursor-pointer text-black">EN</div>
                <div className="lg:ml-5 border-sky-500 hover:border-b-2 p-1 cursor-pointer text-black">KSH</div>
            </div>
            {headerPage === 'homeMessage' ? 
            <div className='flex flex-row items-center justify-between border-sky-500 border-b-2 p-1 ' >
                <div><FiMessageSquare size={20}/></div>
                <div className='ml-2 text-black'>Message</div>
            </div>: 
            null}
            {headerPage === 'home' ? 
            <Link className='flex flex-row items-center justify-between  border-sky-500 hover:border-b-2 p-1 cursor-pointer' href={{ pathname: '../pages/homeMessage', query: { pageMessageType: 'homeMessage' } }} passHref>
                <div><FiMessageSquare size={20}/></div>
                <div className='ml-2 text-black'>Message</div>
            </Link>: 
            null}
            <div className='flex flex-row items-center justify-between  border-sky-500 hover:border-b-2 p-1 cursor-pointer'>
                <div><MdOutlineNotificationsActive color='black'  size={25}/></div>
                <div className='ml-2 text-black'>Notifications</div>
            </div>
            <div className='flex flex-row items-center justify-between  border-sky-500 hover:border-b-2 p-1 cursor-pointer'>
                <div><IoTicketOutline size={24}/></div>
                <div className='ml-2 text-black'>Bookings</div>
            </div>
            <Link className="cursor-pointer" href={{ pathname: '../pages/dashboardLandingPage' }} passHref target='_blank'>
                <div className='flex flex-row items-center  border-sky-500 hover:border-b-2 p-1 cursor-pointer'>
                    <div><MdOutlineAddchart size={25} /> </div>
                    <div className='ml-2 text-black'>Post</div>
                </div>
            </Link>
            <div className="flex items-end flex-col ml-2">
                <div  onClick={()=> setAccountModal(!accountModal)} className="flex flex-row p-1 items-center cursor-pointer border-sky-500 hover:border-b-2">
                    <BsPersonCircle className='text-gray-400 hover:text-black' size={30} />
                    <div className="ml-2">
                       {!accountModal ? 
                       <div >
                            <MdOutlineKeyboardArrowDown size={20} />
                        </div> : 
                        <div >
                            <MdOutlineKeyboardArrowUp size={20} />
                        </div> }
                    </div>
                    <div className='text-black'> Account</div>
                </div>
               {accountModal ? 
               <div className="w-40 h-20 mt-10 bg-white p-2 border absolute">
                    
                    
                </div>

               : null}
            </div>
        </div>
    )
}