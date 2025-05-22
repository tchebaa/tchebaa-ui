"use client"

import {useEffect, useState, Dispatch, SetStateAction} from 'react'
import PlacesAutocomplete, {
    geocodeByAddress, getLatLng
} from "react-places-autocomplete";
import {GoogleMap, Marker, useJsApiLoader, MarkerF, Libraries, useLoadScript} from '@react-google-maps/api'
import {useLocation} from '../context/LocationContext'
import { MdClose } from "react-icons/md";
import moment from 'moment';
import {useTranslations} from 'next-intl';
import EventDateTimeCostSection from './EventDateTimeCostSection';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import EventListItem from './EventListItem';



export default function MapSection({ pageName, eventLocation}: { pageName: string, eventLocation: {type: string, coordinates: number []}
    }) {

    const {userLocation} = useLocation()
    
    const libraries: Libraries = ['places'];



     const {isLoaded} = useJsApiLoader({
                id: 'google-map-script',
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
                libraries: libraries
            });



    /**
     * 
     *  <Marker onClick={onMarkerClick} position={center}
                            
                            className='cursor cursor-pointer'
                           
                            
                    icon="https://firebasestorage.googleapis.com/v0/b/taliitravel.appspot.com/o/loc1.png?alt=media&token=390b5497-8d6b-46d5-9f84-f2ad4cdd0b46"
                    
                    title="start location" />
     */



    return(
        <div>
           
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
                        center={{lat: Number(eventLocation.coordinates[1]),  lng: Number(eventLocation.coordinates[0]) }}
                        
                        mapContainerClassName='w-full h-full bg-white rounded-md border '>
                            <Marker  position={{lat:Number(eventLocation.coordinates[1]), lng: Number(eventLocation.coordinates[0])}} 
                            icon="https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/icons8-location-32.png?alt=media&token=70d0ba47-fcde-46af-a241-61a30c6d15f9"
                            
                            />
                        
                        </GoogleMap>:
                        null}
                    </div>
                    
                </div>: null}
        </div>
    )
}