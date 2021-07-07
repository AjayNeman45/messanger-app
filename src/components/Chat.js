import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import SignOut from './SignOut'
import FavoriteIcon from '@material-ui/icons/Favorite';

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

    var showLike = false;
    const giveLike = (e) =>
    {
        if (!showLike) {
            e.target.style.color = "red"
            showLike = true;
        }
        else {
            e.target.style.color = "rgb(214, 214, 214)";
            showLike = false;
        }
    }
    const deleteMsg = (e) =>
    {
        e.target.style.display = "none";
    }
    return (
        <div className="mainDiv">
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <img src={photoURL} alt="" className={uid === auth.currentUser.uid ? 'userPhoto' : 'guestPhoto'} />
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'recieved'}`}>
                            <p>{text}</p>
                            <span style={showLike ? { color: 'red' } : { color: 'rgb(214, 214, 214)' }} onClick={giveLike}> <FavoriteIcon /> </span>
                        </div>
                    </div>
                ))}
            </div>

            <SendMessage scroll={scroll}/>
            <div ref={scroll}></div>
        </div>
    )
})

export default Chat
