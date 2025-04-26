"use client"

import {useEffect, useState} from 'react'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";





export default function HomeHeroComponent({heroImages}: {heroImages: string []}) {


    const [backgroundImage, setBackgroundImage] = useState<string>("");

    useEffect(() => {
        const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
        setBackgroundImage(randomImage);
    }, [heroImages]);

    if (!backgroundImage) return null;




    return(
        <div className='w-full h-96  flex flex-col items-center ' style={{backgroundImage: 'url(' + `${backgroundImage}` + ')', backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                        
            <div className='w-full h-full backdrop-blur-xs  flex items-center justify-center flex-col mt-5'>
                <div className='flex flex-col items-center'>
                    <div className='text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 px-2 mr-20'>{`LET'S GO`}</div>
                    <div className='text-3xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 px-2 mr-32'>FIND YOR WAY</div>
                    <div className='text-3xl font-extrabold px-2 bg-gradient-to-r from-purple-400 to-white ml-20'>TO ANY SPECIAL PLACE</div>
                </div>
                <div className='flex flex-row items-center justify-between mt-5 w-11/12  max-w-2xl'>
                    <div className='border-2 p-2 rounded-md border-black cursor-pointer hover:border-3  bg-gradient-to-r from-green-300 to-cyan-500 ' onClick={()=> {setPlatformType('Android'); setOpenAppError(!openAppError)}}><BiLogoPlayStore size={62} color='white'/></div>
                    <div className='border-2 p-2 rounded-md border-black cursor-pointer hover:border-3 bg-gradient-to-r from-cyan-500 to-green-300 ' onClick={()=> {setPlatformType('iOS'); setOpenAppError(!openAppError)}}><BiLogoApple size={62} color='white' /></div>

                </div>
            </div>
        </div>
    )
}