"use client"

import {useState, useEffect} from 'react' 
import ComponentHeader from '../../components/ComponentHeader';
import {useAdmin} from '../../context/TchebaaAdminContext'
import {useUser} from '../../context/UserContext'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import Link from 'next/link';
import { FaRegCalendarPlus } from "react-icons/fa6";
import { TbCalendarUp } from "react-icons/tb";
import { IoPersonCircleOutline, IoAnalytics } from "react-icons/io5";
import { MdPeopleOutline } from "react-icons/md";
import FooterComponent from '../../components/FooterComponent';





export default function Admin() {

    const t = useTranslations()
    const [pageType, setPageType] = useState<string>(t('administrator'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()



    const admin = admins?.find((admin)=> admin.email === userDetails?.username)
  


  

  return (
    <div>
        <ComponentHeader category='admins' id={''}/>
        <div className='w-full border flex flex-col items-center min-h-screen pt-20'>
            <div className='border w-full flex flex-col items-center max-w-3xl'>
                <Link className='w-full flex flex-col items-center' href={{pathname: '../postEvent', query: {screenName: 'admin', id: null}}} >
                    <div className='flex flex-row items-center jusify-between border w-11/12 max-w-sm my-1 p-2 cursor-pointer'>
                        <div className='text-black w-full font-semibold'>{t('postevent')}</div>
                        <FaRegCalendarPlus name='calendar-plus-o' size={24} color={ "black"}/>
                    </div>
                </Link>
                <Link className='w-full flex flex-col items-center' href={{pathname: '/(tabs)/profile/manageEvents', query: {screenName: 'admin'}}} >
                    <div className='flex flex-row items-center jusify-between border w-11/12 max-w-sm my-1 p-2 cursor-pointer'>
                        <div className='text-black w-full font-semibold'>{t('manageevents')}</div>
                        <TbCalendarUp color='black'  size={25}/>
                    </div>
                </Link>
                <Link className='w-full flex flex-col items-center' href={{pathname: '../pages/allAdmins', query: {screenName: 'admin'}}} >
                    <div className='flex flex-row items-center jusify-between border w-11/12 max-w-sm my-1 p-2 cursor-pointer'>
                        <div className='text-black w-full font-semibold'>{t('alladministrators')}</div>
                        <IoPersonCircleOutline size={24} color={ "black"} />
                    </div>
                </Link>
                <Link className='w-full flex flex-col items-center' href={{pathname: '../pages/analytics', query: {screenName: 'admin'}}}>
                    <div className='flex flex-row items-center jusify-between border w-11/12 max-w-sm my-1 p-2 cursor-pointer'>
                        <div className='text-black w-full font-semibold'>{t('analytics')}</div>
                        <IoAnalytics size={24} color={  "black"} />
                    </div>
                </Link>
                <Link className='w-full flex flex-col items-center' href={{pathname: '../pages/users', query: {screenName: 'admin'}}}>
                    <div className='flex flex-row items-center jusify-between border w-11/12 max-w-sm my-1 p-2 cursor-pointer'>
                        <div className='text-black w-full font-semibold'>{t('users')}</div>
                        <MdPeopleOutline size={24}  color={ "black"} />
                    </div>
                </Link> 
            </div>
        </div>
        <FooterComponent />
    </div>
  );
}