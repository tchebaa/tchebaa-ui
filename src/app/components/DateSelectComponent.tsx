"use client"

import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment'


export default function DateSelectComponents({startDate, setStartDate, endDate, setEndDate}: {startDate: string | undefined, endDate: string, 
    setStartDate: (data: string) => void, setEndDate: (data: string) => void
}) {
    

    



    return (
        <div className="w-full flex flex-col md:flex-row h-full  bg-white">
            <div className="flex flex-row">
                
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="From" minDate={dayjs(new Date())} value={dayjs(startDate)} onChange={(value)=> {if (value) {
                    const formattedDate = moment(value.toDate()).format(); // or format("YYYY-MM-DD")
                    setStartDate(formattedDate);
            
                    }}} />
                </DemoContainer>
                
            </LocalizationProvider>
            <div className="items-center flex h-auto w-2/12 md-w-1/12 cursor-pointer justify-center">
                <div onClick={()=> {setStartDate('')}} >
                <MdClose size={20} color="black" />
                </div>
            </div>
        </div>
        <div className="flex flex-row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="To" value={dayjs(endDate)} minDate={dayjs(new Date())} onChange={(value)=> {if (value) {
                    const formattedDate = moment(value.toDate()).format(); // or format("YYYY-MM-DD")
                    setEndDate(formattedDate);
                    
                    }}}/>
                </DemoContainer>
                
            </LocalizationProvider>
            <div className="items-center flex h-auto w-2/12 md-w-1/12 justify-center">
                <div onClick={()=> {setEndDate('')}} >
                    <MdClose size={20} color="black" />
                </div>
            </div>
        </div>
                     
    </div>
    )
}