"use client"

import {useState, useEffect, useRef} from 'react'
import Link from 'next/link';

//music icons
import { PiMicrophoneStageBold, PiMaskHappyLight, PiStethoscope, PiPlantBold, PiPottedPlantBold, PiHandCoinsBold, PiHandHeartFill } from "react-icons/pi";
import { FaMusic, FaHandsHelping, FaHospitalSymbol, FaLaptop} from "react-icons/fa"
import { BsFillMoonFill, BsTree, BsBuildingGear, BsPlug, BsCameraReels, BsGraphUp } from "react-icons/bs";
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineMovie, MdMedication} from "react-icons/md";
import {GiGraduateCap, GiCeremonialMask, GiWeightLiftingUp,GiGrassMushroom, GiMountainClimbing, GiLaptop, GiAutoRepair, GiHealthCapsule, GiMusicalNotes, GiPlantRoots, GiCorn, GiSugarCane, GiWheat  } from "react-icons/gi";
import { BiSolidCamera, BiPaint, BiBriefcase, BiRun} from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { GrRun } from "react-icons/gr";
import { SiSafari, SiGofundme } from "react-icons/si";
import { IoWineOutline, IoBriefcase} from "react-icons/io5";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaPersonPraying, FaHandsPraying, FaLaptopCode,  FaTree, FaGears } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import {useTranslations} from 'next-intl';



export default function EventCategories() {


    const eventRef = useRef<HTMLDivElement>(null);
    const t = useTranslations();


    const eventsCategories = [
        {icon:<GiGraduateCap size={30} />,
        title: t('education'),
        name:'education'},
        {icon:<FaMusic size={30} />,
         
        title: t('music'),
        name:'music'},
        {
        icon: <BsFillMoonFill size={30} />, 
        title: t('nightparty'),
        name:'night'},
        {
        icon: <FiVideo size={30}/>, 
        title: t('entertainment'),
        name:'entertainment'},
        {
        icon: <BsGraphUp size={30}/>, 
        title: t('markets'),
        name:'markets'},
        {icon:<PiMaskHappyLight size={30} />, 
        title: t('performancevisuals'),
        name: 'visuals'},
        {icon:<BiSolidCamera size={30} />,
        title: t('photography'),
        name:'photography'},
        {icon:<FaLaptopCode size={30}/>,
        title: t('softwaretech'),
        name: 'software'},
        {icon:<FaLaptop size={30}/>,
        title: t('informationtechnology'),
        name: 'informationtechnology'},
        {icon:<PiStethoscope size={30} />,
        title: t('health'),
        name:'health'},
        {icon:<FaHospitalSymbol size={30}/>,
        title: t('hospitalsandclinics'),
        name:'hospital'},
        {icon:<MdMedication size={30}/>,
        title: t('pharmacy'),
        name:'pharmacy'},
        {icon:<IoFastFoodOutline size={30}/>,
        title: t('fooddrink'),
        name:'food'},
        {
        icon: <IoBriefcase size={30} />, 
        title: t('business'),
        name:'business'},
        {icon:<BiRun size={30} />, 
        title: t('sportsfitness'),
        name:'sports'},
        {icon:<MdTravelExplore size={30} />, 
        title: t('traveltourism'),
        name:'travel'},
        {icon:<GiCorn size={30} />,
        title: t('agriculture'),
        name:'agriculture'},
        {
        icon: <FaTree size={30} />, 
        title: t('environment'),
        name:'environment'},
        {icon:<PiHandHeartFill size={30}/>, 
        title: t('charityfundraising'),
        name:'charity'},
        {icon:<FaPersonPraying size={30} />,
        title: t('religionspirituality'),
        name:'religion'},
        {icon:<GiMountainClimbing size={30} />, 
        title: t('outdooractivities'),
        name:'outdoor'},
        {icon:<BiPaint size={30} />,
        title: t('art'),
        name: 'art'},
        {icon:<IoLogoGameControllerB size={30} />,
        title: t('gamesesports'),
        name:'game'},
        
        {icon:<FaGears size={30} />,
        title: t('engineering'),
        name:'engineering'},
    ]

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
                {eventsCategories.map((item, i)=> {
                    return(
                        <Link className='cursor-pointer' key={i} href={{ pathname: '../pages/searchEventPage', query: { category: item.name, categoryTitle: item.title, pageType:'category' } }} passHref>
                        <div  className='text-gray-500 p-5 w-28 flex items-center flex-col hover:text-black hover:font-bold'> 
                            <div className='flex flex-row items-center justify-center w-20 h-20 border hover:border-black rounded-md p-4 '>
                                {item.icon}
                                
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