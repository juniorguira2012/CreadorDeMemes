
//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import html2canvas from 'html2canvas';

function App() {
  /*Variables linea1,linea2 y boton */
  const[linea1, setLinea1] = useState("");
  const[linea2, setLinea2] = useState("");
  const[imagen, setImagen] = useState("");

  //funciones para para realizar eventos
  const onChangeLinea1 = function(evento){
    setLinea1(evento.target.value)
  }

  //funciones para para realizar eventos
  const onChangeLinea2 = function(evento) {
    setLinea2(evento.target.value)
  }

  const onChangeImagen = function(evento) {
    setImagen(evento.target.value)
  }

  const onClickDescargar= function(evento) {
    alert("Descargar")
    //Covirtiendo al imagen a png
    html2canvas(document.querySelector("#meme")).then(canvas => {
      var img = canvas.toDataURL("image/png");
      

   //Creando para descargar
      var link = document.createElement("a");
      link.download = "meme.png";
      link.href = img;
      link.click();
  });
  }

  return (
    <div className="App">
        <select onChange={onChangeImagen}>
          <option value="fire">Casa en llamas</option>
          <option value="futurama">Futurama</option>
          <option value="historychanel">History channel</option>
          <option value="matrix">Matrix</option>
          <option value="philosoraptor">Philosoraptor</option>
          <option value="smart">Smart Guy</option>
        </select>

        <br/>
        <input onChange={onChangeLinea1} type="text" placeholder="Line One" />
        <br/>
        <input onChange={onChangeLinea2} type="text" placeholder="Line Two"/>
        <br/>
        <button onClick={onClickDescargar}>Descargar</button>

        <div className="meme" id="meme">
          <span>{linea1}</span>
          <br />
          <span>{linea2}</span>
          <img src={"/img/"+imagen+".jpg"}/>
        </div>
    </div>
  );
}


export default App;
