import React, {useState} from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import HelperBuildRequest from "../../helpers/buildRequest";
import { useForm } from "react-hook-form";


const ModalEditUser = ({openModalEdit, onsubmit, itemToEdit, changeError, errors, edit, closeForm, enviroment, dataRolesEdit}) =>{

    
    const local = enviroment.selfUrl.main;
    const [newHash, setNewHash] = useState(true);

    const changePass = async (data) =>{

        const ent = enviroment.entities;
        const id = data.id; 
    
        try{
    
          const config = await HelperBuildRequest("GET", data, "dataTable");
          const request = await fetch(`${enviroment.apiURL.url}${ent.users}/${ent.recovery}${id}`, config);
          
            if(request.status === 200){
                const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{
                  setValue("pass",local+enviroment.selfUrl.generatePass+"#"+response.data.hash)
                  setNewHash(false);
                };
            };
        }catch(error){
          console.log(error)
        };    
    
      }


    const { register, handleSubmit, setValue, getValues} = useForm ();

    return(
        <Modal isOpen={openModalEdit}>
            <ModalHeader style={{display: 'block'}}>
              <div>
                <h5  style={{float: 'center', color:'gold'}} >Editar Usuario</h5> 
              </div>
            </ModalHeader>
            <ModalBody>
              <form className="form-group" onSubmit={handleSubmit(onsubmit)}>
                <input style={{ visibility: 'hidden', position: 'absolute' }} type="text" readOnly name="id" defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('id',{ shouldUnregister: true,})} />
                <input style={{ visibility: 'hidden', position: 'absolute' }} type="text" readOnly name="last_connection" defaultValue={itemToEdit ? itemToEdit.last_connection : null} {...register('last_connection',{ shouldUnregister: true,})} />
                <label >Nombre</label>
                <input className={errors.name ? "form-control error" : "form-control"} type="text" name="name" id="name"  defaultValue={itemToEdit ? itemToEdit.name : ''} {...register('name',{
                  shouldUnregister: true,
                  onChange: () => changeError("name"),
                  })} />
                  {errors.name? <p className="p-errores">{errors.name}</p>: ""}
                <br />
                <label>Generar contraseña en:</label>
                <input className="form-control" type="text" readOnly defaultValue={itemToEdit ? itemToEdit.hash ? local+enviroment.selfUrl.generatePass+"#"+itemToEdit.hash : `La contraseña ya fue creada para ${itemToEdit.name}` : ""} {...register('pass',{ shouldUnregister:true })}></input>
                <br/>
                {
                  itemToEdit
                  ?
                  !itemToEdit.hash
                  ?
                  <>
                  <div className={newHash ? "container-button-change-pass" : "container-button-change-pass-none" }>
                    <button className="button-change-pass" onClick={()=>changePass(getValues())} type="button">Cambiar contraseña</button>
                    <br/>
                  </div>
                  </>
                  :
                  ""
                  :
                  ""
                }
                <label >Email</label>
                <input className={errors.email ? "form-control error" : "form-control"} type="text" name="email" id="email"  defaultValue={itemToEdit ? itemToEdit.email : ''}{...register('email',{
                  shouldUnregister: true,
                  onChange: (e) => changeError("email",e.target.value),
                  })} />
                  {errors.email? <p className="p-errores">{errors.email}</p> : ""}
                <br />
                <label >Numero de Telefono</label>
                <input className={errors.phone_number ? "form-control error" : "form-control"} type="text" name="phone" id="phone"  defaultValue={itemToEdit ? itemToEdit.phone_number : ''}{...register('phone_number',{ 
                  shouldUnregister: true,
                  onChange: () => changeError("phone_number"),
                  })} />
                {errors.phone_number? <p className="p-errores">{errors.phone_number}</p> : ""}
                <br />
                <label >Activo:</label>
                <input className="input-check" type="checkbox"   defaultChecked={itemToEdit ? itemToEdit.active : false} {...register('active',{
                  shouldUnregister: true,
                  })} />
                <br />
                <br/>
                <label >Rol</label>
                <select  className={errors.rol_id ? "form-select  error" : "form-select brand"} defaultValue={itemToEdit ? itemToEdit.rol_id ? itemToEdit.rol_id.id : "" : ""}  name="select"  {...register('rol_id',{
                      onChange: () => changeError("rol_id"),
                      })}>
                      <option value={itemToEdit ? itemToEdit.rol_id.rol : null} className="option-selected">{itemToEdit ? dataRolesEdit.map((rol)=>{
                        if(rol.id == itemToEdit.rol_id.id){
                          return rol.description
                        }
                      }): ""}</option>
                      {dataRolesEdit.map((rol)=>{
                        return <option className="option-modal" key={rol.id} value={rol.id} >{rol.description}</option>                     
                      })}
                </select>
                {errors.rol_id ? <p className="p-errores">El campo Rol debe ser seleccionado</p> : ""}
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

export default ModalEditUser