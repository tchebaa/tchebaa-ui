'use client'

import {useEffect, useState, Dispatch, SetStateAction, useRef} from 'react'
import {useTranslations} from 'next-intl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import moment from 'moment';
import { MdClose } from "react-icons/md";
import { BiCalendarEvent } from "react-icons/bi";
import { FaRegClock, FaRegPlusSquare, FaRegEdit   } from "react-icons/fa";


interface TicketPrice {
    adultPrice: number;
    adolescentPrice: number;
    childPrice: number;
    ticketTitle: string;
    ticketNumber: number;
  }


export default function PostDateTimeDuration ({ageRestriction, dateTimePrice, setDateTimePrice, site, setSite}: 
    {ageRestriction: string [], dateTimePrice: string [], setDateTimePrice: Dispatch<SetStateAction<string []>>, site: boolean, setSite: Dispatch<SetStateAction<boolean>>}) {

          const t = useTranslations()

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState<string | "date" | "time" | "datetime" | "countdown" | undefined>('')
    const [selectedDate, setSelectedDate] = useState<string | Date>('')
    const [selectedDateError, setSelectedDateError] = useState<boolean>(false)
    const [selectedTime, setSelectedTime] = useState<string | Date>('')
    const [selectedTimeError, setSelectedTimeError] = useState<boolean>(false)
    const [showDateModal, setShowDateModal] = useState<boolean>(false)
    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [durationError, setDurationError] = useState<boolean>(false)
    const [adultPrice, setAdultPrice] = useState<number>(0)
    const [adolescentPrice, setAdolescentPrice] = useState<number>(0)
    const [childPrice, setChildPrice] = useState<number>(0)
    const [ticketTitle, setTicketTitle] = useState<string>('')
    const [ticketNumber, setTicketNumber] = useState<number>(0)
    const [ticketPriceArray, setTicketPriceArray] = useState<string []>([JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])


    const [showForm, setShowForm] = useState(true)
    const [editForm, setEditForm] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>()
    
    const scrollRef = useRef(null)

    
    const handleChangeDate = (event: any) => {
      
     

      };



      

      const handleOpenDateTimeModal = (item: string) => {

        

        setMode(item)
        setShowDateModal(!showDateModal)

      }
    
      const handleAddDatePriceItem = () => {

        const dateHours = moment(selectedTime).hours()
        const dateMinutes = moment(selectedTime).minutes()

        const eventDate = moment(selectedDate).add(dateHours, 'hours').add(dateMinutes, 'minutes')

        const eventEndDate = moment(eventDate).add(days, 'days').add(hours, 'hours').add(minutes, 'minutes')

        const item = {
            eventDate: eventDate,
            eventEndDate: eventEndDate,
            eventDays: days,
            eventHours: hours,
            eventMinutes: minutes,
            ticketPriceArray: ticketPriceArray.map((item, i)=> {
                return JSON.parse(item)
            })
        }

        if(selectedDate) {

            setSelectedDateError(false)

            if(selectedTime) {

                setSelectedTimeError(false)

                if(days > 0 || hours > 0 || minutes > 0) {

                    setDurationError(false)
                    
                    setDateTimePrice([...dateTimePrice, JSON.stringify(item)])
                    setSelectedDate('')
                    setSelectedTime('')
                    setDays(0)
                    setHours(0)
                    setMinutes(0)
                    setTicketPriceArray([JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])
                    setShowForm(false)

                } else {

                    setDurationError(true)
                }

            } else {

                setSelectedTimeError(true)
            }


        } else {
            setSelectedDateError(true)
        }

        //setDateTimePrice([..dateTimePrice, item])
      }


      const handleChangeTicketArrayInput = (item: string, value: string | number, index: number) => {

        let parsedItem = JSON.parse(ticketPriceArray[index])

        if(item === 'ticketTitle') {

            parsedItem.ticketTitle = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

            
            
        }

        if(item === 'ticketNumber') {

            parsedItem.ticketNumber = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

            
        }

        if(item === 'adultPrice') {

            parsedItem.adultPrice = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

       

        }

        if(item === 'adolescentPrice') {

            parsedItem.adolescentPrice = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

           
        }

        if(item === 'childPrice') {

            parsedItem.childPrice = value


            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

            

        }

      }


      const handleAddTicketOption = () => {
        if(ticketPriceArray.indexOf(JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})) < 0 ) {
            setTicketPriceArray([...ticketPriceArray, JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])
        }
      }

      const handleRemoveTicketOption = (index: number) => {

        ticketPriceArray.splice(index, 1)
        setTicketPriceArray([...ticketPriceArray])

      }

      const handleAddDateTimeComponent = () => {

        window.scrollTo(0, 0)

          setShowForm(true)
    

      }
      
      const handleOpenEditForm = (item: {eventDate: Date, eventDays: number, eventHours: number, eventMinutes: number, ticketPriceArray: 
        {adultPrice: number, adolescentPrice: number, childPrice: number, ticketTitle: string, ticketNumber: number} []}, index : number) => {

        
            window.scrollTo(0, 0)


            const stringifiedTicketPriceArray = item.ticketPriceArray.map((ticketOption, i)=> {
                return JSON.stringify(ticketOption)
            })

            setEditIndex(index)

            console.log(item.eventDays, item.eventHours, item.eventMinutes)

            setTicketPriceArray(stringifiedTicketPriceArray)
            setSelectedDate(moment(item.eventDate).startOf('day').format())
            setSelectedTime(moment(item.eventDate).format())
            setDays(item.eventDays),
            setHours(item.eventHours)
            setMinutes(item.eventMinutes)
            setShowForm(true)
            setEditForm(true)
           // scrollRef.current.scrollTo({y: 0})
    
        
        

      }

      const handleSaveEdit = () => {

        const dateHours = moment(selectedTime).hours()
        const dateMinutes = moment(selectedTime).minutes()

        const eventDate = moment(selectedDate).add(dateHours, 'hours').add(dateMinutes, 'minutes')

        const eventEndDate = moment(eventDate).add(days, 'days').add(hours, 'hours').add(minutes, 'minutes')

        const item = {
            eventDate: eventDate,
            eventEndDate: eventEndDate,
            eventDays: days,
            eventHours: hours,
            eventMinutes: minutes,
            ticketPriceArray: ticketPriceArray.map((item, i)=> {
                return JSON.parse(item)
            })
        }

        if(selectedDate) {

            setSelectedDateError(false)

            if(selectedTime) {

                setSelectedTimeError(false)

                if(days > 0 || hours > 0 || minutes > 0) {

                    setDurationError(false)

                    if (typeof editIndex === 'number') {

                        dateTimePrice.splice(editIndex, 1, JSON.stringify(item));

                        setDateTimePrice([...dateTimePrice])
                    
                        setSelectedDate('')
                        setSelectedTime('')
                        setDays(0)
                        setHours(0)
                        setMinutes(0)
                        setTicketPriceArray([JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])
                        setShowForm(false)

                        } else {
                        // Handle the error or fallback
                        //console.warn("editIndex is not a valid number", editIndex);
                        }
                    

                } else {

                    setDurationError(true)
                }

            } else {

                setSelectedTimeError(true)
            }


        } else {
            setSelectedDateError(true)
        }


      }


    return(
        <div className='w-full pb-20'>
                <div className='w-full'> 
                {showForm || dateTimePrice.length < 1 ? 

                <div className='flex flex-col border p-2 max-w-xl'>
                    <div >
                        <div></div>
                        {dateTimePrice.length > 0 ? <div className='cursor-pointer' onClick={()=> setShowForm(false)}><MdClose size={24} color={'black'} /></div>: <div></div>}
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row border w-full p-4 rounded-md cursor-pointer'>
                            <BiCalendarEvent  size={24} color={ "black"} />
                            <div className='ml-2'>
                                <div className='text-black font-semibold'>{t('selectdate')}</div>
                                
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Select Date" minDate={dayjs(new Date())} value={dayjs(selectedDate)} onChange={(value)=> {if (value) {
                                        const formattedDate = moment(value.toDate()).format(); // or format("YYYY-MM-DD")
                                        setSelectedDate(formattedDate);
                                
                                        }}} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        {selectedDateError ? <div className='text-red-500 mt-2'>{t('eventdaterequired')}</div>: null}
                        <div className='flex flex-row mt-2 border p-4 w-full rounded-md cursor-pointer' onClick={()=> handleOpenDateTimeModal('time')}>
                            <FaRegClock  size={24} color={ "black"} />
                            
                            <div className='ml-2'>
                                <div className='text-black font-semibold'>{t('selecttime')}</div>
                                
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker label="Select Time"  value={dayjs(selectedTime)} onChange={(value)=> {if (value) {
                                        const formattedDate = moment(value.toDate()).format(); // or format("YYYY-MM-DD")
                                        setSelectedTime(formattedDate);
                                
                                        }}} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        {selectedTimeError ? <div className='text-red-500 mt-2'>{t('eventtimerequired')}</div>: null}
                    </div>
                    
                    <div className='mt-2 border p-4 rounded-md'>
                        <div className='font-semibold text-black'>{t('eventduration')}</div>
                        <div className='flex flex-row mt-2'>
                            <div className='border p-2 w-1/3'>
                                <div className='text-black font-semibold'>{t('days')}</div>
                                <input className='border w-2/3 mt-1 px-1 text-black' value={days}  placeholder={t('days')}  onChange={(e)=> setDays(Number(e.target.value))} type='number'/>
                        
                            </div>
                            <div className='border p-2 ml-2  w-1/3'>
                                <div className='text-black font-semibold'>{t('hours')}</div>
                                <input className='border w-2/3 mt-1 px-1 text-black' value={hours} placeholder={t('hours')}  onChange={(e)=> setHours(Number(e.target.value))} type='number'/>
                            </div>
                            <div className='border p-2 ml-2  w-1/3'>
                                <div className='text-black font-semibold'>{t('minutes')}</div>
                                <input className='border w-2/3 mt-1 px-1 text-black' value={minutes} placeholder={t('minutes')} onChange={(e)=> setMinutes(Number(e.target.value))} type='number'/>
                            </div>
                            
                        </div>
                    </div>
                    {durationError ? <div className='text-red-500 mt-2'>{t('eventdurationrequired')}</div>: null}
                    {ticketPriceArray.map((item, i)=> {

                        const parsedItem = JSON.parse(item)

                        return(

                            <div key={i} className='border p-4 mt-2 rounded-md'>
                                {ticketPriceArray.length > 1 ? 
                                <div >
                                    <div></div>
                                    <div onClick={()=> handleRemoveTicketOption(Number(i))}><MdClose size={20} color={'black'} /></div>
                                </div>: null}
                                <div className='flex flex-row mt-2 items-center'>
                                    <div className='text-black font-semibold'>{t('tickettitle')}</div>
                                    <div className='ml-1 text-sm text-gray-400 font-semibold' >{t('egvipregulareconomy')}</div>
                                    
                                </div>
                                <input className='border px-1 mt-2 text-black' value={parsedItem.ticketTitle} placeholder={t('egvipregulareconomy')} onChange={(e)=> handleChangeTicketArrayInput('ticketTitle', e.target.value, i)}/>
                                    <div className='mt-2 text-black font-semibold'>{t('ticketnumber')}</div>
                                <input className='border px-1 mt-2 text-black' value={parsedItem.ticketNumber.toString()} placeholder={t('ticketnumber')} type='number' onChange={(e)=> handleChangeTicketArrayInput('ticketNumber', Number(e.target.value), i)}/>
                            
                        
                                <div className='flex flex- mt-2'>
                                    <div  className='text-black font-semibold'>{t('eventprice')}</div>
                                    <div className='ml-1 text-sm text-gray-400 font-semibold' >{`(${t('iffreeentero')})`}</div>
                                </div>
                                
                                <div className='flex flex-row items-center justify-between mt-2'>
                                    <div className='flex flex-row'>
                                        <div className='text-black font-semibold' >{t('adult')}</div>
                                        <div className='ml-1 text-sm text-gray-400 font-semibold'>18+</div>
                                    </div>
                                    <input className='border px-1 w-3/6 text-black'  value={parsedItem.adultPrice.toString()} placeholder={t('adultprice')} type='number' onChange={(e)=> handleChangeTicketArrayInput('adultPrice', Number(e.target.value), i)} />
                                </div>
                                <div className='flex flex-row justify-between mt-2'>
                                    <div className='flex-row flex '>
                                        <div className='text-black font-semibold'>{t('adolescent')}</div>
                                        <div className='ml-1 text-sm text-gray-400 font-semibold'>13 - 17</div>
                                    </div>
                                    <input className=' px-1 border w-3/6 text-black' value={parsedItem.adolescentPrice.toString()} placeholder={t('adolescentprice')}  type='number' onChange={(e)=> handleChangeTicketArrayInput('adolescentPrice', Number(e.target.value), i)} />
                                </div>
                                <div className='flex flex-row justify-between mt-2'>
                                    <div className='flex flex-row '>
                                        <div className='text-black font-semibold'>{t('child')}</div>
                                        <div className='ml-1 text-sm text-gray-400 font-semibold' >0 - 12</div>
                                    </div>
                                    <input className='border px-1 w-3/6 text-black' value={parsedItem.childPrice.toString()} placeholder={t('childprice')} type='number' onChange={(e)=> handleChangeTicketArrayInput('childPrice', Number(e.target.value), i)} />
                                </div>
                            </div>

                        )
                    })}
                    
                    <div className='flex items-center flex-col mt-2'>
                        <div className='border items-center flex flex-col p-2 rounded-md cursor-pointer' onClick={()=> handleAddTicketOption()}>
                            <FaRegPlusSquare  color={ "black"} size={24} />
                            <div className='text-black'>{t('addanotherticketoption')}</div>
                        </div>
                    </div>
                    
                    {editForm ? 
                    <div className=' flex items-center flex-col mt-2'>
                        <div onClick={()=> handleSaveEdit()} className='border flex items-center flex-row rounded-md cursor-pointer'>
                            <div className='border p-2'>
                                <FaRegPlusSquare size={24} color="black" />
                            </div>
                            <div className='border px-4 py-2 bg-sky-500'>
                                <div className='font-semibold text-black'>{t('edit')}</div>
                            </div>
                            
                        </div>
                    </div>
                    :
                    <div className=' flex items-center flex-col mt-2'>
                        <div className='border flex items-center flex-row rounded-md cursor-pointer' onClick={()=> handleAddDatePriceItem()}>
                            <div className='border p-2'>
                                <FaRegPlusSquare  size={24} color="black" />
                            </div>
                            <div className='border px-4 py-2 bg-sky-500'>
                                <div className='font-semibold text-black'>{t('save')}</div>
                            </div>
                            
                        </div>
                    </div>}
                        
                </div> : null} 

                {dateTimePrice.map((item, i)=> {

                    const parsedItem = JSON.parse(item)

                    return(
                        <div className='border w-full p-4 mt-2' key={i}>
                            <div className='flex flex-row justify-between w-full'>
                                    <div></div>
                                    <div className='flex flex-row items-center cursor-pointer' onClick={()=> handleOpenEditForm(parsedItem, i)}>
                                        <div className='font-semibold text-black mr-1'>{t('edit')}</div>
                                        <FaRegEdit  size={24} color={'#1184e8'} />
                                    </div>
                                </div>
                            <div className='flex flex-col mt-2'>
                                <div className='flex flex-row border w-full p-4 rounded-md cursor-pointer'>
                                    <BiCalendarEvent  size={24} color={ "black"} />
                                
                                    <div className='ml-2'>
                                        <div className='text-black font-semibold'>{t('eventdate')}</div>
                                        <div className='text-black'>{moment(parsedItem.eventDate).format('L')}</div>
                                    </div>
                                </div>
                                <div  className='flex flex-row border w-full p-4 rounded-md cursor-pointer mt-2'>
                                    <FaRegClock  size={24} color={ "black"} />
                                
                                    <div className='ml-2'>
                                        <div className='text-black font-semibold'>{t('eventduration')}</div>
                                        <div className='text-black'>{moment(parsedItem.eventDate).format('LT')}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2 border p-4 rounded-md'>
                                <div className='font-semibold text-black'>{t('eventduration')}</div>
                                <div className='flex flex-row mt-2'>
                                    <div className='border p-2 w-1/3'>
                                        <div className='text-black font-semibold'>{t('days')}</div>
                                        <div className='text-black'>{parsedItem.eventDays}</div>
                                
                                    </div>
                                    <div className='border p-2 ml-2  w-1/3'>
                                        <div className='text-black font-semibold'>{t('hours')}</div>
                                        <div className='text-black'>{parsedItem.eventHours}</div>
                                    </div>
                                    <div className='border p-2 ml-2  w-1/3'>
                                        <div className='text-black font-semibold'>{t('minutes')}</div>
                                        <div className='text-black'>{parsedItem.eventMinutes}</div>
                                    </div>
                                    
                                </div>
                            </div>

                            {parsedItem.ticketPriceArray.map((item: TicketPrice, i: number)=> {

                                return(
                                    <div  key={i} className='border p-4 rounded-md mt-2'>
                                        
                                        <div className='mt-2'>
                                            <div className='text-black font-semibold'>{t('tickettitle')}</div>
                                        </div>
                                        <div className='mt-2 text-black'>{item.ticketTitle}</div>
                                        <div className='text-black font-semibold mt-2'>{t('ticketnumber')}</div>
                                        <div className='text-black font-semibold'>{item.ticketNumber}</div>
                                       
                                    
                                
                                        <div className='mt-2'>
                                            <div className='text-black font-semibold'>{t('eventprice')}</div>
                                            
                                        </div>
                                        
                                        <div className='flex flex-row items-center justify-between mt-2'>
                                            <div className='flex flex-row items-center'>
                                                <div className='text-black font-semibold'>{t('adult')}</div>
                                                <div className='ml-1 text-sm text-gray-400 font-semibold'>18+</div>
                                            </div>
                                            <div className='text-black'>{item.adultPrice}</div>
                                        </div>
                                        <div className='flex flex-row items-center justify-between mt-2'>
                                            <div className='flex flex-row items-center'>
                                                <div className='text-black font-semibold'>{t('adolescent')}</div>
                                                <div className='ml-1 text-sm text-gray-400 font-semibold'>13 - 17</div>
                                            </div>
                                            <div className='text-black'>{item.adolescentPrice}</div>
                                        </div>
                                        <div className='flex flex-row items-center justify-between mt-2'>
                                            <div className='flex flex-row items-center'>
                                                <div className='text-black font-semibold'>{t('child')}</div>
                                                <div className='ml-1 text-sm text-gray-400 font-semibold'>0 - 12</div>
                                            </div>
                                            <div className='text-black'>{item.childPrice}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                    {!showForm ? 
                    <div className=' w-full flex items-center flex-col'>
                        {dateTimePrice.length > 0 ? 
                            <div  className='mt-2'>
                                <div className='cursor-pointer flex flex-col items-center border p-2 rounded-md ' onClick={()=> handleAddDateTimeComponent()}>
                                    <FaRegPlusSquare color={"black"} size={24} />
                                    <div className='text-black'>{t('addanotherdateandtime')}</div>
                                </div>
                            </div>: null
                        }
                    </div> 
                    : null}
                </div>
                
        </div>
    )
}