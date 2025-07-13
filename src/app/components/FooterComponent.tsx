"use client"

import {useEffect, useState} from 'react'
import moment from "moment"
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineCopyrightCircle, AiOutlineTikTok } from "react-icons/ai";
import Link from 'next/link';
import { FaFacebookF } from "react-icons/fa";
import Image from 'next/image'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import {useTranslations} from 'next-intl';


export default function FooterComponent(){

    const [year, setYear] = useState<string>('')

    const t = useTranslations()

    useEffect(()=> {

        setYear(moment(new Date()).format('YYYY'))

    },[])

    /**
    
    <Link className="cursor-pointer" href='/' passHref target='_blank'>
                  
        <div className="cursor-pointer">
            <FaFacebookF size={24} color="black"/>
        </div>
        
    </Link>

     <Link className="cursor-pointer" href={{ pathname: '../pages/aboutUsPage'}}
                passHref>
                  
                        <h1 className=" cursor-pointer hover:underline text-black">About Us</h1>
                  
                </Link>
    
     */



    return(
        <div className="w-full flex flex-col items-center bg-gray-200">
            <div className="mt-16 flex flex-row border-b-2 pb-5 mb-10 border-black">
                
                <Link className="cursor-pointer" href="https://www.tiktok.com/@tchebaa.internati?lang=en" passHref target='_blank'>
                    
                        <div className="ml-10 cursor-pointer">
                        <AiOutlineTikTok size={30} color="black"/>
                        </div>
                   
                </Link>
                <Link className="cursor-pointer" href="https://www.instagram.com/tchebaa_int/?hl=en" passHref target='_blank'>
                
                        <div className="ml-10 cursor-pointer">
                            <AiOutlineInstagram size={30} color="black"/>
                        </div>
                  
                </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center border-b-2 pb-5 mb-10 w-11/12 max-w-6xl border-black">
               
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/privacyPolicyPage'
                }}
                passHref>
                    
                        <h2 className=" ml-5 cursor-pointer hover:underline text-black">{t('privacyPolicy')}</h2>
                   
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/termsOfServicePage'
                }}>
                  
                        <h2 className=" ml-5 cursor-pointer hover:underline text-black">{t('termsOfUse')}</h2>
                   
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/dataProcessingAgreement'
                }}
                passHref>
                   
                        <h2 className=" ml-3 cursor-pointer hover:underline text-black">DPA</h2>
                   
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/contactUs'
                }}
                passHref>
                    
                        <h2 className=" ml-3 cursor-pointer hover:underline text-black">{t('contactUs')}</h2>
                   
                </Link>
                
            </div>
            <div className="mb-10 flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl md:mb-20">
            <div className='bg-white h-10 w-10 flex items-center justify-center rounded-full overflow-hidden'>
                <div className=" absolute">
                    <Image
                        src="/tchebaa.png"
                        width={30}
                        height={30}
                        alt="Picture of the author"
                        />
                </div>
                            
            </div>
            <div className='flex flex-row items-center mt-3 md:mt-0  justify-between text-white max-w-md w-full'>
                <div className='border px-2 rounded-md bg-black cursor-pointer py-1  flex flex-row items-center '>
                    <div><BiLogoPlayStore size={30} color='white'/></div>
                    <div>
                        <div className="text-white text-sm">{t('getItOn')}</div>
                        <div className="text-white font-medium text-sm">Google Play</div>
                    </div>
                </div>
                <div className='border px-2 rounded-md  bg-black cursor-pointer py-1   flex flex-row items-center ml-1'>
                    <div>
                    <BiLogoApple size={30} color='white'/>
                    </div>
                    <div>
                        <div className="text-white text-sm ">{t('downloadOn')}</div>
                        <div className="text-white font-medium text-sm ">App Store</div>
                    </div>
                    
                </div>
            </div>
                 <div className="flex flex-row items-center mt-10 mb-10 md:mt-0 md:mb-0">
                    <p className="  text-sm text-black">{t('copyright')}</p>
                    <div className="ml-3">
                    <AiOutlineCopyrightCircle size={18} color='black'/>
                    </div>
                    <p className=" ml-1  text-sm text-black">
                    {year} Tchebaa.
                    </p>
                    
                 </div>
            </div>
            

        </div>
    )
}