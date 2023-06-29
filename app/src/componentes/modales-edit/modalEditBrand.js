import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { useForm } from "react-hook-form";


const ModalEditBrand = ({openModalEdit, onsubmit, itemToEdit, changeError, errors, edit, closeForm}) =>{


    const { register, handleSubmit} = useForm ();

    return(
        <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block', color:'gold'}}>
          <div className="div-title-modal">
            <h5  style={{float: 'center'}} >{`Editar Marca #${itemToEdit.id}`}</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <input style={{ visibility: 'hidden', position: 'absolute' }} type="number" name="id" id="id" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true})} />
            <input  style={{ visibility: 'hidden', position: 'absolute' }} defaultValue={itemToEdit ? itemToEdit.created_at : ""} {...register("created_at")}></input>
            <label >Marca</label>
            <input className={errors.title ? "form-control error" : "form-control"} type="text" name="marca" id="marca"  defaultValue={itemToEdit ? itemToEdit.title : ''}{...register('title',{
               shouldUnregister: true,
               onChange: () => changeError("title"),
               })}/>
              {errors.title? <p className="p-errores">El campo Marca debe ser definido</p> : ""}
            <br />
            <label >Descripcion</label>
            <input className="form-control" type="text" name="descripcion" id="descripcion"  defaultValue={itemToEdit ? itemToEdit.description : ''}{...register('description',{shouldUnregister: true})}/>
            <br />
            <label >Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
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

export default ModalEditBrand