import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './information-header.css';
import {  Link } from 'react-router-dom';


const InformationHeader = () =>{

    
  const comeBack = () =>{
    window.location.assign(`http://localhost:3000/Table/cellphones`);
  }

  const home = () =>{
    window.location.assign(`http://localhost:3000/Table/cellphones`);
  }

    return(
        <>
            <header className="header-informacion">
                <Navbar className="contenedor-nav-informacion" bg="dark" variant="dark">
                    <Container className="contenedor">
                    <Navbar.Brand className="titulo-nav-informacion" onClick={home} href="#home">ClaroApp</Navbar.Brand>
                    <Nav  >
                        <li><Link className='nav-li-link-inicio' onClick={comeBack} to={`/Tabla/?txt=${"cellphones"}`}>Volver</Link></li>
                    </Nav>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default InformationHeader;