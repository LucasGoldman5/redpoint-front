import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { useForm } from "react-hook-form";


const ModalEditService = ({openModalEdit, onsubmit, itemToEdit, changeError, errors, edit, closeForm}) =>{

    const { register, handleSubmit} = useForm ();

    return(
        <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block', color: 'rgb(0, 0, 255)'}}>
          <div className="div-title-modal">
            <h5  style={{float: 'center'}} >{`Editar Servicio #${itemToEdit.id}`}</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <input style={{visibility:"hidden", position:"absolute"}} type="text" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('id',{ shouldUnregister: true,})} />
            <label >Nombre del Servicio</label>
            <input className={errors.description ? "form-control error" : "form-control"} type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.description : ''} {...register('description',{
               shouldUnregister: true,
               onChange: () => changeError("description"),
               })} />
              {errors.description? <p className="p-errores">El campo "Nombre del Servicio" es requerido</p>: ""}
            <br />
            <label >Numero de Telefono</label>
            <input className={errors.phone_number ? "form-control error" : "form-control"} type="text" name="number" id="number"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{
               shouldUnregister: true,
               onChange: () => changeError("phone_number"),
               })} />
              {errors.phone_number? <p className="p-errores">El campo "Numero de Telefono" es requerido</p> : ""}
            <br />
            <label htmlFor="direccion">Direccion</label>
            <input className="form-control" type="text" name="direccion" id="direccion"  defaultValue={itemToEdit ? itemToEdit.address : ''}{...register('address',{ shouldUnregister: true,})} />
            <br />
            <label >Email</label>
            <input className={errors.email ? "form-control error" : "form-control"} type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{ 
              shouldUnregister: true,
              onChange: (e) => changeError("email",e.target.value),
              })} />
            {errors.email? <p className="p-errores">{errors.email}</p> : ""}
            <br />
            <div className="contenedor-boton-modal-dentro">
              <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
              <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1> 
            </div>
          </form>
        </ModalBody> 
      </Modal>
    )
}

export default ModalEditService