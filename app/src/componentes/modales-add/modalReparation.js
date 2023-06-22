import React, { useState } from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const ModalAddReparation = ({openModalAdd, create, errors, changeError, handleInputChange, activeInputSearch, newCustomerSelected, newCellphoneSelected, newServiceSelected, filteredCellphones, filteredCustomers, filteredServices, closeForm, changeModal, addEmail, selectCellphoneActive, selectCustomerActive, selectServiceActive, checkbox, checkBoxTrue, ifChangeModal}) =>{


  const [selectCustomer, setSelectCustomer] = useState({})
  const [selectCellphone, setSelectCellphone] = useState({})
  const [selectService, setSelectService] = useState({})


    const changueValue = () =>{
        if(newCustomerSelected.id){
            setValue("customer_id",newCustomerSelected.id)
            setValue("number",newCustomerSelected.phone_number)
            setValue("email",newCustomerSelected.email)
        }else{
          if(selectCustomer.id && ifChangeModal === true){
            setValue("customer_id",selectCustomer.id)
            setValue("number",selectCustomer.phone)
            setValue("email",selectCustomer.email)
          }
        }

        if(newCellphoneSelected.id){
            setValue("cellphone_id",newCellphoneSelected.id)
        }else if(selectCellphone.id && ifChangeModal === true){
          setValue("cellphone_id",selectCellphone.id)
        }else{
            setValue("cellphone_id","Seleccionar..")
        }

        if(newServiceSelected.id){
            setValue("service_id",newServiceSelected.id)
        }else if(selectService.id && ifChangeModal === true){
          setValue("service_id",selectService.id)
        }else{
            setValue("service_id","Seleccionar..")
        }
    }

    const addValues = (id,entity) =>{

        if(entity == "customer"){
          filteredCustomers.map((customer) =>{
            if(customer.id == id){
               setValue("email", customer.email);
               setValue("number", customer.phone);
               setSelectCustomer(customer);
            };
          });
        }
        if(entity == "cellphone"){
          filteredCellphones.map((cellphone) =>{
            if(cellphone.id == id){
               setSelectCellphone(cellphone);
            };
          });
        }
        if(entity == "service"){
          filteredServices.map((service) =>{
            if(service.id == id){
               setSelectService(service);
            };
          });
        }
    }

    

    const { register, handleSubmit, getValues, setValue} = useForm ();
   
    return(
        <Modal isOpen={openModalAdd} className="modal-reparations" onOpened={()=>changueValue()}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color: 'green'}} >Crear Reparacion</h5> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group reparations" onSubmit={handleSubmit(create)}>
            <div className="div-inputs">
              <label >Cliente</label>
              <div className="div-container-select-button">
                <input  type="search" onChange={(e)=>handleInputChange(e,"customer")} placeholder="buscar.." className={selectCustomerActive ? "input-search" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.customer_id ? "form-select error" : "form-select"} name="select" defaultValue={newCustomerSelected.id ? newCustomerSelected.id : ""} {...register('customer_id',{
                  shouldUnregister: ifChangeModal ? false : true,
                  onChange: (e) => {
                    addEmail(e.target.value,"customer");
                    addValues(e.target.value, "customer")
                  },
                      })}>
                      {
                        (newCustomerSelected.id)
                        ?
                         <option className="option-selected" value={newCustomerSelected.id}>{newCustomerSelected.name}</option>
                        :
                        <option className="option-selected">Seleccionar..</option>
                      }
                      {filteredCustomers().map((customer)=>{
                          return <option className="option-modal" key={customer.id} value={customer.id} >{customer.name}</option>                              
                      })}
                  </select>
                <h1 className="h1-add" onClick={()=>changeModal("customer")}>+</h1>
              </div> 
              {errors.customer_id ? <p className="p-errores">Debe seleccionar un Cliente</p> : ""}
            </div>
            <div className="div-inputs">
              <label >Numero de contacto</label>
              <input className="form-control" type="text" name="contact-number" {...register('number',{
                shouldUnregister: ifChangeModal ? false : true,
                value:null,
                })} />
            </div>
            <div className="div-inputs">
              <label >Email</label>
              <input className="form-control" type="text" defaultValue={""}{...register('email',{
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Celular</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"cellphone")} placeholder="buscar.." className={selectCellphoneActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"cellphone")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.cellphone_id ? "form-select error" : "form-select"} name="select"  defaultValue={newCellphoneSelected.id ? newCellphoneSelected.id : ""} {...register('cellphone_id',{
                  onChange: (e) => {
                    changeError("cellphone")
                    addValues(e.target.value, "cellphone")
                  },
                  shouldUnregister: ifChangeModal ? false : true,
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
            
            <div className="div-inputs">
              <label >Falla</label>
              <textarea className="form-control"  name="phone_2" {...register('failure',{
                shouldUnregister: ifChangeModal ? false : true,
                value:null,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Observacion</label>
              <textarea className="form-control" type="text" name="phone_2" {...register('observation',{
                shouldUnregister: ifChangeModal ? false : true,
                value:null,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Estado de la reparacion</label>
              <select className="form-select" type="text" name="phone_2" {...register('state_id',{
                value:1,  
                })}>
                <option className="option-modal" value={1}>Recibido</option>
              </select>
            </div>
            
            <div className="div-inputs">
              <label >Servicio</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"service")} placeholder="buscar.." className={selectServiceActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"service")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.service_id ? "form-select error" : "form-select"} name="select"  defaultValue={newServiceSelected.id ? newServiceSelected.id : ""} {...register('service_id',{
                  onChange: (e) => {
                    changeError("service")
                    addValues(e.target.value, "service")
                  },
                  shouldUnregister: ifChangeModal ? false : true,
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
            
            <div className="div-inputs">
              <label >Valor de la reparacion</label>
              <input className="form-control cost" type="text" name="phone_2" {...register('cost',{
                value:null,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Precio a cobrar<span>*</span> </label>
              <input className="form-control value" type="text" name="phone_2" {...register('amount',{
                value:null,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Fecha de notificacion al cliente</label>
              <input className="form-control" type="date" name="phone_2" {...register('notice_date',{
                value:  null,
                shouldUnregister: ifChangeModal ? false : true,
                setValueAs : value =>{
                  if(value != null && value){
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
            
            <div className="div-inputs">
              <label >Cantidad de Notificaciones</label>
              <input className="form-control" type="text" name="phone_2" {...register('notice_quantity',{
                value:0,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs">
            <label >Fecha de entrega</label>
              <input className="form-control" type="date" name="phone_2" {...register('delivery_date',{
                value:  null,
                shouldUnregister: ifChangeModal ? false : true,
                setValueAs : v =>{
                  if(v != null && v){
                    let dateInput = new Date(v)
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
            
            <div className="div-inputs">
              <label >Fecha de inicio del servicio</label>
              <input className="form-control" type="date" name="phone_2" {...register('service_start_date',{
                value:  null,
                shouldUnregister: ifChangeModal ? false : true,
                setValueAs : v =>{
                  if(v != null && v){
                    let dateInput = new Date(v)
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
            
            <div className="div-inputs">
              <label >Fecha de servicio terminado</label>
              <input className="form-control" type="date" name="phone_2" {...register('service_end_date',{
                value:  null,
                shouldUnregister: ifChangeModal ? false : true,
                setValueAs : v =>{
                  if(v != null && v){
                    let dateInput = new Date(v)
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
            
            <div className="div-inputs">
              <label >Imei</label>
              <input className="form-control" type="text" name="phone_2" {...register('imei',{
                value:null,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs security">
              <label >Tiene seguridad</label>
              <input onClick={checkBoxTrue} type="checkbox" name="phone_2" {...register('has_security',{
                value:0,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
              
              {
                (checkbox)
                ?
                <div className="div-security">
                  <div className="div-inputs pattern">
                  <label>Patron</label>
                  <input className="form-control" type="text" name="phone_2" {...register('pattern',{
                    value:null,
                    shouldUnregister: ifChangeModal ? false : true,
                    })} />
                  </div>
                  
                  <div className="div-inputs pin">
                  <label>Pin</label>
                  <input className="form-control" type="text" name="phone_2" {...register('pin',{
                    value:null,
                    shouldUnregister: ifChangeModal ? false : true,
                    })} /> </div> 
                </div>
                :
                ""
              }  
            </div>                                    
            
            <div className="contenedor-boton-modal-dentro-reparations">
              <button type="submit" className="btn btn-success"  >Crear</button>
              <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
            </div>
          </form>
        </ModalBody>
      </Modal>  
    )
}

export default ModalAddReparation