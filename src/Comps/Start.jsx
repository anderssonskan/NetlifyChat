import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
    const navigate = useNavigate();

    const logIn = () => {
        navigate('/login');
    };
    const register = () => {
        navigate('/register');
    };

    return ( 
        <div>
            <h2>Welcome!</h2>
            <button onClick={register}>Sign up</button>
            <button onClick={logIn}>Log in</button>
        </div>
     );
}

export default Start;