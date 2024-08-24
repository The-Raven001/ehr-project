import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditProfile = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [inputValue, setInputValue] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  });

  useEffect(() => {
    // Cargar los datos del perfil existente cuando se monta el componente
    const loadProfile = async () => {
      const profile = await actions.getProfile(params.id); // Supongamos que existe esta acción en flux
      if (profile) {
        setInputValue({
          name: profile.name,
          lastName: profile.last_name,
          email: profile.email,
          password: "", // No cargar la contraseña
          userType: profile.user_type,
        });
      }
    };
    loadProfile();
  }, [params.id]);

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      inputValue.name === "" ||
      inputValue.lastName === "" ||
      inputValue.email === ""
    ) {
      alert("The inputs cannot be empty");
      return;
    }
    const success = await actions.updateProfile(params.id, {
      name: inputValue.name,
      last_name: inputValue.lastName,
      email: inputValue.email,
      password: inputValue.password ? inputValue.password : undefined,
      user_type: inputValue.userType,
    });

    if (success) {
      alert("Profile updated successfully!");
      history.push("/profiles"); // Redirige a una lista de perfiles o donde sea necesario
    } else {
      alert("Error updating profile");
    }
  }

  return (
    <div className="container w-25 border border-3 maindiv">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Edit Profile</h1>
        <div>
          <label
            htmlFor="name"
            className="form-label text-secondary d-flex justify-content-start"
          >
            Name:
          </label>
          <input
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="form-label text-secondary d-flex justify-content-start"
          >
            Lastname:
          </label>
          <input
            name="lastName"
            value={inputValue.lastName}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="form-label text-secondary d-flex justify-content-start"
          >
            Email:
          </label>
          <input
            name="email"
            value={inputValue.email}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="form-label text-secondary d-flex justify-content-start"
          >
            Password:
          </label>
          <input
            name="password"
            value={inputValue.password}
            onChange={handleChange}
            type="password"
            className="form-control input-back"
            placeholder="Leave blank to keep current password"
          />
        </div>
        <div>
          <label
            htmlFor="userType"
            className="form-label text-secondary d-flex justify-content-start"
          >
            Select role:
          </label>
          <select
            name="userType"
            className="form-select"
            value={inputValue.userType}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-50 mt-3 mb-3 saveButton w-100"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
