import React from 'react'
import './header.css'
const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2 style={{ fontWeight: 500, color: 'white', fontSize: 'max(4.5vw, 22px)' }}>Order your favorite food here</h2>
                <p>Choose from a diverse menu featuring a deletable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to statisfy your cravings aand elevate your dining experince,one  delicious meal at a time</p>
                <button>View menu</button>
            </div>
        </div>
    )
}

export default Header