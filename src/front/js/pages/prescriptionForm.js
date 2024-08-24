import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const PrescriptionForm = () => {
  const { store, actions } = useContext(Context);
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "",
    medication: "",
    dosage: "",
    frequency: "",
    comments: "",
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
      prescriptionData.patientName === "" ||
      prescriptionData.medication === "" ||
      prescriptionData.dosage === "" ||
      prescriptionData.frequency === ""
    ) {
      alert("All fields except comments are required");
      return;
    }
    const success = await actions.createPrescription(prescriptionData);
    if (success) {
      alert("Prescription created successfully");
      setPrescriptionData({
        patientName: "",
        medication: "",
        dosage: "",
        frequency: "",
        comments: "",
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
          <label className="form-label">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={prescriptionData.patientName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Medication</label>
          <input
            type="text"
            name="medication"
            value={prescriptionData.medication}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dosage</label>
          <input
            type="text"
            name="dosage"
            value={prescriptionData.dosage}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Frequency</label>
          <input
            type="text"
            name="frequency"
            value={prescriptionData.frequency}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Additional Comments</label>
          <textarea
            name="comments"
            value={prescriptionData.comments}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Submit Prescription
        </button>
      </form>
    </div>
  );
};
