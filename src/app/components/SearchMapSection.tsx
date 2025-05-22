/** 
"use client"

import {useEffect, useState, Dispatch, SetStateAction} from 'react'
import PlacesAutocomplete, {
    geocodeByAddress, getLatLng
} from "react-places-autocomplete";
import {GoogleMap, Marker, useJsApiLoader, MarkerF} from '@react-google-maps/api'
import {useLocation} from '../context/LocationContext'
import { MdClose } from "react-icons/md";
import EventDateTimeCostSection from './EventDateTimeCostSection';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import EventListItem from './EventListItem';



export default function MapSection({homeEvents, loadingHomeEvents, pageName, eventLocation, setOpenMobileMap,
    loginModal, setLoginModal, signUpModal, setSignUpModal}: {loadingHomeEvents: boolean, pageName: string, loginModal: boolean, setLoginModal: Dispatch<SetStateAction<boolean>>,
        signUpModal: boolean, setSignUpModal: Dispatch<SetStateAction<boolean>>
    }) {

    const {userLocation} = useLocation()

   

    const [eventOnMap, setEventOnMap] = useState(null)

    const [ libraries ] = useState(['places']);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries: libraries
    });
    
    const onMarkerClick = (item) => {
        setEventOnMap(item)
    };


    /**
     * 
     *  <Marker onClick={onMarkerClick} position={center}
                            
                            className='cursor cursor-pointer'
                           
                            
                    icon="https://firebasestorage.googleapis.com/v0/b/taliitravel.appspot.com/o/loc1.png?alt=media&token=390b5497-8d6b-46d5-9f84-f2ad4cdd0b46"
                    
                    title="start location" />
    



    return(
        <div>
           {pageName === 'category' ?  
           <div className="w-full h-screen border">
                
                <div className="h-full w-full z-0 bg-gray-100 fixed ">
                    <div className=" h-full w-full bg-white">
                        {isLoaded  ?
                        <GoogleMap
                        options={{
                            disableDefaultUI: true,
                            clickableIcons: false
                        }}
                        zoom={10}
                        center={{lat: lat,  lng: lng }}
                        
                        mapContainerClassName='w-full h-full bg-white'>
                            
                    
                    <div className='absolute ml-5 '>
                        {eventOnMap ?
                        <div className='flex flex-row'> 
                            <EventListItem item={eventOnMap} loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
                            <div className='bg-white mt-4 h-6 border border-black w-6 flex flex-col items-center justify-center cursor-pointer' onClick={()=> setEventOnMap(null)}><MdClose size={20} color='black' /></div>
                        </div>: null}
                    </div>
                    {loadingHomeEvents ? null :
                    <div className='w-full h-full'>
                            {homeEvents.map((item, i)=> {
                                return(
                                    <Marker key={i}  position={{lat:Number(item.location.coordinates[1].$numberDecimal), lng: Number(item.location.coordinates[0].$numberDecimal)}}
                                        
                                        className='cursor-pointer'
                                    onClick={()=> onMarkerClick(item)}
                                        
                                icon="https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/icons8-location-32.png?alt=media&token=70d0ba47-fcde-46af-a241-61a30c6d15f9"
                                
                            />
                                )
                            })}

                    </div>}
                    
                        </GoogleMap>:
                        null}
                        
                    </div>

                </div>
                
            </div>: null}
            {pageName === 'event' ? 
                <div className=" max-w-2xl z-10 flex flex-col items-center w-full  z-0 bg-gray-100 ">
                    <div className=" w-full h-48 md:h-96  bg-white">
                    {isLoaded ?
                        <GoogleMap
                        options={{
                            disableDefaultUI: true,
                            clickableIcons: false
                        }}
                        zoom={10}
                        center={{lat: Number(eventLocation.coordinates[1].$numberDecimal),  lng: Number(eventLocation.coordinates[0].$numberDecimal) }}
                        
                        mapContainerClassName='w-full h-full bg-white rounded-md border '>
                            <Marker  position={{lat:Number(eventLocation.coordinates[1].$numberDecimal), lng: Number(eventLocation.coordinates[0].$numberDecimal)}} 
                            icon="https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/icons8-location-32.png?alt=media&token=70d0ba47-fcde-46af-a241-61a30c6d15f9"
                            onClick={()=> onMarkerClick(item)}
                            />
                        
                        </GoogleMap>:
                        null}
                    </div>
                    
                </div>: null}
                {pageName === 'categoryMobile' ? 
                <div className="w-full h-96 border">
                
                <div className=" w-full z-0 bg-gray-100 fixed ">
                    <div className=" h-96 w-full bg-white">
                        {isLoaded  ?
                        <GoogleMap
                        options={{
                            disableDefaultUI: true,
                            clickableIcons: false
                        }}
                        zoom={10}
                        center={{lat: lat,  lng: lng }}
                        
                        mapContainerClassName='w-full h-full bg-white'>
                            
                    
                    <div className='absolute w-full flex flex-col   border-black items-center '>
                        <div className='flex flex-row w-11/12 items-center justify-between border'>
                            <div></div>
                            <div className='h-6 w-6 flex items-center justify-center bg-black mt-1 cursor-pointer' onClick={()=> setOpenMobileMap(false) }><MdClose size={20} color='red' /></div>
                        </div>
                    
                        {eventOnMap ?
                        <div className='flex flex-row w-11/12 mt-2'> 
                            <EventListItem item={eventOnMap} loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
                            <div className='bg-white mt-4 h-6 border border-black w-6 flex flex-col items-center justify-center cursor-pointer' onClick={()=> setEventOnMap(null)}><MdClose size={20} color='black' /></div>
                        </div>: null}
                        
                    </div>
                    {loadingHomeEvents ? null :
                    <div className='w-full h-full'>
                            {homeEvents.map((item, i)=> {
                                return(
                                    <Marker key={i}  position={{lat:Number(item.location.coordinates[1].$numberDecimal), lng: Number(item.location.coordinates[0].$numberDecimal)}}
                                        
                                        className='cursor-pointer'
                                    onClick={()=> onMarkerClick(item)}
                                        
                                icon="https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/icons8-location-32.png?alt=media&token=70d0ba47-fcde-46af-a241-61a30c6d15f9"
                                
                            />
                                )
                            })}

                    </div>}
                    
                        </GoogleMap>:
                        null}
                        
                    </div>

                </div>
                
            </div>: null}
        </div>
    )
}
*/