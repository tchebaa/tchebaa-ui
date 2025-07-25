"use client"

import {useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import {useRouter, useSearchParams} from 'next/navigation'
import FooterComponent from '../../components/FooterComponent'
import { BsDot } from "react-icons/bs";
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header';
import LoginModal from '../../components/LoginModal'
import SignUpModal from '../../components/SignUpModal'
import ForgotPasswordModal from '../../components/ForgotPasswordModal'
import ConfirmAccountModal from '../../components/ConfirmAccountModal'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useUser} from '../../context/UserContext'
import {signOut, deleteUser} from '@aws-amplify/auth'
import {signIn, getCurrentUser} from '@aws-amplify/auth';


Amplify.configure(outputs)

const client = generateClient<Schema>();



const profileImages = [
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion9.png?alt=media&token=dcdcaf03-d213-4c5b-a4b7-52cd37cb558b',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion8.png?alt=media&token=0559c698-035d-412b-9687-8f961c39b69f',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion7.png?alt=media&token=5ec2748a-5311-4ada-b3a6-5cb1f6859611',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion6.png?alt=media&token=b2d31fcc-f3f4-4a1c-9b95-b45316192bd3',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion5.png?alt=media&token=05aedc60-e0c5-4a98-b807-debfd0388c62',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion4.png?alt=media&token=d38b737b-fdd8-4034-84c4-253a40fe864d',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion11.png?alt=media&token=2b514675-4a19-44a0-ac62-6c84ffa16a95',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion10.png?alt=media&token=963ae009-cf0c-4ecd-a2f3-fe5e59d217cc',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion1-min.png?alt=media&token=482e9003-2f8b-4a81-a94b-e8ea45783ec7',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion14.png?alt=media&token=260caada-2930-4ad5-9213-f3cde33bf004',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion15.png?alt=media&token=a63c9238-755c-47ac-9d8d-271a9528b6d1',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion16.png?alt=media&token=c692f9f8-e084-4062-a005-0732fdcfb10e',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion17.png?alt=media&token=861a7fa5-0a28-49c5-aefe-e49e9af02574',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion18.png?alt=media&token=aa57eb71-88ba-493d-b38b-d10f455c95be',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion19.png?alt=media&token=056fa70b-8966-4783-aac9-3a5f10850a21',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion20.png?alt=media&token=fa985924-72ff-45fb-9b51-a987c3f16a63',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion21.png?alt=media&token=ba151e1f-efe7-480b-a680-38f2713ffdcd'
]





export default function DeleteAccount() {

    const searchParams = useSearchParams()
    const t = useTranslations()
    const {userDetails, setUserDetails, onlineUserDetails} = useUser()

    const category = searchParams.get('categoryTitle')
    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [openSignOutModal, setOpenSignOutModal] = useState<boolean>(false)
    const [openDeleteAccountModal, setDeleteAccountModal] = useState<boolean>(false)
    const [loadingSignOut, setLoadingSignOut] = useState<boolean>(false)



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

    const checkCurrentUser = async () => {
    
    
    
          try{
    
            const { username, userId, signInDetails } = await getCurrentUser();
    
            
    
          
    
          if(userId) {
    
            
    
            setUserDetails({username: signInDetails?.loginId ?? '', userId: userId})
            
    
          }
    
          } catch (e) {
            
          }
          
    
    
        }

        const handleOpenSettings = () => {
                window.open('http://tchebaa.com/pages/settingsPage', '_blank'); // '_self' for same tab
            };

    useEffect(()=> {
        checkCurrentUser()

    },[loginModal])



    return(
        <div className="flex flex-col w-full  h-full bg-gray-300 items-center">
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
                signUpModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} 
                confirmationModal={confirmationModal} 
                setConfirmationModal={setConfirmationModal}/>
                </div>
                :
                null
            }
                    
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
        <div className="flex flex-col w-11/12 max-w-6xl rounded-md mt-28 border border-black bg-white items-center mb-4 min-h-screen p-5">
        <div className='w-full'>
            <div className='font-semibold text-black'>{t('toDeleteAccount')}</div>
            <div className='font-semibold mt-10 text-black'>{t('onTheMobileApp')}</div>
            <div className='text-black mt-5'>{t('openTheApp')}</div>
            <div className='text-black '>{t('ifNotLoggedIn')}</div>
            <div className='text-black '>{t('goToProfile')}</div>
            <div className='text-black '>{t('deleteAccount')}</div>
            <div className='text-black '>{t('confirmDeletion')}</div>
            <div className='text-black font-semibold mt-10'>{t('onTheWebsite')}</div>
            <div className='flex flex-row items-center'>
                <div className='text-black mt-5 hover:underline cursor-pointer' onClick={()=> handleOpenSettings()}>{t('openThisLink')}:</div>
                <div className='text-black mt-5 hover:underline cursor-pointer ml-2 text-gray-500 hover:text-black' onClick={()=> handleOpenSettings()}>https://www.tchebaa.com/pages/settingsPage</div>
            </div>
            
            <div className='text-black '>{t('ifNotLoggedIn')}</div>
            <div className='text-black '>{t('deleteAccount3')}</div>
            <div className='text-black '>{t('confirmDeletion4')}</div>
            <div className='text-black mt-10'>{t('alternativelyContact')}</div>
            
        </div>
            

        </div>
        <div className="bottom-0 w-full">
            <FooterComponent />
        </div>
        
    </div>
    )
}