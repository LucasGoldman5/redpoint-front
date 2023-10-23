import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { useForm } from "react-hook-form";


const ModalEditCustomer = ({openModalEdit, onsubmit, itemToEdit, changeError, errors, edit, closeForm}) =>{


    const { register, handleSubmit} = useForm ();

    return(
        <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block', color: 'rgb(0, 0, 255)'}}>
          <div className="div-title-modal">
            <h5  style={{float: 'center'}} >{`Editar Cliente #${itemToEdit.id}`}</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <input style={{ visibility: 'hidden', position: 'absolute' }} type="text" readOnly name="id" defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('id',{ shouldUnregister: true,})} />
            <label >Nombre</label>
            <input className={errors.name ? "form-control error" : "form-control"} type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.name : ''} {...register('name',{
               shouldUnregister: true,
               onChange: () => changeError("name"),
               })} />
              {errors.name? <p className="p-errores">{errors.name}</p>: ""}
            <br />
            <label >Documento</label>
            <input className={errors.dni ? "form-control error" : "form-control"} type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.dni : ''} {...register('dni',{
               shouldUnregister: true,
               onChange: () => changeError("dni"),
               })} />
              {errors.dni? <p className="p-errores">{errors.dni}</p>: ""}
            <br />
            <label >Email</label>
            <input className={errors.email ? "form-control error" : "form-control"} type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{
               shouldUnregister: true,
               onChange: (e) => changeError("email",e.target.value),
               })} />
              {errors.email? <p className="p-errores">{errors.email}</p> : ""}
            <br />
            <label >Numero de Telefono</label>
            <input className={errors.phone_number ? "form-control error" : "form-control"} type="text" name="phone" id="phone"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{ 
              shouldUnregister: true,
              onChange: () => changeError("phone_number"),
              })} />
            {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
            <br />
            <label >Numero de Telefono 2</label>
            <input className="form-control" type="text" name="phone2" id="phone2"  defaultValue={itemToEdit ? itemToEdit.phhone_number_2 : ''}{...register('phone_number_2',{ shouldUnregister: true,})} />
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

export default ModalEditCustomer