import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditPrescriptionForm = () => {
  const { store, actions } = useContext(Context);
  const [prescriptionData, setPrescriptionData] = useState({
    name_of_medication: "",
    quantity: "",
    quantity_of_refills: "",
    patient_id: "",
  });
  const { id } = useParams(); // Obtener el ID de la prescripción desde la URL

  useEffect(() => {
    // Cargar los datos de la prescripción existente
    const loadPrescription = async () => {
      const data = await actions.getPrescriptionById(id);
      if (data) {
        setPrescriptionData({
          name_of_medication: data.name_of_medication,
          quantity: data.quantity,
          quantity_of_refills: data.quantity_of_refills,
          patient_id: data.patient_id,
        });
      }
    };
    loadPrescription();
  }, [id, actions]);

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
    const success = await actions.updatePrescription(id, prescriptionData);
    if (success) {
      alert("Prescription updated successfully");
      history.push("/protected/prescriptions"); // Redirigir a la lista de prescripciones
    } else {
      alert("Failed to update prescription");
    }
  };

  return (
    <div className="container w-50 border border-3 mt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Edit Prescription</h1>
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
        <button
          type="submit"
          className="btn btn-dark w-50 mt-3 mb-3 saveButton w-100"
        >
          Update prescription
        </button>
      </form>
    </div>
  );
};
