import React, { useState,useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {store, actions} = useContext(Context);
    const [inputValue, setInputValue] = useState({
        name: "",
        lastName:"",
        email: "",
        password: ""
    });

    function handleChange(event) {
        setInputValue({ ...inputValue,[event.target.name]:event.target.value })
    }

    async function handleSubmit (event){
        event.preventDefault();
        if(inputValue.name == "" || inputValue.email == "" || inputValue.password == ""){
            alert("the inputs can not be empty");
            return
        }
        if(!params.id){
             actions.addContact(inputValue);
             navigate ("/")
        }else{
             actions.editContact(inputValue);
             navigate ("/")
        }
       
    }
    useEffect(()=>{
       if(params.id && store.contacts.length > 0){
            setInputValue(store.contacts.find(item => item.id == params.id))
       } 
    },[params.id, store.contacts]);
    return (
        <div className="container w-25 border border-3 maindiv">
            <form action="" onSubmit={handleSubmit}>
                <h1 className="text-center text-secondary">{params.id ? "Edit contact" : "Create new user"}</h1>
                <div>
                    <label htmlFor="" className="form-label text-secondary d-flex justify-content-start">Name:</label>
                    <input
                        name="name"
                        value={inputValue.name}
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="form-control input-back"
                    />
                </div>
                <div>
                    <label htmlFor="" className="form-label text-secondary d-flex justify-content-start">Lastname:</label>
                    <input
                        name="lastName"
                        value={inputValue.lastName}
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="form-control input-back"
                    />
                </div>
                <div>
                    <label htmlFor="" className="form-label text-secondary d-flex justify-content-start">Email:</label>
                    <input
                        name="email"
                        value={inputValue.email}
                        onChange={(event) => handleChange(event)}
                        type="text"
                        className="form-control input-back"
                    />
                </div>
                <div>
                    <label htmlFor="" className="form-label text-secondary d-flex justify-content-start">Password:</label>
                    <input
                        name="password"
                        value={inputValue.password}
                        onChange={(event) => handleChange(event)}
                        type="password"
                        className="form-control input-back"
                    />
                </div>
                <button type="submit" className="btn btn-dark w-50 mt-3 mb-3 saveButton">Create</button>
            </form>
        </div>
    )
};