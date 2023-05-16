/* global getFilterReparations */
export default function getFilterReparations (id,entity,title) {

    const allEntities = ["brands","customers","cellphones","services"]
    const findEntity = (allEntities.includes(entity)) ? entity : "";
    

     if(findEntity === "brands"){
        window.location.assign(`http://localhost:3000/Table/report/reparations-by-brand/${id}=${title.split(/\s+/).join('')}`)
     }else if(findEntity === "cellphones"){
        window.location.assign(`http://localhost:3000/Table/report/reparations-by-cellphone/${id}=${title.split(/\s+/).join('')}`)
     }else if(findEntity === "customers"){
        window.location.assign(`http://localhost:3000/Table/report/reparations-by-customer/${id}=${title.split(/\s+/).join('')}`)
     }
     else if(findEntity === "services"){
        window.location.assign(`http://localhost:3000/Table/report/reparations-by-service/${id}=${title.split(/\s+/).join('')}`)
     };

     
  };