'use client' 
import {useState} from 'react'


import Head from 'next/head'
import FooterComponent from '../../components/FooterComponent'
import Header from '../../components/Header'
import { BsDot } from "react-icons/bs";

export default function TermsOfServicePage() {

    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)


    return(
        <div className="flex flex-col w-full h-full bg-gray-300 items-center">
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible}/>
        <div className="flex flex-col w-11/12 max-w-6xl rounded-md mt-28 border bg-white items-center mb-4">
                <div className="w-11/12 flex flex-col">
                    <h1 className="text-2xl font-semibold mt-10 ">Terms of Service</h1>
                    <div className='mt-5'>Last Updated: Last Updated: 7/05/2025</div>
                    <div className='mt-5'>{`Welcome to TCHEBAA. These Terms of Use ("Terms") govern your use of our platform,
                    including our website (www.tchebaa.com), mobile application, and services ("Service"). By
                    accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If
                    you do not agree with any part of these Terms, you may not access or use the Service.`}
                    </div>
                    
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Eligibility</div>
                        <div className="mt-2 ">
                        You must be at least 18 years of age, or the legal age of majority in your jurisdiction, to use TCHEBAA. 
                        By using the Service, you represent and warrant that you meet the eligibility requirements.

                        </div>
                        
                    
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">User Accounts</div>
                        <div className="mt-2 ">To access certain features, you may be required to create an account. You agree to:</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Personal and business data provided during account registration or use of our service.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Keep your login credentials confidential.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Keep your login credentials confidential.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Notify us of any unauthorized use of your account.</div>
                        </div>
                        <div className='mt-5'>{`We reserve the right to suspend or terminate your account if any information provided is inaccurate, false, or misleading.`}</div>
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
                        <div className="font-semibold text-lg ">Content Ownership and License</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div>You retain ownership of content you post through TCHEBAA. However, by posting or uploading
                            content, you grant TCHEBAA a non-exclusive, royalty-free, worldwide license to use, reproduce,
                            display, and distribute your content in connection with providing the Service.
                            We reserve the right to remove or restrict content that violates these Terms or is otherwise
                            objectionable.</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Payments and Subscriptions</div>
                        <div className="mt-5">Some features of the Service may be offered for a fee. If you purchase a subscription or paid feature:</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">You agree to provide accurate billing information.</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} />
                            </div>
                            <div className="">Charges will be clearly disclosed and may recur depending on your subscription plan.</div>
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
                            <div className="">You may cancel at any time per the cancellation policy provided during purchase.</div>
                        </div>  
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Third-Party Links</div>
                        
                        
                        <div className="flex flex-row mt-5">
                            <div className="">TCHEBAA may include links to third-party services. We do not control these sites and are not 
                                responsible for their content or practices. Use of third-party services is at your own risk.
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Termination</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div>We may terminate or suspend your access to the Service at our discretion, with or without notice, 
                                for conduct that we believe violates these Terms or is harmful to us or other users.</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Disclaimers and Limitation of Liability</div>
                        
                        
                        <div className="flex flex-row mt-5">
                            <div className="">The Service is provided “as is” without warranties of any kind. To the fullest extent permitted by
                            law, TCHEBAA disclaims all warranties, express or implied, and is not liable for any indirect,
                            incidental, or consequential damages arising out of your use or inability to use the Service.
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Indemnification</div>
                        <div className="flex flex-row mt-5">
                            <div className="">You agree to indemnify and hold harmless TCHEBAA, its affiliates, and their officers and
                                employees from any claim or demand made by a third party due to your use of the Service,
                                violation of these Terms, or your infringement of any rights.
                            </div>
                        </div>   
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Changes to Terms</div>
                        <div className="flex flex-row mt-5">
                            <div className="">We may update these Terms from time to time. We will notify users of significant changes and
                            indicate the date of the last update. Continued use of the Service after changes constitutes your
                            acceptance of the new Terms.
                            </div>
                        </div>   
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg ">Governing Law</div>
                        <div className="flex flex-row mt-5">
                            <div className="">These Terms are governed by the laws of the State of Texas, without regard to its conflict of law
                            principles. Any disputes shall be resolved in the state or federal courts located in Bexar County,
                            Texas.
                            </div>
                        </div>   
                    </div>
                    <div className="mt-5 mb-10">
                        <div className="font-semibold text-lg ">Contact Us</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div>For any questions about these Terms, please contact us at:</div>
                        </div>
                        <div className="flex flex-row mt-5 ">
                            <div>{`📧 tchebaa.int@gmail.com`}</div>
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