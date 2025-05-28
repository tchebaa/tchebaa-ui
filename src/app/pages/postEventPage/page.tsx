"use client"

import {useEffect, useState, useRef, use} from 'react'
import { MdOutlineNightlife, MdTravelExplore, MdOutlineKayaking, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import {signIn, getCurrentUser} from '@aws-amplify/auth'
import Link from 'next/link'
import {useRouter, useSearchParams} from 'next/navigation'
import {useUser} from '../../context/UserContext'
import { uploadData, getUrl } from '@aws-amplify/storage';
import {useLoadScript, useJsApiLoader,  Libraries} from '@react-google-maps/api'
import moment from 'moment';
import PostEventPerson from '../../components/PostEventPerson';
import PostLocationNameDetails from '../../components/PostLocationNameDetails';
import {useLocation} from '../../context/LocationContext';
import PostEventCategories from '../../components/PostEventCategories';
import PostAgeRestriction from '../../components/PostAgeRestriction';
import PostPhotoUpload from '../../components/PostPhotoUpload';
import PostEventPreview from '../../components/PostEventPreview';
import PostDateTimeDuration from '../../components/PostDateTimeDuration';
import Header from '../../components/Header';
import LoginModal from '../../components/LoginModal';
import SignUpModal from '../../components/SignUpModal';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';
import ConfirmAccountModal from '../../components/ConfirmAccountModal';




Amplify.configure(outputs)

const client = generateClient<Schema>();




export default function PostEventPage() {


    const libraries: Libraries = ['places'];

    const t = useTranslations()


    
    const searchParams = useSearchParams();
    const screenName = searchParams.get('screenName');
    const id = searchParams.get('id');
    const {userDetails} = useUser()
    const router = useRouter()
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    

    const [newScreenName, setNewScreenName] = useState<string | string [] >(screenName ?? "")

    const [headerPage, setHeaderPage] = useState('home')
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [menuModalVisible, setMenuModalVisible] = useState(false)
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [signUpModal, setSignUpModal] = useState<boolean>(false)
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false)

    const [loadingGetEvent, setLoadingGetEvent] = useState<boolean>(false)
    const [loadingEventError, setLoadingEventError] = useState<string>('')
    const [email, setEmail] = useState<string>(screenName === 'post' ? userDetails?.username ?? '' : 'rani')
    const [emailError, setEmailError] = useState<boolean>(false)
    const [sponsored, setSponsord] = useState<boolean>(false)

    const [pageSection, setPageSection] = useState<number>(0)

    const [pageType, setPageType] = useState<string | string[]>(screenName ?? '');

    const [personType, setPersonType] = useState<boolean>(true)
    const [companyName, setCompanyName] = useState<string>('')
    const [personName, setPersonName] = useState<string>('')
    const [companyNameError, setCompanyNameError] = useState<boolean>(false)
    const [personNameError, setPersonNameError] = useState<boolean>(false)
    const [companyEmail, setCompanyEmail] = useState<string>('')
    const [companyEmailError, setCompanyEmailError] = useState<boolean>(false)
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null | ArrayBuffer>('')


    

    const [selectedCategories, setSelectedCategories] = useState< string []>([])
    const [categoriesError, setCategoriesError] = useState<boolean>(false)

    const [eventName, setEventName] = useState<string>('')
    const [eventNameError, setEventNameError] = useState<boolean>(false)
    const [eventDescription, setEventDescription] = useState<string>('')
    const [eventDescriptionError, setEventDescriptionError] = useState<boolean>(false)
    const [address, setAddress] = useState<string>('')
    const [eventAddressError, setEventAddressError] = useState<boolean>(false)
    const [coordinates, setCoordinates] = useState<{latitude: number, longitude: number} | null>(null)
    const [site, setSite] = useState<boolean>(false)



    const [ageRestriction, setAgeRestriction] = useState<string []>([])


    const [dateTimePrice, setDateTimePrice] = useState<string []>([])
    const [dateTimePriceError, setDateTimePriceError] = useState<boolean>(false)

    const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('a')
    const [selectedImage, setSelectedImage] = useState<string>('')
    const [mainImage, setMainImage] = useState<string>('')
    const [mainImagePath, setMainImagePath] = useState<string>('')
    const [mainImageBlob, setMainImageBlob] = useState<string | null>(null)
    const [mainImageError, setMainImageError] = useState<boolean>(false)
    const [image2, setImage2] = useState<string>('')
    const [image2Path, setImage2Path] = useState<string>('')
    const [image2Bolb, setImage2Blob] = useState<string | null>(null)
    const [image3, setImage3] = useState<string>('')
    const [image3Path, setImage3Path] = useState<string>('')
    const [image3Bolb, setImage3Blob] = useState<string | null>(null)
    const [image4, setImage4] = useState<string>('')
    const [image4Path, setImage4Path] = useState<string>('')
    const [image4Bolb, setImage4Blob] = useState<string | null>(null)
    const [mainImageAspectRatio, setMainImageAspectRatio] = useState<string>('')
    const [image2AspectRatio, setImage2AspectRatio] = useState<string>('')
    const [image3AspectRatio, setImage3AspectRatio] = useState<string>('')
    const [image4AspectRatio, setImage4AspectRatio] = useState<string>('')
    const [imageRatioModal, setImageRatioModal] = useState<boolean>(false)
    const [imageName, setImageName] = useState<string>('')

    const [uploadError, setUploadError] = useState<string>('')
    const [uploadPercent, setUploadPercent] = useState<number>(0)
    const [uploadingDetail, setUploadingDetail] = useState<string>('')
    const [uploadLoading, setUploadLoading] = useState<boolean>(false)


    const [modalOpen, setModalOpen] = useState(false)


   const [mainImageUrl, setMainImageUrl] = useState('')
   const [image2Url, setImage2Url] = useState('')
   const [image3Url, setImage3Url] = useState('')
   const [image4Url, setImage4Url] = useState('')
  

   const [mainImageSelectError, setMainImageSelectError] = useState(false)



   const mainImageRef = useRef<HTMLInputElement | null>(null);
   const image2Ref = useRef<HTMLInputElement | null>(null)
   const image3Ref = useRef<HTMLInputElement | null>(null)
   const image4Ref = useRef<HTMLInputElement | null>(null)



   const [uploadProgress, setUploadProgress] = useState<number>(0)
   const [uploadModal, setUploadModal] = useState<boolean>(false)
   const [uploadingText, setUploadingText] = useState<string>('')



   const profileImages = [
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion9.png?alt=media&token=dcdcaf03-d213-4c5b-a4b7-52cd37cb558b',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion8.png?alt=media&token=0559c698-035d-412b-9687-8f961c39b69f',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion7.png?alt=media&token=5ec2748a-5311-4ada-b3a6-5cb1f6859611',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion6.png?alt=media&token=b2d31fcc-f3f4-4a1c-9b95-b45316192bd3',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion5.png?alt=media&token=05aedc60-e0c5-4a98-b807-debfd0388c62',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion4.png?alt=media&token=d38b737b-fdd8-4034-84c4-253a40fe864d',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion11.png?alt=media&token=2b514675-4a19-44a0-ac62-6c84ffa16a95',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion10.png?alt=media&token=963ae009-cf0c-4ecd-a2f3-fe5e59d217cc',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion1-min.png?alt=media&token=482e9003-2f8b-4a81-a94b-e8ea45783ec7',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion14.png?alt=media&token=260caada-2930-4ad5-9213-f3cde33bf004',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion15.png?alt=media&token=a63c9238-755c-47ac-9d8d-271a9528b6d1',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion16.png?alt=media&token=c692f9f8-e084-4062-a005-0732fdcfb10e',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion17.png?alt=media&token=861a7fa5-0a28-49c5-aefe-e49e9af02574',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion18.png?alt=media&token=aa57eb71-88ba-493d-b38b-d10f455c95be',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion19.png?alt=media&token=056fa70b-8966-4783-aac9-3a5f10850a21',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion20.png?alt=media&token=fa985924-72ff-45fb-9b51-a987c3f16a63',
    'https://firebasestorage.googleapis.com/v0/b/tukiofusion.appspot.com/o/fusion21.png?alt=media&token=ba151e1f-efe7-480b-a680-38f2713ffdcd'
]



    type CroppedArea = {
        x: number;
        y: number;
        width: number;
        height: number;
        };


       //Events Categories List

       const eventsCategories = [
        {
        title: t('education'),
        name:'education'},
        {
        title: t('music'),
        name:'music'},
        {
       
        title: t('nightparty'),
        name:'night'},
        {
        
        title: t('entertainment'),
        name: 'entertainment'},
        {
        
        title: t('markets'),
        name: 'markets'},
        {
        
        title: t('performancevisuals'),
        name: 'visuals'},
        {
        
        title: t('photography'),
        name:'photography'},
        {
        title: t('softwaretech'),
        name: 'software'},
        {
        title: t('informationtechnology'),
        name: 'informationtechnology'},
        {
        title: t('health'),
        name:'health'},
        {
        title: t('hospitalsandclinics'),
        name:'hospital'},
        {
        title: t('pharmacy'),
        name:'pharmacy'},
        {
         
        title: t('fooddrink'),
        name:'food'},
        {
        
        title: t('business'),
        name:'business'},
        {
        
        title: t('sportsfitness'),
        name:'sports'},
        {
        
        title: t('traveltourism'),
        name:'travel'},
        {
         
        title: t('agriculture'),
        name:'agriculture'},
        {
         
        title: t('environment'),
        name:'environment'},
        {
         
        title: t('charityfundraising'),
        name:'charity'},
        {
         
        title: t('religionspirituality'),
        name:'religion'},
        {
         
        title: t('outdooractivities'),
        name:'outdoor'},
        {
         
        title: t('art'),
        name: 'art'},
        {
        
        title: t('gamesesports'),
        name: 'game'},
        {
         
        title: t('engineering'),
        name:'engineering'},
    ]

    const eventData = {
                id:id ?? '',
                eventName: eventName,
                eventDescription: eventDescription,
                email: email,
                sponsored: sponsored,
                personType: personType,
                personName: personName,
                site: site,
                companyEmail: companyEmail,
                companyName: companyName,
                eventMainImage: {
                    aspectRatio: mainImageAspectRatio,
                    url: mainImage
                },
                eventImage2: {
                    aspectRatio: image2AspectRatio,
                    url: image2
                },
                eventImage3: {
                    aspectRatio: image3AspectRatio,
                    url: image3
                },
                eventImage4: {
                    aspectRatio: image4AspectRatio,
                    url: image4
                },
                dateTimePriceList: dateTimePrice.map((item)=> {
                    return JSON.parse(item)
                }),
                ageRestriction: ageRestriction,
                categories: selectedCategories,
                eventAddress: address,
                location:{
                    type: "Point",
                    coordinates: [Number(coordinates?.longitude), Number(coordinates?.latitude)]
                }
                
              }




useEffect(()=> {
    //console.log(dashboard, 'dashboard')
},[])

const handleGetEvent = async () => {

        try {

            setLoadingGetEvent(true)


            if(id) {

                const { data, errors } = await client.models.Event.get({
                id: id,
              });


               setPersonType(data?.personType ?? false)
              setEmail(data?.email ?? '')
              setSponsord(data?.sponsored ?? false)
              setEventName(data?.eventName ?? '')
              setEventDescription(data?.eventDescription ?? '')
              setCompanyEmail(data?.companyEmail ?? '')
              setPersonName(data?.personName ?? '')
              setMainImageAspectRatio(data?.eventMainImage?.aspectRatio ?? '' )
              setImage2AspectRatio(data?.eventImage2?.aspectRatio ?? '')
              setImage3AspectRatio(data?.eventImage3?.aspectRatio ?? '')
              setImage4AspectRatio(data?.eventImage4?.aspectRatio ?? '')
              setAgeRestriction(data?.ageRestriction?.filter((item): item is string => item !== null) ?? []);
              setSelectedCategories(data?.categories?.filter((item): item is string => item !== null) ?? [])
              setAddress(data?.eventAddress ?? '')
              if (data?.location?.coordinates) {
                setCoordinates({
                    latitude: Number(data.location.coordinates[1]),
                    longitude: Number(data.location.coordinates[0]),
                });
                }
              setMainImagePath(data?.eventMainImage?.url ?? '')
              setImage2Path(data?.eventImage2?.url ?? '')
              setImage3Path(data?.eventImage3?.url ?? '')
              setImage4Path(data?.eventImage4?.url ?? '')

              if (data?.eventMainImage?.url) {

                const linkToStorageFile = await getUrl({
                    path: data.eventMainImage.url,
                    options: {
                    useAccelerateEndpoint: true,
                    },
                });


                setMainImage(linkToStorageFile.url.toString())

                }

              
        
            

            
            if(data?.eventImage2?.url) {

                const linkToStorageFile = await getUrl({
                    path: data?.eventImage2?.url,
                    options: {
                      useAccelerateEndpoint: true
                    }
                })

               

                setImage2(linkToStorageFile.url.toString())


            }


            if(data?.eventImage3?.url) {

                const linkToStorageFile = await getUrl({
                    path: data?.eventImage3?.url,
                    options: {
                      useAccelerateEndpoint: true
                    }
                })

                

                setImage3(linkToStorageFile.url.toString())


            }




            if(data?.eventImage4?.url) {

                const linkToStorageFile = await getUrl({
                    path: data?.eventImage4?.url,
                    options: {
                      useAccelerateEndpoint: true
                    }
                })

               

                setImage4(linkToStorageFile.url.toString())


            }


            const newDateTimePriceList = data?.dateTimePriceList?.map((newItem) => JSON.stringify(newItem)) ?? [];

              
            setDateTimePrice(newDateTimePriceList)  
              
              
              setLoadingGetEvent(false)

            }


            
              

        } catch (e) {

            const error = e as Error;

            if(error) {

                setLoadingEventError(error?.message)

            }

            

        }
        

    }


     const handleNextDisplay = () => {

        if(pageSection === 0) {

            

            if(email.length > 0) {


                setEmailError(false)

                if(personType) {
                    if(personName.length > 1) {
                        setPersonNameError(false)
                        setPageSection(pageSection + 1)
                    } else {
                        setPersonNameError(true)
                    }
                } else {
                    if(companyName.length > 1) {
                        setCompanyNameError(false)
    
                        if(companyEmail.length > 1) {
                            setCompanyEmailError(false)
                            setPageSection(pageSection + 1)
                        } else {
                            setCompanyEmailError(true)
                        }
    
                    } else {
                        setCompanyNameError(true)
                    }
                }

            } else {
                console.log('personerror')
                console.log(email)
                console.log(emailError)
                setEmailError(true)
            }

            
        }
        

        if(pageSection === 1) {
            if(selectedCategories.length > 0) {
                setCategoriesError(false)
                setPageSection(pageSection + 1)

            } else {
                setCategoriesError(true)
            }
        }

        if(pageSection === 2) {
            if (eventName.length > 1) {
                setEventNameError(false)

                if(eventDescription.length > 1) {
                    setEventDescriptionError(false)

                    if(address.length > 1) {
                        setEventAddressError(false)
                        setPageSection(pageSection + 1)
                    } else {
                        setEventAddressError(true)
                    }

                } else {
                    setEventDescriptionError(true)
                }
            } else {
                setEventNameError(true)
            }
            
        }

        if(pageSection === 3) {
            setPageSection(pageSection + 1)
        }

        if(pageSection === 4) {
            if(dateTimePrice.length > 0) {

                setDateTimePriceError(false)
                setPageSection(pageSection + 1)

            } else {
                setDateTimePriceError(true)
            }
            
        }

        if(pageSection === 5) {
            if(mainImage) {

            }
            setPageSection(pageSection + 1)
        }

    }


    const handlePrevDisplay = () =>  {
        setPageSection(pageSection - 1)
    }


   
     
    
     const handleUpdateEvent = async () => {


        try {

            setUploadingDetail(t('updatingeventdetails'))
            setUploadPercent(10)
            setUploadLoading(true)


            if(id) {

                await client.models.Event.update({
                    id: id,
                    eventName: eventName,
                    eventDescription: eventDescription,
                    email: email,
                    personType: personType,
                    personName: personName,
                    eventMainImage: {
                        aspectRatio: mainImageAspectRatio,
                        url: mainImagePath
                    },
                    eventImage2: {
                        aspectRatio: image2AspectRatio,
                        url: image2Path
                    },
                    eventImage3: {
                        aspectRatio: image3AspectRatio,
                        url: image3Path
                    },
                    eventImage4: {
                        aspectRatio: image4AspectRatio,
                        url: image4Path
                    },
                    dateTimePriceList: dateTimePrice.map((item)=> {

                        return JSON.parse(item)
                    }),
                    ageRestriction: ageRestriction,
                    categories: selectedCategories,
                    eventAddress: address,
                    location:{
                        type: "Point",
                        coordinates: [Number(coordinates?.longitude), Number(coordinates?.latitude)]
                    }
                })


                if(mainImage && mainImageBlob) {

                    setUploadingDetail(t('updatingimages'))

                    const result = await uploadData({
                        path: `picture-submissions/${mainImage}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: mainImageBlob,
                    }).result;
            
                    /** 

                    const linkToStorageFile = await getUrl({
                        path: result.path
                    })

                    */

                    await client.models.Event.update({

                        id: id,
                        eventMainImage: {
                            aspectRatio: mainImageAspectRatio,
                            url: result.path
                        }
                    });

                    



                    setUploadPercent(50)

                }


                if(image2 && image2Bolb) {

                    const result = await uploadData({
                        path: `picture-submissions/${image2}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: image2Bolb,
                    }).result;
            
                    
                    

                    await client.models.Event.update({
                        id: id,
                        eventImage2: {
                            aspectRatio: image2AspectRatio,
                            url: result.path
                        }
                    });

                    setUploadPercent(60)
                }

                if(image3 && image3Bolb) {

                    const result = await uploadData({
                        path: `picture-submissions/${image3}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: image3Bolb,
                    }).result;
            
                    

                    await client.models.Event.update({
                        id: id,
                        eventImage3: {
                            aspectRatio: image3AspectRatio,
                            url: result.path
                        }
                    });

                    setUploadPercent(70)
                }

                if(image4 && image4Bolb) {
                    const result = await uploadData({
                        path: `picture-submissions/${image4}`,
                        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                        data: image4Bolb,
                    }).result;
            
                    

                    await client.models.Event.update({
                        id: id,
                        eventMainImage: {
                            aspectRatio: image4AspectRatio,
                            url: result.path
                        }
                    });

                    setUploadPercent(80)
                }

                setUploadPercent(100)
                setUploadingDetail(t('updatesuccessfulclosing'))
                setTimeout(()=> {
                    setUploadLoading(false)

                    if(screenName === 'post') {

                       // router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'main'}})

                    } else {

                      //  router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'admin'}})

                    }

                    
                }, 3000)

            }


                


        } catch (e) {

            const error = e as Error;
            
            setUploadPercent(0)
            setUploadingDetail(t('uploaderror'))
            setUploadError(error.message)
           

            setTimeout(()=> {
                setUploadLoading(false)
                
            }, 3000)
        }

    }

   const handlePostEvent = async () => {


        try {


           

            setUploadingDetail(t('uploadingeventdetails'))
            setUploadPercent(10)
            setUploadLoading(true)

            const uploadedDocument = await client.models.Event.create({
                eventName: eventName,
                eventDescription: eventDescription,
                email: email,
                personType: personType,
                personName: personName,
                eventMainImage: {
                    aspectRatio: mainImageAspectRatio,
                    url: ''
                },
                eventImage2: {
                    aspectRatio: image2AspectRatio,
                    url: ''
                },
                eventImage3: {
                    aspectRatio: image3AspectRatio,
                    url: ''
                },
                eventImage4: {
                    aspectRatio: image4AspectRatio,
                    url: ''
                },
                dateTimePriceList: dateTimePrice.map((item)=> {

                    return JSON.parse(item)
                }),
                ageRestriction: ageRestriction,
                categories: selectedCategories,
                eventAddress: address,
                location:{
                    type: "Point",
                    coordinates: [Number(coordinates?.longitude), Number(coordinates?.latitude)]
                },
                
            })


            setUploadPercent(30)

           

              if(mainImage && mainImageBlob) {

                setUploadingDetail(t('uploadingimages'))

                const result = await uploadData({
                    path: `picture-submissions/${mainImage}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: mainImageBlob,
                  }).result;
        
                  /** 

                  const linkToStorageFile = await getUrl({
                      path: result.path
                  })

                  */

                  if(uploadedDocument?.data) {

                    await client.models.Event.update({

                    id: uploadedDocument?.data.id,
                    eventMainImage: {
                        aspectRatio: mainImageAspectRatio,
                        url: result.path
                    }
                  });


                  setUploadPercent(50)

                  }
 

              }

              if(image2 && image2Bolb) {

                const result = await uploadData({
                    path: `picture-submissions/${image2}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: image2Bolb,
                  }).result;
        
                 if(uploadedDocument?.data) {

                    
                  await client.models.Event.update({
                    id: uploadedDocument?.data.id,
                    eventImage2: {
                        aspectRatio: image2AspectRatio,
                        url: result.path
                    }
                  });

                  setUploadPercent(60)

                 }
                  

              }

              if(image3 && image3Bolb) {

                const result = await uploadData({
                    path: `picture-submissions/${image3}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: image3Bolb,
                  }).result;
        
                  if(uploadedDocument?.data) {

                    await client.models.Event.update({
                    id: uploadedDocument?.data.id,
                    eventImage3: {
                        aspectRatio: image3AspectRatio,
                        url: result.path
                    }
                  });

                  setUploadPercent(70)
                    
                 }

                  
              }

              if(image4 && image4Bolb) {
                const result = await uploadData({
                    path: `picture-submissions/${image4}`,
                    // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
                    data: image4Bolb,
                  }).result;
        
                  if(uploadedDocument?.data) {

                    await client.models.Event.update({
                    id: uploadedDocument?.data.id,
                    eventMainImage: {
                        aspectRatio: image4AspectRatio,
                        url: result.path
                    }
                  });

                  setUploadPercent(80)
                    
                 }

                  
              }

              setUploadPercent(100)

              setUploadingDetail(t('uploadsuccessful'))
              
              setTimeout(()=> {

                setUploadLoading(false)

                if(screenName === 'post') {

                 //   router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'main'}})

                } else {

                  //  router.replace({pathname: '/(tabs)/profile/manageEvents', params: {screenName: 'admin'}})

                }
              }, 3000)
            
          } catch (e) {

            const error = e as Error;
            
            setUploadPercent(0)
            setUploadingDetail(t('uploaderror'))
            setUploadError(error.message)

            setTimeout(()=> {
                setUploadLoading(false)
                
            }, 3000)
            
          }

    }


     const handleAddRemoveCategory = (category: string) => {

      

        const itemIndex = selectedCategories.indexOf(category)

        if(itemIndex > -1) {

            selectedCategories.splice(itemIndex, 1)

            setSelectedCategories([...selectedCategories])

            

        } else {

            if(selectedCategories.length < 4) {

                setSelectedCategories([...selectedCategories, category])

                

            }
            
        }

    }


    const handleAddRemoveAgeGroup = (item: string) => {


        const itemIndex = ageRestriction.indexOf(item)

        if(itemIndex > -1) {
            ageRestriction.splice(itemIndex, 1)

            setAgeRestriction([...ageRestriction])
        } else {
            setAgeRestriction([...ageRestriction, item])
        }

    }




   const handlePickImage = async (event: React.ChangeEvent<HTMLInputElement>) => {


    if(event.target.files && event.target.files.length > 0) {

       
        /**      
            const file = event.target.files[0]
            setMainImageUrl(URL.createObjectURL(file))
            console.log(file, 124)
            setModalOpen(true)
            
        */

        const reader = new FileReader()
        
        reader.readAsDataURL(event.target.files[0])

        reader.onload = function (e) {

            setSelectedImageUrl(reader.result as string)

            setModalOpen(true)
        
            event.target.value = ""

            
        }
        


        } else {
            console.log('error photo')
        }
    }


           


        function mainImageFocus () {

            if(mainImageRef?.current) {

                mainImageRef.current.click()

            }

            

        }



        function image2Focus () {

            if(image2Ref?.current) {

                image2Ref.current.click()
                
            }

        

        }

        function image3Focus () {

            if(image3Ref?.current) {

                image3Ref.current.click()
                
            }

            

        }

        function image4Focus() {

            if(image4Ref?.current) {

                image4Ref.current.click()
                
            }

            

        }

        const handleOpenImageRatioModal = (name: string) => {
            setImageName(name)
            setImageRatioModal(true)
        }


            //Callback function when cropping is done

            const onCropDone = (imgCroppedArea: CroppedArea, imageType: string, aspectRatio: number) => {

                //Create a canvas element to crop the image

                const canvasEle = document.createElement("canvas")
                canvasEle.width = imgCroppedArea.width;
                canvasEle.height = imgCroppedArea.height;

                const context = canvasEle.getContext("2d")

                //load the selected image
                let imageObj1 = new Image()

                if(typeof selectedImageUrl === 'string') {

                    imageObj1.src = selectedImageUrl
                    imageObj1.onload = function() {
                    //Draw the cropped portion of the image onto the canvas

                    context?.drawImage(
                        imageObj1,
                        imgCroppedArea.x,
                        imgCroppedArea.y,
                        imgCroppedArea.width,
                        imgCroppedArea.height,
                        0,
                        0,
                        imgCroppedArea.width,
                        imgCroppedArea.height
                    )

                    // Convert the canvas to a data URL (JPEG format)
                    const dataUrl = canvasEle.toDataURL("image/jpeg")

                    if(imageType === 'mainImage') {

                        if(aspectRatio === 16/10) {
                            setMainImageAspectRatio('a')
                        }
                        if(aspectRatio === 1/1) {
                            setMainImageAspectRatio('b')
                        }
                        if(aspectRatio === 24/36) {
                            setMainImageAspectRatio('c')
                        }


                        setMainImage(dataUrl)

                        canvasEle.toBlob((blob) => {
                        if (blob) {
                        // Do something with the Blob:
                        // e.g., upload to server, create a file, preview, etc.
                        const blobUrl = URL.createObjectURL(blob);
                        console.log("Blob URL:", blobUrl);

                        setMainImageBlob(blobUrl)

                        // Example: Create a File object for form submission
                        const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });



                        console.log("File:", file);

                        // TODO: use `file` in FormData or upload process

                        } else {
                        console.error("Failed to convert canvas to blob");
                        }
                        }, "image/jpeg", 0.95);



                        setModalOpen(false)
                    }


                    if(imageType === 'image2') {

                        if(aspectRatio === 16/10) {
                            setImage2AspectRatio('a')
                        }
                        if(aspectRatio === 1/1) {
                            setImage2AspectRatio('b')
                        }
                        if(aspectRatio === 24/36) {
                            setImage2AspectRatio('c')
                        }

                        setImage2(dataUrl)

                        canvasEle.toBlob((blob) => {
                        if (blob) {
                        // Do something with the Blob:
                        // e.g., upload to server, create a file, preview, etc.
                        const blobUrl = URL.createObjectURL(blob);
                        console.log("Blob URL:", blobUrl);

                        setImage2Blob(blobUrl)

                        // Example: Create a File object for form submission
                        const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });



                        console.log("File:", file);

                        // TODO: use `file` in FormData or upload process

                        } else {
                        console.error("Failed to convert canvas to blob");
                        }
                        }, "image/jpeg", 0.95);

                        setModalOpen(false)
                    }

                    if(imageType === 'image3') {

                        if(aspectRatio === 16/10) {
                            setImage3AspectRatio('a')
                        }
                        if(aspectRatio === 1/1) {
                            setImage3AspectRatio('b')
                        }
                        if(aspectRatio === 24/36) {
                            setImage3AspectRatio('c')
                        }

                        setImage3(dataUrl)

                        canvasEle.toBlob((blob) => {
                        if (blob) {
                        // Do something with the Blob:
                        // e.g., upload to server, create a file, preview, etc.
                        const blobUrl = URL.createObjectURL(blob);
                        console.log("Blob URL:", blobUrl);

                        setImage3Blob(blobUrl)

                        // Example: Create a File object for form submission
                        const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });



                        console.log("File:", file);

                        // TODO: use `file` in FormData or upload process

                        } else {
                        console.error("Failed to convert canvas to blob");
                        }
                        }, "image/jpeg", 0.95);

                        setModalOpen(false)
                    }
                    if(imageType === 'image4') {

                        if(aspectRatio === 16/10) {
                            setImage4AspectRatio('a')
                        }
                        if(aspectRatio === 1/1) {
                            setImage4AspectRatio('b')
                        }
                        if(aspectRatio === 24/36) {
                            setImage4AspectRatio('c')
                        }

                        setImage4(dataUrl)

                        canvasEle.toBlob((blob) => {
                        if (blob) {
                        // Do something with the Blob:
                        // e.g., upload to server, create a file, preview, etc.
                        const blobUrl = URL.createObjectURL(blob);
                        console.log("Blob URL:", blobUrl);

                        setImage4Blob(blobUrl)

                        // Example: Create a File object for form submission
                        const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });



                        console.log("File:", file);

                        // TODO: use `file` in FormData or upload process

                        } else {
                        console.error("Failed to convert canvas to blob");
                        }
                        }, "image/jpeg", 0.95);

                        setModalOpen(false)
                    }

                    

                }
                
                
                    
                    
                    
                }

            }

            const handleRemoveImage = (item: string) => {
        
                if(item === 'mainImage') {
                    setMainImage('')
                    setMainImageBlob('')
                }

                if(item === 'image2') {
                    setImage2('')
                    setImage2Blob('')

                }


                if(item === 'image3') {
                    setImage3('')
                    setImage3Blob('')
                    
                }

                if(item === 'image4') {

                    setImage4('')
                    setImage4Blob('')
                    
                }
            }

            const onCropCancel = () => {

            } 

            /** 

           const handleGetEventDescription = async () => {

            if(eventName.length > 0) {

                setEventNameError('')

                if(locationSelect.length > 0) {

                    setLocationSelectError('')

                    if(keywords.length > 1) {


                        setGetEventDescriptionLoading(true)

                        setKeywordsLengthError('')

                        function closeEventDescription () {

                           const closeModal = setTimeout(() => {

                                
                                setGetEventDescriptionLoading(false)
                                setGetEventDescriptionError(false)
                                setGetEventDescriptionSuccess(false)

                                clearTimeout(closeModal)

                                }, 3000);

                            
                            
                                
                            
                        }

        
                        

                        try {

                            await axios({
                                method: 'post',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                url:'https://tukiofusionbackend-1005216676212.us-central1.run.app/api/v1/gemini', 
                                data: {
                                    descriptionLength: descriptionLength,
                                    eventName: eventName,
                                    locationSelect: locationSelect,
                                    keywords: keywords
                                }
                            }).then((response)=>{setGetEventDescriptionError(false); console.log(response.data.data); setTimelineDescription(response.data.data); setGetEventDescriptionSuccess(true); closeEventDescription()} )

                        } catch(error) {

                            setGetEventDescriptionError(true)
                            closeEventDescription()
                        }

                        

                    } else {

                        setKeywordsLengthError('Enter at least 2 keywords')
                    }

                } else {

                    setLocationSelectError('Select a location')
                }

            } else {

                setEventNameError('Event Name Required')
            }

            

           }
*/



            const {isLoaded} = useJsApiLoader({
            id: 'google-map-script',
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
                libraries: libraries
            });


        const currentDisplay = () => {
            if(pageSection === 0) {
                return <PostEventPerson personType={personType} setPersonType={setPersonType} companyName={companyName} setCompanyName={setCompanyName}
                companyEmail={companyEmail} setCompanyEmail={setCompanyEmail} companyNameError={companyNameError} companyEmailError={companyEmailError}
                personName={personName} setPersonName={setPersonName} personNameError={personNameError} email={email} setEmail={setEmail} emailError={emailError} 
                screenName={screenName ?? ''}/>
            }
            if(pageSection === 1) {
                return(
                    <PostEventCategories selectedCategories={selectedCategories} handleAddRemoveCategory={handleAddRemoveCategory} eventCategories={eventsCategories} categoriesError={categoriesError}/>
                )
            }
            if(pageSection === 2) {
                return(
                    <PostLocationNameDetails eventName={eventName}  setEventName={setEventName} eventDescription={eventDescription} setEventDescription={setEventDescription} 
                eventNameError={eventNameError} eventDescriptionError={eventDescriptionError} address={address} setAddress={setAddress} coordinates={coordinates} 
                setCoordinates={setCoordinates} eventAddressError={eventAddressError}/>
                )
            }
            if(pageSection === 3) {
                return(
                    <PostAgeRestriction ageRestriction={ageRestriction} handleAddRemoveAgeGroup={handleAddRemoveAgeGroup}/>
                )
            }

            if(pageSection === 4) {

                return(
                    <PostDateTimeDuration ageRestriction={ageRestriction} dateTimePrice={dateTimePrice} setDateTimePrice={setDateTimePrice} site={site} setSite={setSite} />
                )
                
            }
            if(pageSection === 5) {
                return(
                    <PostPhotoUpload mainImage={mainImage} image2={image2} image3={image3} image4={image4} handlePickImage={handlePickImage} imageRatioModal={imageRatioModal}
                    setImageRatioModal={setImageRatioModal} mainImageAspectRatio={mainImageAspectRatio} image2AspectRatio={image2AspectRatio} image3AspectRatio={image3AspectRatio} 
                    image4AspectRatio={image4AspectRatio} selectedImageUrl={selectedImageUrl} setMainImage={setMainImage} setImage2={setImage2} setImage3={setImage3} 
                    setImage4={setImage4} handleRemoveImage={handleRemoveImage} mainImageError={mainImageError} onCropDone={onCropDone} 
                    handleOpenImageRatioModal={handleOpenImageRatioModal} setSelectedImageUrl={setSelectedImageUrl} mainImageFocus={mainImageFocus}
                    image2Focus={image2Focus} image3Focus={image3Focus} image4Focus={image4Focus} mainImageRef={mainImageRef} image2Ref={image2Ref} image3Ref={image3Ref}
                    image4Ref={image4Ref} modalOpen={modalOpen} setModalOpen={setModalOpen}
                     />
                )
            }

            if(pageSection === 6) {
                return(
                    <PostEventPreview event={eventData}/>
                )
            }


           
            
            
            
        }




    return(
        <div className='w-full mt-1 bg-white  flex flex-col items-center h-full '>
            <Header headerPage={headerPage} searchModalVisible={searchModalVisible} setSearchModalVisible={setSearchModalVisible} loginModal={loginModal}
        setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
        {
            loginModal ? 
            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
            <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} 
            setConfirmationModal={setConfirmationModal} />
            </div>
            :
            null
        }
        {
            signUpModal ? 
            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
            <SignUpModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal}
            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} 
            setConfirmationModal={setConfirmationModal}/>
            </div>
            :
            null
        }
        {
            confirmationModal ? 
            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
            <ConfirmAccountModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} />
            </div>
            :
            null
        }
        {
            forgotPasswordModal ? 
            <div className='fixed z-40 w-full max-w-lg border top-20 pb-10 bg-white rounded-md flex items-center justify-center'>
            <ForgotPasswordModal loginModal={loginModal} setLoginModal={setLoginModal} signUpModal={signUpModal} setSignUpModal={setSignUpModal} 
            forgotPasswordModal={forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal}
            confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal}/>
            </div>
            :
            null
        }
            {!userDetails ?
            <div className='bg-white w-full  flex h-full justify-center'>
                <div className='max-w-3xl mt-16 w-full bg-white border  flex flex-col items-center pt-5 pl-5 pr-5 pb-20  h-full'>
                 {currentDisplay()}   
                </div>
                
                    
                <div className=' flex flex-row justify-between p-2 max-w-2xl fixed items-center bg-white rounded-md w-10/12 z-44  border bottom-5'>
                        <div className=''>
                        {pageSection === 0 ?
                        <div></div> :
                        <div className='flex flex-row items-center cursor-pointer' onClick={()=> handlePrevDisplay()}>
                            <div> <MdOutlineKeyboardArrowLeft size={25} color='black'/></div>
                            <div className='text-black'>{t('previous')}</div>
                                
                        </div>}
                        </div>
                        <div className=''>
                           {pageSection === 8 ?
                           <div className='w-full'>
                                {!uploadModal ? 
                                <div className='  flex items-center w-full cursor-pointer border-2 px-2 border-cyan-400 rounded-md' >
                                    <div className='text-black font-semibold'>{t('post')}</div>
                                
                                </div>:
                                <div className='  flex items-center w-full cursor-pointer border-2 px-2 border-cyan-400 rounded-md'>
                                    <div className='text-black font-semibold'>{t('post')}</div>
                            
                                </div>}
                            </div>
                           : <div className='flex flex-row items-center cursor-pointer' onClick={()=> handleNextDisplay()}>
                                <div className='text-black'>{t('next')}</div>
                                <div>
                                    <MdOutlineKeyboardArrowRight size={25} color='black'/>
                                </div>
                                
                            </div> }
                        </div>
                    </div>
                    {uploadModal ? 
                    <div className='border p-2 absolute top-40 w-11/12 flex items-center justify-center flex-col z-20 bg-white max-w-sm'>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress variant="determinate" value={uploadProgress} />
                            </Box>
                            <div className='mt-5 text-black'>{uploadingText}</div>
                    </div>:null}
                
            </div>: 
            <div className='bg-white w-full  flex h-full justify-center pt-20'>
                <button className=" md:text-base border-2 rounded-md p-1 w-20  mt-3 flex items-center justify-center cursor-pointer" style={{backgroundColor: '#1184e8'}} 
                onClick={()=> setLoginModal(true)} >
                    <p className=" md:text-base text-white">{t('login')}</p>
                </button>
                <button className=" md:text-base border-2 w-20 rounded-md p-1 ml-5  mt-3 flex items-center justify-center cursor-pointer" style={{backgroundColor: '#1184e8'}} onClick={()=> setSignUpModal(true)} >
                    <p className=" md:text-base text-white">{t('signup')}</p>
                </button>
            </div>}
            
        </div>
    )
}