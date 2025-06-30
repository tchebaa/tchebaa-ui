"use client"

import {useState, useEffect} from 'react'

import Link from 'next/link';
import ComponentHeader from '../../components/ComponentHeader';
import {useAdmin} from '../../context/TchebaaAdminContext'
import {useUser} from '../../context/UserContext'
import { uploadData, getUrl } from '@aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import moment from 'moment';
import { MdClose,  MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import FooterComponent from '../../components/FooterComponent';

Amplify.configure(outputs)

const client = generateClient<Schema>({
  authMode: 'apiKey',
});






export default function AllAdmins() {

    const t = useTranslations()
    const [pageType, setPageType] = useState<string>(t('alladministrators'))
    const {admins, handleGetAdmins, loadingAdmins} = useAdmin()
    const {userDetails} = useUser()
    

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<boolean>(false)
    const [adminName, setAdminName] = useState<string>('')
    const [adminNameError, setAdminNameError] = useState<boolean>(false)
    const [adminMode, setAdminMode] = useState<string>('add')
    const [adminId, setAdminId] = useState<string>('')

    const [postEventPermissions, setPostEventPermissions] = useState<boolean>(true)
    const [deleteEventPermissions, setDeleteEventPermissions] = useState<boolean>(true)
    const [editEventPermissions, setEditEventPermissions] = useState<boolean>(true)
    const [ticketCancelPermissions, setTicketCancelPermissions] = useState<boolean>(true)
    const [chatPermissions, setChatPermissions] = useState<boolean>(true)
    const [addAdminPermissions, setAddAdminPermissions] = useState<boolean>(true)
    const [editAdminPermissions, setEditAdminPermissions] = useState<boolean>(true)
    const [deleteAdminPermissions, setDeleteAdminPermissions] = useState<boolean>(true)

    const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    const [loadingAddAdmin, setLoadingAddAdmin] = useState<boolean>(false)
    const [loadingDeleteAdmin, setLoadingDeleteAdmin] = useState<boolean>(false)
    const [deleteAdminError, setDeleteAdminError] = useState<boolean>(false)
    const [addAdminError, setAddAdminError] = useState<boolean>(false)

   


    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

    interface IAdmin {
        id?: string;
        email?:string;
        adminName?:string;
        postEventPermissions?: boolean;
        deleteEventPermissions?:boolean;
        editEventPermissions?:boolean;
        ticketCancelPermissions?:boolean;
        chatPermissions?:boolean;
        addAdminPermissions?: boolean;
        editAdminPermissions?: boolean;
        deleteAdminPermissions?: boolean;
      }

    const handleAddAdmin = async () => {


        if(email.length > 1) {


            setEmailError(false)


            if(adminName.length > 1) {

                setAdminNameError(false)

                setLoadingAddAdmin(true)
                setAddAdminError(false)

                try{

                    const { data, errors } = await client.models.Admin.create({
                        email: email,
                        adminName: adminName,
                        postEventPermissions: postEventPermissions,
                        deleteEventPermissions: deleteEventPermissions,
                        ticketCancelPermissions: ticketCancelPermissions,
                        addAdminPermissions: addAdminPermissions,
                        editAdminPermissions: editAdminPermissions,
                        deleteAdminPermissions: deleteAdminPermissions,
                        chatPermissions: chatPermissions,
                        editEventPermissions: editAdminPermissions
                    })
    
                    setLoadingAddAdmin(false)
                    setOpenAddAdmin(false)
                    handleGetAdmins()
        
                } catch(e) {
    
                    setAddAdminError(true)
                    setLoadingAddAdmin(false)
        
                }

            } else {
                setAdminNameError(true)
            }

            
            

        } else {

            
            setEmailError(true)

        }


        

    }


    const handleEditAdmin = async () => {

        if(email.length > 1) {


            setEmailError(false)


            if(adminName.length > 1) {

                setAdminNameError(false)

                setLoadingAddAdmin(true)
                setAddAdminError(false)

                try{

                    const { data, errors } = await client.models.Admin.update({
                        id: adminId,
                        email: email,
                        adminName: adminName,
                        postEventPermissions: postEventPermissions,
                        deleteEventPermissions: deleteEventPermissions,
                        ticketCancelPermissions: ticketCancelPermissions,
                        addAdminPermissions: addAdminPermissions,
                        editAdminPermissions: editAdminPermissions,
                        deleteAdminPermissions: deleteAdminPermissions,
                        chatPermissions: chatPermissions,
                        editEventPermissions: editAdminPermissions
                    })
    
                    setLoadingAddAdmin(false)
                    setOpenAddAdmin(false)
                    handleGetAdmins()
        
                } catch(e) {
    
                    setAddAdminError(true)
                    setLoadingAddAdmin(false)
        
                }

            } else {
                setAdminNameError(true)
            }

            
            

        } else {

            
            setEmailError(true)

        }


    }

    const handleDeleteAdmin = async () => {

        setLoadingDeleteAdmin(true)
        setDeleteAdminError(false)

        try{

            const { data, errors } = await client.models.Admin.delete({
                id: adminId
            })

            setLoadingDeleteAdmin(false)
            setOpenDeleteModal(false)
            setAdminId('')
            setEmail('')
            setAdminName('')
            handleGetAdmins()

        } catch(e) {

            setDeleteAdminError(true)
            setLoadingDeleteAdmin(false)
            setOpenDeleteModal(false)

        }
    }


    const handleOpenAdminEdit = (item: IAdmin) => {


        setOpenDeleteModal(false)
        setAdminId(item.id ?? '')
        setAdminMode('edit')
        setEmail(item.email ?? '')
        setAdminName(item.adminName ?? '')
        setPostEventPermissions(item.postEventPermissions ?? true)
        setDeleteEventPermissions(item.deleteEventPermissions ?? true)
        setTicketCancelPermissions(item.ticketCancelPermissions ?? true)
        setAddAdminPermissions(item.addAdminPermissions ?? true)
        setEditAdminPermissions(item.editAdminPermissions ?? true)
        setChatPermissions(item.chatPermissions ?? true)
        setDeleteAdminPermissions(item.deleteAdminPermissions ?? true)
        setEditEventPermissions(item.editAdminPermissions ?? true)

        setOpenAddAdmin(true)

    }

    const handleCloseAddAdminModal = () => {

        setAdminMode('add')
        setAdminId('')
        setEmail('')
        setAdminName('')
        setPostEventPermissions(true)
        setDeleteEventPermissions(true)
        setTicketCancelPermissions(true)
        setAddAdminPermissions(true)
        setEditAdminPermissions(true)
        setChatPermissions(true)
        setDeleteAdminPermissions(true)
        setEditEventPermissions(true)
        setOpenAddAdmin(false)

    }

    const handleOpenDeleteModal = (item: IAdmin) => {

        setOpenAddAdmin(false)
        setOpenDeleteModal(true)
        setAdminId(item.id ?? ''),
        setAdminName(item.adminName ?? '')
        setEmail(item.email ?? '')
        
    }

    const handleCloseDeleteModal = () => {

        setOpenDeleteModal(false)
        setEmail('')
        setAdminName('')
        setAdminId('')
    }


  

  return (
    <div>
        <ComponentHeader category='allAdmins' id={''} item={null}/>
        <div className='w-full flex flex-col items-center min-h-screen pt-20'>
            
            {admin?.addAdminPermissions ? 
            <div >
                <div className='border  rounded-md p-1 cursor-pointer' onClick={()=> {setOpenAddAdmin(true); setOpenDeleteModal(false)}}>
                    <div className='font-semibold text-black'>{t('addadministrator')}</div>
                </div>
            </div>: null}
            {openDeleteModal ? 
            <div className='border absolute bg-white z-10 p-5 w-11/12 flex flex-col items-center max-w-sm'>

                <div className='w-full items-center flex flex-row justify-between' >
                    <div></div>
                    <div className='cursor-pointer' onClick={()=> handleCloseDeleteModal()}><MdClose size={24} color={"black"}  /></div>
                </div>
                <div className='text-black font-semibold'>{t('delete')}</div>
                <div className='mt-1 text-black font-semibold'>{adminName}</div>
                <div className='mt-1 text-black font-semibold'>{email}</div>
                {loadingDeleteAdmin ? 
                <div className='border w-full flex flex-col items-center p-5 absolute bg-white'>
                    <div className='text-black font-semibold'>{t('deleting')}</div>
                    
                </div>
                :
                null}
                
                <div className='border flex flex-col items-center mt-4 p-1 rounded-md border-cyan-500 cursor-pointer w-full'>
                    {loadingDeleteAdmin ? 
                    <div  >
                        <div className='text-black font-semibold'>{t('delete')}</div>
                    </div>:
                    <div  onClick={()=> handleDeleteAdmin()}>
                        <div className='text-black font-semibold'>{t('delete')}</div>
                    </div>}
                </div>

            </div>
            : null}
           { openAddAdmin ? 
            <div className='border absolute bg-white z-10 p-5 w-11/12 flex flex-col items-center'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <div></div>
                    <div className='cursor-pointer' onClick={()=> handleCloseAddAdminModal()}><MdClose size={24} color={ "black"}  /></div>
                </div>
                {loadingAddAdmin ? 
                <div className='flex flex-col w-11/12 items-center border rounded-md p-5 absolute bg-white'>
                  
                    {adminMode === 'add' ? <div className='text-black font-semibold'>{t('uploading')}</div>
                    : <div className='text-black font-semibold'>{t('update')}</div>}
                </div>
                :
                null}
                <input className='border w-full p-2 mt-2 text-black' placeholder={t('email')} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                {emailError ? <div className='text-red-500'>{t('emailrequired')}</div>: null}
                <input className='border w-full p-2 mt-2 text-black' placeholder={t('name')}  value={adminName} onChange={(e)=> setAdminName(e.target.value)}/>
                {adminNameError ? <div className='text-red-500'>{t('nameisrequired')}</div>: null}
                <div className='mt-2 w-full'>
                        <div className='flex flex-row items-center cursor-pointer'  onClick={()=> setPostEventPermissions(!postEventPermissions)}>
                            {postEventPermissions ?
                                <MdOutlineRadioButtonChecked  size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked  size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('postpermissions')}</div>
                            
                        </div>
                        <div className='flex flex-row items-center cursor-pointer' onClick={()=> setDeleteEventPermissions(!deleteEventPermissions)}>
                            {deleteEventPermissions ?
                                <MdOutlineRadioButtonChecked  size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked  size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('deleteeventpermissions')}</div>
                            
                        </div>
                        <div className='flex flex-row items-center cursor-pointer' onClick={()=> setEditEventPermissions(!editEventPermissions)}>
                            {editEventPermissions ?
                                <MdOutlineRadioButtonChecked size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('editeventpermissions')}</div>
                            
                        </div>
                        <div className='flex flex-row items-center cursor-pointer'  onClick={()=> setTicketCancelPermissions(!ticketCancelPermissions)}>
                            {ticketCancelPermissions ?
                                <MdOutlineRadioButtonChecked size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('ticketcancelpermissions')}</div>
                            
                        </div>
                        <div className='flex flex-row items-center cursor-pointer' onClick={()=> setChatPermissions(!chatPermissions)}>
                            {chatPermissions ?
                                <MdOutlineRadioButtonChecked  size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('chatpermissions')}</div>
                            
                        </div>
                        <div className='flex flex-row items-center cursor-pointer' onClick={()=> setAddAdminPermissions(!addAdminPermissions)}>
                            {addAdminPermissions ?
                                <MdOutlineRadioButtonChecked  size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('addadminpermissions')}</div>
                            
                        </div>
                        <div className='flex flex-row items-center cursor-pointer' onClick={()=> setEditAdminPermissions(!editAdminPermissions)}>
                            {editAdminPermissions ?
                                <MdOutlineRadioButtonChecked size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('editadminpermissions')}</div>
                            
                        </div>
                        <div className='flex flex-row items-center cursor-pointer' onClick={()=> setDeleteAdminPermissions(!deleteAdminPermissions)}>
                            {deleteAdminPermissions ?
                                <MdOutlineRadioButtonChecked size={16} color={'#1184e8'}/>
                                :
                            <MdOutlineRadioButtonUnchecked  size={16} color={ "black"}/>}
                            <div className='text-black ml-1 mt-1 '>{t('deleteadminpermissions')}</div>
                            
                        </div>
                       {adminMode === 'add' ? 
                        <div className='border flex flex-col items-center mt-2 py-1 rounded-md border-cyan-500 cursor-pointer'>
                            {loadingAddAdmin ? 
                            <div >
                                <div className='text-black font-semibold'>{t('addadministrator')}</div>
                            </div>:
                            <div onClick={()=> handleAddAdmin()}>
                                <div className='text-black font-semibold'>{t('addadministrator')}</div>
                            </div>}
                        </div>
                        :
                        <div className='border flex flex-col items-center mt-2 py-1 rounded-md border-cyan-500 cursor-pointer'>
                            {loadingAddAdmin ? 
                            <div  >
                                <div className='text-black font-semibold'>{t('update')}</div>
                            </div>:
                            <div onClick={()=> handleEditAdmin()}>
                                <div className='text-black font-semibold'>{t('update')}</div>
                            </div>}
                        </div>}
                </div>
            </div>: null}
            <div className='w-full flex flex-col items-center'>
                {loadingAdmins ? 
                <div className='text-black font-semibold'>{t('loading')}</div>:
                <div className='flex flex-col md:flex-row flex-wrap w-11/12  max-w-7xl  items-center md:items-start  '>
                    {admins?.map((item, i)=> {
                        return(
                            
                            <div key={i} className='border w-full max-w-sm md:m-2 p-5 my-1'>
                                <div className='text-black font-semibold text-lg'>{item.adminName}</div>
                                <div className='font-semibold text-black'>{item.email}</div>
                                <div className='flex flex-row items-center justify-between mt-2'>
                                    <div className='border rounded-md px-1 cursor-pointer ' onClick={()=> handleOpenAdminEdit(item)}>
                                        <div className=' text-black '>{t('edit')}</div>
                                    </div>
                                    <div className='border  rounded-md px-1 cursor-pointer'  onClick={()=> handleOpenDeleteModal(item)}>
                                        <div className=' text-black '>{t('delete')}</div>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
                }
            </div>
        </div>
        <FooterComponent/>
    </div>
  );
}