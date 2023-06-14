import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";


const ModalEditServiceIn = ({openModalAddServiceEdit, addServiceInReparationEdit, changeErrorApi, errorsApi, closeFormAdd, dataServicesEdit}) =>{



    const { register, handleSubmit, getValues} = useForm ();

    return(
        <Modal isOpen={openModalAddServiceEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear Servicio</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addServiceInReparationEdit)}>
                <label >Numero de Servicio</label>
                <input className="form-control" type="number" name="id" id="id" readOnly value={dataServicesEdit.length + 1} ></input>
                <br />
                <label >Descripcion</label>
                <input className={errorsApi.description ? "form-control error" : "form-control"} type="text" name="marca"  {...register('description',{
                  value:null,
                  shouldUnregister:true,
                  onChange: () => changeErrorApi("description"),
                  })} />
                  {errorsApi.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
                <br />
                <label >Numero de Telefono</label>
                <input className={errorsApi.phone_number ? "form-control error" : "form-control"} type="text" name="numero de telefono" {...register('phone_number',{
                  value:null,
                  shouldUnregister:true,
                  onChange: () => changeErrorApi("phone_number"),
                  })} />
                  {errorsApi.phone_number? <p className="p-errores">El campo Numero de telefono debe ser completado</p> : ""} 
                <br />
                <label >Direccion</label>
                <input className="form-control" type="text" name="direccion" {...register('address',{
                  value:null,
                  shouldUnregister:true,
                  })} />
                <br />
                <label >Email</label>
                <input className={errorsApi.email ? "form-control error" : "form-control"} type="text" name="email" {...register('email',{
                  value:null,
                  shouldUnregister:true,
                  onChange: (e) => changeErrorApi("email",e.target.value),
                  })} />
                  {errorsApi.email? <p className="p-errores">{errorsApi.email}</p> : ""} 
                <br />
                <hr />
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addServiceInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("service",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
    )
}

export default ModalEditServiceIn