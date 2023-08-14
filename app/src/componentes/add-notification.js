import React, { useState, Component } from "react";
import './add-notification.css'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import HelperBuildRequest from '../helpers/buildRequest';

const AddNotification = ({closeModalAdd,openModalCreateNoti,itemToEdit,enviroment,notifications}) =>{

    const actualityDate = new Date();
    const [placeHolder, setPlaceHolder] = useState("Ej: 3425857245")
    const [errors, setErrors] = useState({});

    const create = async (values) =>{
        
        const apiURL = enviroment.apiURL
        const entities = enviroment.entities
        try {

            const config = await HelperBuildRequest("POST", values, "dataTablePost");                    
            const request = await fetch(`${apiURL.url}${entities.notifications}`, config);

              if(request.status === 200){
                const response = await request.json();
                  if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                  }else{               
                    closeModalAdd()
                    sendNotification(values);
                  };  
              };

              if(request.status === 422){
                const response = await request.json();
                  if(response.errors){
                    setErrors(response.errors);
                  };
              };
          }catch(error){
              console.log(error);
          };
    }

    const sendNotification = (values) =>{

        if(values.type == "Enviar" && values.contact_type == "whatsapp"){
            const message = encodeURIComponent(values.notification);
            const phoneNumber = values.contact; 
            
            const link = `https://web.whatsapp.com/send/?phone=${phoneNumber}&text=${message}`;
            window.open(link, '_blank');
            
        }else if(values.type == "Enviar" && values.contact_type == "Email"){
            const subject = encodeURIComponent('Asunto del correo');
            const body = encodeURIComponent(values.notification);

            const link = `https://mail.google.com/mail/?view=cm&to=${values.contact}&su=${subject}&body=${body}`
            window.open(link, '_blank');
        } 

    }

    const changeContactType = (e) =>{
        const value = e.target.value;

        if(value == "whatsapp"){
            setPlaceHolder("Ej: 3425857245")
        }else if(value == "Email"){
            setPlaceHolder("Ej: xxxx@xxx.com")
        }else{
            setPlaceHolder("Ej: 3425857245")
        }
    }

    const changeContact = (e) =>{
        setErrors({
            ...errors,
            contact:null
        })
    }

    const changeNotification = (e) =>{
        setErrors({
            ...errors,
            notification:null
        })
    }

        const lastNotification = notifications[notifications.length - 1];
    

    const { register, getValues} = useForm ();


    return(

        <>
        <Modal className='general-container' isOpen={openModalCreateNoti}>
            <ModalHeader style={{display: 'block'}}>
            <div className='div-header'>     
                    <h3 style={{color:"green"}}>{itemToEdit.customer ? itemToEdit.customer.customer ? `Crear Notificacion para ${itemToEdit.customer.customer}` : "Crear Notificacion" : "Crear Notificacion"}</h3>
                    <FontAwesomeIcon className='close-modal-x' onClick={closeModalAdd} icon={faXmark} />
            </div>
            </ModalHeader>
            <ModalBody >
            <form >
                <input style={{position:"absolute", visibility:"hidden"}} defaultValue={itemToEdit ? itemToEdit.id : ""} {...register('reparation_id')}></input>
                <div className="state-notification-container">
                    <div className="contact-type-select">
                        <label>Tipo de contacto:</label>
                        <select defaultValue={lastNotification ? lastNotification.contact_type : "whatsapp"} {...register('contact_type',{
                            onChange:(event)=> changeContactType(event)
                        })}>
                                <option value={"whatsapp"}>whatsapp</option>
                                <option value={"Email"}>Email</option>
                                <option value={"Telefono"}>Telefono</option>
                        </select>
                    </div>
                    <div>
                        <label>Contacto:</label> 
                        <input type="text" className={errors.contact ? "input-error" : "input-contact"} defaultValue={lastNotification ? lastNotification.contact : itemToEdit.number ? itemToEdit.number : ""} placeholder={placeHolder} {...register('contact',{
                            onChange: (event) => changeContact(event)
                        })}></input>
                        <p className="p-error">{errors.contact ? errors.contact[0] : ""}</p>
                    </div>
                    <div>
                        <label>Fecha de notificacion:</label>
                        <input type="date" defaultValue={actualityDate.getUTCFullYear() + '-' + ('00' + (actualityDate.getUTCMonth()+1)).slice(-2) + '-' + ('00' +  actualityDate.getUTCDate()).slice(-2)} {...register('notification_date')}></input>
                    </div>
                    <div>
                        <label>Tipo de mensaje:</label>
                        <select {...register('type')}>
                            <option value={"Enviar"}>Enviar</option>
                            <option value={"Recibir"}>Recibir</option>
                        </select>
                    </div>
                </div>
                <div className="notification-create-container">
                    <textarea className={errors.notification ? "textarea-error" : "textarea-messaje"} placeholder="Escribe un mensaje..." {...register('notification',{
                        onChange: (event) => changeNotification(event)
                    })}></textarea>
                    <p className="p-error">{errors.notification ? errors.notification[0] : ""}</p>
                </div> 
                <div className='buttons-container'>
                    <div className='button-div'>
                        <button type="button" onClick={() => create(getValues())} className='btn button-create-noti'>Crear</button>
                    </div>
                    <div className='button-div'>
                        <button type="button" className='btn button-close-modal' onClick={()=>closeModalAdd()}>Cancelar</button>
                    </div>
                </div>
            </form>
            </ModalBody>
        </Modal>
    </>
    )

}

export default AddNotification