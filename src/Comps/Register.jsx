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
    const [avatarUrl, setAvatarUrl] = useState('');

    const navigate = useNavigate();

    //avatarArray
    const avatars = Array.from({ length: 10 }, (_,index) =>
        `https://i.pravatar.cc/150?img=${index + 1}`
    );

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

        let csrfToken = '';

        //TODO CSRF-token
        try {
            const response = await fetch('https://chatify-api.up.railway.app/csrf', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                csrfToken = data.csrfToken;
                console.log('csrfToken is:', data.csrfToken);

            } else {
                setMessage(`Registration failed: ${data.error}`);
            }

        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }

        try {
            //Skicka formulärdata till backend-server
            const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, csrfToken }),
            });

            const data = await response.json();

            if (response.ok) {
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
                    <label>Pick an avatar:</label>
                </div>
                <div>
                    {avatars.map((url,index) => (
                        <img 
                            key={index} 
                            src={url} 
                            alt={`Avatar ${index + 1}`}
                            style={{
                                cursor:'poiner', 
                                margin:'5px',
                                transition: 'opacity 0.3s ease',
                                opacity: url === avatarUrl ? '0.5' : '1',
                                boxShadow: url === avatarUrl ? '0 0 0 3px white' : 'none'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                            onClick={() => {
                                setAvatarUrl(url);
                                setFormData((prevData) => ({
                                    ...prevData,
                                    avatar:url,
                                }));
                            }} 
                        />
                    ))}
                    {avatarUrl && <h1>{avatarUrl}</h1>}
                </div>
                <button type="submit">Sign up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;