import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
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
    };

    try {
        //Skicka formulärdata till backend-server
            const response = await fetch('https://chatify-api.up.railway.app/auth/users/{userId}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        
            const data = await response.json();
    
            if(response.ok) {
                //JTW
                localStorage.setItem('token', data.token);
                
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
                    <label>Email:</label>
                    <input 
                        type='email'
                        name='email'
                        value={formData.email}
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
        </div>
     );
};

export default Login;