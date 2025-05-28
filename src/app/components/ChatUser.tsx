"use client"

import {useEffect, useState} from 'react'

import { BsPersonCircle, BsCalendarPlus} from "react-icons/bs";

import Link from 'next/link';
import moment from 'moment';


export default function ChatUser({item}: {item: {lastMessage: string, participants: string[], updatedAt: string, id: string}}) {



    return(
        <Link className='w-full flex items-center cursor-pointer flex-row border border-black mt-2 p-2' href={{pathname: '/(tabs)/profile/chats', query: {conversationId: item.id, screenName: "user"}}} passHref>
            <div className='p-2 text-cyan-500'>
                <BsPersonCircle className='text-cyan-500' size={30}/>
            </div>
            <div className=' ml-3'>
                <div className='text-black  font-medium'>Participant</div>
                <div className='text-sm  text-gray-400'>{item.lastMessage}</div>
            </div>
            
        </Link>
    )
}