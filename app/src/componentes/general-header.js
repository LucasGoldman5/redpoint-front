import React, { useState,useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './general-header.css';
import { Link } from 'react-router-dom';
import GetUserData from '../helpers/getUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getEnviroment from "../helpers/getEnviroment";
import { faM,faMobileRetro,faBuilding,faUsers,faScrewdriverWrench, faCaretDown, faCaretUp, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


const GeneralHeader =  ( {changeUrl,openNavReports,dataBrands,dataCustomers,dataCellphones,dataServices,arrowIcon,seeNavReport} ) =>{

  

  const [user,setUser] = useState( GetUserData() );
  const [liBrandHover, setLiBrandHover] = useState(false);
  const [liCellphoneHover, setLiCellphoneHover] = useState(false);
  const [liCustomerHover, setLiCustomerHover] = useState(false);
  const [liServiceHover, setLiServiceHover] = useState(false);
  const [arrowBrand, setArrowBrand] = useState(true);
  const [arrowCellphone, setArrowCellphone] = useState(true);
  const [arrowCustomer, setArrowCustomer] = useState(true);
  const [arrowService, setArrowService] = useState(true);
  const [chainBrands, setChainBrands] = useState("");
  const [chainCellphones, setChainCellphones] = useState("");
  const [chainCustomers, setChainCustomers] = useState("");
  const [chainServices, setChainServices] = useState("");
  const [dropdown, setDropdown] = useState(true);
  const [dropdownLinksMenu, setDropdownLinksMenu] = useState(true);
  const [seeingPBrand, setSeeingPBrand] = useState(false);
  const [seeingPCellphone, setSeeingPCellphone] = useState(false);
  const [seeingPService, setSeeingPService] = useState(false);
  const [seeingPCustomer, setSeeingPCustomer] = useState(false);
  const [seeingPReparation, setSeeingPReparation] = useState(false);
  const [seeingPReport, setSeeingPReport] = useState(false);
  const [apiURL, setApiURL] = useState('');
  const [apiURLLocal, setApiURLLocal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = await getEnviroment();
      setApiURLLocal(url.url);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = await getEnviroment();
      setApiURL(url.url);
    };

    fetchData();
  }, []);

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
    localStorage.removeItem('column');
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

  const getReparationsPenSuc = async (e) =>{

    if(e === "pendientes"){
        window.location.assign(`${apiURLLocal}Table/report/reparations-pending`);
    }else if(e === "Entregadas"){
        window.location.assign(`${apiURLLocal}Table/report/reparations-success`);
    };
  };


  const dataBrandsFilter = (e) => {
    let filteredDataBrands = dataBrands;
  
    if (e) {
      setChainBrands(e.target.value.toUpperCase());
    }
  
    if (chainBrands.length >= 1) {
      filteredDataBrands = filteredDataBrands.filter((brand) =>
        brand.title.toUpperCase().includes(chainBrands)
      );
    }
  
    return filteredDataBrands;
  };


  const dataCellphonesFilter = (e) => {
    let filteredDataCellphone = dataCellphones;
  
    if (e) {
      setChainCellphones(e.target.value.toUpperCase());
    }
  
    if (chainCellphones.length >= 1) {
      filteredDataCellphone = filteredDataCellphone.filter((cellphone) =>
        cellphone.model.toUpperCase().includes(chainCellphones)
      );
    }
  
    return filteredDataCellphone;
  };


  const dataCustomersFilter = (e) => {
    let filteredDataCustomers = dataCustomers;
  
    if (e) {
      setChainCustomers(e.target.value.toUpperCase());
    }
  
    if (chainCustomers.length >= 1) {
      filteredDataCustomers = filteredDataCustomers.filter((customer) =>
        customer.name.toUpperCase().includes(chainCustomers)
      );
    }
  
    return filteredDataCustomers;
  };


  const dataServicesFilter = (e) => {
    let filteredDataServices = dataServices;
  
    if (e) {
      setChainServices(e.target.value.toUpperCase());
    }
  
    if (chainServices.length >= 1) {
      filteredDataServices = filteredDataServices.filter((service) =>
        service.description.toUpperCase().includes(chainServices)
      );
    }
  
    return filteredDataServices;
  };

  if(apiURL && apiURLLocal){
    return(
      <>
        <header className="header">
          <Navbar className="contenedor-nav-general" bg="dark" variant="dark">
            <div className="contenedor-general">
              <div className="contenedor-titulo">
                <Navbar.Brand className="titulo-nav"  href="http://localhost:3000/Table/report/reparations-pending">ClaroApp</Navbar.Brand>
              </div>
              <div className="contenedor-contenedor-links">
                <Nav >
                    <li className='nav-li-link'><Link onMouseEnter={()=>seeP("b")} onMouseLeave={()=>seeP("b")} onClick={()=>  changeUrl("brands")} to={`/Table/brands`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/brands`)? "icon" : "icon-none"}  icon={faM}></FontAwesomeIcon><p className={seeingPBrand ? "p-entity" : "p-entity-none"}>Marcas</p></Link></li>
                    <li className='nav-li-link'><Link onMouseEnter={()=>seeP("ce")} onMouseLeave={()=>seeP("ce")}  onClick={()=> changeUrl("cellphones")} to={`/Table/cellphones`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/cellphones`)? "icon" : "icon-none"} icon={faMobileRetro}></FontAwesomeIcon><p className={seeingPCellphone ? "p-entity" : "p-entity-none"}>Celulares</p></Link></li> 
                    <li className='nav-li-link'><Link onMouseEnter={()=>seeP("s")} onMouseLeave={()=>seeP("s")}   onClick={()=>  changeUrl("services")} to={`/Table/services`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/services`)? "icon" : "icon-none"} icon={faBuilding}></FontAwesomeIcon><p className={seeingPService ? "p-entity" : "p-entity-none"}>Servicios</p></Link></li>
                    <li className='nav-li-link'><Link onMouseEnter={()=>seeP("cu")} onMouseLeave={()=>seeP("cu")}  onClick={()=>  changeUrl("customers")} to={`/Table/customers`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/customers`)? "icon" : "icon-none"} icon={faUsers}></FontAwesomeIcon><p className={seeingPCustomer ? "p-entity" : "p-entity-none"}>Clientes</p></Link></li>
                    <li className='nav-li-link'><Link onMouseEnter={()=>seeP("rn")} onMouseLeave={()=>seeP("rn")}  onClick={()=>  changeUrl("reparations")} to={`/Table/reparations`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/reparations`)? "icon" : "icon-none"} icon={faScrewdriverWrench}></FontAwesomeIcon><p className={seeingPReparation ? "p-entity" : "p-entity-none"}>Reparaciones</p></Link></li>
                    <div className="div-button-filter">
                            <button className={(window.location.href.includes("report"))? "button-reparation-filter" : "button-reparation-filter-none"} onClick={() => openNavReports()}>Reparaciones filtradas<FontAwesomeIcon icon={arrowIcon ? faCaretDown : faCaretUp}></FontAwesomeIcon></button>   
                    </div> 
                </Nav>
              </div>
              <div className={seeNavReport ? "nav-reports" : "nav-reports-none"}>
                                <Link className={(window.location.href.includes("pending")) ? "li-nav-report" : "li-nav-report-none"} onClick={() => changeUrl("report/reparations-pending")} to={`/Table/report/reparations-pending`}>Pendientes</Link>
                                <Link className={(window.location.href.includes("success")) ? "li-nav-report" : "li-nav-report-none"} onClick={() => changeUrl("report/reparations-success")} to={`/Table/report/reparations-success`}>Entregadas</Link>
                                <div className="div-li-hover">
                                 <li onMouseEnter={() => mouseOverLi("brand")}  className={(window.location.href.includes("by-brand")) ? "li-nav-report" : "li-nav-report-none"}>Marca <FontAwesomeIcon icon={arrowBrand ? faCaretDown : faCaretUp} /></li>
                                </div>
                                <div className={liBrandHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                <div className="header-nav-reparations">
                                        <div className="div-input-search">
                                          <input className="search-reparations-input" type="search" placeholder="buscar..." onChange={(e) => dataBrandsFilter(e)}></input>
                                        </div>
                                        <div className="div-x">
                                          <FontAwesomeIcon onClick={() => closeGridFilter("brand")} icon={faCircleXmark}/>
                                        </div>
                                    </div>
                                    <div className="div-container-map-filter">
                                        {
                                            
                                           (dataBrandsFilter().length > 0) ?  dataBrandsFilter().map((brand)=>{
                                            return(
                                             <Link className="p-entity-filter" key={brand.id} onClick={() => changeUrl("report/reparations-by-brand",brand.id,brand.title)} to={`/Table/report/reparations-by-brand/${brand.id}`}>{brand.title}</Link>
                                            )
                                         })
                                         :
                                         <p>Cargando Marcas...</p>
                                        }
                                    </div>
                                </div>
                                <div className="div-li-hover">
                                 <li onMouseEnter={() => mouseOverLi("cellphone")} className={(window.location.href.includes("by-cellphone")) ? "li-nav-report" : "li-nav-report-none"}>Celular <FontAwesomeIcon icon={arrowCellphone ? faCaretDown : faCaretUp} /></li>
                                </div>
                                <div className={liCellphoneHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                    <div className="header-nav-reparations">
                                        <div className="div-input-search">
                                          <input className="search-reparations-input" type="search" placeholder="buscar..." onChange={(e) => dataCellphonesFilter(e)}></input>
                                        </div>
                                        <div className="div-x">
                                          <FontAwesomeIcon onClick={() => closeGridFilter("cellphone")} icon={faCircleXmark}/>
                                        </div>
                                    </div>
                                    <div className="div-container-map-filter">
                                        {
                                            (dataCellphonesFilter().length > 0) ? dataCellphonesFilter().map((cellphone)=>{
                                                return(
                                                 <Link className="p-entity-filter" key={cellphone.id} onClick={() => changeUrl("report/reparations-by-cellphone",cellphone.id)} to={`/Table/report/reparations-by-cellphone/${cellphone.id}`}>{cellphone.model}</Link>
                                                )
                                             })
                                             :
                                             <p>Cargando Celulares...</p>
                                        }
                                    </div>
                                </div>
                                <div className="div-li-hover">
                                 <li onMouseEnter={() => mouseOverLi("customer")} className={(window.location.href.includes("by-customer")) ? "li-nav-report" : "li-nav-report-none"}>Cliente <FontAwesomeIcon icon={arrowCustomer ? faCaretDown : faCaretUp} /></li>
                                </div>
                                <div className={liCustomerHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                <div className="header-nav-reparations">
                                        <div className="div-input-search">
                                          <input className="search-reparations-input" type="search" placeholder="buscar..." onChange={(e) => dataCustomersFilter(e)}></input>
                                        </div>
                                        <div className="div-x">
                                          <FontAwesomeIcon onClick={() => closeGridFilter("customer")} icon={faCircleXmark}/>
                                        </div>
                                    </div>
                                    <div className="div-container-map-filter">
                                        {
                                            (dataCustomersFilter().length > 0) ? dataCustomersFilter().map((customer)=>{
                                                return(
                                                 <Link className="p-entity-filter" key={customer.id} onClick={() => changeUrl("report/reparations-by-customer",customer.id)} to={`Table/report/reparations-by-customer/${customer.id}`}>{customer.name}</Link>
                                                )
                                             })
                                             :
                                             <p>Cargando Clientes...</p>
                                        }
                                    </div>
                                </div>
                                <div className="div-li-hover">
                                 <li onMouseEnter={() => mouseOverLi("service")} className={(window.location.href.includes("by-service")) ? "li-nav-report" : "li-nav-report-none"}>Servicio <FontAwesomeIcon icon={arrowService ? faCaretDown : faCaretUp} /></li>
                                </div>
                              <div className={liServiceHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                                <div className="header-nav-reparations">
                                        <div className="div-input-search">
                                          <input className="search-reparations-input" type="search" placeholder="buscar..." onChange={(e) => dataServicesFilter(e)}></input>
                                        </div>
                                        <div className="div-x">
                                          <FontAwesomeIcon onClick={() => closeGridFilter("service")} icon={faCircleXmark}/>
                                        </div>
                                    </div>
                                    <div className="div-container-map-filter">
                                        {
                                            (dataServicesFilter().length > 0) ? dataServicesFilter().map((service)=>{
                                                return(
                                                 <Link className="p-entity-filter" key={service.id} onClick={() => changeUrl("report/reparations-by-service",service.id)} to={`Table/report/reparations-by-service/${service.id}`}>{service.description}</Link>
                                                )
                                             })
                                             :
                                             <p>Cargando Servicios...</p>
                                        }
                                    </div>
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
  }
};

export default GeneralHeader;