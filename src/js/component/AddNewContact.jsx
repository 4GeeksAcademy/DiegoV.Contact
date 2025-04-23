import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../store/appContext';
import '../component/index.css'
import { useNavigate, useParams } from 'react-router';


const AddNewContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    })



    const handlerInput = async (e) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.phone || !data.address) {
            alert("No pueden estar los campos vacios")
            return;
        } 
        let result = null
        if(!id){ 
            result= await actions.addContact(data);

        }else{ 
            result = await actions.editContact(data, id);

        }
        if(result){ 
            navigate('/')
        }

    };

    const regresar = () => {
        navigate('/')
    }


    const info = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value //se guarden los nuevos valores se los trae de handlerInput
        })
    }

    useEffect(() => {
        if (store.contacts) {
            if (store.contacts.length > 0 && id) {
                const result = store.contacts.find(item => item.id == id)
                if (result) {
                    setData(result)

                }
            }
        }
    }, [store.contacts, id])
    return (
        <div>
            <div className="addContainer mt-5">
                              <h1>{!id ? 'Add New' : "Edit"} Contact</h1>
                <div className="mb-3">
                    <label className="form-label">Full name:</label>
                    <input type="text" className="form-control" name='name' onChange={info} value={data.name} id="formGroupExampleInput" placeholder="Full name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" name='email' onChange={info} value={data.email} id="formGroupExampleInput2" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone:</label>
                    <input type="number" className="form-control" name='phone' onChange={info} value={data.phone} id="formGroupExampleInput" placeholder="Enter phone" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Adress:</label>
                    <input type="email" className="form-control" name='address' onChange={info} value={data.address} id="formGroupExampleInput2" placeholder="Enter address" />
                </div>

                <div className="d-grid gap-2">
                    <button className="btn btn-success large-buttom my-3" onClick={handlerInput} type="button">Save</button>
                    <button className="btn btn-warning large-buttom my-2" onClick={regresar} type="button">go back to Contacts</button>
                </div>

            </div>

        </div>
    )
}

export default AddNewContact