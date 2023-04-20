import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './nav.css' ;

const NavBar = () => {


    return(

   <>
        <Navbar className="contenedor-nav" bg="dark" variant="dark">
        <Container className="contenedor">
          <Navbar.Brand className="titulo-nav" href="#home">ClaroApp</Navbar.Brand>
          <Nav className="contenedor-links" >
            <Nav.Link href="#home">Marcas</Nav.Link>
            <Nav.Link href="#features">Reparaciones</Nav.Link>
            <Nav.Link href="#pricing">Servicios</Nav.Link>
            <Nav.Link href="#etc">etc</Nav.Link>
            <Nav.Link href="#etc">etc</Nav.Link>
            <Nav.Link href="#etc">etc</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
   </>

    )
}

export default NavBar;