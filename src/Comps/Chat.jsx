import React, { useState, useEffect } from "react";
import '../Style/Chat.css'
import SideNav from "./SideNav";
import { MdOutlineDeleteOutline } from "react-icons/md";

async function authorizedFetch(method, url, body = null) {
    const jwtToken = localStorage.getItem('token');
    const config = {
        method: method,
        headers: {
            Authorization: 'Bearer ' + jwtToken,
            'Content-Type': 'application/json',
        },
        body: (body != null) ? JSON.stringify(body) : null,
    };
    try {
        const response = await fetch(url, config)
        if (!response.ok) {
            throw Error('Response not OK');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

function Chat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    if (!user) {
        return <div>Please log in to access the chat.</div>
    };

    useEffect(() => { getMessages() }, []);

    const getMessages = async () => {
        const messages = await authorizedFetch('GET', 'https://chatify-api.up.railway.app/messages');
        setMessages(messages);
    };

    const addMessage = async (message) => {
        await authorizedFetch('POST', 'https://chatify-api.up.railway.app/messages', { text: message });
        getMessages();
    }

    async function removeMessage(msgId) {
        await authorizedFetch('DELETE', 'https://chatify-api.up.railway.app/messages/' + msgId);
        getMessages();
    }

    async function handleSend(e) {
        e.preventDefault();
        if (userInput.trim() !== '') {
            addMessage(userInput);
            setUserInput('');
        }
    }

    return (
        <>
            {user && (
                <div className="container">
                    <div className="left">
                        <header className="welcome-area">
                            
                            
                            <div className="sidenav">
                                <SideNav user={user} />
                            </div>
                        </header>
                    </div>
                    <div className="right">
                        <div className="chat-area">
                            <div className="fakeChat-message">Hej! Vad sysslar du med?</div>
                            {messages.map((message, index) => {
                                return (
                                <div className="chatcontainer">
                                    <div key={index} className={message.userId == user.id ? 'user-message' : 'fakeChat-message'}>
                                        {message.text}
                                    </div>
                                        {message.userId == user.id && <button onClick={() => removeMessage(message.id)} className="delete"><MdOutlineDeleteOutline /></button> }
                                </div>)
                            })}
                        </div>

                        <form className="ixnput-area" onSubmit={handleSend}>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder='Write your message here'
                            />

                            <button onClick={handleSend}>Send</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chat;