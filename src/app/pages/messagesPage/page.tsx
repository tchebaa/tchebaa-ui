"use client"

import {useState, useEffect, useRef, Component} from 'react'

import moment from 'moment';
import { generateClient } from 'aws-amplify/data';
import {useUser} from '../../context/UserContext'
import {useRouter, useSearchParams} from 'next/navigation';
import {Amplify} from 'aws-amplify'
import outputs from '../../../../amplify_outputs.json'
import { BiSearch, BiLogoPlayStore, BiLogoApple } from "react-icons/bi";
import Link from 'next/link';
import {type Schema} from '../../../../tchebaa-backend/amplify/data/resource'
import {useTranslations} from 'next-intl';
import ComponentHeader from '../../components/ComponentHeader';
import { IoSendOutline } from "react-icons/io5";



Amplify.configure(outputs)



const client = generateClient<Schema>();


interface Message {
    id: string;
    sender: string;
    conversationId: string;
    content: string;
    status: string;
    createdAt: string;
  }



export default function Message() {


  const {userDetails} = useUser()

  const t = useTranslations()
  

  const [pageType, setPageType] = useState<string>('chats')
  const [messages, setMessages] = useState<Message []>([])
  const [loadingChats, setLoadingChats] = useState(true)
  const [userEmail, setUserEmail] = useState<string>('rani@gmail.com')
  const [text, setText] = useState<string>('')

  const chatListRef = useRef(null)
  const scrollRef = useRef(null)


  const searchParams = useSearchParams()

  const conversationId = searchParams.get('conversationId')
  const screenName = searchParams.get('screenName')




  useEffect(()=> {

    
    if(scrollRef.current) {
      //  scrollRef.current.scrollToEnd({animated: true})
    }

  },[messages, loadingChats])




  useEffect(()=> {

    //handleGetChats()

  },[])

  useEffect(()=> {

    const sub = client.models.Message.observeQuery({
        filter:{
            conversationId:{
                beginsWith: conversationId!
            }
        }
    }).subscribe({
        next: ({ items, isSynced }) => {

            const sortedChats = items.sort(function(a,b){

                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                 
                  }).map(chat => ({
                    ...chat,
                    sender: chat.sender ?? '',
                    conversationId: chat.conversationId ?? '',
                    content: chat.content ?? '',
                    status: chat.status ?? '',
                }));

                  
            
            setMessages([...sortedChats])

            
            setLoadingChats(false)
          
        },
      });
    
      return () => sub.unsubscribe();

  }, [])

  

  

/** 
 * 
 *  const handleGetChats = async () => {

    console.log(conversationId)

    try{

        const { data, errors } = await client.models.Message.list({

            filter: {
                conversationId:{
                    beginsWith: conversationId
                }
            }
            
          });

          //console.log(data)

        

          setChats(data)
          setLoadingChats(false)

          

    } catch (e) {

        setLoadingChats(false)

    }

  }

  const renderChats = ({item}:{item: {senderName: string, sender: string, message: string, createdAt: string, id: string}}) => {


  userDetails?.username

                return(
                    <ThemedView>
                        {userEmail === item.sender ? 
                        <ThemedView style={styles.sentMessagesBody}>
                            <ThemedView style={styles.sentMessageComponent}>
                                <ThemedText style={styles.sentMessageText}>{item.message}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>:
                        <ThemedView style={styles.recievedMessageBody}>
                            <ThemedView style={styles.recievedMessageComponent}>
                                <ThemedText>{item.message}</ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.dateText}>{moment(item.createdAt).fromNow()}</ThemedText>
                        </ThemedView>}
                    </ThemedView>
                )
            }

*/
const handleSendText = async () => {

    if(text.length > 1) {

        if(screenName === 'user'){

            const { data, errors } = await client.models.Message.create({
                conversationId: conversationId,
                sender: userDetails?.username,
                content: text,
                status: 'read'
                
              });

              setText('')

              const updateLastMessage = await client.models.Conversation.update({
               id: conversationId!,
               lastMessage: text 
                
              });


        }

        if(screenName === 'customer') {

            const { data, errors } = await client.models.Message.create({
                conversationId: conversationId,
                sender: userDetails?.username,
                content: text,
                status: 'read'
                
              });

              setText('')

              const updateLastMessage = await client.models.Conversation.update({
               id: conversationId!,
               lastMessage: text 
                
              });

        }

        if(screenName === 'tchebaa') {

            const { data, errors } = await client.models.Message.create({
                conversationId: conversationId,
                sender: 'tchebaa',
                content: text,
                status: 'read'
                
              });

              setText('')

              const updateLastMessage = await client.models.Conversation.update({
               id: conversationId!,
               lastMessage: text 
                
              });

        }

        

    }

}

/**
 * <FlatList
                    ref={chatListRef} 
                    contentContainerStyle={{paddingBottom: 120}}
                    data={messagesChats}
                    renderItem={renderChats}
                    keyExtractor={(item)=> item.id} 
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() =>
                        chatListRef.current?.scrollToEnd()
                    }/>
 */


  return (
    <div>
        <div>
            <ComponentHeader category='messages' id={''}/>
            {loadingChats ? <div className='text-black font-semibold'>{t('loading')}</div>
            : <div>
            <div>
                {messages.map((item, i)=> {
                    return(
                        <div key={i}>
                            {userDetails?.username === item.sender ? 
                            <div>
                                <div>
                                    <div>{item.content}</div>
                                </div>
                                <div>{moment(item.createdAt).fromNow()}</div>
                            </div>:
                            <div>
                                <div>
                                    <div>{item.content}</div>
                                </div>
                                <div>{moment(item.createdAt).fromNow()}</div>
                            </div>}
                        </div>
                    )
                })}
            </div>
            </div>}
            <div>
                
            </div>
            <div>
                <input value={text} onChange={(e)=> setText(e.target.value)}/>
                <div onClick={()=> handleSendText()}>
                    <IoSendOutline  size={24} color={'#1184e8'}/>
                </div>
            </div>
        </div>
        
    </div>
  );
}