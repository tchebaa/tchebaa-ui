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
import moment from 'moment';
import {useLocation} from './context/LocationContext'
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../tchebaa-backend/amplify/data/resource'



const client = generateClient<Schema>();

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
    eventName: string;
    eventDescription: string;
    email: string;
    place: boolean;
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


  const [loadParticles, setLoadParticles] = useState(true) 
  const [headerPage, setHeaderPage] = useState<string>('home')
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false)
  const [menuModalVisible, setMenuModalVisible] = useState(false)


  const [homeEvents, setHomeEvents] = useState([])
  const [loadingHomeEvents, setLoadingHomeEvents] = useState(true)
  const [pageNumber, setPageNumber] = useState(0)


  const [homeSponsoredEvents, setHomeSponsoredEvents] = useState([])
  const [loadingHomeSponsoredEvents, setLoadingHomeSponsoredEvents] = useState(true)

  const [homeOrganizers, setHomeOrganizers] = useState([])
  const [loadingHomeOrganizers, setLoadingHomeOrganizers] = useState(true)

  const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
  const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')
  const [events, setEvents] = useState<Event []>([])
  const [startDate, setStartDate] = useState<string>(moment(new Date()).format().toString())


  const t = useTranslations();
  const router = useRouter();
  const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation();
  
   const handleChangeLanguage = () => {
  
    
  
      Cookies.set('NEXT_LOCALE', 'en')

      console.log('chnaged')
      router.refresh();
  
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

         // setErrorLoadingEvents(e.message)
          

      }


  }


 

  

  return (
    <div className="">
      <main className="flex min-h-screen  bg-white flex-col items-center  ">
        <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible}  />
        <HomeHeroComponent heroImages={heroImages} />
        <LocationDateComponent/>
        <EventCategories />
        
        
       
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       <FooterComponent/>
       
      
      </footer>
    </div>
  );
}
