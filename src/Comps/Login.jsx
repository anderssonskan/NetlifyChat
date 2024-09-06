import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //Skicka formulärdata till backend-server
            const response = await fetch('https://chatify-api.up.railway.app/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('auth token:', data.token);

                localStorage.setItem('token', data.token);
                const decodedJwt = JSON.parse(atob(data.token.split('.')[1]));
                localStorage.setItem('user', JSON.stringify(decodedJwt));

                navigate('/chat');
            } else {
                setMessage(`Log in failed: ${data.error}`);
            }


        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };


    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Log in</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;