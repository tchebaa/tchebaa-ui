'use client' 
import {useState} from 'react'


import Head from 'next/head'
import FooterComponent from '../../components/FooterComponent'
import Header from '../../components/Header'
import { BsDot } from "react-icons/bs";
import LoginModal from '../../components/LoginModal'
import SignUpModal from '../../components/SignUpModal'
import ForgotPasswordModal from '../../components/ForgotPasswordModal'

export default function TermsOfServicePage() {

    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)


    return(
        <div className="flex flex-col w-full h-full bg-gray-300 items-center">
            {
                loginModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal}/>
                </div>
                :
                null
            }
            {
                signUpModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} />
                </div>
                :
                null
            }
            {
                !forgotPasswordModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <ForgotPasswordModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal}/>
                </div>
                :
                null
            }
                   
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
        <div className="flex flex-col w-11/12 max-w-6xl rounded-md mt-28 border bg-white items-center mb-4">
                <div className="w-11/12 flex flex-col">
                    <h1 className="text-2xl font-semibold mt-10 ">Data Processing Agreement (DPA)</h1>
                    <div className='mt-5'>Last Updated: Last Updated: 7/05/2025</div>
                    <div className='mt-5'>{`Welcome to TCHEBAA. These Terms of Use ("Terms") govern your use of our platform,
                    including our website (www.tchebaa.com), mobile application, and services ("Service"). By
                    accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If
                    you do not agree with any part of these Terms, you may not access or use the Service.`}
                    </div>
                    
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">This DPA is entered into between:</div>
                        <div className="mt-2 ">1. Controller: The user/customer of TCHEBAA</div>
                        <div className="mt-2 ">2. Processor: TCHEBAA, operated by TCHEBAA (tchebaa.int@gmail.com)</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">1. Definitions</div>
                        <div className="mt-2 ">Defines terms like Personal Data, Processing, Data Subject, etc.</div>
                        <div className="mt-5">
                            <div className="font-semibold text-lg ">2. Scope and Purpose</div>
                            <div className="mt-2 ">Processor will only process Personal Data as instructed by the Controller for TCHEBAA service purposes.</div>
                        </div>
                        <div className="font-semibold text-lg mt-5">3. Responsibilities</div>
                        <div className="font-semibold text-lg mt-2">Processor will:</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Process only as instructed.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Implement security measures.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Assist in data subject rights compliance.</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">4. Sub-Processors</div>
                        <div className="mt-2 ">Permitted with contractual safeguards and prior notice to Controller.</div>
                        <div className="mt-2 ">2. Processor: TCHEBAA, operated by TCHEBAA (tchebaa.int@gmail.com)</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">User Conduct</div>
                        <div className="mt-5">You agree not to:</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Use the Service for unlawful purposes.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Post or share content that is offensive, defamatory, or infringes on the rights of others.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Interfere with the proper functioning of the platform.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Use automated means to access the Service without our written consent.</div>
                        </div>  
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">5. International Transfers</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Processor ensures compliance using standard safeguards.</div>
                        </div>   
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">6. Audits</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Controller may request audits or documentation to verify compliance.</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">7. Data Subject Rights</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Processor helps Controller respond to requests.</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">8. Termination</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Data will be deleted upon termination unless retention is required by law.</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">9. Liability</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Each party is liable for its own breaches.</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">10. Governing Law</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Laws of Texas, USA. Disputes resolved in Bexar County, TX.</div>
                        </div>
                    </div>
                    <div className="mt-5 mb-10">
                        <div className="font-semibold text-lg ">11. Signatures</div>
                        <div className="flex flex-row mt-5 ">
                            <div>Controller and TCHEBAA to sign and date.</div>
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