import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector, getProducts } from '../../../features/productSlice'
import Navbar from '../Layouts/Navbar'
import { useNavigate, Link } from 'react-router-dom'
import { setAddCart } from '../../../features/cartSlice'

const Products = () => {

  const products = useSelector(productSelector.selectAll)
  const { cart } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('carts', JSON.stringify(cart))
  }, [cart])

  const handleCart = async (id) => {
    if (!user) {
      navigate('/login')
    }
    const product = { idProduct: id, qty: 1 }
    dispatch(setAddCart(product))
  }

  return (
    <>
      <Navbar />
      <section className='px-16 mt-20'>
        <div className='flex flex-wrap justify-center'>

          {products.map(product => (
            <div className='w-1/4 p-2' key={product.id}>
              <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-md shadow">
                <Link>
                  <div className='flex justify-center'>
                    <img className="p-5 rounded-t-lg w-52 h-60 object-center hover:opacity-75" src={product.image} alt="product image" />
                  </div>
                </Link>
                <div className="px-4 py-4 bg-gray-100/80">
                  <Link>
                    <h2 className="text-sm text-gray-800 font-semibold tracking-tight truncate">{product.title}</h2>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium mt-1">${product.price.toLocaleString('en-US')}</span>
                    <span className="text-xs text-gray-600 font-normal mt-1">{product.rating.rate} rate</span>
                  </div>
                  <div className='w-full flex justify-center mt-2'>
                    <button onClick={() => handleCart(product.id)} className='bg-gray-200 hover:bg-gray-300 w-full py-2 rounded-md text-sm font-semibold text-gray-800'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Products