"use client"

import {useState, useEffect} from 'react'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import moment from 'moment';
import {useUser} from '../../context/UserContext'
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import ComponentHeader from '../../components/ComponentHeader';
import BookedTicketBody from '../../components/BookedTicketBody';
import FooterComponent from '../../components/FooterComponent';


Amplify.configure(outputs)

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

 interface EventImage {
    aspectRatio: string;
    url: string;
  }

  interface Location {
    type: string;
    coordinates: number[];
  }

interface Ticket {
    id: string;
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
    ageRestriction: string[];
    ticketsStatus: string;
    refunded: boolean;
    location: Location;
    createdAt: string;
  }






export default function EventBookings() {

    const {userDetails} = useUser()
    const t = useTranslations()

    const searchParams = useSearchParams()
    const eventId = searchParams.get('eventId')
    const eventName = searchParams.get('eventName')
    const eventAddress = searchParams.get('eventAddress')

    const [pageType, setPageType] = useState<string>(t('bookings'))
    const [bookings, setBookings] = useState<Ticket []>([])
    const [loadingBookings, setLoadingBookings] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string>('')
    const [deletedItem, setDeletedItem] = useState<string>('')

    const [startDate, setStartDate] = useState<string>(moment(new Date).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [dateFilterCode, setDateFilterCode] = useState<string>('all')



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
                name: t('thisyear'),
                code: 'thisyear'
            },
            {
                name: t('yesterday'),
                code: 'yesterday'
            },
            {
                name: t('thisweek'),
                code: 'thisweek'
            },
            {
                name: t('lastweek'),
                code: 'lastweek'
            },
            {
                name: t('thismonth'),
                code: 'thismonth'
            },
            {
                name: t('lastmonth'),
                code: 'lastmonth'
            },
            
        ]
    
        const handleDateChange = (code: string) => {
                    
                //setDayType(code)
            
                if(code === 'all') {
        
                    setDateFilterCode('all')
        
                    setStartDate(moment(new Date).format().toString())
                    setEndDate('')
                }
            
                if(code === 'today'){
        
                    setDateFilterCode('today')
        
                    setStartDate(moment(new Date()).startOf('day').format().toString())
                    setEndDate(moment(new Date()).endOf('day').format().toString())
            
                   // console.log(moment(new Date()).startOf('day').format())
            
                   // console.log(moment(new Date).endOf('day').format())
                    
            
                }
    
                if(code === 'thisyear'){
        
                    setDateFilterCode('thisyear')
        
                    setStartDate(moment(new Date()).startOf('year').format().toString())
                    setEndDate(moment(new Date()).endOf('year').format().toString())
            
                   // console.log(moment(new Date()).startOf('day').format())
            
                   // console.log(moment(new Date).endOf('day').format())
                    
            
                }
    
                if(code === 'yesterday'){
        
                    setDateFilterCode('yesterday')
        
                    setStartDate(moment(new Date()).subtract(1, 'days').startOf('day').format().toString())
                    setEndDate(moment(new Date()).startOf('day').format().toString())
            
                   // console.log(moment(new Date()).startOf('day').format())
            
                   // console.log(moment(new Date).endOf('day').format())
                    
            
                }
            
                if(code === 'tomorrow'){
        
                    setDateFilterCode('tomorrow')
        
                    setStartDate(moment(new Date()).endOf('day').format().toString())
                    setEndDate(moment(new Date()).add(1, 'days').endOf('day').format().toString())
                    
                    
                }
                if(code === 'thisweek'){
            
                    setDateFilterCode('thisweek')
        
                    setStartDate(moment(new Date()).startOf('isoWeek').format().toString())
                    setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                    
                    
                }
    
                if(code === 'lastweek'){
            
                    setDateFilterCode('lastweek')
        
                    setStartDate(moment(new Date()).subtract(1, 'weeks').startOf('isoWeek').format().toString())
                    setEndDate(moment(new Date()).startOf('isoWeek').format().toString())
                    
                    
                }
    
                if(code === 'thisweekend'){
        
                    setDateFilterCode('thisweekend')
        
                    setStartDate(moment(new Date()).endOf('isoWeek').subtract(2, 'days').format().toString())
                    setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                    
                }
            
                if(code === 'nextweek'){
        
                    setDateFilterCode('nextweek')
        
        
                    setStartDate(moment(new Date()).add(1, 'week').startOf('isoWeek').format().toString())
                    setEndDate(moment(new Date()).add(1, 'week').endOf('isoWeek').format().toString())
            
                    
                }
                if(code === 'thismonth'){
        
                    setDateFilterCode('thismonth')
        
                    setStartDate(moment(new Date()).startOf('month').format())
                    setEndDate(moment(new Date()).endOf('month').format())
                }
                if(code === 'lastmonth'){
        
                    setDateFilterCode('lastmonth')
        
                    setStartDate(moment(new Date()).subtract(1, "months").startOf('month').format())
                    setEndDate(moment(new Date()).startOf('month').format())
                }
            
                if(code === 'nextmonth'){
        
                    setDateFilterCode('nextmonth')
        
                    setStartDate(moment(new Date()).add(1, 'month').startOf('month').format())
                    setEndDate(moment(new Date()).add(1, 'month').endOf('month').format())
                    
                }
            }
    


    const handleGetBookings = async () => {

        try {

            setLoadingError('')
            setLoadingBookings(true)


            if(dateFilterCode === 'all') {

              const { data, errors } = await client.models.EventTicket.list({

                filter: {
                  eventId: {
                    beginsWith: eventId!
                  }
                }
              });


              if(data) {

                const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                setBookings(filtered as Ticket[]);
                setLoadingBookings(false)

              }


              


            } else {

              const { data, errors } = await client.models.EventTicket.list({

                filter:{
                  and: [
                  {
                    eventId: {
                      beginsWith: eventId!
                    },
                  },
                  {
                      createdAt: { gt: startDate}
                  },
                  {
                      createdAt: { lt: endDate}
                  }  

                  ]
                }
                

                
              });


              if(data) {

                const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                setBookings(filtered as Ticket[]);
                setLoadingBookings(false)

              }


            }

            


        } catch (e) {

            const error = e as Error;

            if(error) {

            setLoadingError(error?.message)
            setLoadingBookings(false)

            }
            

        }

        

    }


    useEffect(()=> {

     handleGetBookings()
     
    },[dateFilterCode])




  return (
    <div className=' flex items-center flex-col'>
        
            <ComponentHeader category='eventBookings' id={''} item={null}/>
            <div className='w-full flex items-center border flex-col min-h-screen'>
                <div className='mt-20 w-11/12 max-w-3xl'>
                    <div className='text-black font-semibold text-2xl'>{eventName}</div>
                    <div className='text-black font-semibold mt-2'>{eventAddress}</div>
                </div>
                <div className='w-full max-w-3xl'>
                    <div className='mt-2 flex flex-row overflow-x-scroll   w-11/12'>
                        {dayRanges.map((item, i)=> {
                            return(
                                <div  key={i} className='flex items-center justify-center'>
                            
                                        {dateFilterCode === item.code ? 
                                        <div className='w-full mx-1 border-2 px-2 whitespace-nowrap rounded-md mx-1 cursor-pointer border-cyan-500 text-black font-semibold' onClick={()=> handleDateChange(item.code)}>{item.name}</div>
                                        : 
                                        <div className='w-full mx-1 border px-2 hover:font-semibold border-gray-400 hover:border-black whitespace-nowrap rounded-md mx-1 cursor-pointer text-black' onClick={()=> handleDateChange(item.code)}>{item.name}</div> }
                                
                                </div>
                                
                            )
                        })}
                    </div>
                </div>
                
                    <div  className='mt-2 w-11/12 max-w-3xl flex flex-row justify-between'>
                        <div className='text-black font-semibold'>{t('total')}:</div>
                        <div >{bookings.length}</div>
                    </div>
                    
                <div className='w-full flex flex-col items-center'>
                {loadingBookings ? 
                <div className='text-black font-semibold'>
                {t('loading')}
                </div>:
                <div className='w-full flex flex-col items-center'>
                
                    {bookings.length > 0 ?
                    <div className='flex flex-col md:flex-row flex-wrap w-11/12  max-w-7xl  items-center md:items-start '>
                        {bookings.map((item, i)=> {
                        return(
                            <BookedTicketBody key={i} item={item} />
                        )
                        })}
                    </div>
                        :
                    <div><div className='text-black font-semibold'>{t('nobookedevents')}</div></div>}
        
                </div>
                }
            </div>
          </div>
          <FooterComponent />
        
        
    </div>
  );
}