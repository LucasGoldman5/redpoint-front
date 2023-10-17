import React from "react";
import './printReparation.css'
import NotAuthorized from "./pageNotAuthorized";

const PrintRearation =  () =>{


  const getReparation = () =>{
    if(localStorage.reparation){
      return localStorage.getItem("reparation");
    }else{
      return (
        <NotAuthorized></NotAuthorized>
      )
    }
  } 
  let reparation = JSON.parse(getReparation());

  console.log(reparation);
    
  if(reparation){

     const date = reparation.reception_date     ;
     const newDate = new Date()
     const formatDate = () =>{
      if(date){
        return new Date(date).getDate()+"/"+(new Date(date).getMonth()+1)+"/"+new Date(date).getFullYear()
      }else{
        return new Date(newDate).getDate()+"/"+(new Date(newDate).getMonth()+1)+"/"+new Date(newDate).getFullYear()
      }
     }

    return(
      <>
        <div className="general-container-print">
          <div className="repair-data-container">
            <div>
              <h4>Red Point</h4>
              <p>Julio A. Roca 269 - Villa General Belgrano | <b>3546406188</b></p>
            </div>
            <div className="sub-container">
              <div className="information-div">
                <p>Fecha</p>
                <b>{formatDate()}</b>
              </div>
              <div className="information-div">
                <p>Cliente</p>
                <b>{reparation.number ? reparation.number : "S/N"} - {reparation.customer ? reparation.customer.customer : ""}</b>
              </div>
              <div className="information-div">
                <p>Equipo</p>
                <b>{reparation.cellphone ? reparation.cellphone.brand : ""} - {reparation.cellphone ? reparation.cellphone.model : ""}</b>
              </div>
              <div className="information-div">
                <p>Falla</p>
                <b>{reparation.failure ? reparation.failure : ""}</b>
              </div>
              <div className="information-div">
                <p>Orden</p>
                <b>{reparation.id ? reparation.id : "..."}</b>
              </div>
              <div className="information-div">
                <p>IMEI</p>
                <b>{reparation.imei ? reparation.imei : "---"}</b>
              </div>
              <div className="information-div">
                <p>Codigo de Seguridad</p>
                <b>{reparation.pin ? reparation.pin : "---"}</b>
              </div>
              <div className="information-div">
                <h3>{"[Chip]"}</h3>
              </div>
              <div className="information-div">
                <h3>{"[Memoria]"}</h3>
              </div>
            </div>
            <div style={{marginTop:"10px"}}>
                <h5 style={{color:"red"}}>CONDICIONES GENERALES</h5>
                <p style={{margin:"0", fontSize:"12px"}}>Para retirar el equipo deberá presentar esta ORDEN ORIGINAL o en su defecto presentando el DNI del titular del equipo. Transcurrido los 15 días de corrido de la reparación iniciada, el precio de la reparación será actualizado según la lista de los precios vigentes. Los presupuestos enviados por los distintos medios de comunicación sólo tienen validez por 2 días hábiles, luego de eso podrán ser actualizados sin previo aviso. Si el equipo no fuese retirado dentro del plazo de los 90 días de la fecha de la presente será considerado abandonado en los términos del artículo 1947 del Nuevo Código Civil y Comercial, quedando facultades a darle destino que considere pertinente. Durante la reparación puede ser necesario el cambio o modificación del software del equipo del cliente. Todas las reparaciones cuentan con garantía. Sujeta al estado físico del repuesto o equipo, quedando anulada ante la presencia de golpes, rayas, roturas, humedad, daños por presión o temperatura y manipulación de terceros. Dado que a raíz de un problema los equipos suelen presentar múltiples fallas, el Servicio Técnico solo se responsabilizará por la/s fallas descrita/s en esta Orden de Servicio. Nunca surgen fallas a partir de la reparación de un equipo, por lo tanto, el Servicio Técnico solo se responsabiliza en caso de no haber corregido la falla descrita por el cliente. El cliente nos autoriza a realizar los traslados necesarios dentro de nuestras instalaciones, dígase, local comercial y servicio técnico. En caso de no querer realizar la reparación (rechazar el presupuesto), debe saber que para retirar el equipo puede contar con demora en el armado o traslado de su equipo, hasta la sucursal de atención al público, debiendo esto ser notificado con tiempo suficiente y dentro de los días de lunes a viernes en los horarios del servicio técnico de 9 a 13hs.</p>
              </div>
          </div>
          <div className="destiny">
            <h2>Cliente</h2>
          </div>
        </div>
        <hr></hr>
        <div className="general-container-print">
          <div className="repair-data-container">
            <div>
              <h4>Red Point</h4>
              <p>Julio A. Roca 269 - Villa General Belgrano | <b>3546406188</b></p>
            </div>
            <div className="sub-container">
              <div className="information-div">
                <p>Fecha</p>
                <b>{formatDate()}</b>
              </div>
              <div className="information-div">
                <p>Cliente</p>
                <b>{reparation.number ? reparation.number : "S/N"} - {reparation.customer ? reparation.customer.customer : ""}</b>
              </div>
              <div className="information-div">
                <p>Equipo</p>
                <b>{reparation.cellphone ? reparation.cellphone.brand : ""} - {reparation.cellphone ? reparation.cellphone.model : ""}</b>
              </div>
              <div className="information-div">
                <p>Falla</p>
                <b>{reparation.failure ? reparation.failure : ""}</b>
              </div>
              <div className="information-div">
                <p>Orden</p>
                <b>{reparation.id ? reparation.id : "..."}</b>
              </div>
              <div className="information-div">
                <p>IMEI</p>
                <b>{reparation.imei ? reparation.imei : "---"}</b>
              </div>
              <div className="information-div">
                <p>Codigo de Seguridad</p>
                <b>{reparation.pin ? reparation.pin : "---"}</b>
              </div>
              <div className="information-div pattern">
                <p>Patron</p>
                <div className="pattern-container">
                  <p>.</p>
                  <p>.</p>
                  <p>.</p>
                  <p>.</p>
                  <p>.</p>
                  <p>.</p>
                  <p>.</p>
                  <p>.</p>
                  <p>.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="destiny">
            <h2>Registro</h2>
          </div>
        </div>
        <hr></hr>
      </>
    )
  }
};

export default PrintRearation;