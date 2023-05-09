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
  }else if(location === "http://localhost:3000/Table/reparations"){

    return(

      <Modal isOpen={openModalView}>
            <ModalHeader style={{display: 'block'}}>
                <div>
                    <h5  style={{float: 'center', color: 'Blue'}} >Datos De la Reparacion</h5> 
                </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" >
                <label>Numero de Reparacion</label>
                <input className="form-control" type="number" name="id" readOnly defaultValue={itemToSee ? itemToSee.id : ""}  />
                <br/>
                <label htmlFor="modelo">Servicio:</label>
                <input className="form-control" type="text" name="modelo" readOnly defaultValue={itemToSee ? itemToSee.service : ""}  />
                <br />
                <label htmlFor="url">Celular:</label>
                <input className="form-control" type="text" name="url" readOnly defaultValue={itemToSee ? itemToSee.cellphone : ""}  />
                <br />
                <label htmlFor="brnad_id">Recibido por:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.customer : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Numero de contacto:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.number : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Email:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.email : ""}></input>
                <br/>
                <label htmlFor="brnad_id">Recibido el:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.notice_date ? itemToSee.notice_date : "No hay fecha": ""  } ></input>
                <br />
                <label htmlFor="brnad_id">Notificaciones al Cliente:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.notice_quantity : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Fecha de entrega:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.delivery_date ? itemToSee.delivery_date : "No hay fecha": ""  } ></input>
                <br />
                <label htmlFor="brnad_id">Costo de Reparacion:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? "$"+itemToSee.cost : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Precio a cobrar:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? "$"+itemToSee.amount : ""} ></input>
                <br />
                <label htmlFor="brnad_id">Falla:</label>
                <textarea className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.failure : ""} ></textarea>
                <br />
                <label htmlFor="brnad_id">Observacion:</label>
                <textarea className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.observation : ""} ></textarea>
                <br />
                <label htmlFor="brnad_id">Inicio del servicio:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.service_start_date ? itemToSee.service_start_date : "No hay fecha": "" } ></input>
                <br />
                <label htmlFor="brnad_id">Finalizacion del servicio:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.service_end_date ? itemToSee.service_end_date : "No hay fecha": "" } ></input>
                <br />
                <label htmlFor="brnad_id">Seguridad:</label>
                <input className="form-control" type="text" readOnly  defaultValue={itemToSee ? itemToSee.has_security === 1 ? "Si": "No" : "No"} ></input>
                <br />
                {
                  (itemToSee)
                  ?
                  (itemToSee.has_security ===1)
                  ?
                  <>
                  <label>Pin:</label>
                  <input className="form-control" type="text" readOnly  defaultValue={itemToSee.pin} ></input>
                  <br />
                  <label>Patron:</label>
                  <input className="form-control" type="text" readOnly  defaultValue={itemToSee.pattern} ></input>
                  <br />
                  </>
                  :
                  ""
                  :
                  ""
                }
                <div className="contenedor-boton-modal-dentro">
                </div>
              </form>
              <div className="contenedor-boton-modal-fuera">
                 <button className="btn btn-danger" onClick={closeForm}>Salir</button>
              </div>
            </ModalBody>
      </Modal>
    )
  }
};

export default ModalView;