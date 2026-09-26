import React from 'react'
import { User2Icon, Lock, Mail } from 'lucide-react'
import { useDispatch } from 'react-redux'
import api from '../configs/api'
import { login } from "../app/features/authSlice";
import { toast } from 'react-hot-toast'

const Login = () => {

  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search)
  const urlstate = query.get('state')
  const [state, setState] = React.useState(urlstate || "login")

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await api.post(`/api/users/${state}`, formData);

      console.log(response);

      const { data } = response;

      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    } catch (error) {
      let message = `Unable to ${state}. Please try again.`;

      if (error.code === "ECONNABORTED") {
        message = "The request timed out. Please try again.";
      } else if (!error.response) {
        message =
          "Unable to connect to the server. Please check your internet connection.";
      } else if (error.response.status === 400) {
        // Validation errors from backend
        message = error.response.data?.message || message;
      } else if (error.response.status === 401) {
        message = "Invalid email or password.";
      } else if (error.response.status === 409) {
        message = "An account with this email already exists.";
      }

      toast.error(message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGuestLogin = () => {
    setFormData(prev => ({
          ...prev,
          email : 'test@gmail.com',
          password : 'test',
    }))
  }


  return (

    <div className='flex items-center justify-center min-h-screen bg-gray-50' >

      <form onSubmit={handleSubmit} className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
        <p className="text-gray-500 text-sm mt-2">Please {state} in to continue</p>

      {/* Guest Credientals */}
      {state === "login" && 
        ( <button type="button" onClick={handleGuestLogin} 
        className="w-full mt-6 p-3 text-left border border-green-200 bg-green-50 rounded-xl hover:bg-green-100 transition" >
       <p className="text-sm font-medium text-green-700"> Try Demo Account </p> 
       <p className="text-xs text-gray-500 mt-1"> Click to automatically fill guest credentials </p> 
       </button> 
       )}

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color='#6B7280' />
            <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color='#6B7280' />
          <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} color='#6B7280' />
          <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity">
          {state === "login" ? "Login" : "Sign up"}
        </button>
        <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"} <a href="#" className="text-indigo-500 hover:underline">click here</a></p>
      </form>

    </div>

  )


}

export default Login