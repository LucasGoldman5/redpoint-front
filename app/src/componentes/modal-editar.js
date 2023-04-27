import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import './modales.css'


const ModalEditar = ({abrirModalEditar, itemToEdit, editar, cerrarFormulario,onsubmit, dataBrands,errores}) => {

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
            <input className="form-control" type="number" name="id" id="id" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="marca">Marca</label>
            <input className="form-control" type="text" name="marca" id="marca"  defaultValue={itemToEdit ? itemToEdit.title : ''}{...register('title',{ shouldUnregister: true,})}/>
            {errores.title? <p className="p-errores">El campo Marca debe ser definido</p> : ""}
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
            <input className="form-control" type="text"  id="modelo" readOnly defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
            <br/>
            <label htmlFor="marca">Modelo</label>
            <input className="form-control" type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.model : ''} {...register('model',{ shouldUnregister: true,})} />
            {errores.model? <p className="p-errores">El campo Modelo debe ser definido</p> : ""}
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="url">Marca</label>
            <select className="form-select" name="select" required {...register('brand_id')}>
                  {dataBrands.map((brand)=>{
                    return <option key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                {errores.brand_id?<p className="p-errores">Haga click en una marca</p> : ""}
                <br/>
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
 }else if(location === "http://localhost:3000/Tabla/?txt=services"){
    return(
      <Modal isOpen={abrirModalEditar}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center'}} >Editar Servicio</h5> 
            </div>
         
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <input className="form-control" type="text" readOnly name="id" defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('id',{ shouldUnregister: true,})} />
            <br/>
            <label htmlFor="descripcion">Descripcion</label>
            <input className="form-control" type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.description : ''} {...register('description',{ shouldUnregister: true,})} />
            {errores.description? <p className="p-errores">{errores.description}</p>: ""}
            <br />
            <label htmlFor="number">Numero de Telefono</label>
            <input className="form-control" type="text" name="number" id="number"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{ shouldUnregister: true,})} />
            {errores.phone_number? <p className="p-errores">{errores.phone_number}</p> : ""}
            <br />
            <label htmlFor="direccion">Direccion</label>
            <input className="form-control" type="text" name="direccion" id="direccion"  defaultValue={itemToEdit ? itemToEdit.address : ''}{...register('address',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="Email">Email</label>
            <input className="form-control" type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{ shouldUnregister: true,})} />
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