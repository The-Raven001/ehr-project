import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userType, setUserType } = useState("Select user type");
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  });

  function handleUserTypeSelection(userTypeValue) {
    setInputValue({ ...inputValue, userType: userTypeValue });
  }

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      inputValue.name == "" ||
      inputValue.lastName == "" ||
      inputValue.email == "" ||
      inputValue.password == ""
    ) {
      alert("the inputs can not be empty");
      return;
    }
    const success = await actions.signUp({
      name: inputValue.name,
      last_name: inputValue.last_name,
      email: inputValue.email,
      password: inputValue.password,
    });
  }

  console.log(inputValue);
  return (
    <div className="container w-25 border border-3 maindiv">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">
          {params.id ? "Edit contact" : "Create new user"}
        </h1>
        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Name:
          </label>
          <input
            name="name"
            value={inputValue.name}
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
            Lastname:
          </label>
          <input
            name="lastName"
            value={inputValue.lastName}
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
            Email:
          </label>
          <input
            name="email"
            value={inputValue.email}
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
            Password:
          </label>
          <input
            name="password"
            value={inputValue.password}
            onChange={(event) => handleChange(event)}
            type="password"
            className="form-control input-back"
          />
        </div>
        <div>
          <div class="dropdown mt-2 me-4">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userType}
            </button>
            <ul class="dropdown-menu">
              <li>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={() => handleUserTypeSelection("User")}
                >
                  User
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  type="button"
                  onClick={() => handleUserTypeSelection("Admin")}
                >
                  Admin
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-50 mt-3 mb-3 saveButton w-100"
        >
          Create
        </button>
      </form>
    </div>
  );
};
