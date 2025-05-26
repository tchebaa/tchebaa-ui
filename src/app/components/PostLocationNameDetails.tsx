"use client"

import {useEffect, Dispatch, SetStateAction, useState} from 'react';
import {useTranslations} from 'next-intl';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {useLoadScript, useJsApiLoader,  Libraries} from '@react-google-maps/api'
import moment from 'moment';
import {useLocation} from '../context/LocationContext';
import { MdClose } from 'react-icons/md';



export default function PostLocationNameDetails ({eventName, setEventName, eventDescription, setEventDescription, eventNameError, eventDescriptionError, address, 
    setAddress, coordinates, setCoordinates, eventAddressError}: {eventName: string, setEventName: Dispatch<SetStateAction<string>>, 
        eventDescription: string, setEventDescription: Dispatch<SetStateAction<string>>, eventAddressError: boolean, 
        eventNameError: boolean, eventDescriptionError: boolean, address: string, 
        setAddress: Dispatch<SetStateAction<string>>, coordinates: {latitude: number, longitude:number} | null,
    setCoordinates: Dispatch<SetStateAction<{latitude: number, longitude:number} | null>>
}) {

    const [showMap, setShowMap] = useState<boolean>(false)
    const [loadingAddress, setLoadingAddress] = useState<boolean>(false)

    const {userLocation} = useLocation()

    const [mapCoordinates, setMapCoordinates] = useState<{latitude: number , longitude: number} | null >(null)
    const [locationName, setLocationName] = useState<string>('')

    const t = useTranslations()
    const libraries: Libraries = ['places'];


    const handleLocationChange = async (value: string) => {

        setLocationName(value)

    }

    const handleLocationSelect = async (value: string) => {

        console.log(value, 'value')

        setAddress(value)

        const selectedLocation = await geocodeByAddress(value)
    
        
        console.log(selectedLocation, 'value2')
        
        
        const locationCoords = await getLatLng(selectedLocation[0])
    
        console.log(locationCoords, 'value3')

        setCoordinates({latitude: locationCoords.lat, longitude: locationCoords.lng})

        


        setLocationName('')

    }




    const {isLoaded} = useJsApiLoader({
                id: 'google-map-script',
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
                libraries: libraries
            });

    return(
        <div className='w-full'>
            {showMap ? 
            <div className='border bg-white p-2'>
                <div // style={styles.mapStyle}
                >
                  

                </div>
                <div >
                    <div className='w-full flex flex-row items-center justify-between '>
                        <div //close
                        ></div>
                        <div className='cursor-pointer' onClick={()=> setShowMap(false)}><MdClose color='black' size={20}/></div>
                        
                    </div>
                    <div className='mt-2'>
                        {isLoaded ? 
                            <PlacesAutocomplete
                                value={locationName}
                                onChange={(value)=>handleLocationChange(value)}
                                onSelect={(value) => handleLocationSelect(value)}
                                
                                >
                                    {({getInputProps, suggestions, getSuggestionItemProps, loading})=> (
                                        <div className="w-full">
                                            <input  className="w-11/12  border px-1 py-2 mt-1" {...getInputProps({placeholder: t('location')})} />
                                            <div className="w-11/12 max-w-sm absolute  z-10 bg-white flex flex-col ">
                                                {loading ? <div className='text-black'>...loading</div>: null}
                                                {suggestions.map((suggestion, i) =>{
                                                    
                                                    const style ={width: '90%'}
                                                
                                                    return (
                                                            <button  className="border p-1 hover:bg-gray-100  max-w-sm text-black " {...getSuggestionItemProps(suggestion, {style})} >
                                                                {suggestion.description}
                                                            </button>)
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    </PlacesAutocomplete>: null}
                    </div>
                        {loadingAddress ? 
                        <div>
                          <div className='text-black'>{t('loadinglocation')}</div>
                       
                        </div> : null}
                        {address && !loadingAddress ? 
                        <div >
                          <div className='text-black mt-2'>{address}</div>
                          <div onClick={()=> setShowMap(false)}>
                            <div className='text-black font-semibold cursor-pointer'>{t('confirm')}</div>
                          </div>
                        </div>: null}
                      </div>
            </div>
            : null}
            <div className='w-full'>
              <div className='text-black font-semibold'>{t('location')}</div>
                <div onClick={()=> setShowMap(true)} className='mt-1'>
                    <div className='text-black cursor-pointer'>{t('picklocation')}</div>    
                </div>
                <div className='mt-2'>
                  <div className='text-black'>{address}</div>
                  {eventAddressError ? <div className='text-red-500'>{t('eventlocationisrequired')}</div>: <div></div>}
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-black font-semibold'>{t('eventname')}</div>
                    <input className='border p-1 mt-2 w-full max-w-sm text-black' placeholder={t('eventname')} value={eventName} onChange={(e)=> setEventName(e.target.value)}/>
                </div>
                {eventNameError ? <div className='text-red-500'>{t('eventnamerequired')}</div>: <div></div>}
                <div className='mt-2 w-full'>
                    <div className='text-black'>{t('eventdescription')}</div>
                    <textarea className='mt-2 p-1 border w-full max-w-sm text-black'   placeholder={t('eventdescription')} value={eventDescription} onChange={(e)=> setEventDescription(e.target.value)}/>
                </div>
                {eventNameError ? <div className='text-red-500'>{t('eventdescriptionrequired')}</div>: <div></div>}
            </div>
        </div>  
    )
}