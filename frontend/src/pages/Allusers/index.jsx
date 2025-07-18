import {useState,useEffect} from 'react'
import "./index.css"
import { useAuthStore } from '../../store/useAuthStore.js'
import React from 'react'
import { MdDelete } from "react-icons/md";
export const AllUsers = ()=>{
    const {getAllUsers,allUsers,deleteUser} = useAuthStore()
    const allUsersFields = [
        {id:'FullName'},
        {id:'Email'},
        {id:'Role'},{id:''}
    ]
    const onHandleDelete = (userEmail)=>{
        deleteUser(userEmail)
    }
    useEffect(()=>{
        const fetchUsers = async()=>{
            await getAllUsers()
        }
        fetchUsers()
    },[])
    console.log({allUsers})
   return <div className='allusers-bg-container'>

    <ul className = "userfields-unordered-list">
        {allUsersFields.map((eachField)=>{
           return (
               <li className = "user-unordered-list-item">
                   <span className = "user-unordered-span-item">{eachField.id}</span>
               </li>
                                                                                                                                                                                                                                                                   
           )
   })}
    </ul>
   
    
    <ul className='user-unordered-list'>
        {allUsers.map((user)=>{
            return (
                <>
                    <li key={user._id} className='user-unordered-list-item'>
                    <span className = "user-unordered-span-item">{user.fullName}</span>
                    <span className = "user-unordered-span-item">{user.email}</span>
                    <span className = "user-unordered-span-item">{user.role}</span>
                    <button type='button' onClick={()=>onHandleDelete(user.email)} className='all-user-delete-button'>
                        <MdDelete size = {25}/>
                    </button>
                        
                       
                    
                    
                </li>
                 <hr className='separator'/> 
                </>
                
            )
        })}
    </ul>
{/*     <ul className='user-details-unordered-list'>
        {allUsers.map((user)=>{
            return (
                <>
                    <li key={user._id} className='user-details-unordered-list-item'>
                    <p className='user-info'>USERNAME -  <span className='user-span'>{user.fullName}</span></p>
                    <p className='user-info'>EMAIL - <span className='user-span'>{user.email}</span></p>
                    <p className='user-info'>ROLE - <span className='user-span'>{user.role}</span></p>
                    <button type='button' onClick={()=>onHandleDelete(user.email)} className='all-user-delete-button'>
                        <MdDelete size = {25} style= {{color:"#ffffff"}} />
                    </button>    
                </li>  
                </>
                
            )
        })}
    </ul> */}
    
    </div>
   
    
    
}
