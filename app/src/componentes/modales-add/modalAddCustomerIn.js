import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";

 


const ModalAddCustomerIn = ({openModalAddCustomer, addCustomerInReparation, errorsApi, changeErrorApi, closeFormAdd}) =>{


    const { register, handleSubmit, getValues} = useForm ();

    return(
        <Modal isOpen={openModalAddCustomer}  >
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color: 'green'}} >Crear Cliente</h5> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(addCustomerInReparation)} {...register('form')}>
            <label >Nombre</label>
            <input className={errorsApi.name ? "form-control error" : "form-control"} type="text" name="name"  {...register('name',{
              onChange: () => changeErrorApi("name"),
              value:null,
              shouldUnregister:true
              })} />
              {errorsApi.name? <p className="p-errores">{errorsApi.name}</p> : ""} 
            <br />
            <label >Email</label>
            <input className={errorsApi.email ? "form-control error" : "form-control"} type="text" id="email2"{...register('email',{
              onChange: (e) => changeErrorApi("email",e.target.value),
              shouldUnregister:true,
              value:null,
              shouldUnregister:true
              })} />
              {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""}
            <br />
            <label >Numero de Telefono</label>
            <input className={errorsApi.phone_number ? "form-control error" : "form-control"} type="text" name="phone" {...register('phone_number',{
              onChange: () => changeErrorApi("phone_number"),
              shouldUnregister:true,
              value:null
              })} />
              {errorsApi.phone_number? <p className="p-errores">{errorsApi.phone_number}</p> : ""}
            <br />
            <label >Numero de telefono 2</label>
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
    )
}

export default ModalAddCustomerIn