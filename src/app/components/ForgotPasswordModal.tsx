import {useState, useEffect, Dispatch, SetStateAction} from 'react'


import {signIn, getCurrentUser, confirmSignUp, resetPassword, confirmResetPassword} from '@aws-amplify/auth'
import {useUser} from '../context/UserContext'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { MdClose, MdModeEditOutline, MdDeleteForever  } from "react-icons/md"

Amplify.configure(outputs)

const client = generateClient<Schema>({
  authMode: 'apiKey',
});





export default function ForgotPasswordModal({loginModal, setLoginModal, signUpModal, setSignUpModal, forgotPasswordModal, setForgotPasswordModal}:
     {loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>>, signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>,
      forgotPasswordModal: boolean, setForgotPasswordModal: Dispatch<SetStateAction<boolean>>, confirmationModal: boolean, setConfirmationModal: Dispatch<SetStateAction<boolean>>
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
                    await resetPassword({
                        username: email
                    }).then(()=> { setResendCodeSuccess(`${t('codesentto')} ${email}. ${t('entercodebelowtocontinue')}`)})
    
                } catch(e) {

                     const error = e as Error;

                    if(error) {

                    setResendCodeError(error.message)
                    setLoadingSendCode(false)

                    }
            
    
                    
    
                }
    
    
            } else {
                setEmailError(t('emailrequired'))
            }
        }
    
    
    
        const handleConfirm = async () => {
        
        
            if(confirmEmail.length > 0) {
    
                setConfirmEmailError('')
    
                
    
                if(codeConfirm.length > 0 ) {
    
                    setConfirmModal(true)
        
                    try {
            
                       await confirmResetPassword({
                        username: email,
                        confirmationCode: codeConfirm,
                        newPassword: password
                      }).then(()=> {setConfirmModal(false); setConfirmError('')})
              
            
              
                    } catch(e) {
              
                        const error = e as Error;

                    if(error) {

                    setConfirmError(error.message)
                      setConfirmModal(false)

                    }
                     
                      
              
                    }
            
                  }
            
    
            } else {
                setConfirmEmailError(t('emailrequired'))
            }
    
              
              
        
              
        
            }
    
    
    
    
      return (
     
            <div className='w-11/12'>
                <div className='w-full flex flex-row items-center justify-between p-2'>
                    <div></div>
                    <div className='cursor-pointer' onClick={()=> setForgotPasswordModal(false)}><MdClose color='black' size={24}/></div>
                </div>
                <div className='mt-3 flex items-center flex-col'>
                    <div className='text-black font-semibold'>{t('resetpassword')}</div>
                   
                </div>
                
                {confirmModal ? 
                  <div className='w-full flex items-center flex-col'>
                    <div className='text-black font-semibold'>{t('loading')}</div>
                    
                  </div>: null}
                  {loadingSendCode ? 
                  <div className='w-full flex items-center flex-col'>
                    <div className='text-black'>{t('sendingcode')}</div>
                 
                  </div>: null}
                <div className='flex flex-col items-center mt-2'>
                    <input placeholder={t('email')} className='border p-2 w-full text-black'  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                      {emailError ? <div className='text-red-500 '>{emailError}</div>: null}
    
                      {loginError ? <div className='text-red-500 '>{loginError}</div>: null}
                    
                    {resendCodeSuccess ? null : 
                    <button className='cursor-pointer  md:text-base border-2 rounded-md p-1 ml-5  mt-3 flex items-center justify-center cursor-pointer' 
                    style={{backgroundColor: '#1184e8'}}
                    onClick={()=> handleResendCode()}>
                        <div className='text-white'>{t('sendcode')}</div>
                    </button>}
                    {resendCodeSuccess ? <div className='text-black mt-2'>{`${t('codesentto')} ${email}. ${t('entercodebelowtocontinue')}`}</div>: null}
                    {resendCodeError ? <div className='text-red-500 '>{resendCodeError}</div>: null}
                </div>
                {resendCodeSuccess ? 
                <div className='flex flex-col items-center'>
                    <input  className='border p-2 w-full mt-2 text-black' placeholder={t('entercode')} value={codeConfirm} onChange={(e)=> setCodeConfirm(e.target.value)}/>
                    <input  className='border p-2 w-full mt-2 text-black' placeholder={t('newpassword')} type='password'  value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <button onClick={()=> handleConfirm()} className='cursor-pointer  md:text-base border-2 rounded-md p-1 ml-5  mt-3 flex items-center justify-center cursor-pointer' 
                    style={{backgroundColor: '#1184e8'}}>
                        <div className='text-white'>{t('changepassword')}</div>
                    </button>
                    {confirmError ? <div className='text-red-500 '>{confirmError}</div>: null}
                </div>: null}
                <div className='w-full flex flex-col items-center mt-3'>
                    <div onClick={()=> {setLoginModal(true); setSignUpModal(false); setForgotPasswordModal(false)}}>
                        <div className="ml-3 font-bold border-b cursor-pointer text-black ">{t('login')}</div>
                    </div>
                       
                </div>
                
            </div>
       
  );
}
