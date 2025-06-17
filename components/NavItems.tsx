import React from 'react'
import {Link, NavLink, useLoaderData, useNavigate} from "react-router-dom";
import {sidebarItems} from "~/constants";
import {cn} from "../lib/utils";
import {logoutUser} from "~/appwrite/auth";


const NavItems = ({handleClick}:{handleClick?:()=>void}) => {
    const {currentUserData} = useLoaderData()
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logoutUser()
        navigate('/sign-in')
    }
    return (
        <section className="nav-items">
            <Link to='/' className="link-logo">
                <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                <h1>Tourvisto</h1>
            </Link>
            <div className='container'>
                <nav>
                    {sidebarItems.map(({ id, href, icon, label }) => (
                        <NavLink to={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div className={cn('group nav-item', {
                                    'bg-primary-100 !text-white': isActive
                                })} onClick={handleClick}>
                                    <img
                                        src={icon}
                                        alt={label}
                                        className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
                <footer className="nav-footer">
                    <img 
                        src={currentUserData?.imageUrl || (currentUserData?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUserData.name || '')}&background=random` : '/assets/images/david.webp')}
                        alt={currentUserData?.name || 'User'}
                        referrerPolicy="no-referrer" 
                        className="size-10 rounded-full object-cover"
                    />

                    <article>
                        <h2>{currentUserData?.name}</h2>
                        <p>{currentUserData?.email}</p>
                    </article>

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
                </footer>
            </div>
        </section>
    )
}


export default NavItems
