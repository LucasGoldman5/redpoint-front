import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { useForm } from "react-hook-form";


const ModalAddUser = ({openModalAdd, create, errors, changeError, closeForm, dataRoles}) =>{


    const { register, handleSubmit} = useForm ();

    return(
        <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div className="div-title-modal">
            <h5  className="h5-modal-add" >Crear Usuario</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label >Nombre</label>
            <input className={errors.name ? "form-control error" : "form-control"} type="text" name="name"  {...register('name',{
              onChange: () => changeError("name"),
              value:null,
              shouldUnregister:true
              })} />
              {errors.name? <p className="p-errores">{errors.name}</p> : ""} 
            <br />
            <label >Email</label>
            <input className={errors.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
              onChange: (e) => changeError("email",e.target.value),
              value:null,
              shouldUnregister:true
              })} />
              {errors.email? <p className="p-errores">{errors.email}</p> : ""}
            <br />
            <label >Activo</label>
            <input className="form-active"  type="checkbox" name="phone"  {...register('active',{
              shouldUnregister:true
              })} />
            <br />
            <br/>
            <label >Rol</label>
            <select  className={errors.rol_id ? "form-select  error" : "form-select brand"} defaultValue={null}  name="select"  {...register('rol_id',{
                  onChange: () => changeError("rol_id"),
                  shouldUnregister:true
                  })}>
                  <option value={null} className="option-selected">Seleccionar..</option>
                  {dataRoles.map((rol)=>{
                    return <option className="option-modal" key={rol.id} value={rol.id} >{rol.description}</option>                     
                  })}
            </select>
            {errors.rol_id ? <p className="p-errores">El campo Rol debe ser seleccionado</p> : ""}
            <br />
            <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
        </ModalBody>
      </Modal> 
    )
}

export default ModalAddUser