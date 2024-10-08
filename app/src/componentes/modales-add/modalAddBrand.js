import React from "react";
import "../modales.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";


const ModalAddBrand = ({openModalAdd, create, errors, changeError, closeForm}) =>{


    const { register, handleSubmit} = useForm ();

    return(
        <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div className="div-title-modal">
            <h5  className="h5-modal-add" >Crear Marca</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(create)}>
            <label >Marca</label>
            <input className={errors.title ? "form-control error" : "form-control"} type="text" name="marca"  {...register('title',{
              onChange: () => changeError("title"),
              shouldUnregister:true,
            })} />
              {errors.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
            <br />
            <label >Descripcion</label>
            <input className="form-control" type="text" name="url" {...register('description',{
              value:null,
              shouldUnregister:true,
              })} />
            <br/>
            <label >Url</label>
            <input className="form-control" type="text" name="url"  {...register('url',{
              value:null,
              shouldUnregister:true,
              })} />
            <br/>
            <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success"  >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
        </ModalBody>
      </Modal>
    )
}

export default ModalAddBrand