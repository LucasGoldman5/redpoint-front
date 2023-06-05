
import React, { useState,useEffect } from "react"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import './modales.css'
import HelperBuildRequest from "../helpers/buildRequest";
import getEnviroment from "../helpers/getEnviroment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const ModalAdd =({create,dataApi,errorsInTable,openModal,closeForm,enviroment,dataBrandsApp,dataCellphonesApp,dataCustomersApp,dataServicesApp,dataRolesApp}) =>{
  
  const [chainBrand, setChainBrand] = useState ("");
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
  },[dataRolesApp])

  const changeModal = (fact) =>{

    if(fact === "brand"){
      setOpenModalAddBrand(true);
      setValue("url","")
      setOpenModalAddCellphone(false);
    }else if(fact === "customer"){  
      setOpenModalAddCustomer(true)
      setOpenModalAdd(false);
    }else if(fact === "cellphone"){
      setOpenModalAddCellphone(true);
      setOpenModalAdd(false);
    }else if(fact === "service"){
      setValue("email","");
      setOpenModalAddService(true);
      setOpenModalAdd(false);
    }
  };


  const closeFormAdd = (entity,data) =>{
   
    const setEmail = () =>{
      const id = data.customer_id        
      if(newCustomerSelected.phone_number || newCustomerSelected.email){
        setValue("email", newCustomerSelected.email);
        setValue("number", newCustomerSelected.phone_number);
      }else{
        dataCustomers.map((customer) =>{
          if(customer.id == id){
             setValue("email", customer.email);
             setValue("number", customer.phone);
      }}); 
      }
    }

    if(entity === "brand"){
      if(window.location.href.includes("reparations")){
        setOpenModalAddBrand(false);
        setOpenModalAddCellphone(true);
        setEmail()
      }else{
        setOpenModalAddBrand(false);
        setOpenModalAddCellphone(true);
      } 
    }else if(entity === "customer"){
      setOpenModalAddCustomer(false);
      setOpenModalAdd(true);
    }else if(entity === "cellphone"){
      console.log(data);
      setOpenModalAddCellphone(false);
      setOpenModalAdd(true);
       setEmail()
    }else if(entity === "service"){
      setOpenModalAddService(false);
      setOpenModalAdd(true);
      setEmail()
    };
  };

  const checkBoxTrue = () =>{
     setCheckBox(!checkbox);
  };
  

  const onSubmitBrand = async (data) =>{
  
    const id = data.customer_id  
  
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
                if(newCustomerSelected.length < 1){
                  dataCustomers.map((customer) =>{
                    if(customer.id == id){
                       setValue("email", customer.email);
                       setValue("number", customer.phone);
                    }
                  })
                }else{
                  setValue("email", newCustomerSelected.email)
                }
                setValue("description","")
                setValue("brand_id",newBrandSelected.id);
                setValue("url","") 

                if(dataBrands.length > 0){
                  setDataBrands(dataBrands.concat(response.data))
                  setOpenModalAddBrand(false);
                  setOpenModalAddCellphone(true);
                  setErrorsApi({model:errorsApi.model, brand_id:null})
                }else{
                  setDataBrands(response.data)
                  setOpenModalAddCellphone(true);
                  setOpenModalAddBrand(false);
                  setErrorsApi({model:errorsApi.model, brand_id:null})
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
                setValue("customer_id",newCustomerSelected.id);
                setValue("number", data.phone_number)

                  if(dataCustomers.length > 0){
                    setDataCustomers(dataCustomers.concat(response.data))
                    setOpenModalAddCustomer(false);
                    setOpenModalAdd(true);
                    setErrors(
                      {
                        customer_id:null,
                        cellphone_id:errors.cellphone_id,
                        service_id:errors.service_id
                      }
                    )              
                  }else{
                    setDataCustomers(response.data)
                    setOpenModalAddCustomer(false);
                    setOpenModalAdd(true);
                    setErrors(
                      {
                        customer_id:null,
                        cellphone_id:errors.cellphone_id,
                        service_id:errors.service_id
                      }
                    )                  
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
                if(newCustomerSelected.length < 1){
                  dataCustomers.map((customer) =>{
                    if(customer.id == id){
                       setValue("email", customer.email);
                       setValue("number", customer.phone);
                    }
                  })
                }else{
                  setValue("email", newCustomerSelected.email);
                  setValue("number", newCustomerSelected.phone_number);
                }    
                setValue("service_id",newServiceSelected.id);       

                if(dataServices.length > 0){
                  setDataServices(dataServices.concat(response.data))
                  setOpenModalAddService(false);
                  setOpenModalAdd(true);
                  setErrors(
                    {
                      customer_id:errors.customer_id,
                      cellphone_id:errors.cellphone_id,
                      service_id:null
                    }
                  ) 
                }else{
                  setDataServices(response.data)
                  setOpenModalAddService(false);
                  setOpenModalAdd(true);
                  setErrors(
                    {
                      customer_id:errors.customer_id,
                      cellphone_id:errors.cellphone_id,
                      service_id:null
                    }
                  ) 
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
                if(newCustomerSelected.length < 1){
                  dataCustomers.map((customer) =>{
                    if(customer.id == id){
                       setValue("email", customer.email);
                       setValue("number", customer.phone);
                    }
                  })
                }else{
                  setValue("email", newCustomerSelected.email)
                  setValue("number", newCustomerSelected.phone_number);
                }  
                setValue("url","")
                setValue("cellphone_id",newCellphoneSelected.id);
                setValue("brand_id",newBrandSelected.id);

                if(dataCellPhones.length > 0){
                  setDataCellPhones(dataCellPhones.concat(response.data))
                  setOpenModalAddCellphone(false);
                  setOpenModalAdd(true);
                  setErrors(
                    {
                      customer_id:errors.customer_id,
                      cellphone_id:null,
                      service_id:errors.service_id
                    }
                  )                
                }else{
                  setDataCellPhones(response.data)
                  setOpenModalAddCellphone(false);
                  setOpenModalAdd(true);
                  setErrors(
                    {
                      customer_id:errors.customer_id,
                      cellphone_id:null,
                      service_id:errors.service_id
                    }
                  )        
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

  const addEmail = (customerId,entity) =>{

    setFilterCustomerValue('');
    setSelectCustomerActive(false);

    dataCustomers.map((customer) =>{
      if(customer.id == customerId){
         setValue("email", customer.email);
         setValue("number", customer.phone);
      };
    });

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
 
  
  const filteredCustomers = dataCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(filterCustomerValue.toLowerCase())
  );

  const filteredCellphones = dataCellPhones.filter((cellphone) =>
    cellphone.model.toLowerCase().includes(filterCellphoneValue.toLowerCase())
  );

  const filteredServices = dataServices.filter((service) =>
    service.description.toLowerCase().includes(filterServiceValue.toLowerCase())
  );

  const filteredBrands = dataBrands.filter((brand) =>
    brand.title.toLowerCase().includes(filterBrandValue.toLowerCase())
  );

  
  const { register, handleSubmit, getValues, setValue} = useForm ();


  if(location === `${enviroment.selfUrl.main}Table/cellphones`){

    return(

       <>
          <Modal isOpen={openModalAdd}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  className="h5-modal-add" >Crear celular</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(create)}>
                <label htmlFor="id">Numero de Marca</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataApi.data.length+1}`}  />
                <br/>
                <label htmlFor="modelo">Modelo</label>
                <input className={errors.model ? "form-control error" : "form-control"} type="text" name="modelo" {...register('model',{
                  onChange: () => changeError("model"),
                  value:null
                  })}/>
                  {errors.model? <p className="p-errores">El campo Modelo debe ser completado</p> : ""}
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
                <select  className="form-select brand" name="select"  {...register('brand_id',{
                  onChange: () => changeError("brand"),
                  })}>
                    <option value={null}>Seleccionar..</option>
                  {filteredBrands.map((brand)=>{
                      if(brand.title.includes(chainBrand)){
                        return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                      }
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errors.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                  <br/>
                  <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddBrand}>
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
                  onChange: () => changeErrorApi("title")
                })} />
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
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>onSubmitBrand(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("brand")}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

        </>  
    );
  }else if(location === `${enviroment.selfUrl.main}Table/brands` ){

    return(

      <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
          <h5  className="h5-modal-add" >Crear Marca</h5> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label htmlFor="id">Cantidad de marcas actuales</label>
            <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length} ></input>
            <br />
            <label htmlFor="marca">Marca</label>
            <input className={errors.title ? "form-control error" : "form-control"} type="text" name="marca"  {...register('title',{
              onChange: () => changeError("title")
            })} />
              {errors.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
            <br />
            <label htmlFor="url">Descripcion</label>
            <input className="form-control" type="text" name="url" {...register('description',{
              value:null
              })} />
            <br/>
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url"  {...register('url',{
              value:null
              })} />
            <br/>
            <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
        </ModalBody>
      </Modal>

    )
  }else if(location === `${enviroment.selfUrl.main}Table/services`){

    return(
      <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
          <h5  className="h5-modal-add" >Crear Servicio</h5> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label htmlFor="id">Numero de Servicio</label>
            <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length + 1} ></input>
            <br />
            <label htmlFor="marca">Nombre del Servicio</label>
            <input className={errors.description ? "form-control error" : "form-control"} type="text" name="marca"  {...register('description',{
              value:null,
              onChange: () => changeError("description")
              })} />
              {errors.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
            <br />
            <label htmlFor="url">Numero de Telefono</label>
            <input className={errors.phone_number ? "form-control error" : "form-control"} type="text" name="numero de telefono" {...register('phone_number',{
              value:null
              })} />
              {errors.phone_number? <p className="p-errores">El campo Numero de telefono debe ser completado</p> : ""}
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
            <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
        </ModalBody>
      </Modal>
    );
  }else if(location === `${enviroment.selfUrl.main}Table/customers`){

    return(
      <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
          <h5  className="h5-modal-add" >Crear Cliente</h5> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label htmlFor="marca">Nombre</label>
            <input className={errors.name ? "form-control error" : "form-control"} type="text" name="name"  {...register('name',{
              onChange: () => changeError("name"),
              value:null
              })} />
              {errors.name? <p className="p-errores">{errors.name}</p> : ""} 
            <br />
            <label htmlFor="url">Email</label>
            <input className={errors.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
              onChange: (e) => changeError("email",e.target.value),
              value:null
              })} />
              {errors.email? <p className="p-errores">{errors.email}</p> : ""}
            <br />
            <label htmlFor="url">Numero de Telefono</label>
            <input className={errors.phone_number ? "form-control error" : "form-control"} type="text" name="phone" {...register('phone_number',{
              onChange: () => changeError("phone_number"),
              value:null
              })} />
              {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
            <br />
            <label htmlFor="url">Numero de telefono 2</label>
            <input className="form-control" type="text" name="phone_2" {...register('phhone_number_2',{
              value:null
              })} />
            <br />
            <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
        </ModalBody>
      </Modal>
    );
  }else if(location === `${enviroment.selfUrl.main}Table/reparations`){

    return(
        <>
          <Modal isOpen={openModalAdd} className="modal-reparations" >
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Reparacion</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group reparations" onSubmit={handleSubmit(create)}>
                <div className="div-inputs">
                  <label htmlFor="marca">Cliente</label>
                  <div className="div-container-select-button">
                    <input  type="search" onChange={(e)=>handleInputChange(e,"customer")} placeholder="buscar.." className={selectCustomerActive ? "input-search" : "input-search-none"}></input>
                    <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                    <select  className={errors.customer_id ? "form-select error" : "form-select"} name="select" defaultValue={newCustomerSelected.id ? newCustomerSelected.id : ""} {...register('customer_id',{
                      onChange: (e) => {
                        addEmail(e.target.value,"customer");
                      },
                          })}>
                          {
                            (newCustomerSelected.id)
                            ?
                             <option className="option-selected" value={newCustomerSelected.id}>{newCustomerSelected.name}</option>
                            :
                            <option className="option-selected">Seleccionar..</option>
                          }
                          {filteredCustomers.map((customer)=>{
                              return <option className="option-modal" key={customer.id} value={customer.id} >{customer.name}</option>                              
                          })}
                      </select>
                    <h1 className="h1-add" onClick={()=>changeModal("customer")}>+</h1>
                  </div> 
                  {errors.customer_id ? <p className="p-errores">Debe seleccionar un Cliente</p> : ""}
                </div>
                <br />
                <div className="div-inputs">
                  <label htmlFor="url">Numero de contacto</label>
                  <input className="form-control" type="text" name="contact-number" {...register('number',{
                    shouldUnregister:true,
                    value:null
                    })} />
                </div>
                <br />
                <div className="div-inputs">
                  <label htmlFor="url">Email</label>
                  <input className="form-control" type="text" defaultValue={""}{...register('email',{
                    shouldUnregister:true,
                    })} />
                </div>
                <br />
                <div className="div-inputs">
                  <label htmlFor="url">Celular</label>
                  <div className="div-container-select-button">
                  <input type="search" onChange={(e)=>handleInputChange(e,"cellphone")} placeholder="buscar.." className={selectCellphoneActive ? "input-search" : "input-search-none"}></input>
                  <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"cellphone")} className="icon-search" icon={faMagnifyingGlass} />
                    <select  className={errors.cellphone_id ? "form-select error" : "form-select"} name="select"  defaultValue={newCellphoneSelected.id ? newCellphoneSelected.id : ""} {...register('cellphone_id',{
                      onChange: () => changeError("cellphone"),
                        })}>
                          {
                          newCellphoneSelected.id
                          ?
                          <option className="option-selected" value={newCellphoneSelected.id}>{newCellphoneSelected.model}</option>
                          :
                          <option className="option-selected">Seleccionar..</option>
                          }
                        {filteredCellphones.map((cellphone)=>{
                            return <option className="option-modal" key={cellphone.id} value={cellphone.id} >{cellphone.model}</option>
                        })}
                    </select>
                    <h1 className="h1-add" onClick={()=>changeModal("cellphone")}>+</h1>
                  </div>
                  {errors.cellphone_id ? <p className="p-errores">Debe seleccionar un celular</p> : ""}
                </div>
                <br />
                <div className="div-inputs">
                  <label htmlFor="url">Falla</label>
                  <textarea className="form-control"  name="phone_2" {...register('failure',{
                    value:null
                    })} />
                </div>
                <br />
                <div className="div-inputs">
                  <label htmlFor="url">Observacion</label>
                  <textarea className="form-control" type="text" name="phone_2" {...register('observation',{
                    value:null
                    })} />
                </div>
                <br/>
                <div className="div-inputs">
                  <label htmlFor="url">Estado de la reparacion</label>
                  <select className="form-select" type="text" name="phone_2" {...register('state_id',{
                    value:1   
                    })}>
                    <option value={1}>Recibido</option>
                  </select>
                </div>
                <br/>
                <div className="div-inputs">
                  <label htmlFor="url">Servicio</label>
                  <div className="div-container-select-button">
                  <input type="search" onChange={(e)=>handleInputChange(e,"service")} placeholder="buscar.." className={selectServiceActive ? "input-search" : "input-search-none"}></input>
                  <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"service")} className="icon-search" icon={faMagnifyingGlass} />
                    <select  className={errors.service_id ? "form-select error" : "form-select"} name="select"  defaultValue={newServiceSelected.id ? newServiceSelected.id : ""} {...register('service_id',{
                      onChange: () => changeError("service"),
                        })}>
                          {
                          newServiceSelected.id
                          ?
                          <option className="option-selected" value={newServiceSelected.id}>{newServiceSelected.description}</option>
                          :
                          <option className="option-selected">Seleccionar..</option>
                          }
                        {filteredServices.map((service)=>{
                            return <option className="option-modal" key={service.id} value={service.id} >{service.description}</option>
                        })}
                    </select>
                    <h1 className="h1-add" onClick={()=>changeModal("service")}>+</h1>
                  </div>
                  {errors.service_id ? <p className="p-errores">Debe seleccionar un Servicio</p> : ""}
                </div>
                <br/>
                <div className="div-inputs">
                  <label htmlFor="url">Valor de la reparacion</label>
                  <input className="form-control" type="text" name="phone_2" {...register('cost',{
                    value:null
                    })} />
                </div>
                <br/>
                <div className="div-inputs">
                  <label htmlFor="url">Precio a cobrar<span>*</span> </label>
                  <input className="form-control" type="text" name="phone_2" {...register('amount',{
                    value:null
                    })} />
                </div>
                <br/>
                <div className="div-inputs">
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
                </div>
                <br/>
                <div className="div-inputs">
                  <label htmlFor="url">Cantidad de Notificaciones</label>
                  <input className="form-control" type="text" name="phone_2" {...register('notice_quantity',{
                    value:0
                    })} />
                </div>
                <br/>
                <div className="div-inputs">
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
                </div>
                <div className="div-inputs">
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
                </div>
                <br/>
                <div className="div-inputs">
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
                </div>
                <br/>
                <div className="div-inputs">
                  <label htmlFor="url">Imei</label>
                  <input className="form-control" type="text" name="phone_2" {...register('imei',{
                    value:null
                    })} />
                </div>
                <br/>
                <div className="div-inputs">
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
                </div>                                    
                <hr />
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>  

          <Modal isOpen={openModalAddCustomer}  >
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Cliente</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addCustomerInReparation)} {...register('form')}>
                <label htmlFor="marca">Nombre</label>
                <input className={errorsApi.name ? "form-control error" : "form-control"} type="text" name="name"  {...register('name',{
                  onChange: () => changeErrorApi("name"),
                  value:null
                  })} />
                  {errorsApi.name? <p className="p-errores">{errorsApi.name}</p> : ""} 
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="url">Email</label>
                <input className={errorsApi.email ? "form-control error" : "form-control"} type="text" id="email2"{...register('email',{
                  onChange: (e) => changeErrorApi("email",e.target.value),
                  shouldUnregister:true,
                  value:null
                  })} />
                  {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""}
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className={errorsApi.phone_number ? "form-control error" : "form-control"} type="text" name="phone" {...register('phone_number',{
                  onChange: () => changeErrorApi("phone_number"),
                  shouldUnregister:true,
                  value:null
                  })} />
                  {errorsApi.phone_number? <p className="p-errores">{errorsApi.phone_number}</p> : ""}
                <br />
                <label htmlFor="url">Numero de telefono 2</label>
                <input className="form-control" type="text" name="phone_2" {...register('phhone_number_2',{
                  shouldUnregister:true,
                  value:null
                  })} />
                <br />
                <hr />
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCustomerInReparation(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("customer")}>Cancelar</h1>
                </div>
              </form>
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
                <label htmlFor="id">Numero de Celular</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataCellPhones.length+1}`}  />
                <br/>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("email")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="modelo">Modelo</label>
                <input className={errorsApi.model ? "form-control error" : "form-control"} type="text" name="modelo" {...register('model',{
                  onChange: () => changeErrorApi("model"),
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
                <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errorsApi.brand_id ? "form-select error" : "form-select"} name="select" defaultValue={newBrandSelected.id ? newBrandSelected.id : ""}  {...register('brand_id',{
                  onChange: () => changeErrorApi("brand_id"),
                  shouldUnregister:true,
                  })}>
                    {
                      newBrandSelected.id
                      ?
                      <option className="option-selected" value={newBrandSelected.id} >{newBrandSelected.title}</option>
                      :
                      <option className="option-selected">Seleccionar..</option>    
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
                  <button type="button" className="btn btn-success" onClick={()=>addCellphoneInReparation(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("cellphone",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddService}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Servicio</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addServiceInReparation)}>
                <label htmlFor="id">Numero de Servicio</label>
                <input className="form-control" type="number" name="id" id="id" readOnly value={dataServices.length + 1} ></input>
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
                <label htmlFor="marca">Descripcion</label>
                <input className={errorsApi.description ? "form-control error" : "form-control"} type="text" name="marca"  {...register('description',{
                  onChange: () => changeErrorApi("description"),
                  value:null
                  })} />
                  {errorsApi.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className="form-control" type="text" name="numero de telefono" {...register('phone_number',{
                  shouldUnregister:true,
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
                  shouldUnregister:true,
                  value:null
                  })} />
                <br />
                <hr />
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addServiceInReparation(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("service",getValues())}>Cancelar</h1>
                </div>
              </form>
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
                <input className={errorsApi.title ? "form-control error" : "form-control"} type="text" name="marca"  {...register('title',{
                  onChange: () => changeErrorApi("title"),
                })} />
                  {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("email")}></input>
                <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
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
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>onSubmitBrand(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("brand",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </>
    );
  }else if(window.location.href.includes("users")){

    return(
      <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
          <h5  className="h5-modal-add" >Crear Usuario</h5> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label htmlFor="marca">Nombre</label>
            <input className={errors.name ? "form-control error" : "form-control"} type="text" name="name"  {...register('name',{
              onChange: () => changeError("name"),
              value:null
              })} />
              {errors.name? <p className="p-errores">{errors.name}</p> : ""} 
            <br />
            <label htmlFor="url">Email</label>
            <input className={errors.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
              onChange: (e) => changeError("email",e.target.value),
              value:null
              })} />
              {errors.email? <p className="p-errores">{errors.email}</p> : ""}
            <br />
            <label htmlFor="url">Activo</label>
            <input className="form-active"  type="checkbox" name="phone"  {...register('active',{
              })} />
            <br />
            <br/>
            <label htmlFor="rol">Rol</label>
            <select  className={errors.rol_id ? "form-select  error" : "form-select brand"} defaultValue={null}  name="select"  {...register('rol_id',{
                  onChange: () => changeError("rol_id"),
                  })}>
                  <option value={null} className="option-selected">Seleccionar..</option>
                  {dataRoles.map((rol)=>{
                    return <option className="option-modal" key={rol.id} value={rol.id} >{rol.description}</option>                     
                  })}
            </select>
            {errors.rol_id ? <p className="p-errores">El campo Rol debe ser seleccionado</p> : ""}
            <br />
            <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
        </ModalBody>
      </Modal>
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

