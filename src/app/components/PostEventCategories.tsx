"use client"

import {useEffect, useState} from 'react'
import {useTranslations} from 'next-intl';


export default function PostEventCategories({selectedCategories, handleAddRemoveCategory, eventCategories, categoriesError}: 
  {selectedCategories: string [], categoriesError: boolean, handleAddRemoveCategory: (item: string) => void, eventCategories: {name: string, title: string}[]}) {

    const t = useTranslations()

    return(
        <div className='w-full'>
            <div>
                <div className='text-black font-semibold'>{t('category')}</div>
                <div className='text-gray-500 text-sm'>{t('minmax')}</div>
            </div>
              <div className='flex flex-wrap'>
                {eventCategories.map((item, i)=> {
                    return(
                        <div className='' key={i} onClick={()=> handleAddRemoveCategory(item.name)}>
                            {selectedCategories.indexOf(item.name) > -1 ? 
                            <div className='m-1 border p-1 bg-blue-300 rounded-md cursor-pointer '>
                                <div className='text-black'>{item.title}</div>
                            </div>
                            : 
                            <div className='m-1 border p-1 border-black rounded-md cursor-pointer'>
                                <div className='text-black'>{item.title}</div>
                            </div>}
                        </div>
                    )
                })}
              </div>
              {!categoriesError ? <div></div> : <div >{t('categoriesrequired')}</div>}
        </div>  
    )
}