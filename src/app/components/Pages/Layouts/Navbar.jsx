import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Carts from '../Products/Carts'

const Navbar = () => {

  const { user } = useSelector(state => state.auth)
  const { cart } = useSelector(state => state.cart)
  const [showCart, setShowCart] = useState(false)
  const [dropdownUser, setDropdownUser] = useState(false)

  return (
    <>
      <header className="font-sans font-thin">
        <nav className="bg-white fixed top-0 w-full z-50 px-16 ">
          <div className="flex flex-wrap justify-between items-center py-3 border-b border-gray-300 border-opacity-30">
            <div className="flex justify-start items-center">
              <a href="https://flowbite.com" className="flex mr-4">
                <img src="https://flowbite.s3.amazonaws.com/logo.svg" className="mr-2 h-8" alt="FlowBite Logo" />
                <span className="self-center text-gray-800 text-xl font-semibold tracking-tight">REACT-TAILWIND</span>
              </a>
            </div>

            <div className="flex items-center lg:order-2">

              <form className='mr-5'>
                <div className="relative">
                  <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-96 p-2 pl-10 text-sm text-gray-800 font-normal border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." required />
                  <button type="submit" className="text-gray-800 absolute right-2 top-0 mt-1 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-1">Search</button>
                </div>
              </form>

              {user ? (
                <>
                  <div className='pr-4'>
                    <button onClick={() => setShowCart(!showCart)} className='button'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-8 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className='absolute w-fit top-0 px-1 mt-4 rounded-sm border bg-gray-500 text-white border-gray-700 font-medium text-center text-xs'>{cart.length}</span>
                    </button>
                  </div>

                  <Carts open={showCart} close={() => setShowCart(false)} />

                  <div className='text-gray-700 hover:text-gray-800'>
                    <button onClick={() => setDropdownUser(!dropdownUser)} className="inline-flex font-semibold text-sm" type="button">{user.user}
                      <svg className={`w-2.5 h-2.5 ml-2 mt-1.5 ${dropdownUser ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>
                  </div>

                  <div id="dropdownInformation" className={`${!dropdownUser ? 'hidden' : ''} z-10 top-11 mt-2 right-10 mr-5 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                    <div className="px-4 py-3 text-sm text-gray-900">
                      <h3 className='font-normal'>{user.user}</h3>
                      <div className="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownInformationButton">
                      <li>
                        <a href="#" className="block px-4 py-1 hover:bg-gray-100 font-normal">Profile</a>
                      </li>
                    </ul>
                    <div className="py-2">
                      <a href="#" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 font-normal">Logout</a>
                    </div>
                  </div>

                </>
              ) : (
                <Link to='/login' className='bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 w-full rounded-lg  flex justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>LOGIN</Link>
              )}

            </div>
          </div>
        </nav>
      </header >
    </>
  )
}

export default Navbar