
import React, { useEffect } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import './modales.css'



const ModalAgregar =({agregar,cambiarModal,abrirModalAgregar,abrirModalAgregarMarca,dataApi,cerrarFormulario,onSubmit,onSubmitMarca,dataBrands,errores,agregarMarcaEnCellphones, clasesErrores}) =>{


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

       <>
          <Modal isOpen={abrirModalAgregar}>
            <ModalHeader style={{display: 'block'}}>
                <div>
                    <h5  style={{float: 'center', color: 'red'}} >Crear celular</h5> 
                </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id">Numero de Marca</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataApi.data.length+1}`}  />
                <br/>
                <label htmlFor="modelo">Modelo</label>
                <input className="form-control" type="text" name="modelo" {...register('model',{
                  value:null
                })} />
                {errores.model? <p className="p-errores">El campo Modelo debe ser completado</p> : ""}
                <br />
                <label htmlFor="url">Url</label>
                <input className="form-control" type="text" name="url" {...register('url',{
                  value:null
                })} />
                <br/>
                <label htmlFor="brnad_id">Marca</label>
                <select className="form-select" name="select"  {...register('brand_id',{
                  value:null
                })}>
                  {dataBrands.map((brand)=>{
                    return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                {errores.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <div className="contenedor-boton-modal-dentro">
                    <button type="submit" className="btn btn-success" onClick={agregar} >
                    Crear
                  </button>
                </div>
              </form>
              <button className={clasesErrores ? "option-modal-crear-errores" :"option-modal-crear"} onClick={cambiarModal}>+</button>
              <div className="contenedor-boton-modal-fuera">
                 <button className="btn btn-danger" onClick={cerrarFormulario}>Cancelar</button>
              </div>
            </ModalBody>
      </Modal>

      <Modal isOpen={abrirModalAgregarMarca}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center', color: 'red'}} >Crear Marca</h5> 
            </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onSubmitMarca)}>
                <br />
                <label htmlFor="marca">Marca</label>
                <input className="form-control" type="text" name="marca"  {...register('title')} />
                {errores.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
                <label htmlFor="url">Descripcion</label>
                <input className="form-control" type="text" name="url" {...register('description',{
                  value:null
                })} />
                <label htmlFor="url">Url</label>
                <input className="form-control" type="text" name="url"  {...register('url',{
                  value:null
                })} />
                <br/>
                <div className="contenedor-boton-modal-dentro">
                    <button type="submit" className="btn btn-success" onClick={agregarMarcaEnCellphones} >
                    Crear
                  </button>
                </div>  
          </form>
          <div className="contenedor-boton-modal-fuera">
            <button className="btn btn-danger" onClick={cerrarFormulario}>Cancelar</button>
          </div>
        </ModalBody>
      </Modal>

       </>

       
    )
}else if(location==="http://localhost:3000/Tabla/?txt=brands" ){
  return(

    <Modal isOpen={abrirModalAgregar}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center', color: 'red'}} >Crear Marca</h5> 
            </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id">Cantidad de marcas actuales</label>
                <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length} ></input>
                <br />
                <label htmlFor="marca">Marca</label>
                <input className="form-control" type="text" name="marca"  {...register('title')} />
                {errores.title? <p className="p-errores">El campo Marca debe ser completado</p> : ""}
                <br />
                <label htmlFor="url">Descripcion</label>
                <input className="form-control" type="text" name="url" {...register('description',{
                  value:null
                })} />
                <br/>
                <label htmlFor="url">Url</label>
                <input className="form-control" type="text" name="url"  {...register('url',{
                  value:null
                })} />
                <br/>
                <div className="contenedor-boton-modal-dentro">
                    <button type="submit" className="btn btn-success" onClick={agregar} >
                    Crear
                  </button>
                </div>  
          </form>
          <div className="contenedor-boton-modal-fuera">
            <button className="btn btn-danger" onClick={cerrarFormulario}>Cancelar</button>
          </div>
        </ModalBody>
  </Modal>

  )
 }else if(location === "http://localhost:3000/Tabla/?txt=services"){
    return(
      <Modal isOpen={abrirModalAgregar}>
        <ModalHeader style={{display: 'block'}}>
            <div>
                <h5  style={{float: 'center', color: 'red'}} >Crear Servicio</h5> 
            </div>
        </ModalHeader>
        <ModalBody>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id">Numero de Servicio</label>
                <input className="form-control" type="number" name="id" id="id" readOnly value={dataApi.data.length + 1} ></input>
                <br />
                <label htmlFor="marca">Descripcion</label>
                <input className="form-control" type="text" name="marca"  {...register('description',{
                  value:null
                })} />
                {errores.description? <p className="p-errores">El campo Descripcion debe ser completado</p> : ""} 
                <br />
                <label htmlFor="url">Numero de Telefono</label>
                <input className="form-control" type="text" name="numero de telefono" {...register('phone_number',{
                  value:null
                })} />
                <br />
                <label htmlFor="url">Direccion</label>
                <input className="form-control" type="text" name="direccion" {...register('address',{
                  value:null
                })} />
                <br />
                <label htmlFor="url">Email</label>
                <input className="form-control" type="text" name="email" {...register('email',{
                  value:null
                })} />
                <br />
                <hr />
                <div className="contenedor-botones-modal">
                    <button type="submit" className="btn btn-success" onClick={agregar} >
                    Crear
                  </button>
                  <button className="btn btn-danger" onClick={cerrarFormulario}>Cancelar</button>
                </div>
          </form>
        </ModalBody>
  </Modal>
    )
 }

  
}


export default ModalAgregar;

