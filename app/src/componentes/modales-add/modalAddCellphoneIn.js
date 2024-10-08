import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faXmark } from '@fortawesome/free-solid-svg-icons';



const ModalAddCellphoneIn = ({openModalAddCellphone, addCellphoneInReparation, ifChangeModal, errorsApi, changeErrorApi, changeModal, closeFormAdd, handleInputChange, activeInputSearch, dataCellPhones, newBrandSelected, selectBrandActive, filteredBrands}) =>{

    const changeValue = () =>{
        if(newBrandSelected.id){
            setValue("brand_id",newBrandSelected.id)
            changeErrorApi("brand_id")
        }
    }

    const { register, handleSubmit, getValues, setValue} = useForm ();

    return(
        <Modal isOpen={openModalAddCellphone} onOpened={()=> changeValue()}>
        <ModalHeader style={{display: 'block'}}>
          <div className="div-title-modal">
            <h5  className="h5-modal-add" >Crear Celular</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={()=>closeFormAdd("cellphone",getValues())} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group" onSubmit={handleSubmit(addCellphoneInReparation)}>
            <label >Marca</label>
            <div className="div-container-select-button">
            <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
            <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
            <select  className={errorsApi.brand_id ? "form-select error" : "form-select"} name="select" defaultValue={newBrandSelected.id ? newBrandSelected.id : ""}  {...register('brand_id',{
              onChange: () => changeErrorApi("brand_id"),
              shouldUnregister:true,
              })}>
                {
                  newBrandSelected.id
                  ?
                  <option className="option-selected" value={newBrandSelected.id} >{newBrandSelected.title}</option>
                  :
                  <option className="option-selected">Seleccionar..</option>    
                }
              {filteredBrands().map((brand)=>{
                  return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
              })}
            </select>
            <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
            </div>
              {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
            <br/>
            <label >Modelo</label>
            <input className={errorsApi.model ? "form-control error" : "form-control"} type="text" name="modelo" {...register('model',{
              onChange: () => changeErrorApi("model"),
              value:null,
              shouldUnregister:ifChangeModal ? false : true,
              })}/>
              {errorsApi.model? <p className="p-errores">El campo Modelo debe ser completado</p> : ""}
            <br />
            <label >Url</label>
            <input className="form-control" type="text" name="url" {...register('url',{
              value:null,
              shouldUnregister:ifChangeModal ? false : true,
              })} />
            <br/>  
            <div className="contenedor-boton-modal-dentro-reparations">
              <button type="button" className="btn btn-success" onClick={()=>addCellphoneInReparation(getValues())} >Crear</button>
              <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("cellphone",getValues())}>Cancelar</h1>
            </div>
          </form>
        </ModalBody>
      </Modal>  
    )
}

export default ModalAddCellphoneIn