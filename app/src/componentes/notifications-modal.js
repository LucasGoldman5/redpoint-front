import React, { useEffect, useState } from "react";
import './notifications-modal.css'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faPencil,faTrashCan,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import HelperBuildRequest from '../helpers/buildRequest';
import AddNotification from "./add-notification";

const ModalNotification = ({openModalNoti,itemToEdit,closeForm,enviroment}) =>{

    const [notifications, setNotifications] = useState([]);
    const [modalCreateNotification, setModalCreateNotification] = useState(false);
    const [ModalNotification, setModalNotification] = useState(false);
    const [notificationId, setNotificationId] = useState(null);
    const [notificationSelected, setNotificationSelected] = useState(null);
    const [closeModalCreate, setCloseModalCreate] = useState(null);

    const apiURL = enviroment.apiURL;
    const entitiesUrl = enviroment.entities;

    useEffect(()=>{

        if(openModalNoti == true && itemToEdit){
            getNotifications()
        }
        setModalNotification(true);
    },[openModalNoti])

    useEffect(()=>{

        if(modalCreateNotification == false && itemToEdit && closeModalCreate == true){
            getNotifications()
            setModalNotification(true);
        }
    },[modalCreateNotification])

    const getNotifications = async () =>{

        const idReparations = itemToEdit.id

        try{
                
            const config = await HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`${apiURL.url}${entitiesUrl.notifications}/${idReparations}`, config);

              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                       setNotifications(response.data);
                    }  
              };

          }catch(error){
            console.log(error)
          }
    }

    const addNotification = () => {
        setModalCreateNotification(true);
        setModalNotification(false);
        setCloseModalCreate(false)
    }

    const closeModal = () =>{
        setModalCreateNotification(false);
        setModalNotification(true);
        setCloseModalCreate(true)
    }
   
    const selectNotification = (noti) =>{
        setNotificationId(noti.id);
        setNotificationSelected(noti);
        setValue('notification',`${noti.notification}`)
        setValue('type',`${noti.type}`)
        setValue('contact_type',`${noti.contact_type}`)
        setValue('contact',`${noti.contact}`)
        setValue('id',`${noti.id}`)
        setValue('reparation_id',`${noti.reparation_id}`)
    }

    const changeMessaje = (newValue) => {
        
    }

    const changeResponse = (newValue) =>{
       
    }

    const changeNumber = (newValue) =>{
        
     }

    const editNotification = async (values) => {

        const id = values.id

        try{
                        
            const config = await HelperBuildRequest("PUT",values, "dataTablePut");
            const request = await fetch(`${apiURL.url}${entitiesUrl.notifications}/${id}`, config);

              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{
                        setNotifications([]);                      
                        getNotifications();
                        setNotificationSelected(null);
                        setNotificationId(null);
                    }  
              };

          }catch(error){
            console.log(error)
          }
    }

    const deselectedNoti = () =>{
        setNotificationId(null);
        setNotificationSelected(null);
    }

    const { register, getValues, setValue} = useForm ();

    return (
        <>
            <Modal className='general-container' isOpen={ModalNotification}>
                <ModalHeader style={{display: 'block'}}>
                <div className='div-header'>
                    <div className="quantity-notifications">
                        <p>Cantidad:{" "}{notifications.length}</p>
                    </div>     
                    <div className="general-title-container">
                        <h2>{itemToEdit.customer ? "Notificaciones a " + itemToEdit.customer.customer + " (Reparación " + "#" + itemToEdit.id + ")" : "No hay Cliente relacionado con esta reparacion"}</h2>
                    </div>
                    <FontAwesomeIcon className='close-modal-x' onClick={closeForm} icon={faXmark} />
                </div>
                </ModalHeader>
                <ModalBody >
                    <div className="notifications-container">
                        {
                            (notifications.length >= 1)
                            ?  
                                notifications.map((noti,index) => {

                                    let dateNoti = new Date(noti.updated_at);
            
                                    return(
                                      noti.type == "Enviar"
                                      ?
                                      <div key={index} className={noti.type == "Enviar" ? "notification-container-rigth" : "notification-container-left"}>
                                        <div className={noti.type == "Enviar" ? "div-info-noti-right" : "" }>
                                            <p className="info-noti">{('00' + (dateNoti.getUTCMonth()+1)).slice(-2) + '-' + ('00' +  dateNoti.getUTCDate()).slice(-2) + '-' + dateNoti.getUTCFullYear() }</p>
                                            <p className="info-noti">{noti.contact_type}</p>
                                        </div>
                                        <textarea className={noti.type == "Enviar" ?` notification-send ${noti.id == notificationId ? "notification-send-selected" : ""}` : ""} onClick={()=> selectNotification(noti)} readOnly defaultValue={noti.notification}></textarea>
                                      </div>
                                      :
                                      <div key={index} className={noti.type == "Enviar" ? "notification-container-rigth" : "notification-container-left"}>
                                        <textarea className={noti.type == "Enviar" ? "" : `notification-receive ${noti.id == notificationId ? "notification-receive-selected" : ""}`} onClick={()=> selectNotification(noti)} readOnly defaultValue={noti.notification}></textarea>
                                        <div className={noti.type == "Recibir" ? "div-info-noti-left" : "" }>
                                            <p className="info-noti">{('00' + (dateNoti.getUTCMonth()+1)).slice(-2) + '-' + ('00' +  dateNoti.getUTCDate()).slice(-2) + '-' + dateNoti.getUTCFullYear() }</p>
                                            <p className="info-noti">{noti.contact_type}</p>
                                        </div>
                                      </div>
                                    )
                                })   
                            :
                            <div className="no-notification-container">
                                <h4>No hay Notificaciones</h4>
                            </div>
                        }
                    </div>
                    <div className="button-add-container">
                        {
                            notificationId
                            ?
                            <div className="notification-selected-buttons">
                                <div className="notification-selected-title-container">
                                    <h5 className="notification-selected-title">Notificacion {notificationId} seleccionada</h5>
                                </div>
                                <div className="notification-edit-container"> 
                                    <select className="contact-type-select-edit" defaultValue={notificationSelected.contact_type} {...register('contact_type')}>
                                        <option value={"whatsapp"}>whatsapp</option>
                                        <option value={"Email"}>Email</option>
                                        <option value={"Telefono"}>Telefono</option>
                                    </select>
                                    <textarea defaultValue={notificationSelected.notification} {...register('notification')}></textarea>
                                    <input type="text" style={{position:"absolute", visibility:"hidden"}} defaultValue={notificationSelected.type} {...register('type')}></input>
                                    <input type="text" style={{position:"absolute", visibility:"hidden"}} defaultValue={notificationSelected.contact} {...register('contact')}></input>
                                    <input type="text" style={{position:"absolute", visibility:"hidden"}} defaultValue={notificationSelected.id} {...register('id')}></input>
                                    <input type="text" style={{position:"absolute", visibility:"hidden"}} defaultValue={notificationSelected.reparation_id} {...register('reparation_id')}></input>
                                </div>
                                <div className="buttons-edit-delete-container">
                                    <div  className="button-action-container">
                                        <button className="button-deselected" onClick={()=>deselectedNoti()}><FontAwesomeIcon icon={faCircleXmark} /></button>
                                    </div>
                                    <div className="button-action-container">
                                        <button className="button-edit" onClick={() => editNotification(getValues())}><FontAwesomeIcon icon={faPencil} /></button>
                                    </div>
                                    <div  className="button-action-container">
                                        <button className="button-delete"><FontAwesomeIcon icon={faTrashCan} /></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="buttons-create-close-container">
                                <div className="button-container">
                                    <button className="btn button-add-notification" onClick={()=> addNotification()}>Agregar Notificacion</button>
                                </div>
                                <div className="button-container">
                                    <button className="btn button-close-notification" onClick={()=>closeForm()}>Salir</button>
                                </div>
                            </div>
                        }
                        
                    </div>
                </ModalBody>
            </Modal>

            {
              (modalCreateNotification)
              ?
               <AddNotification
               closeModal={closeModal}
               openModalCreateNoti={modalCreateNotification}
               notifications={notifications}
               itemToEdit={itemToEdit}
               enviroment={enviroment}>
               </AddNotification>
              :
              ""
            }
        </>
    )
}

export default ModalNotification