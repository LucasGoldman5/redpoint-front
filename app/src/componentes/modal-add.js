
import React, { useState,useEffect } from "react"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import ModalAddBrand from "./modales-add/modalAddBrand";
import ModalAddCustomer from "./modales-add/modalAddCustomer";
import ModalAddService from "./modales-add/modalAddService";
import ModalAddCellphone from "./modales-add/modalAddCellphone";
import ModalAddReparation from "./modales-add/modalReparation";
import ModalAddBrandIn from "./modales-add/modalAddBrandIn";
import ModalAddCustomerIn from "./modales-add/modalAddCustomerIn";
import ModalAddCellphoneIn from "./modales-add/modalAddCellphoneIn";
import ModalAddServiceIn from "./modales-add/modalAddServiceIn";
import ModalAddUser from "./modales-add/modalAddUser";
import './modales.css'
import HelperBuildRequest from "../helpers/buildRequest";


const ModalAdd =({closeModal, create,dataApi,errorsInTable,openModal,closeForm,enviroment,dataBrandsApp,dataCellphonesApp,dataCustomersApp,dataServicesApp,dataRolesApp,dataStatusApp,resetSelectBox, urlTable}) =>{
  
  const [errorsApi, setErrorsApi] = useState([]);
  const [errors, setErrors] = useState([]);
  const [checkbox, setCheckBox] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState (false);
  const [dataBrands, setDataBrands] = useState([]);
  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataCellPhones, setDataCellPhones] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [openModalAddBrand, setOpenModalAddBrand] = useState(false);
  const [openModalAddCustomer, setOpenModalAddCustomer] = useState(false);
  const [openModalAddCellphone, setOpenModalAddCellphone] = useState(false);
  const [openModalAddService, setOpenModalAddService] = useState(false);
  const [newCustomerSelected, setNewCustomerSelected] = useState([]);
  const [newCellphoneSelected, setNewCellphoneSelected] = useState([]);
  const [newServiceSelected, setNewServiceSelected] = useState([]);
  const [newBrandSelected, setNewBrandSelected] = useState([]);
  const [selectCustomerActive, setSelectCustomerActive] = useState(false);
  const [selectCellphoneActive, setSelectCellphoneActive] = useState(false);
  const [selectServiceActive, setSelectServiceActive] = useState(false);
  const [selectBrandActive, setSelectBrandActive] = useState(false);
  const [filterCustomerValue, setFilterCustomerValue] = useState('');
  const [filterCellphoneValue, setFilterCellphoneValue] = useState('');
  const [filterServiceValue, setFilterServiceValue] = useState('');
  const [filterBrandValue, setFilterBrandValue] = useState('');
  const [ifChangeModal, setIfchangeModal] = useState(false);
  const [count, setCount] = useState(0);
  const location = window.location.href;
 
  useEffect(() =>{
    setOpenModalAdd(openModal);
  },[openModal])

  useEffect(() =>{
    setErrors(errorsInTable);
  },[errorsInTable])

  useEffect(()=>{
    setDataBrands(dataBrandsApp);
    setDataCellPhones(dataCellphonesApp);
    setDataCustomers(dataCustomersApp);
    setDataServices(dataServicesApp);
    setDataRoles(dataRolesApp);
  },[dataBrandsApp,dataRolesApp,dataStatusApp])

  useEffect(() => {
    setNewCustomerSelected([]);
    setNewCellphoneSelected([]);
    setNewBrandSelected([]);
    setNewServiceSelected([]);
  },[resetSelectBox, urlTable])

  const changeModal = (fact) =>{

    if(fact === "brand"){

      if(location.includes(`${table}${entities.cellphones}`)){
        setOpenModalAddBrand(true);
        setOpenModalAdd(false);
        setIfchangeModal(true);
      }else{
        setOpenModalAddBrand(true);
        setOpenModalAddCellphone(false);
        setIfchangeModal(true);
      }

    }else if(fact === "customer"){  
      setOpenModalAddCustomer(true)
      setOpenModalAdd(false);
      setIfchangeModal(true);
    }else if(fact === "cellphone"){
      setOpenModalAddCellphone(true);
      setOpenModalAdd(false);
      setIfchangeModal(true);
    }else if(fact === "service"){
      setOpenModalAddService(true);
      setOpenModalAdd(false);
      setIfchangeModal(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Escape") {
      if(openModalAddCustomer === true){
        setOpenModalAddCustomer(false);
        setOpenModalAdd(true);
        setCount(1)
      }else if(openModalAddCellphone === true){         
          setOpenModalAddCellphone(false)
          setOpenModalAdd(true)
          setCount(1) 
      }else if(openModalAddService === true){
        setOpenModalAddService(false)
        setOpenModalAdd(true)
        setCount(1)
      }else if(openModalAddBrand === true ){
        if(window.location.href.includes("reparaciones")){
          setOpenModalAddBrand(false);
          setOpenModalAddCellphone(true);
          setOpenModalAdd(false);
        }else{
          setOpenModalAddBrand(false);
          setOpenModalAdd(true);
        } 
      }else{
          setOpenModalAdd(false)
          closeModal()
          setIfchangeModal(false);
          setCheckBox(false);
      }
      // Realizar la lógica deseada cuando se presiona la tecla Escape
      
    }
};

useEffect(() => {
  
  if (openModalAddCustomer === true || openModalAddCellphone === true || openModalAddService === true || openModalAddBrand === true || openModalAdd === true ) {
    document.addEventListener('keyup', handleKeyUp);
  } else if (openModalAdd === false && count === 0){
    document.removeEventListener('keyup', handleKeyUp);
    setIfchangeModal(false);
    closeModal(count)
  }
  
}, [openModalAddCellphone, openModalAddCustomer, openModalAddService, openModalAddBrand, openModalAdd]);

  const closeFormAdd = (entity) =>{
   
    if(entity === "brand"){
      if(window.location.href.includes("reparaciones")){
        setOpenModalAddBrand(false);
        setOpenModalAddCellphone(true);
      }else{
        setOpenModalAddBrand(false);
        setOpenModalAdd(true);
      } 
    }else if(entity === "customer"){
      setOpenModalAddCustomer(false);
      setOpenModalAdd(true);
    }else if(entity === "cellphone"){
      setOpenModalAddCellphone(false);
      setOpenModalAdd(true);
    }else if(entity === "service"){
      setOpenModalAddService(false);
      setOpenModalAdd(true);
    };
  };

  const checkBoxTrue = () =>{
     setCheckBox(!checkbox);
  };
  
  const onSubmitBrand = async (data) =>{
 
    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`${enviroment.apiURL.url}${enviroment.entities.brands}`, config);
        
          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{
                setNewBrandSelected(response.data);
                setErrorsApi({model:errorsApi.model, brand_id:null})

                if(location.includes(`${table}${entities.cellphones}`)){
                  setOpenModalAddBrand(false);
                  setOpenModalAdd(true);
                }else{
                  setOpenModalAddBrand(false);
                  setOpenModalAddCellphone(true);
                } 

                if(dataBrands.length > 0){
                  setDataBrands(dataBrands.concat(response.data))
                }else{
                  setDataBrands(response.data)
                }
              };
          };

          if(request.status === 422){
            const response = await request.json();
            console.log(response);
              if(response.errors){
                console.log(response.errors);
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };

  };


  const addCustomerInReparation = async (data) => {

    console.log(data);

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`${enviroment.apiURL.url}${enviroment.entities.customers}`, config);

          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{
                setNewCustomerSelected(response.data)
                setErrors({ customer_id:null, cellphone_id:errors.cellphone_id, service_id:errors.service_id}) 
                setOpenModalAddCustomer(false);
                setOpenModalAdd(true);
                  if(dataCustomers.length > 0){
                    setDataCustomers(dataCustomers.concat(response.data))             
                  }else{
                    setDataCustomers(response.data)                
                  }
              };
          };

          if(request.status === 422){
            const response = await request.json();
            console.log(response);
              if(response.errors){
                console.log(response.errors);
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };
  };


  const addServiceInReparation = async (data) => {

    const id = data.customer_id    

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`${enviroment.apiURL.url}${enviroment.entities.services}`, config);

          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{
                setNewServiceSelected(response.data)     
                setErrors({ customer_id:errors.customer_id, cellphone_id:errors.cellphone_id, service_id:null })
                setOpenModalAddService(false);
                setOpenModalAdd(true);

                if(dataServices.length > 0){
                  setDataServices(dataServices.concat(response.data)) 
                }else{
                  setDataServices(response.data)
                }
              };
          };

          if(request.status === 422){
            const response = await request.json();
            console.log(response);
              if(response.errors){
                console.log(response.errors);
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };
  };

  const addCellphoneInReparation = async (data) => {

    const id = data.customer_id  
    
    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`${enviroment.apiURL.url}${enviroment.entities.cellphones}`, config);

          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{
                setNewCellphoneSelected(response.data)
                setOpenModalAddCellphone(false);
                setOpenModalAdd(true);
                setErrors({ customer_id:errors.customer_id, cellphone_id:null, service_id:errors.service_id })

                if(dataCellPhones.length > 0){
                  setDataCellPhones(dataCellPhones.concat(response.data))               
                }else{
                  setDataCellPhones(response.data)      
                }
              };
          };

          if(request.status === 422){
            const response = await request.json();
            console.log(response);
              if(response.errors){
                console.log(response.errors);
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };
  };

  const addEmail = (entity) =>{

    setFilterCustomerValue('');
    setSelectCustomerActive(false);

    if(entity === "customer"){
      setErrors({customer_id:null, cellphone_id:errors.cellphone_id, service_id:errors.service_id})
    };
  };

  const changeError = (entity,value) =>{

    if(entity === "customer"){
      setErrors({customer_id:null, cellphone_id:errors.cellphone_id, service_id:errors.service_id})
    }
    else if(entity === "cellphone"){
      setFilterCellphoneValue('');
      setSelectCellphoneActive(false);
      setErrors({customer_id:errors.customer_id, cellphone_id:null, service_id:errors.service_id});
    }
    else if(entity === "service"){
      setFilterServiceValue('');
      setSelectServiceActive(false);
      setErrors({customer_id:errors.customer_id, cellphone_id:errors.cellphone_id, service_id:null});
    }
    else if(entity === "brand"){
      setFilterBrandValue('');
      setSelectBrandActive(false);
      setErrors({brand_id:null, model:errors.model});
    }
    else if(entity === "model"){
      setErrors({model:null, brand_id:errors.brand_id})
    }
    else if(entity === "title"){
      setErrors({title:null})
    }
    else if(entity === "description"){
      setErrors({description:null})
    }
    else if(entity === "name"){
      setErrors({name:null, email:errors.email, phone_number:errors.phone_number, rol_id:errors.rol_id})
    }
    else if(entity === "email"){
      setErrors({name:errors.name, email:"El email requiere este formato : xxxx@xx.xx", phone_number:errors.phone_number})
      if(value.includes("@" && ".")){
        setErrors({name:errors.name, email:null, phone_number:errors.phone_number, rol_id:errors.rol_id})
      }
    }
    else if(entity === "phone_number"){
      setErrors({name:errors.name, email:errors.email, phone_number:null, rol_id:errors.rol_id})
    }
    else if(entity === "rol_id"){
      setErrors({name:errors.name, email:errors.email, phone_number:errors.phone_number, rol_id:null})
    }
  };

  const changeErrorApi = (entity,value) =>{

    if(entity === "title"){
      setErrorsApi({title:null})
    }
    else if(entity === "name"){
      setErrorsApi({name:null, email:errorsApi.email, phone_number:errorsApi.phone_number})
    }
    else if(entity === "email"){
      setErrorsApi({name:errorsApi.name, email:"El email requiere este formato : xxxx@xx.xx", phone_number:errorsApi.phone_number})
      if(value.includes("@" && ".")){
        setErrorsApi({name:errorsApi.name, email:null, phone_number:errorsApi.phone_number})
      }
    }
    else if(entity === "phone_number"){
      setErrorsApi({name:errorsApi.name, email:errorsApi.email, phone_number:null})
    }
    else if(entity === "model"){
      setErrorsApi({model:null, brand_id:errorsApi.brand_id})
    }
    else if(entity === "brand_id"){
      setFilterBrandValue('');
      setSelectBrandActive(false);
      setErrorsApi({model:errorsApi.model, brand_id:null});
    }
    else if(entity === "description"){
      setErrorsApi({description:null})
    }
  };


  const activeInputSearch = (data,entity) =>{
    
    if(entity === "customer"){
      setSelectCustomerActive(!selectCustomerActive);
    }
    else if(entity === "cellphone"){
      setSelectCellphoneActive(!selectCellphoneActive);
    }
    else if(entity === "service"){
      setSelectServiceActive(!selectServiceActive);
    }
    else if(entity === "brand"){
      setSelectBrandActive(!selectBrandActive);
    };
  };


  const handleInputChange = (e,entity) => {
    if(entity === "customer"){
      setFilterCustomerValue(e.target.value);
    }
    else if(entity === "cellphone"){
      setFilterCellphoneValue(e.target.value)
    }
    else if(entity === "service"){
      setFilterServiceValue(e.target.value)
    }
    else if(entity === "brand"){
      setFilterBrandValue(e.target.value)
    }
  };
 
  
  const filteredCustomers = () =>{
     if(dataCustomers.length >=1){
      dataCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(filterCustomerValue.toLowerCase())
      )
     }
  };

  const filteredCellphones = dataCellPhones.filter((cellphone) =>
    cellphone.model.toLowerCase().includes(filterCellphoneValue.toLowerCase())
  );

  const filteredServices = dataServices.filter((service) =>
    service.description.toLowerCase().includes(filterServiceValue.toLowerCase())
  );

  const filteredBrands = dataBrands.filter((brand) =>
    brand.title.toLowerCase().includes(filterBrandValue.toLowerCase())
  );

  const table = enviroment.selfUrl.dataTable;
  const entities = enviroment.selfUrl.localEntities;


  if(location.includes(`${table}${entities.cellphones}`)){

    return(

       <>
          <ModalAddCellphone
          openModalAdd={openModalAdd}
          create={create}
          dataApi={dataApi}
          errors={errors}
          handleInputChange={handleInputChange}
          activeInputSearch={activeInputSearch}
          changeModal={changeModal}
          newBrandSelected={newBrandSelected}
          filteredBrands={filteredBrands}
          changeError={changeError}
          closeForm={closeForm}
          selectBrandActive={selectBrandActive}
          />

         <ModalAddBrandIn
          openModalAddBrand={openModalAddBrand}
          onSubmitBrand={onSubmitBrand}
          errorsApi={errorsApi}
          changeErrorApi={changeErrorApi}
          closeFormAdd={closeFormAdd}/>

        </>  
    );
  }else if(location.includes(`${table}${entities.brands}`)){

    return(

      <ModalAddBrand
       openModalAdd={openModalAdd}
       create={create}
       dataApi={dataApi}
       errors={errors}
       changeError={changeError}
       closeForm={closeForm}/>

    )
  }else if(location.includes(`${table}${entities.services}`)){

    return(
      <ModalAddService
       openModalAdd={openModalAdd}
       create={create}
       dataApi={dataApi}
       errors={errors}
       changeError={changeError}
       closeForm={closeForm}/>
    );
  }else if(location.includes(`${table}${entities.customers}`)){

    return(

      <ModalAddCustomer
       openModalAdd={openModalAdd}
       create={create}
       dataApi={dataApi}
       errors={errors}
       changeError={changeError}
       closeForm={closeForm}/>
    
    );
  }else if(location.includes(`${table}${entities.reparations}`)){

    return(
        <>
          <ModalAddReparation
           openModalAdd={openModalAdd}
           create={create}
           errors={errors}
           handleInputChange={handleInputChange}
           activeInputSearch={activeInputSearch}
           changeModal={changeModal}
           newCustomerSelected={newCustomerSelected}
           newCellphoneSelected={newCellphoneSelected}
           newServiceSelected={newServiceSelected}
           filteredCustomers={filteredCustomers}
           filteredCellphones={filteredCellphones}
           filteredServices={filteredServices}
           addEmail={addEmail}
           changeError={changeError}
           closeForm={closeForm}
           selectCustomerActive={selectCustomerActive}
           selectCellphoneActive={selectCellphoneActive}
           selectServiceActive={selectServiceActive}
           checkBoxTrue={checkBoxTrue}
           checkbox={checkbox}
           ifChangeModal={ifChangeModal}/>  

          <ModalAddCustomerIn
           openModalAddCustomer={openModalAddCustomer}
           addCustomerInReparation={addCustomerInReparation}
           errorsApi={errorsApi}
           changeErrorApi={changeErrorApi}
           closeFormAdd={closeFormAdd}/>

          <ModalAddCellphoneIn
           openModalAddCellphone={openModalAddCellphone}
           addCellphoneInReparation={addCellphoneInReparation}
           errorsApi={errorsApi}
           changeErrorApi={changeErrorApi}
           closeFormAdd={closeFormAdd}
           handleInputChange={handleInputChange}
           activeInputSearch={activeInputSearch}
           changeModal={changeModal}
           selectBrandActive={selectBrandActive}
           filteredBrands={filteredBrands}
           newBrandSelected={newBrandSelected}
           dataCellPhones={dataCellPhones}/>

          <ModalAddBrandIn
          openModalAddBrand={openModalAddBrand}
          onSubmitBrand={onSubmitBrand}
          errorsApi={errorsApi}
          changeErrorApi={changeErrorApi}
          closeFormAdd={closeFormAdd}/>

          <ModalAddServiceIn
           openModalAddService={openModalAddService}
           addServiceInReparation={addServiceInReparation}
           errorsApi={errorsApi}
           changeErrorApi={changeErrorApi}
           closeFormAdd={closeFormAdd}
           dataServices={dataServices}/>

        </>
    );
  }else if(window.location.href.includes("usuarios")){

    return(
      <ModalAddUser
      openModalAdd={openModalAdd}
      create={create}
      dataApi={dataApi}
      errors={errors}
      changeError={changeError}
      closeForm={closeForm}
      dataRoles={dataRoles}/>
    );
  }
  /*else if(window.location.href.includes("report")){

    return(
      <>
        <Modal isOpen={openModalAdd} className="modal-reparations">
          <ModalHeader style={{display: 'block'}}>
            <div>
              <h5  style={{float: 'center', color: 'green'}} >Crear Reparacion</h5> 
            </div>
          </ModalHeader>
          <ModalBody className="modal-body reparations">
            <form className="form-group reparations" onSubmit={handleSubmit(create)}>
              <label htmlFor="marca">Cliente</label>
              <div className="div-container-select-button">
                <select className="form-select" name="select"  defaultValue={null}{...register('customer_id',{
                    value:null
                    })}>
                      <option className="option-selected" value={null}>Seleccionar..</option>
                    {dataCustomers.map((customer)=>{
                        return <option className="option-modal" key={customer.id} value={customer.id} >{customer.name}</option>
                    })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("customer")}>+</h1>
              </div> 
              {errors.customer_id ? <p className="p-errores">Debe seleccionar un Cliente</p> : ""}
              <br />
              <label htmlFor="url">Numero de contacto</label>
              <input className="form-control" type="text" name="contact-number" {...register('number',{
                value:null
                })} />
              <br />
              <label htmlFor="url">Email</label>
              <input className="form-control" type="text" name="email" {...register('email',{
                value:null
                })} />
              <br />
              <label htmlFor="url">Celular</label>
              <div className="div-container-select-button">
                <select className="form-select" name="select"  defaultValue={null}{...register('cellphone_id',{
                    })}>
                      <option className="option-selected" value={null}>Seleccionar..</option>
                    {dataCellPhones.map((cellphone)=>{
                        return <option className="option-modal" key={cellphone.id} value={cellphone.id} >{cellphone.model}</option>
                    })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("cellphone")}>+</h1>
              </div>
              {errors.cellphone_id ? <p className="p-errores">Debe seleccionar un celular</p> : ""}
              <br />
              <label htmlFor="url">Falla</label>
              <textarea className="form-control"  name="phone_2" {...register('failure',{
                value:null
                })} />
              <br />
              <label htmlFor="url">Observacion</label>
              <textarea className="form-control" type="text" name="phone_2" {...register('observation',{
                value:null
                })} />
              <br/>
              <label htmlFor="url">Estado de la reparacion</label>
              <select className="form-select" type="text" name="phone_2" {...register('state_id',{   
                })}>
                 <option value={1}>Recibido</option> 
              </select>
              <br/>
              <label htmlFor="url">Servicio</label>
              <div className="div-container-select-button">
                <select className="form-select" name="select"  defaultValue={null}{...register('service_id',{
                    })}>
                      <option className="option-selected" value={null}>seleccionar..</option>
                    {dataServices.map((service)=>{
                        return <option className="option-modal" key={service.id} value={service.id} >{service.description}</option>
                    })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("service")}>+</h1>
              </div>
              {errors.service_id ? <p className="p-errores">Debe seleccionar un Servicio</p> : ""}
              <br/>
              <label htmlFor="url">Valor de la reparacion</label>
              <input className="form-control" type="text" name="phone_2" {...register('cost',{
                value:null
                })} />
              <br/>
              <label htmlFor="url">Precio a cobrar<span>*</span> </label>
              <input className="form-control" type="text" name="phone_2" {...register('amount',{
                value:null
                })} />
              <br/>
              <label htmlFor="url">Fecha de notificacion al cliente</label>
              <input className="form-control" type="date" name="phone_2" {...register('notice_date',{
                value:  null,
                setValueAs : value =>{
                  if(value != null){
                    let dateInput = new Date(value)
                  dateInput = dateInput.getUTCFullYear() + '-' +
                  ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                  ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                  ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCSeconds()).slice(-2);

                  return dateInput
                  }else{
                    return value
                  } 
                } 
                })} />
              <br/>
              <label htmlFor="url">Cantidad de Notificaciones</label>
              <input className="form-control" type="text" name="phone_2" {...register('notice_quantity',{
                value:0
                })} />
              <br/>
              <label htmlFor="url">Fecha de entrega</label>
              <input className="form-control" type="date" name="phone_2" {...register('delivery_date',{
                value:  null,
                setValueAs : v =>{
                  if(v != null){
                    let dateInput = new Date(v)
                  dateInput = dateInput.getUTCFullYear() + '-' +
                  ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                  ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                  ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCSeconds()).slice(-2);

                  return dateInput
                  }else{
                    return v
                  } 
                } 
                })} />
              <br/>
              <label htmlFor="url">Fecha de inicio del servicio</label>
              <input className="form-control" type="date" name="phone_2" {...register('service_start_date',{
                value:  null,
                setValueAs : v =>{
                  if(v != null){
                    let dateInput = new Date(v)
                  dateInput = dateInput.getUTCFullYear() + '-' +
                  ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                  ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                  ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCSeconds()).slice(-2);

                  return dateInput
                  }else{
                    return v
                  } 
                } 
                })} />
              <br/>
              <label htmlFor="url">Fecha de servicio terminado</label>
              <input className="form-control" type="date" name="phone_2" {...register('service_end_date',{
                value:  null,
                setValueAs : v =>{
                  if(v != null){
                    let dateInput = new Date(v)
                  dateInput = dateInput.getUTCFullYear() + '-' +
                  ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                  ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                  ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                  ('00' + dateInput.getUTCSeconds()).slice(-2);

                  return dateInput
                  }else{
                    return v
                  } 
                } 
                })} />
              <br/>
              <label htmlFor="url">Imei</label>
              <input className="form-control" type="text" name="phone_2" {...register('imei',{
                value:null
                })} />
              <br/>
              <label htmlFor="check">Tiene seguridad</label>
              <input onClick={checkBoxTrue} type="checkbox" name="phone_2" {...register('has_security',{
                value:0
                })} />
              <br/>
              {
                (checkbox)
                ?
                <div>
                  <br/>
                  <label>Patron</label>
                  <input className="form-control" type="text" name="phone_2" {...register('pattern',{
                    value:null
                    })} />
                  <br/>
                  <label>Pin</label>
                  <input className="form-control" type="text" name="phone_2" {...register('pin',{
                    value:null
                    })} />  
                </div>
                :
                ""
              }                                      
              <hr />
              <div className="contenedor-botones-modal">
                <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
              </div>
            </form>
            <div className="contenedor-boton-modal-fuera">
              <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={openModalAddCustomer}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Cliente</h5> 
              </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit={handleSubmit(addCustomerInReparation)}>
                <label htmlFor="marca">Nombre</label>
                <input className="form-control" type="text" name="name"  {...register('name',{
                  value:null
                  })} />
                  {errorsApi.name? <p className="p-errores">{errorsApi.name}</p> : ""} 
                <br />
                <label htmlFor="url">Email</label>
                <input className="form-control" type="text" name="email" {...register('email',{
                  value:null
                  })} />
                  {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""}
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className="form-control" type="text" name="phone" {...register('phone_number',{
                  value:null
                  })} />
                  {errorsApi.phone_number? <p className="p-errores">{errorsApi.phone_number}</p> : ""}
                <br />
                <label htmlFor="url">Numero de telefono 2</label>
                <input className="form-control" type="text" name="phone_2" {...register('phhone_number_2',{
                  value:null
                  })} />
                <br />
                <hr />
                <div className="contenedor-botones-modal">
                  <button type="submit" className="btn btn-success" onClick={addCustomerInReparation} >Crear</button>
                </div>            
              </form>
              <div className="contenedor-boton-modal-fuera">
                <button className="btn btn-danger" onClick={closeFormAdd}>Cancelar</button>
              </div>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddCellphone}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear celular</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addCellphoneInReparation)}>
                <label htmlFor="id">Numero de Marca</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataApi.data.length+1}`}  />
                <br/>
                <label htmlFor="modelo">Modelo</label>
                <input className="form-control" type="text" name="modelo" {...register('model',{
                  value:null
                  })}/>
                  {errorsApi.model? <p className="p-errores">El campo Modelo debe ser completado</p> : ""}
                <br />
                <label htmlFor="url">Url</label>
                <input className="form-control" type="text" name="url" {...register('url',{
                  value:null
                  })} />
                <br/>
                <label htmlFor="brnad_id">Marca</label>
                <div className="div-container-select-button">
                <select className="form-select brand" name="select"  {...register('brand_id',{
                  value:null
                  })}>
                    <option className="option-selected" value={null}>Seleccionar..</option>
                  {dataBrands.map((brand)=>{
                      return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add"  onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <div className="contenedor-boton-modal-dentro">
                  <button type="submit" className="btn btn-success" onClick={addCellphoneInReparation} >Crear</button>
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                <button className="btn btn-danger" onClick={closeFormAdd}>Cancelar</button>
              </div>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddService}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Servicio</h5> 
              </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit={handleSubmit(addServiceInReparation)}>
                <label htmlFor="id">Numero de Servicio</label>
                <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length + 1} ></input>
                <br />
                <label htmlFor="marca">Descripcion</label>
                <input className="form-control" type="text" name="marca"  {...register('description',{
                  value:null
                  })} />
                  {errorsApi.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className="form-control" type="text" name="numero de telefono" {...register('phone_number',{
                  value:null
                  })} />
                <br />
                <label htmlFor="url">Direccion</label>
                <input className="form-control" type="text" name="direccion" {...register('address',{
                  value:null
                  })} />
                <br />
                <label htmlFor="url">Email</label>
                <input className="form-control" type="text" name="email" {...register('email',{
                  value:null
                  })} />
                <br />
                <hr />
                <div className="contenedor-botones-modal">
                  <button type="submit" className="btn btn-success" onClick={addServiceInReparation} >Crear</button>
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                <button className="btn btn-danger" onClick={closeFormAdd}>Cancelar</button>
              </div>
            </ModalBody>
          </Modal>

        <Modal isOpen={openModalAddBrand}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Marca</h5> 
              </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit={handleSubmit(onSubmitBrand)}>
                <br />
                <label htmlFor="marca">Marca</label>
                <input className="form-control" type="text" name="marca"  {...register('title')} />
                  {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
                <label htmlFor="url">Descripcion</label>
                <input className="form-control" type="text" name="url" {...register('description',{
                  value:null
                  })} />
                <br />
                <label htmlFor="url">Url</label>
                <input className="form-control" type="text" name="url"  {...register('url',{
                  value:null
                  })} />
                <br/>
                <div className="contenedor-boton-modal-dentro">
                  <button type="submit" className="btn btn-success" onClick={onSubmitBrand} >Crear</button>
                </div>  
              </form>
              <div className="contenedor-boton-modal-fuera">
                <button className="btn btn-danger" onClick={closeFormAdd}>Cancelar</button>
              </div>
            </ModalBody>
          </Modal>
      </>
    );
  };*/
};


export default ModalAdd;

