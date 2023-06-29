import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';  
import { useForm } from "react-hook-form";


const ModalAddService = ({openModalAdd, create, errors, changeError, closeForm}) =>{


    const { register, handleSubmit} = useForm ();

    return(
        <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div className="div-title-modal">
            <h5  className="h5-modal-add" >Crear Servicio</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label >Nombre del Servicio</label>
            <input className={errors.description ? "form-control error" : "form-control"} type="text" name="marca"  {...register('description',{
              value:null,
              shouldUnregister:true,
              onChange: () => changeError("description")
              })} />
              {errors.description? <p className="p-errores">El campo "Nombre del Servicio" debe ser completado</p> : ""} 
            <br />
            <label >Numero de Telefono</label>
            <input className={errors.phone_number ? "form-control error" : "form-control"} type="text" name="numero de telefono" {...register('phone_number',{
              value:null,
              shouldUnregister:true,
              })} />
              {errors.phone_number? <p className="p-errores">El campo Numero de telefono debe ser completado</p> : ""}
            <br />
            <label >Direccion</label>
            <input className="form-control" type="text" name="direccion" {...register('address',{
              value:null,
              shouldUnregister:true,
              })} />
            <br />
            <label >Email</label>
            <input className="form-control" type="text" name="email" {...register('email',{
              value:null,
              shouldUnregister:true,
              })} />
            <br />
            <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success"  >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
        </ModalBody>
      </Modal>
    )
}

export default ModalAddService