



const ReportHeader = () =>{

  const [user,setUser] = useState( GetUserData() );
  
 
 

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
     if(e === "rn"){
      setSeeingPReparation(!seeingPReparation)
    }
  }

  const openNavReports = async () =>{
     setSeeNavReport(!seeNavReport);
     setArrowIcon(!arrowIcon);

     const url = async () =>{
        const enviroment = await getEnviroment()
        return  enviroment.apiURL 
      }

      const apiURL = await url()
      

     if(seeNavReport === false){
        try{
                    
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL}select-box/brand`, config);
    
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataBrands(response);
                    }  
              };
    
          }catch(error){
            console.log(error)
          }
          
          try{
                      
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL}select-box/customer`, config);
    
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
                      
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL}select-box/cellphone`, config);
    
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataCellPhones(response);
                        
                    }  
              };
    
          }catch(error){
            console.log(error)
          }
          
          try{
                      
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL}select-box/service`, config);
    
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataServices(response);
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
  

 if(apiURLLocal){
    return(

        <>
          <header className="header">
            <Navbar className="contenedor-nav-general" bg="dark" variant="dark">
                <div className="contenedor-general">
                    <div className="contenedor-titulo">
                    <Navbar.Brand className="titulo-nav"  href={`${apiURLLocal}Table/report/reparations-pending`} >ClaroApp</Navbar.Brand>
                    </div>
                    <div className="contenedor-contenedor-links">
                    <nav className="nav-general">
                        <li className='nav-li-link-report'><Link onMouseEnter={()=>seeP("rn")} onMouseLeave={()=>seeP("rn")}  onClick={()=> reload()} to={`/Table/reparations`}><FontAwesomeIcon className={(window.location.href === `${apiURLLocal}Table/reparations`)? "icon" : "icon-none"} icon={faScrewdriverWrench}></FontAwesomeIcon><p className={seeingPReparation ? "p-entity" : "p-entity-none"}>Reparaciones</p></Link></li>
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
                                             <p className="p-entity-filter" key={brand.id} onClick={() => getFilterReparations(brand.id,"brands",brand.title,apiURLLocal)}>{brand.title}</p>
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
                                                 <p className="p-entity-filter" key={cellphone.id} onClick={() => getFilterReparations(cellphone.id,"cellphones",cellphone.model,apiURLLocal)}>{cellphone.model}</p>
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
                                                 <p className="p-entity-filter" key={customer.id} onClick={() => getFilterReparations(customer.id,"customers",customer.name,apiURLLocal)}>{customer.name}</p>
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
                                                 <p className="p-entity-filter" key={service.id} onClick={() => getFilterReparations(service.id,"services",service.description,apiURLLocal)}>{service.description}</p>
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
 }
};

export default ReportHeader;