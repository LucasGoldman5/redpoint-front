import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const ModalAddReparation = ({openModalAdd, create, errors, changeError, handleInputChange, activeInputSearch, newCustomerSelected, newCellphoneSelected, newServiceSelected, filteredCellphones, filteredCustomers, filteredServices, closeForm, changeModal, addEmail, selectCellphoneActive, selectCustomerActive, selectServiceActive, checkbox, checkBoxTrue}) =>{


    const changueValue = () =>{
        console.log("hola");
        if(newCustomerSelected.id){
            setValue("customer_id",newCustomerSelected.id)
            setValue("number",newCustomerSelected.phone_number)
            setValue("email",newCustomerSelected.email)
        }

        if(newCellphoneSelected.id){
            setValue("cellphone_id",newCellphoneSelected.id)
        }else{
            setValue("cellphone_id","Seleccionar..")
        }

        if(newServiceSelected.id){
            setValue("service_id",newServiceSelected.id)
        }else{
            setValue("service_id","Seleccionar..")
        }
    }

    const addValues = (customerId) =>{

        filteredCustomers.map((customer) =>{
            if(customer.id == customerId){
               setValue("email", customer.email);
               setValue("number", customer.phone);
            };
          });
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
              <label htmlFor="marca">Cliente</label>
              <div className="div-container-select-button">
                <input  type="search" onChange={(e)=>handleInputChange(e,"customer")} placeholder="buscar.." className={selectCustomerActive ? "input-search" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.customer_id ? "form-select error" : "form-select"} name="select" defaultValue={newCustomerSelected.id ? newCustomerSelected.id : ""} {...register('customer_id',{
                  onChange: (e) => {
                    addEmail(e.target.value,"customer");
                    addValues(e.target.value)
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
                value:null
                })} />
            </div>
            <br />
            <div className="div-inputs">
              <label htmlFor="url">Email</label>
              <input className="form-control" type="text" defaultValue={""}{...register('email',{
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
                value:null,
                })} />
            </div>
            <br />
            <div className="div-inputs">
              <label htmlFor="url">Observacion</label>
              <textarea className="form-control" type="text" name="phone_2" {...register('observation',{
                value:null,
                })} />
            </div>
            <br/>
            <div className="div-inputs">
              <label htmlFor="url">Estado de la reparacion</label>
              <select className="form-select" type="text" name="phone_2" {...register('state_id',{
                value:1,  
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
                value:null,
                })} />
            </div>
            <br/>
            <div className="div-inputs">
              <label htmlFor="url">Precio a cobrar<span>*</span> </label>
              <input className="form-control" type="text" name="phone_2" {...register('amount',{
                value:null,
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
                value:0,
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
                value:null,
                })} />
            </div>
            <br/>
            <div className="div-inputs">
              <label htmlFor="check">Tiene seguridad</label>
              <input onClick={checkBoxTrue} type="checkbox" name="phone_2" {...register('has_security',{
                value:0,
                })} />
              <br/>
              {
                (checkbox)
                ?
                <div>
                  <br/>
                  <label>Patron</label>
                  <input className="form-control" type="text" name="phone_2" {...register('pattern',{
                    value:null,
                    })} />
                  <br/>
                  <label>Pin</label>
                  <input className="form-control" type="text" name="phone_2" {...register('pin',{
                    value:null,
                    })} />  
                </div>
                :
                ""
              }  
            </div>                                    
            <hr />
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