"use client"

import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import DateSelectComponent from './DateSelectComponent';
import {useDate} from '../context/DateContext'

//import DatePicker from "react-datepicker";

//import "react-datepicker/dist/react-datepicker.css";



export default function SearchComponent({category, categoryTitle, setOpenMobileMap, searchTerm, setSearchTerm, handleGetNearEvents}: 
    {category: string, categoryTitle: string, searchTerm: string, setOpenMobileMap: Dispatch<SetStateAction<boolean>>, 
        setSearchTerm: Dispatch<SetStateAction<string | null>>, handleGetNearEvents: ()=> void}) {

 
            const {startDate, endDate, setStartDate, setEndDate} = useDate()

   

    


    
    
    return(
       

                <div className='bg-white z-10   flex w-full justify-center flex-col border-b pb-5  pt-5'>
                    <div className='flex w-full flex-row items-center justify-between'>
                        <div  className=' ml-1 text-gray-400 p-2  flex flex-row truncate hover:shadow items-center rounded-full max-w-sm'>
                            <div><MdLocationOn size={20} /></div>
                            <div className='text-gray-400 ml-2 text-ellipsis'>Mombasa kenya</div>
                        </div>
                        <div  className=' ml-1 text-gray-400 p-2 cursor-pointer flex flex-row truncate shadow md:invisible md:absolute  items-center rounded-full max-w-sm'
                        onClick={()=> setOpenMobileMap(true)}>
                            <div className='text-orange-600'><MdLocationOn size={20} /></div>
                            <div className='  text-black font-semibold text-sm'>Show map</div>
                        </div>
                    </div>
                    
                    <div className=' ml-2 p-1 flex flex-row hover:shadow mt-5 items-center border rounded-full max-w-sm'>
                        
                        <input placeholder={`Search ${categoryTitle} events`} value={searchTerm} onChange={(event)=>{setSearchTerm(event.target.value);}} className='rounded-full w-full h-full p-2' />
                        <div className='pr-2 cursor-pointer' onClick={()=> handleGetNearEvents()}>
                            <BiSearch size={25} color='#00BDFE' />
                        </div>
                    </div>
                    <div className='flex flex-row flex-wrap items-center mt-1 w-10/12 ml-2'>
                    <DateSelectComponent startDate={startDate!} setStartDate={setStartDate!} endDate={endDate!} setEndDate={setEndDate!} />
                     
                     </div>    
                </div>
                
    )
}