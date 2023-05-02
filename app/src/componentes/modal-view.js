import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 



const ModalView = ({ closeForm, openModalView, itemToSee }) =>{

  const location = window.location.href;
    
  if(location === "http://localhost:3000/Table/cellphones"){

    return(

      <Modal isOpen={openModalView}>
          <ModalHeader style={{display: 'block'}}>
              <div>
                 <h5  style={{float: 'center', color: 'red'}} >Datos Del Celular</h5> 
              </div>
          </ModalHeader>
          <ModalBody>
            <form className="form-group" >
              <label htmlFor="modelo">Modelo:</label>
              <input className="form-control" type="text" name="modelo" readOnly defaultValue={itemToSee ? itemToSee.model : ""}  />
              <br />
              <label htmlFor="url">Url:</label>
              <input className="form-control" type="text" name="url" readOnly defaultValue={itemToSee ? itemToSee.url : ""}  />
              <br />
              <label htmlFor="brnad_id">Marca:</label>
              <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.brand_id : ""} ></input>
              <br />
              <div className="contenedor-boton-modal-dentro">
              </div>
            </form>
            <div className="contenedor-boton-modal-fuera">
              <button className="btn btn-danger" onClick={closeForm}>Salir</button>
            </div>
          </ModalBody>
      </Modal>
    )
  }else if(location === "http://localhost:3000/Table/brands"){

    return(

      <Modal isOpen={openModalView}>
          <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'red'}} >Datos De la Marca</h5> 
              </div>
          </ModalHeader>
          <ModalBody>
              <form className="form-group" >
                <input className="form-control" type="number" name="id" readOnly defaultValue={itemToSee ? itemToSee.id : ""}  />
                <label htmlFor="modelo">Marca:</label>
                <input className="form-control" type="text" name="modelo" readOnly defaultValue={itemToSee ? itemToSee.title : ""}  />
                <br />
                <label htmlFor="url">Url:</label>
                <input className="form-control" type="text" name="url" readOnly defaultValue={itemToSee ? itemToSee.url : ""}  />
                <br />
                <label htmlFor="url">Descripcion:</label>
                <input className="form-control" type="text" name="description" readOnly defaultValue={itemToSee ? itemToSee.description : ""}  />
                <br />
                <div className="contenedor-boton-modal-dentro">
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                <button className="btn btn-danger" onClick={closeForm}>Salir</button>
              </div>
          </ModalBody>
      </Modal>
    )

  }else if(location === "http://localhost:3000/Table/services"){

    return(

        <Modal isOpen={openModalView}>
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
                 <button className="btn btn-danger" onClick={closeForm}>Salir</button>
              </div>
            </ModalBody>
      </Modal>
    )
 }else if(location === "http://localhost:3000/Table/customers"){
    
    return(

        <Modal isOpen={openModalView}>
            <ModalHeader style={{display: 'block'}}>
                <div>
                    <h5  style={{float: 'center', color: 'red'}} >Datos Del Cliente</h5> 
                </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" >
                <label>Numero de Cliente</label>
                <input className="form-control" type="number" name="id" readOnly defaultValue={itemToSee ? itemToSee.id : ""}  />
                <label htmlFor="nombre">Nombre:</label>
                <input className="form-control" type="text" name="name" readOnly defaultValue={itemToSee ? itemToSee.name : ""}  />
                <br />
                <label htmlFor="brnad_id">Email:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.email : ""} ></input>
                <br />
                <label htmlFor="url">Numero de Celular:</label>
                <input className="form-control" type="text" name="phone" readOnly defaultValue={itemToSee ? itemToSee.phone_number : ""}  />
                <br />
                <label htmlFor="brnad_id">Numero de celular 2:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.phhone_number_2 : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Rol:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.rol : ""} ></input>
                <br />
                <div className="contenedor-boton-modal-dentro">
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                 <button className="btn btn-danger" onClick={closeForm}>Salir</button>
              </div>
            </ModalBody>
      </Modal>
    );
  };
};

export default ModalView;