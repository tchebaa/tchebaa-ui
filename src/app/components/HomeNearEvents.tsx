"use client"

import {useState, useEffect, useRef, Dispatch, SetStateAction} from "react"

import Image from 'next/image'
import moment from "moment"
import EventDateTimeCostSection from "./EventDateTimeCostSection"
import Link from 'next/link';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import axios from "axios"
import {useLocation} from '../context/LocationContext'
import EventListItem from "./EventListItem"
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
  
   interface EventImage {
    aspectRatio: string;
    url: string;
  }
  
  interface Location {
    type: string;
    coordinates: number[];
  }
  
interface Event {
    id: string;
    eventName: string;
    eventDescription: string;
    email: string;
    site: boolean;
    personType: boolean;
    companyEmail: string;
    companyName: string;
    personName: string;
    sponsored: boolean;
    eventMainImage: EventImage;
    eventImage2: EventImage;
    eventImage3: EventImage;
    eventImage4: EventImage;
    dateTimePriceList: DateTimePrice[];
    ageRestriction: string[];
    categories: string[];
    eventAddress: string;
    location: Location;
  }



export default function HomeNearEvents({componentType, events, loadingEvents, loginModal, setLoginModal, signUpModal, setSignUpModal
}: {componentType: string, events: Event[], loadingEvents: boolean, loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>> , signUpModal: boolean,
    setSignUpModal: Dispatch<SetStateAction<boolean>>
}) {


 
    const t = useTranslations()

    const eventsArray = range(1, 8)


    


    function range(start: number, end: number): number [] {
        return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
      }

   

    return(
        <div className=" w-full  max-w-7xl flex items-center flex-col pt-4 border-t" >
           <div className=" flex flex-row items-center justify-between w-11/12 md:w-full">
                <div className="  font-semibold text-xl text-black  " >{t('eventsNearYou')}</div>
                 
                <div></div>
           </div>
           {loadingEvents ?
           <div className="flex flex-col md:flex-row flex-wrap w-full   items-center md:items-start">
           {eventsArray.map((item, i)=> {
               return(
                   <div key={i} className=" w-11/12 md:w-72 max-w-sm mt-3 md:mr-2 flex flex-col rounded-md  bg-white ">
                       <div className=" flex  h-44 rounded-lg border bg-gray-100"   >
                       <div className="p-1 flex flex-row justify-between w-full">
                           <div></div>
                           <div>
                               
                               
                              
                               </div>
                       </div>
                       </div>
                       <div className="p-2">
                           <div className=" text-lg text-black font-semibold max-h-14 overflow-hidden text-clip h-8 bg-gray-100"></div>
                           <div className="text-black text-sm mt-1 h-6 bg-gray-100"></div>
                           <div className="h-6 w-20 bg-gray-100 mt-1"></div>
                            <div className="h-6 w-20 bg-gray-100 mt-1"></div>
                                  
                       </div>
                       
                   </div>
               )
           })}
          </div>:
          <div className="w-full">
            {events.length > 0 ?
            <div className="flex flex-col md:flex-row flex-wrap w-full   items-center md:items-start">
                {events.map((item, i)=> {
                    return(
                        <EventListItem item={item} key={i} loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} screenType="home" />
                    )
                })}
            </div>:
            <div className="flex items-center flex-col  justify-center w-11/12 mt-10 mb-20">
                <div className="text-black font-semibold">{t('noeventsnearyou')}</div>
                <div></div>
            </div>}
           </div>}
          
           
        </div>
    )
}