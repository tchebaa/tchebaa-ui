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

export default function TermsOfServicePage() {

    const t = useTranslations()
    const [loadParticles, setLoadParticles] = useState(true) 
    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)


    return(
        <div className="flex flex-col w-full h-full bg-gray-300 items-center">
            {
                loginModal ? 
                <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
                forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal}setConfirmationModal={setConfirmationModal}/>
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
                    <h1 className="text-2xl font-semibold mt-10 text-black">{t('DPA')}</h1>
                    <div className='mt-5 text-black'>{t('effectiveDate')}</div>
                    
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('thisDPAIsEnteredIntoBetween')}</div>
                        <div className="mt-2 text-black">{t('controllerTheUser')}</div>
                        <div className="mt-2 text-black">{t('processorTchebaa')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('definitions')}</div>
                        <div className="mt-2 text-black">{t('definesTermsLikePersonalData')}</div>
                        <div className="mt-5">
                            <div className="font-semibold text-lg text-black">{t('scopeAndPurpose')}</div>
                            <div className="mt-2 text-black">{t('processorWillOnlyProcessPersonalData')}</div>
                        </div>
                        <div className="font-semibold text-lg mt-5 text-black">{t('responsibilities')}</div>
                        <div className="font-semibold text-lg mt-2 text-black">{t('processorWill')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('processOnlyAsInstructed')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('implementSecurityMeasures')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('assistInDataSubjectRightsCompliance')}</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('subProcessors')}</div>
                        <div className="mt-2 text-black">{t('permittedWithContractualSafeguards')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('internationalTransfers')}</div>
                        <div className="mt-2 text-black">{t('processorEnsuresComplianceUsingStandardSafeguards')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('internationalTransfers')}</div>
                        <div className="mt-2 text-black">{t('processorEnsuresComplianceUsingStandardSafeguards')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('audits')}</div>
                        <div className="mt-2 text-black">{t('controllerMayRequestAudits')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('termination')}</div>
                        <div className="mt-2 text-black">{t('dataWillBeDeletedUponTermination')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('liability')}</div>
                        <div className="mt-2 text-black">{t('eachPartyIsLiableForItsOwnBreaches')}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('governingLaw')}</div>
                        <div className="mt-2 text-black">{t('lawsOfTexasUSA')}</div>
                    </div>
                    <div className="mt-5 mb-20">
                        <div className="font-semibold text-lg text-black">{t('signatures')}</div>
                        <div className="mt-2 text-black">{t('controllerAndTchebaaToSignAndDate')}</div>
                    </div>
                    

                </div>

            </div>
            <div className="w-full bottom-0">
                <FooterComponent />
            </div>

        </div>
    )
}