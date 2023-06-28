import React from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


const ModalAddCellphone = ({openModalAdd, create, errors, ifChangeModal, changeError, dataApi, handleInputChange, activeInputSearch, filteredBrands, newBrandSelected, closeForm, changeModal, selectBrandActive}) =>{


    const changueValue = () =>{
        if(newBrandSelected.id){
            setValue("brand_id",newBrandSelected.id)
            changeError("brand")
        }
    }

    const { register, handleSubmit, getValues, setValue} = useForm ();
   
    return(
        <Modal isOpen={openModalAdd} onOpened={()=>changueValue()}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  className="h5-modal-add" >Crear celular</h5> 
              </div>
            </ModalHeader>
            <ModalBody className="contenedor-modal-body">
              <form className="form-group" onSubmit={handleSubmit(create)}>
                <label >Numero de Marca</label>
                <input className="form-control" type="number" name="id" readOnly value={`${dataApi.data.length+1}`}  />
                <br/>
                <label >Modelo</label>
                <input className={errors.model ? "form-control error" : "form-control"} type="text" name="modelo" {...register('model',{
                  onChange: () => changeError("model"),
                  value:null,
                  shouldUnregister:ifChangeModal ? false : true,
                  })}/>
                  {errors.model? <p className="p-errores">El campo Modelo debe ser completado</p> : ""}
                <br />
                <label >Url</label>
                <input className="form-control" type="text" name="url" {...register('url',{
                  value:null,
                  shouldUnregister:ifChangeModal ? false : true,
                  })} />
                <br/>
                <label >Marca</label>
                <div className="div-container-select-button">
                <input type="search" onChange={(e)=>handleInputChange(e,"brand")} placeholder="buscar.." className={selectBrandActive ? "input-search brand" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"brand")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className="form-select brand" name="select" defaultValue={newBrandSelected.id ? newBrandSelected.id : "Seleccionar.."} {...register('brand_id',{
                  onChange: () => changeError("brand"),
                  })}>
                    {
                      newBrandSelected.id
                      ?
                      <option className="option-selected" value={newBrandSelected.id ? newBrandSelected.id : null} >{newBrandSelected.title}</option>
                      :
                      <option className="option-selected" value={"Seleccionar"}>Seleccionar..</option>    
                    }
                  {
                    filteredBrands().length >= 1
                    ?
                    filteredBrands().map((brand)=>{
                        return <option className="option-modal" key={brand.id} value={brand.id} >{brand.title}</option>    
                    })
                    :
                    ""
                }
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("brand")}>+</h1>
                </div>
                  {errors.brand_id? <p className="p-errores">Haga click en una marca</p> : ""}
                  <br/>
                  <div className="contenedor-boton-modal-dentro-reparations">
                  <button type="submit" className="btn btn-success" >Crear</button>
                  <h1 className="btn btn-cancelar" onClick={closeForm}>Cancelar</h1>
                </div>
              </form>
            </ModalBody>
          </Modal>

          
    )
}

export default ModalAddCellphone