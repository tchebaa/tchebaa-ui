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





function AboutUsComponent() {

    const searchParams = useSearchParams()

    const category = searchParams.get('categoryTitle')
    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)


    return(
        <div className="flex flex-col w-full  h-full bg-gray-300 items-center">
            {
                loginModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
                </div>
                :
                null
            }
            {
                signUpModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
                </div>
                :
                null
            }
            
        <Head>
            <title className='text-black'>About us</title>
            <meta name='description' content='Tukiofusion is an event booking platform' />
        </Head>
        <Header  headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}/>
        <div className='w-full flex items-center bg-white h-full max-w-6xl mt-16' style={{width: '100%', height:300, position: 'relative'}}>
            <div className='w-full h-52 absolute top-0  flex flex-col items-center ' style={{backgroundImage: 'url(' + `${profileImages[Math.floor(Math.random() * profileImages.length)]}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                <div className='w-full h-full backdrop-blur-sm bg-gradient-to-b from-transparent to-white '></div>
            </div>
        </div>
        <div className='w-full z-0 items-center absolute flex flex-col bg-black opacity-70 items-center max-w-6xl mt-16 justify-center px-20 py-1'  style={{textShadow: "1px 2px 1px #000000", height:300}}>
            <div className='text-white text-4xl md:text-6xl font-extrabold text-center'>{`Let's fuse`}</div>
            <div className='text-white text-xl mt-5 md:text-2xl font-extrabold text-center'>{`Bringing events together`}</div>        
        </div>
                        
        <div className="flex flex-col w-full max-w-6xl bg-white rounded-md border-b items-center " >
            <h1 className="mt-10 text-2xl font-semibold w-11/12 ">{`About Us`}</h1>
            <h2 className="w-11/12 font-semibold text-lg mt-5">{`What does Tukiofusion mean?`}</h2>
                    <h3 className="w-11/12 mt-2 ">
                    {`The word Tukio is a swahili word which means event in English`}
                    </h3>
                    <h3 className="w-11/12 mt-2 ">
                    {`The word Fusion is a word in English which means combination`}
                    </h3>
            <p className="w-11/12 mt-5 ">{`Tukiofusion makes it easy for you to find and book events. 
            We enable you to find your favourite events from different top-rated event organizers from all over the world. 
            Search and book events so incredible, you’ll want to tell your friends and 
            get access to a powerful platform that lets you search, find, book, and reserve events.`}
            </p >
            <p className="w-11/12 ">{ `To ensure the reliability and high quality of our service, we check the registration papers of all event organizers`}</p>
            <p className="w-11/12 ">{`We offer the flexibility of event cancellation depending if the organizer has enabled it. 
            Check if the event organizer provides free cancellation before booking, it's easy.`}</p>
            <p className="w-11/12 mt-5 font-semibold ">{`Are you an event organizer?`}</p>
            <p className="w-11/12 mb-10 mt-2 ">{`Join Tukiofusion to promote your events and experiences. There are no fees for 
                    listing with us or receiving inquiries. 
                        We only charge a commission when you get a 
                        successful booking via our platform.`}</p>
                        
        </div>
        <div className="bottom-0 w-full">
            <FooterComponent />
        </div>
        
    </div>
    )
}


export default function AboutUsPage() {
    return (
      // You could have a loading skeleton as the `fallback` too
      <Suspense >
        <AboutUsComponent />
      </Suspense>
    )
  }