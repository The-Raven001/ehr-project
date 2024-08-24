import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const PrescriptionForm = () => {
  const { store, actions } = useContext(Context);
  const [prescriptionData, setPrescriptionData] = useState({
    name_of_medication: "",
    quantity: "",
    quantity_of_refills: "",
    patient_id: "",
  });

  const handleChange = (event) => {
    setPrescriptionData({
      ...prescriptionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      prescriptionData.name_of_medication === "" ||
      prescriptionData.quantity === "" ||
      prescriptionData.quantity_of_refills === "" ||
      prescriptionData.patient_id === ""
    ) {
      alert("All fields are required");
      return;
    }
    const success = await actions.createPrescription(prescriptionData);
    if (success) {
      alert("Prescription created successfully");
      setPrescriptionData({
        name_of_medication: "",
        quantity: "",
        quantity_of_refills: "",
        patient_id: "",
      });
    } else {
      alert("Failed to create prescription");
    }
  };

  return (
    <div className="container w-50 border border-3 mt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Create Prescription</h1>
        <div className="mb-3">
          <label className="form-label">Medication Name</label>
          <input
            type="text"
            name="name_of_medication"
            value={prescriptionData.name_of_medication}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={prescriptionData.quantity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity of Refills</label>
          <input
            type="number"
            name="quantity_of_refills"
            value={prescriptionData.quantity_of_refills}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Patient ID</label>
          <input
            type="number"
            name="patient_id"
            value={prescriptionData.patient_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Submit Prescription
        </button>
      </form>
    </div>
  );
};
