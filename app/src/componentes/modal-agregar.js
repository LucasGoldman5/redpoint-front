
import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap'; 
import { useForm } from "react-hook-form";



const ModalAgregar =({agregarMarca,abrirModalAgregar,dataApi,cerrarFormulario,onSubmit}) =>{


const location = window.location.href
const allDate = new Date()
const Day = allDate.getDay()
const month = allDate.getMonth()
const year = allDate.getFullYear()
const hours = allDate.getHours()
const minutes = allDate.getMinutes()
const date= `${Day}/${month}/${year}  Hora: ${hours}:${minutes}`;


const { register, formState: { errors }, handleSubmit} = useForm ();


if(location === "http://localhost:3000/Tabla/?txt=cellphones"){



  return(

        <Modal isOpen={abrirModalAgregar}>
            <ModalHeader style={{display: 'block'}}>
                <div>
                    <h5  style={{float: 'center', color: 'red'}} >Crear celular</h5> 
                </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="modelo">Modelo</label>
                <input className="form-control" type="text" name="modelo" {...register('model',{
                  required:true
                })} />
                {errors.model?.type === 'required' && <p >El campo Modelo debe ser completado</p>}
                <br />
                <label htmlFor="url">Url</label>
                <input className="form-control" type="text" name="url" {...register('url')} />
                <label htmlFor="brnad_id">Brand_id</label>
                <input className="form-control" type="number" readOnly value={2}{...register('brand_id')}></input>
                <div>
                    <button type="submit" className="btn btn-success" onClick={agregarMarca} >
                    Crear
                  </button>
                  <button className="btn btn-danger" onClick={cerrarFormulario}>Cancelar</button>
                </div>
              </form>
            </ModalBody>
      </Modal>


    )
}else if(location==="http://localhost:3000/Tabla/?txt=brands"){
  return(

    <Modal isOpen={abrirModalAgregar}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center', color: 'red'}} >Crear Marca</h5> 
            </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group" >
                <label htmlFor="id">Numero de orden</label>
                <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length + 1} ></input>
                <br />
                <label htmlFor="marca">Marca</label>
                <input className="form-control" type="text" name="marca" required  />
                <br />
                <label htmlFor="url">Url</label>
                <input className="form-control" type="text" name="url" required  />
          </div>
        </ModalBody>
        <ModalFooter>
            <button  className="btn btn-success" onClick={agregarMarca} >
            Crear
          </button>

            <button className="btn btn-danger" onClick={cerrarFormulario}>Cancelar</button>
        </ModalFooter>
  </Modal>

  )
 }

  
}


export default ModalAgregar;

