import React, { useEffect, useState } from 'react'
import './placeOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""

  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoader(true)

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })

    if (response.data.success) {
      setLoader(false)
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error('Some technical error occured returning to home')
      const navigateAfterDelay = () => {
        setTimeout(() => {
          setLoader(false)
          navigate('/'); 
        }, 2000); 
      };
      navigateAfterDelay();
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input required type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} />
          <input required type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} />
        </div>
        <div className='multi-fields'>
          <input required type="text" placeholder='Zip code' name='zipcode' onChange={onChangeHandler} value={data.zipcode} />
          <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} />
        </div>
        <input required type="text" placeholder='phone' name='phone' onChange={onChangeHandler} value={data.phone} />
      </div>
      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button disabled={loader ? true : false} className={loader ? "bttonload" : ''} type='submit'>{loader ? <i className='fa fa-refresh fa-spin'></i> : ''}  {loader ? "Processing" : 'Proceed to Payment'}</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder