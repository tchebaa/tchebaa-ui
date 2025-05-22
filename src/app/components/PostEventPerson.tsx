"use client"
import {useState, Dispatch, SetStateAction} from 'react'
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import {useTranslations} from 'next-intl';

export default function PostEventPerson ({personType, setPersonType, companyName, setCompanyName, companyEmail, setCompanyEmail, companyNameError, 
  companyEmailError, personName, setPersonName, personNameError, email, setEmail, screenName, emailError}: 
  {personType: boolean, setPersonType: Dispatch<SetStateAction<boolean>>, companyName: string, setCompanyName: Dispatch<SetStateAction<string>>, companyEmail: string,
        setCompanyEmail: Dispatch<SetStateAction<string>>, companyNameError: boolean, companyEmailError: boolean, personName: string, setPersonName:Dispatch<SetStateAction<string>>,
        personNameError: boolean, email: string, setEmail: Dispatch<SetStateAction<string>>, screenName: string, emailError: boolean
    }) {


        const t = useTranslations()

    return(
        <div className='w-full h-full'>
            <div className='w-full mt-5 h-full'>
            {screenName === 'admin' ? 
                <div>
                    <div className='text-black font-semibold'>{t('eventorganizer')}</div>
                    <input placeholder={t('email')}  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    { emailError ? <div className='text-black'>{t('emailrequired')}</div>: null}
                </div>
                : null
                }
                {personType ? 
                <div className='text-black font-semibold'>{t('iaman')}</div> 
                :
                <div className='text-black font-semibold'>{t('iama')}</div>
                }
                <div className='flex flex-row items-center'>
                    <div className='flex flex-row items-center cursor-pointer' onClick={()=> setPersonType(!personType)}>
                        {personType ? 
                        <MdOutlineRadioButtonChecked  size={16} color={'#1184e8'}/>
                        :
                        <MdOutlineRadioButtonUnchecked  size={16} color={ "black"}/>
                        }
                        <div className='ml-2 text-black'>{t('individual')}</div>
                    </div>
                    <div className='flex flex-row items-center ml-2 cursor-pointer'  onClick={()=> setPersonType(!personType)}>
                        {!personType ? 
                        <MdOutlineRadioButtonChecked  size={16} color={'#1184e8'}/>
                        :
                        <MdOutlineRadioButtonUnchecked  size={16} color={"black"}/> 
                        }
                        <div className='ml-2 text-black'>{t('company')}</div>
                    </div>
                </div>
                {!personType ? 
                <div className='mt-2'>
                    <input className='border p-2' placeholder={t('companyname')}  value={companyName} onChange={(e)=> setCompanyName(e.target.value)}/>
                    {companyNameError ? <div className='text-red-500'>{t('companynamerequired')}</div> : <div ></div>}
                    <input className='border p-2 mt-2'  placeholder={t('companyemail')}   value={companyEmail} onChange={(e)=> setCompanyEmail(e.target.value)}/>
                    {companyEmailError ? <div className='text-red-500'>{t('companyemailrequired')}</div> : <div ></div>}
                </div> : 
                <div className='mt-2'>
                    <input className='border p-2' placeholder={t('myname')}  value={personName} onChange={(e)=> setPersonName(e.target.value)}/>
                    {personNameError ? <div className='text-red-500'>{t('yournameisrequired')}</div> : <div ></div>}
                </div>}
            </div> 
        </div>
    )
}