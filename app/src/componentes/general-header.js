import React, { useState,useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './general-header.css';
import { Link } from 'react-router-dom';
import GetUserData from '../helpers/getUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalProfits from "./modal-profits";
import { faM,faTruckRampBox, faHandHoldingDollar,faMobileRetro,faBuilding,faUsers,faScrewdriverWrench, faCaretDown, faCaretUp, faCircleXmark, faHourglassHalf, faCheck, faUserGear, faDollarSign } from '@fortawesome/free-solid-svg-icons';


const GeneralHeader =  ( {changeUrl,openNavReports,dataBrands,dataCustomers,dataCellphones,dataServices,dataServiceStatus,dataManagers,arrowIcon,seeNavReport,enviroment,urlTable} ) =>{

  

  const [user,setUser] = useState( GetUserData() );
  const [liBrandHover, setLiBrandHover] = useState(false);
  const [liCellphoneHover, setLiCellphoneHover] = useState(false);
  const [liCustomerHover, setLiCustomerHover] = useState(false);
  const [liServiceHover, setLiServiceHover] = useState(false);
  const [liServiceStateHover, setLiServiceStateHover] = useState(false);
  const [liManagerHover, setLiManagerHover] = useState(false);
  const [arrowBrand, setArrowBrand] = useState(true);
  const [arrowCellphone, setArrowCellphone] = useState(true);
  const [arrowCustomer, setArrowCustomer] = useState(true);
  const [arrowService, setArrowService] = useState(true);
  const [arrowManager, setArrowManager] = useState(true);
  const [arrowServiceState, setArrowServiceState] = useState(true);
  const [chainBrands, setChainBrands] = useState("");
  const [chainCellphones, setChainCellphones] = useState("");
  const [chainCustomers, setChainCustomers] = useState("");
  const [chainServices, setChainServices] = useState("");
  const [chainManagers, setChainManagers] = useState("");
  const [chainServiceStatus, setChainServiceStatus] = useState("")
  const [dropdown, setDropdown] = useState(true);
  const [seeingPBrand, setSeeingPBrand] = useState(false);
  const [seeingPCellphone, setSeeingPCellphone] = useState(false);
  const [seeingPService, setSeeingPService] = useState(false);
  const [seeingPServiceStatus, setSeeingPServiceStatus] = useState(false);
  const [seeingPCustomer, setSeeingPCustomer] = useState(false);
  const [seeingPReparation, setSeeingPReparation] = useState(false);
  const [seeingPReparationPending, setSeeingPReparationPending] = useState(false);
  const [seeingPReparationMoney, setSeeingPReparationMoney] = useState(false);
  const [seeingPReparationToDeliver, setSeeingPReparationToDeliver] = useState(false);
  const [seeingPReparationSuccess, setSeeingPReparationSuccess] = useState(false);
  const [seeingPUsers, setSeeingPUsers] = useState(false);
  const [seeingPReport, setSeeingPReport] = useState(false);
  const [seeingProfits, setSeeingProfits] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(null);
  const [loadElements, setLoadElements] = useState(true);
  const [openModalProfit, setOpenModalProfit] = useState(false);

  useEffect(() => {
    admin()
    const timer = setTimeout(()=>{
      setLoadElements(false);
    },5000)

    return () => clearTimeout(timer);
  }, []);

  
  const getUser = () =>{
    if(localStorage.user){
      return localStorage.getItem("user");
    }else{
      window.location.reload()
    }
  } 

  const admin = () =>{
    if(localStorage.user){
      let usuario = JSON.parse(getUser());
      if(usuario.user.rol_id.rol === "admin"){
        setSuperAdmin(false)

      }else if(usuario.user.rol_id.rol  === "super-admin"){
        setSuperAdmin(true)
      };
    }else{
      window.location.reload()
    }
  };

  const menuDropdown = () =>{
    setDropdown(!dropdown);
  };

  const myInformation = () =>{
    window.location.assign(`/${enviroment.selfUrl.personalInformation}`);
  };

  const signOff = ( ) =>{
    localStorage.removeItem('user');
    localStorage.removeItem('column');
    localStorage.removeItem('reparation');
    setDropdown(false);
    window.location.assign('/login');
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
    }else if(e === "rm"){
      setSeeingPReparationMoney(true)
    } else if(e === "rd"){
      setSeeingPReparationToDeliver(true)
    }  else if(e === "cg"){
      setSeeingProfits(true)
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
    }else if(e === "rm"){
      setSeeingPReparationMoney(false)
    } else if(e === "rd"){
      setSeeingPReparationToDeliver(false)
    } else if(e === "cg"){
      setSeeingProfits(false)
    }  
  }
  

  const mouseOverLi = (e) => {
    if(e === "brand"){ 
      setArrowBrand(!arrowBrand);
      setLiBrandHover(!liBrandHover);
      setArrowCellphone(true);
      setArrowCustomer(true);
      setArrowService(true);
      setArrowManager(true);
      setArrowServiceState(true);
      setLiManagerHover(false);
      setLiServiceStateHover(false);
      setLiCellphoneHover(false);
      setLiCustomerHover(false);
      setLiServiceHover(false);
    }else if( e === "cellphone"){
        setArrowCellphone(!arrowCellphone);
        setLiCellphoneHover(!liCellphoneHover);
        setArrowBrand(true);
        setArrowCustomer(true);
        setArrowService(true);
        setArrowManager(true);
        setArrowServiceState(true);
        setLiManagerHover(false);
        setLiServiceStateHover(false);
        setLiBrandHover(false);
        setLiCustomerHover(false);
        setLiServiceHover(false);
    }else if( e === "customer"){
        setArrowCustomer(!arrowCustomer);
        setLiCustomerHover(!liCustomerHover);
        setArrowBrand(true);
        setArrowCellphone(true);
        setArrowService(true);
        setArrowManager(true);
        setArrowServiceState(true);
        setLiManagerHover(false);
        setLiServiceStateHover(false);
        setLiBrandHover(false);
        setLiCellphoneHover(false);
        setLiServiceHover(false);
    }else if( e === "service"){
        setArrowService(!arrowService);
        setLiServiceHover(!liServiceHover);
        setArrowBrand(true);
        setArrowCustomer(true);
        setArrowCellphone(true);
        setArrowManager(true);
        setArrowServiceState(true);
        setLiManagerHover(false);
        setLiServiceStateHover(false);
        setLiBrandHover(false);
        setLiCustomerHover(false);
        setLiCellphoneHover(false);
    }
    else if( e === "serviceStatus"){
      setArrowServiceState(!arrowServiceState);
      setLiServiceStateHover(!liServiceStateHover);
      setArrowService(true);
      setLiServiceHover(false);
      setArrowBrand(true);
      setArrowCustomer(true);
      setArrowCellphone(true);
      setArrowManager(true);
      setLiManagerHover(false);
      setLiBrandHover(false);
      setLiCustomerHover(false);
      setLiCellphoneHover(false);
  }
    else if( e === "manager"){
      setArrowManager(!arrowManager);
      setLiManagerHover(!liManagerHover);
      setArrowBrand(true);
      setArrowCustomer(true);
      setArrowCellphone(true);
      setArrowService(true);
      setArrowServiceState(true);
      setLiServiceStateHover(false);
      setLiServiceHover(false);
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
    }else if(e === "serviceStatus"){
      setArrowServiceState(!arrowServiceState);
      setLiServiceStateHover(!liServiceStateHover);  
  }else if(e === "manager"){
      setArrowManager(!arrowManager);
      setLiManagerHover(!liManagerHover);  
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
    let filteredDataCellphone = dataCellphones.data ? dataCellphones.data : dataCellphones;
  
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

  const dataServicesStatusFilter = (e) => {
    let filteredDataServicesStatus = dataServiceStatus;
  
    if (e) {
      setChainServiceStatus(e.target.value.toUpperCase());
    }
  
    if (chainServiceStatus.length >= 1) {
      filteredDataServicesStatus = filteredDataServicesStatus.filter((service) =>
        service.description.toUpperCase().includes(chainServiceStatus)
      );
    }
  
    return filteredDataServicesStatus;
  };

  const dataManagersFilter = (e) => {
    let filteredDataManagers = dataManagers;
  
    if (e) {
      setChainManagers(e.target.value.toUpperCase());
    }
  
    if (chainManagers.length >= 1) {
      filteredDataManagers = filteredDataManagers.filter((manager) =>
        manager.name.toUpperCase().includes(chainManagers)
      );
    }
  
    return filteredDataManagers;
  };

  const ent = enviroment.selfUrl.localEntities;
  const table = enviroment.selfUrl.dataTable;
  const location = window.location.href; 
  const entitie = enviroment.entities
  
  const title = () =>{
  
    if(location.includes(`${table}${ent.reparations}`)){
      return "Reparaciones"
    }else if(location.includes(ent.brands)){
      return "Marcas"
    }
    else if(location.includes(ent.customers)){
      return "Clientes"
    }
    else if(location.includes(ent.cellphones)){
      return "Celulares"
    }
    else if(location.includes(ent.services)){
      return "Servicios"
    }else if(location.includes(ent.users)){
      return "Usuarios"
    }else if(location.includes(entitie.pending)){
      return "En Service"
    }else if(location.includes(entitie.delivered)){
      return "Entregadas"
    }else if(location.includes(entitie.finished)){
      return "Por Entregar"
    }else if(location.includes(entitie.quote)){
      return "A Presupuestar"
    }else if(location.includes("por-marca")){
      return "R|Filtrada|Marca"
    }else if(location.includes("por-servicio")){
      return "R|Filtrada|Servicio"
    }else if(location.includes("por-celular")){
      return "R|Filtrada|Celular"
    }else if(location.includes("por-cliente")){
      return "R|Filtrada|Cliente"
    }else if(location.includes("por-manager")){
      return "R|Filtrada|Usuario"
    }else if(location.includes("imprimir")){
      return "Imprimir"
    }else if(location.includes("reparaciones-por-estado-de-servicio")){
      return "R|Filtrada|Servicio|Estado"
    }
  }
  const originUrl = window.location.href
  const parsedUrl = new URL(originUrl);
  const baseUrl = parsedUrl.origin;

  const openModalProfits = () =>{
    setOpenModalProfit(true);
  }

  const closeForm = () =>{
    setOpenModalProfit(false);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Escape") {
      setOpenModalProfit(false);
    }
  };
  
  document.addEventListener('keyup', handleKeyUp);
  
  if(enviroment.selfUrl){
    return(
      <>
        <header className="header">
          <Navbar className="contenedor-nav-general" bg="dark" variant="dark">
            <div className="contenedor-general">
              <div className="contenedor-titulo">
                <Navbar.Brand className="titulo-nav"><a className="header-title-general" href={`${baseUrl}/${enviroment.selfUrl.dataTable}${enviroment.entities.pending}`}>RedPoint</a>/<p className="header-sub-title">{title()}</p></Navbar.Brand>
              </div>
              <div className="contenedor-contenedor-links">
                <Nav >
                    <div className="container-link-span">
                      <Link className="container-li-span" onClick={()=>  changeUrl(`${ent.reparations}`)} to={`${enviroment.selfUrl.dataTable}${ent.reparations}`} onMouseOver={()=>seeP("rn")} onMouseLeave={()=>noSeeP("rn")}>
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${ent.reparations}`)) || seeingPReparation? "icon" : "icon-none"} icon={faScrewdriverWrench}></FontAwesomeIcon></li>
                      </Link>
                      <span className={seeingPReparation ? "span" : "span-none"}><p>Reparaciones</p></span>
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span" onClick={() => changeUrl(`${enviroment.entities.pending}`)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.pending}`} onMouseOver={()=>seeP("rp")} onMouseLeave={()=>noSeeP("rp")}>
                        <li className='nav-li-link' ><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${enviroment.entities.pending}`)) || seeingPReparationPending ? "icon" : "icon-none"}  icon={faHourglassHalf} /></li>
                      </Link>
                      <span className={seeingPReparationPending ? "span" : "span-none"}><p>Reparaciones en Service</p></span>
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span" onClick={() => changeUrl(`${enviroment.entities.quote}`)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.quote}`} onMouseOver={()=>seeP("rm")} onMouseLeave={()=>noSeeP("rm")}>
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${enviroment.entities.quote}`)) || seeingPReparationMoney ? "icon" : "icon-none"}   icon={faHandHoldingDollar} /></li>
                      </Link>
                      <span className={seeingPReparationMoney ? "span" : "span-none"}><p>Reparaciones a Presupuestar</p></span>
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span" onClick={() => changeUrl(`${enviroment.entities.finished}`)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.finished}`} onMouseOver={()=>seeP("rd")} onMouseLeave={()=>noSeeP("rd")}>
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${enviroment.entities.finished}`)) || seeingPReparationToDeliver ? "icon" : "icon-none"} icon={faTruckRampBox}  /></li>
                      </Link>
                      <span className={seeingPReparationToDeliver ? "span" : "span-none"}><p>Reparaciones Para Entregar</p></span>
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span"  onClick={() => changeUrl(`${enviroment.entities.delivered}`)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.delivered}`} onMouseOver={()=>seeP("rs")} onMouseLeave={()=>noSeeP("rs")}>
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${enviroment.entities.delivered}`)) || seeingPReparationSuccess ? "icon" : "icon-none"} icon={faCheck}></FontAwesomeIcon></li>
                      </Link>
                      <span className={seeingPReparationSuccess ? "span" : "span-none"}><p>Reparaciones ya Entregadas</p></span>
                    </div>

                    <div className="div-button-filter">
                            <button className={(window.location.href.includes("por"))? "button-reparation-filter" : "button-reparation-filter-none"} onClick={() => openNavReports()}>Filtrar por..<FontAwesomeIcon icon={arrowIcon ? faCaretDown : faCaretUp}></FontAwesomeIcon></button>   
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span"  onClick={()=>  changeUrl(`${ent.brands}`)} to={`${enviroment.selfUrl.dataTable}${ent.brands}`} onMouseOver={()=>seeP("b")} onMouseLeave={()=>noSeeP("b")}>
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${ent.brands}`)) || seeingPBrand ? "icon" : "icon-none"}  icon={faM}></FontAwesomeIcon></li>
                      </Link>
                      <span className={seeingPBrand ? "span" : "span-none"}><p>Marcas</p></span>
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span" onClick={()=> changeUrl(`${ent.cellphones}`)} to={`${enviroment.selfUrl.dataTable}${ent.cellphones}`} onMouseOver={()=>seeP("ce")} onMouseLeave={()=>noSeeP("ce")}>
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${ent.cellphones}`)) || seeingPCellphone ? "icon" : "icon-none"} icon={faMobileRetro}></FontAwesomeIcon></li>
                      </Link>
                      <span className={seeingPCellphone ? "span" : "span-none"}><p>Celulares</p></span>
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span" onClick={()=>  changeUrl(`${ent.services}`)} to={`${enviroment.selfUrl.dataTable}${ent.services}`} onMouseOver={()=>seeP("s")} onMouseLeave={()=>noSeeP("s")}>
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${ent.services}`)) || seeingPService ? "icon" : "icon-none"} icon={faBuilding}></FontAwesomeIcon></li>
                      </Link>
                      <span className={seeingPService ? "span" : "span-none"}><p>Servicios</p></span>
                    </div>

                    <div className="container-link-span">
                      <Link className="container-li-span" onClick={()=>  changeUrl(`${ent.customers}`)} to={`${enviroment.selfUrl.dataTable}${ent.customers}`} onMouseOver={()=>seeP("cu")} onMouseLeave={()=>noSeeP("cu")} >
                        <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${ent.customers}`)) || seeingPCustomer ? "icon" : "icon-none"} icon={faUsers}></FontAwesomeIcon></li>
                      </Link>
                      <span className={seeingPCustomer ? "span" : "span-none"}><p>Clientes</p></span>
                    </div>
                    {
                      (superAdmin === true)
                      ?
                      <>
                      <div className="container-link-span">
                        <div className="container-li-span profits" onClick={() => openModalProfits()} onMouseOver={()=>seeP("cg")} onMouseLeave={()=>noSeeP("cg")}>
                          <FontAwesomeIcon className={seeingProfits ? "icon-profits" : "icon-profits-none"} icon={faDollarSign} ></FontAwesomeIcon>
                        </div>
                        <span className={seeingProfits ? "span profit" : "span-none"}><p>Calcular Ganancias</p></span>
                      </div>

                      <div className="container-link-span">
                        <Link className="container-li-span" onClick={() => changeUrl(`${ent.users}`)} to={`${enviroment.selfUrl.dataTable}${ent.users}`} onMouseOver={()=>seeP("us")} onMouseLeave={()=>noSeeP("us")}>
                          <li className='nav-li-link'><FontAwesomeIcon className={(window.location.href.includes(`${enviroment.selfUrl.dataTable}${ent.users}`)) || seeingPUsers? "icon" : "icon-none"} icon={faUserGear}></FontAwesomeIcon></li>
                        </Link>
                        <span className={seeingPUsers ? "span" : "span-none"}><p>Usuarios</p></span>
                      </div>
                      </>
                      :
                      ""
                    } 
                </Nav>
              </div>
              <div className={seeNavReport ? "nav-reports" : "nav-reports-none"}>
                  <div className="div-li-hover">
                  <li onMouseEnter={() => mouseOverLi("brand")}  className={(window.location.href.includes("por-marca")) ? "li-nav-report" : "li-nav-report-none"}>Marca <FontAwesomeIcon icon={arrowBrand ? faCaretDown : faCaretUp} /></li>
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
                            <Link className="p-entity-filter" key={brand.id} onClick={() => changeUrl(`${enviroment.entities.reparationsBrand}`,brand.id,brand.title)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.reparationsBrand}/${brand.id}`}>{brand.title}</Link>
                            )
                        })
                        :
                        loadElements
                        ?
                        <p>Cargando Marcas...</p>
                        :
                        <p>No hay resultados</p>
                        }
                    </div>
                  </div>
                  <div className="div-li-hover">
                  <li onMouseEnter={() => mouseOverLi("cellphone")} className={(window.location.href.includes("por-celular")) ? "li-nav-report" : "li-nav-report-none"}>Celular <FontAwesomeIcon icon={arrowCellphone ? faCaretDown : faCaretUp} /></li>
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
                                <Link className="p-entity-filter" key={cellphone.id} onClick={() => changeUrl(`${enviroment.entities.reparationsCellphone}`,cellphone.id)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.reparationsCellphone}/${cellphone.id}`}>{cellphone.model}</Link>
                                )
                            })
                            :
                            loadElements
                            ?
                            <p>Cargando Celulares...</p>
                            :
                            <p>No hay resultados</p>
                        }
                    </div>
                  </div>
                  <div className="div-li-hover">
                  <li onMouseEnter={() => mouseOverLi("customer")} className={(window.location.href.includes("por-cliente")) ? "li-nav-report" : "li-nav-report-none"}>Cliente <FontAwesomeIcon icon={arrowCustomer ? faCaretDown : faCaretUp} /></li>
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
                                <Link className="p-entity-filter" key={customer.id} onClick={() => changeUrl(`${enviroment.entities.reparationsCustomer}`,customer.id)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.reparationsCustomer}/${customer.id}`}>{customer.name}</Link>
                                )
                            })
                            :
                            loadElements
                            ?
                            <p>Cargando Clientes...</p>
                            :
                            <p>No hay resultados</p>
                          }
                      </div>
                  </div>
                  <div className="div-li-hover">
                  <li onMouseEnter={() => mouseOverLi("service")} className={(window.location.href.includes("por-servicio")) ? "li-nav-report" : "li-nav-report-none"}>Servicio <FontAwesomeIcon icon={arrowService ? faCaretDown : faCaretUp} /></li>
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
                                <Link className="p-entity-filter" key={service.id} onClick={() => changeUrl(`${enviroment.entities.reparationsService}`,service.id)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.reparationsService}/${service.id}`}>{service.description}</Link>
                                )
                            })
                            :
                            loadElements
                            ?
                            <p>Cargando Servicios...</p>
                            :
                            <p>No hay resultados</p>
                          }
                      </div>
                </div>
                <div className="div-li-hover">
                  <li onMouseEnter={() => mouseOverLi("serviceStatus")} className={(window.location.href.includes("por-estado-de-servicio")) ? "li-nav-report" : "li-nav-report-none"}>Estado de Servicio <FontAwesomeIcon icon={arrowServiceState ? faCaretDown : faCaretUp} /></li>
                  </div>
                <div className={liServiceStateHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                  <div className="header-nav-reparations">
                          <div className="div-input-search">
                            <input className="search-reparations-input" type="search" placeholder="buscar..." onChange={(e) => dataServicesStatusFilter(e)}></input>
                          </div>
                          <div className="div-x">
                            <FontAwesomeIcon onClick={() => closeGridFilter("serviceStatus")} icon={faCircleXmark}/>
                          </div>
                      </div>
                      <div className="div-container-map-filter">
                          {
                            (dataServicesStatusFilter().length > 0) ? dataServicesStatusFilter().map((status)=>{
                                return(
                                <Link className="p-entity-filter" key={status.id} onClick={() => changeUrl(`${enviroment.entities.reparationsServiceStatus}`,status.id)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.reparationsServiceStatus}/${status.id}`}>{status.description}</Link>
                                )
                            })
                            :
                            loadElements
                            ?
                            <p>Cargando Estado de Servicios...</p>
                            :
                            <p>No hay resultados</p>
                          }
                      </div>
                </div>
                <div className="div-li-hover">
                  <li onMouseEnter={() => mouseOverLi("manager")} className={(window.location.href.includes("por-manager")) ? "li-nav-report" : "li-nav-report-none"}>Usuario <FontAwesomeIcon icon={arrowManager ? faCaretDown : faCaretUp} /></li>
                  </div>
                <div className={liManagerHover ? "container-reparations-filter" : "container-reparations-filter-none"}>
                  <div className="header-nav-reparations">
                          <div className="div-input-search">
                            <input className="search-reparations-input" type="search" placeholder="buscar..." onChange={(e) => dataManagersFilter(e)}></input>
                          </div>
                          <div className="div-x">
                            <FontAwesomeIcon onClick={() => closeGridFilter("manager")} icon={faCircleXmark}/>
                          </div>
                      </div>
                      <div className="div-container-map-filter">
                          {
                            (dataManagersFilter().length > 0) ? dataManagersFilter().map((manager)=>{
                                return(
                                <Link className="p-entity-filter" key={manager.id} onClick={() => changeUrl(`${enviroment.entities.reparationsManager}`,manager.id)} to={`${enviroment.selfUrl.dataTable}${enviroment.entities.reparationsManager}/${manager.id}`}>{manager.name}</Link>
                                )
                            })
                            :
                            loadElements
                            ?
                            <p>Cargando Usuarios...</p>
                            :
                            <p>No hay resultados</p>
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
                <li className="li-micuenta"><Link onClick={myInformation} to={'/informacion-personal'}>Mi cuenta</Link></li>
                <li  className="li-micuenta"><Link onClick={signOff} to={"*" }>Cerrar Sesion</Link> </li>
              </div>
            </div>
          </Navbar>
        </header>

        {
        (openModalProfit)
        ?
        <ModalProfits
          openModalProfits={openModalProfit}
          closeForm={closeForm}
          enviroment={enviroment}>
        </ModalProfits>
        : 
        ""
        }
      </>
      
    );
  }
};

export default GeneralHeader;