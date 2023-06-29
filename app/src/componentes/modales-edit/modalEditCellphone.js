import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faXmark } from '@fortawesome/free-solid-svg-icons';


const ModalEditCellphone = ({openModalEdit, onsubmit, itemToEdit, changeError, changeModal, errors, edit, closeForm, handleInputChange, selectBrandActive, newBrandSelectedEdit, filteredBrands, activeInputSearch}) =>{


    const changeValue = () =>{
        if(newBrandSelectedEdit.id){
            setValue("brand_id",newBrandSelectedEdit.id)
        }
    }

    const { register, handleSubmit, setValue, getValues} = useForm ();

    return(
        <Modal isOpen={openModalEdit} onOpened={() => changeValue()}>
          <ModalHeader style={{display: 'block', color:'gold'}}>
            <div className="div-title-modal">
              <h5  style={{float: 'center'}} >{`Editar Modelo #${itemToEdit.id}`}</h5>
              <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
            </div>
          </ModalHeader>
          <ModalBody>
            <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
              <input  type="text"  style={{visibility:"hidden", position:"absolute"}} readOnly defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
              <label >Marca</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className="form-select"  defaultValue={itemToEdit && newBrandSelectedEdit == [] ? itemToEdit.brand_id.id ? itemToEdit.brand_id.id : "" : newBrandSelectedEdit.length > 0 ? newBrandSelectedEdit.id : null} {...register('brand_id',{ 
                  shouldUnregister:true,
                  onChange: () => changeError("brand"),
                  })}>
                  {
                    newBrandSelectedEdit.id
                    ?
                    <option className={errors.brand_id ? "option-selected error" : "option-selected"} value={newBrandSelectedEdit.id}>{newBrandSelectedEdit.title}</option>
                    :
                    itemToEdit.brand_id
                    ?
                    <option style={{visibility:"hidden", display:"none"}} value={itemToEdit.brand_id.id}>{itemToEdit.brand_id.brand ? itemToEdit.brand_id.brand : ""}</option>
                    :
                    <option className={errors.brand_id ? "option-selected error" : "option-selected"} value={null}>Seleccionar</option>
                  }
                  {
                    filteredBrands().length >= 1
                    ?
                    filteredBrands().map((brand)=>{
                      return <option className={itemToEdit ? itemToEdit.brand_id ? itemToEdit.brand_id.id  == brand.id ? "option-selected" :"option-modal" : "option-modal" : "option-modal"}   key={brand.id} value={brand.id} >{brand.title}</option>
                    })
                    :
                    ""
                  }
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
              </div>
                {errors.brand_id?<p className="p-errores">Haga click en una marca</p> : ""}
              <br/>
              <label >Modelo</label>
              <input className={errors.model ? "form-control error" : "form-control"} type="text"   defaultValue={itemToEdit ? itemToEdit.model : ''} {...register('model',{
                 onChange: () => changeError("model"),
                 })} />
                {errors.model? <p className="p-errores">El campo Modelo debe ser definido</p> : ""}
              <br />
              <label >Url</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.url : ''}{...register('url')} />
              <br />
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