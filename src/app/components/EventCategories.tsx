"use client"

import {useState, useEffect, useRef} from 'react'
import Link from 'next/link';

//music icons
import { PiMicrophoneStageBold, PiMaskHappyLight, PiStethoscope, PiPlantBold, PiPottedPlantBold, PiHandCoinsBold, PiHandHeartFill } from "react-icons/pi";
import { FaMusic, FaHandsHelping} from "react-icons/fa"
import { BsFillMoonFill, BsTree, BsBuildingGear, BsPlug, BsCameraReels } from "react-icons/bs";
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineMovie} from "react-icons/md";
import { GiCeremonialMask, GiWeightLiftingUp,GiGrassMushroom, GiMountainClimbing, GiLaptop, GiAutoRepair, GiHealthCapsule, GiMusicalNotes, GiPlantRoots, GiCorn, GiSugarCane, GiWheat  } from "react-icons/gi";
import { BiSolidCamera, BiPaint, BiBriefcase, BiRun} from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { GrRun } from "react-icons/gr";
import { SiSafari, SiGofundme } from "react-icons/si";
import { IoWineOutline} from "react-icons/io5";
import { FaPersonPraying, FaHandsPraying } from "react-icons/fa6";

const eventsData = [
    {icon1:<FaMusic size={30} />,
    icon2: null, 
    title: 'Music',
    name:'music'},
    {icon1: null,
    icon2: <BsFillMoonFill size={30} />, 
    title: 'Night party',
    name:'night'},
    {icon1: null,
        icon2: <MdOutlineMovie size={30} />, 
        title: 'Movies',
        name:'movie'},
    {icon1:<PiMaskHappyLight size={30} />,
    icon2: null, 
    title: 'Performing & visuals',
    name: 'visuals'},
    {icon1:<BiSolidCamera size={30} />,
    icon2: null, 
    title: 'Photography & film',
    name:'photography'},
    {icon1:<GiLaptop size={30} />,
    icon2: null, 
    title: 'Software & tech',
    name: 'software'},
    {icon1:<PiStethoscope size={30} />,
    icon2: null, 
    title: 'Health',
    name:'health'},
    {icon1:<IoFastFoodOutline size={30}/>,
    icon2: null, 
    title: 'Food & drink',
    name:'food'},
    {icon1: null,
    icon2: <BiBriefcase size={30} />, 
    title: 'Business',
    name:'business'},
    {icon1:<BiRun size={30} />,
    icon2: null, 
    title: 'Sports & fitness',
    name:'sports'},
    {icon1:<MdTravelExplore size={30} />,
    icon2: null, 
    title: 'Travel & tourism',
    name:'travel'},
    {icon1:<GiCorn size={30} />,
    icon2: null, 
    title: 'Agriculture',
    name:'agriculture'},
    {icon1:null,
    icon2: <BsTree size={30} />, 
    title: 'Environment',
    name:'environment'},
    {icon1:<PiHandHeartFill size={30}/>,
    icon2: null, 
    title: 'Charity & fundraising',
    name:'charity'},
    {icon1:<FaPersonPraying size={30} />,
    icon2: null, 
    title: 'Religion & spirituality',
    name:'religion'},
    {icon1:<BiPaint size={30} />,
    icon2: null, 
    title: 'Art',
    name: 'art'},
    {icon1:<GiMountainClimbing size={30} />,
    icon2: null, 
    title: 'Outdoor activities',
    name:'outdoor'},
    
    {icon1:<GiAutoRepair size={30} />,
    icon2: null, 
    title: 'Engineering',
    name:'engineering'},
]

export default function EventCategories() {


    const eventRef = useRef<HTMLDivElement>(null);

    const scroll = (scrollOffset: number) => {

        if(eventRef.current) {
            eventRef.current.scrollLeft += scrollOffset;

        }
        
      };


    return(
        <div className="flex w-full flex-col items-center justify-center bg-white  pt-5 ">
            <div className='flex flex-row justify-between invisible md:visible w-full max-w-7xl mb-16 md:w-11/12 absolute '>
                <div onClick={()=> scroll(-300)} className='cursor-pointer text-black  bg-white rounded-full flex z-20 hover:border-black items-center justify-center w-10 h-10'>
                    <MdOutlineKeyboardArrowLeft size={35} color='black'/>
                </div>
                <div onClick={()=> scroll(300)}  className='cursor-pointer text-black bg-white z-20 rounded-full hover:border-black flex items-center justify-center w-10 h-10'>
                    <MdOutlineKeyboardArrowRight size={35} color='black'/>
                </div>
            </div>
            <div ref={eventRef} className="flex md:no-scrollbar ml-10 mr-10 z-10 bg-white max-w-6xl w-11/12 overflow-hidden overflow-x-scroll ">
                {eventsData.map((item, i)=> {
                    return(
                        <Link className='cursor-pointer' key={i} href={{ pathname: '../pages/searchEventPage', query: { category: item.name, categoryTitle: item.title, pageType:'category' } }} passHref>
                        <div  className='text-gray-500 p-5 w-28 flex items-center flex-col hover:text-black hover:font-bold'> 
                            <div className='flex flex-row items-center justify-center w-20 h-20 border hover:border-black rounded-md p-4 '>
                                {item.icon1 ?  <div>{item.icon1}</div> : null}
                                {item.icon2 ? <div className='ml-1'>
                                    {item.icon2}
                                </div>: null}
                                
                            </div>
                            <div className=' text-center text-black'>{item.title}</div>
                        </div>
                    </Link>
                    )
                })}
                
            </div>
        </div>
    )
}