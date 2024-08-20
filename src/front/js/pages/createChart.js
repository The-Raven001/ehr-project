import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateChart = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [selectedGender, setSelectedGender] = useState("Select Gender");
  const [inputValue, setInputValue] = useState({
    name: "",
    middleName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    dob: "",
    provider: "",
    pharmacyName: "",
    pharmacyAddress: "",
    nameOfInsurance: "",
    insuranceId: "",
    coverageStartDate: "",
    coverageEndDate: "",
    gender: selectedGender,
  });

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  function handleGenderSelect(gender) {
    setSelectedGender(gender);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      inputValue.name == "" ||
      inputValue.lastName == "" ||
      inputValue.address == "" ||
      inputValue.phone == "" ||
      inputValue.dob == ""
    ) {
      alert("Some inputs can not be empty");
      return;
    }
    if (selectedGender == "Select Gender") {
      alert("Please select a gender");
    }
  }

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="container w-50 border border-3 maindiv mt-5 mb-3 bg-light"
      >
        <h1 className="text-center text-secondary bg">Add new patient</h1>
        <h3 className="mt-3">Demographics:</h3>

        <div className="d-flex row">
          <div className="col-4">
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

          <div className="col-4">
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Middle name (optional):
            </label>
            <input
              name="lastName"
              value={inputValue.middleName}
              onChange={(event) => handleChange(event)}
              type="text"
              className="form-control input-back"
            />
          </div>

          <div className="col-4">
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
        </div>

        <div className="row">
          <div className="col-10">
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Address:
            </label>
            <textarea
              name="address"
              value={inputValue.address}
              onChange={(event) => handleChange(event)}
              type="text"
              className="form-control input-back"
            />
          </div>
        </div>

        <div>
          <div className="d-flex row">
            <div className="col-6">
              <label
                htmlFor=""
                className="form-label text-secondary d-flex justify-content-start"
              >
                Phone number:
              </label>
              <input
                name="phone"
                value={inputValue.phone}
                onChange={(event) => handleChange(event)}
                type="number"
                className="form-control input-back"
              />
            </div>

            <div className="col-6">
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
          </div>
        </div>

        <div className="d-flex row">
          <div className="col-3">
            Gender:
            <div class="dropdown mt-2 me-4">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedGender}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => handleGenderSelect("Female")}
                  >
                    Female
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => handleGenderSelect("Male")}
                  >
                    Male
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={() => handleGenderSelect("Unspecified")}
                  >
                    Unspecified
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-4">
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Date of birth:
            </label>
            <input
              name="dob"
              value={inputValue.dob}
              onChange={(event) => handleChange(event)}
              type="date"
              className="form-control input-back"
            />
          </div>

          <div className="col-4">
            <label
              htmlFor=""
              className="form-label text-secondary d-flex justify-content-start"
            >
              Assigned provider:
            </label>
            <input
              name="provider"
              value={inputValue.provider}
              onChange={(event) => handleChange(event)}
              type="text"
              className="form-control input-back"
            />
          </div>
        </div>

        <div>
          <h3 className="mt-3">Pharmacy details</h3>

          <div className="row">
            <div className="col-6">
              <label
                htmlFor=""
                className="form-label text-secondary d-flex justify-content-start col-6"
              >
                Name of pharmacy:
              </label>
              <input
                name="pharmacy"
                value={inputValue.pharmacyName}
                onChange={(event) => handleChange(event)}
                type="text"
                className="form-control input-back"
              />
            </div>

            <div className="col-6">
              <label
                htmlFor=""
                className="form-label text-secondary d-flex justify-content-start"
              >
                Pharmacy's address:
              </label>
              <textarea
                name="pharmacyAddress"
                value={inputValue.pharmacyAddress}
                onChange={(event) => handleChange(event)}
                type="text"
                className="form-control input-back"
              />
            </div>
          </div>

          <h3>Insurance details</h3>

          <div className="flex row">
            <div className="col-6">
              <label
                htmlFor=""
                className="form-label text-secondary d-flex justify-content-start"
              >
                Name of Insurance:
              </label>
              <input
                name="NameOfInsurance"
                value={inputValue.nameOfInsurance}
                onChange={(event) => handleChange(event)}
                type="text"
                className="form-control input-back"
              />
            </div>

            <div className="col-6">
              <label
                htmlFor=""
                className="form-label text-secondary d-flex justify-content-start"
              >
                Insurance ID:
              </label>
              <input
                name="insuranceId"
                value={inputValue.insuranceId}
                onChange={(event) => handleChange(event)}
                type="text"
                className="form-control input-back"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label
                htmlFor=""
                className="form-label text-secondary d-flex justify-content-start"
              >
                Coverage start date:
              </label>
              <input
                name="coverageStart"
                value={inputValue.coverageStartDate}
                onChange={(event) => handleChange(event)}
                type="date"
                className="form-control input-back"
              />
            </div>

            <div className="col-6">
              <label
                htmlFor=""
                className="form-label text-secondary d-flex justify-content-start"
              >
                Coverage end date:
              </label>
              <input
                name="coverageEnd"
                value={inputValue.coverageEndDate}
                onChange={(event) => handleChange(event)}
                type="date"
                className="form-control input-back"
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark w-50 mt-3 mb-3 saveButton"
          >
            Create
          </button>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <Link to="/search">
            <span>Go back</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
