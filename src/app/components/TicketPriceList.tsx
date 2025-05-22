"use client"

import {useState, useEffect} from 'react'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { MdClose } from "react-icons/md";
import moment from 'moment'
import {useTranslations} from 'next-intl';
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";


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




export default function TicketPriceList({ticketPriceArray, adultNumber, adolescentNumber, childNumber, handleAddTicket, handleMinusTicket, handleOpenCheckoutModal}: 
    {ticketPriceArray: TicketPrice [], adultNumber: number, adolescentNumber: number, childNumber: number, 
    handleAddTicket: (item: string) => void, handleMinusTicket: (item: string) => void, handleOpenCheckoutModal: (item: number)=> void}) {
    

    const  t = useTranslations()
    

    return (
        <div className="w-full flex  h-full  bg-white  ">
            
           {ticketPriceArray.length > 0 ? 
           <div className='flex flex flex-row'>{ticketPriceArray.map((item, i)=> {
                return(
                    <div key={i}>
                        <div  className='ml-4 w-64 border p-2 rounded-md'>
                            <div className='mb-2 font-semibold border-b pb-2'>{item.ticketTitle}</div> 
                                <div className='flex flex-row items-center justify-between mb-1'>
                                    <div className='flex flex-row items-center'>
                                        <div className='font-semibold'>{t('adult')}</div>
                                        <div className='ml-2 font-semibold text-gray-400'>+18</div>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        {adultNumber === 0 ? <div><FaRegSquareMinus size={20} color='gray'/></div>: <div className='cursor-pointer' onClick={()=> handleMinusTicket('adult')}><FaRegSquareMinus size={20} color='black'/></div>}
                                        <div className='mx-1'>{adultNumber}</div>
                                        <div className='cursor-pointer' onClick={()=> handleAddTicket('adult')}><FaRegSquarePlus size={20}/></div>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center justify-between mb-1'>
                                    <div className='flex flex-row items-center'>
                                        <div className='font-semibold'>{t('adolescent')}</div>
                                        <div className='ml-2 font-semibold text-gray-400'>13 - 17</div>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        {adolescentNumber === 0 ? <div><FaRegSquareMinus size={20} color='gray'/></div>: <div className='cursor-pointer' onClick={()=> handleMinusTicket('adolescent')}><FaRegSquareMinus size={20} color='black'/></div>}
                                        <div className='mx-1'>{adolescentNumber}</div>
                                        <div className='cursor-pointer' onClick={()=> handleAddTicket('adolescent')}><FaRegSquarePlus size={20}/></div>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center justify-between mb-1'>
                                    <div className='flex flex-row items-center'>
                                        <div className='font-semibold'>{t('child')}</div>
                                        <div className='ml-2 font-semibold text-gray-400'>0 - 12</div>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        {childNumber === 0 ? <div><FaRegSquareMinus size={20} color='gray'/></div>: <div className='cursor-pointer' onClick={()=> handleMinusTicket('child')}><FaRegSquareMinus size={20} color='black'/></div>}
                                        <div className='mx-1'>{childNumber}</div>
                                        <div className='cursor-pointer'><FaRegSquarePlus size={20} onClick={()=> handleAddTicket('child')}/></div>
                                    </div>
                                </div>
                            
                            </div>
                        <div className='ml-4 w-64 border rounded-md p-2 mt-2'>
                            <div className='flex flex-row items-center justify-between'>
                                <div>{t('adultprice')}</div>
                                {item.adultPrice === 0 ? 
                                <div>free</div>
                                :
                                <div className='flex flex-row'>
                                    <div>{adultNumber}</div>
                                    <div className='mx-1'>x</div>
                                    <div>{item.adultPrice}</div>
                                </div>}
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div>{t('adolescentprice')}</div>
                                {item.childPrice === 0 ? 
                                <div>free</div>
                                :
                                <div className='flex flex-row'>
                                    <div>{adolescentNumber}</div>
                                    <div className='mx-1'>x</div>
                                    <div>{item.childPrice}</div>
                                </div>}
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div>{t('childprice')}</div>
                                {item.childPrice === 0 ? 
                                <div>free</div>
                                :
                                <div className='flex flex-row'>
                                    <div>{childNumber}</div>
                                    <div className='mx-1'>x</div>
                                    <div>{item.childPrice}</div>
                                </div>}
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div>{t('totaltickets')}</div>
                                <div>{adultNumber + adolescentNumber + childNumber}</div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between mt-4'>
                            <div></div>
                            <div>
                                {adultNumber > 0 || adolescentNumber > 0 || childNumber > 0 ? 
                                <div className='border p-1 rounded-md curosr-pointer'>{t('book')}</div>:
                                <div className='border p-1 rounded-md'>{t('book')}</div>}
                            </div>
                        </div>
                    </div>
                )
            })}
            </div> 
            : null}
            
                    
        </div>
    )
}