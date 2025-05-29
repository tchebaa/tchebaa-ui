"use client"
import {useState} from 'react'
import {useLikes} from '../context/LikedContext'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import {useUser} from '../context/UserContext'
import {useLocation} from '../context/LocationContext'
import MapSection from './MapSection';
import BookingDateComponent from './BookingDateComponent';
import TicketPriceList from './TicketPriceList';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'
import {signIn, getCurrentUser} from '@aws-amplify/auth'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdPhotoLibrary, MdClose } from "react-icons/md";
import {useTranslations} from 'next-intl';
import { FaLandmark } from "react-icons/fa6";

Amplify.configure(outputs)

const client = generateClient<Schema>();


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

  type Nullable<T> = T | null;

export default function EventComponent({event, loadingMainImage, mainImageUrl, screenType, sortedDates, loadingSortedDates, handleSelectDate, eventIndex,  ticketPriceArray,
    adultNumber, adolescentNumber, childNumber, handleAddTicket, handleMinusTicket, handleOpenCheckoutModal, eventImage2Url, eventImage3Url, eventImage4Url, loadingImage2,
    loadingImage3, loadingImage4
}: 
    {event: Event | null, loadingMainImage: boolean, mainImageUrl: string, screenType: string, sortedDates: DateTimePrice [] | [], loadingSortedDates: boolean,
        handleSelectDate: (index:number, eventDate: string, eventEndDate: string, eventDays :number, eventHours: number, eventMinutes: number, ticketPriceArrayList: TicketPrice [] ) => void,
        eventIndex: number | null, ticketPriceArray: TicketPrice [], adultNumber: number, adolescentNumber: number, childNumber: number, handleAddTicket: (item: string) => void,
        handleMinusTicket: (item: string) => void, handleOpenCheckoutModal: (eventTotalPrice: number)=> void, eventImage2Url: string, eventImage3Url: string, 
        eventImage4Url: string, loadingImage2: boolean, loadingImage3: boolean, loadingImage4: boolean

    }) {

    const {likedEvents, handleGetLikedEvents, loadingLikedEvents} = useLikes()
    const {userDetails} = useUser()
    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()
    const t = useTranslations()

    const [loadingLikeUnlikeEvent, setLoadingLikeUnlikeEvent] = useState<boolean>(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [extraImagesModal, setExtraImagesModal] = useState<boolean>(false)
    const [dateSelectModal, setDateSelectModal] = useState<boolean>(false)



        const handleUnlikeEvent = async (id: string, screenType: string) => {

  

      if(screenType === 'like') {
        try {

          setLoadingLikeUnlikeEvent(true)
  
          const unLikedEvent = await client.models.LikedEvent.delete({ 
                id: id
            });
  
            handleGetLikedEvents()
            setLoadingLikeUnlikeEvent(false)
  
        } catch(e) {
  
          setLoadingLikeUnlikeEvent(false)
  
        }

      } else {

        const newItem = likedEvents!.find((likedItem) => likedItem.eventId === id)

      
      

      try {

        setLoadingLikeUnlikeEvent(true)

        const unLikedEvent = await client.models.LikedEvent.delete({ 
              id: newItem!.id ?? ''
          });

          handleGetLikedEvents()
          setLoadingLikeUnlikeEvent(false)

      } catch(e) {

        setLoadingLikeUnlikeEvent(false)

      }
        

      }

      
    }


       const handleLikeEvent = async () => {

      try {

        setLoadingLikeUnlikeEvent(true)

        const likedEvent = await client.models.LikedEvent.create({
                  email: event?.email,
                  eventName: event?.eventName,
                  eventDescription: event?.eventDescription,
                  personType: event?.personType,
                  companyEmail: event?.companyEmail,
                  companyName: event?.companyName,
                  personName: event?.personName,
                  eventMainImage: event?.eventMainImage,
                  eventImage2: event?.eventImage2,
                  eventImage3: event?.eventImage3,
                  eventImage4: event?.eventImage4,
                  dateTimePriceList: event?.dateTimePriceList,
                  eventAddress: event?.eventAddress,
                  ageRestriction: event?.ageRestriction,
                  categories: event?.categories,
                  location: event?.location,
                  eventId: event?.id,
                  sponsored: event?.sponsored,
                  userEmail: userDetails?.username
              
          });

         

          handleGetLikedEvents()

          setLoadingLikeUnlikeEvent(false)

      } catch(e) {


        setLoadingLikeUnlikeEvent(false)

      }

    }
    

    return(
        <div className="w-full  max-w-7xl h-full flex flex-col items-center pb-96 mb-20 mt-16 md:mt-20 ">
            {event && extraImagesModal ? 
            <div className='bg-white  border-black absolute rounded-md z-40 w-full h-full max-w-7xl p-4 border'>
                <div className='flex flex-row items-center justify-between '>
                    <div></div>
                    <div className='cursor-pointer' onClick={()=> setExtraImagesModal(false)}><MdClose size={24} color="black" /></div>
                </div>
                <div className='w-full max-w-7xl flex items-center mt-2 flex-col  '>
                    {event.eventImage2.url.length > 0 || eventImage2Url.length > 0 ?
                     <div className='w-full items-center flex flex-col'>
                        {event.eventImage2.aspectRatio === 'a' && !loadingImage2 ?
                        <div className=" flex w-full md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl "   
                        style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage2.url : eventImage2Url}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                        
                        </div>: null }
                        {event.eventImage2.aspectRatio === 'b' && !loadingImage2 ?
                        <div className=" flex w-full flex-col items-center justify-center md:rounded-lg border border-black h-56 md:w-11/12 md:h-96 max-w-2xl"  

                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage2.url : eventImage2Url}` + ')', backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                                
                            <div className='h-52 md:h-2/6 max-h-96 mt-1 absolute  w-52 z-10 md:w-8/12 max-w-xs rounded-md rounded-md'  
                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage2.url : eventImage2Url}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                            
                                <div className=' z-00 backdrop-blur-sm w-full h-full '>
                                </div>
                        </div>: 
                        null }
                        {event.eventImage2.aspectRatio === 'c' && !loadingImage2 ?
                            <div className=" flex w-full flex-col items-center justify-center md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl"  

                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage2.url : eventImage2Url}` + ')', backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >

                            <div className='h-52 md:h-80 max-h-96 mt-1 absolute z-10 w-40 md:w-60 max-w-xs rounded-md rounded-xl'  
                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage2.url : eventImage2Url }` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                                
                            </div>
                            
                                <div className=' z-0 backdrop-blur-sm w-full h-full  '>
                                                  
                                </div>
                        </div>: 
                        null}
                    </div>: null}
                    
                </div>
                <div className='w-full max-w-7xl flex items-center mt-2 flex-col '>
                    {event.eventImage3.url.length > 0 || eventImage3Url.length > 0 ?
                     <div className='w-full items-center flex flex-col'>
                        {event.eventImage3.aspectRatio === 'a' && !loadingImage3 ?
                        <div className=" flex w-full md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl "   
                        style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage3.url : eventImage3Url}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                        
                        </div>: null }
                        {event.eventImage3.aspectRatio === 'b' && !loadingImage3 ?
                        <div className=" flex w-full flex-col items-center justify-center md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl"  

                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage3.url : eventImage3Url}` + ')', backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                                
                            <div className='h-52 md:h-2/6 max-h-96 mt-1 absolute z-10 w-52 md:w-8/12 max-w-xs rounded-md rounded-md'  
                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage3.url : eventImage3Url}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                            
                                <div className=' z-0 backdrop-blur-sm w-full h-full '>
                                </div>
                        </div>: 
                        null }
                        {event.eventImage3.aspectRatio === 'c' && !loadingImage3 ?
                            <div className=" flex w-full flex-col items-center justify-center md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl"  

                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage3.url : eventImage3Url}` + ')', backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >

                            <div className='h-52 md:h-80 max-h-96 mt-1 absolute z-10 w-40 md:w-60 max-w-xs rounded-md rounded-xl'  
                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage3.url : eventImage3Url }` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                                
                            </div>
                            
                                <div className=' z-0 backdrop-blur-sm w-full h-full  '>
                                                  
                                </div>
                        </div>: 
                        null}
                    </div>: null}
                    
                </div>
                <div className='w-full max-w-7xl flex items-center mt-1 flex-col '>
                    {event.eventImage4.url.length > 0 || eventImage4Url.length > 0 ?
                     <div className='w-full max-w-7xl flex items-center mt-2 flex-col '>
                        {event.eventImage4.aspectRatio === 'a' && !loadingImage4 ?
                        <div className=" flex w-full md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl "   
                        style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage4.url : eventImage4Url}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                        
                        </div>: null }
                        {event.eventImage4.aspectRatio === 'b' && !loadingImage4 ?
                        <div className=" flex w-full flex-col items-center justify-center md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl"  

                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage4.url : eventImage4Url}` + ')', backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                                
                            <div className='h-52 md:h-2/6 max-h-96 mt-1 absolute z-10 w-52 md:w-8/12 max-w-xs rounded-md rounded-md'  
                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage4.url : eventImage4Url}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                            
                                <div className=' z-0 backdrop-blur-sm w-full h-full '>
                                </div>
                        </div>: 
                        null }
                        {event.eventImage4.aspectRatio === 'c' && !loadingImage4 ?
                            <div className=" flex w-full flex-col items-center justify-center md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl"  

                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage4.url : eventImage4Url}` + ')', backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >

                            <div className='h-52 md:h-80 max-h-96 mt-1 absolute z-10 w-40 md:w-60 max-w-xs rounded-md rounded-xl'  
                            style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventImage4.url : eventImage4Url }` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                                
                            </div>
                            
                                <div className=' z-0 backdrop-blur-sm w-full h-full  '>
                                                  
                                </div>
                        </div>: 
                        null}
                    </div>: null}
                    
                </div>
            </div>: null}
            {event ? 
            <div className='w-full max-w-7xl flex md:w-11/12 mt-1 flex-col md:flex-row  '>
                {event.eventMainImage.aspectRatio === 'a' && !loadingMainImage ?
                    <div className=" flex w-full md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl "   
                    style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventMainImage.url : mainImageUrl}` + ')', backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                    
                        <div className="p-2 flex flex-row justify-between w-full ">
                            <div className="z-20">
                                {event.sponsored  ? 
                                <div><SlBadge size={20} color="#FF4D00"/></div>: <div></div>}
                            </div>
                            {screenType === 'preview' ?
                            <div>
                                {event.eventImage2.url.length > 0 || event.eventImage3.url.length > 0 || event.eventImage4.url.length > 0 ? 
                                <div className='bg-white p-1 flex items-center justify-center rounded-xl cursor-pointer' onClick={()=> setExtraImagesModal(true)}><MdPhotoLibrary size={20} color='black' /></div>
                                : null}
                            </div> :
                            <div>
                                {eventImage2Url.length > 0 || eventImage3Url.length > 0 || eventImage4Url.length > 0 ? 
                                <div className='bg-white p-1 flex items-center justify-center rounded-xl cursor-pointer' onClick={()=> setExtraImagesModal(true)}><MdPhotoLibrary size={20} color='black' /></div>
                                : null}
                            </div>}
                    
                    </div>
                </div>: null }
                {event.eventMainImage.aspectRatio === 'b' && !loadingMainImage ?
                    <div className=" flex w-full flex-col items-center justify-center md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl"  

                    style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventMainImage.url : mainImageUrl}` + ')', backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >
                        
                    <div className='h-52 md:h-2/6 max-h-96 mt-1 absolute z-10 w-52 md:w-8/12 max-w-xs rounded-md rounded-md'  
                    style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventMainImage.url : mainImageUrl}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                    
                        <div className=' z-0 backdrop-blur-sm w-full h-full '>
                            <div className="p-2 flex flex-row justify-between w-full ">
                            <div className="z-20">
                                {event.sponsored  ? 
                                <div><SlBadge size={20} color="#FF4D00"/></div>: <div></div>}
                            </div>
                            {screenType === 'preview' ?
                            <div>
                                {event.eventImage2.url.length > 0 || event.eventImage3.url.length > 0 || event.eventImage4.url.length > 0 ? 
                                <div className='bg-white p-1 flex items-center justify-center rounded-xl curosr-pointer' onClick={()=> setExtraImagesModal(true)}><MdPhotoLibrary size={20} color='black' /></div>
                                : null}
                            </div> :
                            <div>
                                {eventImage2Url.length > 0 || eventImage3Url.length > 0 || eventImage4Url.length > 0 ? 
                                <div className='bg-white p-1 flex items-center justify-center rounded-xl cursor-pointer' onClick={()=> setExtraImagesModal(true)}><MdPhotoLibrary size={20} color='black' /></div>
                                : null}
                            </div>}
                        </div>
                            
                        </div>
                </div>: 
                null }
                {event.eventMainImage.aspectRatio === 'c' && !loadingMainImage ?
                    <div className=" flex w-full flex-col items-center justify-center md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl"  

                    style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventMainImage.url : mainImageUrl}` + ')', backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', overflow: 'hidden', }} >

                    <div className='h-52 md:h-80 max-h-96 mt-1 absolute z-10 w-40 md:w-60 max-w-xs rounded-md rounded-xl'  
                    style={{backgroundImage: 'url(' + `${screenType === 'preview' ? event.eventMainImage.url : mainImageUrl }` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                        
                    </div>
                    
                        <div className=' z-0 backdrop-blur-sm w-full h-full  '>
                            <div className="p-2 flex flex-row justify-between w-full ">
                            <div className="z-20">
                                {event.sponsored  ? 
                                <div><SlBadge size={20} color="#FF4D00"/></div>: <div></div>}
                            </div>
                            {screenType === 'preview' ?
                            <div>
                                {event.eventImage2.url.length > 0 || event.eventImage3.url.length > 0 || event.eventImage4.url.length > 0 ? 
                                <div className='bg-white p-1 flex items-center justify-center rounded-xl cursor-pointer' onClick={()=> setExtraImagesModal(true)}><MdPhotoLibrary size={20} color='black' /></div>
                                : null}
                            </div> :
                            <div>
                                {eventImage2Url.length > 0 || eventImage3Url.length > 0 || eventImage4Url.length > 0 ? 
                                <div className='bg-white p-1 flex items-center justify-center rounded-xl cursor-pointer' onClick={()=> setExtraImagesModal(true)}><MdPhotoLibrary size={20} color='black' /></div>
                                : null}
                            </div>}
                        </div>
                            
                        </div>
                </div>: 
                null}
                {event.site ?
                <div className='invisible relative md:ml-4 z-20 md:visible md:relative'>
                    <div className='p-2 rounded-md border border-black  w-full max-w-sm fixed h-20 bg-white'>
                        <div className='text-orange-600 '>
                            <FaLandmark size={20} />
                        </div>
                        <div className='mt-2 text-black font-semibold'>You may find events here, or near this place.</div>
                    </div>
                </div> 
                :
                <div className='invisible relative md:ml-4 z-20 md:visible md:relative' >
                    <div className=' p-2 border-l-2 border-r-2 border-t-2 rounded-t-md border-black  w-full max-w-sm fixed  bg-white'>
                        <div className='text-black font-semibold my-1'>{t('selectdate')}</div>
                        <div className='overflow-x-scroll flex flex-row'>
                        
                            <BookingDateComponent sortedDates={sortedDates} loadingSortedDates={loadingSortedDates} handleSelectDate={handleSelectDate} eventIndex={eventIndex}/>

                        </div>
                    </div>
                        
                    <div className='fixed mt-26 p-2 overflow-x-scroll border-b-2 border-r-2 rounded-b-md border-l-2 border-black  w-full max-w-sm bg-white'>
                        <TicketPriceList ticketPriceArray={ticketPriceArray} adultNumber={adultNumber} adolescentNumber={adolescentNumber} 
                        childNumber={childNumber} handleAddTicket={handleAddTicket} handleMinusTicket={handleMinusTicket} handleOpenCheckoutModal={handleOpenCheckoutModal} />
                    </div>
                </div>}
                {dateSelectModal ? 
                <div className='visible fixed z-20 md:invisible md:absolute top-80 bg-white w-full ' >
                    <div className='w-full'>
                        <div className='w-full flex flex-row items-center justify-between p-2 border-t border-black'>
                            <div></div>
                            <div className='cursor-pointer' onClick={()=> setDateSelectModal(false)}><MdClose size={24} color="black" /></div>
                        </div>
                        <div className=' p-2 overflow-x-scroll border-l border-r border-t border-black  w-full fixed h-20 bg-white'>
                        
                            <BookingDateComponent sortedDates={sortedDates} loadingSortedDates={loadingSortedDates} handleSelectDate={handleSelectDate} eventIndex={eventIndex}/>
                        </div>
                    </div>
                        
                    <div className='fixed mt-20 p-2 overflow-x-scroll border-b border-r border-l border-black  w-full bg-white'>
                        <TicketPriceList ticketPriceArray={ticketPriceArray} adultNumber={adultNumber} adolescentNumber={adolescentNumber} 
                        childNumber={childNumber} handleAddTicket={handleAddTicket} handleMinusTicket={handleMinusTicket} handleOpenCheckoutModal={handleOpenCheckoutModal} />
                    </div>
                </div>: null}
            </div>: null}   
            {dateSelectModal ? null : 
            
                
                <div className='fixed bottom-0 border-t border-black p-2 w-full md:invisible md:absolute flex flex-row items-center z-20 bg-white justify-between'>
                   {event?.site ?
                   <div className=' w-full max-w-sm bg-white'>
                        <div className='text-orange-600 '>
                            <FaLandmark size={20} />
                        </div>
                        <div className='mt-2 text-black font-semibold'>You may find events here, or near this place.</div>
                    </div>
                   : <div className='flex flex-row items-center justify-between w-full'>
                        <div></div>
                        <div className='text-black border border-black p-1 rounded-md cursor-pointer font-semibold' onClick={()=> setDateSelectModal(true)}>{t('selectdate')}</div>
                    </div>}
                </div>
            }
            {event ? 
            <div className='w-full  max-w-6xl h-full items-center flex-col flex md:mr-4'>
                <div className='w-full  mt-5 text-3xl flex  flex-col items-center'>
                    <div className='max-w-6xl md:w-full w-11/12 pb-5 font-semibold text-black '>
                        {event.eventName}
                    </div>
            
                </div>
                <div className='flex flex-col  w-full  p-2'>
                    <div className='pt-3 w-full  border-t border-black max-w-2xl  text-xl font-semibold text-black'>{t('aboutthisevent')}</div>
                    <div className='md:w-full w-11/12 mt-5 h-20 max-h-40  max-w-2xl  overflow-y-scroll p-2 text-black'>
                        {event.eventDescription}
                    </div>
                </div>
                <div className='flex flex-col  w-full p-2'>
                    <div className='pt-3 w-full border-t border-black max-w-2xl  text-xl font-semibold text-black'>{t('location')}</div>
                        <div className='max-w-2xl w-11/12 pb-5 mt-5 flex flex-row flex-wrap justify-between '>
                            <div className='flex flex-row '>
                                <div className='text-orange-600 '><FaMapMarkerAlt size={20}/></div>
                                <div className='ml- text-black'>{event.eventAddress}</div>
                            
                            </div>
                            
                    </div>
                    <MapSection pageName='event'  eventLocation={event.location} />
                </div>
            </div>:
            <div></div>}
            
        </div>
    )

}