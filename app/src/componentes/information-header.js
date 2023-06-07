import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './information-header.css';
import {  Link } from 'react-router-dom';


const InformationHeader = ({enviroment}) =>{
  

  const comeBack = async () =>{
    window.location.assign(`${enviroment.selfUrl.main}${enviroment.selfUrl.dataTable}${enviroment.entities.pending}`);
  }

  const home = async () =>{
    window.location.assign(`${enviroment.selfUrl.main}${enviroment.selfUrl.dataTable}${enviroment.entities.pending}`);
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