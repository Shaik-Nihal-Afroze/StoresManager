import {useState,useEffect} from 'react'
import "./index.css"
import { useAuthStore } from '../../store/useAuthStore.js'
import React from 'react'

export const AllUsers = ()=>{
    const {getAllUsers,allUsers} = useAuthStore()
    const allUsersFields = [
        {id:'FullName'},
        {id:'Email'},
        {id:'Role'}
    ]
    useEffect(()=>{
        getAllUsers()
    },[])
    console.log({allUsers})
   return <div className='allusers-bg-container'>
    
    <ul className='userfields-unordered-list'>{allUsersFields.map((field)=>{return (
        <>
            <li key={field.id} className='userfield-list-item'>
                <span>{field.id}
                </span>
            </li>
            {/* <hr className='separator'/> */}
        </>
        
    )})}</ul>
    <ul className='user-unordered-list'>
        {allUsers.map((user)=>{
            return (
                <>
                    <li key={user._id}  className='user-unordered-list-item'>
                    <span>{user.fullName}</span>
                    <span>{user.email}</span>
                    <span>{user.role}</span>
                        
                        
                        
                    
                    
                </li>
                 <hr className='separator'/> 
                </>
                
            )
        })}
    </ul>
    
    </div>
   
    
    
}