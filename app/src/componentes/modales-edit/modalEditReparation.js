import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const ModalEditReparation = ({openModalEdit, onsubmit, itemToEdit, changeError, changeModal, errors, edit, closeForm, handleInputChange, selectCellphoneActive, selectCustomerActive, selectServiceActive, newCellphoneSelectedEdit, newCustomerSelectedEdit, newServiceSelectedEdit, filteredCellphones, filteredCustomers, filteredServices, activeInputSearch, dataStatesEdit, addEmail}) =>{


    const changeValue = () =>{
        if(newCustomerSelectedEdit.id){
            setValue("customer_id",newCustomerSelectedEdit.id)
            setValue("number",newCustomerSelectedEdit.phone_number)
            setValue("email",newCustomerSelectedEdit.email)
        }
        if(newCellphoneSelectedEdit.id){
            setValue("cellphone_id",newCellphoneSelectedEdit.id)
        }
        if(newServiceSelectedEdit.id){
            setValue("service_id",newServiceSelectedEdit.id)
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

    const { register, handleSubmit, setValue, getValues} = useForm ();

    return(
        <Modal isOpen={openModalEdit} onOpened={() => changeValue()} className="modal-reparations">
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
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.customer_id ? "form-select error" : "form-select"} defaultValue={itemToEdit && newCustomerSelectedEdit.length < 1 ? itemToEdit.customer.id : newCustomerSelectedEdit.length > 0 ? newCustomerSelectedEdit.id : null}{...register('customer_id',{
                   shouldUnregister: true,
                   onChange: (e) =>{ 
                   addEmail(e.target.value,"customer")
                   addValues(e.target.value)
                   },
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
                      return <option className={itemToEdit && newCustomerSelectedEdit.length < 1 ? itemToEdit.customer.id == customer.id ? "option-selected" :"option-modal" : newCustomerSelectedEdit.length > 0 ? newCustomerSelectedEdit.id == customer.id ? "option-selected" :"option-modal":"option-modal"} 
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
              <input className="form-control" type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.customer ? itemToEdit.email : '' : ""} {...register('email',{ shouldUnregister: true,})} />
                {errors.email? <><p className="p-errores">El campo Email no cumple con el formato</p><p className="p-errores">Ejemplo:xxxxx@xxx.com</p></>: ""}
            </div>
            <br />
            <div className="div-inputs">
              <label htmlFor="cellphone">Celular</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"cellphone")} placeholder="buscar.." className={selectCellphoneActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"cellphone")} className="icon-search" icon={faMagnifyingGlass} />
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
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"service")} className="icon-search" icon={faMagnifyingGlass} />
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
    )
}

export default ModalEditReparation