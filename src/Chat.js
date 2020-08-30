import React,{useState,useEffect} from 'react';
import {Avatar, IconButton} from "@material-ui/core"
import './Chat.css';
import {AttachFile,SearchOutlined,MoreVert, InsertEmoticon, Mic} from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [Input, setInput] = useState("")
  //  const [Seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([])
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
            db.collection('rooms').doc(roomId).collection('messages').orderBy("timestamp",'asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])
    
   /* useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [])
    */
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            id:user.uid,
            message:Input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");

    }
    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName?roomName:"Go To Chat Room"}</h3>
                    <p>{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <>
                    {console.log(message)}
                    <p className={`chat__message ${message.id === user.uid && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                     {message.message}
                     <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>

                    </>
                ))}
                
                
            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form >
                    <input onChange ={handleChange} value={Input} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic/>
            </div>
            
        </div>
    )
}


export default Chat
