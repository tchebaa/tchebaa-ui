"use client"

import {useState, useEffect} from 'react'
//import {useAuth} from '../context/AuthContext'
//import {useInput} from '../context/InputsContext'
import Datepicker from "react-tailwindcss-datepicker";
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
//import DatePicker from "react-datepicker";

//import "react-datepicker/dist/react-datepicker.css";



export default function SearchBody({headerPage}: {headerPage: string}) {

    //const {auth} = useAuth()
   // const { endDate, startDate, setEndDate, setStartDate} = useInput()

   /*
    const [newStartDate, setNewStartDate] = useState(new Date());

    const [value, setValue] = useState({
        
    });

    const handleFromChange = newValue => {
        
        
        setValue(newValue);
        console.log(newValue)
        setStartDate(newValue.startDate)
        setEndDate(newValue.endDate)
       
    };

    const handleToChange = newValue => {
        
        
       setValue(newValue);
       console.log(newValue)
        setEndDate(newValue.startDate)
        setEndDate(newValue.endDate)
       
    };

    

*/
    
    
    return(
       
                <div className='w-full h-full flex items-center'>
                    <div className='bg-white h-3/5 z-20 lg:visible lg:relative invisible absolute border hover:shadow flex items-center justify-between rounded-full w-full lg:w-1/5 '>
                        
                        <div className=' w-11/12 h-full flex border flex-row items-center'>
                            
                            <div className='pr-2 cursor-pointer'>
                                <BiSearch size={25} color='#00BDFE' />
                            </div>
                        </div>   
                    </div>
                    
                </div>
                
    )
}