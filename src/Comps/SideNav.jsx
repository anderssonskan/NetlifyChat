import { useNavigate } from "react-router-dom";
import '../Style/SideNav.css'

export default function SideNav({ user }) {
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login');
    }
    return (
        <>
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
            <button onClick={logOut}>Log out</button>
        </>
    )
}

