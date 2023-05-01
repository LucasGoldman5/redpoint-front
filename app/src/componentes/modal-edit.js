import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import './modales.css'


const ModalEdit = ({ openModalEdit, itemToEdit, edit, closeForm,onsubmit, dataBrands,errors }) => {

  const location = window.location.href;
  const allDate = new Date();
  const Day = allDate.getDay();
  const month = allDate.getMonth();
  const year = allDate.getFullYear();
  const hours = allDate.getHours();
  const minutes = allDate.getMinutes();
  const date= `${Day}/${month}/${year}  Hora: ${hours}:${minutes}`;


  const { register, handleSubmit} = useForm ();

  if(location === "http://localhost:3000/Table/?txt=brands" ){

    return(

      <Modal isOpen={openModalEdit}>
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
              {errors.title? <p className="p-errores">El campo Marca debe ser definido</p> : ""}
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
              <button type="submit" className="btn btn-success" onClick={edit}>Editar</button>
            </div>
          </form>
          <div className="contenedor-boton-modal-fuera">
              <button className="btn btn-danger boton-cancelar" onClick={closeForm}>Cancelar</button>
          </div>
        </ModalBody>
      </Modal>
    )

  }else if(location === "http://localhost:3000/Table/?txt=cellphones"){

    return(

      <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5 style={{float: 'center'}} >Editar Modelo</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <input className="form-control" type="text"  id="modelo" readOnly defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
            <br/>
            <label htmlFor="marca">Modelo</label>
            <input className="form-control" type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.model : ''} {...register('model',{ shouldUnregister: true,})} />
              {errors.model? <p className="p-errores">El campo Modelo debe ser definido</p> : ""}
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="url">Marca</label>
            <select className="form-select" name="select"  required {...register('brand_id')}>
              {dataBrands.map((brand)=>{
                    return <option  key={brand.id} value={brand.id} >{brand.title}</option>
              })}
            </select>
              {errors.brand_id?<p className="p-errores">Haga click en una marca</p> : ""}
            <br/>
            <div className="contenedor-boton-modal-dentro">
              <button className="btn btn-success" type="submit" onClick={edit}>Editar</button> 
            </div>
          </form>
          <div className="contenedor-boton-modal-fuera">
               <button className="btn btn-danger boton-cancelar" onClick={closeForm}>Cancelar</button>
          </div>
        </ModalBody>
      </Modal>
    )
  }else if(location === "http://localhost:3000/Table/?txt=services"){

    return(
      <Modal isOpen={openModalEdit}>
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
              {errors.description? <p className="p-errores">{errors.description}</p>: ""}
            <br />
            <label htmlFor="number">Numero de Telefono</label>
            <input className="form-control" type="text" name="number" id="number"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{ shouldUnregister: true,})} />
              {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
            <br />
            <label htmlFor="direccion">Direccion</label>
            <input className="form-control" type="text" name="direccion" id="direccion"  defaultValue={itemToEdit ? itemToEdit.address : ''}{...register('address',{ shouldUnregister: true,})} />
            <br />
            <label htmlFor="Email">Email</label>
            <input className="form-control" type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
              <button className="btn btn-success" type="submit" onClick={edit}>Editar</button> 
            </div>
          </form>
          <div className="contenedor-boton-modal-fuera">
            <button className="btn btn-danger boton-cancelar" onClick={closeForm}>Cancelar</button>
          </div>
        </ModalBody> 
      </Modal>
    );
  }else if(location === "http://localhost:3000/Table/?txt=customers"){

    return(
      <Modal isOpen={openModalEdit}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center'}} >Editar Cliente</h5> 
          </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
            <label>Numero de Cliente</label>
            <input className="form-control" type="text" readOnly name="id" defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('id',{ shouldUnregister: true,})} />
            <br/>
            <label htmlFor="descripcion">Nombre</label>
            <input className="form-control" type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.name : ''} {...register('name',{ shouldUnregister: true,})} />
              {errors.name? <p className="p-errores">{errors.name}</p>: ""}
            <br />
            <label htmlFor="number">Email</label>
            <input className="form-control" type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{ shouldUnregister: true,})} />
              {errors.email? <p className="p-errores">{errors.email}</p> : ""}
            <br />
            <label htmlFor="direccion">Numero de Telefono</label>
            <input className="form-control" type="text" name="phone" id="phone"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{ shouldUnregister: true,})} />
            {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
            <br />
            <label htmlFor="Email">Numero de Telefono 2</label>
            <input className="form-control" type="text" name="phone2" id="phone2"  defaultValue={itemToEdit ? itemToEdit.phhone_number_2 : ''}{...register('phone_number_2',{ shouldUnregister: true,})} />
            <br />
            <div className="contenedor-boton-modal-dentro">
              <button className="btn btn-success" type="submit" onClick={edit}>Editar</button> 
            </div>
          </form>
          <div className="contenedor-boton-modal-fuera">
            <button className="btn btn-danger boton-cancelar" onClick={closeForm}>Cancelar</button>
          </div>
        </ModalBody> 
      </Modal>
    );
  };
};


export default ModalEdit;