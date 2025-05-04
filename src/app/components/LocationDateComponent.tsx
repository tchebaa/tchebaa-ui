"use client"
import {useState} from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineAddchart, MdOutlineGpsFixed, MdRadioButtonChecked, MdRadioButtonUnchecked} from "react-icons/md";
//import DateSelectComponents from './DateSelectComponent';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {useLoadScript, useJsApiLoader,  Libraries} from '@react-google-maps/api'
import moment from 'moment';
import {useLocation} from '../context/LocationContext';
import {useTranslations} from 'next-intl';
import DateSelectComponents from './DateSelectComponent';



export default function LocationDateComponent() {


    const libraries: Libraries = ['places'];
    const [openLocationComponent, setOpenLocationComponent] = useState(false)
    const [openDateComponent, setOpenDateComponent] = useState(false)
    const [locationComponent, setLocationComponent] = useState('')
    const [locationSelect, setLocationSelect] = useState('')
    const [startDate, setStartDate] = useState<string>(moment(new Date()).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [dateFilter, setDateFilter] = useState<string>('all')
    const [dayType, setDayType] = useState('')

    const t = useTranslations();

    

    //const { dateFilter, setDateFilter, setStartDate, startDate, setEndDate, endDate, dayType, setDayType} = useInput()

    const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation()

    const handleLocationOpen = () => {
        if(openDateComponent) {
            setOpenDateComponent(false)
            setOpenLocationComponent(true)
        } else{
            setOpenLocationComponent(!openLocationComponent)
        }
    }

    const handleDateOpen = () => {
        if(openLocationComponent) {
            setOpenLocationComponent(false)
            setOpenDateComponent(true)
        } else{
            setOpenDateComponent(!openDateComponent)
        }
    }


    const dayRanges = [
        {
            name: t('all'),
            code: 'all'
        },
        {
            name: t('today'),
            code: 'today'
        },
        {
            name: t('tomorrow'),
            code: 'tomorrow'
        },
        {
            name: t('thisweek'),
            code: 'thisweek'
        },
        {
            name: t('thisweekend'),
            code: 'thisweekend'
        },
        {
            name: t('nextweek'),
            code: 'nextweek'
        },
        {
            name: t('thismonth'),
            code: 'thismonth'
        },
        {
            name: t('nextmonth'),
            code: 'nextmonth'
        },
    ]

    const handleDateChange = (code: string) => {
            
        //setDayType(code)
    
        if(code === 'all') {

            setDateFilter('all')

            setStartDate(moment(new Date()).format().toString())
            setEndDate('')
        }
    
        if(code === 'today'){

            setDateFilter('today')

            setStartDate(moment(new Date()).startOf('day').format().toString())
            setEndDate(moment(new Date()).endOf('day').format().toString())
    
           // console.log(moment(new Date()).startOf('day').format())
    
           // console.log(moment(new Date).endOf('day').format())
            
    
        }
    
        if(code === 'tomorrow'){

            setDateFilter('tomorrow')

            setStartDate(moment(new Date()).endOf('day').format().toString())
            setEndDate(moment(new Date()).add(1, 'days').endOf('day').format().toString())
            
            
        }
        if(code === 'thisweek'){
    
            setDateFilter('thisweek')

            setStartDate(moment(new Date()).startOf('isoWeek').format().toString())
            setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
            
            
        }
        if(code === 'thisweekend'){

            setDateFilter('thisweekend')

            setStartDate(moment(new Date()).endOf('isoWeek').subtract(2, 'days').format().toString())
            setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
            
        }
    
        if(code === 'nextweek'){

            setDateFilter('nextweek')


            setStartDate(moment(new Date()).add(1, 'week').startOf('isoWeek').format().toString())
            setEndDate(moment(new Date()).add(1, 'week').endOf('isoWeek').format().toString())
    
            
        }
        if(code === 'thismonth'){

            setDateFilter('thismonth')

            setStartDate(moment(new Date()).startOf('month').format())
            setEndDate(moment(new Date()).endOf('month').format())
        }
    
        if(code === 'nextmonth'){

            setDateFilter('nextmonth')

            setStartDate(moment(new Date()).add(1, 'month').startOf('month').format())
            setEndDate(moment(new Date()).add(1, 'month').endOf('month').format())
            
        }
    }


    
    const handleRemoveDateType = () => {
       
    }

    const handleLocationChange = (value: string) => {
        
         setLocationComponent(value)
        // console.log(value)
        }
     
        const handleLocationSelect = async (value: string) => {

            console.log(value, 'value')

            setUserAddress(value)

         const selectedLocation = await geocodeByAddress(value)
     
         
         console.log(selectedLocation, 'value2')
         
         
         const locationCoords = await getLatLng(selectedLocation[0])
     
         console.log(locationCoords, 'value3')

         setUserLocation({latitude: locationCoords.lat, longitude: locationCoords.lng})

         


         setLocationComponent('')
           
     
         
        }
        
        const {isLoaded} = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
            libraries: libraries
        });
    
    return(
        <div className="flex w-full flex-col items-center justify-center z-20 bg-white  mt-10 ">
            <div className='max-w-6xl w-11/12 '>
                <div className='flex md:flex-row flex-col'>
                    <div className='border py-2 px-4 rounded-3xl hover:shadow'>
                        <div className=' flex flex-row items-center cursor-pointer' onClick={()=> handleLocationOpen()}>
                            <div className='text-black'> Location</div>
                            <div>
                                {!openLocationComponent ? 
                                <MdOutlineKeyboardArrowDown color='black' size={20}/>
                                :<MdOutlineKeyboardArrowUp color='black' size={20}/>}</div>
                        </div>
                       {openLocationComponent ? <div className=''>
                            
                            <div className='mt-2'>
                            {isLoaded ? 
                                <PlacesAutocomplete
                                    value={locationComponent}
                                    onChange={(value)=>handleLocationChange(value)}
                                    onSelect={(value) => handleLocationSelect(value)}
                                    >
                                        {({getInputProps, suggestions, getSuggestionItemProps, loading})=> (
                                            <div className="w-full">
                                                <input  className="w-11/12  border px-1 py-2 mt-1" {...getInputProps({placeholder: 'Location'})} />
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
                            
                            
                            <div className='p-2 text-black'>{userAddress}</div>
                            
                        </div>: null}
                    </div>
                    <div className='md:ml-5 mt-2 md:mt-0 border hover:shadow rounded-3xl'>
                        <div className=' py-2 px-4  flex flex-row items-center' onClick={()=> handleDateOpen()}>
                            <div color='text-black'> Date</div>
                            <div>{!openDateComponent ? 
                                <MdOutlineKeyboardArrowDown color='black' size={20}/>
                                :<MdOutlineKeyboardArrowUp color='black'/>}</div>
                        </div>
                        {openDateComponent ? 
                        <div className=''>
                            {dayType === 'calendar' ? 
                            <div className='border border-green-400 p-1 mt-2 flex flex-row'>
                                <DateSelectComponents/>
                            </div>:
                            <div className='border p-1 mt-2 flex flex-row'>
                                <DateSelectComponents/>
                            </div>}
                            
                            <div className=''>
                                {dayRanges.map((item, i)=> {
                                    return(
                                        <div key={i}>
                                            {dateFilter && dateFilter === item.code ? <div className='hover:border p-2 flex items-center cursor-pointer' key={i} onClick={()=> handleRemoveDateType()}>
                                                <div>
                                                
                                                <MdRadioButtonChecked size={15} color='#00BDFE'/>
                                                </div>
                                                <div className='ml-2 text-black'>{item.name}</div>
                                            </div>:
                                            <div className='hover:border p-2 flex items-center cursor-pointer' key={i} onClick={()=> handleDateChange(item.code)}>
                                            <div>
                                            
                                                <MdRadioButtonUnchecked color='black' size={15}/></div>
                                            <   div className='ml-2 text-black'>{item.name}</div>
                                            </div>}
                                        </div>
                                    )
                                })}
                            
                            </div>
                        </div>: null}
                        
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    )
}