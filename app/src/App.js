import HeaderInicio from './componentes/header-inicio';
import HeaderGeneral from './componentes/header-general';
import HeaderInformacion from './componentes/header-informacion';
import Tabla from './componentes/tabla';
import InformacionPersonal from './componentes/informacionpersonal';
import Login from './componentes/login';
import { json, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import GetUserData from './helpers/getUserData';




function App()  {

  
  const [usuario, setUsuario] = useState(GetUserData())




const ingresarAplicacion = () =>{
   window.location.assign(`/Tabla/?txt=${"cellphones"}`)
} 



  if(usuario && window.location.href != "http://localhost:3000/InformacionPersonal"){
    return (
      <>
        <div className="App">
          <HeaderGeneral></HeaderGeneral>
        <Routes>
              <Route path='/Tabla' element={<Tabla/>}></Route>
              <Route path= '/Login'  element={<Login ingresarAplicacion={ingresarAplicacion}  />}  ></Route> 
              <Route path='/InformacionPersonal' element={<InformacionPersonal />}></Route>  
        </Routes>
      </div>
      </>
    
    );
  }else if(usuario && window.location.href==="http://localhost:3000/InformacionPersonal"){

     return(
      <>
        <div className="App">
          <HeaderInformacion></HeaderInformacion>
        <Routes>
              <Route path={`/InformacionPersonal`} element={<InformacionPersonal></InformacionPersonal>}></Route>
              <Route path={`*`} element={<Tabla />}></Route>
        </Routes>
      </div>
      </>
     )

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
