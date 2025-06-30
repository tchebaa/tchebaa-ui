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

const client = generateClient<Schema>({
  authMode: 'apiKey',
});



export default function ConfirmAccountModal({loginModal, setLoginModal, signUpModal, setSignUpModal, forgotPasswordModal, setForgotPasswordModal, confirmationModal, setConfirmationModal}:
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
    
        <div className='w-11/12 flex flex-col items-center'>
            <div className='w-full flex flex-row items-center justify-between p-2'>
                <div></div>
                <div className='cursor-pointer' onClick={()=> setConfirmationModal(false)}><MdClose color='black' size={24}/></div>
            </div>
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
            <div className='flex flex-col w-full mt-5 items-center'>
                <input className='text-black border-black border p-2 w-full' placeholder={t('email')}  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  {emailError ? <div className='text-red-500 mt-2'>{emailError}</div>: null}

                  {loginError ? <div className='text-red-500 mt-2'>{loginError}</div>: null}
                
                <button className="cursor-pointer md:text-base  border-2 rounded-md p-1 max-w-xl mt-3 flex items-center justify-center" style={{backgroundColor: '#1184e8'}} onClick={()=> handleResendCode()} >
                    <div className=" md:text-base text-white">{t('resendcode')}</div>
                </button>
                {resendCodeSuccess ? <div className='text-black'>{`${t('codesentto')} ${email}.${t('entercodebelowtocontinue')}`}</div>: null}
                {resendCodeError ? <div className='text-red-500 mt-2'>{resendCodeError}</div>: null}
            </div>
            <div className='mt-2'>
                <div className='text-black'>{t('alreadyhaveacode')}</div>
                
            </div>
            <div className='flex flex-col w-full mt-2 items-center'>
                <input className='text-black border p-2 border-black w-full' placeholder={t('email')} value={confirmEmail} onChange={(e)=> setConfirmEmail(e.target.value)}/>
                <input className='text-black border p-2 border-black mt-2 w-full' placeholder={t('entercode')} value={codeConfirm} onChange={(e)=> setCodeConfirm(e.target.value)}/>
                <button className="cursor-pointer md:text-base w-11/12 border-2 rounded-md p-1 max-w-xl mt-3 flex items-center justify-center" style={{backgroundColor: '#1184e8'}} 
                     onClick={()=> handleConfirm()} >
                    <div className=" md:text-base text-white">{t('confirmaccount')}</div>
                </button>
                {confirmError ? <div className='text-red-500'>{confirmError}</div>: null}
            </div>
            <div>
            <button className="ml-3 font-bold border-b cursor-pointer mt-2 text-black" onClick={()=> {setSignUpModal(false); setLoginModal(true); setForgotPasswordModal(false); setConfirmationModal(false)}}>
                <div className='text-black'>{t('login')}</div>
            </button>
                   
            </div>
            
        </div>

  );
}