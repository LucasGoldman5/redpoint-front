import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './general-header.css';
import { Link } from 'react-router-dom';
import GetUserData from '../helpers/getUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faM,faMobileRetro,faBuilding,faUsers,faScrewdriverWrench,faFileLines } from '@fortawesome/free-solid-svg-icons';


const GeneralHeader = ( ) =>{

  const [user,setUser] = useState( GetUserData() );
  const [dropdown, setDropdown] = useState(true);
  const [dropdownLinksMenu, setDropdownLinksMenu] = useState(true);
  const [seeingPBrand, setSeeingPBrand] = useState(false);
  const [seeingPCellphone, setSeeingPCellphone] = useState(false);
  const [seeingPService, setSeeingPService] = useState(false);
  const [seeingPCustomer, setSeeingPCustomer] = useState(false);
  const [seeingPReparation, setSeeingPReparation] = useState(false);
  const [seeingPReport, setSeeingPReport] = useState(false);




  const linksDropdowns = () =>{
    setDropdownLinksMenu(!dropdownLinksMenu);
  };

  const menuDropdown = () =>{
    setDropdown(!dropdown);
  };

  const myInformation = () =>{
    window.location.assign('/personal-information');
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

  const seeP = (e) =>{
    if(e === "b"){
      setSeeingPBrand(!seeingPBrand);
    }else if(e === "ce"){
      setSeeingPCellphone(!seeingPCellphone)
    }else if(e === "s"){
      setSeeingPService(!seeingPService)
    }else if(e === "cu"){
      setSeeingPCustomer(!seeingPCustomer)
    }else if(e === "rn"){
      setSeeingPReparation(!seeingPReparation)
    }else if(e === "rt"){
      setSeeingPReport(!seeingPReport)
    } 
  }

  return(

    <>
      <header className="header">
        <Navbar className="contenedor-nav-general" bg="dark" variant="dark">
          <div className="contenedor-general">
            <div className="contenedor-titulo">
              <Navbar.Brand className="titulo-nav"  href="http://localhost:3000/Table/cellphones">ClaroApp</Navbar.Brand>
            </div>
            <div className="contenedor-contenedor-links">
              <Nav >
                  <li className='nav-li-link'><Link onMouseEnter={()=>seeP("b")} onMouseLeave={()=>seeP("b")} onClick={()=> reload() } to={`/Table/brands`}><FontAwesomeIcon className={(window.location.href === "http://localhost:3000/Table/brands")? "icon" : "icon-none"}  icon={faM}></FontAwesomeIcon><p className={seeingPBrand ? "p-entity" : "p-entity-none"}>Marcas</p></Link></li>
                  <li className='nav-li-link'><Link onMouseEnter={()=>seeP("ce")} onMouseLeave={()=>seeP("ce")}  onClick={()=> reload()} to={`/Table/cellphones`}><FontAwesomeIcon className={(window.location.href === "http://localhost:3000/Table/cellphones")? "icon" : "icon-none"} icon={faMobileRetro}></FontAwesomeIcon><p className={seeingPCellphone ? "p-entity" : "p-entity-none"}>Celulares</p></Link></li> 
                  <li className='nav-li-link'><Link onMouseEnter={()=>seeP("s")} onMouseLeave={()=>seeP("s")}   onClick={()=> reload()} to={`/Table/services`}><FontAwesomeIcon className={(window.location.href === "http://localhost:3000/Table/services")? "icon" : "icon-none"} icon={faBuilding}></FontAwesomeIcon><p className={seeingPService ? "p-entity" : "p-entity-none"}>Servicios</p></Link></li>
                  <li className='nav-li-link'><Link onMouseEnter={()=>seeP("cu")} onMouseLeave={()=>seeP("cu")}  onClick={()=> reload()} to={`/Table/customers`}><FontAwesomeIcon className={(window.location.href === "http://localhost:3000/Table/customers")? "icon" : "icon-none"} icon={faUsers}></FontAwesomeIcon><p className={seeingPCustomer ? "p-entity" : "p-entity-none"}>Clientes</p></Link></li>
                  <li className='nav-li-link'><Link onMouseEnter={()=>seeP("rn")} onMouseLeave={()=>seeP("rn")}  onClick={()=> reload()} to={`/Table/reparations`}><FontAwesomeIcon className={(window.location.href === "http://localhost:3000/Table/reparations")? "icon" : "icon-none"} icon={faScrewdriverWrench}></FontAwesomeIcon><p className={seeingPReparation ? "p-entity" : "p-entity-none"}>Reparaciones</p></Link></li>
                  <li className='nav-li-link'><Link onMouseEnter={()=>seeP("rt")} onMouseLeave={()=>seeP("rt")}  onClick={()=> reload()} to={`/Table/report/reparations-pending`}><FontAwesomeIcon className={(window.location.href === "http://localhost:3000/Table/report/reparations-pending")? "icon" : "icon-none"} icon={faFileLines}></FontAwesomeIcon><p className={seeingPReport ? "p-entity" : "p-entity-none"}>Reportes</p></Link></li>  
              </Nav>
            </div>
          </div>
          <div className="contenedor-micuenta">
            <div onClick={menuDropdown} className="icono-micuenta">
              <h2 className="letra-micuenta">{(user) ?user.name.charAt(0).toUpperCase(): 'Mi'}</h2>
            </div>
            <div className={dropdown ? "micuenta-desplegable none" : "micuenta-desplegable"}>
              <li className="li-micuenta"><Link onClick={myInformation} to={'/personal-information'}>Mi cuenta</Link></li>
              <li  className="li-micuenta"><Link onClick={signOff} to={"*" }>Cerrar Sesion</Link> </li>
            </div>
          </div>
        </Navbar>
      </header>
    </>
  );
};

export default GeneralHeader;