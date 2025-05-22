"use client"
import {useState, Dispatch, SetStateAction, RefObject, useEffect} from 'react'
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked, MdClose, MdCrop } from "react-icons/md";
import { FaFileVideo,FaFileImage } from "react-icons/fa";
import {useTranslations} from 'next-intl';
import Cropper from 'react-easy-crop'

type CroppedArea = {
        x: number;
        y: number;
        width: number;
        height: number;
        };

export default function PostPhotoUpload ({mainImage, image2, image3, image4, handlePickImage, imageRatioModal, handleOpenImageRatioModal, setImageRatioModal, 
    mainImageAspectRatio, image2AspectRatio, image3AspectRatio, image4AspectRatio, setMainImage, setImage4, setImage2, setImage3, handleRemoveImage, mainImageError,
    selectedImageUrl, onCropDone, setSelectedImageUrl, mainImageFocus, image2Focus, image3Focus, image4Focus, mainImageRef, image2Ref, image3Ref, image4Ref,
    modalOpen, setModalOpen
 }: {mainImage: string, image2: string, image3: string, image4: string, handlePickImage: (item: React.ChangeEvent<HTMLInputElement>) => void, imageRatioModal: boolean, 
        setImageRatioModal: Dispatch<SetStateAction<boolean>>, handleOpenImageRatioModal: (item: string) => void, mainImageAspectRatio: string,
    image2AspectRatio: string, image3AspectRatio: string, image4AspectRatio: string, setMainImage: Dispatch<SetStateAction<string>>, 
    setImage4: Dispatch<SetStateAction<string>>, setImage2: Dispatch<SetStateAction<string>>, setImage3: Dispatch<SetStateAction<string>>, mainImageError: boolean,
    handleRemoveImage: (item: string) => void, selectedImageUrl: string | ArrayBuffer | null, 
    onCropDone: (imgCroppedArea: CroppedArea, imageType: string, aspectRatio: number) => void, setSelectedImageUrl: Dispatch<SetStateAction<string | ArrayBuffer | null>>,
    mainImageFocus: ()=> void, image2Focus: ()=> void, image3Focus: () => void, image4Focus: () => void, mainImageRef: RefObject<HTMLInputElement | null>, 
    image2Ref: RefObject<HTMLInputElement | null>, image3Ref: RefObject<HTMLInputElement | null>, image4Ref: RefObject<HTMLInputElement| null>, modalOpen: boolean, 
    setModalOpen: Dispatch<SetStateAction<boolean>>  }) {

        type Area = {
            x: number;
            y: number;
            width: number;
            height: number;
            };

        const t = useTranslations()
        const [crop, setCrop] = useState({x:0, y:0})

        const [zoom, setZoom] = useState(1)
        const [aspectRatio, setAspectRatio] = useState(16/10)
        const [croppedArea, setCroppedArea] = useState<CroppedArea>()
        const [imageType, setImageType] = useState('')
        //const [modalOpen, setModalOpen] = useState<boolean>(false)

        const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
            setCroppedArea(croppedAreaPixels)
            
        }



    return(
        <div className='w-full h-full items-center flex flex-col'>
            {modalOpen ? 
            <div className='w-11/12 bg-white max-w-3xl h-4/6 border-2 flex z-40 border-black flex-col items-center absolute mt-10'>
                <div className='w-full flex items-center justify-between flex-row p-2'>
                    <div></div>
                    <div className='cursor-pointer' onClick={()=> {setModalOpen(false); setSelectedImageUrl('')}}><MdClose size={20} color="black" /></div>

                </div>
                <div className=' w-full h-full flex flex-col items-center '>
                    <div className=' w-11/12   items-center flex flex-col '>
                    <Cropper image={typeof selectedImageUrl === 'string' ? selectedImageUrl : undefined}
                    aspect={aspectRatio}
                    zoom={zoom}
                    crop={crop} 
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                        containerStyle: {
                            width: '100%',
                            height: '80%',
                            backgroundColor: '#fff',
                            marginTop: 40,
                            borderRadius: 10
                            
                        }
                    }}/>
                        
                        <div className='flex items-center z-20 flex-col absolute bottom-1 justify-center w-7/12 max-w-sm ' >
                        <div className=' mb-2 w-full flex flex-row items-center justify-center'  >
                            
                            
                            
                                {aspectRatio === 16/10 ? 
                                <div className='border px-1 border-cyan-400 w-16 flex items-center justify-center cursor-pointer' onClick={()=> {setAspectRatio(Number(16)/Number(10)); console.log(aspectRatio)}}>
                                    
                                    <div className='text-sm text-black '>16:10 </div>
                                </div>:
                                <div className='border px-1  w-16 flex items-center justify-center cursor-pointer' onClick={()=> {setAspectRatio(Number(16)/Number(10)); console.log(aspectRatio)}}>
                                    
                                    <div className='text-sm text-black '>16:10 </div>
                                </div>}
                                {aspectRatio === 1/1 ? 
                                <div className='border ml-5 px-1 border-cyan-400 w-16 flex cursor-pointer items-center justify-center' onClick={()=> {setAspectRatio(Number(1)/Number(1)); console.log(aspectRatio)}}>
                                    <div className='text-sm text-black'>1:1 </div>
                                </div>:
                                <div className='border ml-5 px-1  w-16 flex cursor-pointer items-center justify-center' onClick={()=> {setAspectRatio(Number(1)/Number(1)); console.log(aspectRatio)}}>
                                    <div className='text-sm text-black'>1:1 </div>
                                </div>}
                                {aspectRatio === 24/36 ? 
                                <div className='border ml-5 px-1 border-cyan-400 w-16 cursor-pointer flex items-center justify-center' onClick={()=> {setAspectRatio(Number(24)/Number(36)); console.log(aspectRatio)}}>
                                    <div className='text-sm text-black'>24:36</div>
                                </div>:
                                <div className='border ml-5 px-1  w-16 flex items-center justify-center cursor-pointer' onClick={()=> {setAspectRatio(Number(24)/Number(36)); console.log(aspectRatio)}}>
                                    <div className='text-sm text-black'>24:36</div>
                                </div>}
                            
                        </div>
                            <div className='w-full flex items-center justify-center w-full' onClick={()=> onCropDone(croppedArea!, imageType, aspectRatio)}>
                                <div className='  flex items-center  cursor-pointer w-full'>
                                    <div className=' p-2 flex w-3/12 items-center rounded-l-md  bg-black justify-center h-10'>
                                        <div>
                                            <MdCrop color='white' size={20} />
                                        </div>
                                        
                                    </div>
                                    <div className='text-black  w-full flex items-center bg-cyan-400 justify-center font-bold rounded-r-md p-1 h-10'>
                                        Crop
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>: null}
            <input ref={mainImageRef} className=" border-2 rounded-md p-1 mt-1 invisible absolute" type="file" accept="image/*" onClick={()=>{mainImageFocus(); setImageType('mainImage')}} onChange={handlePickImage}></input> 
            <input ref={image2Ref} className=" border-2 rounded-md p-1 mt-1 invisible absolute" type="file" accept="image/*" onClick={()=>{setImageType('image2'); image2Focus()}} onChange={handlePickImage}></input>  
            <input ref={image3Ref} className=" border-2 rounded-md p-1 mt-1 invisible absolute" type="file" accept="image/*" onClick={()=>{image3Focus(); setImageType('image3')}} onChange={handlePickImage}></input>  
            <input ref={image4Ref} className=" border-2 rounded-md p-1 mt-1 invisible absolute" type="file" accept="image/*" onClick={()=>{image4Focus(); setImageType('image4')}} onChange={handlePickImage}></input>   
            <div className='w-11/12 border h-60 md:h-70 max-w-md mt-5'>  
            {mainImage ?
                <div className=" flex w-full relative  h-full items-center flex-col border-blue-700"   style={{backgroundImage: 'url(' + `${mainImage}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                        <div className='absolute w-11/12 flex flex-row items-center z-30 justify-between mt-3'>
                            <div></div>
                            <div>
                                <div className='bg-white border border-black cursor-pointer' onClick={()=> handleRemoveImage('mainImage')}><MdClose size={24} color={ "black"} /></div>
                            </div>    
                        </div>
                            
                
                    {mainImageAspectRatio === 'b' ? 
                        <div className=' z-20 flex items-center justify-center mt-10 absolute '> 
                            <div className='md:h-44 md:w-44 h-40 w-40 rounded-md border rounded-md'  style={{backgroundImage: 'url(' + `${mainImage}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                        </div>: null}
                    {mainImageAspectRatio === 'c' ? 
                        <div className=' z-20 flex items-center justify-center mt-5 absolute '>
                            <div className='h-52 w-36 rounded-md border rounded-md' style={{backgroundImage: 'url(' + `${mainImage}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                        </div>: null}
                    {mainImageAspectRatio === 'a' ? null: 
                        <div className=' z-0 backdrop-blur-sm  w-full h-full  '>
                            
                            
                        </div>}
                </div> 
                
                    : 
                    <div className='flex flex-col items-center cursor-pointer justify-center border h-full' onClick={()=>{mainImageFocus(); setImageType('mainImage')}} >
                        <div className='text-black'>{t('mainimage')}</div>
                        <div className='text-sm text-gray-400'>{`(${t('required')})`}</div>
                        <div className='mt-2'>
                            <FaFileImage size={30} color='black' />
                        </div>
                    </div>}
                </div>
                {mainImageError ? <div>{`${t('mainimage')} ${t('required')}`}</div>: <div></div>}
                <div className='w-11/12 border  border h-60 md:h-70  max-w-md mt-5'>
                    {image2 ? 
                    <div className=" flex w-full relative  h-full items-center   flex-col border-blue-700"   style={{backgroundImage: 'url(' + `${image2}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                        <div className='absolute w-11/12 flex flex-row items-center z-30 justify-between mt-3'>
                            <div></div>
                            <div>
                                <div className='bg-white border border-black cursor-pointer' onClick={()=> handleRemoveImage('image2')}><MdClose size={24} color={ "black"} /></div>
                            </div>    
                        </div>
                        {image2AspectRatio === 'b' ? 
                            <div className=' z-20 flex items-center justify-center mt-10 absolute '>
                                <div className='md:h-44 md:w-44 h-40 w-40  rounded-md border rounded-md' style={{backgroundImage: 'url(' + `${image2}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                                    
                                    
                                </div>  
                                
                            </div>: null}
                        {image2AspectRatio === 'c' ? 
                            <div className=' z-20 flex items-center justify-center mt-5 absolute '>
                                <div className='h-52 w-36 rounded-md border rounded-md' style={{backgroundImage: 'url(' + `${image2}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                            </div>: null}
                        {image2AspectRatio === 'a' ? null: 
                        <div className=' z-0 backdrop-blur-sm  w-full h-full  '>
                            
                            
                        </div>}
                    </div> 
                    
                    : 
                    <div className='flex flex-col items-center justify-center cursor-pointer border h-full' onClick={()=>{image2Focus(); setImageType('image2')}} >
                        <div className='text-black'>{`${t('image')} 2`}</div>
                        <div className='text-sm text-gray-400'>{`(${t('optional')})`}</div>
                        <div className='mt-2'>
                            <FaFileImage size={30} color='black' />
                        </div>
                    </div>}
                </div>
                <div className='w-11/12 border border h-60 md:h-70 max-w-md mt-5'>
                    {image3 ? 
                    <div className=" flex w-full relative  h-full items-center   flex-col border-blue-700"   style={{backgroundImage: 'url(' + `${image3}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                        <div className='absolute w-11/12 flex flex-row items-center z-30 justify-between mt-3'>
                            <div></div>
                            <div>
                                <div className='bg-white border border-black cursor-pointer' onClick={()=> handleRemoveImage('image3')}><MdClose size={24} color={ "black"} /></div>
                            </div>    
                        </div>
                        
                        {image3AspectRatio === 'b' ? 
                            <div className=' z-20 flex items-center justify-center mt-5 absolute '> 
                                <div className='h-44 w-44 rounded-md border rounded-md' style={{backgroundImage: 'url(' + `${image3}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                            </div>: null}
                        {image3AspectRatio === 'c' ? 
                            <div className=' z-20 flex items-center justify-center mt-5 absolute '>
                                <div className='h-52 w-36 rounded-md border rounded-md'  style={{backgroundImage: 'url(' + `${image3}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                            </div>: null}
                        {image3AspectRatio === 'a' ? null: 
                        <div className=' z-0 backdrop-blur-sm  w-full h-full  '>
                            
                            
                        </div>}
                    </div>
                    : 
                    <div className='flex flex-col items-center cursor-pointer justify-center border h-full' onClick={()=>{image3Focus(); setImageType('image3')}} >
                        <div className='text-black'>{`${t('image')} 3`}</div>
                        <div className='text-sm text-gray-400'>{`(${t('optional')})`}</div>
                        <div className='mt-2'>
                            <FaFileImage size={30} color='black' />
                        </div>
                    </div>
                    }
                </div>
                <div className='w-11/12 border h-48 md:h-70  max-w-md mt-5'>
                    {image4 ? 
                    <div className=" flex w-full relative  h-full items-center   flex-col border-blue-700"   style={{backgroundImage: 'url(' + `${image4}` + ')', backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat', overflow: 'hidden'}}>
                        <div className='absolute w-11/12 flex flex-row items-center z-30 justify-between mt-3'>
                            <div></div>
                            <div>
                                <div className='bg-white border border-black cursor-pointer' onClick={()=> handleRemoveImage('image4')}><MdClose size={24} color={ "black"} /></div>
                            </div>    
                        </div>
                       
                        {image4AspectRatio === 'b' ? 
                            <div className=' z-20 flex items-center justify-center mt-5 absolute '>
        
                                <div className='h-44 w-44 rounded-md border rounded-md' style={{backgroundImage: 'url(' + `${image4}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}}></div>
                            </div>: null}
                        {image4AspectRatio === 'c' ? 
                            <div className=' z-20 flex items-center justify-center mt-5 absolute '>
                                <div className='h-52 w-36 rounded-md border rounded-md' style={{backgroundImage: 'url(' + `${image4}` + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overflow: 'hidden'}} ></div>
                            </div>: null}
                        {image4AspectRatio === 'a' ? null: 
                        <div className=' z-0 backdrop-blur-sm  w-full h-full  '>
                            
                            
                        </div>}
                    </div>
                    : 
                    <div className='flex flex-col items-center cursor-pointer justify-center border h-full' onClick={()=>{image4Focus(); setImageType('image4')}} >
                        <div className='text-black'>{`${t('image')} 4`}</div>
                        <div className='text-sm text-gray-400'>{`(${t('optional')})`}</div>
                        <div className='mt-2'>
                            <FaFileImage size={30} color='black' />
                        </div>
                    </div>
                }
            </div>
        
           
        </div>
    )
}