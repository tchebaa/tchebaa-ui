"use client"

import {useState, useEffect} from 'react'
import EventTicketBody from '../../components/EventTicketBody';
import { uploadData, getUrl } from '@aws-amplify/storage';
import {useUser} from '../../context/UserContext'
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {useRouter, useSearchParams} from 'next/navigation';

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


export default function TicketsScreen() {


    const t = useTranslations()
    const {userDetails} = useUser()

    const [eventTickets, setEventTickets] = useState<EventTicket []>([])
    const [loadingEventTickets, setLoadingEventTickets] = useState<boolean>(true)
    const [loadingEventTicketsError, setLoadingEventTicketsError] = useState<string>('')


    //userDetails?.username

    const handleGetBookedEvents = async () => {

        try {

            setLoadingEventTickets(true)
            setLoadingEventTicketsError('')
      
            const { data, errors } = await client.models.EventTicket.list({
                filter: {
                userEmail: {
                  beginsWith: userDetails?.username
                }
              }
            }
            );

            if(data) {

                const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                setEventTickets(filtered as EventTicket[]);
                setLoadingEventTickets(false)

              }
      
       
            
      
            
      
          } catch(e) {

            const error = e as Error;

            if(error) {

            setLoadingEventTicketsError(error.message)
            setLoadingEventTickets(false)

            }
      
            
      
          }

    }


    useEffect(()=> {

        handleGetBookedEvents()

    },[])



  return (
    <div>
        <div className='w-full flex items-center border flex-col min-h-screen'>
            
            
            {loadingEventTickets ? 
            <div>
                <div className='text-black font-semibold'>{t('loading')}</div>
            </div>
            :<div className='w-full flex flex-col items-center'>
                {eventTickets.length > 0 ? 
                <div className='flex flex-col md:flex-row flex-wrap w-11/12  max-w-7xl  items-center md:items-start '>
                    {eventTickets.map((item, i)=> {
                        return(
                            <div className='w-full h-full flex flex-col items-center' key={i}>
                            <EventTicketBody item={item} screenType="tickets" />
                            </div>
                        )
                    })}
                </div>
                    :
                    <div>
                        <div>{t('noboookedevents')}</div>
                    </div>}
            </div>}
            {loadingEventTicketsError ? <div><div className='text-red-500'>{loadingEventTicketsError}</div></div>: null}
        </div>
    </div>
  );
}
