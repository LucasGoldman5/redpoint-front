import React, {useState,useEffect} from "react";
import ModalEditBrand from "./modales-edit/modalEditBrand";
import ModalEditCellphone from "./modales-edit/modalEditCellphone";
import ModalEditBrandIn from "./modales-edit/modalEditBrandIn";
import ModalEditService from "./modales-edit/modalEditService";
import ModalEditCustomer from "./modales-edit/modalEditCustomer";
import ModalEditReparation from "./modales-edit/modalEditReparation";
import ModalAddCustomerIn from "./modales-add/modalAddCustomerIn";
import ModalEditUser from "./modales-edit/modalEditUser";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import {  useForm } from "react-hook-form";
import HelperBuildRequest from "../helpers/buildRequest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import './modales.css'


const ModalEdit = ({ getOpenModalEdit, itemToEdit, edit, closeForm,onsubmit,errorsInTable,enviroment,dataBrandsApp,dataCellphonesApp,dataCustomersApp,dataServicesApp,dataStatusApp,dataRolesApp}) => {

  const location = window.location.href;
  const [dataStatesEdit, setDataStatesEdit] = useState([]);
  const [dataBrandsEdit, setDataBrandsEdit] = useState([]);
  const [dataCustomersEdit, setDataCustomersEdit] = useState([]);
  const [dataCellphonesEdit, setDataCellPhonesEdit] = useState([]);
  const [dataServicesEdit, setDataServicesEdit] = useState([]);
  const [dataRolesEdit, setDataRolesEdit] = useState([]);
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
  const [newItemToEdit, setNewItemToEdit] = useState({});
  const [checkbox, setCheckBox] = useState(false);
 

  useEffect(() =>{
    setOpenModalEdit(getOpenModalEdit);
  },[getOpenModalEdit]);

  useEffect(() =>{
    setNewItemToEdit(itemToEdit);
  },[itemToEdit])

  useEffect(()=>{
    setDataBrandsEdit(dataBrandsApp);
    setDataCellPhonesEdit(dataCellphonesApp);
    setDataCustomersEdit(dataCustomersApp);
    setDataServicesEdit(dataServicesApp);
    setDataStatesEdit(dataStatusApp);
    setDataRolesEdit(dataRolesApp);
  },[dataBrandsApp,dataRolesApp,dataStatusApp])

  useEffect(() =>{
    setErrors(errorsInTable);
  },[errorsInTable]);

  const changeModal = (fact) =>{

    if(fact === "brand"){
      setOpenModalAddBrandEdit(true);
      setOpenModalEdit(false);
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

  const closeFormAdd = (entity,data) =>{


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
      setErrors({customer_id:errors.customer_id, cellphone_id:null, service_id:errors.service_id})
    }
    else if(entity === "service"){
      setFilterServiceValue('');
      setSelectServiceActive(false);
      setErrors({customer_id:errors.customer_id, cellphone_id:errors.cellphone_id, service_id:null})
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
      setErrors({name:null, email:errors.email, phone_number:errors.phone_number})
    }
    else if(entity === "email"){
      setErrors({name:errors.name, email:"El email requiere este formato : xxxx@xx.xx", phone_number:errors.phone_number})
      if(value.includes("@" && ".")){
        setErrors({name:errors.name, email:null, phone_number:errors.phone_number})
      }
    }
    else if(entity === "phone_number"){
      setErrors({name:errors.name, email:errors.email, phone_number:null})
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
      setErrorsApi({model:errorsApi.model, brand_id:null})
    }
    else if(entity === "description"){
      setErrorsApi({description:null})
    }
  };

  const activeInputSearch = (data,entity) =>{

    console.log(data);
    
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

  const filteredCustomers = dataCustomersEdit.filter((customer) =>
    customer.name.toLowerCase().includes(filterCustomerValue.toLowerCase())
  );

  const filteredCellphones = dataCellphonesEdit.filter((cellphone) =>
    cellphone.model.toLowerCase().includes(filterCellphoneValue.toLowerCase())
  );

  const filteredServices = dataServicesEdit.filter((service) =>
    service.description.toLowerCase().includes(filterServiceValue.toLowerCase())
  );

  const filteredBrands = dataBrandsEdit.filter((brand) =>
    brand.title.toLowerCase().includes(filterBrandValue.toLowerCase())
  );

  const table = enviroment.selfUrl.dataTable;
  const entities = enviroment.selfUrl.localEntities;
  

  const { register, handleSubmit, getValues, setValue} = useForm ();

  if(location === `${enviroment.selfUrl.main}${table}${entities.brands}` ){

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

  }else if(location === `${enviroment.selfUrl.main}${table}${entities.cellphones}`){

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
  }else if(location === `${enviroment.selfUrl.main}${table}${entities.services}`){

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

  }else if(location === `${enviroment.selfUrl.main}${table}${entities.customers}`){

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

  }else if(location === `${enviroment.selfUrl.main}${table}${entities.reparations}`){
    
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
              addEmail={addEmail}
              />

            <ModalAddCustomerIn
              openModalAddCustomerEdit={openModalAddCustomerEdit}
              addCustomerInReparation={addCustomerInReparationEdit}
              errorsApi={errorsApi}
              changeErrorApi={changeErrorApi}
              closeFormAdd={closeFormAdd}/>

          <Modal isOpen={openModalAddCellphoneEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear celular</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addCellphoneInReparationEdit)}>
                <label htmlFor="id">Numero de Celular</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataCellphonesEdit.length+1}`}  />
                <br/>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("email")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("customer_id")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="modelo">Modelo</label>
                <input className={errorsApi.model ? "form-control error" : "form-control"} type="text" name="modelo" {...register('model',{
                  value:null,
                  onChange: () => changeErrorApi("model"),
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
                <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
                <select className={errorsApi.brand_id ? "form-select error" : "form-select"} name="select" defaultValue={newBrandSelectedEdit.title ? newBrandSelectedEdit.id : null}{...register('brand_id',{
                   shouldUnregister: true,
                   onChange: () => changeErrorApi("brand_id"),
                   })}>
                        {
                          (newBrandSelectedEdit.id)
                          ?
                           <option value={newBrandSelectedEdit.id}>{newBrandSelectedEdit.title}</option>
                          :
                          <option >Seleccionar..</option>
                        }
                  {filteredBrands.map((brand)=>{
                      return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <br/>  
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCellphoneInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("cellphone",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddBrandEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
              <h5  className="h5-modal-add" >Crear Marca</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(onSubmitBrand)}>
                <br />
                <label htmlFor="marca">Marca</label>
                <input className={errorsApi.title ? "form-control error" : "form-control"} type="text" name="marca"  {...register('title',{
                  shouldUnregister:true,
                  onChange: () => changeErrorApi("title"),
                })} />
                  {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("email")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("brand_id")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="url">Descripcion</label>
                <input className="form-control" type="text" name="url" {...register('description',{
                  value:null
                  })} />
                <br />
                <label >Url</label>
                <input className="form-control" type="text" {...register('url',{
                  value:null
                  })} />
                <br/>
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>onSubmitBrand(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("brand",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddServiceEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Servicio</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addServiceInReparationEdit)}>
                <label htmlFor="id">Numero de Servicio</label>
                <input className="form-control" type="number" name="id" id="id" readOnly value={dataServicesEdit.length + 1} ></input>
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("customer_id")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("cellphone_id")}></input>
                <label htmlFor="marca">Descripcion</label>
                <input className={errorsApi.description ? "form-control error" : "form-control"} type="text" name="marca"  {...register('description',{
                  value:null,
                  onChange: () => changeErrorApi("description"),
                  })} />
                  {errorsApi.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className={errorsApi.phone_number ? "form-control error" : "form-control"} type="text" name="numero de telefono" {...register('phone_number',{
                  value:null,
                  onChange: () => changeErrorApi("phone_number"),
                  })} />
                  {errorsApi.phone_number? <p className="p-errores">El campo Numero de telefono debe ser completado</p> : ""} 
                <br />
                <label htmlFor="url">Direccion</label>
                <input className="form-control" type="text" name="direccion" {...register('address',{
                  value:null
                  })} />
                <br />
                <label htmlFor="url">Email</label>
                <input className={errorsApi.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
                  value:null,
                  onChange: (e) => changeErrorApi("email",e.target.value),
                  })} />
                  {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""} 
                <br />
                <hr />
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addServiceInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("service",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
         </>
      );
    }else if(window.location.href.includes("reporte")){
      return(
        <>
          <Modal isOpen={openModalEdit} className="modal-reparations">
          <ModalHeader style={{display: 'block'}}>
            <div>
              <h5  style={{float: 'center', color: 'gold'}} >Editar Reparacion</h5> 
            </div>
          </ModalHeader>
          <ModalBody className="contenedor-modal-body">
            <form className="form-group reparations" onSubmit={handleSubmit(onsubmit)}>
              <div className="div-inputs">
                <label htmlFor="number of reparation">Numero de Reparacion</label>
                <input className="form-control" type="text" name="name" id="name" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
              </div>
              <br />
              <div className="div-inputs">
              <label>Cliente</label>              
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"customer")} placeholder="buscar.." className={selectCustomerActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=> activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                  <select  className={errors.customer_id ? "form-select error" : "form-select"}  name="select"  defaultValue={itemToEdit && newCustomerSelectedEdit.length < 1 && itemToEdit.customer.id ? itemToEdit.customer.id : newCustomerSelectedEdit.length > 0 ? newCustomerSelectedEdit.id : null}{...register('customer_id',{
                         shouldUnregister: true,
                         onChange: (e) => addEmail(e.target.value,"customer"),
                         })}>
                        {
                          (newCustomerSelectedEdit.id)
                          ?
                           <option value={newCustomerSelectedEdit.id}>{newCustomerSelectedEdit.name}</option>
                          :
                          <option >Seleccionar..</option>
                        }
                        {filteredCustomers.map((customer)=>{   
                          const customerSelected = itemToEdit && itemToEdit.customer.id == customer.id ?  'selected' : '';   
                            return <option className={itemToEdit && itemToEdit.customer.id == customer.id ? "option-selected" :"option-modal"} 
                                           key={customer.id} 
                                           value={customer.id} 
                                           >{customer.name}</option>   
                        })}
                   </select>
                  <h1 className="h1-add" onClick={()=>changeModal("customer")}>+</h1>
              </div>
                {errors.customer_id? <p className="p-errores">Debe seleccionar un cliente</p>: ""}
              </div>
              <br/>
              <div className="div-inputs">
                <label htmlFor="descripcion">Numero de contacto</label>
                <input className="form-control" type="text" name="number" id="number"  defaultValue={itemToEdit ? itemToEdit.number : ''} {...register('number',{ shouldUnregister: true,})} />
              </div>
              <br />
              <div className="div-inputs">
                <label htmlFor="descripcion">Email</label>
                <input className={errors.email ? "form-control error" : "form-control"} type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.email : ''} {...register('email',{ shouldUnregister: true,})} />
                  {errors.email? <><p className="p-errores">El campo Email no cumple con el formato</p><p className="p-errores">Ejemplo:xxxxx@xxx.com</p></>: ""}
              </div>
              <br />
              <div className="div-inputs">
              <label htmlFor="cellphone">Celular</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"cellphone")} placeholder="buscar.." className={selectCellphoneActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=> activeInputSearch(getValues(),"cellphone")} className="icon-search" icon={faMagnifyingGlass} />
                  <select  className={errors.cellphone_id ? "form-select error" : "form-select"} type="text" name="email" id="email"  defaultValue={itemToEdit && newCellphoneSelectedEdit.length < 1 ? itemToEdit.cellphone.id : newCellphoneSelectedEdit.length > 0 ? newCellphoneSelectedEdit.id : null}{...register('cellphone_id',{
                         shouldUnregister: true,
                         onChange: () => changeError("cellphone"),
                         })}>
                        {
                          (newCellphoneSelectedEdit.id)
                          ?
                           <option value={newCellphoneSelectedEdit.id}>{newCellphoneSelectedEdit.model}</option>
                          :
                          <option >Seleccionar..</option>
                        }
                        {filteredCellphones.map((cellphone)=>{
                          const cellphoneSelected = itemToEdit && itemToEdit.cellphone.id == cellphone.id ?  'selected' : "";                
                            return <option className={itemToEdit && itemToEdit.cellphone.id == cellphone.id ? "option-selected" :"option-modal"} 
                            key={cellphone.id} 
                            value={cellphone.id} 
                            >{cellphone.model}</option>   
                        })}
                  </select>
                  <h1 className="h1-add" onClick={()=>changeModal("cellphone")}>+</h1>
              </div>
                  {errors.cellphone_id? <p className="p-errores">Debe seleccionar un celular</p> : ""}
              </div>
              <br />
              <div className="div-inputs">
                <label htmlFor="failure">Falla</label>
                <textarea className="form-control" type="text" name="fail" id="fail"  defaultValue={itemToEdit ? itemToEdit.failure : ''}{...register('failure',{ shouldUnregister: true,})} />
              </div>
              <br />
              <div className="div-inputs">
                <label htmlFor="Observation">Observacion</label>
                <textarea className="form-control" type="text" name="observation" id="observation"  defaultValue={itemToEdit ? itemToEdit.observation : ''}{...register('observation',{ shouldUnregister: true,})} />
              </div>
              <br />
              <div className="div-inputs">
              <label>Estado de la reparacion</label>
                <select  className="form-select" defaultValue={itemToEdit ? itemToEdit.state_id.id : null}{...register("state_id",{
                  required:true,
                  shouldUnregister:true
                })}>
                  <option className="option-selected" value={itemToEdit ? itemToEdit.state_id.id : null}>{itemToEdit ? itemToEdit.state_id.description : null}</option>
                  {dataStatesEdit.map((state) => {
                    return <option value={state.id} key={state.id}>{state.description}</option>
                  })}
                </select>
              </div>
              <br/>
              <div className="div-inputs">
              <label htmlFor="service">Servicio</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"service")} placeholder="buscar.." className={selectServiceActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={() => activeInputSearch(getValues(),"service")} className="icon-search" icon={faMagnifyingGlass} />
                  <select  className={errors.service_id ? "form-select error" : "form-select"} type="text" name="service" id="service"  defaultValue={itemToEdit && newServiceSelectedEdit.length < 1 ? itemToEdit.service.id : newServiceSelectedEdit.length > 0 ? newServiceSelectedEdit.id : null}{...register('service_id',{
                         shouldUnregister: true,
                         onChange: () => changeError("service"),
                         })}>
                        {
                          (newServiceSelectedEdit.id)
                          ?
                           <option value={newServiceSelectedEdit.id}>{newServiceSelectedEdit.description}</option>
                          :
                          <option >Seleccionar..</option>
                        }
                        {filteredServices.map((service)=>{                 
                            return <option className={itemToEdit && itemToEdit.service.id == service.id ? "option-selected" :"option-modal"}
                             key={service.id}
                             value={service.id}>{service.description}</option>   
                        })}
                  </select>
                  <h1 className="h1-add" onClick={()=>changeModal("service")}>+</h1>
              </div>
                  {errors.service_id? <p className="p-errores">Debe seleccionar un Servicio</p> : ""}
              </div>
              <br />
              <div className="div-inputs">
                <label htmlFor="cost">Valor de la reparacion</label>
                <input className="form-control" type="text" name="cost" id="cost"  defaultValue={itemToEdit ? itemToEdit.cost : ''}{...register('cost',{ shouldUnregister: true,})} />
              </div>
              <br />
              <div className="div-inputs">
                <label htmlFor="amount">Precio a cobrar</label>
                <input className="form-control" type="text" name="amount" id="amount"  defaultValue={itemToEdit ? itemToEdit.amount : ''}{...register('amount',{ shouldUnregister: true,})} />
              </div>
              <br />
              <div className="div-inputs">
                <label htmlFor="notice_date">Fecha de notificacion al cliente</label>
                <input className="form-control" type="date" name="phone_2" defaultValue={itemToEdit && itemToEdit.notice_date  ? new Date(itemToEdit.notice_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.notice_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.notice_date).getUTCDate()).slice(-2)  : null}{...register('notice_date',{
                  shouldUnregister: true,
                  setValueAs : value =>{
                    if(value != 0){
                      let dateInput = new Date(value)
                      dateInput = dateInput.getUTCFullYear() + '-' +
                      ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                      ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                      ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCSeconds()).slice(-2);

                      return dateInput
                    }else{
                      return null
                    } 
                  } 
                })} />
              </div>
              <br/>
              <div className="div-inputs">
                <label htmlFor="amount">Cantidad de notificacionesr</label>
                <input className="form-control" type="number" name="amount" id="amount"  defaultValue={itemToEdit ? itemToEdit.notice_quantity : ''}{...register('notice_quantity',{ shouldUnregister: true,})} />
              </div>
              <br />
              <div className="div-inputs">
                <label htmlFor="delivery_date">Fecha de entrega</label>
                <input className="form-control" type="date" name="delivery_date" defaultValue={itemToEdit && itemToEdit.delivery_date !=null ? new Date(itemToEdit.delivery_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.delivery_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.delivery_date).getUTCDate()).slice(-2)  : null}{...register('delivery_date',{
                  shouldUnregister: true,
                  setValueAs : value =>{
                    if(value != 0){
                      let dateInput = new Date(value)
                      dateInput = dateInput.getUTCFullYear() + '-' +
                      ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                      ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                      ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCSeconds()).slice(-2);

                      return dateInput
                    }else{
                      return null
                    } 
                  } 
                })} />
              </div>
              <br/>
              <div className="div-inputs">
                <label htmlFor="service_start_date">Fecha de Inicio del Servicio</label>
                <input className="form-control" type="date" name="service_start_date" defaultValue={itemToEdit && itemToEdit.service_start_date != null ? new Date(itemToEdit.service_start_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.service_start_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.service_start_date).getUTCDate()).slice(-2)  : null}{...register('service_start_date',{
                  shouldUnregister: true,
                  setValueAs : value =>{
                    if(value != 0){
                      let dateInput = new Date(value)
                      dateInput = dateInput.getUTCFullYear() + '-' +
                      ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                      ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                      ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCSeconds()).slice(-2);

                      return dateInput
                    }else{
                      return null
                    } 
                  } 
                })} />
              </div>
              <br/>
              <div className="div-inputs">
                <label htmlFor="service_end_date">Fecha de Servicio terminado</label>
                <input className="form-control" type="date" name="service_end_date" defaultValue={(itemToEdit && itemToEdit.service_end_date != null)  ? new Date(itemToEdit.service_end_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.service_end_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.service_end_date).getUTCDate()).slice(-2)  : null} {...register('service_end_date',{
                  shouldUnregister: true,
                  setValueAs : value =>{
                    if(value != 0){
                      let dateInput = new Date(value)
                      dateInput = dateInput.getUTCFullYear() + '-' +
                      ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                      ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                      ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                      ('00' + dateInput.getUTCSeconds()).slice(-2);

                      return dateInput
                    }else{
                      return null
                    } 
                  } 
                })} />
              </div>
              <br/>
              <div className="div-inputs">
                <label htmlFor="imei">Imei</label>
                <input className="form-control" type="text" name="imei" id="imei"  defaultValue={itemToEdit ? itemToEdit.imei : ''}{...register('imei',{ shouldUnregister: true,})} />
              </div>      
              <br/>
              <div className="div-inputs">
                <label>Tiene Seguridad:</label>
                {
                  (itemToEdit)
                  ?
                  (itemToEdit.has_security === 1)
                  ?
                  <>
                  <input className="form-control" type="text" name="imei" id="imei" readOnly  defaultValue={"Si"}{...register('has_security',{ shouldUnregister: true, setValueAs: v=> v = 1})}></input>
                  <br/>
                  <label>Pin:</label>
                  <input className="form-control" type="text" name="imei" id="imei" readOnly  defaultValue={itemToEdit.pin}{...register('pin',{ shouldUnregister: true,})}></input>
                  <br />
                  <label>Patron:</label>
                  <input className="form-control" type="text" name="imei" id="imei" readOnly  defaultValue={itemToEdit.pattern}{...register('pattern',{ shouldUnregister: true,})}></input>
                  </> 
                  :
                  <input className="form-control" type="text" name="imei" id="imei" readOnly  defaultValue={"No"}{...register('has_security',{ shouldUnregister: true, setValueAs: v=> v = 0})}></input>
                  :
                  ""
                }     
              </div>            
              <hr />
              <br/>                   
              <div className="contenedor-boton-modal-dentro-reparations">
                <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
                <h1 className="btn  btn-cancelar" onClick={closeForm}>Cancelar</h1> 
              </div>
            </form>
          </ModalBody> 
        </Modal>

        <Modal isOpen={openModalAddCustomerEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Cliente</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addCustomerInReparationEdit)} {...register('form')}>
                <label htmlFor="marca">Nombre</label>
                <input className={errorsApi.name ? "form-control error" : "form-control"} type="text" name="name"  {...register('name',{
                  value:null,
                  onChange: () => changeErrorApi("name"),
                  })} />
                  {errorsApi.name? <p className="p-errores">{errorsApi.name}</p> : ""} 
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="url">Email</label>
                <input className={errorsApi.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
                  value:null,
                  onChange: (e) => changeErrorApi("email",e.target.value),
                  })} />
                  {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""}
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className={errorsApi.phone_number ? "form-control error" : "form-control"} type="text" name="phone" {...register('phone_number',{
                  value:null,
                  onChange: () => changeErrorApi("phone_number"),
                  })} />
                  {errorsApi.phone_number? <p className="p-errores">{errorsApi.phone_number}</p> : ""}
                <br />
                <label htmlFor="url">Numero de telefono 2</label>
                <input className="form-control" type="text" name="phone_2" {...register('phhone_number_2',{
                  value:null
                  })} />
                <br />
                <hr />
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCustomerInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("customer",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddCellphoneEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear celular</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addCellphoneInReparationEdit)}>
                <label htmlFor="id">Numero de Celular</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataCellphonesEdit.length+1}`}  />
                <br/>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("email")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("customer_id")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="modelo">Modelo</label>
                <input className={errorsApi.model ? "form-control error" : "form-control"} type="text" name="modelo" {...register('model',{
                  value:null,
                  onChange: () => changeErrorApi("model"),
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
                <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=> activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errorsApi.brand_id ? "form-select error" : "form-select"} name="select" defaultValue={itemToEdit && newBrandSelectedEdit.length < 1 ? itemToEdit.cellphone.brand_id : newBrandSelectedEdit.length > 0 ? newBrandSelectedEdit.id : null}{...register('brand_id',{
                   shouldUnregister: true,
                   onChange: () => changeErrorApi("brand_id"),
                   })}>
                        {
                          (newBrandSelectedEdit.id)
                          ?
                           <option value={newBrandSelectedEdit.id}>{newBrandSelectedEdit.title}</option>
                          :
                          <option >Seleccionar..</option>
                        }
                  {filteredBrands.map((brand)=>{
                      return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <br/>  
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCellphoneInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("cellphone",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddBrandEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
              <h5  className="h5-modal-add" >Crear Marca</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(onSubmitBrand)}>
                <br />
                <label htmlFor="marca">Marca</label>
                <input className={errorsApi.title ? "form-control error" : "form-control"} type="text" name="marca"  {...register('title',{
                  shouldUnregister:true,
                  onChange: () => changeErrorApi("title"),
                })} />
                  {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("email")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("brand_id")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="url">Descripcion</label>
                <input className="form-control" type="text" name="url" {...register('description',{
                  value:null
                  })} />
                <br />
                <label >Url</label>
                <input className="form-control" type="text" {...register('url',{
                  value:null
                  })} />
                <br/>
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>onSubmitBrand(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("brand",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddServiceEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Servicio</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addServiceInReparationEdit)}>
                <label htmlFor="id">Numero de Servicio</label>
                <input className={errorsApi.description ? "form-control error" : "form-control"} type="number" name="id" id="id" readOnly value={dataServicesEdit.length + 1} ></input>
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("customer_id")}></input>
                <label htmlFor="marca">Descripcion</label>
                <input className="form-control" type="text" name="marca"  {...register('description',{
                  value:null,
                  onChange: () => changeErrorApi("description"),
                  })} />
                  {errorsApi.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className={errorsApi.phone_number ? "form-control error" : "form-control"} type="text" name="numero de telefono" {...register('phone_number',{
                  value:null,
                  onChange: () => changeErrorApi("phone_number"),
                  })} />
                  {errorsApi.phone_number? <p className="p-errores">El campo Numero de telefono debe ser completado</p> : ""} 
                <br />
                <label htmlFor="url">Direccion</label>
                <input className="form-control" type="text" name="direccion" {...register('address',{
                  value:null
                  })} />
                <br />
                <label htmlFor="url">Email</label>
                <input className={errorsApi.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
                  value:null,
                  onChange: (e) => changeErrorApi("email",e.target.value),
                  })} />
                  {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""} 
                <br />
                <hr />
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addServiceInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("service",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
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