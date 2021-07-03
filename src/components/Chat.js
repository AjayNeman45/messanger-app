import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import SignOut from './SignOut'

const Chat = forwardRef((ref) =>
{
    console.log(auth);
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() =>
    {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot =>
        {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div className="mainDiv">
            <SignOut />
                <div className="msgs">
                    {messages.map(({ id, text, photoURL, uid }) => (
                        <div>
                            <img src={photoURL} alt="" className={uid === auth.currentUser.uid ? 'userPhoto' : 'guestPhoto'} />
                            <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
})

export default Chat
