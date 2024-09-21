import React from 'react'
import { useRouteError } from 'react-router-dom'

const PageNotFound = () => {
  const error = useRouteError()

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='border mt-10 p-10 text-center bg-white shadow-sm'>
          <h1 className=" text-6xl font-bold leading-9 tracking-tight text-gray-900">
            {error.status}
          </h1>
          <h2 className='mt-6 font-semibold text-xl text-gray-700'>{error.statusText}</h2>
          <p className='mt-2 font-normal text-sm text-gray-600'>{error.data}</p>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound