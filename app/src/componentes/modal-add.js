
import React, { useState,useEffect } from "react"
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


const ModalAdd =({closeModal,actionModal, create,dataApi,errorsInTable,openModal,closeForm,enviroment,resetSelectBox,urlTable,checkBox,modalClosed}) =>{
  
  const [errorsApi, setErrorsApi] = useState([]);
  const [errors, setErrors] = useState([]);
  const [checkbox, setCheckBox] = useState(true);
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
    setFilterCustomerValue("")
    setFilterCellphoneValue("")
    setFilterServiceValue("")
    setFilterBrandValue("")
    setSelectBrandActive(false);
    setSelectCellphoneActive(false);
    setSelectCustomerActive(false);
    setSelectServiceActive(false);
    setCheckBox(true);
  },[openModal])

  useEffect(()=>{
    setIfchangeModal(modalClosed);
  },[modalClosed])


  useEffect(() =>{
    setErrors(errorsInTable);
  },[errorsInTable])

  useEffect(()=>{
    if(openModalAdd == true){
       
      const getSelectors = async () =>{
        const apiURL = enviroment.apiURL;
        const entitiesUrl = enviroment.entities;
    
          if(window.location.href.includes("reparaciones")){
          try{
                      
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.brand}`, config);

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
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.cellphone}`, config);

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
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.customer}`, config);

              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataCustomers(response);
                        
                    }  
              };

          }catch(error){
            console.log(error)
          }
        
        
          try{
                        
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.service}`, config);

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

        }else if(window.location.href.includes("celulares")){

          try{
                      
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.brand}`, config);

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
        }else if(window.location.href.includes("usuarios")){

          try{
                    
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.roles}`, config);

              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                    
                        setDataRoles(response);
                    }  
              };

          }catch(error){
            console.log(error)
          }
        }
      }
      getSelectors()
    }
  },[openModalAdd])

  useEffect(() => {
    setNewCustomerSelected([]);
    setNewCellphoneSelected([]);
    setNewBrandSelected([]);
    setNewServiceSelected([]);
  },[resetSelectBox, urlTable, actionModal])

  const changeModal = (fact) =>{

    setFilterCustomerValue("")
    setFilterCellphoneValue("")
    setFilterServiceValue("")
    setFilterBrandValue("")
    setSelectBrandActive(false);
    setSelectCustomerActive(false);
    setSelectServiceActive(false);
    setSelectCellphoneActive(false);

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
          setIfchangeModal(true)
        }else{
          setOpenModalAddBrand(false);
          setOpenModalAdd(true);
        } 
      }else{
          setOpenModalAdd(false)
          closeModal()
          setIfchangeModal(false);
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
    closeModal()
  }
  
}, [openModalAddCellphone, openModalAddCustomer, openModalAddService, openModalAddBrand, openModalAdd]);

  const closeFormAdd = (entity) =>{
   
    if(entity === "brand"){
      if(window.location.href.includes("reparaciones")){
        setOpenModalAddBrand(false);
        setOpenModalAddCellphone(true);
        setIfchangeModal(false);
      }else{
        setOpenModalAddBrand(false);
        setOpenModalAdd(true);
        setIfchangeModal(false);
      } 
    }else if(entity === "customer"){
      setOpenModalAddCustomer(false);
      setOpenModalAdd(true);
      setIfchangeModal(false);
    }else if(entity === "cellphone"){
      setOpenModalAddCellphone(false);
      setOpenModalAdd(true);
      setIfchangeModal(false);
    }else if(entity === "service"){
      setOpenModalAddService(false);
      setOpenModalAdd(true);
      setIfchangeModal(false);
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
                setIfchangeModal(false);
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
                setIfchangeModal(false);

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
                setIfchangeModal(false);
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
        return dataCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(filterCustomerValue.toLowerCase())
      )
     }else{
      return [];
     }
  };

  const filteredCellphones = () =>{
    if(dataCellPhones.data){
      if(dataCellPhones.data.length >= 1){
        return dataCellPhones.data.filter((cellphone) =>
        cellphone.model.toLowerCase().includes(filterCellphoneValue.toLowerCase()))
      }else{
        return[]
      }
    }else{
      return []
    }
  } 
  

  const filteredServices = () =>{
    if ( dataServices.length >= 1){
      return dataServices.filter((service) =>
      service.description.toLowerCase().includes(filterServiceValue.toLowerCase())
    );
    }else{
      return []
    }
  }

  const filteredBrands = () =>{
    if (dataBrands.length >= 1){
      return dataBrands.filter((brand) =>
      brand.title.toLowerCase().includes(filterBrandValue.toLowerCase())
    );
    }else{
      return []
    }
  }

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
          ifChangeModal={ifChangeModal}/>

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
           ifChangeModal={ifChangeModal}
           actionModal={actionModal}/>  

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
           dataCellPhones={dataCellPhones}
           ifChangeModal={ifChangeModal}/>

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
  
};


export default ModalAdd;

