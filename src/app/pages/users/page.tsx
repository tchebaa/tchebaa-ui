"use client"

import {useState, useEffect} from 'react'

import moment from 'moment';
import ComponentHeader from '../../components/ComponentHeader';
import {useAdmin} from '../../context/TchebaaAdminContext'
import {useUser} from '../../context/UserContext'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {useRouter, useSearchParams} from 'next/navigation';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import Link from 'next/link';

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






export default function Users() {

    const t = useTranslations()
    const [pageType, setPageType] = useState<string>(t('users'))
    const {admins} = useAdmin()
    const {userDetails} = useUser()
    

    const [users, setUsers] = useState<User []>([])
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
    const [loadingUsersError, setLoadingUsersError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')


    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

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
    
                setDateFilterCode('all')
    
                setStartDate(moment(new Date()).format().toString())
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
    
    

  
    const handleGetUsers = async () => {

        setLoadingUsers(true)

        try{

            setLoadingUsersError(false)

            if(dateFilterCode === 'all') {

                const { data, errors } = await client.models.User.list({
                    
                })

                if(data) {

                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setUsers(filtered as User[]);
                    setLoadingUsers(false)
                  
                    }

                

            } else {

                const { data, errors } = await client.models.User.list({
                    filter: {
                        and:[
                            {
                                createdAt: { gt: startDate}
                            },
                            {
                                createdAt: { lt: endDate}
                            }
                            
                        ]
                    }
                })

                if(data) {

                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setUsers(filtered as User[]);
                    setLoadingUsers(false)
                  
                    }

            

                

            }

           




        } catch(e) {

            setLoadingUsersError(true)

        }

    }

    const handleSearchUsers = async () => {
    
        try {

            setLoadingUsers(true)

            const { data, errors } = await client.models.User.list({
                    filter: {
                        email: {
                            beginsWith: searchTerm
                        }
                    }
            })

            if(data) {

            const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
            setUsers(filtered as User[]);
            setLoadingUsers(false)
                  
             }
            
            
  

        } catch(e) {

            setLoadingUsersError(true)
           

        }

        
    }



    useEffect(()=> {

        handleGetUsers()

    },[dateFilterCode])


  

  return (
    <div className='flex flex-col items-center w-full'>
        <ComponentHeader category='users' id={''} item={null}/>
        <div className='w-full flex flex-col items-center min-h-screen pt-20 border max-w-7xl'>
        <div className='w-11/12'>
            <div className='text-black font-semibold text-lg'>{t('users')}</div>
        </div> 
            <div className='mt-2 flex flex-row overflow-x-scroll  w-11/12'>
                {dayRanges.map((item, i)=> {
                    return(
                        <div key={i} className='flex items-center justify-center'>
                            {dateFilterCode === item.code ? 
                            <div className='w-full mx-1 border-2 px-2 whitespace-nowrap rounded-md mx-1 cursor-pointer border-cyan-500 text-black font-semibold' onClick={()=> handleDateChange(item.code)}>
                                {item.name}</div>
                                : 
                            <div className='w-full mx-1 border px-2 whitespace-nowrap hover:font-semibold border-gray-400 hover:border-black rounded-md mx-1 cursor-pointer text-black' onClick={()=> handleDateChange(item.code)}>{item.name}</div> }
                        </div>
                        
                    )
                })}
            </div>

          
            <div className='mt-2 max-w-sm flex flex-row items-center border justify-center w-11/12'>
                <input className=' p-2 w-full text-black'  placeholder={t('search')} value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
                <div  className="px-1" onClick={()=> handleSearchUsers()}>

                    <BiSearch size={24}  color={'#1184e8'} />
                </div>
            </div> 
            
        
        {!loadingUsers ? 
        <div className='w-full mt-2 flex flex-col items-center'>
            <div className='w-11/12 flex flex-row items-center justify-between '>
                <div></div>
                <div className='flex flex-row'>
                    <div className='text-black font-semibold mr-1'>{t('total')}:</div>
                    <div className='text-black'>{users.length}</div>
                </div>
            </div>
            <div className='w-full flex items-center flex-col'>
                {users.length > 0 ? 
                <div className='flex flex-col md:flex-row flex-wrap w-full max-w-7xl  items-center md:items-start '>
                    {users.map((item, i)=> {
                        return(
                            
                                <Link key={i} className='border w-full max-w-xs md:m-2 p-5 my-1 cursor-pointer' href={{ pathname: '../pages/oneUserPage', query: {id: item.id, email: item.email}}}>
                                    <div>
                                        <div className='font-semibold text-black'>{item.email}</div>
                                        <div className='text-black'>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                    </div>
                                </Link>
                                
                            
                        )
                    })}
                </div>:
                <div></div>}
            </div>
        </div>
        : <div className='text-black font-semibold'>{t('loading')}</div>}
        </div>
    
        
    </div>
  );
}