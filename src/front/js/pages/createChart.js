import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateChart = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      inputValue.name == "" ||
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
    <div>
      <h1 className="text-center text-secondary">Add new patient</h1>
      <div className="d-flex border border-3 maindiv">
        <form
          action=""
          onSubmit={handleSubmit}
          className="container w-25 border border-3 maindiv mt-5"
        >
          <h3 className="mt-3">Demographics:</h3>
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
              Middle name (optional):
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
              Last name:
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
              Address:
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
              Phone number:
            </label>
            <input
              name="lastName"
              value={inputValue.lastName}
              onChange={(event) => handleChange(event)}
              type="number"
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
              type="email"
              className="form-control input-back"
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Gender:
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
              Date of birth:
            </label>
            <input
              name="lastName"
              value={inputValue.lastName}
              onChange={(event) => handleChange(event)}
              type="date"
              className="form-control input-back"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Assigned provider:
            </label>
            <input
              name="provider"
              value={inputValue.lastName}
              onChange={(event) => handleChange(event)}
              type="text"
              className="form-control input-back"
            />
          </div>
        </form>

        <form className="container w-25 border border-3 maindiv my-5">
          <h3>Pharmacy details</h3>

          <div>
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Name of pharmacy
            </label>
            <input
              name="pharmacy"
              value={inputValue.lastName}
              onChange={(event) => handleChange(event)}
              type="text"
              className="form-control input-back"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Pharmacy's address:
            </label>
            <input
              name="pharmacy_address"
              value={inputValue.lastName}
              onChange={(event) => handleChange(event)}
              type="text"
              className="form-control input-back"
            />
          </div>
        </form>

        <form className="container w-25 border border-3 maindiv my-5">
          <h3>Insurance details</h3>

          <div>
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Name of Insurance:
            </label>
            <input
              name="pharmacy_address"
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
              Insurance ID:
            </label>
            <input
              name="pharmacy_address"
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
              Coverage start date:
            </label>
            <input
              name="coverage_start"
              value={inputValue.lastName}
              onChange={(event) => handleChange(event)}
              type="date"
              className="form-control input-back"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Coverage end date:
            </label>
            <input
              name="coverage_end"
              value={inputValue.lastName}
              onChange={(event) => handleChange(event)}
              type="date"
              className="form-control input-back"
            />
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-dark w-25 mt-3 mb-3 saveButton"
        >
          Create
        </button>
      </div>
    </div>
  );
};
