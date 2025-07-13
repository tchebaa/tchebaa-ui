"use client"

import {useEffect, useState} from 'react'
import Image from "next/image";
import {useTranslations} from 'next-intl';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Header from "./components/Header";
import SearchModal from './components/SearchModal';
import FooterComponent from './components/FooterComponent';
import HomeHeroComponent from './components/HomeHeroComponent';
import EventCategories from './components/EventCategories';
import LocationDateComponent from './components/LocationDateComponent';
import {useLocation} from './context/LocationContext'
import {useDate} from './context/DateContext'
import {useUser} from './context/UserContext'
import moment from 'moment';
import { generateClient } from 'aws-amplify/data';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import {type Schema} from '../../tchebaa-backend/amplify/data/resource'
import {Amplify} from 'aws-amplify'
import ForgotPasswordModal from './components/ForgotPasswordModal';
import HomeNearEvents from './components/HomeNearEvents';
import { MdLocationOn } from "react-icons/md";
import outputs from '../../amplify_outputs.json';
import {signIn, getCurrentUser} from '@aws-amplify/auth';
import ConfirmAccountModal from './components/ConfirmAccountModal';



Amplify.configure(outputs)


const client = generateClient<Schema>({
  authMode: 'apiKey',
});

const heroImages = [
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion9.png?alt=media&token=dcdcaf03-d213-4c5b-a4b7-52cd37cb558b',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion8.png?alt=media&token=0559c698-035d-412b-9687-8f961c39b69f',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion7.png?alt=media&token=5ec2748a-5311-4ada-b3a6-5cb1f6859611',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion6.png?alt=media&token=b2d31fcc-f3f4-4a1c-9b95-b45316192bd3',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion5.png?alt=media&token=05aedc60-e0c5-4a98-b807-debfd0388c62',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion4.png?alt=media&token=d38b737b-fdd8-4034-84c4-253a40fe864d',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion11.png?alt=media&token=2b514675-4a19-44a0-ac62-6c84ffa16a95',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion10.png?alt=media&token=963ae009-cf0c-4ecd-a2f3-fe5e59d217cc',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion1-min.png?alt=media&token=482e9003-2f8b-4a81-a94b-e8ea45783ec7',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion14.png?alt=media&token=260caada-2930-4ad5-9213-f3cde33bf004',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion15.png?alt=media&token=a63c9238-755c-47ac-9d8d-271a9528b6d1',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion16.png?alt=media&token=c692f9f8-e084-4062-a005-0732fdcfb10e',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion17.png?alt=media&token=861a7fa5-0a28-49c5-aefe-e49e9af02574',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion18.png?alt=media&token=aa57eb71-88ba-493d-b38b-d10f455c95be',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion19.png?alt=media&token=056fa70b-8966-4783-aac9-3a5f10850a21',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion20.png?alt=media&token=fa985924-72ff-45fb-9b51-a987c3f16a63',
  'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion21.png?alt=media&token=ba151e1f-efe7-480b-a680-38f2713ffdcd'
]




export default function Home() {

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
    id: string;
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





  const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation();
  const {userDetails, setUserDetails} = useUser()
  const {startDate, setStartDate, endDate, setEndDate} = useDate()

  const [loadParticles, setLoadParticles] = useState(true) 
  const [headerPage, setHeaderPage] = useState<string>('home')
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false)
  const [menuModalVisible, setMenuModalVisible] = useState(false)


  const [loginModal, setLoginModal] = useState<boolean>(false)
  const [signUpModal, setSignUpModal] = useState<boolean>(false)
  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false)

  const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
  const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')
  const [events, setEvents] = useState<Event []>([])
  const [dateFilter, setDateFilter] = useState<string>('all')



  const t = useTranslations();
  const router = useRouter();


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
  
              setStartDate?.(moment(new Date()).format().toString())
              setEndDate?.('')
          }
      
          if(code === 'today'){
  
              setDateFilter('today')
  
              setStartDate?.(moment(new Date()).startOf('day').format().toString())
              setEndDate?.(moment(new Date()).endOf('day').format().toString())
      
             // console.log(moment(new Date()).startOf('day').format())
      
             // console.log(moment(new Date).endOf('day').format())
              
      
          }
      
          if(code === 'tomorrow'){
  
              setDateFilter('tomorrow')
  
              setStartDate?.(moment(new Date()).endOf('day').format().toString())
              setEndDate?.(moment(new Date()).add(1, 'days').endOf('day').format().toString())
              
              
          }
          if(code === 'thisweek'){
      
              setDateFilter('thisweek')
  
              setStartDate?.(moment(new Date()).startOf('isoWeek').format().toString())
              setEndDate?.(moment(new Date()).endOf('isoWeek').format().toString())
              
              
          }
          if(code === 'thisweekend'){
  
              setDateFilter('thisweekend')
  
              setStartDate?.(moment(new Date()).endOf('isoWeek').subtract(2, 'days').format().toString())
              setEndDate?.(moment(new Date()).endOf('isoWeek').format().toString())
              
          }
      
          if(code === 'nextweek'){
  
              setDateFilter('nextweek')
  
  
              setStartDate?.(moment(new Date()).add(1, 'week').startOf('isoWeek').format().toString())
              setEndDate?.(moment(new Date()).add(1, 'week').endOf('isoWeek').format().toString())
      
              
          }
          if(code === 'thismonth'){
  
              setDateFilter('thismonth')
  
              setStartDate?.(moment(new Date()).startOf('month').format())
              setEndDate?.(moment(new Date()).endOf('month').format())
          }
      
          if(code === 'nextmonth'){
  
              setDateFilter('nextmonth')
  
              setStartDate?.(moment(new Date()).add(1, 'month').startOf('month').format())
              setEndDate?.(moment(new Date()).add(1, 'month').endOf('month').format())
              
          }
      }


    const handleGetEvents = async () => {

      try {

          setErrorLoadingEvents('')
          setLoadingEvents(true)
  
          const { data, errors } = await client.queries.searchEventsWithFilter({
  
                 
          startDate: startDate,
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude
              
          });

          

          if(data) {

           

            const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
            setEvents(filtered as Event[]);
          }

          
          setLoadingEvents(false)
          

          
          


      } catch(e) {

        console.log(e, 'error')

         // setErrorLoadingEvents(e.message)
          

      }


  }

   const checkCurrentUser = async () => {
  
  
  
        try{
  
          const { username, userId, signInDetails } = await getCurrentUser();
  
          
  
        
  
        if(userId) {
  
          
  
          setUserDetails({username: signInDetails?.loginId ?? '', userId: userId})
          
  
        }
  
        } catch (e) {
          
        }
        
  
  
      }
  
    
  
  
      useEffect(()=> {
  
       checkCurrentUser()
  
      
      },[loginModal])
  

  const handleGetEventsTest = async () => {

    try{

      
          setErrorLoadingEvents('')
          setLoadingEvents(true)
  
          const { data, errors } = await client.models.Event.list({
                limit: 20
              
          });

          

          if(data) {

            const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
            setEvents(filtered as Event[]);

            setLoadingEvents(false)
          }

          
          

    } catch(e) {

       const error = e as Error;

        if(error.message) {

        setErrorLoadingEvents(error.message)
        setLoadingEvents(false)

        }
      

    }


  }


  useEffect(()=> {

      handleGetEvents()


    

  },[userLocation, startDate, endDate])


 

  

  return (
    <div className="">
      <main className="flex min-h-screen  bg-white flex-col items-center  ">
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}  />
        {searchModalVisible ? <SearchModal headerPage={headerPage} setMenuModalVisible={setMenuModalVisible} setSearchModalVisible={setSearchModalVisible} /> : null}
        <HomeHeroComponent heroImages={heroImages} />
        <LocationDateComponent/>
        {userAddress ? 
        <div className=' w-11/12 max-w-6xl mt-5 flex flex-row items-center'>
          <div><MdLocationOn size={20} color='#00BDFE' /></div>
          <div className='text-black font-semibold ml-2'>{userAddress}</div>
        </div>
        : null}
        <EventCategories />
        <div className='mt-5 flex flex-row overflow-x-scroll  w-11/12 max-w-6xl'>
              {dayRanges.map((item, i)=> {
                  return(
                      <div key={i} className='flex items-center justify-center'>
                          {dateFilter === item.code ? 
                          <div className='w-full mx-1 border-2 px-2 whitespace-nowrap rounded-md mx-1 cursor-pointer border-cyan-500 text-black font-semibold' onClick={()=> handleDateChange(item.code)}>
                              {item.name}</div>
                              : 
                          <div className='w-full mx-1 border border-gray-400 hover:border-black px-2 whitespace-nowrap rounded-md hover:font-semibold mx-1 cursor-pointer text-black' onClick={()=> handleDateChange(item.code)}>{item.name}</div> }
                      </div>
                  )
              })}
          </div>
        <HomeNearEvents componentType={'home'} events={events} loadingEvents={loadingEvents} loginModal={loginModal} signUpModal={signUpModal} setLoginModal={setLoginModal} setSignUpModal={setSignUpModal}/>
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
       
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       <FooterComponent/>
       
      
      </footer>
    </div>
  );
}
