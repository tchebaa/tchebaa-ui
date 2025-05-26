"use client"

import {useState, useEffect,  Dispatch, SetStateAction} from 'react'
import { BsPersonCircle, BsCalendarPlus} from "react-icons/bs";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineAddchart, MdOutlineNotificationsActive} from "react-icons/md";
import { FiMessageSquare} from "react-icons/fi";
import { IoTicketOutline} from "react-icons/io5";
import { RiDashboardLine} from "react-icons/ri";
import { AiOutlinePlusSquare} from "react-icons/ai";
import Link from 'next/link';
import { MdClose } from "react-icons/md";
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

//import {signOut} from 'firebase/auth';
//import {auth} from '../firebase/firebase'
//import {useAuth} from '../context/AuthContext'


export default function SideMenu({setSearchModalVisible, setMenuModalVisible, menuModalVisible, loginModal, setLoginModal, signUpModal, setSignUpModal}: 
    {setSearchModalVisible: Dispatch<SetStateAction<boolean>>, setMenuModalVisible: Dispatch<SetStateAction<boolean>>, menuModalVisible: boolean, 
    loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>>, signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>}) {

    const [accountModal, setAccountModal] = useState(false)
    const [languageCode, setLanguageCode] = useState('en')
    const t = useTranslations();

    const router = useRouter()

    const {userDetails} = useUser()
    const {admins} = useAdmin()

   // const {setCurrentUser, currentUser} = useAuth()


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


    return(
        <div className="md:invisible md:absolute flex flex-row bg-white fixed w-full mt-60 text-black p-1 border-b">
            <div className="flex ml-1 flex-col bg-white  w-full">
                <div className="flex flex-col mt-2">
                    {languageCode == 'en' ? <div className="border-sky-500 hover:border-b-2 p-1 cursor-pointer text-black">EN</div>: null}
                    {languageCode == 'fr' ? <div className="border-sky-500 hover:border-b-2 p-1 cursor-pointer text-black">FR</div>: null}
                    <div className="lg:ml-5 border-sky-500 hover:border-b-2 p-1 cursor-pointer text-black">KSH</div>
                </div>
                <Link className='flex flex-row items-center mt-2  lg:ml-5 border-sky-500 hover:border-b-2 p-1 cursor-pointer' href={{ pathname: '../pages/homeMessage', query: {pageMessageType: 'home' } }} passHref>
                    <div><FiMessageSquare size={25} color='black'/></div>
                    <div className='ml-2 text-black'>{t('messages')}</div>
                </Link>
                <div className='flex flex-row items-center mt-2  lg:ml-5 border-sky-500 hover:border-b-2 p-1 cursor-pointer'>
                    <div><IoTicketOutline size={25} color='black'/></div>
                    <div className='ml-2 text-black'>{t('tickets')}</div>
                </div>
                <Link className="cursor-pointer" href={{ pathname: '../pages/postEventPage' }} passHref target='_blank'>
                        <div className='flex flex-row items-center mt-2 lg:ml-5 border-sky-500 hover:border-b-2 p-1 cursor-pointer'>
                            <div><MdOutlineAddchart size={25} color='black'/> </div>
                            <div className='ml-2 text-black'>{t('post')}</div>
                        </div>
                    </Link>
                
                <div className="flex  flex-col mt-2 pb-2">
                    <div  onClick={()=> setAccountModal(!accountModal)} className="flex flex-row p-1 items-center cursor-pointer border-sky-500 hover:border-b-2">
                        <BsPersonCircle className='text-gray-400 hover:text-black' size={30} />
                        <div className="ml-2">
                        {!accountModal ? 
                        <div >
                                <MdOutlineKeyboardArrowDown size={20} color='black' />
                            </div> : 
                            <div >
                                <MdOutlineKeyboardArrowUp size={20} color='black' />
                            </div> }
                        </div>
                        <div className='color-black'>{t('account')}</div>
                    </div>
                {accountModal ? 
                <div className="w-40  mt-10 bg-white p-2 border absolute">
                    {!userDetails ? 
                    <div>
                        <div className='font-semibold text-black cursor-pointrt' onClick={()=> setLoginModal(true)} >{t('login')}</div>
                        <div className='text-black font-semibold cursor-pointer' onClick={()=> setSignUpModal(true)}>{t('signup')}</div>
                        
                    </div>
                    :
                    <div>
                        <div className='text-black font-semibold'>{t('manageevents')}</div>
                        <div className='text-black font-semibold'>{t('signout')}</div>
                        <div className='text-black font-semibold'>{t('profile')}</div>
                    </div>}
                    {admins?.some((admin)=> admin.email === userDetails?.username) ? 
                    <Link href={{ pathname: '../pages/admins', query: {pageMessageType: 'home' } }} target="_blank" passHref className='text-black font-semibold'>
                        {t('administrator')}
                    </Link>: null}
                    <div className='text-black font-semibold'>{t('settings')}</div>
                    
                    
                    
                </div>

                : null}
                </div>
            </div>
            <div className='mt-2 mr-2 cursor-pointer' onClick={()=> setMenuModalVisible(false)}>
                <MdClose size={25} color='black' />
            </div>
        </div>
    )
}