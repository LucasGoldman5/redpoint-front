import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './header-inicio.css'
import {  Link } from 'react-router-dom';


const HeaderInicio = ({registrado}) =>{

  const home = () =>{
    window.location.reload()
  }

  return(
    <>
      <header className={registrado ? 'header-none' : 'header-inicio' }>
        <Navbar className="contenedor-nav-inicio" bg="dark" variant="dark">
          <Container className="contenedor">
            <Navbar.Brand className="titulo-nav-inicio" onClick={home} href="#home">ClaroApp</Navbar.Brand>
            <Nav className="contenedor-links-inicio" >
              <li><Link className='nav-li-link-inicio' to={'/Login'}>Inicio</Link></li>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default HeaderInicio;