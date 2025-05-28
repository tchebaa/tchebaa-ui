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
import {useTranslations} from 'next-intl';
import {useLocation} from '../context/LocationContext'
import moment from 'moment';

//import DatePicker from "react-datepicker";

//import "react-datepicker/dist/react-datepicker.css";



export default function SearchComponent({category, categoryTitle, setOpenMobileMap, searchTerm, setSearchTerm, handleGetNearEvents}: 
    {category: string, categoryTitle: string, searchTerm: string, setOpenMobileMap: Dispatch<SetStateAction<boolean>>, 
        setSearchTerm: Dispatch<SetStateAction<string | null>>, handleGetNearEvents: ()=> void}) {

 
            const [dateFilter, setDateFilter] = useState<string>('all')
            const {startDate, endDate, setStartDate, setEndDate} = useDate()
            const {userAddress} = useLocation()

            const t = useTranslations()
            
    const dayRanges = [
        {
            name: t('all'),
            code: 'all'
        },
        {
            name: t('today'),
            code: 'today'
        },
        {
            name: t('tomorrow'),
            code: 'tomorrow'
        },
        {
            name: t('thisweek'),
            code: 'thisweek'
        },
        {
            name: t('thisweekend'),
            code: 'thisweekend'
        },
        {
            name: t('nextweek'),
            code: 'nextweek'
        },
        {
            name: t('thismonth'),
            code: 'thismonth'
        },
        {
            name: t('nextmonth'),
            code: 'nextmonth'
        },
    ]
    

      const handleDateChange = (code: string) => {
                
            //setDayType(code)
        
            if(code === 'all') {
    
                setDateFilter('all')
    
                setStartDate?.(moment(new Date()).format().toString())
                setEndDate?.('')
            }
        
            if(code === 'today'){
    
                setDateFilter('today')
    
                setStartDate?.(moment(new Date()).startOf('day').format().toString())
                setEndDate?.(moment(new Date()).endOf('day').format().toString())
        
               // console.log(moment(new Date()).startOf('day').format())
        
               // console.log(moment(new Date).endOf('day').format())
                
        
            }
        
            if(code === 'tomorrow'){
    
                setDateFilter('tomorrow')
    
                setStartDate?.(moment(new Date()).endOf('day').format().toString())
                setEndDate?.(moment(new Date()).add(1, 'days').endOf('day').format().toString())
                
                
            }
            if(code === 'thisweek'){
        
                setDateFilter('thisweek')
    
                setStartDate?.(moment(new Date()).startOf('isoWeek').format().toString())
                setEndDate?.(moment(new Date()).endOf('isoWeek').format().toString())
                
                
            }
            if(code === 'thisweekend'){
    
                setDateFilter('thisweekend')
    
                setStartDate?.(moment(new Date()).endOf('isoWeek').subtract(2, 'days').format().toString())
                setEndDate?.(moment(new Date()).endOf('isoWeek').format().toString())
                
            }
        
            if(code === 'nextweek'){
    
                setDateFilter('nextweek')
    
    
                setStartDate?.(moment(new Date()).add(1, 'week').startOf('isoWeek').format().toString())
                setEndDate?.(moment(new Date()).add(1, 'week').endOf('isoWeek').format().toString())
        
                
            }
            if(code === 'thismonth'){
    
                setDateFilter('thismonth')
    
                setStartDate?.(moment(new Date()).startOf('month').format())
                setEndDate?.(moment(new Date()).endOf('month').format())
            }
        
            if(code === 'nextmonth'){
    
                setDateFilter('nextmonth')
    
                setStartDate?.(moment(new Date()).add(1, 'month').startOf('month').format())
                setEndDate?.(moment(new Date()).add(1, 'month').endOf('month').format())
                
            }
        }
    

    
    
    return(
       

                <div className='bg-white z-10   flex w-full justify-center flex-col '>
                    <div className='flex w-full flex-row items-center justify-between'>
                        <div  className=' ml-1 text-gray-400 p-2  flex flex-row truncate hover:shadow items-center rounded-full max-w-sm'>
                            <div><MdLocationOn size={20} /></div>
                            <div className='text-gray-400 ml-2 text-ellipsis'>{userAddress}</div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    
                    <div className=' ml-2 p-1 flex flex-row hover:shadow mt-5 items-center border rounded-full max-w-sm'>
                        
                        <input placeholder={`Search ${categoryTitle} events`} value={searchTerm} onChange={(event)=>{setSearchTerm(event.target.value);}} className='text-black w-full h-full p-2' />
                        <div className='pr-2 cursor-pointer' onClick={()=> handleGetNearEvents()}>
                            <BiSearch size={25} color='#00BDFE' />
                        </div>
                    </div>
                    <div className='flex flex-row flex-wrap items-center mt-1 w-11/12 ml-2'>
                    <DateSelectComponent startDate={startDate!} setStartDate={setStartDate!} endDate={endDate!} setEndDate={setEndDate!} />
                    <div className='mt-2 flex flex-row overflow-x-scroll  w-full'>
                        {dayRanges.map((item, i)=> {
                            return(
                                <div key={i} className='flex items-center justify-center'>
                                    {dateFilter === item.code ? 
                                    <div className='w-full mx-1 border-2 px-2 whitespace-nowrap rounded-md mx-1 cursor-pointer border-cyan-500 text-black' onClick={()=> handleDateChange(item.code)}>
                                        {item.name}</div>
                                        : 
                                    <div className='w-full mx-1 border px-2 whitespace-nowrap rounded-md mx-1 cursor-pointer text-black' onClick={()=> handleDateChange(item.code)}>{item.name}</div> }
                                </div>
                            )
                        })}
                    </div>
                     
                     </div>    
                </div>
                
    )
}