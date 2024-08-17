import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    office_key: "",
  });

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      inputValue.nameFacility == "" ||
      inputValue.address == "" ||
      inputValue.adminName == "" ||
      inputValue.adminLastName == "" ||
      inputValue.email == "" ||
      inputValue.password == ""
    ) {
      alert("the inputs can not be empty");
      return;
    }
    if (!params.id) {
      actions.addContact(inputValue);
      navigate("/");
    } else {
      actions.editContact(inputValue);
      navigate("/");
    }
  }
  useEffect(() => {
    if (params.id && store.contacts.length > 0) {
      setInputValue(store.contacts.find((item) => item.id == params.id));
    }
  }, [params.id, store.contacts]);
  return (
    <div className="container w-25 border border-3 mt-5 maindiv">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Signup</h1>
        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Name Of Facility
          </label>
          <input
            name="nameFacility"
            value={inputValue.nameFacility}
            onChange={(event) => handleChange(event)}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Address
          </label>
          <input
            name="Address"
            value={inputValue.address}
            onChange={(event) => handleChange(event)}
            type="text"
            className="form-control input-back"
          />
        </div>
        <h3 className="text-secondary mt-3">Admin user</h3>
        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Name
          </label>
          <input
            name="name"
            value={inputValue.adminName}
            onChange={(event) => handleChange(event)}
            type="text"
            className="form-control input-back"
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Last Name
          </label>
          <input
            name="lastName"
            value={inputValue.adminLastName}
            onChange={(event) => handleChange(event)}
            type="text"
            className="form-control input-back"
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Email
          </label>
          <input
            name="email"
            value={inputValue.email}
            onChange={(event) => handleChange(event)}
            type="email"
            className="form-control input-back"
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Password
          </label>
          <input
            name="password"
            value={inputValue.password}
            onChange={(event) => handleChange(event)}
            type="password"
            className="form-control input-back"
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark w-50 mt-3 mb-3 saveButton"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};
