import React, { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector } from '../../../features/productSlice'

const Carts = ({ open, close }) => {

  const products = useSelector(productSelector.selectAll)
  const { cart } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)


  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find(product => product.id === item.idProduct)
        if (!product) {
          console.log('product kosong')
        } else {
          return acc + product.price * item.qty
        }
      }, 0)
      setTotalPrice(sum)
    }
  }, [cart, products])

  return (

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md mt-14">
                  <div className="flex h-full flex-col overflow-y-scroll shadow-xl bg-white">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-800">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={close}
                          >
                            <span className="absolute -inset-0.5" />
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">

                            {products.length > 0 && (
                              cart.map(item => {
                                const product = products.find(product => product.id === item.idProduct)
                                if (!product) {
                                  console.log('Product tidak ada')
                                } else {
                                  return (
                                    <li key={product.id} className="flex py-6">
                                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden">
                                        <img
                                          src={product.image}
                                          alt={product.title}
                                          className="object-center"
                                        />
                                      </div>

                                      <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                          <div className="flex justify-between text-base font-medium text-gray-800">
                                            <h3>
                                              <a href='#'>{product.title}</a>
                                            </h3>
                                            <p className="ml-4">${item.qty * product.price}</p>
                                          </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                          <p className="text-gray-500">Qty {item.qty}</p>

                                          <div className="flex">
                                            <button
                                              type="button"
                                              className="font-medium text-gray-600 hover:text-red-500"
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                }
                              })
                            )}

                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-800">
                        <p>Subtotal</p>
                        <p>${totalPrice && totalPrice.toLocaleString('en-US')}</p>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-6 py-3 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-400"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    // <div className="absolute top-8 right-32 z-50 my-4 w-1/2 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg" id="dropdown">
    //   <div className='p-4'>
    //     <div className='flex justify-between mb-3 px-4'>
    //       <h2 className='font-semibold text-base text-teal-500'>Cart</h2>
    //       <button onClick={close} className='font-medium text-red-500 hover:text-red-600'>X</button>
    //     </div>

    //     <div className="overflow-x-auto">
    //       <table className="w-full text-sm text-left text-gray-500">
    //         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    //           <tr>
    //             <th scope="col" className="px-6 py-3">
    //               Image
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               Title
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               Price
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               QTY
    //             </th>
    //             <th scope="col" className="px-6 py-3">
    //               Total
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {products.length > 0 && (
    //             cart.map(item => {
    //               const product = products.find(product => product.id === item.idProduct)
    //               return (
    //                 <tr className="bg-white border-b" key={product.id}>
    //                   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
    //                     <img src={product.image} className='w-10' />
    //                   </th>
    //                   <td className="px-6 py-4">
    //                     {product.title}
    //                   </td>
    //                   <td className="px-6 py-4">
    //                     {product.price}
    //                   </td>
    //                   <td className="px-6 py-4">
    //                     {item.qty}
    //                   </td>
    //                   <td className="px-6 py-4">
    //                     $123123
    //                   </td>
    //                 </tr>
    //               )
    //             })
    //           )}


    //           {/* {products.length > 0 &&
    //             cart.map(item => {
    //               const product = products.find(product => product.id === item.idProduct)
    //               return (
    //                 <tr className="bg-white border-b" key={product.id}>
    //                   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
    //                     <img src={product.image} className='w-10' />
    //                   </th>
    //                   <td className="px-6 py-4">
    //                     {product.title}
    //                   </td>
    //                   <td className="px-6 py-4">
    //                     {product.price}
    //                   </td>
    //                   <td className="px-6 py-4">
    //                     {item.qty}
    //                   </td>
    //                   <td className="px-6 py-4">
    //                     $123123
    //                   </td>
    //                 </tr>
    //           )
    //             })
    //           } */}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    // <div className="relative overflow-x-auto">
    //   <table className="w-full text-sm text-left text-gray-500 ">
    //     <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
    //       <tr>
    //         <th scope="col" className="px-6 py-3">
    //           Product name
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Price
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           QTY
    //         </th>
    //         <th scope="col" className="px-6 py-3">
    //           Total
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {carts.map(item => (
    //         <tr className="bg-white border-b" key={item.product.id}>
    //           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
    //             {item.product.title}
    //           </th>
    //           <td className="px-6 py-4">
    //             Rp. {item.product.price}
    //           </td>
    //           <td className="px-6 py-4">
    //             {item.qty}
    //           </td>
    //           <td className="px-6 py-4">
    //             Rp. {(item.qty * item.product.price).toLocaleString('id-ID')}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <div className='flex'>
    //     {carts.length > 0 ? (
    //       <div className='flex justify-start ml-6 mt-5'>
    //         <h1 className='font-semibold'>Sub Total : {`Rp. ${subTotal.toLocaleString('id-ID')}`}</h1>
    //       </div>
    //     ) : (
    //       ''
    //     )}
    //   </div>
    // </div>
  )
}

export default Carts