import { useNavigate } from "react-router-dom";

export default function SideNav({ user }) {
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login');
    }
    return (
        <>
            <h4 className="font-semibold">{user.user}</h4>
            <button onClick={logOut}>Log out</button>
        </>
    )
}

