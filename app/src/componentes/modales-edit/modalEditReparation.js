import React, { useState } from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faXmark } from '@fortawesome/free-solid-svg-icons';


const ModalEditReparation = ({openModalEdit, onsubmit, itemToEdit, changeError, changeModal, errors, edit, closeForm, handleInputChange, selectCellphoneActive, selectCustomerActive, selectServiceActive, newCellphoneSelectedEdit, newCustomerSelectedEdit, newServiceSelectedEdit, filteredCellphones, filteredCustomers, filteredServices, activeInputSearch, dataStatesEdit, addEmail}) =>{

    const [checkboxOn, setCheckboxOn] = useState(false);
    const [firstCheckboxOn, setFirstCheckboxOn] = useState(false);
    const [customerSelected, setCustomerSelected] = useState({});
    const [cellphoneSelected, setCellphoneSelected] = useState({});
    const [serviceSelected, setServiceSelected] = useState({});
    const [endDateSelected, setEndDateSelected] = useState(null);
    const [startDateSelected, setStartDateSelected] = useState(null);
    const [deliveryDateSelected, setDeliveryDateSelected] = useState(null);

    const changeValue = (values) =>{

        if(newCustomerSelectedEdit.id){
            setValue("customer_id",newCustomerSelectedEdit.id)
        }else{
            if(customerSelected.id){
                setValue("customer_id",customerSelected.id)
            }
        }
        if(newCellphoneSelectedEdit.id){
            setValue("cellphone_id",newCellphoneSelectedEdit.id)
        }else{
            if(cellphoneSelected.id){
                setValue("cellphone_id",cellphoneSelected.id)
            }
        }
        if(newServiceSelectedEdit.id){
            setValue("service_id",newServiceSelectedEdit.id)
        }else{
            if(serviceSelected.id){
                setValue("service_id",serviceSelected.id)
            }
        }

        if(values.reception_date){
          setValue("reception_date",new Date(itemToEdit.reception_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.reception_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.reception_date).getDate()).slice(-2) )
        }
        if(endDateSelected){
          setValue("service_end_date",new Date(endDateSelected).getFullYear() + "-" + ("00" + (new Date (endDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(endDateSelected).getDate()).slice(-2) )
        }else if(values.service_end_date){
          setValue("service_end_date",new Date(values.service_end_date).getFullYear() + "-" + ("00" + (new Date (values.service_end_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(values.service_end_date).getDate()).slice(-2) )
        }

        if(startDateSelected){
          setValue("service_start_date",new Date(startDateSelected).getFullYear() + "-" + ("00" + (new Date (startDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(startDateSelected).getDate()).slice(-2) )
        }else if(values.service_start_date){
          setValue("service_start_date",new Date(values.service_start_date).getFullYear() + "-" + ("00" + (new Date (values.service_start_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(values.service_start_date).getDate()).slice(-2) )
        }

        if(deliveryDateSelected){
          setValue("delivery_date",new Date(deliveryDateSelected).getFullYear() + "-" + ("00" + (new Date (deliveryDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(deliveryDateSelected).getDate()).slice(-2) )
        }else if(values.delivery_date){
          setValue("delivery_date",new Date(values.delivery_date).getFullYear() + "-" + ("00" + (new Date (values.delivery_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(values.delivery_date).getDate()).slice(-2) )
        }
    }

    const addValues = (id,entity) =>{

        if(entity == "customer"){
            filteredCustomers().map((customer) =>{
                if(customer.id == id){
                   setCustomerSelected(customer);
                };
              });
        }
        if(entity == "cellphone"){
            filteredCellphones().map((cellphone) =>{
                if(cellphone.id == id){
                   setCellphoneSelected(cellphone);
                };
              });
        }
        if(entity == "service"){
            filteredServices().map((service) =>{
                if(service.id == id){
                   setServiceSelected(service);
                };
              });
        }
    }

    const changeDates = (entity,e) =>{
      let value = e.target.value
      if(entity == "service_end_date"){
        setEndDateSelected(value);
      }else if(entity == "service_start_date"){
        setStartDateSelected(value);
      }else if(entity == "delivery_date"){
        setDeliveryDateSelected(value);
      }
    }

    const checkBoxChange = () =>{
        setCheckboxOn(!checkboxOn)
    }

    const firstCheckBoxChange = () =>{
        setFirstCheckboxOn(!checkboxOn)
    }

    const { register, handleSubmit, setValue, getValues} = useForm ();


    return(
        <Modal id="elementModal" isOpen={openModalEdit} onOpened={() => changeValue(getValues())} className="modal-reparations">
        <ModalHeader style={{display: 'block', color: 'gold'}}>
          <div className="div-title-modal">
            <h5  style={{float: 'center'}} >{`Editar Reparacion #${itemToEdit.id}`}</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group reparations" onSubmit={handleSubmit(onsubmit)}> 
            <input style={{visibility:"hidden", position:"absolute" }} type="text"  readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
            <div className="div-inputs">
              <label>Cliente</label>              
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"customer")} placeholder="buscar.." className={selectCustomerActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.customer_id ? "form-select error" : "form-select"} defaultValue={itemToEdit && newCustomerSelectedEdit == [] ? itemToEdit.customer.id ? itemToEdit.customer.id : "" : newCustomerSelectedEdit.length > 0 ? newCustomerSelectedEdit.id : null}{...register('customer_id',{
                   onChange: (e) =>{ 
                   addEmail(e.target.value,"customer")
                   addValues(e.target.value,"customer")
                   },
                   })}>
                  {
                    (newCustomerSelectedEdit.id)
                    ?
                     <option value={newCustomerSelectedEdit.id}>{newCustomerSelectedEdit.name}</option>
                    :
                    itemToEdit.customer.customer
                    ?
                    <option style={{visibility:"hidden", display:"none"}} value={itemToEdit.customer.id}>{itemToEdit.customer.customer}</option>
                    :
                    <option >Seleccionar..</option>
                  }
                  {filteredCustomers().map((customer)=>{     
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
            
            <div className="div-inputs">
              <label >Numero de contacto</label>
              <input className="form-control" type="text"  defaultValue={itemToEdit ? itemToEdit.number : ''} {...register('number')} />
            </div>
            
            <div className="div-inputs">
              <label >Email</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.email ? itemToEdit.email : '' : ""} {...register('email')} />
                {errors.email? <><p className="p-errores">El campo Email no cumple con el formato</p><p className="p-errores">Ejemplo:xxxxx@xxx.com</p></>: ""}
            </div>
            
            <div className="div-inputs">
              <label >Celular</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"cellphone")} placeholder="buscar.." className={selectCellphoneActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"cellphone")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.cellphone_id ? "form-select error" : "form-select"} type="text" name="email" id="email"  defaultValue={itemToEdit && newCellphoneSelectedEdit == [] ? itemToEdit.cellphone.id ? itemToEdit.cellphone.id : "": newCellphoneSelectedEdit.length > 0 ? newCellphoneSelectedEdit.id : null}{...register('cellphone_id',{
                   onChange: (e) => {
                   changeError("cellphone")
                   addValues(e.target.value,"cellphone")
                   }
                   })}>
                  {
                    (newCellphoneSelectedEdit.id)
                    ?
                     <option value={newCellphoneSelectedEdit.id}>{newCellphoneSelectedEdit.model}</option>
                    :
                    itemToEdit.cellphone.model
                    ?
                    <option style={{visibility:"hidden", display:"none"}} value={itemToEdit.cellphone.id}>{itemToEdit.cellphone.brand ? itemToEdit.cellphone.brand + "-" : ""}{itemToEdit.cellphone.model}</option>
                    :
                    <option >Seleccionar..</option>
                  }
                  {filteredCellphones().map((cellphone)=>{           
                      return <option className={itemToEdit && itemToEdit.cellphone.id == cellphone.id ? "option-selected" :"option-modal"} 
                      key={cellphone.id} 
                      value={cellphone.id} 
                      >{cellphone.brand_id ? cellphone.brand_id.brand + "-" : ""}{cellphone.model}</option>   
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("cellphone")}>+</h1>
              </div>
                {errors.cellphone_id? <p className="p-errores">Debe seleccionar un celular</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label >Falla</label>
              <textarea className="form-control" type="text"  defaultValue={itemToEdit ? itemToEdit.failure : ''}{...register('failure')} />
            </div>
            
            <div className="div-inputs">
              <label >Observacion</label>
              <textarea className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.observation : ''}{...register('observation')} />
            </div>
            
            <div className="div-inputs">
              <label>Estado de la reparacion</label>
              <select  className="form-select" defaultValue={itemToEdit ? itemToEdit.state_id.id : null}{...register("state_id",{
                required:true,
              })}>
                <option style={{visibility:"hidden", display:"none"}}  value={itemToEdit ? itemToEdit.state_id.id : null}>{itemToEdit ? itemToEdit.state_id.description : null}</option>
                {dataStatesEdit.map((state) => {
                  return <option className={itemToEdit ? itemToEdit.state_id.id ? itemToEdit.state_id.id == state.id ? "option-selected" :"option-modal" : "option-modal" : "option-modal"}  value={state.id} key={state.id}>{state.description}</option>
                })}
              </select>
            </div>
            
            <div className="div-inputs">
              <label >Servicio</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"service")} placeholder="buscar.." className={selectServiceActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"service")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.service_id ? "form-select error" : "form-select"} type="text" name="service" id="service"  defaultValue={itemToEdit && newServiceSelectedEdit == [] ? itemToEdit.service.id ? itemToEdit.service.id : "" : newServiceSelectedEdit.length > 0 ? newServiceSelectedEdit.id : null}{...register('service_id',{
                   onChange: (e) =>{
                    changeError("service")
                    addValues(e.target.value,"service")
                   } ,
                   })}>
                  {
                    (newServiceSelectedEdit.id)
                    ?
                     <option value={newServiceSelectedEdit.id}>{newServiceSelectedEdit.description}</option>
                    :
                    itemToEdit.service.service
                    ?
                    <option style={{visibility:"hidden", display:"none"}} value={itemToEdit.service.id}>{itemToEdit.service.service}</option>
                    :
                    <option >Seleccionar..</option>
                  }
                  {filteredServices().map((service)=>{                 
                      return <option className={itemToEdit && itemToEdit.service.id == service.id ? "option-selected" :"option-modal"}
                       key={service.id}
                       value={service.id}>{service.description}</option>   
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("service")}>+</h1>
              </div>
                {errors.service_id? <p className="p-errores">Debe seleccionar un Servicio</p> : ""}
            </div>

            <div className="div-inputs">
              <label >Numero de Orden</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.service_order ? itemToEdit.service_order : '' : ''}{...register('service_order')} />
            </div>
            
            <div className="div-inputs">
              <label style={{color:"red", fontSize:"18px"}}>Costo del Servicio</label>
              <input className={errors.cost ? "form-control error cost" : "form-control cost"} type="text"   defaultValue={itemToEdit ? itemToEdit.cost ? itemToEdit.cost : 0 : 0}{...register('cost',{
                onChange: (event) => changeError("cost",event),
              })} />
              {errors.cost ? <p className="p-errores">Solo se permiten numeros</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label style={{color:"green", fontSize:"18px"}}>Precio a cobrar</label>
              <input className={errors.amount ? "form-control error value" : "form-control value"} type="text" defaultValue={itemToEdit ? itemToEdit.amount ? itemToEdit.amount : 0 : 0}{...register('amount',{
                onChange: (event) => changeError("amount",event)
              })} />
              {errors.amount ? <p className="p-errores">Solo se permiten numeros</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label >Fecha de recepcion</label>
              <input className="form-control" type="date"  defaultValue={itemToEdit && itemToEdit.reception_date  ? new Date(itemToEdit.reception_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.reception_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.reception_date).getDate()).slice(-2)  : null}{...register('reception_date',{
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getFullYear() + '-' +
                    ('00' + (dateInput.getMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            
            <div className="div-inputs">
              <label >Fecha de entrega</label>
              <input className="form-control" type="date"  defaultValue={itemToEdit && itemToEdit.delivery_date !=null ? new Date(itemToEdit.delivery_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.delivery_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.delivery_date).Date()).slice(-2)  : null}{...register('delivery_date',{
                onChange: (event) => changeDates("delivery_date",event),
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getFullYear() + '-' +
                    ('00' + (dateInput.getMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            <div className="div-inputs">
              <label >Fecha de Inicio del Servicio</label>
              <input className="form-control" type="date"  defaultValue={itemToEdit.service_start_date ? new Date(itemToEdit.service_start_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.service_start_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.service_start_date).getDate()).slice(-2)  : null}{...register('service_start_date',{
                onChange: (event) => changeDates("service_start_date",event),
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getFullYear() + '-' +
                    ('00' + (dateInput.getMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            <div className="div-inputs">
              <label >Fecha de Servicio terminado</label>
              <input className="form-control" type="date"  defaultValue={(itemToEdit && itemToEdit.service_end_date != null)  ? new Date(itemToEdit.service_end_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.service_end_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.service_end_date).getDate()).slice(-2)  : null} {...register('service_end_date',{
                onChange: (event) => changeDates("service_end_date",event),
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getFullYear() + '-' +
                    ('00' + (dateInput.getMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            <div className="div-inputs">
              <label >Imei</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.imei : ''}{...register('imei')} />
            </div>      
            
            <div className="div-inputs security">
              <label>Tiene Seguridad:</label>
              {
                (itemToEdit)
                ?
                (itemToEdit.has_security == 1 && firstCheckboxOn === false)
                ?
                <>
                <input style={{ marginLeft:"5px"}} type="checkbox" defaultChecked={itemToEdit.has_security == 1 ? true : false} defaultValue={itemToEdit.has_security == 1 ? 1 : 0}  {...register('has_security',{
                    onChange:()=> firstCheckBoxChange()
                    })}></input>
                
                 <div className="div-security">
                    <div className="div-inputs pin">
                    <label>Pin:</label>
                    <input className="form-control pin" type="text"    defaultValue={itemToEdit.pin}{...register('pin')}></input>
                    </div>
                    
                    <div className="div-inputs pattern">
                    <label>Orden de patron:</label>
                    <input className="form-control pattern" type="text"    defaultValue={itemToEdit.pattern}{...register('pattern')}></input>
                    </div>
                 </div>
                </> 
                :
                <>
                <input style={{ marginLeft:"5px"}} type="checkbox" {...register('has_security',{
                     onChange:()=> checkBoxChange()
                    })}></input>
                {
                  checkboxOn === true
                  ?
                  <div className="div-security">
                    
                    <div className="div-inputs pin">
                        <label>Pin:</label>
                        <input className="form-control pin" type="text" defaultValue={itemToEdit.pin ? itemToEdit.pin : ""}  {...register('pin')}></input>
                    </div>
                    
                    <div className="div-inputs pattern">
                        <label>Orden de patron:</label>
                        <input className="form-control pattern" type="text" defaultValue={itemToEdit.pattern ? itemToEdit.pattern : ""} {...register('pattern')}></input>
                    </div>
                 </div>
                  :
                  <>
                  <input style={{visibility:"hidden", position:"absolute"}} {...register('pin')}></input>
                  <input style={{visibility:"hidden", position:"absolute"}} {...register('pattern')}></input>
                  </>
                }    
                </>
                :
                ""
              }     
            </div>            
               
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