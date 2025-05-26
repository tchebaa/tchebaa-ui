'use client' 
import {useState} from 'react'


import Head from 'next/head'
import FooterComponent from '../../components/FooterComponent'
import Header from '../../components/Header'
import { BsDot } from "react-icons/bs";
import LoginModal from '../../components/LoginModal'
import SignUpModal from '../../components/SignUpModal'

export default function PrivacyPolicyPage() {

    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)


    return(
        <div className="flex flex-col w-full h-full bg-gray-300 items-center">
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
                   
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
        <div className="flex flex-col w-11/12 max-w-6xl rounded-md mt-28 border bg-white items-center mb-4">
                <div className="w-11/12 flex flex-col">
                    <h1 className="text-2xl font-semibold mt-10 ">Privacy Statement</h1>
                    <div className='mt-5'>Last Updated: 7/05/2025</div>
                    
                    <div className="mt-5 ">
                    {`This Privacy Policy explains how TCHEBAA collects, uses, and discloses your information when you use our platform.
                        We are committed to protecting your personal data and complying with applicable privacy laws,including GDPR and CCPA. `}

                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Information We Collect</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Personal and business data provided during account registration or use of our service..</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Technical data from your device or usage such as the date and time that you used our Services and preferred languages.</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Use of information</div>
                        <div className="mt-2 ">
                        In order to respect the data privacy regulations of the various jurisdictions in which we operate, 
                        we are dedicated to offering you pertinent content on our Services. We utilize information about you in a 
                        variety of ways so that you can benefit from and use our Services, including the following:
                        </div>
                        
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">To provide, maintain, and improve our services.</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">To communicate with users and manage accounts.</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Sharing and Disclosure</div>
                        
                        
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">With event organizers, service providers, and for legal compliance.</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Data Security</div>
                        
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Measures to protect data from unauthorized access or misuse.</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">User Rights</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Access, correction, deletion, and portability of personal data.</div>
                        </div>
                        
                    </div>
                    <div className="mt-5 mb-10">
                        <div className="font-semibold text-lg ">Contact Us</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Email: tchebaa.int@gmail.com</div>
                        </div>
                        
                    </div>


                </div>

            </div>
            <div className="w-full bottom-0">
                <FooterComponent />
            </div>

        </div>
    )
}