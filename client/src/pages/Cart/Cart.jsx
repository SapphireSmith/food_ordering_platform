import React from 'react'
import './cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../components/Loader/Loader'
const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const cartItemsInList = food_list.filter(item => cartItems[item._id] > 0);

  const navigate = useNavigate()


  const verifyUser = () => {
    if (!localStorage.getItem("token")) {
      toast.error('Please create an account to continue')
    }
    navigate('/order')
  }

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.length === 0 ? <Loader /> : ""}
        {cartItemsInList.length === 0 ? <p className='cart-empty-note'>Opps looks like you cart is empty <Link to={'/'}><span>add something</span></Link></p> : ''}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {

            return (
              <div>
                <div key={index} className='cart-items-title cart-items-item'>
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => { removeFromCart(item._id) }} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )

          }
        })}
      </div>
      <div className="cart-bottom">
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
          {
            cartItemsInList.length === 0 ? '' : <button onClick={verifyUser}>Proceed to checkout</button>
          }

        </div>

        <div className="cart-pomocode">
          {cartItemsInList.length === 0 ?
            '' : <div>
              <p>If you have a promocode, enter it here</p>
              <div className='cart-promocode-input'>
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>

          }
        </div>
      </div>

    </div>
  )
}

export default Cart