"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image'
import { MdOutlineDashboardCustomize, MdOutlineCalendarMonth, MdPersonAddAlt, MdOutlineNotificationsActive, } from "react-icons/md";

import { GoOrganization } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { GrSchedules } from "react-icons/gr";
import { BsCalendarPlus, BsBookmarkCheck } from "react-icons/bs";
import { FiMessageSquare} from "react-icons/fi";
import { BiMessageRounded, BiSearch } from "react-icons/bi";






export default function ComponentHeader({category, id}: {category: string, id: string | null}) {

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

                    {category === 'Admins' ? 
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
                    {category === 'company'  ?
                    <div  >
                        <GoOrganization size={25} color='black'/>
                        
                    </div>: null}

                </div>
            </div>
        </div>
    )
}