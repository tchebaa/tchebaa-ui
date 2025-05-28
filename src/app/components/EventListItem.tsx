"use client"

import {useState, useEffect, useRef, Dispatch, SetStateAction} from "react"

import Image from 'next/image'
import moment from "moment"
import EventDateTimeCostSection from "./EventDateTimeCostSection"
import Link from 'next/link';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import axios from "axios"
import { SlBadge } from "react-icons/sl";
import {useLocation} from '../context/LocationContext'
import {useLikes} from '../context/LikedContext'
import {useUser} from '../context/UserContext'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'




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
    id: string
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



export default function EventListItem({item, loginModal, setLoginModal, signUpModal, setSignUpModal, screenType}: 
    {item: Event, loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>>, 
        signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>, screenType: string }) {


    const t = useTranslations()
    const {userDetails} = useUser()
    const {likedEvents, handleGetLikedEvents, loadingLikedEvents} = useLikes()

    const [loadingImage, setLoadingImage] = useState<boolean>(true)
    const [loadingImageError, setLoadingImageError] = useState<string>('')
    const [loadingLikeUnlikeEvent, setLoadingLikeUnlikeEvent] = useState<boolean>(false)
    const [likeUnlikeError, setLikeUnlikeError] = useState<string>('')
    const [mainImageUrl, setMainImageUrl] = useState<string>('')


 
    const eventsArray = range(1, 8)



    function range(start: number, end: number): number [] {
        return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
      }

    



    const handleGetImageUrl = async () => {

      try {

        setLoadingImage(true)

        const linkToStorageFile = await getUrl({
          path: item.eventMainImage.url,
          options: {
            useAccelerateEndpoint: true
          }
      })

      setMainImageUrl(linkToStorageFile.url.toString())

      setLoadingImage(false)

      } catch(e) {

        setLoadingImage(false)

      }

      
   

    }

    useEffect(()=> {
      

      handleGetImageUrl()
      

      
    },[])


    const handleLikeEvent = async () => {

      try {

        setLoadingLikeUnlikeEvent(true)

        const likedEvent = await client.models.LikedEvent.create({
                  email: item.email,
                  eventName: item.eventName,
                  eventDescription: item.eventDescription,
                  personType: item.personType,
                  companyEmail: item.companyEmail,
                  companyName: item.companyName,
                  personName: item.personName,
                  eventMainImage: item.eventMainImage,
                  eventImage2: item.eventImage2,
                  eventImage3: item.eventImage3,
                  eventImage4: item.eventImage4,
                  dateTimePriceList: item.dateTimePriceList,
                  eventAddress: item.eventAddress,
                  ageRestriction: item.ageRestriction,
                  categories: item.categories,
                  location: item.location,
                  eventId: item.id,
                  sponsored: item.sponsored,
                  userEmail: userDetails!.username
              
          });

         

          handleGetLikedEvents()

          setLoadingLikeUnlikeEvent(false)

      } catch(e) {


        setLoadingLikeUnlikeEvent(false)

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

    

    return(
           
          <Link  className=" w-11/12 md:w-72 max-w-sm mt-3 md:mr-2 flex flex-col rounded-md  bg-white hover:shadow" target="_blank" href={{ pathname: '../pages/eventPage', query: { id: item.id } }} passHref>
              {item.eventMainImage.aspectRatio === 'a' && !loadingImage ? 
              <div className=" flex  h-44 rounded-lg border border-black"  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', overflow: 'hidden'}} >
                  <div className="p-1 flex flex-row justify-between w-full">
                      <div className="z-20">
                          {item.sponsored  ? 
                          <div><SlBadge size={20} color="#FF4D00"/></div>: <div></div>}
                      </div>
                      {userDetails ? 
                      <div>
                          {likedEvents ? 
                          <div>
                          {likedEvents.findIndex(newItem => newItem.eventId === item.id) > -1 ? 
                          <div className=" rounded-full p-1 bg-white items-center" onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleUnlikeEvent(item.id, screenType)}}><IoMdHeart size={20} color="#ce2029"/></div>:
                          <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                          onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleLikeEvent()}}>
                              <IoMdHeartEmpty color="black" size={20}/>
                          </div>
                          }
                          </div>: null}
                      </div>:
                      <div>
                          
                          <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                          onClick={(e)=> {e.preventDefault(); e.stopPropagation(); setSignUpModal(true)}}>
                              <IoMdHeartEmpty color="black" size={20}/>
                          </div>
                          
                      </div>}
                  </div>
              </div>: 
              null}
              {item.eventMainImage.aspectRatio === 'b' && !loadingImage ? 
              <div className=" flex  h-44 flex-col items-center  rounded-lg  border border-black"  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', overflow: 'hidden'}} >
                  <div className="p-1 flex flex-row justify-between w-full backdrop-blur-sm">
                      <div className="z-20">
                          {item.sponsored  ? 
                          <div><SlBadge size={20} color="#FF4D00"/></div>: <div></div>}
                      </div>
                      {userDetails ? 
                      <div>
                          {likedEvents!.findIndex(newItem => newItem.eventId === item.id) > -1 ? 
                          <div className=" rounded-full p-1 bg-white items-center" onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleUnlikeEvent(item.id, screenType)}}><IoMdHeart size={20} color="#ce2029"/></div>:
                          <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                          onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleLikeEvent()}}>
                              <IoMdHeartEmpty color="black" size={20}/>
                          </div>
                          }
                      </div>:
                      <div>
                          
                          <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                          onClick={(e)=> {e.preventDefault(); e.stopPropagation(); setSignUpModal(true)}}>
                              <IoMdHeartEmpty color="black" size={20}/>
                          </div>
                          
                      </div>
                      }
                  </div>
                  <div className='h-40 mt-2 absolute z-20 w-40 rounded-md rounded-md'  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                  <div className=' z-10 backdrop-blur-sm w-full h-full  '>
                      
                      
                  </div>
                  
              </div>: 
              null}
              {item.eventMainImage.aspectRatio === 'c' && !loadingImage ? 
              <div className=" flex  h-44 flex-col items-center  rounded-lg  border border-black"  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', overflow: 'hidden'}} >
                  <div className="p-1 flex flex-row justify-between w-full backdrop-blur-sm ">
                      <div className="z-20">
                          {item.sponsored  ? 
                          <div><SlBadge size={20} color="#FF4D00"/></div>: <div></div>}
                      </div>
                      {userDetails  ?
                      <div>
                          {likedEvents!.findIndex(newItem => newItem.eventId === item.id) > -1 ? 
                          <div className=" rounded-full p-1 bg-white items-center" onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleUnlikeEvent(item.id, screenType)}}><IoMdHeart size={20} color="#ce2029"/></div>:
                          <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                          onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleLikeEvent()}}>
                              <IoMdHeartEmpty color="black" size={20}/>
                          </div>
                          }
                          </div>:
                          <div>
                          
                          <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                          onClick={(e)=> {e.preventDefault(); e.stopPropagation(); setSignUpModal(true)}}>
                              <IoMdHeartEmpty color="black" size={20}/>
                          </div>
                          
                      </div>}
                  </div>
                  <div className='h-40 w-28 mt-2 absolute z-20 rounded-md  rounded-md'  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                  
                  <div className=' z-10 backdrop-blur-sm w-full h-full  '>
                      
                      
                  </div>
                  
              </div>: 
              null}
              <div className="p-2">
                  <div className=" text-lg text-black font-semibold  max-h-14 overflow-hidden text-clip">{item.eventName}</div>
                  <div className="text-black text-sm mt-1">{item.eventAddress}</div>
                  <div>
                      {item.site ? null : <EventDateTimeCostSection eventTimelines={item.dateTimePriceList} option={'homeNear'} /> }
                  </div>
                  
              </div>
              
          </Link>
               
          
           
       
    )
}