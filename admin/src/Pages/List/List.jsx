import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../Component/Loader/Loader'

const List = ({ url }) => {

  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchList = async () => {
    setLoader(true)
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setLoader(false)
      setList(response.data.data)
    } else {
      setLoader(false)
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const removeFood = async (foodId) => {
    setLoader(true)
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error");
    }
  }



  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          loader ? <Loader /> :
            <>
              {list.map((item, index) => {
                return (
                  <div key={index} className="list-table-format">
                    <img src={`${url}/images/` + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p onClick={() => { removeFood(item._id) }} className='cursor'>x</p>
                  </div>
                )
              })}
            </>
        }
      </div>
    </div>
  )
}

export default List