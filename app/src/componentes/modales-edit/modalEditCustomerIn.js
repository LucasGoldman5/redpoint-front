import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { useForm } from "react-hook-form";


const ModalEditCustomerIn = ({openModalAddCustomerEdit, addCustomerInReparationEdit, changeErrorApi, errorsApi, closeFormAdd}) =>{


    const { register, handleSubmit, getValues} = useForm ();

    return(
        <Modal isOpen={openModalAddCustomerEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div className="div-title-modal">
                <h5  className="h5-modal-add" >Crear Cliente</h5>
                <FontAwesomeIcon className="icon-close-modal" onClick={()=>closeFormAdd("customer",getValues())} icon={faXmark} /> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className={errorsApi.name ? "form-control error" : "form-control"} onSubmit={handleSubmit(addCustomerInReparationEdit)} {...register('form')}>
                <label >Nombre</label>
                <input className="form-control" type="text" name="name"  {...register('name',{
                  value:null,
                  shouldUnregister:true,
                  onChange: () => changeErrorApi("name"),
                  })} />
                  {errorsApi.name? <p className="p-errores">{errorsApi.name}</p> : ""} 
                <br />
                <label >Email</label>
                <input className={errorsApi.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
                  value:null,
                  shouldUnregister:true,
                  onChange: (e) => changeErrorApi("email",e.target.value),
                  })} />
                  {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""}
                <br />
                <label >Numero de Telefono</label>
                <input className={errorsApi.phone_number ? "form-control error" : "form-control"} type="text" name="phone" {...register('phone_number',{
                  value:null,
                  shouldUnregister:true,
                  onChange: () => changeErrorApi("phone_number"),
                  })} />
                  {errorsApi.phone_number? <p className="p-errores">{errorsApi.phone_number}</p> : ""}
                <br />
                <label >Numero de telefono 2</label>
                <input className="form-control" type="text" name="phone_2" {...register('phhone_number_2',{
                  value:null,
                  shouldUnregister:true,
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
    )
}

export default ModalEditCustomerIn