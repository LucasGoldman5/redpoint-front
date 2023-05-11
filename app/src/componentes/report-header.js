import React, { useState } from "react";
import HelperBuildRequest from "../helpers/buildRequest";
import getFilterReparations from "../helpers/getFilterReparations";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './report-header.css';
import { Link } from 'react-router-dom';
import GetUserData from '../helpers/getUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faCaretDown, faCaretUp, faCircleXmark} from '@fortawesome/free-solid-svg-icons';


const ReportHeader = () =>{

  const [user,setUser] = useState( GetUserData() );
  const [dataBrands, setDataBrands] = useState([]);
  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataCellphones, setDataCellPhones] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [seeingPReparation, setSeeingPReparation] = useState(false);
  const [dropdown, setDropdown] = useState(true);
  const [seeNavReport, setSeeNavReport] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(true);
  const [liBrandHover, setLiBrandHover] = useState(false);
  const [liCellphoneHover, setLiCellphoneHover] = useState(false);
  const [liCustomerHover, setLiCustomerHover] = useState(false);
  const [liServiceHover, setLiServiceHover] = useState(false);
  const [arrowBrand, setArrowBrand] = useState(true);
  const [arrowCellphone, setArrowCellphone] = useState(true);
  const [arrowCustomer, setArrowCustomer] = useState(true);
  const [arrowService, setArrowService] = useState(true);
 

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
     if(e === "rn"){
      setSeeingPReparation(!seeingPReparation)
    }
  }

  const openNavReports = async () =>{
     setSeeNavReport(!seeNavReport);
     setArrowIcon(!arrowIcon);

     if(seeNavReport === false){
        try{
                    
            const config = HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`http://localhost:8000/api/brands`, config);
    
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataBrands(response.data);
                    }  
              };
    
          }catch(error){
            console.log(error)
          }
          
          try{
                      
            const config = HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`http://localhost:8000/api/customers`, config);
    
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataCustomers(response.data);
                        
                    }  
              };
    
          }catch(error){
            console.log(error)
          }
          
          try{
                      
            const config = HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`http://localhost:8000/api/cellphones`, config);
    
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataCellPhones(response.data);
                        
                    }  
              };
    
          }catch(error){
            console.log(error)
          }
          
          try{
                      
            const config = HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`http://localhost:8000/api/services`, config);
    
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataServices(response.data);
                        console.log(response.data);
                    }  
              };
    
          }catch(error){
            console.log(error)
          }
     }
  }

  const mouseOverLi = (e) => {
    if(e === "brand"){ 
      setArrowBrand(!arrowBrand);
      setLiBrandHover(!liBrandHover);
      setArrowCellphone(true);
      setArrowCustomer(true);
      setArrowService(true);
      setLiCellphoneHover(false);
      setLiCustomerHover(false);
      setLiServiceHover(false);
    }else if( e === "cellphone"){
        setArrowCellphone(!arrowCellphone);
        setLiCellphoneHover(!liCellphoneHover);
        setArrowBrand(true);
        setArrowCustomer(true);
        setArrowService(true);
        setLiBrandHover(false);
        setLiCustomerHover(false);
        setLiServiceHover(false);
    }else if( e === "customer"){
        setArrowCustomer(!arrowCustomer);
        setLiCustomerHover(!liCustomerHover);
        setArrowBrand(true);
        setArrowCellphone(true);
        setArrowService(true);
        setLiBrandHover(false);
        setLiCellphoneHover(false);
        setLiServiceHover(false);
    }else if( e === "service"){
        setArrowService(!arrowService);
        setLiServiceHover(!liServiceHover);
        setArrowBrand(true);
        setArrowCustomer(true);
        setArrowCellphone(true);
        setLiBrandHover(false);
        setLiCustomerHover(false);
        setLiCellphoneHover(false);
    }
  };

  const closeGridFilter = (e) =>{
    if(e === "brand"){
        setArrowBrand(!arrowBrand);
        setLiBrandHover(!liBrandHover);
    }else if(e === "cellphone"){
        setArrowCellphone(!arrowCellphone);
        setLiCellphoneHover(!liCellphoneHover);  
    }else if(e === "customer"){
        setArrowCustomer(!arrowCustomer);
        setLiCustomerHover(!liCustomerHover);  
    }else if(e === "service"){
        setArrowService(!arrowService);
        setLiServiceHover(!liServiceHover);  
    };
  };

  const getReparationsPenSuc = (e) =>{
    if(e === "pendientes"){
        window.location.assign("http://localhost:3000/Table/report/reparations-pending");
    }else if(e === "Entregadas"){
        window.location.assign("http://localhost:3000/Table/report/reparations-success");
    };
  };

  return(

    <>
      <header className="header">
        <Navbar className="contenedor-nav-general" bg="dark" variant="dark">
            <div className="contenedor-general">
                <div className="contenedor-titulo">
                <Navbar.Brand className="titulo-nav"  href="http://localhost:3000/Table/cellphones">ClaroApp</Navbar.Brand>
                </div>
                <div className="contenedor-contenedor-links">
                <nav className="nav-general">
                    <li className='nav-li-link-report'><Link onMouseEnter={()=>seeP("rn")} onMouseLeave={()=>seeP("rn")}  onClick={()=> reload()} to={`/Table/reparations`}><FontAwesomeIcon className={(window.location.href === "http://localhost:3000/Table/reparations")? "icon" : "icon-none"} icon={faScrewdriverWrench}></FontAwesomeIcon><p className={seeingPReparation ? "p-entity" : "p-entity-none"}>Reparaciones</p></Link></li>
                    <div className="div-button-filter">
                        <button className="button-reparation-filter" onClick={() => openNavReports()}>Reparaciones filtradas<FontAwesomeIcon icon={arrowIcon ? faCaretDown : faCaretUp}></FontAwesomeIcon></button>   
                    </div>
                </nav>
                </div>
            </div>
            <div className={seeNavReport ? "nav-reports" : "nav-reports-none"}>
                            <li className="li-nav-report" onClick={() => getReparationsPenSuc("pendientes")}>Pendientes</li>
                            <li className="li-nav-report" onClick={() => getReparationsPenSuc("Entregadas")}>Entregadas</li>
                            <div className="div-li-hover">
                             <li onMouseEnter={() => mouseOverLi("brand")}  className="li-nav-report">Marca <FontAwesomeIcon icon={arrowBrand ? faCaretDown : faCaretUp} /></li>
                            </div>
                            <div className={liBrandHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                <div className="div-x">
                                    <FontAwesomeIcon onClick={() => closeGridFilter("brand")} icon={faCircleXmark}/>
                                </div>
                                <div className="div-container-map-filter">
                                    {
                                       (dataBrands.length > 0) ?  dataBrands.map((brand)=>{
                                        return(
                                         <p className="p-entity-filter" key={brand.id} onClick={() => getFilterReparations(brand.id,"brands")}>{brand.title}</p>
                                        )
                                     })
                                     :
                                     <p>Cargando Marcas...</p>
                                    }
                                </div>
                            </div>
                            <div className="div-li-hover">
                             <li onMouseEnter={() => mouseOverLi("cellphone")} className="li-nav-report">Celular <FontAwesomeIcon icon={arrowCellphone ? faCaretDown : faCaretUp} /></li>
                            </div>
                            <div className={liCellphoneHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                <div className="div-x">
                                    <FontAwesomeIcon onClick={() => closeGridFilter("cellphone")} icon={faCircleXmark}/>
                                </div>
                                <div className="div-container-map-filter">
                                    {
                                        (dataCellphones.length > 0) ? dataCellphones.map((cellphone)=>{
                                            return(
                                             <p className="p-entity-filter" key={cellphone.id} onClick={() => getFilterReparations(cellphone.id,"cellphones")}>{cellphone.model}</p>
                                            )
                                         })
                                         :
                                         <p>Cargando Celulares...</p>
                                    }
                                </div>
                            </div>
                            <div className="div-li-hover">
                             <li onMouseEnter={() => mouseOverLi("customer")} className="li-nav-report">Cliente <FontAwesomeIcon icon={arrowCustomer ? faCaretDown : faCaretUp} /></li>
                            </div>
                            <div className={liCustomerHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                <div className="div-x">
                                    <FontAwesomeIcon onClick={() => closeGridFilter("customer")} icon={faCircleXmark}/>
                                </div>
                                <div className="div-container-map-filter">
                                    {
                                        (dataCustomers.length > 0) ? dataCustomers.map((customer)=>{
                                            return(
                                             <p className="p-entity-filter" key={customer.id} onClick={() => getFilterReparations(customer.id,"customers")}>{customer.name}</p>
                                            )
                                         })
                                         :
                                         <p>Cargando Clientes...</p>
                                    }
                                </div>
                            </div>
                            <div className="div-li-hover">
                             <li onMouseEnter={() => mouseOverLi("service")} className="li-nav-report">Servicio <FontAwesomeIcon icon={arrowService ? faCaretDown : faCaretUp} /></li>
                            </div>
                            <div className={liServiceHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                <div className="div-x">
                                    <FontAwesomeIcon onClick={() => closeGridFilter("service")} icon={faCircleXmark}/>
                                </div>
                                <div className="div-container-map-filter">
                                    {
                                        (dataServices.length > 0) ? dataServices.map((service)=>{
                                            return(
                                             <p className="p-entity-filter" key={service.id} onClick={() => getFilterReparations(service.id,"services")}>{service.description}</p>
                                            )
                                         })
                                         :
                                         <p>Cargando Servicios...</p>
                                    }
                                </div>
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

export default ReportHeader;