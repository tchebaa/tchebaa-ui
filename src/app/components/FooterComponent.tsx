"use client"

import moment from "moment"
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineCopyrightCircle, AiOutlineTikTok } from "react-icons/ai";
import Link from 'next/link';
import { FaFacebookF } from "react-icons/fa";
import Image from 'next/image'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";


export default function FooterComponent(){

    let currentDate =  moment(new Date()).format('YYYY')

    return(
        <div className="w-full flex flex-col items-center bg-gray-200">
            <div className="mt-16 flex flex-row border-b-2 pb-5 mb-10">
                <Link className="cursor-pointer" href='/' passHref target='_blank'>
                  
                        <div className="cursor-pointer">
                            <FaFacebookF size={24} color="black"/>
                        </div>
                   
                </Link>
                <Link className="cursor-pointer" href="https" passHref target='_blank'>
                    
                        <div className="ml-10 cursor-pointer">
                        <AiOutlineTikTok size={24} color="black"/>
                        </div>
                   
                </Link>
                <Link className="cursor-pointer" href="https://www.instagram.com/tchebaa_int/?hl=en" passHref target='_blank'>
                
                        <div className="ml-10 cursor-pointer">
                            <AiOutlineInstagram size={30} color="black"/>
                        </div>
                  
                </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center border-b-2 pb-5 mb-10 w-11/12 max-w-6xl">
                <Link className="cursor-pointer" href={{ pathname: '../pages/aboutUsPage'}}
                passHref>
                  
                        <h1 className=" cursor-pointer hover:underline text-black">About Us</h1>
                  
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/careerPage'
                }}>
                    
                        <h2 className=" ml-5 cursor-pointer hover:underline text-black">Careers</h2>
                   
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/privacyPolicyPage'
                }}
                passHref>
                    
                        <h2 className=" ml-5 cursor-pointer hover:underline text-black">Privacy policy</h2>
                   
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/termsOfServicePage'
                }}>
                  
                        <h2 className=" ml-5 cursor-pointer hover:underline text-black">Terms of service</h2>
                   
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/covidSafetyPage'
                }}
                passHref>
                   
                        <h2 className=" ml-3 cursor-pointer hover:underline text-black">Covid-19 Requirements</h2>
                   
                </Link>
                <Link className="cursor-pointer" href={{
                    pathname: '../pages/contactPage'
                }}
                passHref>
                    
                        <h2 className=" ml-3 cursor-pointer hover:underline text-black">Contact us</h2>
                   
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
                <div className='border px-2 rounded-md bg-black cursor-pointer  flex flex-row items-center '>
                    <div><BiLogoPlayStore size={62}/></div>
                    <div>
                        <div className="text-white text-sm">GET IT ON</div>
                        <div className="text-white font-medium text-sm">Google Play</div>
                    </div>
                </div>
                <div className='border px-2 rounded-md  bg-black cursor-pointer   flex flex-row items-center ml-1'>
                    <div>
                    <BiLogoApple size={62} />
                    </div>
                    <div>
                        <div className="text-white text-sm">Download on the</div>
                        <div className="text-white font-medium text-sm md:text-lg">App Store</div>
                    </div>
                    
                </div>
            </div>
                 <div className="flex flex-row items-center mt-10 mb-10 md:mt-0 md:mb-0">
                    <p className="  text-sm text-black">Copyright</p>
                    <div className="ml-3">
                    <AiOutlineCopyrightCircle size={18}/>
                    </div>
                    <p className=" ml-1  text-sm text-black">
                    {currentDate} Tchebaa.
                    </p>
                    
                 </div>
            </div>
            

        </div>
    )
}