import {redirect, useNavigate} from "react-router-dom";
import {logoutUser} from "~/appwrite/auth";
const TravelPage = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        navigate('/sign-in')
    }
    return (
    <section className='bg-travel-hero pt-4 p-6'>
        <header className='flex items-center justify-between w-full h-fit'>
            <div className='flex gap-2 items-center'>
                <img
                    src="/assets/icons/logo.svg"
                    alt="Logo"
                    className="size-[30px]"
                />

                <h1 className='font-bold text-xl'>Tourvisto</h1>
            </div>
            <div>
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
            </div>
        </header>
        <main className='w-full h-fit py-40'>
            <div className='text-4xl md:text-7xl font-bold'>
                <h1>Plan Your</h1>
                <h1>Trip with <span className='text-blue-700'>Ease</span> </h1>
            </div>
            <button onClick={()=>{navigate('/dashboard')}} className='bg-white cursor-pointer px-4 py-2 h-fit mt-6 rounded-lg font-bold text-blue-600'>
                Dashboard
            </button>
        </main>

    </section>
    )
}
export default TravelPage
