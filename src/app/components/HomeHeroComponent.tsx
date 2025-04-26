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
                        
            <div className='w-full h-full backdrop-blur-xs  flex items-center justify-center '>
                <div className='flex flex-row items-center justify-between mt-20 w-11/12  max-w-2xl'>
                    <div className='border-2 p-2 rounded-md border-black cursor-pointer hover:border-3' onClick={()=> {setPlatformType('Android'); setOpenAppError(!openAppError)}}><BiLogoPlayStore size={62} color='gray'/></div>
                    <div className='border-2 p-2 rounded-md border-black cursor-pointer hover:border-3' onClick={()=> {setPlatformType('iOS'); setOpenAppError(!openAppError)}}><BiLogoApple size={62} color='gray' /></div>

                </div>
            </div>
        </div>
    )
}