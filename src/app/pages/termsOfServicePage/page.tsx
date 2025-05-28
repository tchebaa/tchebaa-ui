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
        <div className="flex flex-col w-11/12 max-w-6xl rounded-md mt-28 border bg-white items-center mb-4">
                <div className="w-11/12 flex flex-col">
                    <h1 className="text-2xl font-semibold mt-10 text-black">{t('termsOfUse')}</h1>
                    <div className='mt-5 text-black'>{t('effectiveDate')}</div>
                    <div className='mt-5 text-black'>{t('welcomeToTchebaa')}
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('accountRegistrationAndResponsibilites')}</div>
                        <div className="mt-2 text-black">{t('toUseCertainFeaturesOfTchebaa')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('provideAccurate')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('maintainConfidentiality')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('beFullyResponsible')}</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('eligibility')}</div>
                        <div className="mt-2 text-black">
                        {t('youMustBeAtLeast')}

                        </div>
                        
                    
                        
                    </div>
                    
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('useOfTheServices')}</div>
                        <div className="mt-5 text-black">{t('youMayUseTchebaaTo')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('createAndPromoteEvents')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('browseAndSaveFavoriteEvents')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('viewPersonalizedRecommendations')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('accessAdditionalFeaturesAsAPaidUser')}</div>
                        </div>  
                        <div className="mt-5 text-black">{t('youAgreeNotTo')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('useThePlatformForIllegal')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('postContentThatIsDefamatory')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('interfereWithTheProperWorking')}</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('paidServicesAndSubscriptions')}</div>
                        <div className="mt-5 text-black">{t('certainFeaturesOfTchebaa')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('youAuthorizeUsToChargeYourPaymentMethod')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('youAcknowledgeThatFeesAre')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('weMayChangePricing')}</div>
                        </div>
                        
                        
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('userContent')}</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div className='text-black'>{t('youMayUploadOrShare')}</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('locationBasedServices')}</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div className='text-black'>{t('someFeaturesRequireAccessToYourDevice')}</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('privacy')}</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div className='text-black'>{t('yourUseOfTheServicesIs')}</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('termination')}</div>
                        <div className="mt-5 text-black">{t('weMaySuspendOrTerminate')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('youBreachTheseTerms')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('weSuspectFraudulent')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('weAreRequiredToDo')}</div>
                        </div>
                        <div className="mt-5 text-black">{t('youMayDeleteYourAccount')}</div> 
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('intellectualProperty')}</div>
                        
                        
                        <div className="flex flex-row mt-5">
                            <div className="text-black">{t('allTchebaaContentBranding')}</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('thirdPartyServices')}</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div className='text-black'>{t('tchebaaMayLinkToOrInteractWith')}</div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('disclaimers')}</div>
                        
                        
                        <div className="flex flex-row mt-5">
                            <div className="text-black">{t('tchebaaIsProvidedAsIs')}
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('termination')}</div>
                        <div className="mt-5 text-black">{t('toTheFullestExtentPermitted')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('anyIndirectIncidental')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black'/>
                            </div>
                            <div className="text-black">{t('lossOfDataIncomeOrReputation')}</div>
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="mt-1">
                                <BsDot size={20} color='black' />
                            </div>
                            <div className="text-black">{t('errorsOrDowntimeInTheService')}</div>
                        </div>
                         
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('indemnity')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="text-black">{t('youAgreeToIndemnify')}
                            </div>
                        </div>   
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('governingLawAndDisputeResolution')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="text-black">{t('thisAgreementIsGovernedByTheLaws')}
                            </div>
                        </div>   
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold text-lg text-black">{t('changesToThisAgreement')}</div>
                        <div className="flex flex-row mt-5">
                            <div className="text-black">{t('weMayUpdateTheseTerms')}
                            </div>
                        </div>   
                    </div>
                    <div className="mt-5 mb-10">
                        <div className="font-semibold text-lg text-black">{t('contactUs')}</div>
                        
                        
                        <div className="flex flex-row mt-5 ">
                            <div className='text-black'>{t('ifYouHaveQuestionsOrNeedSupport')}</div>
                        </div>
                        <div className="flex flex-row mt-5 ">
                            <div className='text-black'>{t('emailTchebaaInt')}</div>
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