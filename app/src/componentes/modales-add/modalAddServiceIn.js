import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";

 


const ModalAddServiceIn = ({openModalAddService, addServiceInReparation, errorsApi, changeErrorApi, closeFormAdd, dataServices}) =>{


    const { register, handleSubmit, getValues} = useForm ();

    return(
        <Modal isOpen={openModalAddService}>
        <ModalHeader style={{display: 'block'}}>
          <div>
            <h5  style={{float: 'center', color: 'green'}} >Crear Servicio</h5> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(addServiceInReparation)}>
            <label htmlFor="id">Numero de Servicio</label>
            <input className="form-control" type="number" name="id" id="id" readOnly value={dataServices.length + 1} ></input>
            <br />
            <input  style={{ visibility: 'hidden', position: 'absolute' }} {...register("number")}></input>
            <label htmlFor="marca">Descripcion</label>
            <input className={errorsApi.description ? "form-control error" : "form-control"} type="text" name="marca"  {...register('description',{
              onChange: () => changeErrorApi("description"),
              value:null,
              shouldUnregister:true
              })} />
              {errorsApi.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
            <br />
            <label htmlFor="url">Numero de Telefono</label>
            <input className="form-control" type="text" name="numero de telefono" {...register('phone_number',{
              shouldUnregister:true,
              value:null
              })} />
            <br />
            <label htmlFor="url">Direccion</label>
            <input className="form-control" type="text" name="direccion" {...register('address',{
              value:null,
              shouldUnregister:true
              })} />
            <br />
            <label htmlFor="url">Email</label>
            <input className="form-control" type="text" name="email" {...register('email',{
              shouldUnregister:true,
              value:null
              })} />
            <br />
            <hr />
            <div className="contenedor-boton-modal-dentro-reparations">
              <button type="button" className="btn btn-success" onClick={()=>addServiceInReparation(getValues())} >Crear</button>
              <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("service",getValues())}>Cancelar</h1>
            </div>
          </form>
        </ModalBody>
      </Modal> 
    )
}

export default ModalAddServiceIn