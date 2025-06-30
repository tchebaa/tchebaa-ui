'use client' 
import {useState} from 'react'


import Head from 'next/head'
import FooterComponent from '../../components/FooterComponent'
import Header from '../../components/Header'
import { BsDot } from "react-icons/bs";
import LoginModal from '../../components/LoginModal'
import SignUpModal from '../../components/SignUpModal'
import ForgotPasswordModal from '../../components/ForgotPasswordModal'
import {useTranslations} from 'next-intl';
import ConfirmAccountModal from '../../components/ConfirmAccountModal'
import { useUser} from '../../context/UserContext'



export default function ContactUs() {

    const t = useTranslations()
    const {userDetails, setUserDetails, onlineUserDetails} = useUser()
    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')


    return(
        <div className="flex flex-col w-full h-full bg-gray-300 items-center">
            {
                loginModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} 
                setConfirmationModal={setConfirmationModal} />
                </div>
                :
                null
            }
            {
                forgotPasswordModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <ForgotPasswordModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} 
                setConfirmationModal={setConfirmationModal}/>
                </div>
                :
                null
            }
            {
                confirmationModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <ConfirmAccountModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} />
                </div>
                :
                null
            }
            {
                signUpModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} 
                setConfirmationModal={setConfirmationModal} />
                </div>
                :
                null
            }
                   
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
        <div className="flex flex-col w-11/12 max-w-7xl rounded-md  border bg-white  mt-28 mb-4 min-h-screen p-10">
            <div className='text-black font-semibold'>{t('contactUs')}</div>
            <div className='text-black mt-5'>{t('emailTchebaaIntGmailCom')}</div>
            {userDetails ? 
            <div className='flex flex-col'>
                <input className='text-black border mt-20 p-1 max-w-sm' placeholder={t('email')} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <textarea className='text-black border mt-5 p-1 max-w-sm h-40' placeholder={t('message')} value={message} onChange={(e)=> setMessage(e.target.value)}/>
                <div className='flex flex-col items-end max-w-sm mt-5'>
                    <div className='text-black font-semibold border-black border-2 rounded-md px-3'>{t('send')}</div>
                </div>
            </div>
            :
            <div className="w-11/12 flex flex-col" >
                    <div className='bg-white flex flex-col items-start'>
                        <div className='bg-white border-2 border-black px-3 m-5 rounded-md text-black font-semibold cursor-pointer' onClick={()=> setLoginModal(true)}>{t('login')}</div>
                    </div>
                    <div  className='bg-white flex flex-col items-start'>
                        <div className='bg-white border-2 border-black px-3 m-5 rounded-md text-black font-semibold cursor-pointer' onClick={()=> setSignUpModal(true)}>{t('signup')}</div>
                    </div>
                    
                </div>}
            
            
            </div>
            
            <div className="w-full bottom-0">
                <FooterComponent />
            </div>

        </div>
    )
}