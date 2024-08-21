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
    middle_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    email: "",
    dob: "",
    provider: "",
    pharmacy_name: "",
    pharmacy_address: "",
    name_of_insurance: "",
    subscriber_id: "",
    coverage_start_date: "",
    coverage_end_date: "",
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
      inputValue.phone_number == "" ||
      inputValue.dob == "" ||
      inputValue.email == ""
    ) {
      alert("Some inputs can not be empty");
      return;
    }
    if (selectedGender == "Select Gender") {
      alert("Please select a gender");
    }

    const success = await actions.createChart({
      // Needs fix!!
      chart: inputValue.chart,

      name: inputValue.name,
      middle_name: inputValue.middleName,
      last_name: inputValue.lastName,
      address: inputValue.address,
      phone_number: inputValue.phone_number,
      email: inputValue.email,
      gender: selectedGender,
      dob: inputValue.dob,

      // Needs fix!!
      office_id: inputValue.office_id,

      name_of_insurance: inputValue.name_of_insurance,
      subscriber_id: inputValue.subscriber_id,
      subscription_start_date: inputValue.subscription_start_date,
      subscription_end_date: inputValue.subscription_end_date,
      financial_class_of_insurance: inputValue.financial_class_of_insurance,

      name_of_pharmacy: inputValue.name_of_pharmacy,
      address_of_pharmacy: inputValue.address_of_pharmacy,
    });

    if (success) {
      navigate("/search");
    } else {
      alert("There was a problem creating the chart");
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
              name="last_name"
              value={inputValue.middle_name}
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
              name="last_name"
              value={inputValue.last_name}
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
                name="phone_number"
                value={inputValue.phone_number}
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
          <div className="col-3 text-secondary">
            Gender:
            <div class="dropdown mt-2 me-4">
              <button
                class="btn btn-secondary dropdown-toggle px-4"
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
                value={inputValue.pharmacy_name}
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
                name="pharmacy_address"
                value={inputValue.pharmacy_address}
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
                name="Name_of_insurance"
                value={inputValue.name_of_insurance}
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
                name="subscriber__id"
                value={inputValue.subscriber_id}
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
                name="coverage_start_date"
                value={inputValue.coverage_start_date}
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
                name="coverage_end_date"
                value={inputValue.coverage_end_date}
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

      <div className="col-4">
        <label
          htmlFor=""
          className="form-label text-secondary d-flex justify-content-start"
        >
          Chart
        </label>
        <input
          name="chart"
          value={inputValue.chart}
          onChange={(event) => handleChange(event)}
          type="number"
          className="form-control input-back"
        />
      </div>

      <div className="col-4">
        <label
          htmlFor=""
          className="form-label text-secondary d-flex justify-content-start"
        >
          Office
        </label>
        <input
          name="office_id"
          value={inputValue.office_id}
          onChange={(event) => handleChange(event)}
          type="number"
          className="form-control input-back"
        />
      </div>
    </div>
  );
};
