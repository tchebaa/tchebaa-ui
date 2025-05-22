"use client"

import {useEffect, useState} from 'react'
import {useTranslations} from 'next-intl';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";

export default function PostAgeRestriction({ageRestriction, handleAddRemoveAgeGroup}: {ageRestriction: string [], handleAddRemoveAgeGroup: (item: string) => void}) {

    const t = useTranslations()

    return(
       
        <div className='w-full'>
            <div className='text-black font-semibold'>{t('agerestriction')}</div>
            <div className='flex flex-row items-center mt-2'>
                <div className='text-black font-semibold'>{t('adult')}</div>
                <div className='text-gray-500 ml-1'>18+</div>
            </div>
            <div className='flex flex-row items-center mt-2 cursor-pointer' onClick={()=> handleAddRemoveAgeGroup('adolescent')}>
                {ageRestriction.includes('adolescent') ?
                    <MdOutlineRadioButtonChecked  size={16} color={'#1184e8'}/>
                    :
                <MdOutlineRadioButtonUnchecked size={16} color={ "black"}/>}
                <div className='text-black ml-1'>{t('adolescent')}</div>
                <div className='text-gray-500 ml-1'>13 - 17</div>
            </div>
            <div className='flex flex-row items-center mt-2 cursor-pointer'  onClick={()=> handleAddRemoveAgeGroup('child')}>
            {ageRestriction.includes('child') ?
                    <MdOutlineRadioButtonChecked size={16} color={'#1184e8'}/>
                    :
                <MdOutlineRadioButtonUnchecked  size={16} color={ "black"}/>}
                <div className='text-black ml-1' >{t('child')}</div>
                <div className='text-gray-500 ml-1'>0 - 12</div>
            </div>
        </div>
       
    )

}