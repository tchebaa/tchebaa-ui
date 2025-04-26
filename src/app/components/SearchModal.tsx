"use client" 

import Link from "next/link"
import {useState, useEffect, Dispatch, SetStateAction} from 'react'
//import {useAuth} from '../context/AuthContext'
//import {useInput} from '../context/InputsContext'
//import {useLocation} from '../context/LocationContext'
//import Datepicker from "react-tailwindcss-datepicker";
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import { MdClose, MdOutlineLocationOn, MdOutlineGpsFixed   } from "react-icons/md";

import dayjs from 'dayjs';
import DateSelectComponents from "./DateSelectComponent"
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {useLoadScript, useJsApiLoader, Libraries} from '@react-google-maps/api'

export default function SearchModal({headerPage, setSearchModalVisible, setMenuModalVisible}: {headerPage: string, setSearchModalVisible: Dispatch<SetStateAction<boolean>>, setMenuModalVisible: Dispatch<SetStateAction<boolean>>}){


    const libraries: Libraries = ['places'];
    //const {auth} = useAuth()
    //const { endDate, startDate, setEndDate, setStartDate} = useInput()
    //const {lat, lng, setLat, setLng, locationName, setLocationName} = useLocation()
    const [newStartDate, setNewStartDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('')
    const [locationComponent, setLocationComponent] = useState('')


    const handleLocationChange = (value) => {
        
        setLocationComponent(value)
       // console.log(value)
       }
    
       const handleLocationSelect = async (value) => {

           console.log(value, 'value')

           setLocationName(value)

        const selectedLocation = await geocodeByAddress(value)
    
        
        console.log(selectedLocation, 'value2')
        
        
        const locationCoords = await getLatLng(selectedLocation[0])
    
        console.log(locationCoords, 'value3')

        setLat(locationCoords.lat)
        setLng(locationCoords.lng)
        setLocationComponent('')
          
    
        
       }

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
        libraries: libraries
    });

   

    return(
        <div className="w-11/12  max-w-2xl items-center  bg-white p-2 rounded-md z-40 justify-center  border-2 shadow flex flex-col mt-20 fixed justify-end  justify-self-end"  >
            <div className=" flex mb-1 flex-row w-full justify-between">
                <div></div>
                <div className="cursor-pointer" onClick={()=>{ setSearchModalVisible(false); }}>
                    <MdClose size={20} color="black" />
                </div>
            </div>
            <div className='bg-white h-full z-20   flex flex-col items-center justify-between mt-2 rounded-full w-full lg:w-4/5 '>
                    <div className=' w-full h-10 border flex flex-row items-center '>
                            <input placeholder={headerPage === 'dashboard' ? 'Search': 'Search'} value={searchTerm} onChange={(event)=>{setSearchTerm(event.target.value);}} className=' w-full h-full px-2' />
                            <div className='   flex items-center justify-center w-10 h-full' onClick={()=> setSearchModalVisible(true)}>
                                <BiSearch size={25} color='#00BDFE' />
                            </div>
                        </div> 
                        <div className=' w-full h-10  flex flex-row items-center mt-5 '>
                        <div className='mt-1 w-full '>
                            {isLoaded ? 
                                <PlacesAutocomplete
                                    value={locationComponent}
                                    onChange={(value)=>handleLocationChange(value)}
                                    onSelect={(value) => handleLocationSelect(value)}
                                    >
                                        {({getInputProps, suggestions, getSuggestionItemProps, loading})=> (
                                            <div className="w-full ">
                                                <input  className="w-11/12 border  px-1 py-2 mt-1" {...getInputProps({placeholder: 'Location'})} />
                                                <div className="w-11/12 max-w-sm absolute  z-10 bg-white flex flex-col ">
                                                    {loading ? <div className='text-black'>...loading</div>: null}
                                                    {suggestions.map((suggestion, i) =>{
                                                        const style ={width: '90%'}
                                                    
                                                        return (
                                                                <button key={i} className="border p-1 hover:bg-gray-100  max-w-sm text-black " {...getSuggestionItemProps(suggestion, {style})} >
                                                                    {suggestion.description}
                                                                </button>)
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        </PlacesAutocomplete>: null}
                            </div>
                            
                            
                        </div>
                        <div className="w-full flex items-center mt-5 mb-2 justify-between">
                            <div className="text-black">{locationName}</div>
                            <div className='pr-2 cursor-pointer'>
                                <MdOutlineLocationOn size={25} color='#00BDFE' />
                            </div>
                        </div>
                         
                        <DateSelectComponents />
                          
                    </div>
                    <div className=' w-5/12  flex items-center justify-center mt-5 '>
                                {searchTerm.length > 1 ?
                                 <Link className='  flex items-center w-6/12 cursor-pointer w-full' href={{ pathname: '../pages/searchEventPage', query: { allSearchTerm: searchTerm, categoryTitle: 'all', pageType:'allSearch' } }} >
                                    <div className=' p-1 flex w-3/12 items-center rounded-l-md  bg-black justify-center h-10'>
                                        <div>
                                            <BiSearch size={25} color='white' />
                                        </div>
                                        
                                    </div>
                                    <div className='text-black  w-full flex items-center bg-cyan-400 justify-center font-bold rounded-r-md p-1 h-10'>
                                        <div>Find</div>
                                    </div>
                                </Link>: null}
                            </div>
                    
                    
            
        </div>
    )
}