import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import '../component/index.css'
import { useNavigate } from 'react-router'

const Contacts = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();

  




  const deleteFromList = async (idContact) => {
    try {
      await actions.deleteContact(idContact)
    } catch (error) {
      console.error(error)
    }
  }




  

  return (
    <div className='Principal' >
      <div className='lista row' >
        <h3>Contact List:</h3>
        {
          store.contacts.map((item, index) => {

            return (
              <div className='Borde d-flex col-12' key={index}>
                <div>
                  <img className="" src={'https://cdn.readawrite.com/articles/16480/16479335/thumbnail/small.gif?1'} style={{ height: '180px', width: '140px' }} />
                </div>
                <div>
                  <h2>{item.name}</h2>
                  <h5 style={{ color: 'rgb(99, 98, 98)' }}>Adress: {item.address}</h5>
                  <h5 style={{ color: 'rgb(99, 98, 98)' }}>phone: {item.phone}</h5>
                  <h5 style={{ color: 'rgb(99, 98, 98)' }}>email: {item.email}</h5>
                </div>
                <div className='images'>
                  <i onClick={() => navigate('/edit/' +item.id )} className="edit fa-solid fa-pen-to-square"></i>

                  <i onClick={() => { deleteFromList(item.id) }} class="trash fa-solid fa-trash"></i>

                </div>
              </div>)

          })

        }
      </div>

    </div>
  )
}

export default Contacts