/* global getFilterReparations */

export default function getFilterReparations (id,entity,title,apiURLLocal) {

    const allEntities = ["brands","customers","cellphones","services"]
    const findEntity = (allEntities.includes(entity)) ? entity : "";
    

     if(findEntity === "brands"){
        window.location.assign(`${apiURLLocal}Table/report/reparations-by-brand/${id}=${title.split(/\s+/).join('').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
     }else if(findEntity === "cellphones"){
        window.location.assign(`${apiURLLocal}Table/report/reparations-by-cellphone/${id}=${title.split(/\s+/).join('').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
     }else if(findEntity === "customers"){
        window.location.assign(`${apiURLLocal}Table/report/reparations-by-customer/${id}=${title.split(/\s+/).join('').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
     }
     else if(findEntity === "services"){
        window.location.assign(`${apiURLLocal}Table/report/reparations-by-service/${id}=${title.split(/\s+/).join('').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
     };

     
  };