import React, { useState } from "react";

function Chat() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    if (!user) {
        return <div>Please log in to access the chat.</div>
    };

    return (
        <>
            {user && (
                <div>
                    <header>
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
                    //TODOD CHATTEN
                </div>
            )}
        </>
    );
}

export default Chat;