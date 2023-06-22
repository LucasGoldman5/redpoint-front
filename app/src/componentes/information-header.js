import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './information-header.css';
import {  Link } from 'react-router-dom';


const InformationHeader = ({enviroment}) =>{
  

  const originUrl = window.location.href
  const parsedUrl = new URL(originUrl);
  const baseUrl = parsedUrl.origin;

  const comeBack = async () =>{
    window.location.assign(`${baseUrl}/${enviroment.selfUrl.dataTable}${enviroment.entities.pending}`);
  }

    return(
        <>
            <header className="header-informacion">
                <Navbar className="contenedor-nav-informacion" bg="dark" variant="dark">
                    <Container className="contenedor">
                    <a className="header-title" href={`${baseUrl}/${enviroment.selfUrl.dataTable}${enviroment.entities.pending}`}>RedPoint</a>
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