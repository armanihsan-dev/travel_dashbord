import {redirect, useNavigate} from "react-router-dom";
import {logoutUser} from "~/appwrite/auth";
const TravelPage = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        navigate('/sign-in')
    }
    return (
    <>
        <button
            onClick={handleLogout}
            className="cursor-pointer"
        >
            <img
                src="/assets/icons/logout.svg"
                alt="logout"
                className="size-6"
            />
        </button>
        <button onClick={()=>{redirect('/dashboard')}}>
            Dashboard
        </button>
    </>

    )
}
export default TravelPage
