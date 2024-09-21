import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../../features/authSlice'

const Login = () => {

  const usernameRef = useRef()
  const { isSuccess, isErrors, message } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
      navigate('/')
    }
    dispatch(reset())
  }, [isErrors, isSuccess, message, navigate])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(formData))
  }

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login to your account
            </h1>
            <p className='text-red-500 tracking-tighter'>{isErrors && message}</p>
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input
                  ref={usernameRef}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="username"
                  required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  required />
              </div>
              <button type="submit" className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <a href="#" className="font-medium text-teal-600 hover:underline">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login