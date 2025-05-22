"use client"

import {useState, useEffect, useRef} from "react"
import moment from "moment"
import {useTranslations} from 'next-intl';



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



export default function EventDateTimeCostSection( {eventTimelines, option}: {eventTimelines: DateTimePrice [], option: string}) {


    const t = useTranslations()
    const [sortedDates, setSortedDates] = useState<DateTimePrice []>([])
    const [firstEventDate, setFirstEventDate] = useState<DateTimePrice | null>(null)
    const [loadingSortedDates, setLoadingSortedDates] = useState(true)
   
    useEffect(()=> {


        setLoadingSortedDates(true)


        const sortedTimelines = eventTimelines.sort(function(a, b){

            return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();

        })



        

        for (var i = 0 ; i < sortedTimelines.length; i++) {

            if(moment(sortedTimelines[i].eventEndDate).format() > moment(new Date()).format()) {

                setFirstEventDate(sortedTimelines[i])
    
                setLoadingSortedDates(false)
    

    
                break
                
    
               
            }
    

        }
     
        const firstTimeline = sortedTimelines.map((item: any)=> {
        
       

       })
       
       
        setSortedDates(sortedTimelines)

        setLoadingSortedDates(false)

    },[eventTimelines])



    return(
    
        <div className='w-full max-w-md   flex flex-col'>
            {loadingSortedDates ?
            <div className="w-7/12 bg-gray-200 h-5 mt-1"></div> :
            <div className=" mt-1">
                {firstEventDate ? 
                <div>
                    {moment(firstEventDate.eventDate).format() < moment(new Date()).format()  ?
                    <div>
                        <div className="flex flex-row items-center">
                            {option === 'homeNear' ? <div className="text-sm font-semibold text-gray-500">{moment(firstEventDate.eventDate).fromNow()}</div> : null}
                            {option === 'sponsored' ? <div className="text-sm font-semibold text-gray-300">{moment(firstEventDate.eventDate).fromNow()}</div> : null}
                            
                            <div className="ml-2 text-sm text-orange-600 font-semibold">{t('ongoing')}</div>
                            
                        </div>
                        {option === 'homeNear' ? <div className="text-sm mt-1 text-gray-400 ">{`${t('ends')} ${moment(firstEventDate.eventEndDate).fromNow()}`}</div>: null}

                        {option === 'sponsored' ? <div className="text-sm mt-1 text-white ">{`${t('ends')} ${moment(firstEventDate.eventEndDate).fromNow()}`}</div>: null}

                    </div>:
                <div>
                    {option === 'homeNear' ? 
                    <div className="text-sm text-gray-200">{moment(firstEventDate.eventDate).format('MMMM Do YYYY, h:mm a')} 
                    </div> : null}
                    {option === 'sponsored' ? <div className="text-sm text-gray-200">{moment(firstEventDate.eventDate).format('MMMM Do YYYY, h:mm a')} 
                    </div> : null}
                </div>}
                </div>:
                <div>
                   {option === 'homeNear' ?  <div className="text-sm text-gray-500">{t('ended')}</div> : null}
                   {option === 'sponsored' ? <div className="text-sm text-gray-200">{t('ended')}</div>:null}
                </div>}
            </div>}
            {firstEventDate ?
            <div className="mt-1">
                <div>
                    <div>{firstEventDate.ticketPriceArray[0].adultPrice > 0 ? 
                    <div>
                        {option === 'homeNear' ? <div className="text-gray-500 text-sm font-semibold">{`${t('from')} ${firstEventDate.ticketPriceArray[0].adultPrice}`}</div>: null}
                        {option === 'sponsored' ? <div className="text-gray-300 text-sm font-semibold">{`${t('from')} ${firstEventDate.ticketPriceArray[0].adultPrice}`}</div>: null}
                    </div>:

                    <div>
                        <div>
                            {
                                firstEventDate.ticketPriceArray[0].adolescentPrice > 0 ?
                                <div>
                                    {option === 'homeNear' ? <div className="text-gray-500 text-sm font-semibold">{`${t('from')} ${firstEventDate.ticketPriceArray[0].adolescentPrice}`}</div> : null}
                                    {option === 'sponsored' ? <div className="text-gray-300 text-sm font-semibold">{`${t('from')} ${firstEventDate.ticketPriceArray[0].adolescentPrice}`}</div> : null}
                                </div>:
                                <div>
                                    {
                                        firstEventDate.ticketPriceArray[0].childPrice > 0 ? 
                                        <div>
                                            {option === 'homeNear' ? <div className="text-gray-500 text-sm font-semibold">{`${t('from')} ${firstEventDate.ticketPriceArray[0].childPrice}`}</div> : null}
                                            {option === 'sponsored' ? <div className="text-gray-300 text-sm font-semibold">{`${t('from')} ${firstEventDate.ticketPriceArray[0].childPrice}`}</div> : null}
                                        </div>: 
                                        <div>
                                            {option === 'homeNear' ? <div className="text-gray-500 text-sm font-semibold">{t('free')}</div> : null}
                                            {option === 'sponsored' ? <div className="text-gray-300 text-sm font-semibold">{t('free')}</div> : null}
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>}</div>
                </div>
            </div> :
            null}
            
        </div>
    )
}
