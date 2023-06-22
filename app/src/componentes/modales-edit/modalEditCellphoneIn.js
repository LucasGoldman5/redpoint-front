import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const ModalEditCellphoneIn = ({openModalAddCellphoneEdit, addCellphoneInReparationEdit, changeErrorApi, changeModal, errorsApi, closeFormAdd, handleInputChange, selectBrandActive, newBrandSelectedEdit, filteredBrands, activeInputSearch, dataCellphonesEdit}) =>{


    const changeValue = () =>{
        if(newBrandSelectedEdit.id){
            setValue("brand_id",newBrandSelectedEdit.id)
        }
    }

    const { register, handleSubmit, setValue, getValues} = useForm ();

    return(
        <Modal isOpen={openModalAddCellphoneEdit} onOpened={()=> changeValue()}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color: 'green'}} >Crear celular</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(addCellphoneInReparationEdit)}>
                <label >Numero de Celular</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataCellphonesEdit.length+1}`}  />
                <br/>
                <label >Modelo</label>
                <input className={errorsApi.model ? "form-control error" : "form-control"} type="text" name="modelo" {...register('model',{
                  value:null,
                  onChange: () => changeErrorApi("model"),
                  })}/>
                  {errorsApi.model? <p className="p-errores">El campo Modelo debe ser completado</p> : ""}
                <br />
                <label >Url</label>
                <input className="form-control" type="text" name="url" {...register('url',{
                  value:null
                  })} />
                <br/>
                <label >Marca</label>
                <div className="div-container-select-button">
                <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
                <select className={errorsApi.brand_id ? "form-select error" : "form-select"} name="select" defaultValue={newBrandSelectedEdit.title ? newBrandSelectedEdit.id : null}{...register('brand_id',{
                   shouldUnregister: true,
                   onChange: () => changeErrorApi("brand_id"),
                   })}>
                        {
                          (newBrandSelectedEdit.id)
                          ?
                           <option value={newBrandSelectedEdit.id}>{newBrandSelectedEdit.title}</option>
                          :
                          <option >Seleccionar..</option>
                        }
                  {filteredBrands().map((brand)=>{
                      return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errorsApi.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                <br/>  
                <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="button" className="btn btn-success" onClick={()=>addCellphoneInReparationEdit(getValues())} >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={()=>closeFormAdd("cellphone",getValues())}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>
    )
}

export default ModalEditCellphoneIn