import React from "react";
import './printReparation.css'

const PrintRearation = () =>{

  const getReparation = localStorage.getItem("reparation");
  let reparation = JSON.parse(getReparation);
    console.log(reparation);
  if(reparation){

     const date = reparation.notice_date;
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
              <h2>Red Point</h2>
              <p>Julio A. Roca 269 - Villa General Belgrano | <b>3546406188</b></p>
            </div>
            <div className="sub-container">
              <div className="information-div">
                <p>Fecha</p>
                <h3>{formatDate()}</h3>
              </div>
              <div className="information-div">
                <p>Cliente</p>
                <h5>{reparation.number ? reparation.number : "S/N"} - {reparation.customer ? reparation.customer.customer : ""}</h5>
              </div>
              <div className="information-div">
                <p>Equipo</p>
                <h5>{reparation.cellphone ? reparation.cellphone.brand : ""} - {reparation.cellphone ? reparation.cellphone.model : ""}</h5>
              </div>
              <div className="information-div">
                <p>Falla</p>
                <h5>{reparation.failure ? reparation.failure : ""}</h5>
              </div>
              <div className="information-div">
                <p>Orden</p>
                <h5>{reparation.id ? reparation.id : "..."}</h5>
              </div>
              <div className="information-div">
                <p>IMEI</p>
                <h5>{reparation.imei ? reparation.imei : "---"}</h5>
              </div>
              <div className="information-div">
                <p>Codigo de Seguridad</p>
                <h5>{reparation.pin ? reparation.pin : "---"}</h5>
              </div>
              <div className="information-div">
                <h3>{"[Chip]"}</h3>
              </div>
              <div className="information-div">
                <h3>{"[Memoria]"}</h3>
              </div>
            </div>
            <div style={{marginTop:"10px"}}>
                <h4>Este comprobante es necesario para retirar el equipo.</h4>
                <p style={{margin:"0"}}>Segun los articulos 2525 y 2526 del código civil, pasados los 60 dias no hay derecho a reclamo alguno, pudiendo disponer del equipo para su venta o desarme.</p>
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
              <h2>Red Point</h2>
              <p>Julio A. Roca 269 - Villa General Belgrano | <b>3546406188</b></p>
            </div>
            <div className="sub-container">
              <div className="information-div">
                <p>Fecha</p>
                <h3>{formatDate()}</h3>
              </div>
              <div className="information-div">
                <p>Cliente</p>
                <h5>{reparation.number ? reparation.number : "S/N"} - {reparation.customer ? reparation.customer.customer : ""}</h5>
              </div>
              <div className="information-div">
                <p>Equipo</p>
                <h5>{reparation.cellphone ? reparation.cellphone.brand : ""} - {reparation.cellphone ? reparation.cellphone.model : ""}</h5>
              </div>
              <div className="information-div">
                <p>Falla</p>
                <h5>{reparation.failure ? reparation.failure : ""}</h5>
              </div>
              <div className="information-div">
                <p>Orden</p>
                <h5>{reparation.id ? reparation.id : "..."}</h5>
              </div>
              <div className="information-div">
                <p>IMEI</p>
                <h5>{reparation.imei ? reparation.imei : "---"}</h5>
              </div>
              <div className="information-div">
                <p>Codigo de Seguridad</p>
                <h5>{reparation.pin ? reparation.pin : "---"}</h5>
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