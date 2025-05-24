"use client"


import {useState, useEffect} from 'react'
import moment from 'moment';
import ComponentHeader from '../../components/ComponentHeader';
import {useAdmin} from '../../context/TchebaaAdminContext'
import {useUser} from '../../context/UserContext'
import { generateClient } from 'aws-amplify/data';
import {useRouter, useSearchParams} from 'next/navigation';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import Link from 'next/link';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import { IoPersonCircleOutline, IoAnalytics } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaRegClock, FaRegPlusSquare, FaRegEdit   } from "react-icons/fa";



Amplify.configure(outputs)

const client = generateClient<Schema>();


interface User {
    id: string;
    email: string;
    postEventLimit: number;
    createdAt: string;
    name: string;
    pushNotificationToken: string;
    pushNotificationEnabled: boolean;
  }


  interface Conversation {
    id: string;
    participants: string [];
    lastMessage: string;
    createdAt: string;
    updatedAt: string;
  }






export default function oneUser() {

    const t = useTranslations()
    const [pageType, setPageType] = useState<string>(t('user'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    const searchParams = useSearchParams()

    const screenName = searchParams.get('screenName')
    const id = searchParams.get('id')
    const email = searchParams.get('email')


    
    

    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoadingUser] = useState<boolean>(true)
    const [loadingUserError, setLoadingUserError] = useState<boolean>(false)
    const [updateLimitModal, setUpdateLimitModal] = useState<boolean>(false)
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [loadingUpdateError, setLoadingUpdateError] = useState<boolean>(false)
    const [postLimit, setPostLimit] = useState<number>(0)
    const [conversation, setConversation] = useState<Conversation []>([])
    const [loadingConversation, setLoadingConversation] = useState<boolean>(true)
    const [loadingConversationError, setLoadingConversationError] = useState<boolean>(true)
    const [createChatModal, setCreateModal] = useState<boolean>(false)
    const [loadingCreateChat, setLoadingCreateChat] = useState<boolean>(false)
    const [createChatError, setCreateChatError] = useState<boolean>(false)


    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

    const [startDate, setStartDate] = useState<string>(moment(new Date()).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [dateFilterCode, setDateFilterCode] = useState<string>('all')

   
    

  
    const handleGetUser = async () => {

        setLoadingUser(true)

        try{

            setLoadingUserError(false)

            const { data, errors } = await client.models.User.get({
                id: id!,
              });

              if(data) {

                 setUser(data as User)

            setLoadingUser(false)

              }

              


        } catch(e) {

            setLoadingUserError(true)

        }

    }


    const handleUpdateUser = async () => {

        setLoadingUpdate(true)


        try{

            setLoadingUpdateError(false)

            const { data, errors } = await client.models.User.update({
                id: id!,
                postEventLimit: Number(postLimit)
              });


            

            setLoadingUpdate(false)
            handleGetUser()
            setUpdateLimitModal(false)


        } catch(e) {

            setLoadingUpdateError(true)
            setLoadingUpdate(false)

        }

    }


    const handleGetConversation = async () => {

        setLoadingConversation(true)
    

        try{

            setLoadingConversationError(false)

            const { data, errors } = await client.models.Conversation.list({
                filter: {
                    and:[
                        {
                            participants: {
                                contains: email!
                            }
                        },
                        {
                            participants: {
                                contains: 'tchebaa'
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

            
            

        } catch (e) {

            setLoadingConversation(false)
            setLoadingConversationError(true)

        }

    }


    const handleCreateChat = async () => {

        setCreateChatError(false)
        setLoadingCreateChat(true)


        try {

            const { data, errors } = await client.models.Conversation.create({
                participants: [email, "tchebaa"],
                lastMessage: ''
            })

            handleGetConversation()


        } catch (e) {

            setCreateChatError(true)
            setLoadingCreateChat(false)

        }

    }


    useEffect(()=> {

       handleGetUser()

    },[])


    useEffect(()=> {

        handleGetConversation()

    },[])





  

  return (
    <div className='flex flex-col items-center w-full'>
        <ComponentHeader category='user' id={''}/>
            <div className='w-full flex flex-col items-center min-h-screen pt-20 border max-w-7xl'>
                <div>
                    <IoPersonCircleOutline size={40} color={ "black"} />
                    
                </div>
                {updateLimitModal ? 
                <div className='absolute bg-white border w-11/12 max-w-sm flex flex-col items-center p-5'>
                    {loadingUpdate ? 
                    <div className='absolute border flex flex-col items-center w-11/12 bg-white p-3'>
                        <div className='text-black font-semibold'>{t('updating')}</div>
                    </div>: null}
                    <div className='w-full items-center flex flex-row justify-between'>
                        <div></div>
                        <div  onClick={()=> setUpdateLimitModal(false)}><MdClose size={24} color={"black"}  /></div>
                    </div>
                
                    <input className='border p-1 mt-2' value={JSON.stringify(postLimit)} type='number' onChange={(e)=> setPostLimit(Number(e.target.value))} placeholder={JSON.stringify(postLimit)}/>
                    <div className='border flex mt-2 w-11/12 flex-col items-center mt-5 py-1 rounded-md border-cyan-500 cursor-pointer' onClick={()=> handleUpdateUser()}>
                        <div className='text-black font-semibold'>{t('update')}</div>
                    </div>
                </div>: null}
                <div className='text-black font-semibold mt-2'>{email}</div>
                {!loadingUser ? 
                <div className='w-full flex flex-col items-center'>
                
                        <div className='flex flex-row items-center mt-2'>
                            <div className='text-black'>{t('eventpostlimit')}:</div>
                            <div>
                                <div className='text-black ml-1'>{user?.postEventLimit}</div>
                            </div>
                            <div className='ml-1' onClick={()=> setUpdateLimitModal(true)}>
                                <FaRegEdit size={20} color={'#1184e8'} />
                            </div>
                        </div>
                        <div className='border flex flex-col items-center justify-center w-11/12 max-w-xs mt-2 p-1 rounded-md' >
                            <Link href={{pathname: '../pages/analytics', query: {screenName:"user", email: email}}}>
                                <div>
                                    <div className='text-black font-semibold'>{t('onlineimpressions')}</div>
                                </div>
                            </Link>
                            
                        </div>
                        <div  className='border flex flex-col items-center justify-center w-11/12 max-w-xs mt-2 p-1 rounded-md'>
                            <Link href={{pathname: '../pages/eventAnalytics', query: {screenName:"user", email: email}}}>
                                <div>
                                    <div className='text-black font-semibold'>{t('eventsviewed')}</div>
                                </div>
                            </Link>
                            
                        </div>
                        
                    {!loadingConversation ?
                        <div className='w-full flex flex-col items-center'>
                            
                            {conversation.length > 0 ? 
                            <Link className='border flex flex-col items-center justify-center w-11/12 max-w-xs mt-2 p-1 rounded-md' href={{pathname: '/(tabs)/profile/chats', query: {screenName:"tchebaa", email: email, conversationId: conversation[0].id}}}>
                                <div className='w-full flex flex-col items-center'>
                                    <div className='text-black font-semibold'>{t('chat')}</div>
                                </div>
                            </Link>:
                            <div className='border flex flex-col items-center justify-center w-11/12 max-w-xs mt-2 p-1 rounded-md'>
                                {loadingCreateChat ? 
                                <div className='text-black font-semibold'>{t('loading')}</div>
                                :
                                <div onClick={()=> handleCreateChat()}>
                                    <div className='text-black font-semibold'>{t('createchat')}</div>
                                </div>}
                            </div>}
                            
                        </div>: null}
                    <div>
                    
                </div>
            </div>
            : <div className='text-black font-semibold'>{t('loading')}</div>}
            </div>
        
        
    </div>
  );
}