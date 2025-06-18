import React from 'react'
import {useAuthStore} from "../../store/useAuthStore.js"
import { useNavigate } from 'react-router-dom'
// import Header from '../../components/Header/index.jsx'
// import { StoreLayout } from '../../components/StoreLayout/index.jsx'
// import { IoLocationOutline } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
// import { useApplicationsStore } from '../../store/useApplicationsStore.js'
import { useState,useEffect } from 'react'
import Header from '../../components/Header';
import { FaStar } from "react-icons/fa";
import "./index.css"
import { AllStores } from '../AllStores';
import { AllUsers } from '../Allusers';
const AdminPage = () => {
  const navigate = useNavigate()
  const {logout}  = useAuthStore()
  const onClickLogout = ()=>{
    logout()
    navigate("/login")
  }

  const [showStores,setShowStores] = useState(false)
  const [showUsers,setShowUsers] = useState(false)

  const onClickShowStore = ()=>{
    
      setShowStores(!showStores)
      
    }
        
   
        
        
  
  
    const onClickShowUsers = ()=>{
    
      setShowUsers(!showUsers)
      
    }
  
        
    const adminStoreButtonText = !showStores?'All Stores':'Exit All Stores'
    const adminUserButtonText = !showUsers?'All Users':'Exit All Users'
        
    console.log({showStores})
    console.log({showUsers})
  

  return (
    <>
    <div className='admin-bg-container'>
      <Header/>
      <div className='admin-button-container'>
        
        <button type='button' className='store-form-text' onClick={onClickShowStore}>{adminStoreButtonText}</button>
        <button type='button' className='store-form-text' onClick={onClickShowUsers}>{adminUserButtonText}</button>
        
      </div>
       
        
          {showStores?<AllStores/>:''}
        
          {showUsers?<AllUsers/>:''}
      
      
      
      </div>
      
      </>  
   
  )
 
}

export default AdminPage
