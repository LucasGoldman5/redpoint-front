
import React, { useState } from "react"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import './modales.css'
import HelperBuildRequest from "../helpers/buildRequest";


const ModalAdd =({create,changeModal,openModalAdd,openModalAddBrand,openModalAddCustomer,openModalAddCellphone,openModalAddService,dataApi,closeForm,dataBrands,dataCustomers,dataCellPhones,dataServices,errors}) =>{
  
  const [chainBrand, setChainBrand] = useState ("");
  const [newDate, setNewDate] = useState("");
  const [classesErrors, setClassesErrors] = useState(false);
  const [errorsApi, setErrorsApi] = useState([]);
  const [checkbox, setCheckBox] = useState(false);
  const location = window.location.href;
  const allDate = new Date();
  const Day = allDate.getDay();
  const month = allDate.getMonth();
  const year = allDate.getFullYear();
  const hours = allDate.getHours();
  const minutes = allDate.getMinutes();
  const date= `${Day}/${month}/${year}${hours}:${minutes}`;


  const checkBoxTrue = () =>{
     setCheckBox(!checkbox);
  };
  
  const onSubmitBrand = async (data) =>{

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`http://localhost:8000/api/brands`, config);

          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                  window.location.reload()
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

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`http://localhost:8000/api/customers`, config);

          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                  window.location.reload()
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

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`http://localhost:8000/api/services`, config);

          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                  window.location.reload()
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

    if(data){

      try{

        const config = await HelperBuildRequest("POST", data, "dataTablePost");
        const request = await fetch(`http://localhost:8000/api/cellphones`, config);

          if(request.status === 200){
              const response = await request.json();
              if(response.error){
                  setTimeout(()=>{
                    console.log(response.error);
                  },1000);
              }else{                      
                  window.location.reload()
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

  const fechaActual = new Date();
  fechaActual.setDate( )
  const { register, handleSubmit} = useForm ();


  if(location === "http://localhost:3000/Table/cellphones"){

    return(

       <>
          <Modal isOpen={openModalAdd}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'red'}} >Crear celular</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(create)}>
                <label htmlFor="id">Numero de Marca</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataApi.data.length+1}`}  />
                <br/>
                <label htmlFor="modelo">Modelo</label>
                <input className="form-control" type="text" name="modelo" {...register('model',{
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
                <div>
                <input className="input-select" type="text" placeholder="buscar marca.." onChange={(e) => setChainBrand(e.target.value.charAt().toUpperCase())}></input>
                <select className="form-select brand" name="select"  {...register('brand_id',{
                  value:null
                  })}>
                  {dataBrands.map((brand)=>{
                      if(brand.title.includes(chainBrand)){
                        return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                      }
                  })}
                </select>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <div className="contenedor-boton-modal-dentro">
                  <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
                </div>
              </form>
              <button className={classesErrors ? "option-modal-crear-errores" :"option-modal-crear"} onClick={()=>changeModal("brand")}>+</button>
              <div className="contenedor-boton-modal-fuera">
                <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
              </div>
            </ModalBody>
          </Modal>

          <Modal isOpen={openModalAddBrand}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'red'}} >Crear Marca</h5> 
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
                <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
              </div>
            </ModalBody>
          </Modal>

        </>  
    );
  }else if(location === "http://localhost:3000/Table/brands" ){

    return(

      <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color: 'red'}} >Crear Marca</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label htmlFor="id">Cantidad de marcas actuales</label>
            <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length} ></input>
            <br />
            <label htmlFor="marca">Marca</label>
            <input className="form-control" type="text" name="marca"  {...register('title')} />
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
            <div className="contenedor-boton-modal-dentro">
                <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
            </div>  
            </form>
            <div className="contenedor-boton-modal-fuera">
              <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
            </div>
        </ModalBody>
      </Modal>

    )
  }else if(location === "http://localhost:3000/Table/services"){

    return(
      <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color: 'red'}} >Crear Servicio</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label htmlFor="id">Numero de Servicio</label>
            <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length + 1} ></input>
            <br />
            <label htmlFor="marca">Descripcion</label>
            <input className="form-control" type="text" name="marca"  {...register('description',{
              value:null
              })} />
              {errors.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
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
              <button type="submit" className="btn btn-success" onClick={create} >Crear</button>
            </div>
          </form>
          <div className="contenedor-boton-modal-fuera">
            <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
          </div>
        </ModalBody>
      </Modal>
    );
  }else if(location === "http://localhost:3000/Table/customers"){

    return(
      <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color: 'red'}} >Crear Cliente</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label htmlFor="marca">Nombre</label>
            <input className="form-control" type="text" name="name"  {...register('name',{
              value:null
              })} />
              {errors.name? <p className="p-errores">{errorsApi.name}</p> : ""} 
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
              {errors.phone_number? <p className="p-errores">{errorsApi.phone_number}</p> : ""}
            <br />
            <label htmlFor="url">Numero de telefono 2</label>
            <input className="form-control" type="text" name="phone_2" {...register('phhone_number_2',{
              value:null
              })} />
            <br />
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
    );
  }else if(location === "http://localhost:3000/Table/reparations"){

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
                        <option  value={null}>Seleccione un cliente..</option>
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
                        <option  value={null}>Seleccione un celular..</option>
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
                        <option  value={null}>Seleccione un servicio..</option>
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
                <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
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
                <div>
                <input className="" type="text" placeholder="buscar marca.." onChange={(e) => setChainBrand(e.target.value.charAt().toUpperCase())}></input>
                <select className="form-select brand" name="select"  {...register('brand_id',{
                  value:null
                  })}>
                  {dataBrands.map((brand)=>{
                      return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <div className="contenedor-boton-modal-dentro">
                  <button type="submit" className="btn btn-success" onClick={addCellphoneInReparation} >Crear</button>
                </div>
              </form>
              <button className={classesErrors ? "option-modal-crear-errores" :"option-modal-crear"} onClick={()=>changeModal("brand")}>+</button>
              <div className="contenedor-boton-modal-fuera">
                <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
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
                <button className="btn btn-danger" onClick={closeForm}>Cancelar</button>
              </div>
            </ModalBody>
          </Modal>
        </>
    );
  }
};


export default ModalAdd;

