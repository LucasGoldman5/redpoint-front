import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './header-informacion.css'
import {  Link } from 'react-router-dom';


const HeaderInformacion = () =>{

    
 const volver = () =>{
    window.location.assign(`/Tabla/?txt=${"cellphones"}`)
 }

 const home = () =>{
    window.location.assign(`/Tabla/?txt=${"cellphones"}`)
 }

    return(
        <>
        <header className="header-informacion">
      <Navbar className="contenedor-nav-informacion" bg="dark" variant="dark">
        <Container className="contenedor">
          <Navbar.Brand className="titulo-nav-informacion" onClick={home} href="#home">ClaroApp</Navbar.Brand>
          <Nav  >
            <li><Link className='nav-li-link-inicio' onClick={volver} to={`/Tabla/?txt=${"cellphones"}`}>Volver</Link></li>
          </Nav>
        </Container>
      </Navbar>
      </header>
        </>

    )
}

export default HeaderInformacion;