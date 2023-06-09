import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";



const ModalAddBrandIn = ({openModalAddBrand, onSubmitBrand, errorsApi, changeErrorApi, closeFormAdd}) =>{


    const { register, handleSubmit, getValues} = useForm ();

    return(
            <Modal isOpen={openModalAddBrand}>
                <ModalHeader style={{display: 'block'}}>
                <div>
                <h5  className="h5-modal-add" >Crear Marca</h5> 
                </div>
                </ModalHeader>
                <ModalBody className="contenedor-modal-body">
                <form className="form-group" onSubmit={handleSubmit(onSubmitBrand)}>
                    <br />
                    <label htmlFor="marca">Marca</label>
                    <input className={errorsApi.title ? "form-control error" : "form-control"} type="text" name="marca"  {...register('title',{
                    onChange: () => changeErrorApi("title"),
                    shouldUnregister:true,
                    })} />
                    {errorsApi.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                    <br />
                    <label htmlFor="url">Descripcion</label>
                    <input className="form-control" type="text" name="url" {...register('description',{
                    value:null,
                    shouldUnregister:true,
                    })} />
                    <br />
                    <label htmlFor="url">Url</label>
                    <input className="form-control" type="text" name="url"  {...register('url',{
                    value:null,
                    shouldUnregister:true,
                    })} />
                    <br/>
                    <div className="contenedor-boton-modal-dentro-reparations">
                    <button type="button" className="btn btn-success" onClick={()=>onSubmitBrand(getValues())} >Crear</button>
                    <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("brand")}>Cancelar</h1>
                    </div>
                </form>
                </ModalBody>
            </Modal>
    )
}

export default ModalAddBrandIn