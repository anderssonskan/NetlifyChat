import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
    const navigate = useNavigate();

    const logIn = () => {
        navigate('/login');
    };
    const signIn = () => {
        navigate('/register');
    };

    return ( 
        <div>
            <h2>Welcome!</h2>
            <button onClick={signIn}>Sign in</button>
            <button onClick={logIn}>Log in</button>
        </div>
     );
}

export default Start;