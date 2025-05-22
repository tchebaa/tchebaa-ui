"use client"

import {createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode} from 'react';



interface IDateContextValue {
    startDate?: string
    endDate?: string
    setStartDate?:(data: string) => void
    setEndDate?:(data: string) => void
    
  
}


const initialDate: IDateContextValue = {
    startDate: '',
    endDate: '',
    setStartDate: (data) => {},
    setEndDate: (data) => {}
    
  }



const DateContext = createContext<IDateContextValue>(initialDate);

   

export function useDate () {
    return (useContext(DateContext))
}

type ChildrenProps = { children?: ReactNode };


export function DateProvider({children}: ChildrenProps) {

    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')


  return(
    <DateContext.Provider value={{startDate, endDate, setStartDate, setEndDate}} >{children}</DateContext.Provider>
  )

}