"use client"

import {Dispatch, useEffect, useState, SetStateAction} from 'react';
import { uploadData, getUrl } from '@aws-amplify/storage';
import {useLikes} from '../context/LikedContext';
import {useUser} from '../context/UserContext';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import { generateClient } from 'aws-amplify/data';
import outputs from '../../../amplify_outputs.json'
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {useAdmin} from '../context/TchebaaAdminContext'


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





export default function EventManageBody({item, screenType, deletedItem, setDeletedItem, screenName}: 
    {screenType: string, deletedItem: string, setDeletedItem: Dispatch<SetStateAction<string>>, screenName: string | null, item: Event}) {


    const t = useTranslations()
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    const [loadingImage, setLoadingImage] = useState<boolean>(true)
    const [loadingImageError, setLoadingImageError] = useState<string>('')
    const [mainImageUrl, setMainImageUrl] = useState<string>('')
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [eventName, setEventName] = useState<string>('')
    const [eventId, setEventId] = useState<string>('')
    const [eventAddress, setEventAddress] = useState<string>('')
    const [loadingDelete, setLoadingDelete] = useState(false)
    

    const admin = admins?.find((admin)=> admin.email === userDetails?.username)
    



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

      }

      
   

    }

    useEffect(()=> {
      

      handleGetImageUrl()
      

      
    },[])


    const handleOpenDeleteModal = (eventName: string, eventId: string, eventAddress: string) => {


        setEventName(eventName)
        setEventId(eventId)
        setEventAddress(eventAddress)
        setDeleteModal(true)



    }


    const handleUpdateFeature = async () => {

      try{

     //   await client.models.Event.update({
         
        
   //   })

      } catch(e) {

      }

    }

    const handleDeleteEvent = async () => {

      setLoadingDelete(true)

      try {

        

        const { data, errors } = await client.models.Event.update({
          id: eventId,
         
        })

        setDeleteModal(false)

        setDeletedItem(eventId)

        setLoadingDelete(false)

      } catch(e) {

        setLoadingDelete(false)

      }
      
    }



    return (
        <div className='w-full '>
              {deleteModal ? 
                <div className='absolute bg-white border border-black w-11/12 m-2 max-w-sm p-2 rounded-md flex flex-col items-center'>
                    <div className='text-black font-semibold'>{t('areyousureyouwanttodeletethisevent')}</div>
                    <div className='mt-1 text-black font-semibold'>{eventName}</div>
                    <div className='text-black mt-1'>{eventAddress}</div>
                    <div className='text-black mt-1'>{eventId}</div>
                    
                    {loadingDelete ? <div className='text-black font-semibold'>{t('deleting')}</div> :
                    <div className='flex flex-row items-center justify-between mt-2'>
                        <div className='border-2 border-black px-1 cursor-pointer'  onClick={()=> setDeleteModal(false)}>
                            <div className='text-black font-semibold'>{t('no')}</div>
                        </div>
                        <div className='border-2 px-1 ml-5 border-red-500 cursor-pointer' onClick={()=> handleDeleteEvent()}>
                            <div className='text-red-500 font-semibold'>{t('yes')}</div>
                        </div>
                    </div>}
                </div>: null}
                <div className='w-full m-2 flex flex-col p-2' >
                    {item.eventMainImage.aspectRatio === 'a'  ? 
                    <div className='w-full'>
                      {!loadingImage ? 
                      <div className='w-full h-44 max-w-sm rounded-md border border-black'  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                      </div>:
                      <div className='text-black font-semibold'>{t('loading')}</div>} 
                    </div>: null}
                    
                    {item.eventMainImage.aspectRatio === 'b'  ? 
                    <div className='w-full'>
                      {!loadingImage ? 
                      <div className='w-full h-44 max-w-sm flex items-center rounded-md border border-black'  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                            <div className=' z-10 backdrop-blur-sm w-full h-full flex flex-col items-center  '>
                               <div className='h-40 mt-2 absolute z-20 w-40 rounded-md rounded-md'  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}} ></div>
                               
                            </div>
                          
                      </div>:
                      <div className='text-black font-semibold'>{t('loading')}</div>}
                    </div> : null}
                    {item.eventMainImage.aspectRatio === 'c'  ? 
                    <div>
                    {!loadingImage ? 
                    <div className='w-full h-44 max-w-sm rounded-md border border-black '  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                      <div className=' z-10 backdrop-blur-sm w-full h-full flex flex-col items-center  '>
                         <div className='h-40 w-28 mt-2 absolute z-20 rounded-md  rounded-md'  style={{backgroundImage: 'url(' + `${mainImageUrl}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}} ></div>      
                               
                        </div>

                        
                    </div>:
                    <div className='text-black font-semibold'>{t('loading')}</div>}
                    </div> : null}
                    
                    <div className='mt-2 w-full'>
                      
                          <div className='font-semibold text-black'>{item.eventName}</div>
                          <div className='text-black mt-1'>{item.eventAddress}</div>
                          <div className='flex flex-row items-center justify-between mt-1'>
                            
                            <div>
                                
                                <Link href={{pathname: '../pages/eventBookings' , query: {screenName: screenType, eventId: item.id, eventName: item.eventName, eventAddress: item.eventAddress}}} target="_blank" passHref>
                                    <div className='border text-black rounded-md px-1 border-black'><div>{t('viewbookings')}</div></div>
                                </Link>
                                </div>
                            
                                
                                <div>
                                
                                {screenName === 'main' ? null :
                                <Link href={{pathname: '../pages/eventAnalytics' , query: {screenName: screenType, id: item.id}}} target="_blank" passHref>
                                    <div className='border text-black rounded-md px-1 border-black'><div>{t('viewanalytics')}</div></div>
                                </Link>}
                                </div>
                            
                            
                          </div>
                          
                          
                          <div className='flex flex-row items-center justify-between mt-2'>
                            {screenName === 'main' ? 
                            <div className='border border-black text-black px-1 rounded-md cursor-pointer' onClick={()=> handleOpenDeleteModal(item.eventName, item.id, item.eventAddress)}><div>{t('delete')}</div></div>
                            :
                            <div>
                              {admin?.deleteEventPermissions ? <div className='border border-black text-black rounded-md px-1 cursor-pointer'  onClick={()=> handleOpenDeleteModal(item.eventName, item.id, item.eventAddress)}><div>{t('delete')}</div></div>
                              :
                              null}
                            </div>}
                            {screenName === 'main' ? 
                            <Link href={{pathname: '../pages/postEventPage' , query: {screenName: screenType, id: item.id}}} >
                                <div className='border border-black text-black rounded-md px-1 cursor-pointer'><div>{t('edit')}</div></div>
                            </Link>:
                            <div>
                              {admin?.editEventPermissions ? 
                              <Link href={{pathname: '../pages/postEventPage' , query: {screenName: screenType, id: item.id}}} >
                                  <div className='border border-black text-black rounded-md px-1 cursor-pointer'><div>{t('edit')}</div></div>
                              </Link>: null}
                            </div>}
                          </div>
                      </div>
                
                </div>
                
               
            
        </div>      
                  
        
    )
}