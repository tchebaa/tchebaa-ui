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



export default function PrivacyPolicyPage() {

    const t = useTranslations()
    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)
     const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)


    return(
        <div className="flex flex-col w-full h-full bg-gray-300 items-center mb-10">
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
                setConfirmationModal={setConfirmationModal} />
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
                   
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
        <div className="flex flex-col w-11/12 max-w-6xl rounded-md mt-28 border bg-white items-center mb-20">
                <div className="w-11/12 flex flex-col">
                    <h1 className="text-2xl font-semibold mt-10 text-black">{t('privacyPolicyForTchebaa')}</h1>
                    <div className='mt-5 text-black'>{t('lastUpdatedMay')}</div>
                    
                    <div className="mt-5 ">
                    {t('thisPrivacyPolicyExplainsHowTchebaa')}

                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('informationWeCollect')}</div>
                        <div className="text-black mt-5">{t('aPersonalInformation')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('name')}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('emailAddress')}</div>
                        </div>
                        <div className="text-black mt-5">{t('bUsageData')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('deviceInformation')}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('iPaddress')}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('languagePreferences')}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('appUsageStatistics')}</div>
                        </div>
                        <div className="text-black mt-5">{t('cLocationData')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('ifYouGrantLocationPermissions')}</div>
                        </div>
                        
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('useOfInformation')}</div>
                        <div className="text-black mt-5">{t('weUseTheCollectedData')}</div>
                        
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('toCreateAndManageUserAccounts')}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('toCommunicateWithUsersAndManageAccounts')}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('toPersonalizeYourExperience')}</div>
                        </div>
                        <div className="flex flex-row">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('toComplyWithLegalObligations')}</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('sharingAndDisclosure')}</div>
                        <div className="text-black mt-5">{t('weDoNotSellYourPersonalData')}</div>
                        
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('serviceProviders')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('eventOrganizersOrBusinesses')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('lawEnforcementOrRegulators')}</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('dataSecurity')}</div>
                        
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('weTakeAppropriate')}</div>
                        </div>
                        
                    </div>
                    
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('userRights')}</div>
                        <div className=" mt-5 text-black">{t('dependingOnYourLocation')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('accessYourData')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('correctInaccurateInformation')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('requestDeletionOfYourData')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('objectToOrRestrict')}</div>
                        </div>
                        <div className=" mt-5 text-black">{t('toExerciseTheseRights')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('childrensPrivacy')}</div>
                        <div className=" mt-5 text-black">{t('ourServicesAreNotIntendedFor')}</div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('thirdPartyServices7')}</div>
                        <div className=" mt-5 text-black">{t('ourAppMayUseThirdParty')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('firebase')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('awsAmplify')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('googleMaps')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('paymentProcessors')}</div>
                        </div>
                        <div className=" mt-5 text-black">{t('theseThirdParties')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('changesToThisPrivacyPolicy')}</div>
                        <div className=" mt-5 text-black">{t('weMayUpdateThisPrivacyPolicy')}</div>
                        
                    </div>
                    <div className="mt-5 mb-10">
                        <div className="font-semibold text-lg text-black">{t('contactUs')}</div>
                        <div className="flex flex-row mt-5 ">
                            <div className='text-black'>{t('emailTchebaaIntGmailCom')}</div>
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