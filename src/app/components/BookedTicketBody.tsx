"use client"

import {useState, useEffect} from 'react'


import moment from 'moment';
import ComponentHeader from './ComponentHeader';
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


 interface EventImage {
    aspectRatio: string;
    url: string;
  }

  interface Location {
    type: string;
    coordinates: number[];
  }

  interface Conversation {
    id: string;
    participants: string[];
    lastMessage: string;
    
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







export default function BookedTicketBody({item}: {item: Ticket}) {

    const t = useTranslations()
    const [pageType, setPageType] = useState<string>(t('users'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    

    const [conversation, setConversation] = useState<Conversation []>([])
    const [loadingConversation,setLoadingConversation] = useState<boolean>(true)
    const [loadingConversationError, setLoadingConversationError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [cancelTicketModal, setCancelTicketModal] = useState<boolean>(false)
    const [createChatModal, setCreateModal] = useState<boolean>(false)
    const [loadingCreateChat, setLoadingCreateChat] = useState<boolean>(false)
    const [createChatError, setCreateChatError] = useState<boolean>(false)



    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

   

    

  
    const handleGetConversation = async () => {

        setLoadingConversation(true)

        try{

            setLoadingConversationError(false)

           

                const { data, errors } = await client.models.Conversation.list({
                    filter: {
                        and:[
                            {
                                participants: {
                                    contains: item.userEmail
                                }
                            },
                            {
                                participants: {
                                    contains: item.organizerEmail
                                }
                            }
                            
                        ]
                    }
                    
                })


                if(data) {


                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setConversation(filtered as Conversation[]);
                    setLoadingConversation(false)
                }

                




        } catch(e) {

            setLoadingConversationError(true)
            setLoadingConversation(false)

        }

    }

    const handleCancelBooking = async () => {
        
    }

    const handleCreateChat = async () => {

        setCreateChatError(false)
        setLoadingCreateChat(true)


        try {

            const { data, errors } = await client.models.Conversation.create({
                participants: [item.userEmail, "tchebaa"],
                lastMessage: ''
            })

            handleGetConversation()


        } catch (e) {

            setCreateChatError(true)
            setLoadingCreateChat(false)

        }

    }



    useEffect(()=> {

        handleGetConversation()

    },[])


  

  return (
    
        <div className='border border-black w-full max-w-sm p-2 m-1'>
      
                
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-black font-semibold'>{t('pricetotal')}</div>
                    <div className='text-black'>{item.eventTotalPrice}</div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-black font-semibold'>{t('ticketnumber')}</div>
                    <div className='text-black'>{item.totalTicketNumber}</div>
                </div>
                {item.adultNumber > 0 ?
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-black font-semibold'>{t('adult')}</div>
                    <div className='text-black'>{item.adultNumber}</div>
                </div>:
                null}
                {item.adolescentNumber > 0 ?
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-black font-semibold'>{t('adolescent')}</div>
                    <div className='text-black'>{item.adolescentNumber}</div>
                </div>:
                null}
                {item.childNumber > 0 ?
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-black font-semibold'>{t('child')}</div>
                    <div className='text-black'>{item.childNumber}</div>
                </div>:
                null}
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-black font-semibold'>{t('eventdate')}</div>
                    <div className='text-black'>{moment(item.eventDate).format('MMMM Do YYYY, h:mm a')}</div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-black font-semibold'>{t('eventenddate')}</div>
                    <div className='text-black'>{moment(item.eventEndDate).format('MMMM Do YYYY, h:mm a')}</div>
                </div>
                <div className='my-1'>{moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}</div>
                {moment(item.eventEndDate).format() > moment(new Date()).format() ?
                 <div className='flex flex-row items-center justify-between'>
                    <div className='border px-1 border-black rounded-md flex items-center justify-center'>
                        <div className='text-black font-semibold'>{t('cancel')}</div>
                        
                    </div>
                    <div>
                    {!loadingConversation ? 
                        <div className='flex flex-row items-center justify-between'>
                            {conversation.length > 0 ? 
                            <div className='border border-black px-1 rounded-md flex items-center justify-center'>
                                <div className='text-black font-semibold'>{t('chat')}</div>
                            </div>:
                            <div className='border border-black px-1 rounded-md flex items-center justify-center'>
                                <div className='text-black font-semibold'>{t('createchat')}</div>
                            </div>}
                        </div>
                        : <div className='text-black font-semibold'>{t('loading')}</div>}
                    </div>
                </div>:
                <div>
                    <div></div>
                    <div className='text-black'>{t('ended')}</div>
                </div>}
            
            
        </div>
        
  );
}