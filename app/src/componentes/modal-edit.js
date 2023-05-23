import React, {useState,useEffect} from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import getEnviroment from "../helpers/getEnviroment";
import HelperBuildRequest from "../helpers/buildRequest";
import './modales.css'


const ModalEdit = ({ openModalEdit, itemToEdit, edit, closeForm,onsubmit,errors }) => {

  const location = window.location.href;
  const [dataStatesEdit, setDataStatesEdit] = useState([]);
  const [dataBrandsEdit, setDataBrandsEdit] = useState([]);
  const [dataCustomersEdit, setDataCustomersEdit] = useState([]);
  const [dataCellphonesEdit, setDataCellPhonesEdit] = useState([]);
  const [dataServicesEdit, setDataServicesEdit] = useState([]);
  const [errorsApi, setErrorsApi] = useState([]);
  const [openModalAddBrandEdit, setOpenModalAddBrandEdit] = useState(false);
  const [openModalAddCustomerEdit, setOpenModalAddCustomerEdit] = useState(false);
  const [openModalAddCellphoneEdit, setOpenModalAddCellphoneEdit] = useState(false);
  const [openModalAddServiceEdit, setOpenModalAddServiceEdit] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const [apiURLLocal, setApiURLLocal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = await getEnviroment();
      setApiURLLocal(url.url);
    };

    fetchData();
  }, []);

  useEffect(() =>{
    getDataSelectEdit()
  },[]);

  const url = async () =>{
    const enviroment = await getEnviroment()
    return  enviroment.apiURL 
  }

  const getDataSelectEdit = async () =>{

    try{
                
      const config = await HelperBuildRequest("GET",null, "dataTable");
      const request = await fetch(`http://localhost:8000/api/select-box/brand`, config);
  
        if(request.status === 200){
          const response = await request.json();

            if(response.error){
              setTimeout(()=>{
                  console.log(response.error);
              },1000);
            }else{                      
              setDataBrandsEdit(response);
            };  
        };

    }catch(error){
        console.log(error);
     }
     
     try{
              
      const config = await HelperBuildRequest("GET",null, "dataTable");
      const request = await fetch(`http://localhost:8000/api/select-box/customer`, config);

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
                
      const config =await HelperBuildRequest("GET",null, "dataTable");
      const request = await fetch(`http://localhost:8000/api/select-box/cellphone`, config);

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
                
      const config =await HelperBuildRequest("GET",null, "dataTable");
      const request = await fetch(`http://localhost:8000/api/select-box/service`, config);

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
                
      const config =await HelperBuildRequest("GET",null, "dataTable");
      const request = await fetch(`http://localhost:8000/api/select-box/status`, config);

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
  };

  const changeModal = (fact) =>{

    if(fact === "brand"){
      setOpenModalAddBrandEdit(true);
    }else if(fact === "customer"){  
      setOpenModalAddCustomerEdit(true)
    }else if(fact === "cellphone"){
      setOpenModalAddCellphoneEdit(true);
    }else if(fact === "service"){
      setOpenModalAddServiceEdit(true);
    }
  };

  const closeFormAdd = () =>{

    setOpenModalAddBrandEdit(false);
    setOpenModalAddCellphoneEdit(false);
    setOpenModalAddCustomerEdit(false);
    setOpenModalAddServiceEdit(false);

  };

  const onSubmitBrand = async (data) =>{

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const apiURL = await url()
        const request = await fetch(`${apiURL}brands`, config);
        
          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                if(dataBrandsEdit.length > 0){
                  setDataBrandsEdit(dataBrandsEdit.concat(response.data))
                  setOpenModalAddBrandEdit(false);
                }else{
                  setDataBrandsEdit(response.data)
                  setOpenModalAddBrandEdit(false);
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

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const apiURL = await url()
        const request = await fetch(`${apiURL}customers`, config);
        
          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                if(dataCustomersEdit.length > 0){
                  setDataCustomersEdit(dataCustomersEdit.concat(response.data))
                  setOpenModalAddCustomerEdit(false);
                }else{
                  setDataCustomersEdit(response.data)
                  setOpenModalAddCustomerEdit(false);
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
        const apiURL = await url()
        const request = await fetch(`${apiURL}cellphones`, config);
        
          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                if(dataCustomersEdit.length > 0){
                  setDataCellPhonesEdit(dataCellphonesEdit.concat(response.data))
                  setOpenModalAddCellphoneEdit(false);
                }else{
                  setDataCellPhonesEdit(response.data)
                  setOpenModalAddCellphoneEdit(false);
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
        const apiURL = await url()
        const request = await fetch(`${apiURL}services`, config);
        
          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                if(dataCustomersEdit.length > 0){
                  setDataServicesEdit(dataServicesEdit.concat(response.data))
                  setOpenModalAddServiceEdit(false);
                }else{
                  setDataServicesEdit(response.data)
                  setOpenModalAddServiceEdit(false);
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

 
  const { register, handleSubmit, getValues} = useForm ();

  if(location === `${apiURLLocal}Table/brands` ){

    return(

      <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block', color:'gold'}}>
          <div>
            <h5  style={{float: 'center'}} >Editar Marca</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="id">ID</label>
            <input className="form-control" type="number" name="id" id="id" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="marca">Marca</label>
            <input className="form-control" type="text" name="marca" id="marca"  defaultValue={itemToEdit ? itemToEdit.title : ''}{...register('title',{ shouldUnregister: true,})}/>
              {errors.title? <p className="p-errores">El campo Marca debe ser definido</p> : ""}
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
              <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
              <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1> 
            </div>
          </form>
        </ModalBody>
      </Modal>
    )

  }else if(location === `${apiURLLocal}Table/cellphones`){

    return(

      <>
        <Modal isOpen={openModalEdit}>
          <ModalHeader style={{display: 'block'}}>
            <div>
              <h5 style={{float: 'center', color:'gold'}} >Editar Modelo</h5> 
            </div>
          </ModalHeader>
          <ModalBody>
            <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
              <input className="form-control" type="text"  id="modelo" readOnly defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
              <br/>
              <label htmlFor="marca">Modelo</label>
              <input className="form-control" type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.model : ''} {...register('model',{ shouldUnregister: true,})} />
                {errors.model? <p className="p-errores">El campo Modelo debe ser definido</p> : ""}
              <br />
              <label htmlFor="url">Url</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
              <br />
              <label htmlFor="url">Marca</label>
              <div className="div-container-select-button">
                <select className="form-select" name="select"  defaultValue={itemToEdit ? itemToEdit.brand_id.id : null} {...register('brand_id',{ shouldUnregister:true})}>
                  <option className="option-selected" value={itemToEdit ? itemToEdit.brand_id.id : null}>{itemToEdit ? itemToEdit.brand_id.brand : null}</option>
                  {dataBrandsEdit.map((brand)=>{
                      return <option  key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
              </div>
                {errors.brand_id?<p className="p-errores">Haga click en una marca</p> : ""}
              <br/>
              <div className="contenedor-boton-modal-dentro">
                <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
                <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1> 
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
                <input className="form-control" type="text" name="marca"  {...register('title')} />
                  {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
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
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
      </>
    )
  }else if(location === `${apiURLLocal}Table/services`){

    return(
      <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color:'gold'}} >Editar Servicio</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <input className="form-control" type="text" readOnly name="id" defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('id',{ shouldUnregister: true,})} />
            <br/>
            <label htmlFor="descripcion">Nombre del Servicio</label>
            <input className="form-control" type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.description : ''} {...register('description',{ shouldUnregister: true,})} />
              {errors.description? <p className="p-errores">{errors.description}</p>: ""}
            <br />
            <label htmlFor="number">Numero de Telefono</label>
            <input className="form-control" type="text" name="number" id="number"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{ shouldUnregister: true,})} />
              {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
            <br />
            <label htmlFor="direccion">Direccion</label>
            <input className="form-control" type="text" name="direccion" id="direccion"  defaultValue={itemToEdit ? itemToEdit.address : ''}{...register('address',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="Email">Email</label>
            <input className="form-control" type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
              <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
              <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1> 
            </div>
          </form>
        </ModalBody> 
      </Modal>
    );
  }else if(location === `${apiURLLocal}Table/customers`){

    return(
      <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color:'gold'}} >Editar Cliente</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <label>Numero de Cliente</label>
            <input className="form-control" type="text" readOnly name="id" defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('id',{ shouldUnregister: true,})} />
            <br/>
            <label htmlFor="descripcion">Nombre</label>
            <input className="form-control" type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.name : ''} {...register('name',{ shouldUnregister: true,})} />
              {errors.name? <p className="p-errores">{errors.name}</p>: ""}
            <br />
            <label htmlFor="number">Email</label>
            <input className="form-control" type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{ shouldUnregister: true,})} />
              {errors.email? <p className="p-errores">{errors.email}</p> : ""}
            <br />
            <label htmlFor="direccion">Numero de Telefono</label>
            <input className="form-control" type="text" name="phone" id="phone"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{ shouldUnregister: true,})} />
            {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
            <br />
            <label htmlFor="Email">Numero de Telefono 2</label>
            <input className="form-control" type="text" name="phone2" id="phone2"  defaultValue={itemToEdit ? itemToEdit.phhone_number_2 : ''}{...register('phone_number_2',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
              <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
              <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1> 
            </div>
          </form>
        </ModalBody> 
      </Modal>
    );
  } else if(location === `${apiURLLocal}Table/reparations`){
    
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
                      <select className="form-select" defaultValue={itemToEdit ? itemToEdit.customer.id : null}{...register('customer_id',{ shouldUnregister: true,})}>
                        <option value="null">
                          Por favor selecciona un cliente.
                        </option>
                        {dataCustomersEdit.map((customer)=>{   
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
                    <input className="form-control" type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.email : ''} {...register('email',{ shouldUnregister: true,})} />
                      {errors.email? <><p className="p-errores">El campo Email no cumple con el formato</p><p className="p-errores">Ejemplo:xxxxx@xxx.com</p></>: ""}
                  </div>
                  <br />
                  <div className="div-inputs">
                    <label htmlFor="cellphone">Celular</label>
                    <div className="div-container-select-button">
                      <select className="form-select" type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.cellphone.id : null}{...register('cellphone_id',{ shouldUnregister: true,})}>
                      <option value="null">Por favor selecciona un celular.</option>
                        {dataCellphonesEdit.map((cellphone)=>{
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
                      <select className="form-select" type="text" name="service" id="service"  defaultValue={itemToEdit ? itemToEdit.service.id : null}{...register('service_id',{ shouldUnregister: true,})}>
                      <option value="null" >Por favor seleccione un Servicio</option>
                        {dataServicesEdit.map((service)=>{                 
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
                      <input className="form-control" type="text" name="imei" id="imei"   defaultValue={itemToEdit.pin}{...register('pin',{ shouldUnregister: true,})}></input>
                      <br />
                      <label>Patron:</label>
                      <input className="form-control" type="text" name="imei" id="imei"   defaultValue={itemToEdit.pattern}{...register('pattern',{ shouldUnregister: true,})}></input>
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
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCustomerInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
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
                <select className="form-select brand" name="select" defaultValue={itemToEdit ? itemToEdit.cellphone.brand_id : null} {...register('brand_id',{
                  shouldUnregister:true
                  })}>
                    <option className="option-selected" value={itemToEdit ? itemToEdit.cellphone.brand_id : null}>{itemToEdit ? itemToEdit.cellphone.brand : "Seleccione una Marca"}</option>
                  {dataBrandsEdit.map((brand)=>{
                      return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <br/>  
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCellphoneInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
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
                <input className="form-control" type="text" name="marca"  {...register('title')} />
                  {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
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
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
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
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addServiceInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
         </>
      );
    }else if(window.location.href.includes("report")){
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
                  <select className="form-select"   name="select"  defaultValue={itemToEdit ? itemToEdit.customer.id : null}{...register('customer_id',{ shouldUnregister: true,})}>
                  <option value="null">
                          Por favor selecciona un cliente.
                        </option>
                        {dataCustomersEdit.map((customer)=>{   
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
                <input className="form-control" type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.email : ''} {...register('email',{ shouldUnregister: true,})} />
                  {errors.email? <><p className="p-errores">El campo Email no cumple con el formato</p><p className="p-errores">Ejemplo:xxxxx@xxx.com</p></>: ""}
              </div>
              <br />
              <div className="div-inputs">
              <label htmlFor="cellphone">Celular</label>
              <div className="div-container-select-button">
                  <select className="form-select" type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.cellphone.id : null}{...register('cellphone_id',{ shouldUnregister: true,})}>
                  <option value="null">Por favor selecciona un celular.</option>
                        {dataCellphonesEdit.map((cellphone)=>{
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
                  <select className="form-select" type="text" name="service" id="service"  defaultValue={itemToEdit ? itemToEdit.service.id : null}{...register('service_id',{ shouldUnregister: true,})}>
                  <option value="null" >Por favor seleccione un Servicio</option>
                        {dataServicesEdit.map((service)=>{                 
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
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCustomerInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
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
                <select className="form-select brand" name="select" defaultValue={itemToEdit ? itemToEdit.cellphone.brand_id : null}  {...register('brand_id',{
                  shouldUnregister:true
                  })}>
                    <option className="option-selected" value={itemToEdit ? itemToEdit.cellphone.brand_id : null}>{itemToEdit ? itemToEdit.cellphone.brand : "Seleccione una Marca"}</option>
                  {dataBrandsEdit.map((brand)=>{
                      return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <br/>  
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCellphoneInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
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
                <input className="form-control" type="text" name="marca"  {...register('title')} />
                  {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
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
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
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
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addServiceInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeFormAdd}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </>
      );
    };
};


export default ModalEdit;