import React, { useState } from "react";
import { ImpulseSpinner } from "react-spinners-kit";
import '../Style/Chat.css'


function Chat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isResponding, setIsResponding] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    if (!user) {
        return <div>Please log in to access the chat.</div>
    };

    //chatten
    const getMessages = async () => {
        fetch(import.meta.env.VITE_RAILWAY_URL +
            '/messages', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + jwtToken,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) {
                    console.error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                getMessages(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    const [chat, setChat] = useState([]);

    const addMessage = (message) => {
        setChat(prev => [...prev, message]);
    }

    const responses = [{
        'text': 'Hallå där! Vad gör du?',
        'avatar': 'https://i.pravatar.cc/100?img=32',
        'username': 'Ragnar',
        'conversationId': null
    },
    {
        'text': 'Hallå!!! Svara då!',
        'avatar': 'https://i.pravatar.cc/100?img=32',
        'username': 'Ragnar',
        'conversationId': null
    },
    {
        'text': 'Sover du eller?!',
        'avatar': 'https://i.pravatar.cc/100?img=32',
        'username': 'Ragnar',
        'conversationId': null
    }
    ];

    function getRandomIndex(length) {
        return Math.floor(Math.random() * length);
    }

    async function handleSend() {
        if (userInput.trim() !== '') {
            const newMessage = { username: user.user, text: userInput };
            addMessage(newMessage);
            if (!isResponding) {
                setIsResponding(true);
                setTimeout(() => {
                    addMessage(responses[getRandomIndex(responses.length)]);
                    setIsResponding(false);
                }, 3000);
            }
            //rensa inputfält
            setUserInput('');
        }
    }

    return (
        <>
            {user && (
                <div>
                    <header className="welcome-area">
                        <h3>Welcome to the Chat, {user.user}!</h3>
                        <img
                            src={user.avatar}
                            alt={`${user.user}'s avatar`}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%'
                            }}
                        />
                    </header>

                    <div className="chat-area">
                        {chat.map((message, index) => <div key={index} className={message.username == user.user ? 'user-message' : 'fakeChat-message'}>{message.text}</div>)}
                        <ImpulseSpinner size={30} color='#686769' loading={isResponding} />                 
                    </div>

                    <div className="input-area">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder='Write your message here'
                        />

                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chat;