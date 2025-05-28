"use client"

import {useEffect, useState} from 'react';
import moment from 'moment';
import { uploadData, getUrl } from '@aws-amplify/storage';
import {useLikes} from '../context/LikedContext';
import {useUser} from '../context/UserContext';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import outputs from '../../../amplify_outputs.json'
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {useAdmin} from '../context/TchebaaAdminContext'


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

  interface EventTicket {
      id: string;
      eventMainImage: EventImage;
      eventName: string;
      eventAddress: string;
      eventDate: string;
      eventEndDate: string;
      eventTotalPrice: number;
      totalTicketNumber: number;
      adultNumber: number;
      childNumber: number;
      adolescentNumber: number;
      userEmail: string;
      organizerEmail: string;
      eventId: string;
      eventDescription: string;
      ageRestriction: string [];
      ticketsStatus: string;
      refunded: boolean;
      location: Location
  }



export default function EventTicketBody({item, screenType}: {screenType: string | string [], item: EventTicket}) {



  const t = useTranslations()
  const [loadingImage, setLoadingImage] = useState<boolean>(true)
  const [mainImageUrl, setMainImageUrl] = useState<string>('')

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


    return (
        <div className='border border-black w-full max-w-sm p-2 m-1'>
            
              <Link className='w-full h-full' href={{pathname: '/(tabs)/tickets/eventTicket', query: {screenType: 'tickets', id: item.id}}}>
               
                      {item.eventMainImage.aspectRatio === 'a'  ? 
                      <div className='w-full'>
                       {loadingImage ? 
                        <div className='w-full'>
                            <div>
                              <div className='text-black font-semibold'>
                                  {t('loading')}
                              </div>
                              
                              <div>
                                  <div>
                                      <div></div>
                                      <div>
                                          <div className='text-black'>{item.eventName}</div>
                                          <div className='text-black'>{item.eventAddress}</div>
                                          {item.totalTicketNumber > 1 ? <div className='text-black'>{`${item.totalTicketNumber} ${t('tickets')}`}</div>
                                          : 
                                          <div className='text-black'>{`${item.totalTicketNumber} ${t('ticket')}`}</div>}
                                          <div className='text-black'>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
                                          
                                      </div>
                                      
                                  </div>
                              </div>
                                  
                            </div>
                            
                        </div>:
                        <div className=" flex flex-row items-center h-44 rounded-lg border justify-between border-black "  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                            <div className='w-full h-full absolute flex flex-row border 0 items-center '>
                                <div className=" flex  h-20 w-20 rounded-lg border border-black z-20 "  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat', overflow: 'hidden'}} ></div>
                           
                            

                                
                                <div className=' z-20'>
                                    
                                    
                                    <div className=''>
                                        
                                        <div className='text-white'>{item.eventName}</div>
                                        <div className='text-white'>{item.eventAddress}</div>
                                        {item.totalTicketNumber > 1 ? <div className='text-white'>{`${item.totalTicketNumber} ${t('tickets')}`}</div>
                                        : 
                                        <div className='text-white'>{`${item.totalTicketNumber} ${t('ticket')}`}</div>}
                                        <div className='text-white'>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
                                        
                                    </div>
                                    
                                </div>
                            
                            </div>
                      
                         <div className=' z-0 backdrop-blur-xl w-full h-full bg-black opacity-60 '>
                                                  
                                </div>
                        </div>
                        }
                      </div> : null}
                      {item.eventMainImage.aspectRatio === 'b'  ? 
                      <div>
                        {loadingImage ? 
                        <div >
                            <div>
                              <div className='text-black font-semibold'>
                                {t('loading')}
                              </div>
                              
                              <div>

                                  <div>
                                      <div></div>
                                      <div>
                                          <div className='text-black font-semibold'>{item.eventName}</div>
                                          <div className='text-black'>{item.eventAddress}</div>
                                          {item.totalTicketNumber > 1 ? <div className='text-black'>{`${item.totalTicketNumber} ${t('tickets')}`}</div>
                                            : 
                                            <div className='text-black'>{`${item.totalTicketNumber} ${t('ticket')}`}</div>}
                                          <div className='text-black'>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
                                      </div>
                                      
                                  </div>
                              </div>
                                  
                            </div>
                            
                        </div>
                        :
                        <div className=" flex  h-44 rounded-lg border border-black"  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}} >
                            <div>
                              <div>
                                <div className=" flex  h-44 rounded-lg border border-black"  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}} ></div>
                              </div>
                              
                              <div>

                                  <div>
                                      <div></div>
                                      <div>
                                          <div className='text-black '>{item.eventName}</div>
                                          <div className='text-black '>{item.eventAddress}</div>
                                          {item.totalTicketNumber > 1 ? <div className='text-black font-semibold'>{`${item.totalTicketNumber} ${t('tickets')}`}</div>
                                            : 
                                            <div className='text-black'>{`${item.totalTicketNumber} ${t('ticket')}`}</div>}
                                          <div className='text-black'>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
                                      </div>
                                      
                                  </div>
                              </div>
                                  
                            </div>
                            
                        </div>
                        }
                      </div> : null}
                      {item.eventMainImage.aspectRatio === 'c'  ? 
                      <div>
                       {loadingImage ? 
                        <div >
                          
                          <div>
                              <div className='text-black'>
                                  {t('loading')}
                              </div>
                              
                              <div>
                                  <div>
                                      <div></div>
                                      <div>
                                          <div className='text-black'>{item.eventName}</div>
                                          <div className='text-black'>{item.eventAddress}</div>
                                          {item.totalTicketNumber > 1 ? <div>{`${item.totalTicketNumber} ${t('tickets')}`}</div>
                                            : 
                                            <div className='text-black'>{`${item.totalTicketNumber} ${t('ticket')}`}</div>}
                                          <div className='text-black'>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
                                      </div>
                                      
                                  </div>
                              </div>
                                  
                            </div>
                        </div> 
                        :
                        <div className=" flex  h-44 rounded-lg border border-black"  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                          
                          <div>
                              <div>
                                  <div className=" flex  h-44 rounded-lg border border-black"  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat', overflow: 'hidden'}} ></div>
                              </div>
                              
                              <div>
                                  <div>
                                      <div></div>
                                      <div>
                                          <div className='text-black'>{item.eventName}</div>
                                          <div className='text-black'>{item.eventAddress}</div>
                                          {item.totalTicketNumber > 1 ? <div className='text-black'>{`${item.totalTicketNumber} ${t('tickets')}`}</div>
                                            : 
                                            <div className='text-black'>{`${item.totalTicketNumber} ${t('ticket')}`}</div>}
                                          <div className='text-black'>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
                                      </div>
                                      
                                  </div>
                              </div>
                                  
                            </div>
                        </div> 
                        }
                      </div> : null}
                      
                
                </Link>

            
        </div>      
                  
        
    )
}