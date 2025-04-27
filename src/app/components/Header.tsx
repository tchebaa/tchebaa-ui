"use client"

import {useState, Dispatch, SetStateAction} from 'react'
//import SearchBody from './SearchBody';
//import HeaderDetailsBody from './HeaderDetailsBody';
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
//import SearchModal from './SearchModal';
//import SideMenu from './SideMenu';
import Image from 'next/image'
import Link from 'next/link';
import HeaderDetailsBody from './HeaderDetailsBody';
import SideMenu from './SideMenu';



export default function Header({ headerPage, searchModalVisible, setSearchModalVisible}: {headerPage: string, searchModalVisible: boolean, setSearchModalVisible: Dispatch<SetStateAction<boolean>> }) {

   

    
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    

    return(
        <div className='bg-white justify-center z-40 items-center fixed flex w-full w-full border-b '>
            <div className='w-8/12 flex md:visible md:relative invisible absolute  flex-row h-14 items-center justify-between '>
                <div className='w-full h-full flex flex-row items-center'>
                    <Link className="cursor-pointer" href={{ pathname: '../'}}
                    passHref>

                        <div className=' flex cursor-pointer  align-center justify-center'>
                            <Image
                                src="/tchebaa.png"
                                width={30}
                                height={30}
                                alt="Tchebaa logo"
                                />
                            </div>
                            
                    
                    </Link>

                       { headerPage === 'home'? 
                       <div className='pr-2 cursor-pointer ' onClick={()=> {setSearchModalVisible(true); setMenuModalVisible(false)}}>
                            <BiSearch size={25} color='#00BDFE' />
                        </div> 
                    : <div></div>}
                </div>
                <div className='flex   w-full'>
                    <HeaderDetailsBody headerPage={headerPage} />
                </div>
            </div>
            <div className='md:invisible md:absolute visible relative w-11/12'>
                <div className='flex flex-row items-center justify-between h-14'>
                    <div className='flex flex-row items-center'>
                        {headerPage === 'category' || headerPage === 'organizers' || headerPage === 'homeMessage' ? null : 
                        <div className='pr-2 cursor-pointer' onClick={()=> {setSearchModalVisible(true); setMenuModalVisible(false)}}>
                            <BiSearch size={25} color='#00BDFE' />
                        </div>}
                        <div className=''>
                                <Image
                                src="/tchebaa.png"
                                width={30}
                                height={30}
                                alt="Tchebaa logo"
                                />
                            </div>
                    </div>
                    
                        <div className='pr-2 cursor-pointer text-black' onClick={()=> { setMenuModalVisible(true); setSearchModalVisible(false)}}>
                        <HiOutlineMenuAlt3 size={25} color='black' />
                    </div>
                </div>
            </div>
            
            {menuModalVisible ? <SideMenu menuModalVisible={menuModalVisible} setMenuModalVisible={setMenuModalVisible} setSearchModalVisible={setSearchModalVisible} /> : null}
        </div>
    )
}