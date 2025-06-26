import React from 'react'
import {useAuthStore} from "../../store/useAuthStore.js"
import { useNavigate } from 'react-router-dom'
// import Header from '../../components/Header/index.jsx'
import { StoreLayout } from '../../components/StoreLayout/index.jsx'
import { IoLocationOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useApplicationsStore } from '../../store/useApplicationsStore.js'
import { useState,useEffect } from 'react'

import { FaStar } from "react-icons/fa";
import "../StoreOwnerPage/storeOwner.css"
export const AllStores = ()=>{
    

    const {getStores,allStores,deleteStore} = useApplicationsStore()

    const onHandleDeleting = (storeName)=>{
      deleteStore(storeName)
    } 
    useEffect(()=>{
      getStores()  
            
    },[])
    

    
    return (
         <>
      
    <div className='allStores-bg-container'>
      
      
      
      
        
        {/* <button type='button' className='store-form-text' onClick={onClickCreateStore}>{StoreFormText}</button> */}

          <ul className='unordered-list'>
            {allStores.map((eachStore)=>{
              const ratingsArray = eachStore.ratings || []
              const totalRatings = (ratingsArray.length)
              const averageRating = totalRatings>0?(ratingsArray.reduce((a,b)=>a+Number(b.score) || 0,0)/totalRatings).toFixed(1):0;
              const ratingText = totalRatings<2?'rating':'ratings'
           return(
            <li className="store-item" key  = {eachStore._id}>
                                <div className="store-card-container">
                                    {/* <img src = {eachStore.storeimage} className="store-image" alt={eachStore.storeName}/> */}
                                    <div className="store-details-container">
                                        <div className="store-name-category">
                                            <h1 className="store-name">{eachStore.storeName}</h1>
                                            <p className="about-store">{eachStore.category}</p>
                                        </div>
                                        <div className="store-rating-main-container">
                                          <div className="store-rating-container">
                                            <p className="store-rating">{averageRating}</p>
                                            <FaStar size={20}/>
                                            
                                          </div>
                                            
                                          <p className='totalRatings'>{totalRatings} {ratingText}</p>
                                         
                                        </div>
                                         <p className="store-address"><IoLocationOutline size = {20} /> {eachStore.address}</p>
                                            <p className="store-contact">{eachStore.contact}</p>
                                    </div>
                                    <button type="button" className='deleteingStore' onClick={()=>onHandleDeleting(eachStore.storeName)} ><MdDelete size = {25}/></button>
                                </div>
                            </li>)
          
          })}
        </ul>
         
    </div>
    </>
    )
    // 
}