"use client"

import {useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import Header from '../../components/Header';
import SearchComponent from '../../components/SearchComponent';
import MapSection from '../../components/MapSection';
//import ResultsFilterBody from '@/app/components/ResultsFilterBody';
import {useDate} from '../../context/DateContext'
import {useLocation} from '../../context/LocationContext'
import axios from 'axios';
import LoginModal from '../../components/LoginModal';
import SignUpModal from '../../components/SignUpModal';
import { MdClose, MdModeEditOutline, MdDeleteForever  } from "react-icons/md";
import ComponentHeader from '../../components/ComponentHeader';



export default function SearchEventComponent() {

   const searchParams = useSearchParams()

   const category = searchParams.get('category')
   const categoryTitle = searchParams.get('categoryTitle')
   const allSearchTerm = searchParams.get('allSearchTerm')
   const pageType = searchParams.get('allSearch')
   const [headerPage, setHeaderPage] = useState('category')
   const [loginModal, setLoginModal] = useState(false)
   const [signUpModal, setSignUpModal] = useState(false)

   

   const [searchTerm, setSearchTerm] = useState(pageType === 'allSearch' ? allSearchTerm : '')

   const { endDate, startDate, setEndDate, setStartDate} = useDate()

   const {userAddress, userLocation, setUserAddress, setUserLocation} = useLocation();

   const [likedEvents, setLikedEvents] = useState([])

    const [homeEvents, setHomeEvents] = useState([])
    const [loadingHomeEvents, setLoadingHomeEvents] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const [openMobileMap, setOpenMobileMap] = useState(false)


    useEffect(()=> {
        console.log(searchTerm, allSearchTerm, 2)
    },[allSearchTerm, searchTerm])


    const handleGetNearEvents = async () => {

    }
         


    return(
        <div className=' min-h-screen  bg-white w-full flex flex-col items-center '>
            <div className='   w-full items-center flex bg-white h-20 flex-col '>
            <div className='w-full flex '>
                    <ComponentHeader category='Search' id={''} />
                </div>
                   
            </div>
            <div className="w-full flex items-center flex-col  ">
               {loginModal ?
                  <div className='fixed z-40 w-full max-w-lg border top-16 pb-10 bg-white rounded-md'>
                     <div className='bg-white flex flex-row items-center justify-between p-2'>
                        <div></div>
                        <div className='cursor-pointer' onClick={()=> setLoginModal(false)}><MdClose color='black' size={25} /></div>
                     </div>
                     <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
                  </div>: null}
                  {signUpModal ? 
                  <div className='fixed z-40 w-full max-w-lg border top-16 pb-10 bg-white rounded-md'>
                     <div className='bg-white flex flex-row items-center justify-between p-2'>
                        <div></div>
                        <div className='cursor-pointer' onClick={()=> setSignUpModal(false)}><MdClose color='black' size={25} /></div>
                     </div>
                     <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}/>
                  </div>: null}
            </div>
                
        <div className='flex flex-row justify-between bg-white w-full lg:w-7/12 h-full border'>
            
            <div className="flex  w-full z-0 flex-col bg-white h-full ">
                
                <SearchComponent categoryTitle={categoryTitle!} category={category!} setOpenMobileMap={setOpenMobileMap} searchTerm={searchTerm!} setSearchTerm={setSearchTerm!}
                handleGetNearEvents={handleGetNearEvents} />
                
            </div>
            
            
        </div>
        </div>
    )
}