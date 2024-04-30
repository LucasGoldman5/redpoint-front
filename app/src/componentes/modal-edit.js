import React, {useState,useEffect} from "react";
import ModalEditBrand from "./modales-edit/modalEditBrand";
import ModalEditCellphone from "./modales-edit/modalEditCellphone";
import ModalEditBrandIn from "./modales-edit/modalEditBrandIn";
import ModalEditService from "./modales-edit/modalEditService";
import ModalEditCustomer from "./modales-edit/modalEditCustomer";
import ModalEditReparation from "./modales-edit/modalEditReparation";
import ModalEditCustomerIn from "./modales-edit/modalEditCustomerIn";
import ModalEditCellphoneIn from "./modales-edit/modalEditCellphoneIn";
import ModalEditServiceIn from "./modales-edit/modalEditServiceIn";
import ModalEditUser from "./modales-edit/modalEditUser";
import HelperBuildRequest from "../helpers/buildRequest";
import './modales.css'


const ModalEdit = ({ getOpenModalEdit, selectRowOff, itemToEdit, edit, closeForm,onsubmit,errorsInTable,enviroment}) => {


  const location = window.location.href;
  const [dataStatesEdit, setDataStatesEdit] = useState([]);
  const [dataBrandsEdit, setDataBrandsEdit] = useState([]);
  const [dataCustomersEdit, setDataCustomersEdit] = useState([]);
  const [dataCellphonesEdit, setDataCellPhonesEdit] = useState([]);
  const [dataServicesEdit, setDataServicesEdit] = useState([]);
  const [dataRolesEdit, setDataRolesEdit] = useState([]);
  const [dataServiceStatusEdit, setDataServiceStatusEdit] = useState([]);
  const [errors, setErrors] = useState([]);
  const [errorsApi, setErrorsApi] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAddBrandEdit, setOpenModalAddBrandEdit] = useState(false);
  const [openModalAddCustomerEdit, setOpenModalAddCustomerEdit] = useState(false);
  const [openModalAddCellphoneEdit, setOpenModalAddCellphoneEdit] = useState(false);
  const [openModalAddServiceEdit, setOpenModalAddServiceEdit] = useState(false);
  const [newCustomerSelectedEdit, setNewCustomerSelectedEdit] = useState([]);
  const [newCellphoneSelectedEdit, setNewCellphoneSelectedEdit] = useState([]);
  const [newServiceSelectedEdit, setNewServiceSelectedEdit] = useState([]);
  const [newBrandSelectedEdit, setNewBrandSelectedEdit] = useState([]);
  const [selectCustomerActive, setSelectCustomerActive] = useState(false);
  const [selectCellphoneActive, setSelectCellphoneActive] = useState(false);
  const [selectServiceActive, setSelectServiceActive] = useState(false);
  const [selectBrandActive, setSelectBrandActive] = useState(false);
  const [filterCustomerValue, setFilterCustomerValue] = useState('');
  const [filterCellphoneValue, setFilterCellphoneValue] = useState('');
  const [filterServiceValue, setFilterServiceValue] = useState('');
  const [filterBrandValue, setFilterBrandValue] = useState('');
  const [count, setCount] = useState(0);
 

  useEffect(() =>{
    setOpenModalEdit(getOpenModalEdit);
    setFilterBrandValue("")
    setFilterCustomerValue("")
    setFilterCellphoneValue("")
    setFilterServiceValue("")
    setSelectBrandActive(false);
    setSelectCustomerActive(false);
    setSelectServiceActive(false);
    setSelectCellphoneActive(false);
  },[getOpenModalEdit]);


 
  useEffect(()=>{
    if(getOpenModalEdit == true){

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
                        setDataBrandsEdit(response);
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
                        setDataCellPhonesEdit(response); 
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
                        setDataCustomersEdit(response);
                        
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
                        setDataServicesEdit(response);
                    }  
              };

          }catch(error){
            console.log(error)
          }

          try{
                    
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.status}`, config);

              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                    
                        setDataStatesEdit(response);
                    }  
              };
          }catch(error){
            console.log(error)
          }


          try{
                    
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.serviceStatus}`, config);

              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                
                        setDataServiceStatusEdit(response);
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
                      setDataBrandsEdit(response);
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
                        setDataRolesEdit(response);
                    }  
              };

          }catch(error){
            console.log(error)
          }
        }
      }
      getSelectors()
    }
  },[getOpenModalEdit])

  useEffect(() =>{
    setErrors(errorsInTable);
  },[errorsInTable]);

  const changeModal = (fact) =>{

    setFilterBrandValue("")
    setFilterCustomerValue("")
    setFilterCellphoneValue("")
    setFilterServiceValue("")
    setSelectBrandActive(false);
    setSelectCustomerActive(false);
    setSelectServiceActive(false);
    setSelectCellphoneActive(false);

    if(fact === "brand"){
      if(window.location.href.includes("reparaciones" || "reporte")){
        setOpenModalAddBrandEdit(true);
        setOpenModalAddCellphoneEdit(false);
      }else{
        setOpenModalAddBrandEdit(true);
        setOpenModalEdit(false);
      } 
    }else if(fact === "customer"){  
      setOpenModalAddCustomerEdit(true)
      setOpenModalEdit(false);
    }else if(fact === "cellphone"){
      setOpenModalAddCellphoneEdit(true);
      setOpenModalEdit(false);
    }else if(fact === "service"){
      setOpenModalAddServiceEdit(true);
      setOpenModalEdit(false);
    }
  };

  const handleKeyUp = (event) => {
      if (event.key === "Escape") {
        if(openModalAddCustomerEdit === true){
          setOpenModalAddCustomerEdit(false);
          setOpenModalEdit(true);
          setCount(1)
        }else if(openModalAddCellphoneEdit === true){         
            setOpenModalAddCellphoneEdit(false)
            setOpenModalEdit(true)
            setCount(1) 
        }else if(openModalAddServiceEdit === true){
          setOpenModalAddServiceEdit(false)
          setOpenModalEdit(true)
          setCount(1)
        }else if(openModalAddBrandEdit === true ){
          if(window.location.href.includes("reparaciones" || "reporte")){
            setOpenModalAddBrandEdit(false);
            setOpenModalAddCellphoneEdit(true);
            setOpenModalEdit(false);
          }else{
            setOpenModalAddBrandEdit(false);
            setOpenModalEdit(true);
          } 
        }else{
            setCount(1)
            setOpenModalEdit(false)
        }
        // Realizar la lógica deseada cuando se presiona la tecla Escape
      }
  };
  
  useEffect(() => {
    
    if (openModalAddCustomerEdit === true || openModalAddCellphoneEdit === true || openModalAddServiceEdit === true || openModalAddBrandEdit === true || openModalEdit === true ) {
      document.addEventListener('keyup', handleKeyUp);
    } else {
      document.removeEventListener('keyup', handleKeyUp);
      selectRowOff(count)
    }
    
  }, [openModalEdit,openModalAddCellphoneEdit]);
  

  const closeFormAdd = (entity) =>{

    if(entity === "customer"){
      setOpenModalAddCustomerEdit(false);
      setOpenModalEdit(true);
    }else if(entity === "cellphone"){
      setOpenModalAddCellphoneEdit(false);
      setOpenModalEdit(true);
    }else if(entity === "service"){
      setOpenModalAddServiceEdit(false);
      setOpenModalEdit(true);
    }else if(entity === "brand"){
      if(window.location.href.includes("reparaciones" || "reporte")){
        setOpenModalAddBrandEdit(false);
        setOpenModalAddCellphoneEdit(true);
      }else{
        setOpenModalAddBrandEdit(false);
        setOpenModalEdit(true);
      }     
    }else if(entity === "general"){
      setOpenModalEdit(false);
    }
  
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
                setNewBrandSelectedEdit(response.data)
                setOpenModalAddBrandEdit(false);
                if(window.location.href.includes("reparaciones" || "reportes")){
                  setOpenModalAddCellphoneEdit(true);
                }else{
                  setOpenModalEdit(true);
                }

                if(dataBrandsEdit.length > 0){
                  setDataBrandsEdit(dataBrandsEdit.concat(response.data))                 
                }else{
                  setDataBrandsEdit(response.data)
                }
              };
          };

          if(request.status === 422){
            const response = await request.json();
              if(response.errors){
                alert("Debe completar o corregir el Formulario")
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };

  };

  const addCustomerInReparationEdit = async (data) =>{

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
                setNewCustomerSelectedEdit(response.data);
                setOpenModalAddCustomerEdit(false);
                setOpenModalEdit(true);
  
                if(dataCustomersEdit.length > 0){
                  setDataCustomersEdit(dataCustomersEdit.concat(response.data))
                }else{
                  setDataCustomersEdit(response.data)
                }
              };
          };

          if(request.status === 422){
            const response = await request.json();
              if(response.errors){
                alert("Debe completar o corregir el Formulario")
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };

  };

  const addCellphoneInReparationEdit = async (data) =>{
   
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
                setNewCellphoneSelectedEdit(response.data)
                setOpenModalAddCellphoneEdit(false);
                setOpenModalEdit(true);

                if(dataCustomersEdit.length > 0){
                  setDataCellPhonesEdit(dataCellphonesEdit.concat(response.data))                 
                }else{
                  setDataCellPhonesEdit(response.data)
                }
              };
          };

          if(request.status === 422){
            const response = await request.json();
              if(response.errors){
                alert("Debe completar o corregir el Formulario")
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };

  };

  const addServiceInReparationEdit = async (data) =>{  
    
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
                setNewServiceSelectedEdit(response.data)
                setOpenModalAddServiceEdit(false);
                setOpenModalEdit(true);

                if(dataCustomersEdit.length > 0){
                  setDataServicesEdit(dataServicesEdit.concat(response.data))                 
                }else{
                  setDataServicesEdit(response.data)
                }
              };
          };

          if(request.status === 422){
            const response = await request.json();
              if(response.errors){
                alert("Debe completar o corregir el Formulario")
                setErrorsApi(response.errors)
              };
          };
      }catch(error){
        console.log(error)
      };    
    };
  };

  

  const addEmail = (customerId,entity) =>{

    setFilterCustomerValue('');
    setSelectCustomerActive(false);

    if(entity === "customer"){
      setErrors({...errors, customer_id:null})
    };
  };

  const changeError = (entity,value) =>{

    function contieneSoloNumeros(value) {
      return /^[0-9]+$/.test(value);
    }

    if(entity === "customer"){
      setErrors({...errors, customer_id:null})
    }
    else if(entity === "cellphone"){
      setFilterCellphoneValue('');
      setSelectCellphoneActive(false);
      setErrors({...errors,cellphone_id:null})
    }
    else if(entity === "service"){
      setFilterServiceValue('');
      setSelectServiceActive(false);
      setErrors({...errors, service_id:null})
    }
    else if(entity === "cost"){
      let text = value.target.value;
      if (contieneSoloNumeros(text)) {
        setErrors({ ...errors, cost: null });
      }
    }
    else if(entity === "amount"){
      let text = value.target.value;
      if (contieneSoloNumeros(text)) {
        setErrors({ ...errors, amount: null });
      }
    }
    else if(entity === "brand"){
      setFilterBrandValue('');
      setSelectBrandActive(false);
      setErrors({brand_id:null, model:errors.model})
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
      setErrors({name:null, email:errors.email, phone_number:errors.phone_number, rol_id:errors.rol_id, dni: errors.dni})
    }
    else if(entity === "dni"){
      setErrors({name:errors.name, email:errors.email, phone_number:errors.phone_number, rol_id:errors.rol_id, dni:null})
    }
    else if(entity === "email"){
      setErrors({name:errors.name, email:"El email requiere este formato : xxxx@xx.xx", phone_number:errors.phone_number, dni: errors.dni})
      if(value.includes("@" && ".")){
        setErrors({name:errors.name, email:null, phone_number:errors.phone_number, rol_id:errors.rol_id})
      }
    }
    else if(entity === "phone_number"){
      setErrors({name:errors.name, email:errors.email, phone_number:null, rol_id:errors.rol_id, dni: errors.dni})
    }
  };

  const changeErrorApi = (entity,value) =>{

    if(entity === "title"){
      setErrorsApi({title:null})
    }
    else if(entity === "name"){
      setErrorsApi({name:null, email:errorsApi.email, phone_number:errorsApi.phone_number, dni:errorsApi.dni})
    }
    else if(entity === "dni"){
      setErrorsApi({name:errorsApi.dni, email:errorsApi.email, phone_number:errorsApi.phone_number, dni:null})
    }
    else if(entity === "email"){
      setErrorsApi({name:errorsApi.name, email:"El email requiere este formato : xxxx@xx.xx", phone_number:errorsApi.phone_number})
      if(value.includes("@" && ".")){
        setErrorsApi({name:errorsApi.name, email:null, phone_number:errorsApi.phone_number, dni:errorsApi.dni})
      }
    }
    else if(entity === "phone_number"){
      setErrorsApi({name:errorsApi.name, email:errorsApi.email, phone_number:null, dni:errorsApi.dni})
    }
    else if(entity === "model"){
      setErrorsApi({model:null, brand_id:errorsApi.brand_id})
    }
    else if(entity === "brand_id"){
      setFilterBrandValue('');
      setSelectBrandActive(false);
      setErrorsApi({model:errorsApi.model, brand_id:null})
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
    }
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
    if(dataCustomersEdit.length >= 1){
      return dataCustomersEdit.filter((customer) =>
      customer.name.toLowerCase().includes(filterCustomerValue.toLowerCase())
    );
    }else{
      return []
    }
  }

  const filteredCellphones = () =>{
    if(dataCellphonesEdit.data){
      if(dataCellphonesEdit.data.length >= 1){
        return dataCellphonesEdit.data.filter((cellphone) =>
        cellphone.model.toLowerCase().includes(filterCellphoneValue.toLowerCase())
        );
      } else{
        return []
      }
    }else{
      return []
    }
  }

  const filteredServices = () =>{
    if(dataServicesEdit.length >= 1){
      return dataServicesEdit.filter((service) =>
      service.description.toLowerCase().includes(filterServiceValue.toLowerCase())
    );
    }else{
      return []
    }
  }

  const filteredBrands = () =>{
    if(dataBrandsEdit.length >= 1){
      return dataBrandsEdit.filter((brand) =>
      brand.title.toLowerCase().includes(filterBrandValue.toLowerCase())
    );
    }else{
      return []
    }
  }

  const table = enviroment.selfUrl.dataTable;
  const entities = enviroment.selfUrl.localEntities;
  


  if(location.includes(`${table}${entities.brands}`)){

    return(
      <ModalEditBrand
       openModalEdit={openModalEdit}
       onsubmit={onsubmit}
       edit={edit}
       errors={errors}
       changeError={changeError}
       itemToEdit={itemToEdit}
       closeForm={closeForm}/>
    )

  }else if(location.includes(`${table}${entities.cellphones}`)){

    return(

      <>
        <ModalEditCellphone
         openModalEdit={openModalEdit}
         onsubmit={onsubmit}
         edit={edit}
         errors={errors}
         changeError={changeError}
         changeModal={changeModal}
         itemToEdit={itemToEdit}
         closeForm={closeForm}
         newBrandSelectedEdit={newBrandSelectedEdit}
         activeInputSearch={activeInputSearch}
         selectBrandActive={selectBrandActive}
         handleInputChange={handleInputChange}
         filteredBrands={filteredBrands}/>

        <ModalEditBrandIn
         openModalAddBrandEdit={openModalAddBrandEdit}
         onSubmitBrand={onSubmitBrand}
         errorsApi={errorsApi}
         changeErrorApi={changeErrorApi}
         closeFormAdd={closeFormAdd}/>
      </>
    )
  }else if(location.includes(`${table}${entities.services}`)){

    return(
      <ModalEditService
        openModalEdit={openModalEdit}
        onsubmit={onsubmit}
        edit={edit}
        errors={errors}
        changeError={changeError}
        itemToEdit={itemToEdit}
        closeForm={closeForm}/>
    );

  }else if(location.includes(`${table}${entities.customers}`)){

    return(
      <ModalEditCustomer
      openModalEdit={openModalEdit}
      onsubmit={onsubmit}
      edit={edit}
      errors={errors}
      changeError={changeError}
      itemToEdit={itemToEdit}
      closeForm={closeForm}/>
    );

  }else if(location.includes(`${entities.reparations}`)){
    
      return(
         <>
            <ModalEditReparation 
              openModalEdit={openModalEdit}
              onsubmit={onsubmit}
              itemToEdit={itemToEdit}
              changeError={changeError}
              changeModal={changeModal}
              errors={errors}
              edit={edit}
              closeForm={closeForm}
              handleInputChange={handleInputChange}
              selectCellphoneActive={selectCellphoneActive}
              selectCustomerActive={selectCustomerActive}
              selectServiceActive={selectServiceActive}
              newCellphoneSelectedEdit={newCellphoneSelectedEdit}
              newCustomerSelectedEdit={newCustomerSelectedEdit}
              newServiceSelectedEdit={newServiceSelectedEdit}
              filteredCellphones={filteredCellphones}
              filteredCustomers={filteredCustomers}
              filteredServices={filteredServices}
              activeInputSearch={activeInputSearch}
              dataStatesEdit={dataStatesEdit}
              dataServiceStatusEdit={dataServiceStatusEdit}
              addEmail={addEmail}
              />

            <ModalEditCustomerIn
              openModalAddCustomerEdit={openModalAddCustomerEdit}
              addCustomerInReparationEdit={addCustomerInReparationEdit}
              errorsApi={errorsApi}
              changeErrorApi={changeErrorApi}
              closeFormAdd={closeFormAdd}/>

            <ModalEditCellphoneIn
             openModalAddCellphoneEdit={openModalAddCellphoneEdit}
             addCellphoneInReparationEdit={addCellphoneInReparationEdit}
             errorsApi={errorsApi}
             changeErrorApi={changeErrorApi}
             changeModal={changeModal}
             closeFormAdd={closeFormAdd}
             newBrandSelectedEdit={newBrandSelectedEdit}
             activeInputSearch={activeInputSearch}
             selectBrandActive={selectBrandActive}
             handleInputChange={handleInputChange}
             filteredBrands={filteredBrands}
             dataCellphonesEdit={dataCellphonesEdit}/>

            <ModalEditBrandIn
            openModalAddBrandEdit={openModalAddBrandEdit}
            onSubmitBrand={onSubmitBrand}
            errorsApi={errorsApi}
            changeErrorApi={changeErrorApi}
            closeFormAdd={closeFormAdd}/>

            <ModalEditServiceIn
            openModalAddServiceEdit={openModalAddServiceEdit}
            addServiceInReparationEdit={addServiceInReparationEdit}
            errorsApi={errorsApi}
            changeErrorApi={changeErrorApi}
            closeFormAdd={closeFormAdd}
            dataServicesEdit={dataServicesEdit}/>
          
         </>
      );
    }else if(window.location.href.includes("usuario")){

      return(
        <>
          <ModalEditUser
            openModalEdit={openModalEdit}
            onsubmit={onsubmit}
            edit={edit}
            errors={errors}
            changeError={changeError}
            itemToEdit={itemToEdit}
            closeForm={closeForm}
            enviroment={enviroment}
            dataRolesEdit={dataRolesEdit}/>
        </>
      )
    }
};


export default ModalEdit;