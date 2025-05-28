"use client"

import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import {signIn, getCurrentUser, confirmSignUp, resendSignUpCode} from '@aws-amplify/auth'
import {useUser} from '../context/UserContext'
import { MdClose, MdModeEditOutline, MdDeleteForever  } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'




Amplify.configure(outputs)

const client = generateClient<Schema>();



export default function ConfirmAccountModal({loginModal, setLoginModal, signUpModal, setSignUpModal, forgotPasswordModal, setForgotPasswordModal}:
     {loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>>, signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>,
      forgotPasswordModal: boolean, setForgotPasswordModal: Dispatch<SetStateAction<boolean>>, confirmationModal: boolean, 
      setConfirmationModal: Dispatch<SetStateAction<boolean>>
     }) {

    const {userDetails, setUserDetails} = useUser()
    const t = useTranslations()


    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [confirmEmail, setConfirmEmail] = useState<string>('')
    const [confirmEmailError, setConfirmEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [loginError, setLoginError] = useState<string>('')
    const [loadingLogIn, setLoadingLogin] = useState<boolean>(false)
    const [codeConfirm, setCodeConfirm] = useState<string>('')
    const [confirmError, setConfirmError] = useState<string>('')
    const [loadingSendCode, setLoadingSendCode] = useState<boolean>(false)
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [resendCodeError, setResendCodeError] = useState<string>('')
    const [resendCodeSuccess, setResendCodeSuccess] = useState<string>('')
    


   
    
    
    const checkCurrentUser = async () => {



      try{

        const { username, userId, signInDetails } = await getCurrentUser();

        setUserDetails({username: signInDetails?.loginId ?? '', userId: userId})

    

    
      } catch (e) {
        
      }
      


    }


    

    


    const handleResendCode = async () => {

        if(email.length > 0) {

            setEmailError('')

            setLoadingSendCode(true)

            try {

                setResendCodeError('')
                await resendSignUpCode({
                    username: email
                }).then(()=> { setResendCodeSuccess(`${t('code.sent.to')} ${email}. ${t('enter.code.below.to.continue')}`)})

            } catch(e) {


                const error = e as Error;

                if(error.message) {

                setResendCodeError(error?.message)
                setLoadingSendCode(false)

                }

                

            }


        } else {
            setEmailError(t('email.required'))
        }
    }



    const handleConfirm = async () => {
    
    
        if(confirmEmail.length > 0) {

            setConfirmEmailError('')

            

            if(codeConfirm.length > 0 ) {

                setConfirmModal(true)
    
                try {
        
                  const { isSignUpComplete, nextStep } = await confirmSignUp({
                    username: email,
                    confirmationCode: codeConfirm
                  })
          
                  
          
                  if(isSignUpComplete) {
    
                    setConfirmModal(false)
          
                    setConfirmError('')
          
                 
          
                    
                  }
          
          
                } catch(e) {
          
                  const error = e as Error;

                    if(error.message) {

                    setResendCodeError(error?.message)
                    setLoadingSendCode(false)

                    }
                  
                }
        
              }
        

        } else {
            setConfirmEmailError(t('email.required'))
        }

          
          
    
          
    
        }




  return (
    
        <div>
            <div>
                <div className='text-black font-semibold'>{t('confirmyouraccount')}</div>
                
            </div>
            {confirmModal ? 
              <div>
                <div className='text-black font-semibold'>{t('loading')}</div>
                
              </div>: null}
              {loadingSendCode ? 
              <div>
                <div className='text-black'>{t('sendingcode')}</div>
                
              </div>: null}
            <div>
                <input className='text-black border-black' placeholder={t('email')}  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  {emailError ? <div className='text-red-500 mt-2'>{emailError}</div>: null}

                  {loginError ? <div className='text-red-500 mt-2'>{loginError}</div>: null}
                
                <button onClick={()=> handleResendCode()}>
                    <div className='text-black'>{t('resendcode')}</div>
                </button>
                {resendCodeSuccess ? <div className='text-black'>{`${t('codesentto')} ${email}.${t('entercodebelowtocontinue')}`}</div>: null}
                {resendCodeError ? <div className='text-red-500 mt-2'>{resendCodeError}</div>: null}
            </div>
            <div>
                <div className='text-black'>{t('alreadyhaveacode')}</div>
                
            </div>
            <div>
                <input className='text-black' placeholder={t('email')} value={confirmEmail} onChange={(e)=> setConfirmEmail(e.target.value)}/>
                <input className='text-black' placeholder={t('entercode')} value={codeConfirm} onChange={(e)=> setCodeConfirm(e.target.value)}/>
                <button onClick={()=> handleConfirm()}>
                    <div>{t('confirmaccount')}</div>
                </button>
                {confirmError ? <div>{confirmError}</div>: null}
            </div>
            <div>
            <button>
                <div >{t('login')}</div>
            </button>
                   
            </div>
            
        </div>

  );
}