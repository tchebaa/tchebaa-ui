"use client"

import {useState, useEffect, Dispatch, SetStateAction,} from 'react'
import Link from 'next/link'
//import ForgotPasswordButton from './ForgotPasswordButton'
import { MdClose, MdModeEditOutline, MdDeleteForever  } from "react-icons/md";
import { useRouter } from 'next/navigation';
import {useUser} from '../context/UserContext';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'
import {signIn, getCurrentUser} from '@aws-amplify/auth'



Amplify.configure(outputs)

const client = generateClient<Schema>();



export default function LoginModal({loginModal, setLoginModal, signUpModal, setSignUpModal, forgotPasswordModal, setForgotPasswordModal}:
     {loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>>, signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>,
      forgotPasswordModal: boolean, setForgotPasswordModal: Dispatch<SetStateAction<boolean>>, confirmationModal: boolean, 
            setConfirmationModal: Dispatch<SetStateAction<boolean>>
     }) {


    const t = useTranslations()
    const {userDetails, setUserDetails} = useUser()

    
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [loginError, setLoginError] = useState<string>('')
    const [loadingLogIn, setLoadingLogin] = useState<boolean>(false)
    const [openForgotPassword, setOpenForgetPassword] = useState<boolean>(false)


    const router = useRouter()
    
    
    const checkCurrentUser = async () => {



      try{

        const { username, userId, signInDetails } = await getCurrentUser();

        

      

      if(userId) {

        

        setUserDetails({username: signInDetails?.loginId ?? '', userId: userId})
        

      }

      } catch (e) {
        
      }
      


    }

  


    useEffect(()=> {

     checkCurrentUser()

    
    },[loadingLogIn])

    


    const handleLogin = async () => {

      if(email.length > 1) {

        setEmailError('')

        if(password.length > 1) {

          setPasswordError('')

          setLoadingLogin(true)

          try {

      
            const user = await signIn({
              username: email,
              password: password,
            }).then((e)=> { setLoginError(''); setLoadingLogin(false)})
    
            
    
          } catch(e) {


            const error = e as Error;

            if(error.message) {

            setLoginError(error?.message)
            setLoadingLogin(false)

            }
           
    
            
    
          
            
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
            
            <div className="bg-white flex flex-col items-center justify-center  w-full">
                <div className='w-full flex flex-row items-center justify-between p-2'>
                  <div></div>
                  <div className='cursor-pointer' onClick={()=> setLoginModal(false)}><MdClose color='black' size={24}/></div>
                </div>
                <div className="mt-3">
                        <p className="font-semibold tezt-black">{t('login')}</p>
                </div>
                    {loadingLogIn ? <div className='absolute top-20 bg-white w-52 h-20 flex items-center justify-center border'>
                    <div className='text-black'>{t('loggingin')}</div>
                </div>: null}
                <div className="flex flex-col w-full bg-white items-center ">
                    
                    <input className="bg-white p-2 w-11/12 max-w-xl mt-5 border text-black" placeholder={t('email')} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <div className="w-11/12 h-10 flex items-center justify-center">
                            <p className=" w-11/12 md:text-base max-w-xl  text-red-500 ">{emailError}</p>
                        </div>
                    <input className="bg-white p-2 w-11/12 border text-black" placeholder={t('password')} type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <div className="w-11/12 h-4 flex items-center justify-center mt-1">
                            <p className=" w-11/12 md:text-base max-w-xl  text-red-500 ">{passwordError}</p>
                        </div>
                        <div className="w-11/12 h-4 flex items-center justify-center mt-1">
                            <p className=" w-11/12 md:text-base max-w-xl  text-red-500 ">{loginError}</p>
                        </div>
                    {loadingLogIn ? 
                    <button className=" md:text-base w-11/12 border-2 rounded-md p-1 max-w-xl mt-3 flex items-center justify-center cursor-pointer" style={{backgroundColor: '#1184e8'}} >
                            <p className=" md:text-base text-white">{t('login')}</p>
                    </button>: 
                    <button className="cursor-pointer md:text-base w-11/12 border-2 rounded-md p-1 max-w-xl mt-3 flex items-center justify-center" style={{backgroundColor: '#1184e8'}} 
                    onClick={()=> handleLogin()} >
                            <p className=" md:text-base text-white">{t('login')}</p>
                    </button>}
                    <div className="w-11/12 flex justify-end mt-3 justify-self-end">
                        <button onClick={()=> {setForgotPasswordModal(true); setLoginModal(false); setSignUpModal(false)}}>
                            <p className=" flex justify-self-end mr-2  cursor-pointer hover:underline text-black">{t('forgotpassword')}</p>
                        </button>
                    </div>
                    
                    <div className="flex mt-3">
                            
                            <div className='cursor-pionter' onClick={()=> {setLoginModal(false); setSignUpModal(false); setForgotPasswordModal(false)}}> 
                                <p className="ml-3  border-b cursor-pointer text-black ">{t('didntconfirmemailresendcode')}</p>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <p className="text-black">Need an account?</p>
                            <div className='cursor-pionter' onClick={()=> {setLoginModal(false); setSignUpModal(true); setForgotPasswordModal(false)}}> 
                                <p className="ml-3 font-bold border-b cursor-pointer text-black ">{t('signup')}</p>
                            </div>
                        </div>
                </div>

            </div>
        </div>
    )
}