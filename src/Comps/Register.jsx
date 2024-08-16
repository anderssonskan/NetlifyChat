import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    //Tillstånd för att hantera formulärdata
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    //Hantera förändringar i formulärfälten
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //Hantera formulärets submit
    const handleSubmit = async (e) => {
        e.preventDefault();

    //Validering av fomulärdata
    if (!formData.username || !formData.email || !formData.password || !formData.avatar) {
        setMessage('All fields are mandatory');
        return;
    }

    //TODO CSRF-token

    try {
    //Skicka formulärdata till backend-server
        const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    
        const data = await response.json();

        if(response.ok) {
            setMessage('Registration successful!');
            //Navigera till Login
            navigate('/login');
            } else {
            setMessage(`Registration failed: ${data.error}`);
        }

        } catch (error) {
            setMessage('An error occurred: ' + error.message);  
        }
    };

    return ( 
       <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Avatar:</label>
                <input 
                    type="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Sign up</button>
        </form>
        {message && <p>{message}</p>}
       </div> 
     );
};

export default Register;