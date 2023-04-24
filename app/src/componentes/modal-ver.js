import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 



const ModalVer = ({cerrarFormulario, abrirModalVer, itemToSee}) =>{

    const location = window.location.href

  
    
    if(location === "http://localhost:3000/Tabla/?txt=cellphones"){

  return(

        <Modal isOpen={abrirModalVer}>
            <ModalHeader style={{display: 'block'}}>
                <div>
                    <h5  style={{float: 'center', color: 'red'}} >Datos Del Celular</h5> 
                </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" >
                <input className="form-control" type="number" name="id" readOnly defaultValue={itemToSee ? itemToSee.id : ""}  />
                <label htmlFor="modelo">Modelo:</label>
                <input className="form-control" type="text" name="modelo" readOnly defaultValue={itemToSee ? itemToSee.model : ""}  />
                <br />
                <label htmlFor="url">Url:</label>
                <input className="form-control" type="text" name="url" readOnly defaultValue={itemToSee ? itemToSee.url : ""}  />
                <br />
                <label htmlFor="brnad_id">Brand_id:</label>
                <input className="form-control" type="number" readOnly  defaultValue={itemToSee ? itemToSee.brand_id : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Creado el:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? new Date(itemToSee.created_at).toLocaleString() : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Subido el:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? new Date(itemToSee.updated_at).toLocaleString() : ""} ></input>
                <br />
                <div className="contenedor-boton-modal-dentro">
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                 <button className="btn btn-danger" onClick={cerrarFormulario}>Salir</button>
              </div>
            </ModalBody>
      </Modal>
    )
 }else if(location ==="http://localhost:3000/Tabla/?txt=brands"){

    return(

        <Modal isOpen={abrirModalVer}>
            <ModalHeader style={{display: 'block'}}>
                <div>
                    <h5  style={{float: 'center', color: 'red'}} >Datos De la Marca</h5> 
                </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" >
                <input className="form-control" type="number" name="id" readOnly defaultValue={itemToSee ? itemToSee.id : ""}  />
                <label htmlFor="modelo">Marca:</label>
                <input className="form-control" type="text" name="modelo" readOnly defaultValue={itemToSee ? itemToSee.marca : ""}  />
                <br />
                <label htmlFor="url">Url:</label>
                <input className="form-control" type="text" name="url" readOnly defaultValue={itemToSee ? itemToSee.url : ""}  />
                <br />
                <div className="contenedor-boton-modal-dentro">
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                 <button className="btn btn-danger" onClick={cerrarFormulario}>Salir</button>
              </div>
            </ModalBody>
      </Modal>


    )
 }else if(location === "http://localhost:3000/Tabla/?txt=services"){
    return(

        <Modal isOpen={abrirModalVer}>
            <ModalHeader style={{display: 'block'}}>
                <div>
                    <h5  style={{float: 'center', color: 'red'}} >Datos Del Servicio</h5> 
                </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" >
                <input className="form-control" type="number" name="id" readOnly defaultValue={itemToSee ? itemToSee.id : ""}  />
                <label htmlFor="modelo">Descripcion:</label>
                <input className="form-control" type="text" name="modelo" readOnly defaultValue={itemToSee ? itemToSee.description : ""}  />
                <br />
                <label htmlFor="url">Numero de Celular:</label>
                <input className="form-control" type="text" name="url" readOnly defaultValue={itemToSee ? itemToSee.phone_number : ""}  />
                <br />
                <label htmlFor="brnad_id">Email:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.email : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Creado el:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? new Date(itemToSee.created_at).toLocaleString() : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Subido el:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? new Date(itemToSee.updated_at).toLocaleString()  : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Direccion:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.address : ""} ></input>
                <br />
                <div className="contenedor-boton-modal-dentro">
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                 <button className="btn btn-danger" onClick={cerrarFormulario}>Salir</button>
              </div>
            </ModalBody>
      </Modal>
    )
 }
}

export default ModalVer;