"use client"

import {useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import Header from '../../components/Header';
import SearchComponent from '../../components/SearchComponent';
import MapSection from '../../components/MapSection';
//import ResultsFilterBody from '@/app/components/ResultsFilterBody';
import {useDate} from '../../context/DateContext'
import {useLocation} from '../../context/LocationContext'
import axios from 'axios';
import LoginModal from '../../components/LoginModal';
import SignUpModal from '../../components/SignUpModal';
import { MdClose, MdModeEditOutline, MdDeleteForever  } from "react-icons/md";
import HomeNearEvents from '../../components/HomeNearEvents';
import FooterComponent from '../../components/FooterComponent';
import ComponentHeader from '../../components/ComponentHeader';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'


Amplify.configure(outputs)

const client = generateClient<Schema>();



export default function SearchEventComponent() {


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


   const searchParams = useSearchParams()

   const category = searchParams.get('category')
   const categoryTitle = searchParams.get('categoryTitle')
   const allSearchTerm = searchParams.get('allSearchTerm')
   const pageType = searchParams.get('allSearch')
   const [headerPage, setHeaderPage] = useState('category')
   const [loginModal, setLoginModal] = useState(false)
   const [signUpModal, setSignUpModal] = useState(false)

   

   const [searchTerm, setSearchTerm] = useState(pageType === 'allSearch' ? allSearchTerm : '')

   const { endDate, startDate, setEndDate, setStartDate} = useDate()

   const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation();

   const [likedEvents, setLikedEvents] = useState([])

    const [events, setEvents] = useState<Event []>([])
    const [loadingEvents, setLoadingEvents] = useState(true)
     const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [openMobileMap, setOpenMobileMap] = useState<boolean>(false)


    useEffect(()=> {

      if(userLocation) {

        handleGetNearEvents()

      } else {

        handleGetEvents()

      }

        
    },[allSearchTerm, searchTerm, startDate, endDate, category])


    const handleGetEvents = async () => {

      try {

          setErrorLoadingEvents('')
          setLoadingEvents(true)
  
          const { data, errors } = await client.queries.searchEventsWithFilter({
          searchTerm: searchTerm,
          categories: [category],      
          startDate: startDate,
          endDate: endDate
              
          });

          

          if(data) {

            const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
            setEvents(filtered as Event[]);
          }

          
          setLoadingEvents(false)
          

          
          


      } catch(e) {

         // setErrorLoadingEvents(e.message)
          

      }


  }


    const handleGetNearEvents = async () => {

        try{

      
          setErrorLoadingEvents('')
          setLoadingEvents(true)
  
          const { data, errors } = await client.queries.searchEventsWithFilter({
          searchTerm: searchTerm,
          categories: [category],      
          startDate: startDate,
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
          endDate: endDate
              
          });

          

          if(data) {

            const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
            setEvents(filtered as Event[]);
            console.log(data)
          }

          
          setLoadingEvents(false)

    } catch(e) {

       const error = e as Error;

        if(error.message) {

        setErrorLoadingEvents(error.message)
        setLoadingEvents(false)

        }
      

    }

    }
         


    return(
        <div className=' min-h-screen  bg-white w-full flex flex-col items-center '>
            <div className='   w-full items-center flex bg-white h-20 flex-col '>
            <div className='w-full flex '>
                    <ComponentHeader category='Search' id={''} />
                </div>
                   
            </div>
            <div className="w-full flex items-center flex-col  ">
               {loginModal ?
                  <div className='fixed z-40 w-full max-w-lg border top-16 pb-10 bg-white rounded-md'>
                     <div className='bg-white flex flex-row items-center justify-between p-2'>
                        <div></div>
                        <div className='cursor-pointer' onClick={()=> setLoginModal(false)}><MdClose color='black' size={25} /></div>
                     </div>
                     <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
                  </div>: null}
                  {signUpModal ? 
                  <div className='fixed z-40 w-full max-w-lg border top-16 pb-10 bg-white rounded-md'>
                     <div className='bg-white flex flex-row items-center justify-between p-2'>
                        <div></div>
                        <div className='cursor-pointer' onClick={()=> setSignUpModal(false)}><MdClose color='black' size={25} /></div>
                     </div>
                     <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}/>
                  </div>: null}
            </div>
                
            <div className='flex flex-row justify-between bg-white w-full lg:w-7/12 h-full  mb-5'>
                
                <div className="flex  w-full z-0 flex-col bg-white h-full ">
                    
                    <SearchComponent categoryTitle={categoryTitle!} category={category!} setOpenMobileMap={setOpenMobileMap} searchTerm={searchTerm!} setSearchTerm={setSearchTerm!}
                    handleGetNearEvents={handleGetNearEvents} />
                    
                </div>
                
                
            </div>
            <HomeNearEvents componentType={'home'} events={events} loadingEvents={loadingEvents} loginModal={loginModal} signUpModal={signUpModal} setLoginModal={setLoginModal} setSignUpModal={setSignUpModal}/>
            <FooterComponent />
        </div>
    )
}