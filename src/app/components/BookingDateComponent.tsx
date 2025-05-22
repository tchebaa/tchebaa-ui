"use client"

import {useState, useEffect} from 'react'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { MdClose } from "react-icons/md";
import moment from 'moment'
import {useTranslations} from 'next-intl';


interface TicketPrice {
    adultPrice: number;
    adolescentPrice: number;
    childPrice: number;
    ticketTitle: string;
    ticketNumber: number;
  }
  
  interface DateTimePrice {
    eventDate: string;
    eventDays: number;
    eventHours: number;
    eventMinutes: number;
    eventEndDate: string;
    ticketPriceArray: TicketPrice[];
  }


  type HandleSelectDateFn = (
  index: number,
  eventDate: string,
  eventEndDate: string,
  eventDays: number,
  eventHours: number,
  eventMinutes: number,
  ticketPriceArrayList: TicketPrice[]
) => void;


export default function BookingDateComponent({sortedDates, loadingSortedDates, handleSelectDate, eventIndex}:
     {sortedDates: DateTimePrice [], loadingSortedDates: boolean, handleSelectDate: HandleSelectDateFn, eventIndex: number | null | undefined}) {

        const t = useTranslations()
    

    

    return (
        <div className="w-full flex flex-row h-full  bg-white  ">
            
            <div className='flex flex-row '>{sortedDates.map((item, i)=> {
                return(
                    <div key={i} className='ml-4 '>
                        <div>
                            {moment(item.eventEndDate).format() > moment(new Date()).format() ? null : 
                            <div>
                                {moment(item.eventDate).format() < moment(new Date()).format() ? 
                                <div>
                                    {eventIndex === i ? 
                                    <div className='border p-2 rounded-md border-sky-400 flex flex-row items-center ' onClick={()=> handleSelectDate(i, item.eventDate,item.eventEndDate, item.eventDays, item.eventHours, item.eventMinutes, item.ticketPriceArray)}>
                                        <div className='truncate text-black'>
                                            {moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}
                                        </div>
                                        <div className='ml-2 text-orange-600 font-semibold'>{t('ongoing')}</div>
                                        
                                    </div>:
                                    <div className='border p-2 rounded-md flex flex-row items-center' onClick={()=> handleSelectDate(i, item.eventDate,item.eventEndDate, item.eventDays, item.eventHours, item.eventMinutes, item.ticketPriceArray)}>
                                        <div className='truncate text-black'>
                                            {moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}
                                        </div>
                                        <div className='ml-2 text-orange-600 font-semibold'>{t('ongoing')}</div>
                                    </div>
                                    }
                                </div>
                                : 
                                <div>
                                    {eventIndex === i ? 
                                    <div className='border p-2 rounded-md border-sky-400 text-black' onClick={()=> handleSelectDate(i, item.eventDate,item.eventEndDate, item.eventDays, item.eventHours, item.eventMinutes, item.ticketPriceArray)}>
                                        {moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}
                                    </div>:
                                    <div className='border p-2 rounded-md text-black' onClick={()=> handleSelectDate(i, item.eventDate,item.eventEndDate, item.eventDays, item.eventHours, item.eventMinutes, item.ticketPriceArray)}>
                                        {moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}
                                    </div>}
                                </div>}
                                
                            </div>}
                            
                        </div> 
                    </div>
                )
            })}
            </div>
            
                    
        </div>
    )
}