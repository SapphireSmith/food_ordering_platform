import React, { useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import Loader from '../../Component/Loader/Loader';

const Add = ({ url }) => {

  const [image, setImage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData)

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false)
      setLoader(false)
      toast.success(response.data.message)
    } else {
      setLoader(false)
      toast.error(response.data.message)
    }

  }

  return (
    <div className='add'>
      {loader ? <Loader /> :
        <>
          <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
              <p>Product name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name="name" id="" placeholder='Type here' required />
            </div>
            <div className="add-product-description flex-col">
              <p>Product description</p>
              <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required id=""></textarea>
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category" id="">
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Desert</option>
                  <option value="Sandwich">Sandwitch</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
              </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
          </form>
        </>
      }

    </div>
  )
}

export default Add