import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import SignOut from './SignOut'

const Chat = forwardRef((ref) =>
{
    // console.log(auth);
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() =>
    {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot =>
        {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    var show = false;
    const giveLike = (e) =>
    {
        console.log(e);  
        show = !show;
        e.target.className = show ? 'showLike' : 'hideLike';
    }
    const deleteMsg = (e) =>{
        e.target.style.display = "none";
    }
    return (
        <div className="mainDiv">
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <img src={photoURL} alt="" className={uid === auth.currentUser.uid ? 'userPhoto' : 'guestPhoto'} />
                        <div onClick={deleteMsg} key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'recieved'}`}>
                            <p>{text}</p>
                            <span onClick={giveLike} className="hideLike">❤️</span>
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
