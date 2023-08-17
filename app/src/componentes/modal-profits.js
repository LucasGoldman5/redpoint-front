import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './modal-profits.css'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import HelperBuildRequest from '../helpers/buildRequest';

const ModalProfits = ({openModalProfits,closeForm,enviroment}) =>{

    const [services, setServices] = useState([]);
    const [reparationsFilter, setReparationsFilter] = useState([]);
    const [spinnerLoad, setSpinnerLoad] = useState(false);
    const [errors, setErrors] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [allServiceSelected, setAllServiceSelected] = useState(false);
    const [firstCalculate, setFirstCalculate] = useState(false);
    const actualityDate = new Date()

    useEffect(()=>{
        if(openModalProfits == true){
            
            const apiURL = enviroment.apiURL;
            const entitiesUrl = enviroment.entities;
            setFirstCalculate(false);

            const getServices = async () =>{
                try{
                        
                    const config = await HelperBuildRequest("GET",null, "dataTable");
                    const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.service}`, config);
        
                      if(request.status === 200){
                          const response = await request.json();
                            if(response.error){
                                setTimeout(()=>{
                                  console.log(response.error);
                                },1000);
                            }else{                      
                                setServices(response);
                            }  
                      };
        
                  }catch(error){
                    console.log(error)
                  }
            }

            getServices()
        }
    },[openModalProfits])


    const calculateProfits = async (values) =>{

        const apiURL = enviroment.apiURL;
        const entitiesUrl = enviroment.entities;
        const serviceId = values.service_id;
        const dateFrom = values.dateFrom;
        const dateUntil = values.dateUntil;

        if(serviceId == "0"){
            setAllServiceSelected(true);
        }else{
            setAllServiceSelected(false);
        }

            setSpinnerLoad(true)

            try{
                        
                const config = await HelperBuildRequest("GET",null, "dataTable");
                const request = await fetch(`${apiURL.url}${entitiesUrl.report}${entitiesUrl.reparationByDate}${serviceId}/${dateFrom},${dateUntil}`, config);
    
                  if(request.status === 200){
                      const response = await request.json();
                        if(response.error){
                            setTimeout(()=>{
                              console.log(response.error);
                            },1000);
                        }else{                      
                            setReparationsFilter(response.data);
                            setSpinnerLoad(false);
                            setFirstCalculate(true);
                        }  
                  };
    
              }catch(error){
                console.log(error)
              }
           
    }


    const changeDateFrom = (e) =>{
        
        const dateToDay = new Date()
        const dateFrom = new Date(e.target.value)

        if(dateFrom > dateToDay){
            setErrors({...errors,dateFromError:"La fecha seleccionada no puede superar la fecha actual"})
            setButtonDisabled(true);
        }else{
            setErrors({...errors,dateFromError:null})
            setButtonDisabled(false);
        }
    }


    const changeDateUntil = (e) =>{

        const dateToDay = new Date()
        const dateUntil = new Date(e.target.value)

        if(dateUntil > dateToDay){
            setErrors({...errors,dateUntilError:"La fecha seleccionada no puede superar la fecha actual"})
            setButtonDisabled(true);
        }else{
            setErrors({...errors,dateUntilError:null})
            setButtonDisabled(false);
        }
    }

    const totalProfits = () =>{

        if(reparationsFilter.length >= 1){
        
            const totalCost = reparationsFilter.reduce((acc, reparation) => {
                const cost = reparation.cost || 0; 
                return acc + cost;
            }, 0);
            
            
            const totalAmount = reparationsFilter.reduce((acc, reparation) => {
                const amount = reparation.amount || 0; 
                return acc + amount;
            }, 0);
            
            
             return totalAmount - totalCost;
        }else{
            
            return 0
        }
    }

    const { register, getValues} = useForm ();

    const day1=('00' +  actualityDate.getDate()).slice(-2) - actualityDate.getDate() + 1

    return(
        <Modal className='general-container' isOpen={openModalProfits}>
        <ModalHeader style={{display: 'block'}}>
          <div className='div-header'>
            <h2 className='profits-title'>Calcular Ganancias</h2>
            <FontAwesomeIcon className='close-modal-x' onClick={closeForm} icon={faXmark} />
          </div>
        </ModalHeader>
        <ModalBody >
           <form >
               <div className='modal-body-container'>
                   <div className='dates-container'>
                        <div className='date-container-from'>
                            <label>Desde:</label>
                            <input className={errors.dateFromError ? "date-error" : "date"} type='date' defaultValue={actualityDate.getFullYear() + '-' + ('00' + (actualityDate.getMonth()+1)).slice(-2) + '-' + "0" + day1} {...register('dateFrom',{
                                shouldUnregister:true,
                                onChange: (event) => changeDateFrom(event),
                                setValueAs : value =>{
                                    if(value != null && value){
                                      
                                      let dateInput = new Date(value)
                                    dateInput = dateInput.getFullYear() + '-' +
                                    ('00' + (dateInput.getMonth()+1)).slice(-2) + '-' +
                                    ('00' + dateInput.getDate()).slice(-2) + ' ' + 
                                    ('00' + dateInput.getHours()).slice(-2) + ':' + 
                                    ('00' + dateInput.getMinutes()).slice(-2) + ':' + 
                                    ('00' + dateInput.getSeconds()).slice(-2);
                  
                                    return dateInput
                                    }else{
                                      return null
                                    } 
                                  } 
                            })} />
                            {(errors.dateFromError) ? <p className='p-error'>{errors.dateFromError}</p> : ""}
                        </div>
                        <div className='date-container-until'>
                            <label>Hasta:</label>
                            <input className={errors.dateUntilError ? "date-error" : "date"} type='date' defaultValue={actualityDate.getFullYear() + '-' + ('00' + (actualityDate.getMonth()+1)).slice(-2) + '-' + ('00' +  actualityDate.getDate()).slice(-2)} {...register('dateUntil',{
                                shouldUnregister:true,
                                onChange: (event) => changeDateUntil(event),
                                setValueAs : value =>{
                                    if(value != null && value){
                                      
                                      let dateInput = new Date(value)
                                    dateInput = dateInput.getFullYear() + '-' +
                                    ('00' + (dateInput.getMonth()+1)).slice(-2) + '-' +
                                    ('00' + dateInput.getDate()).slice(-2) + ' ' + 
                                    ('00' + dateInput.getHours()).slice(-2) + ':' + 
                                    ('00' + dateInput.getMinutes()).slice(-2) + ':' + 
                                    ('00' + dateInput.getSeconds()).slice(-2);
                  
                                    return dateInput
                                    }else{
                                      return null
                                    } 
                                  } 
                            })} />
                            {(errors.dateUntilError) ? <p className='p-error'>{errors.dateUntilError}</p> : ""}
                        </div>
                    </div>
                    <div className='select-container'>
                        <label>Seleccionar Servicio:</label>
                        <select className='select' defaultValue={0} {...register('service_id',{
                            shouldUnregister:true
                        })}>
                            <option value={0}>Todos Los Servicios</option>
                            {
                                services.map((service) => {
                                   return <option key={service.id} value={service.id}>{service.description}</option>
                                })
                            }
                        </select>
                    </div>
               </div>
                    {
                        (spinnerLoad)
                        ?
                        <div className='spinner-container'>
                            <PulseLoader color="#d41c1c" size={12}></PulseLoader>
                        </div>
                        :
                        ""
                    }
                    {
                        (reparationsFilter.length >= 1)
                        ?
                        <>
                        <div className='table-profits-container'>
                            <table className='table-profits'>
                                <thead className='thead-profits'>
                                    <tr className='tr-head-profits'>
                                        <th className='th-head-profits'>Cliente</th>
                                        {
                                            allServiceSelected == true
                                            ?
                                            <th className='th-head-profits'>Servicio</th>
                                            :
                                            ""
                                        }
                                        <th className='th-head-profits'>Celular</th>
                                        <th className='th-head-profits'>Costo</th>
                                        <th className='th-head-profits'>Valor Cobrado</th>
                                        <th className='th-head-profits'>Ganancia</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody-scroll'>
                                {
                                    reparationsFilter.map((reparation) => {
                                        return (
                                            <tr key={reparation.id} className='tr-body-profits'>
                                                <td className='td-body-profits'>{reparation.customer.customer ? reparation.customer.customer : "No hay cliente relacionado"}</td>
                                                {
                                                    allServiceSelected == true
                                                    ?
                                                    <td className='td-body-profits'>{reparation.service.service ? reparation.service.service : ""}</td>
                                                    :
                                                    ""
                                                }
                                                <td className='td-body-profits'>{reparation.cellphone.brand ? reparation.cellphone.brand : ""}{" "}
                                                {reparation.cellphone.model ? reparation.cellphone.model : "No hay celular relacionado"}</td>
                                                <td className='td-body-profits cost'>${reparation.cost}</td>
                                                <td className='td-body-profits amount'>${reparation.amount}</td>
                                                <td className={reparation.amount - reparation.cost >= 1 ? "td-profits-positive" : "td-profits-negative"}>${reparation.amount - reparation.cost}</td>
                                            </tr>
                                        )
                                    })
                                }  
                                </tbody>
                            </table>   
                        </div>
                        <div className='total-profits-div'>Ganancias Totales: <p className={totalProfits() >= 1 ? "total-profits-positive" : "total-profits-negative"}>${totalProfits()}</p></div>
                        </>
                        :
                        firstCalculate == true
                        ?
                        <div className='no-results-div'>
                            <h3 className='no-results'>No hay Resultados</h3>
                        </div>
                        :
                        ""
                    }
                    <div className='buttons-container'>
                        <div className='button-div'>
                            <button type="button"  onClick={() => calculateProfits(getValues())} className='btn button-calculate-profits'>Calcular</button>
                        </div>
                        <div className='button-div'>
                            <button type="button" className='btn button-close-modal' onClick={closeForm}>Cancelar</button>
                        </div>
                    </div>
            </form>
        </ModalBody>
      </Modal>
    )
}

export default ModalProfits;