"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image'
import { MdOutlineDashboardCustomize, MdOutlineCalendarMonth, MdPersonAddAlt, MdOutlineNotificationsActive, MdAdminPanelSettings } from "react-icons/md";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ConfirmAccountModal from './ConfirmAccountModal';
import { GoOrganization } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { GrSchedules } from "react-icons/gr";
import { BsCalendarPlus, BsBookmarkCheck } from "react-icons/bs";
import { FiMessageSquare} from "react-icons/fi";
import { BiMessageRounded, BiSearch } from "react-icons/bi";
import { TbCalendarUp } from "react-icons/tb";
import {useTranslations} from 'next-intl';
import {useLikes} from '../context/LikedContext'
import {useUser} from '../context/UserContext'
import { generateClient } from 'aws-amplify/data';
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'
import {Amplify} from 'aws-amplify'
import outputs from '../../../amplify_outputs.json'




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




export default function ComponentHeader({category, id, item}: {category: string, id: string | null, item: Event | null}) {




    const t = useTranslations()
    const {userDetails} = useUser()
    const {likedEvents, handleGetLikedEvents, loadingLikedEvents} = useLikes()
    const [loadingLikeUnlikeEvent, setLoadingLikeUnlikeEvent] = useState<boolean>(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)
    
    const handleLikeEvent = async () => {

      try {

        setLoadingLikeUnlikeEvent(true)

        const likedEvent = await client.models.LikedEvent.create({
                  email: item?.email,
                  eventName: item?.eventName,
                  eventDescription: item?.eventDescription,
                  personType: item?.personType,
                  companyEmail: item?.companyEmail,
                  companyName: item?.companyName,
                  personName: item?.personName,
                  eventMainImage: item?.eventMainImage,
                  eventImage2: item?.eventImage2,
                  eventImage3: item?.eventImage3,
                  eventImage4: item?.eventImage4,
                  dateTimePriceList: item?.dateTimePriceList,
                  eventAddress: item?.eventAddress,
                  ageRestriction: item?.ageRestriction,
                  categories: item?.categories,
                  location: item?.location,
                  eventId: item?.id,
                  sponsored: item?.sponsored,
                  userEmail: userDetails!.username
              
          });

         

          handleGetLikedEvents()

          setLoadingLikeUnlikeEvent(false)

      } catch(e) {


        setLoadingLikeUnlikeEvent(false)

      }

    }


    const handleUnlikeEvent = async (id: string, screenType: string) => {

  

      if(screenType === 'like') {
        try {

          setLoadingLikeUnlikeEvent(true)
  
          const unLikedEvent = await client.models.LikedEvent.delete({ 
                id: id
            });
  
            handleGetLikedEvents()
            setLoadingLikeUnlikeEvent(false)
  
        } catch(e) {
  
          setLoadingLikeUnlikeEvent(false)
  
        }

      } else {

        const newItem = likedEvents!.find((likedItem) => likedItem.eventId === id)

      
      

      try {

        setLoadingLikeUnlikeEvent(true)

        const unLikedEvent = await client.models.LikedEvent.delete({ 
              id: newItem!.id ?? ''
          });

          handleGetLikedEvents()
          setLoadingLikeUnlikeEvent(false)

      } catch(e) {

        setLoadingLikeUnlikeEvent(false)

      }
        

      }

      
    }

   /**
    * 
    * <div className="p-1 flex flex-row justify-between w-full ">
                <div className="z-20">
                    {event.sponsored  ? 
                    <div><SlBadge size={20} color="#FF4D00"/></div>: <div></div>}
                </div>
                {userDetails  ?
                <div>
                    {likedEvents!.findIndex(newItem => newItem.eventId === event.id) > -1 ? 
                    <div className=" rounded-full p-1 bg-white items-center" onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleUnlikeEvent(event.id, screenType)}}><IoMdHeart size={20} color="#ce2029"/></div>:
                    <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                    onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleLikeEvent()}}>
                        <IoMdHeartEmpty color="black" size={20}/>
                    </div>
                    }
                    </div>:
                    <div>
                    
                    <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                    onClick={(e)=> {e.preventDefault(); e.stopPropagation(); setSignUpModal(true)}}>
                        <IoMdHeartEmpty color="black" size={20}/>
                    </div>
                    
                </div>}
            </div>
    */
   

    return(
        <div className='bg-white flex  fixed  w-full flex-col z-40 items-center'>
            <div className=' bg-white border mx-10 items-center justify-center flex-col  w-full max-w-7xl p-2 mt-1  rounded-md flex'>
                <div className='w-full  items-center flex flex-row justify-between'>
                    
                    <div className=''>
                            <Image
                            src="/tchebaa.png"
                            width={30}
                            height={30}
                            alt="Tchebaa logo"
                            />
                        </div>
                    {category === 'Post' ? <BsCalendarPlus color='black' size={20}/> :null}

                    {category === 'dashboardLanding' ? <MdOutlineDashboardCustomize size={25} color='black'/>: null}

                    {category === 'addOrganization'  ?
                    <div  className='flex flex-row '>
                        <GoOrganization size={25} color='black'/>
                        <FaPlus size={15} color='black'/>
                    </div>: null}

                    {category === 'addIndividual' || category === 'individual' ?
                    <div  className=' '>
                        <LuUser size={25} color='black'/>
                    </div>: null}

                    {category === 'Bookings' ?
                    <div><MdOutlineCalendarMonth size={25} color='black' /></div>
                    :null}
                    {category === 'Search' ?
                    <div><BiSearch size={25} color='#00BDFE' /></div>
                    :null}

                    {category === 'Events' ?
                    <div><GrSchedules size={25} color='black' /></div>
                    :null}

                    {category === 'allAdmins' ? 
                    <div><MdPersonAddAlt color='black'  size={25}/></div>
                    :null}
                    {category === 'Message' ? 
                    <div><BiMessageRounded color='black'  size={25}/></div>
                    :null}
                    {category === 'Chats' ? 
                    <div><BiMessageRounded color='black'  size={25}/></div>
                    :null}
                    {category === 'Notifications' ? 
                    <div><MdOutlineNotificationsActive color='black'  size={25}/></div>
                    :null}
                    {category === 'Manage' ? 
                    <div><TbCalendarUp color='black'  size={25}/></div>
                    :null}
                    {category === 'eventBookings' ? 
                    <div className='text-black font-semibold'>{t('bookings')}</div>
                    :null}
                    {category === 'analytics' ? 
                    <div className='text-black font-semibold'>{t('analytics')}</div>
                    :null}
                    {category === 'admins' ? 
                    <div ><MdAdminPanelSettings color='black'  size={30} /></div>
                    :null}
                    {category === 'company'  ?
                    <div  >
                        <GoOrganization size={25} color='black'/>
                        
                    </div>: null}
                    {category === 'oneEvent' ?
                     <div>
                        {userDetails  ?
                        <div>
                            {likedEvents!.findIndex(newItem => newItem.eventId === item?.id) > -1 ? 
                            <div className=" rounded-full p-1 bg-white items-center" onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleUnlikeEvent(item?.id ?? '', 'home')}}><IoMdHeart size={20} color="#ce2029"/></div>:
                            <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                            onClick={(e)=> {e.preventDefault(); e.stopPropagation();  handleLikeEvent()}}>
                                <IoMdHeartEmpty color="black" size={20}/>
                            </div>
                            }
                            </div>:
                            <div>
                            
                            <div className="bg-white p-1 rounded-full items-center hover:bg-gray-300 border border-gray-400 z-20" 
                            onClick={(e)=> {e.preventDefault(); e.stopPropagation(); setSignUpModal(true)}}>
                                <IoMdHeartEmpty color="black" size={20}/>
                            </div>
                            
                        </div>}
                        {
                            loginModal ? 
                            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                            <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal}/>
                            </div>
                            :
                            null
                        }
                        {
                            forgotPasswordModal ? 
                            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                            <ForgotPasswordModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal}/>
                            </div>
                            :
                            null
                        }
                        {
                            confirmationModal ? 
                            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                            <ConfirmAccountModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} />
                            </div>
                            :
                            null
                        }
                        {
                            signUpModal ? 
                            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
                            <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
                            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal}/>
                            </div>
                            :
                            null
                        }
                    </div> : null}  

                </div>
            </div>
        </div>
    )
}