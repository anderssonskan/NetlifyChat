import React, { useEffect, useState } from "react";

function Chat({ user }) {
    const [jwt, setJwt] = useState(null)
    if (!user) {
        return <div>Please log in to access the chat.</div>
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedJwt = JSON.parse(atob(token.split('.')[1]));
        setJwt(decodedJwt);
    }, [])

    return (
        <>
            {jwt && (
                <div>
                    <header>
                        <h3>Welcome to the Chat, {jwt.user}!</h3>
                        <img
                            src={jwt.avatar}
                            alt={`${jwt.user}'s avatar`}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%'
                            }}
                        />
                    </header>
                    //TODOD CHATTEN
                </div>
            )}
        </>
    );
}

export default Chat;