import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './start-header.css'
import {  Link } from 'react-router-dom';


const StartHeader = ({register}) =>{

  const home = () =>{
    window.location.reload()
  }

  return(
    <>
      <header className={register ? 'header-none' : 'header-inicio' }>
        <Navbar className="contenedor-nav-inicio" bg="dark" variant="dark">
          <Container className="contenedor">
            <a className="header-title" onClick={home} href="#home">RedPoint</a>
            <Nav className="contenedor-links-inicio" >
              <li><Link className='nav-li-link-inicio' to={'/login'}>Inicio</Link></li>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default StartHeader;