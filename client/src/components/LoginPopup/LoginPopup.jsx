import React, { useContext, useEffect } from 'react'
import './loginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        setLoader(true);
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
            setLoader(false);
        } else {
            toast.error(response.data.message)
            setLoader(false);

            // alert(response.data.message)
        }
    }


    return (
        <>
            <div className="login-popup">
                <form action="" onSubmit={onLogin} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img onClick={() => { setShowLogin(false) }} src={assets.cross_icon} alt="" />
                    </div>
                    <div className="login-popup-inputs">
                        {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your  email' required />
                        <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
                    </div>
                    <button disabled={loader ? true : false} type='submit'>{loader ? <i className='fa fa-refresh fa-spin'></i> : ''} {loader ? 'Loading' : ''} {!loader ? currState === "Sign up" ? "Create account" : "Login" : ''}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, i agree to the terms of use & privacy policy</p>
                    </div>
                    {
                        currState === "Login" ?
                            <p>create a new account? <span onClick={() => setCurrState("Sign up")}>click Here</span></p>
                            :
                            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </form>

            </div>
        </>
    )
}

export default LoginPopup