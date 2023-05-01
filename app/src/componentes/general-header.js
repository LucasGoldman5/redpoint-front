import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './general-header.css';
import { Link } from 'react-router-dom';
import GetUserData from '../helpers/getUserData';




const GeneralHeader = ( ) =>{

  const [user,setUser] = useState( GetUserData() );
  const [dropdown, setDropdown] = useState(true);
  const [dropdownLinksMenu, setDropdownLinksMenu] = useState(true);



  const linksDropdowns = () =>{
    setDropdownLinksMenu(!dropdownLinksMenu);
  };

  const menuDropdown = () =>{
    setDropdown(!dropdown);
  };

  const myInformation = () =>{
    window.location.assign('/PersonalInformation');
  };

  const signOff = ( ) =>{
    localStorage.removeItem('user');
    setDropdown(false);
    window.location.assign('/Login');
  };
   
  const reload = () =>{

    setTimeout(()=>{
       window.location.reload();
    },100)
  };

  return(

    <>
      <header className="header">
        <Navbar className="contenedor-nav-general" bg="dark" variant="dark">
          <div className="contenedor-general">
            <div className="contenedor-titulo">
              <Navbar.Brand className="titulo-nav"  href="http://localhost:3000/Tabla/?txt=cellphones">ClaroApp</Navbar.Brand>
            </div>
            <div className="contenedor-contenedor-links">
              <Nav >
                <button className="boton-tablas" onClick={linksDropdowns}>Tablas</button>
                <div className={dropdownLinksMenu ?"contenedor-links none" :"contenedor-links"}>
                  <li className='nav-li-link'><Link onClick={()=> reload() } to={`/Table/?txt=${"brands"}`}>Marcas</Link></li>
                  <li className='nav-li-link'><Link onClick={()=> reload()} to={`/Table/?txt=${"cellphones"}`}>Celulares</Link></li> 
                  <li className='nav-li-link'><Link onClick={()=> reload()} to={`/Table/?txt=${"services"}`}>Servicios</Link></li>
                  <li className='nav-li-link'><Link onClick={()=> reload()} to={`/Table/?txt=${"customers"}`}>Clientes</Link></li> 
                </div>
              </Nav>
            </div>
          </div>
          <div className="contenedor-micuenta">
            <div onClick={menuDropdown} className="icono-micuenta">
              <h2 className="letra-micuenta">{(user) ?user.name.charAt(0).toUpperCase(): 'Mi'}</h2>
            </div>
            <div className={dropdown ? "micuenta-desplegable none" : "micuenta-desplegable"}>
              <li className="li-micuenta"><Link onClick={myInformation} to={'/InformacionPersonal'}>Mi cuenta</Link></li>
              <li  className="li-micuenta"><Link onClick={signOff} to={"*" }>Cerrar Sesion</Link> </li>
            </div>
          </div>
        </Navbar>
      </header>
    </>
  );
};

export default GeneralHeader;