import HeaderInicio from './componentes/header-inicio';
import HeaderGeneral from './componentes/header-general';
import Tabla from './componentes/tabla';
import SignUp from './componentes/signUp';
import Login from './componentes/login';
import { json, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import GetUserData from './helpers/getUserData';




function App()  {


 /* const [cambiarHeader, setCambiarHeader] = useState();
  
  
  
  const [volverLogin, setVolverLogin] = useState (true)
  const [registro, setRegistro] = useState ([])
  const [registroPrincipal, setRegistroPrincipal]= useState([])
  const [mensajeAlerta, setMensajeAlerta] = useState("") */





  /*const onSubmit = async (data) =>{
    setRegistro(data)
  console.log(registro)
  let traerRegistro = localStorage.getItem('usuarioRegistrado') 
    if (traerRegistro){
      traerRegistro = JSON.parse(traerRegistro)
      console.log(traerRegistro)
      if(traerRegistro.nombre === registro.nombre && traerRegistro.contraseña2 === registro.contraseña){
        setCambiarHeader  (data)
        localStorage.setItem('usuario', JSON.stringify(registro))
    if (cambiarHeader.nombre && cambiarHeader.contraseña){
      setRegistrado(true)
      setIniciado(true)
      setCambiarPagina(false)
    }else{
      setCambiarPagina(true)
    }
      } else if(){
        setMensajeAlerta("el nombre de usuario o contraseña no coinciden")
      } 
  }else{
    setMensajeAlerta("El usuario ingresado no existe, asegure estar registrado")
  }
  }   */




  /*const onSubmitSign = (data) =>{
    setRegistroPrincipal(data)
    localStorage.setItem('usuarioRegistrado', JSON.stringify(registroPrincipal))
    if(registroPrincipal.nombre && registroPrincipal.contraseña2){
      setVolverLogin(false)
    }else{
      setVolverLogin(true)
    }
  }*/

const [cambiarPagina, setCambiarPagina] = useState (false)
const [registrado, setRegistrado] = useState(false)
const [iniciado, setIniciado] = useState(false)
const [usuario, setUsuario] = useState(GetUserData())




const ingresarAplicacion = () =>{
   window.location.assign(`/Tabla/?txt=${"cellphones"}`)
} 



  if(usuario){
    return (
      <>
        <div className="App">
          <HeaderGeneral></HeaderGeneral>
        <Routes>
              <Route path='/Tabla' element={<Tabla/>}></Route>
              <Route path= '/Login'  element={<Login ingresarAplicacion={ingresarAplicacion}  />}  ></Route>   
        </Routes>
      </div>
      </>
    
    );
  }else{
    return (
      <>
        <div className="App">
          <HeaderInicio></HeaderInicio>
        <Routes>
              <Route path= '*'  element={<Login ingresarAplicacion={ingresarAplicacion}  />}  ></Route>   
        </Routes>
      </div>
      </>
    
    );
  }
 
}

export default App;
