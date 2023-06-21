import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";


const ModalAddCustomer = ({openModalAdd, create, errors, changeError, closeForm}) =>{


    const { register, handleSubmit} = useForm ();

    return(
        <Modal isOpen={openModalAdd}>
        <ModalHeader style={{display: 'block'}}>
          <div>
          <h5  className="h5-modal-add" >Crear Cliente</h5> 
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
            <label >Numero de Telefono</label>
            <input className={errors.phone_number ? "form-control error" : "form-control"} type="text" name="phone" {...register('phone_number',{
              onChange: () => changeError("phone_number"),
              value:null,
              shouldUnregister:true
              })} />
              {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
            <br />
            <label >Numero de telefono 2</label>
            <input className="form-control" type="text" name="phone_2" {...register('phhone_number_2',{
              value:null,
              shouldUnregister:true
              })} />
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

export default ModalAddCustomer