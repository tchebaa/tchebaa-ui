"use client"


import {useEffect, useState, Suspense, useRef} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import EventDateTimeCostSection from '../../components/EventDateTimeCostSection';
//import BookingReservationSection from '@/app/components/BookingReservationSection';
import ComponentHeader from '../../components/ComponentHeader';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { BsDashLg } from "react-icons/bs";
import { MdOutlineNightlife, MdTravelExplore, MdClose, MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked, MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight} from "react-icons/md";
import MapSection from '../../components/MapSection';
import axios from 'axios';
import { RiVisaLine } from "react-icons/ri";
import moment from 'moment';
import {useTranslations} from 'next-intl';
import {useUser} from '../../context/UserContext'
import {useLocation} from '../../context/LocationContext'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import {signIn, getCurrentUser} from '@aws-amplify/auth'
import { uploadData, getUrl } from '@aws-amplify/storage';
import {useLikes} from '../../context/LikedContext'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import SignUpModal from '../../components/SignUpModal';
import LoginModal from '../../components/LoginModal';
import BookingDateComponent from '../../components/BookingDateComponent';
import TicketPriceList from '../../components/TicketPriceList';
import EventComponent from '../../components/EventComponent';
import FooterComponent from '../../components/FooterComponent';



Amplify.configure(outputs)

const client = generateClient<Schema>({
  authMode: 'apiKey',
});




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




function OneEventComponent() {


    const t = useTranslations()
    const searchParams = useSearchParams()
    
    

    

    const id = searchParams.get('id')


    type SearchParamType = {
        id: number;
        description: string;
        age: number;
        name: string;
      };

    const {userDetails} = useUser()
    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()
    const {likedEvents, handleGetLikedEvents, loadingLikedEvents} = useLikes()


    const [loadingLikeUnlikeEvent, setLoadingLikeUnlikeEvent] = useState<boolean>(false)
    const [likeUnlikeError, setLikeUnlikeError] = useState<string>('')
    const [screenType, setScreenType] = useState<string>('event')

    

    const [event, setEvent] = useState<Event | null>(null)
    const [loadingEvent, setLoadingEvent] = useState(true)
    const [loadingEventError, setLoadingEventError] = useState<string>('')
    const [loadingMainImage, setLoadingMainImage] = useState<boolean>(false)
    const [loadingImage2, setLoadingImage2] = useState<boolean>(false)
    const [loadingImage3, setLoadingImage3] = useState<boolean>(false)
    const [loadingImage4, setLoadingImage4] = useState<boolean>(false)
    const [mainImageUrl, setMainImageUrl] = useState<string>('')
    const [eventImage2Url, setEventImage2Url] = useState<string>('')
    const [eventImage3Url, setEventImage3Url] = useState<string>('')
    const [eventImage4Url, setEventImage4Url] = useState<string>('')


    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)


    const [showFullMap, setShowFullMap] = useState<boolean>(false)
    const [loadingBooking, setLoadingBooking] = useState<boolean>(false)
    const [bookingError, setBookingError] = useState<string>('')

    const [sortedDates, setSortedDates] = useState< DateTimePrice [] | []>([])
    const [loadingSortedDates, setLoadingSortedDates] = useState<boolean>(true)
    const [eventIndex, setEventIndex] = useState<number | null>(null)

    const [openDirection, setOpenDirections] = useState<boolean>(false)

    const [originDirection, setOriginDirection] = useState<{latitude: number, longitude: number} | null>(null)
    const [loadingDirections, setLoadingDirections] = useState<boolean>(false)
    const [loadingDirectionsError, setLoadingDirectionsError] = useState<string>('')
    const [lineCoordinates, setLineCoordinates] = useState< [number] []>([])


  
    const [bookingModal, setBookingModal] = useState<boolean>(false)
    const [checkOutModal, setCheckOutModal] = useState<boolean>(false)
    const [extraImagesModal, setExtraImagesModal] = useState<boolean>(false)


    const [adultNumber, setAdultNumber] = useState<number>(0)
    const [adolescentNumber, setAdolescentNumber] = useState<number>(0)
    const [childNumber, setChildNumber] = useState<number>(0)

    const [ticketPriceArray, setTicketPriceArray] = useState<TicketPrice [] >([])
    const [eventDate, setEventDate] = useState<Date | null| string>('')
    const [eventEndDate, setEventEndDate] = useState<Date | null| string>('')
    const [eventDays, setEventHours] = useState<number | null>(0)
    const [eventHours, setEventDays] = useState<number | null>(0)
    const [eventMinutes, setEventMinutes] = useState<number | null>(0)

    const [eventTotalPrice, setEventTotalPrice] = useState<number>(0)

    const mapRef = useRef(null)
    const cameraRef = useRef(null)


    const handleGetMainImageUrl = async () => {

    try {

        if(event) {

            setLoadingMainImage(true)

            const linkToStorageFile = await getUrl({
                path: event.eventMainImage.url,
                options: {
                useAccelerateEndpoint: true
                }
            })

            setMainImageUrl(linkToStorageFile.url.toString())

            setLoadingMainImage(false)


        }

      

    } catch(e) {

      setLoadingMainImage(false)

    }

    
 

  }

  const handleGetImage2Url = async () => {


    if(event) {

        if(event.eventImage2.url.length > 1) {


      try {

        setLoadingImage2(true)
  
        const linkToStorageFile = await getUrl({
          path: event.eventImage2.url,
          options: {
            useAccelerateEndpoint: true
          }
      })
  
      setEventImage2Url(linkToStorageFile.url.toString())
  
      setLoadingImage2(false)
  
      } catch(e) {
  
        setLoadingImage2(false)
  
      }


    } else {
      setLoadingImage2(false)
    }

    }

    

  }


  const handleGetImage3Url = async () => {


    if(event) {

        if(event.eventImage3.url.length > 1) {


      try {

        setLoadingImage3(true)
  
        const linkToStorageFile = await getUrl({
          path: event.eventImage3.url,
          options: {
            useAccelerateEndpoint: true
          }
      })
  
      setEventImage3Url(linkToStorageFile.url.toString())
  
      setLoadingImage3(false)
  
      } catch(e) {
  
        setLoadingImage3(false)
  
      }


    } else {
      setLoadingImage3(false)
    }

    }

    

  }



  const handleGetImage4Url = async () => {

    if(event) {

        if(event.eventImage4.url.length > 1) {


      try {

        

        setLoadingImage4(true)

   
  
        const linkToStorageFile = await getUrl({
          path: event.eventImage4.url,
          options: {
            useAccelerateEndpoint: true
          }
      })


      
  
      setEventImage4Url(linkToStorageFile.url.toString())
  
      setLoadingImage4(false)
  
      } catch(e) {

       
  
        setLoadingImage4(false)

       
        
  
      }


    } else {
      setLoadingImage4(false)
    }

    }


  }


  useEffect(()=> {

    if(event) {
        handleGetMainImageUrl()
        handleGetImage2Url()
        handleGetImage3Url()
        handleGetImage4Url()
    }

  },[event])
    
    
    
        const handleGetEvent = async () => {
    
            try {

                function sanitizeTicketArray(arr: Nullable<{
                    adultPrice: Nullable<number>;
                    adolescentPrice: Nullable<number>;
                    childPrice: Nullable<number>;
                    ticketTitle: Nullable<string>;
                    ticketNumber: Nullable<number>;
                    }>[] | null | undefined) {
                    return (arr ?? [])
                        .filter((ticket): ticket is {
                        adultPrice: number;
                        adolescentPrice: number;
                        childPrice: number;
                        ticketTitle: string;
                        ticketNumber: number;
                        } =>
                        ticket !== null &&
                        ticket.ticketNumber !== null &&
                        ticket.ticketTitle !== null &&
                        ticket.adultPrice !== null &&
                        ticket.adolescentPrice !== null &&
                        ticket.childPrice !== null
                        );
                    }

                setLoadingEvent(true)


                if(id) {

                    const { data, errors } = await client.models.Event.get({
                    id: id,
                  });

                  if(data) {


                    setEvent({
                    id: data.id,
                    eventName: data.eventName ?? "",
                    eventDescription: data.eventDescription ?? "",
                    email: data.email ?? "",
                    personType: data.personType ?? false,
                    site: data.site ?? false,
                    companyEmail: data.companyEmail ?? "",
                    companyName: data.companyName ?? "",
                    personName: data.personName ?? "",
                    eventMainImage: {
                       
                        aspectRatio: data.eventMainImage?.aspectRatio ?? "",
                        url: data.eventMainImage?.url ?? "",
                    },
                    eventImage2: {
                       
                        aspectRatio: data.eventImage2?.aspectRatio ?? "",
                        url: data.eventImage2?.url ?? "",
                    },
                    eventImage3: {
                       
                        aspectRatio: data.eventImage3?.aspectRatio ?? "",
                        url: data.eventImage3?.url ?? "",
                    },
                    eventImage4: {
                       
                        aspectRatio: data.eventImage4?.aspectRatio ?? "",
                        url: data.eventImage4?.url ?? "",
                    },
                    dateTimePriceList: (data.dateTimePriceList ?? [])
                        .filter((dt): dt is NonNullable<typeof dt> => dt !== null)
                        .map(dt => ({
                        eventDate: dt.eventDate ?? '',
                        eventDays: dt.eventDays ?? 0,
                        eventHours: dt.eventHours ?? 0,
                        eventMinutes: dt.eventMinutes ?? 0,
                        eventEndDate: dt.eventEndDate ?? '',
                        ticketPriceArray: sanitizeTicketArray(dt?.ticketPriceArray),
                        })),
                    eventAddress: data.eventAddress ?? "",
                    ageRestriction: (data.ageRestriction ?? []).filter(
                        (age): age is string => age !== null
                    ),
                    location: data.location && data.location.type && Array.isArray(data.location.coordinates)
                    ? {
                        type: data.location.type ?? 'Point',
                        coordinates: data.location.coordinates.filter((c): c is number => c !== null)
                        }
                    : {
                        type: 'Point',
                        coordinates: [0, 0]
                        },
                    categories: (data.categories ?? []).filter((c): c is string => c !== null),
                    sponsored: data.sponsored ?? false,
                   
                });
                  setLoadingEvent(false)

                  }

                }
    
                


                  

                  
    
            } catch (e) {

                 const error = e as Error;

                setLoadingEventError(error.message)
    
            }
    
            
    
        }

        const handleUserEventViewed = async () => {

            try {

                const eventViewed = await client.models.EventViewed.create({
                    email: userDetails?.username,
                    eventId: id,
                    locationAddress: userAddress,
                    location:{
                        type: "Point",
                        coordinates: [Number(userLocation?.longitude), Number(userLocation?.latitude)]
                    }
                    
                })

                

            } catch (e) {

                

            }

            
        }


        
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



      useEffect(()=> {
    
        setLoadingSortedDates(true)


        if(event) {


            console.log(event.dateTimePriceList)



          const sortedTimelines = event?.dateTimePriceList.sort(function(a, b){

            return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();

        })
      
          
          setSortedDates(sortedTimelines)
          setLoadingSortedDates(false)

        }
    
    
          
    
       
        
    
      },[event])

    
    
      const handleSelectDate = (index:number, eventDate: string, eventEndDate: string, eventDays :number, eventHours: number, eventMinutes: number, ticketPriceArrayList: TicketPrice [] ) => {
    
        setEventIndex(index)
        setEventDate(eventDate)
        setEventEndDate(eventEndDate)
        setEventDays(eventDays)
        setEventHours(eventHours)
        setEventMinutes(eventMinutes)
        setTicketPriceArray(ticketPriceArrayList)
        
    
      }


      const handleOpenCheckoutModal = (eventTotalPrice: number) => {

        setEventTotalPrice(eventTotalPrice)
        setCheckOutModal(true)

    }


  const handleBookEvent = async () => {

    try {

      //setLoadingLikeUnlikeEvent(true)
      setBookingError('')
      setLoadingBooking(true)

      const bookedEvent = await client.models.EventTicket.create({
                eventName: event?.eventName,
                eventDescription: event?.eventDescription,
                eventMainImage: event?.eventMainImage,
                eventAddress: event?.eventAddress,
                ageRestriction: event?.ageRestriction,
                eventDate: eventDate ? new Date(eventDate).toISOString() : null,
                eventEndDate: eventEndDate ? new Date(eventEndDate).toISOString() : null,
                location: event?.location,
                eventId: event?.id,
                userEmail: userDetails?.username,
                adultNumber: adultNumber,
                adolescentNumber: adolescentNumber,
                childNumber: childNumber,
                totalTicketNumber: adultNumber + adolescentNumber + childNumber,
                eventTotalPrice: eventTotalPrice,
                organizerEmail: event?.email,
                ticketsStatus: 'booked',
                refunded: false
            
        });

       setLoadingBooking(false)
       
      // router.push("/(tabs)/tickets")

       // handleGetLikedEvents()
      //  setLoadingLikeUnlikeEvent(false)

    } catch(e) {

      const error = e as Error;
      setBookingError(error?.message)
      setLoadingBooking(false)
     // setLoadingLikeUnlikeEvent(false)

    }

  }


  const handleAddTicket = (item: string) => {

    if(item === 'adult') {
      setAdultNumber(adultNumber => adultNumber + 1)
    }  
    if(item === 'adolescent') {
      setAdolescentNumber(adolescentNumber => adolescentNumber + 1)
    }
    if(item === 'child') {
      setChildNumber(childNumber => childNumber + 1)
    }
  }

  const handleMinusTicket = (item: string) => {

    if(item === 'adult') {
      setAdultNumber(adultNumber => adultNumber - 1)
    }  
    if(item === 'adolescent') {
      setAdolescentNumber(adolescentNumber => adolescentNumber - 1)
    }
    if(item === 'child') {
      setChildNumber(childNumber => childNumber - 1)
    }
  }
    



        
        useEffect(()=> {

            handleGetEvent()
            //handleUserEventViewed()

        },[])

    /**
      <div className=' w-11/12 mt-5'>
                    <EventDateTimeCostSection eventTimelines={events[2].dateTimePrice} />
                </div>

                https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/mpesa.png?alt=media&token=7783a8a4-80fa-4220-886e-1c462c630352
     */

    return(
        <div className=" flex flex-col items-center  min-h-screen  bg-white w-full">
            <ComponentHeader category='oneEvent' id={id} item={event}/>
            {loadingEvent ? 
            <div className="w-full  max-w-7xl h-full flex flex-col items-center pb-96 mb-80 mt-16 md:mt-20">
                <div className='w-full max-w-7xl flex md:w-11/12 mt-1 flex-col md:flex-row '>
                    <div className=" flex w-full md:rounded-lg h-56 md:w-11/12 md:h-96 max-w-2xl bg-gray-200 border"></div>
                    <div className=' w-full md:w-5/12 px-2 fixed bottom-0 md:top-20 md:right-16 z-10 '>
                        <div className='border w-full max-w-md h-96 rounded-md bg-gray-200'></div>
                    </div>
                </div>
                <div className='w-11/12  mt-5 text-3xl '>
                    <div className='max-w-2xl pb-5 font-semibold bg-gray-200 h-10'>
                        
                    </div>
                
                </div>
                <div className='flex flex-col  w-11/12 '>
                    <div className='pt-3 w-full md:w-11/12 mt-2 h-10 max-w-2xl  text-xl bg-gray-200 font-semibold'></div>
                </div>
                <div className='flex flex-col  w-11/12 '>
                    <div className='pt-3 w-full md:w-11/12 mt-2 h-10 max-w-2xl  text-xl bg-gray-200 font-semibold'></div>
                </div>
                <div className='flex flex-col  w-11/12 '>
                    <div className='pt-3 w-full md:w-11/12 mt-2 h-10 max-w-2xl  text-xl bg-gray-200 font-semibold'></div>
                </div>
            </div>:
            <EventComponent event={event} loadingMainImage={loadingMainImage} mainImageUrl={mainImageUrl} screenType={screenType} sortedDates={sortedDates}
            handleSelectDate={handleSelectDate} eventIndex={eventIndex} ticketPriceArray={ticketPriceArray} adultNumber={adultNumber} adolescentNumber={adolescentNumber} 
            childNumber={childNumber} handleAddTicket={handleAddTicket} handleMinusTicket={handleMinusTicket} handleOpenCheckoutModal={handleOpenCheckoutModal}
            loadingSortedDates={loadingSortedDates} eventImage2Url={eventImage2Url} eventImage3Url={eventImage3Url} eventImage4Url={eventImage4Url} 
            loadingImage2={loadingImage2} loadingImage3={loadingImage3} loadingImage4={loadingImage4}/>}
            <FooterComponent />
        </div>
    )
}

export default function EventPage() {
    return(
        <Suspense >
            <OneEventComponent />
        </Suspense>
    )
}