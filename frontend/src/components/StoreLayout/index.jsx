import React, {  useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/useAuthStore.js';

import '../../pages/SignUpPage/';
import { useApplicationsStore } from '../../store/useApplicationsStore.js';

import "./index.css"

export const StoreLayout = () => {
  const {createStore} = useApplicationsStore();
  // const {checkAuth} = useAuthStore()
  const {authUser} = useAuthStore()
  
  const [formData,setFormData] = useState({
            storeName:'',
            storeimage:'',
            category:'fashion',
            owner:'',
            address:'',
            rating:"",
            contact:'',
  })

 

  const validateForm = () => {
    if (!formData.storeName.trim()) return toast.error("Store name is required");
    if (!formData.category.trim()) return toast.error("Category is required");
    if (!formData.address.trim()) return toast.error("Address is required");
    
    if (!formData.contact.trim()) return toast.error("Contact is required");
    if (formData.contact.length < 10) return toast.error("Contact must be of 10 characters");

    return true;
  };

  const handleCreateStore = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) createStore(formData)
    
    console.log(formData)

  };

  
  
  
  return (
    <div className="create-store-container">
      
      <form className="register-form" onSubmit={handleCreateStore}>
        <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1749575999/Store_explorer_q9miw7.png" className='register-img'/>
        <h2 className='form-heading'>Create Store</h2>

        <label htmlFor="storename" className='signup-label'> Store Name</label>
        <input
          id="storename"
          type="text"
          placeholder="Enter store name"
          value={formData.storeName}
          className='signup-input'
          onChange={(e)=>setFormData({...formData,storeName:e.target.value})}
          required
        />

        <label htmlFor="owner" className='signup-label'>OwnerId</label>
        <input
          id="owner"
          type="text"
          placeholder={authUser._id}
          className='signup-input'
        //   default={authUser._id}
          value={authUser._id}
          onChange={(e)=>setFormData({...formData,owner:authUser._id})}
          required
          
        />
        <label htmlFor="contact" className='signup-label'>Contact</label>
        <input
          id="contact"
          type="text"
          placeholder="Enter contact details"
          className='signup-input'
          value={formData.contact}
          onChange={(e)=>setFormData({...formData,contact:e.target.value})}
          required
          
        />

        <label htmlFor="address" className='signup-label'>Address</label>
        <input
          id="address"
          type="text"
          placeholder="Enter address"
           className='signup-input'
          value={formData.address}
         onChange={(e)=>setFormData({...formData,address:e.target.value})}
          required
        />

        <label htmlFor="category" className='label'>Select Category</label>
        <select
          id="category"
          value={formData.category}
          className='select-options'
          placeholder = "Select Category"
          
          onChange={(e)=>setFormData({...formData,category:e.target.value})}
          required
        >
          <option value="fashion" className='options'>Fashion</option>
          <option value="jewellery" className='options'>Jewellery</option>
          <option value="mobile" className='options'>Mobile</option>
          <option value="furniture" className='options'>Furniture</option>
          <option value="grocery" className='options'>Grocery</option>
        </select>

        <button type="submit">Add Store</button>
       
      </form>
      
    </div>
  );
};

export default StoreLayout