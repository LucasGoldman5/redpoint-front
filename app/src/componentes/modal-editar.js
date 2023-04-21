import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import './modales.css'


const ModalEditar = ({abrirModalEditar, itemToEdit, editar, cerrarFormulario,onsubmit}) => {

  const location = window.location.href
const allDate = new Date()
const Day = allDate.getDay()
const month = allDate.getMonth()
const year = allDate.getFullYear()
const hours = allDate.getHours()
const minutes = allDate.getMinutes()
const date= `${Day}/${month}/${year}  Hora: ${hours}:${minutes}`;


const { register, handleSubmit} = useForm ();

if(location ==="http://localhost:3000/Tabla/?txt=brands" ){

  return(

    <Modal isOpen={abrirModalEditar}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center'}} >Editar Marca</h5> 
            </div>
         
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="id">ID</label>
            <input className="form-control" type="number" name="id" id="id" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''}></input>
            <br />
            <label htmlFor="marca">Marca</label>
            <input className="form-control" type="text" name="marca" id="marca"  defaultValue={itemToEdit ? itemToEdit.marca : ''}{...register('title',{ shouldUnregister: true,})}/>
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
                <button type="submit" className="btn btn-success" onClick={editar}>
                Editar
                </button>
            </div>
          </form>
          <div className="contenedor-boton-modal-fuera">
               <button className="btn btn-danger boton-cancelar" onClick={cerrarFormulario}>
                  Cancelar
                </button>
          </div>
        </ModalBody>
  </Modal>
)

}else if(location === "http://localhost:3000/Tabla/?txt=cellphones"){
   return(
    <Modal isOpen={abrirModalEditar}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center'}} >Editar Modelo</h5> 
            </div>
         
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="marca">Modelo</label>
            <input className="form-control" type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.model : ''} {...register('title',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="Descripcion">Descripcion</label>
            <input className="form-control" type="text" name="description" id="description" placeholder={"Agregue una descripcion al modelo"} {...register('description',{ shouldUnregister: true,})}></input>
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
                <button className="btn btn-success" type="submit" onClick={editar}>
                Editar
                </button> 
            </div>
          </form>
          <div className="contenedor-boton-modal-fuera">
               <button className="btn btn-danger boton-cancelar" onClick={cerrarFormulario}>
                  Cancelar
                </button>
          </div>
        </ModalBody>
       
  </Modal>
   )
}

    
}


export default ModalEditar