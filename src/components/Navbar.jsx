import React from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from "../app/features/authSlice";

const Navbar = () => {

    const {user} = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const logoutuser = () => {
         navigate('/')
         dispatch(logout())
    }

    return (

        <div className='shadow bg-white'>

            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition all'>
                <Link to='/'>
                    <img src='/logo.svg' alt='logo' className='h-11 w-auto' />
                </Link>
                <div className = 'flex items-center gap-4 text-sm'>
                    <p> Hi , {user?.name} </p>
                    <button onClick={logoutuser} className = 'bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>
                        Logout
                    </button>
                </div>
            </nav>


        </div>
    )
}

export default Navbar