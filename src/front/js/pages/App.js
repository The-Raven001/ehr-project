import React from 'react';
import {app}  from './../../../firebase/fb';

function Upload() {
  const [archivoUrl, setArchivoUrl] = React.useState("");
  const [documentsList, setDocumentList] = React.useState([]);
  const archivoHandler = async (e) => {
    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("archivo subido", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL(); // Fixed getDownloadUrl to getDownloadURL
    setArchivoUrl(enlaceUrl);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const nombreArchivo = e.target.nombre.value;
    if (!nombreArchivo) {
      alert("Coloca un nombre");
      return;
    }
    const collectionRef = app.firestore().collection("archivos");
    await collectionRef.doc(nombreArchivo).set({ nombre: nombreArchivo, url: archivoUrl });
    console.log("archivo subido:", nombreArchivo, "url:", archivoUrl);
  };
  React.useEffect(() => {
    const fetchDocuments = async () => {
      const documentsList = await app.firestore().collection("archivos").get();
      setDocumentList(documentsList.docs.map((doc) => doc.data())); // Fixed to use docs instead of documents
    };
    fetchDocuments();
  }, []);
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="file" onChange={archivoHandler} />
        <input type="text" name="nombre" placeholder="nombre de archivo" />
        <button>Enviar</button>
      </form>
      <ul>
        {documentsList.map((document, index) => (
          <li key={index}>
            <h3>{document.nombre}</h3>
            <img src={document.url} height="100px" width="100px" alt={document.nombre} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Upload;