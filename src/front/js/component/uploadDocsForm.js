import React, { useState } from "react";

const UploadDocsForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(`File uploaded successfully on: ${data.url}`);
      } else {
        const errorData = await response.json();
        setMessage(errorData || "There was an error uploading the file");
      }
    } catch (error) {
      setMessage("There was an error uploading the file");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center bg-light">
      <h3>Upload File</h3>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit} className="p-3 border rounded">
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Choose file
          </label>
          <input
            type="file"
            className="form-control"
            id="file-input"
            onChange={onFileChange}
          />
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Upload" />
        </div>
      </form>
    </div>
  );
};

export default UploadDocsForm;
