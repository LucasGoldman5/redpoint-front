import React, { useState,useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './general-header.css';
import { Link } from 'react-router-dom';
import GetUserData from '../helpers/getUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getEnviroment from "../helpers/getEnviroment";
import { faM,faMobileRetro,faBuilding,faUsers,faScrewdriverWrench, faCaretDown, faCaretUp, faCircleXmark, faHourglassHalf, faCheck, faUserGear } from '@fortawesome/free-solid-svg-icons';


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
  const [seeingPBrand, setSeeingPBrand] = useState(false);
  const [seeingPCellphone, setSeeingPCellphone] = useState(false);
  const [seeingPService, setSeeingPService] = useState(false);
  const [seeingPCustomer, setSeeingPCustomer] = useState(false);
  const [seeingPReparation, setSeeingPReparation] = useState(false);
  const [seeingPReparationPending, setSeeingPReparationPending] = useState(false);
  const [seeingPReparationSuccess, setSeeingPReparationSuccess] = useState(false);
  const [seeingPUsers, setSeeingPUsers] = useState(false);
  const [seeingPReport, setSeeingPReport] = useState(false);
  const [apiURL, setApiURL] = useState('');
  const [apiURLLocal, setApiURLLocal] = useState('');
  const [superAdmin, setSuperAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = await getEnviroment();
      setApiURLLocal(url.url);
      setApiURL(url.url);
    };
    fetchData();
    admin()
  }, []);

  const getUser = localStorage.getItem("user");

  const admin = () =>{
    let usuario = JSON.parse(getUser);
      if(usuario.user.roles === "admin"){
        setSuperAdmin(false)

      }else if(usuario.user.roles === "super-admin"){
        setSuperAdmin(true)
      };
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
   

  const seeP = (e) =>{
    if(e === "b"){
      setSeeingPBrand(true);
    }else if(e === "ce"){
      setSeeingPCellphone(true)
    }else if(e === "s"){
      setSeeingPService(true)
    }else if(e === "cu"){
      setSeeingPCustomer(true)
    }else if(e === "rn"){
      setSeeingPReparation(true)
    }else if(e === "rt"){
      setSeeingPReport(true)
    }else if(e === "rp"){
      setSeeingPReparationPending(true)
    }else if(e === "rs"){
      setSeeingPReparationSuccess(true)
    }else if(e === "us"){
      setSeeingPUsers(true)
    }   
  }

  const noSeeP = (e) =>{
    if(e === "b"){
      setSeeingPBrand(false);
    }else if(e === "ce"){
      setSeeingPCellphone(false)
    }else if(e === "s"){
      setSeeingPService(false)
    }else if(e === "cu"){
      setSeeingPCustomer(false)
    }else if(e === "rn"){
      setSeeingPReparation(false)
    }else if(e === "rt"){
      setSeeingPReport(false)
    }else if(e === "rp"){
    setSeeingPReparationPending(false)
    }else if(e === "rs"){
      setSeeingPReparationSuccess(false)
    }else if(e === "us"){
      setSeeingPUsers(false)
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
                    <div className="container-li-span">
                      <li className='nav-li-link'><Link onMouseOver={()=>seeP("b")} onMouseLeave={()=>noSeeP("b")} onClick={()=>  changeUrl("brands")} to={`/Table/brands`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/brands`)? "icon" : "icon-none"}  icon={faM}></FontAwesomeIcon></Link></li>
                      <span className={seeingPBrand ? "span" : "span-none"}><p>Marcas</p></span>
                    </div>
                    <div className="container-li-span">
                      <li className='nav-li-link'><Link onMouseOver={()=>seeP("ce")} onMouseLeave={()=>noSeeP("ce")}  onClick={()=> changeUrl("cellphones")} to={`/Table/cellphones`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/cellphones`)? "icon" : "icon-none"} icon={faMobileRetro}></FontAwesomeIcon></Link></li>
                      <span className={seeingPCellphone ? "span" : "span-none"}><p>Celulares</p></span> 
                    </div>
                    <div className="container-li-span">
                      <li className='nav-li-link'><Link onMouseOver={()=>seeP("s")} onMouseLeave={()=>noSeeP("s")}   onClick={()=>  changeUrl("services")} to={`/Table/services`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/services`)? "icon" : "icon-none"} icon={faBuilding}></FontAwesomeIcon></Link></li>
                      <span className={seeingPService ? "span" : "span-none"}><p>Servicios</p></span>
                    </div>
                    <div className="container-li-span">
                      <li className='nav-li-link'><Link onMouseOver={()=>seeP("cu")} onMouseLeave={()=>noSeeP("cu")}  onClick={()=>  changeUrl("customers")} to={`/Table/customers`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/customers`)? "icon" : "icon-none"} icon={faUsers}></FontAwesomeIcon></Link></li>
                      <span className={seeingPCustomer ? "span" : "span-none"}><p>Clientes</p></span>
                    </div>
                    <div className="container-li-span">
                      <li className='nav-li-link'><Link onMouseOver={()=>seeP("rn")} onMouseLeave={()=>noSeeP("rn")}  onClick={()=>  changeUrl("reparations")} to={`/Table/reparations`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/reparations`)? "icon" : "icon-none"} icon={faScrewdriverWrench}></FontAwesomeIcon></Link></li>
                      <span className={seeingPReparation ? "span" : "span-none"}><p>Reparaciones</p></span>
                    </div>
                    <div className="div-button-filter">
                            <button className={(window.location.href.includes("by"))? "button-reparation-filter" : "button-reparation-filter-none"} onClick={() => openNavReports()}>Reparaciones filtradas<FontAwesomeIcon icon={arrowIcon ? faCaretDown : faCaretUp}></FontAwesomeIcon></button>   
                    </div>
                    <div className="container-li-span">
                      <li className='nav-li-link'><Link onMouseOver={()=>seeP("rp")} onMouseLeave={()=>noSeeP("rp")}  onClick={() => changeUrl("report/reparations-pending")} to={`/Table/report/reparations-pending`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/report/reparations-pending`)? "icon" : "icon-none"}  icon={faHourglassHalf} /></Link></li>
                      <span className={seeingPReparationPending ? "span" : "span-none"}><p>Reparaciones Pendientes</p></span>
                    </div>
                    <div className="container-li-span">
                      <li className='nav-li-link'><Link onMouseOver={()=>seeP("rs")} onMouseLeave={()=>noSeeP("rs")}  onClick={() => changeUrl("report/reparations-success")} to={`/Table/report/reparations-success`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/report/reparations-success`)? "icon" : "icon-none"} icon={faCheck}></FontAwesomeIcon></Link></li>
                      <span className={seeingPReparationSuccess ? "span" : "span-none"}><p>Reparaciones Finalizadas</p></span>
                    </div>
                    {
                      (superAdmin === true)
                      ?
                      <div className="container-li-span">
                        <li className='nav-li-link'><Link onMouseOver={()=>seeP("us")} onMouseLeave={()=>noSeeP("us")}  onClick={() => changeUrl("report/reparations-success")} to={`/Table/report/reparations-success`}><FontAwesomeIcon className={(window.location.href === `${apiURL}Table/report/reparations-success`)? "icon" : "icon-none"} icon={faUserGear}></FontAwesomeIcon></Link></li>
                        <span className={seeingPUsers ? "span" : "span-none"}><p>Usuarios</p></span>
                      </div>
                      :
                      ""
                    } 
                </Nav>
              </div>
              <div className={seeNavReport ? "nav-reports" : "nav-reports-none"}>
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
                            
                          (dataBrandsFilter().length > 0)
                            ?
                            dataBrandsFilter().map((brand)=>{
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