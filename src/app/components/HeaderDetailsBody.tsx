"use client"

import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import { BsPersonCircle, BsCalendarPlus} from "react-icons/bs";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineAddchart, MdOutlineNotificationsActive} from "react-icons/md";
import { FiMessageSquare} from "react-icons/fi";
import { IoTicketOutline} from "react-icons/io5";
import { RiDashboardLine} from "react-icons/ri";
import { AiOutlinePlusSquare} from "react-icons/ai";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useUser} from '../context/UserContext'
import {useAdmin} from '../context/TchebaaAdminContext'
import {signOut, deleteUser} from '@aws-amplify/auth'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'
import {signIn, getCurrentUser} from '@aws-amplify/auth'



Amplify.configure(outputs)

const client = generateClient<Schema>();




export default function HeaderDetailsBody({headerPage, loginModal, setLoginModal, signUpModal, setSignUpModal}:{headerPage: string, loginModal: boolean, 
    setLoginModal: Dispatch<SetStateAction<boolean>>, signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>}) {

    const [accountModal, setAccountModal] = useState<boolean>(false)
    const [languageModal, setLanguageModal] = useState<boolean>(false)
    const [loadingSignOut, setLoadingSignOut] = useState<boolean>(false)

    const [languageCode, setLanguageCode] = useState('en')

    const t = useTranslations();
    const {userDetails, setUserDetails, onlineUserDetails} = useUser()
    const {admins} = useAdmin()

    const router = useRouter()


    const handleChangeLanguage = (item: string) => {
  
    
  
        Cookies.set('NEXT_LOCALE', item)
  
       
        
        router.refresh();

        const cookieValue = Cookies.get('NEXT_LOCALE')

        if(cookieValue) {
            setLanguageCode(cookieValue)
        }
    
      }

      useEffect(()=> {

        const cookieValue = Cookies.get('NEXT_LOCALE')

        if(cookieValue) {
            setLanguageCode(cookieValue)
        }

      },[])


          const handleSignOut = async () => {

        try {

            setLoadingSignOut(true)

            await signOut().then((e)=> {setUserDetails(null)})

            setLoadingSignOut(false)

        } catch(e) {

            setLoadingSignOut(false)

        }

    }


    const handleDeleteUserDetails = async () => {

        const { data, errors } = await client.models.OnlineUser.delete({

            id: onlineUserDetails?.id ?? ''

          });
        

        

    }

   

    const handleDeleteAccount = async () => {

        handleSignOut()
        handleDeleteUserDetails()

        await deleteUser()
        

        

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
                <div>
                    <div className='flex flex-row items-center border-sky-500 hover:border-b-2 p-1 cursor-pointer' onClick={()=> setLanguageModal(!languageModal)}>
                        {languageCode == 'en' ? <div className=" text-black">EN</div> : null}
                        {languageCode == 'fr' ? <div className=" text-black">FR</div> : null}
                        
                        <div className="">
                        {!languageModal ? 
                        <div >
                                <MdOutlineKeyboardArrowDown size={20} />
                            </div> : 
                            <div >
                                <MdOutlineKeyboardArrowUp size={20} />
                            </div> }
                        </div>
                    </div>
                    
                    {languageModal ? 
                    <div className='flex flex-col bg-white absolute border  '>
                        <div className='cursor-pointer hover:bg-gray-300 w-full h-full px-3 text-black' onClick={()=> handleChangeLanguage('en')}>EN</div>
                        <div className='cursor-pointer hover:bg-gray-300 w-full h-full px-3 text-black' onClick={()=> handleChangeLanguage('fr')}>FR</div>
                    </div>: null}
                </div>
                
                <div className="lg:ml-5 border-sky-500 hover:border-b-2 p-1 cursor-pointer text-black">USD</div>
            </div>
            {headerPage === 'homeMessage' ? 
            <div className='flex flex-row items-center justify-between border-sky-500 border-b-2 p-1 ' >
                <div><FiMessageSquare size={20}/></div>
                <div className='ml-2 text-black'>{t('messages')}</div>
            </div>: 
            null}
            {headerPage === 'home' ? 
            <Link className='flex flex-row items-center justify-between  border-sky-500 hover:border-b-2 p-1 cursor-pointer' href={{ pathname: '../pages/chatsPage', query: { pageMessageType: 'homeMessage' } }} passHref>
                <div><FiMessageSquare size={20} color='black'/></div>
                <div className='ml-2 text-black'>{t('messages')}</div>
            </Link>: 
            null}
            <div className='flex flex-row items-center justify-between  border-sky-500 hover:border-b-2 p-1 cursor-pointer'>
                <div><IoTicketOutline size={24} color='black'/></div>
                <div className='ml-2 text-black'>{t('tickets')}</div>
            </div>
            <Link className="cursor-pointer" href={{ pathname: '../pages/postEventPage' }} passHref target='_blank'>
                <div className='flex flex-row items-center  border-sky-500 hover:border-b-2 p-1 cursor-pointer'>
                    <div><MdOutlineAddchart size={25} color='black'/> </div>
                    <div className='ml-2 text-black'>{t('post')}</div>
                </div>
            </Link>
            <div className="flex items-end flex-col ml-2">
                <div  onClick={()=> setAccountModal(!accountModal)} className="flex flex-row p-1 items-center cursor-pointer border-sky-500 hover:border-b-2">
                    <BsPersonCircle className='text-gray-400 hover:text-black' size={30} />
                    <div className="ml-2">
                       {!accountModal ? 
                       <div >
                            <MdOutlineKeyboardArrowDown size={20} color='black'/>
                        </div> : 
                        <div >
                            <MdOutlineKeyboardArrowUp size={20} color='black'/>
                        </div> }
                    </div>
                    <div className='text-black'>{t('account')}</div>
                </div>
               {accountModal ? 
               <div className="w-40 mt-10 bg-white p-2 border absolute">
                    {!userDetails ? 
                    <div>
                        <div className='font-semibold text-black cursor-pointer' onClick={()=> setLoginModal(true)}>{t('login')}</div>
                        <div className='text-black font-semibold cursor-pointer' onClick={()=> setSignUpModal(true)}>{t('signup')}</div>
                        
                    </div>
                    :
                    <div>
                        <Link className='text-black font-semibold' href={{ pathname: '../pages/manageEventsPage', query: { screenName: 'main' } }} passHref>{t('manageevents')}</Link>
                        <div className='text-black font-semibold cursor-pointer'>{t('signout')}</div>
                        <div className='text-black font-semibold cursor-pointer'>{t('profile')}</div>
                    </div>}
                    {admins?.some((admin)=> admin.email === userDetails?.username) ? 
                    <Link href={{ pathname: '../pages/admins', query: {pageMessageType: 'home' } }} target="_blank" passHref  className='text-black font-semibold'>
                    {t('administrator')}
                    </Link>: null}
                    <div className='text-black font-semibold'>{t('settings')}</div>
                </div>

               : null}
            </div>
        </div>
    )
}