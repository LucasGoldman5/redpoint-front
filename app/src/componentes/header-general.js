import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header-general.css'
import {  Link } from 'react-router-dom';
import GetUserData from './../helpers/getUserData';




const HeaderGeneral = ( ) =>{

  const [usuario,setUsuario] = useState( GetUserData() );
  const [desplegable, setDesplegable] = useState(true)
  const [menuLinksDesplegables, setMenuLinksDesplegables] = useState(true);



  const linksDesplegables = () =>{
    setMenuLinksDesplegables(!menuLinksDesplegables)
  }

  const menuDesplegable = () =>{
    setDesplegable(!desplegable)
  }

  const cerrarSesion = ( ) =>{
    localStorage.removeItem('Usuario');
    setDesplegable(false)
    window.location.assign('/Login')
  }
 

    return(

        <>
        <header className="header">
      <Navbar className="contenedor-nav-general" bg="dark" variant="dark">
        <div className="contenedor-general">
          <div className="contenedor-titulo">
            <Navbar.Brand className="titulo-nav"  href="#home">ClaroApp</Navbar.Brand>
          </div>
          <div className="contenedor-contenedor-links">
          <Nav >
            <button className="boton-tablas" onClick={linksDesplegables}>Tablas</button>
              <div className={menuLinksDesplegables ?"contenedor-links none" :"contenedor-links"}>
                <li className='nav-li-link'><Link onClick={window.location.reload} to={`/Tabla/?txt=${"brands"}`}>Marcas</Link></li>
                <li className='nav-li-link'><Link onClick={window.location.reload} to={`/Tabla/?txt=${"cellphones"}`}>celulares</Link></li> 
                <li className='nav-li-link' >servicios</li> 
              </div>
          </Nav>
          </div>
        </div>
           <div className="contenedor-micuenta">
              <div onClick={menuDesplegable} className="icono-micuenta">
                  <h2 className="letra-micuenta">{(usuario) ?usuario.name.charAt(0).toUpperCase(): 'Mi'}</h2>
                  <div className={desplegable ? "micuenta-desplegable none" : "micuenta-desplegable"}>
                    <li className="li-micuenta">Mi cuenta</li>
                    <li  className="li-micuenta"><Link onClick={cerrarSesion} to={"*" }>Cerrar Sesion</Link> </li>
                </div>
                </div>
           </div>
      </Navbar>
      
      </header>
        </>

    )
}

export default HeaderGeneral