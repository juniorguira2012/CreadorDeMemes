
//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import Header from './components/Header';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  /*Variables linea1,linea2 y boton */
  const[linea1, setLinea1] = useState("");
  const[linea2, setLinea2] = useState("");
  const[image, setImage] = useState({preview: "",raw: ""});

  //upload image funtion
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image.raw);

    await fetch("YOUR_URL",{
      method:"POST",
      headers:{
        "Content-Type": "multipart/form-data"
      },
      body:formData
    });
  };
 
  //funciones para para realizar eventos
  const onChangeLinea1 = function(evento){
    setLinea1(evento.target.value)
  };

  //funciones para para realizar eventos
  const onChangeLinea2 = function(evento) {
    setLinea2(evento.target.value)
  };

  const onClickDownload= function(evento) {
    alert("Seguro que quiere descargar la Imagen")
    //Covirtiendo al imagen a png
    html2canvas(document.querySelector("#meme")).then(canvas => {
      var img = canvas.toDataURL("image/png");
      

   //Creando para descargar
      var link = document.createElement("a");
      link.download = "meme.png";
      link.href = img;
      link.click();
  });

  //
  };

  return (
    <div className="App">
          <Header
            titulo="Memes Creator"
           />
           <br />
          <div className="form-control"> 
          <br />
            <input className="form-control form-control-lg" onChange={onChangeLinea1} type="text"  placeholder="Write your first line" />
              <br />
            <input className="form-control form-control-lg" onChange={onChangeLinea2} type="text" placeholder="Write your second line"/>
          </div>
          
        
          <form>
            <div className="meme" id="meme">
              <span>{linea1}</span>
              <br />
              <span>{linea2}</span>
              
              <label for="upload-button" className=" p-1 mb-1 bg-white border border-secondary" >
                {image.preview ? (
                  <img className="img-thumbnail" src={image.preview} alt="dummy" width="100%" height="100%" />
                    ) : (
                  <>
                    <span className="fa-stack fa-2x mt-2 mb-4">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fas fa-store fa-stack-1x fa-inverse" />
                    </span>
                    <h5 className="text-center">Upload your image</h5>
                  </>
                )}
                <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChange}
                />
              </label>
            </div>
          </form>
       
        <button type="submit" className="btn btn-default" onClick={handleUpload}></button>
        <br />
        <button className="btn btn-primary btn-lg" onClick={onClickDownload}>Descargar</button>

        <p>Para Elegir otra imagen has click sobre la anterior</p>
    </div>
  );
}


export default App;
