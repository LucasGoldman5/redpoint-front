import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 


const ModalEditar = ({abrirModalEditar, itemToEdit, enviarData, cerrarFormulario, datosEnvio}) => {

  const location = window.location.href
const allDate = new Date()
const Day = allDate.getDay()
const month = allDate.getMonth()
const year = allDate.getFullYear()
const hours = allDate.getHours()
const minutes = allDate.getMinutes()
const date= `${Day}/${month}/${year}  Hora: ${hours}:${minutes}`;

if(location ==="http://localhost:3000/Tabla/?txt=brands" ){

  return(

    <Modal isOpen={abrirModalEditar}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center'}} >Editar Marca</h5> 
            </div>
         
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input className="form-control" type="number" name="id" id="id" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''}></input>
            <br />
            <label htmlFor="marca">Marca</label>
            <input className="form-control" type="text" name="marca" id="marca"  defaultValue={itemToEdit ? itemToEdit.marca : ''}/>
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''} />
          </div>
        </ModalBody>

        <ModalFooter>
            <button className="btn btn-success" onClick={() => enviarData(datosEnvio)}>
            Editar
          </button>

            <button className="btn btn-danger" onClick={cerrarFormulario}>
              Cancelar
              </button>
        </ModalFooter>
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
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input className="form-control" type="number" name="id" id="id" readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''}></input>
            <br />
            <label htmlFor="marca">Modelo</label>
            <input className="form-control" type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.model : ''}/>
            <br />
            <label htmlFor="url">Url</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? itemToEdit.url : ''} />
            <br />
            <label htmlFor="url">Brand_Id</label>
            <input className="form-control" type="text" name="brand_id" id="Brand_id"  readOnly defaultValue={itemToEdit ? itemToEdit.brand_id : ''} />
            <br />
            <label htmlFor="url">Nueva fecha de creacion</label>
            <input className="form-control" type="text" name="url" id="url"  defaultValue={itemToEdit ? date : ''} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-success" onClick={() => enviarData(datosEnvio)}>
            Editar
          </button>

            <button className="btn btn-danger" onClick={cerrarFormulario}>
              Cancelar
              </button>
        </ModalFooter>
  </Modal>
   )
}

    
}


export default ModalEditar