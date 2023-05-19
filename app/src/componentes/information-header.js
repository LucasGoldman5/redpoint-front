import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './information-header.css';
import {  Link } from 'react-router-dom';
import getEnviroment from "../helpers/getEnviroment";


const InformationHeader = () =>{
  
  const url = async () =>{
    const enviroment = await getEnviroment()
     return  enviroment.url
  }


  const comeBack = async () =>{
    const apiURL = await url();
    window.location.assign(`${apiURL}Table/report/reparations-pending`);
  }

  const home = async () =>{
    const apiURL = await url();
    window.location.assign(`${apiURL}Table/report/reparations-pending`);
  }

    return(
        <>
            <header className="header-informacion">
                <Navbar className="contenedor-nav-informacion" bg="dark" variant="dark">
                    <Container className="contenedor">
                    <Navbar.Brand className="titulo-nav-informacion" onClick={home} href="#home">ClaroApp</Navbar.Brand>
                    <Nav  >
                        <Link className='nav-li-link-inicio' onClick={comeBack} >Volver</Link>
                    </Nav>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default InformationHeader;