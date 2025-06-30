"use client"

import {useState, useEffect} from 'react'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import moment from 'moment';
import {useUser} from '../../context/UserContext'
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import EventManageBody from '../../components/EventManageBody';
import FooterComponent from '../../components/FooterComponent';
import ComponentHeader from '../../components/ComponentHeader';
//icons
import { PiMicrophoneStageBold, PiMaskHappyLight, PiStethoscope, PiPlantBold, PiPottedPlantBold, PiHandCoinsBold, PiHandHeartFill } from "react-icons/pi";
import { FaMusic, FaHandsHelping, FaHospitalSymbol, FaLaptop} from "react-icons/fa"
import { BsFillMoonFill, BsTree, BsBuildingGear, BsPlug, BsCameraReels, BsGraphUp } from "react-icons/bs";
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineMovie, MdMedication, MdClose, MdFilterList} from "react-icons/md";
import {GiGraduateCap, GiCeremonialMask, GiWeightLiftingUp,GiGrassMushroom, GiMountainClimbing, GiLaptop, GiAutoRepair, GiHealthCapsule, GiMusicalNotes, GiPlantRoots, GiCorn, GiSugarCane, GiWheat  } from "react-icons/gi";
import { BiSolidCamera, BiPaint, BiBriefcase, BiRun, BiSearch} from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { GrRun } from "react-icons/gr";
import { SiSafari, SiGofundme } from "react-icons/si";
import { IoWineOutline, IoBriefcase} from "react-icons/io5";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaPersonPraying, FaHandsPraying, FaLaptopCode,  FaTree, FaGears } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";


Amplify.configure(outputs)

const client = generateClient<Schema>({
  authMode: 'apiKey',
});







export default function ManageEvents() {

    const {userDetails} = useUser()
    const t = useTranslations()
    const searchParams = useSearchParams()

    const screenName = searchParams.get('screenName')
   

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



    

    const [pageType, setPageType] = useState<string>(t('manage'))
    const [events, setEvents] = useState<Event []>([])
    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<string>('')
    const [deletedItem, setDeletedItem] = useState<string>('')

    const [selectedCategories, setSelectedCategories] = useState<string []>([])
    const [openLocationComponent, setOpenLocationComponent] = useState<boolean>(false)
    const [filterModal, setFilterModal] = useState<boolean>(false)
    const [dateFilterCode, setDateFilter] = useState<string>('all')

    
    
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [startDate, setStartDate] = useState<string>(moment(new Date).format().toString())
    const [endDate, setEndDate] = useState<string>('')
    const [errorLoadingEvents, setErrorLoadingEvents] = useState<string>('')


    type CategoryProps = {item : { icon: string, title: string, name: string}}


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


    const handleGetEvents = async () => {

        try {

            setLoadingError('')
            setLoadingEvents(true)

            const { data, errors } = await client.models.Event.list({

                filter: {
                  email: {
                    beginsWith: userDetails?.username
                  }
                }
              });

               if(data) {

                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setEvents(filtered as Event[]);
                    setLoadingEvents(false)
                }

          
          
          


        } catch (e) {

            const error = e as Error;

            if(error.message) {

            setErrorLoadingEvents(error.message)
            setLoadingEvents(false)

            }
        }

        

    }

      const handleGetAllEvents = async () => {

          try {

            setLoadingError('')
            setLoadingEvents(true)

            const { data, errors } = await client.models.Event.list();


                if(data) {

                    const filtered = data?.filter((e): e is NonNullable<typeof e> => Boolean(e));
                    setEvents(filtered as Event[]);
                    setLoadingEvents(false)
                }


          } catch (e) {

              const error = e as Error;

            if(error.message) {

            setErrorLoadingEvents(error.message)
            setLoadingEvents(false)

            }

          } 

      }


    useEffect(()=> {

      if(screenName === 'main') {

       // handleGetEvents()

       handleGetAllEvents()

      } else {
        handleGetAllEvents()
      }
      

    },[deletedItem])


    
    
        const handleDateChange = (code: string) => {
                
            //setDayType(code)
        
            if(code === 'all') {
    
                setDateFilter('all')
    
                setStartDate(moment(new Date).format().toString())
                setEndDate('')
            }
        
            if(code === 'today'){
    
                setDateFilter('today')
    
                setStartDate(moment(new Date()).startOf('day').format().toString())
                setEndDate(moment(new Date()).endOf('day').format().toString())
        
               // console.log(moment(new Date()).startOf('day').format())
        
               // console.log(moment(new Date).endOf('day').format())
                
        
            }
        
            if(code === 'tomorrow'){
    
                setDateFilter('tomorrow')
    
                setStartDate(moment(new Date()).endOf('day').format().toString())
                setEndDate(moment(new Date()).add(1, 'days').endOf('day').format().toString())
                
                
            }
            if(code === 'thisweek'){
        
                setDateFilter('thisweek')
    
                setStartDate(moment(new Date()).startOf('isoWeek').format().toString())
                setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                
                
            }
            if(code === 'thisweekend'){
    
                setDateFilter('thisweekend')
    
                setStartDate(moment(new Date()).endOf('isoWeek').subtract(2, 'days').format().toString())
                setEndDate(moment(new Date()).endOf('isoWeek').format().toString())
                
            }
        
            if(code === 'nextweek'){
    
                setDateFilter('nextweek')
    
    
                setStartDate(moment(new Date()).add(1, 'week').startOf('isoWeek').format().toString())
                setEndDate(moment(new Date()).add(1, 'week').endOf('isoWeek').format().toString())
        
                
            }
            if(code === 'thismonth'){
    
                setDateFilter('thismonth')
    
                setStartDate(moment(new Date()).startOf('month').format())
                setEndDate(moment(new Date()).endOf('month').format())
            }
        
            if(code === 'nextmonth'){
    
                setDateFilter('nextmonth')
    
                setStartDate(moment(new Date()).add(1, 'month').startOf('month').format())
                setEndDate(moment(new Date()).add(1, 'month').endOf('month').format())
                
            }
        }



        const handleAddRemoveCategory = (category: string) => {

          const itemIndex = selectedCategories.indexOf(category)
  
          if(itemIndex > -1) {
  
              selectedCategories.splice(itemIndex, 1)
  
              setSelectedCategories([...selectedCategories])
  
          } else {
  
              setSelectedCategories([...selectedCategories, category])
          }
  
      }
  


        const eventsCategories = [
               {icon:<GiGraduateCap size={30} />,
               title: t('education'),
               name:'education'},
               {icon:<FaMusic size={30} />,
                
               title: t('music'),
               name:'music'},
               {
               icon: <BsFillMoonFill size={30} />, 
               title: t('nightparty'),
               name:'night'},
               {
               icon: <FiVideo size={30}/>, 
               title: t('entertainment'),
               name:'entertainment'},
               {
               icon: <BsGraphUp size={30}/>, 
               title: t('markets'),
               name:'markets'},
               {icon:<PiMaskHappyLight size={30} />, 
               title: t('performancevisuals'),
               name: 'visuals'},
               {icon:<BiSolidCamera size={30} />,
               title: t('photography'),
               name:'photography'},
               {icon:<FaLaptopCode size={30}/>,
               title: t('softwaretech'),
               name: 'software'},
               {icon:<FaLaptop size={30}/>,
               title: t('informationtechnology'),
               name: 'informationtechnology'},
               {icon:<PiStethoscope size={30} />,
               title: t('health'),
               name:'health'},
               {icon:<FaHospitalSymbol size={30}/>,
               title: t('hospitalsandclinics'),
               name:'hospital'},
               {icon:<MdMedication size={30}/>,
               title: t('pharmacy'),
               name:'pharmacy'},
               {icon:<IoFastFoodOutline size={30}/>,
               title: t('fooddrink'),
               name:'food'},
               {
               icon: <IoBriefcase size={30} />, 
               title: t('business'),
               name:'business'},
               {icon:<BiRun size={30} />, 
               title: t('sportsfitness'),
               name:'sports'},
               {icon:<MdTravelExplore size={30} />, 
               title: t('traveltourism'),
               name:'travel'},
               {icon:<GiCorn size={30} />,
               title: t('agriculture'),
               name:'agriculture'},
               {
               icon: <FaTree size={30} />, 
               title: t('environment'),
               name:'environment'},
               {icon:<PiHandHeartFill size={30}/>, 
               title: t('charityfundraising'),
               name:'charity'},
               {icon:<FaPersonPraying size={30} />,
               title: t('religionspirituality'),
               name:'religion'},
               {icon:<GiMountainClimbing size={30} />, 
               title: t('outdooractivities'),
               name:'outdoor'},
               {icon:<BiPaint size={30} />,
               title: t('art'),
               name: 'art'},
               {icon:<IoLogoGameControllerB size={30} />,
               title: t('gamesesports'),
               name:'game'},
               
               {icon:<FaGears size={30} />,
               title: t('engineering'),
               name:'engineering'},
           ]
    



  return (
    <div className='w-full'>
        <ComponentHeader category='Manage' id={''} item={null}/>
        <div className='w-full min-h-screen pt-10'>
            
            <div className='w-full'>
            {screenName === 'admin' ?
            <div className='flex flex-col items-center'> 
            
              <div className='mt-10 flex flex-row w-11/12 max-w-lg border border-black'>
                    <input className=' w-full p-2 rounded-md text-black' placeholder={t('search')}  value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
                    <div className='border-l-1 px-1 flex flex-col items-center justify-center cursor-pointer'  onClick={()=> handleGetEvents()}>
                        <BiSearch size={24} color={'#1184e8'} />
                    </div>
                    
                </div>
                
                <div className='w-11/12 mt-2 max-w-3xl flex flex-col items-center'>
                    <div className='mt-2 flex flex-row overflow-x-scroll  w-full'>
                        {dayRanges.map((item, i)=> {
                            return(
                                <div key={i} className='flex items-center justify-center'>
                                   
                                    {dateFilterCode === item.code ? 
                                    <div className='w-full mx-1 border-2 px-2 whitespace-nowrap rounded-md mx-1 cursor-pointer border-cyan-500 font-semibold text-black' onClick={()=> handleDateChange(item.code)}>
                                        {item.name}</div>
                                        : 
                                    <div className='w-full mx-1 border px-2 whitespace-nowrap hover:font-semibold border-gray-400 hover:border-black rounded-md mx-1 cursor-pointer text-black' onClick={()=> handleDateChange(item.code)}>{item.name}</div> }
                                        
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
              </div>: null}
            {loadingEvents ? 
            <div className='w-full flex items-center flex-col '>
                <div className='text-black mt-20 font-semibold'>{t('loading')}</div>
            </div>:
            <div className='w-full flex flex-col items-center '>
              
              {events.length > 0 ?
              <div className='flex flex-col md:flex-row flex-wrap w-11/12  max-w-7xl  items-center md:items-start '>
                {events.map((item, i)=> {
                    return(
                        <div key={i} className='w-full max-w-sm '>
                            <EventManageBody key={i} item={item} screenType="manage" deletedItem={deletedItem} setDeletedItem={setDeletedItem} screenName={screenName} />
                        </div>
                         
                    )
                })}
              </div>
                  :
                  <div className='pb-20'><div className='text-black'>{t('noeventsfound')}</div></div>}
            </div>
            }
          </div>
          
        </div>
        <FooterComponent />
        
    </div>
  );
}