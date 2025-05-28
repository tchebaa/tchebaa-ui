"use client"

import {useEffect, useState, Suspense} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import ChatUser from '../../components/ChatUser'
import Header from '../../components/Header'
import axios from 'axios'
import { RiCustomerService2Fill, RiUserFollowLine, RiUserFollowFill } from "react-icons/ri";
import Link from 'next/link'
import {useUser} from '../../context/UserContext'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import LoginModal from '../../components/LoginModal'
import SignUpModal from '../../components/SignUpModal'
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import ForgotPasswordModal from '../../components/ForgotPasswordModal'
import ConfirmAccountModal from '../../components/ConfirmAccountModal'


Amplify.configure(outputs)



const client = generateClient<Schema>();



const profileImages = [
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/colorful-abstract-3840x2160-17384.jpg?alt=media&token=62f9ae17-ea13-4dcb-8925-5206a003aee7',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/wallpaperflare.com_wallpaper6.jpg?alt=media&token=2c970501-889d-424c-9009-e3d99b8acc93',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/wallpaperflare.com_wallpaper8.jpg?alt=media&token=5fd198d6-63db-45bb-a398-20b9c3fb5446',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/wallpaperflare.com_wallpaper5.jpg?alt=media&token=190c93cc-10cc-49b5-8551-4d7680ec0474',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/wallpaperflare.com_wallpaper2.jpg?alt=media&token=e01ccd54-8587-47ca-bfa8-bf432f7a747e',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/wallpaperflare.com_wallpaper.jpg?alt=media&token=f9a9f5e1-fd24-4fb9-9e69-e1d437d814ab',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/color-burst-xiaomi-3840x2160-16294.jpg?alt=media&token=e1894772-9bbc-458d-af92-825a596e857f',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/colorful-3d-render-3840x2160-12682.jpg?alt=media&token=0663622a-17ae-4827-abbf-ce0c1931854d',
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
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion21.png?alt=media&token=ba151e1f-efe7-480b-a680-38f2713ffdcd',
]

//const socket = io.connect('http://localhost:5000')




function ChatsComponent() {

    const [headerPage, setHeaderPage] = useState('homeMessage')
    const t = useTranslations()
    const {userDetails} = useUser()
    const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false)
    const [pageType, setPageType] = useState<string>(t('messages'))
    const [conversations, setConversations] = useState<{participants: string [], id: string, lastMessage: string, updatedAt: string} []>([])
    const [loadingConversations, setLoadingConversations] = useState<boolean>(true)
    const [loadingConversationsError, setLoadingConversationsError] = useState<boolean>(true)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)


    const handleGetConversations = async () => {

        setLoadingConversations(true)


        try{

            setLoadingConversationsError(false)

            /**participants: {
                        contains: userDetails?.username
                    }      */

            const { data, errors } = await client.models.Conversation.list({
            filter: {
                participants: {
                contains: userDetails?.username     
                }
            }          
            })

          

            const sanitizedSortedData = data
            .map(item => ({
                id: item.id,
                lastMessage: item.lastMessage ?? '',
                updatedAt: item.updatedAt,
                participants: (item.participants ?? []).filter((p): p is string => p !== null),
            }))
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

            setConversations(sanitizedSortedData);
            setLoadingConversations(false);
            

        } catch (e) {

            console.log(e, 'error')
            setLoadingConversations(false)
            setLoadingConversationsError(true)

        }

    }

    useEffect(()=> {

      

             handleGetConversations()

      

    

    },[userDetails])




    return(
        <div className='min-h-screen flex flex-col items-center bg-white h-screen w-full'>
                <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
                setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
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
                    signUpModal ? 
                    <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                    <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
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
                    forgotPasswordModal ? 
                    <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                    <ForgotPasswordModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                    forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} 
                    setConfirmationModal={setConfirmationModal}/>
                    </div>
                    :
                    null
                }
                <div className='w-full flex flex-col items-center mt-14'>
                    <div className='w-full h-20 absolute max-w-lg flex flex-col items-center ' 
                    style={{backgroundImage: 'url(' + `${profileImages[Math.floor(Math.random() * profileImages.length)]}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                        <div className='w-full h-full backdrop-blur-lg bg-gradient-to-b  from-transparent  to-white '></div>
                    </div>
                </div>
                <div className='text-black font-semibold w-full max-w-lg px-1 mt-2'>Chats</div>
                <div className=' w-full max-w-lg flex mt-10 flex-col items-center p-1 h-5/6 overflow-scroll  border'>
                    {conversations.map((item, i)=> {
                        return(
                            <ChatUser key={i} item={item} />
                        )
                    })}
                </div>
           
        </div>
    )
}


export default function chatsPage() {
    return (
        <Suspense >
            <ChatsComponent />
        </Suspense>
    )
}