"use client"


import {useEffect, useState, Dispatch, SetStateAction, useRef} from 'react';
import EventComponent from './EventComponent';
import { uploadData, getUrl } from '@aws-amplify/storage';



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




export default function PostEventPreview({event}: {event: Event}) {



        const [screenType, setScreenType] = useState<string>('preview')
    
        
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
        
    
    
    
            
           
    


    return (
        <div>
            <EventComponent event={event} loadingMainImage={loadingMainImage} mainImageUrl={mainImageUrl} screenType={screenType} sortedDates={sortedDates}
                handleSelectDate={handleSelectDate} eventIndex={eventIndex} ticketPriceArray={ticketPriceArray} adultNumber={adultNumber} adolescentNumber={adolescentNumber} 
                childNumber={childNumber} handleAddTicket={handleAddTicket} handleMinusTicket={handleMinusTicket} handleOpenCheckoutModal={handleOpenCheckoutModal}
                loadingSortedDates={loadingSortedDates} eventImage2Url={eventImage2Url} eventImage3Url={eventImage3Url} eventImage4Url={eventImage4Url}
                loadingImage2={loadingImage2} loadingImage3={loadingImage3} loadingImage4={loadingImage4}/>
        </div>    
                  
        
    )
}