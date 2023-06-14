import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const ModalEditCellphone = ({openModalEdit, onsubmit, itemToEdit, changeError, changeModal, errors, edit, closeForm, handleInputChange, selectBrandActive, newBrandSelectedEdit, filteredBrands, activeInputSearch}) =>{


    const changeValue = () =>{
        if(newBrandSelectedEdit.id){
            setValue("brand_id",newBrandSelectedEdit.id)
        }
    }

    const { register, handleSubmit, setValue, getValues} = useForm ();

    return(
        <Modal isOpen={openModalEdit} onOpened={() => changeValue()}>
          <ModalHeader style={{display: 'block'}}>
            <div>
              <h5 style={{float: 'center', color:'gold'}} >Editar Modelo</h5> 
            </div>
          </ModalHeader>
          <ModalBody>
            <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
              <input className="form-control" type="text"  id="modelo" readOnly defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
              <br/>
              <label >Modelo</label>
              <input className={errors.model ? "form-control error" : "form-control"} type="text" name="modelo" id="modelo"  defaultValue={itemToEdit ? itemToEdit.model : ''} {...register('model',{
                 onChange: () => changeError("model"),
                 })} />
                {errors.model? <p className="p-errores">El campo Modelo debe ser definido</p> : ""}
              <br />
              <label >Url</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url')} />
              <br />
              <label >Marca</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className="form-select" name="select"  defaultValue={itemToEdit && itemToEdit.brand_id && newBrandSelectedEdit.length < 1 ? itemToEdit.brand_id.id : newBrandSelectedEdit.length > 0 ? newBrandSelectedEdit.id : null} {...register('brand_id',{ 
                  shouldUnregister:true,
                  onChange: () => changeError("brand"),
                  })}>
                  {
                    newBrandSelectedEdit.id
                    ?
                    <option className={errors.brand_id ? "option-selected error" : "option-selected"} value={newBrandSelectedEdit.id}>{newBrandSelectedEdit.title}</option>
                    :
                    <option className={errors.brand_id ? "option-selected error" : "option-selected"} value={itemToEdit ? itemToEdit.brand_id ? itemToEdit.brand_id.brand : null : null}>{itemToEdit ? itemToEdit.brand_id ? itemToEdit.brand_id.brand : "Seleccione una Marca" : null}</option>
                  }
                  {filteredBrands.map((brand)=>{
                      return <option  key={brand.id} value={brand.id} >{brand.title}</option>
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
              </div>
                {errors.brand_id?<p className="p-errores">Haga click en una marca</p> : ""}
              <br/>
              <div className="contenedor-boton-modal-dentro">
                <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
                <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1> 
              </div>
            </form>
          </ModalBody>
        </Modal>
    )
}

export default ModalEditCellphone