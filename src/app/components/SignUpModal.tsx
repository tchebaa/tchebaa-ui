"use client"

import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import {useLocation} from '../context/LocationContext'
import {useUser} from '../context/UserContext'
import axios from 'axios';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'
import {signUp, getCurrentUser, confirmSignUp, resendSignUpCode, signIn} from '@aws-amplify/auth'
import { MdClose } from "react-icons/md"; 



Amplify.configure(outputs)

const client = generateClient<Schema>();



export default function SignUpModal({loginModal, setLoginModal, signUpModal, setSignUpModal, forgotPasswordModal, setForgotPasswordModal}: 
  {loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>>, signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>, 
    forgotPasswordModal: boolean, setForgotPasswordModal: Dispatch<SetStateAction<boolean>>
  }) {

    const {userDetails, setUserDetails} = useUser()
    const t = useTranslations()

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>('')
    const [signUpError, setSignUpError] = useState<string>('')
    const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false)
    const [codeConfirm, setCodeConfirm] = useState<string>('')
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [confirmError, setConfirmError] = useState<string>('')
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [resendCodeModal, setResendCodeModal] = useState<boolean>(false)


    const router = useRouter()




    const handleConfirm = async () => {


      if(codeConfirm.length > 0 ) {

        try {

          const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: email,
            confirmationCode: codeConfirm
          })
  
          
          
  
          if(isSignUpComplete) {

            const user = await signIn({
              username: email,
              password: password,
            }).then((e)=> { setConfirmError(''); setConfirmModal(false); console.log(e); router.push('/locationScreen'); })
  
          
          }
  
  
        } catch(e) {

            const error = e as Error

            if(error) {

                setConfirmError(error?.message)

            }
     
  
        }

      }

      

      

    }


    



    const handleSignup = async () => {

      if(email.length > 0) {

        setEmailError('')

        if(password.length > 0) {

          setPasswordError('')

          if(password === repeatPassword) {

            setRepeatPasswordError('')

            setLoadingSignUp(true)

            try {
      
            
              const user = await signUp({
                username: email,
                password: password,
              }).then((e)=> {setSignUpError(''); setLoadingSignUp(false) ;console.log(e); setConfirmModal(true)})
      
              const { data, errors } = await client.models.User.create({
                email: email,
                postEventLimit: 3,
                pushNotificationToken: "",
                name: "",
                pushNotificationEnabled: true
              });
      
            } catch(e) {

                const error = e as Error;

                if(error) {

                    setSignUpError(error?.message)
                    setLoadingSignUp(false)

                }
            
            }


          } else {
            setRepeatPasswordError(t('passwordsdontmatch'))
          }


        } else {
          setPasswordError(t('passwordisrequired'))
        }

      } else {

        setEmailError(t('emailrequired'))

      }

      
      

    }


    return(
        <div className='w-full'>
            
            <div className="flex flex-col items-center bg-white justify-center bg-white w-full">
                <div className='w-full flex flex-row items-center justify-between p-2'>
                  <div></div>
                  <div className='cursor-pointer' onClick={()=> setSignUpModal(false)}><MdClose color='black' size={24}/></div>
                </div>
                <div className="mt-3">
                        <p className="font-semibold text-black">{t('signup')}</p>
                </div>
                {loadingSignUp ? <div className='absolute top-20 bg-white w-52 h-20 flex items-center justify-center border'>
                    <div className='text-black'>{t('loading')}</div>
                </div>: null}
                <div className="flex flex-col w-full items-center max-w-md mt-5">
                    <input className="bg-white p-2 w-11/12 border" placeholder={t('email')} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <div className="w-11/12 h-10 flex items-center justify-center ">
                            <p className=" w-11/12 md:text-base max-w-xl  text-red-500 ">{emailError}</p>
                        </div>
                    <input className="bg-white p-2 w-11/12 border" placeholder={t('password')} type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <div className="w-11/12 h-10 flex items-center justify-center ">
                            <p className=" w-11/12 md:text-base max-w-xl  text-red-500 ">{passwordError}</p>
                        </div>
                        <input className="bg-white p-2 w-11/12 border" type='password' placeholder={t('repeatpassword')} value={repeatPassword} onChange={(e)=> setRepeatPassword(e.target.value)}/>
                        <div className="w-11/12 h-10 flex items-center justify-center ">
                            <p className=" w-11/12 md:text-base max-w-xl  text-red-500 ">{repeatPasswordError}</p>
                        </div>
                        <div className="w-11/12 h-10 flex items-center justify-center ">
                            <p className=" w-11/12 md:text-base max-w-xl  text-red-500 ">{signUpError}</p>
                        </div>
                {loadingSignUp ?
                <button className=" md:text-base w-11/12 border-2 rounded-md p-1 max-w-xl mt-3 flex items-center justify-center cursor-pointer" 
                style={{backgroundColor: '#1184e8'}} >
                        <p className=" md:text-base text-white">{t('signup')}</p>
                </button>:
                <button className=" md:text-base w-11/12 border-2 rounded-md p-1 max-w-xl mt-3 flex items-center justify-center cursor-pointer" 
                    style={{backgroundColor: '#1184e8'}} onClick={()=> handleSignup()}>
                            <p className=" md:text-base text-white">{t('signup')}</p>
                    </button>}
                    <div className="flex mt-3">
                            
                            <div className='cursor-pionter' onClick={()=> {setLoginModal(false); setSignUpModal(false); setForgotPasswordModal(false)}}> 
                                <p className="ml-3  border-b cursor-pointer text-black ">{t('didntconfirmemailresendcode')}</p>
                            </div>
                        </div>
                        <div className="mt-5 flex">
                            <p className="text-black">{t('alreadyhaveanaccount')}</p>
                        <div>
                    <p className="ml-3 font-bold border-b cursor-pointer text-black" onClick={()=> {setSignUpModal(false); setLoginModal(true); setForgotPasswordModal(false)}}>{t('login')}</p>
                    </div>
                </div> 
                        
                </div>

            </div>
        </div>
    )
}