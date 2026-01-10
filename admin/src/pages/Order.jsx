import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import { SiOrganicmaps } from "react-icons/si"
import toast from 'react-hot-toast'

const Order = ({ token }) => {

  const SHOP_ADDRESS = "Seawoods, Navi Mumbai, Maharashtra"
  const [orders, setorders] = useState([])
  const groupItemsByProduct = (items = []) => {
    const map = {}

    items.forEach((item) => {
      if (!map[item._id]) {
        map[item._id] = {
          ...item,
          sizes: [{ size: item.size, quantity: item.quantity }]
        }
      } else {
        map[item._id].sizes.push({
          size: item.size,
          quantity: item.quantity
        })
      }
    })

    return Object.values(map)
  }

  const getallOrders = async () => {
    try {
      if (token) {
        const response = await axios.post(
          backend_url + '/api/order/allOrder',
          {},
          { headers: { token } }
        )
        setorders(response.data?.Orders || [])
 
      }
    } catch (error) {
      toast.error(error.message);
      setorders([]) 
    }
  }

  const GetMapLInk = (address, pincode) => {
    const Address = `${address}, ${pincode}`
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(Address)}`
  }

  const GetDirection = (address, pincode) => {
    const destination = `${address}, ${pincode}`
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(SHOP_ADDRESS)}&destination=${encodeURIComponent(destination)}`
  }

  const statushandler = async (orderId, event ) => {
    try {
      let decision  = false;
       if(event.target.value === 'Delivered'){
             decision = true;
        }
      const response = await axios.post(
        backend_url + '/api/order/updatestatus',
        { orderId, status: event.target.value , payment:decision},
        { headers: { token } }
      )

      if (response.data.success) {
        await getallOrders();
        toast.success('Updated'); 
      }
    } catch (error) {
      console.log(error.message)
      
    }
  }

  useEffect(() => {
    getallOrders()
  }, [token])

  return (
    <>
      <div className='p-4 universalQuicksand'>
        <div className='flex justify-around items-center'>
          <p className='p-5'>All Orders</p>
          <p>Total Orders : <b>{orders?.length || 0}</b></p>
        </div>

        {orders.map((items, index) => {

          const groupedItems = groupItemsByProduct(items?.items || [])

          return (
            <div
              key={index}
              className='m-4 grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-black p-10 rounded-2xl'
            >

              {groupedItems.map((item, index) => (
                <React.Fragment key={index}>

                  <div>
                    <img
                      src={item?.img?.[0]}
                      width={150}
                      height={100}
                      alt=""
                      className='rounded-2xl'
                    />
                  </div>

                  <div className='flex justify-around flex-col'>
                    <p className='pb-2'>
                      {item.name}
                      <br />
                      <b>
                        {item.sizes.map((s, i) => (
                          <span key={i}>
                            {s.size} x {s.quantity}
                            {i !== item.sizes.length - 1 && ', '}
                          </span>
                        ))}
                      </b>
                    </p>

                    <p>{items?.address?.name} {items?.address?.lastname}</p>

                    <div className='mt-2'>
                      <a
                        href={GetMapLInk(items?.address?.address, items?.address?.pincode)}
                        target='_blank'
                      >
                        <p>
                          {items?.address?.address}
                          <br />
                          {items?.address?.pincode}
                        </p>
                      </a>

                      <a
                        href={GetDirection(items?.address?.address, items?.address?.pincode)}
                        target='_blank'
                        className='inline-flex'
                      >
                        <button className='bg-black hover:scale-105 transition-all text-white p-3 mt-2 cursor-pointer rounded-2xl flex items-center justify-around'>
                          See the best Route
                          <SiOrganicmaps color='white' className='ml-4' />
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className='flex justify-around flex-col p-5'>
                    <p>
                      Quantity{' '}
                      {item.sizes.reduce((sum, s) => sum + s.quantity, 0)}
                    </p>
                    <p>Method: <b>{items?.paymentMethod}</b></p>
                    <p>Date: {items?.date ? new Date(items.date).toLocaleString() : ''}</p>
                    <p>Phone : {items?.address?.phone}</p>
                  </div>

                  <div className='flex justify-around items-center flex-row'>
                    <div className='flex flex-col justify-around gap-5'>
                      <p>${items?.amount}</p>
                      <p>
                        {items?.payment
                          ? <b className='text-green-400 cursor-pointer'>Done</b>
                          : <b className={`cursor-pointer text-red-600`}>Pending</b>}
                      </p>
                    </div>

                    <select
                      onChange={(event) => statushandler(items._id, event )}
                      value={items?.status}
                      className='p-4 rounded-2xl'
                    >
                      <option value="Order placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                </React.Fragment>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Order
