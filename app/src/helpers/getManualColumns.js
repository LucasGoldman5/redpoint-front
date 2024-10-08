/* global getManualColumns */



export default async function getManualColumns (url,urlLocal){

    if(url === `${urlLocal.main}${urlLocal.dataTable}reparaciones`){
        const columns = 
        {
          "id":"Orden",
          "customer":"Cliente",
          "service":"Servicio",
          "service_order":"Orden Serv",
          "cellphone":"Celular",
          "number":"Numero",
          "state_id":"Estado",
          "failure":"Falla",
          "reception_date":"Recibido el",
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}marcas`){
        const columns = 
        {
            'id' : 'id',
            'title' : 'Marca',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}celulares`){
        const columns = 
        {
            'id' : 'id',
            'model' : 'Modelo',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}clientes`){
        const columns = 
        {
            'name' : 'Cliente',
            'email' : 'Email',
            'phone_number':'Telefono' ,
            'dni':'Documento',
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}servicios`){
        const columns = 
        {
            'description' : 'Servicio',
            'email' : 'Email',
            'phone_number':'Telefono' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url.includes("report") && !url.includes("reparaciones-por-estado-de-servicio")){
        const columns = 
        {
            "id":"Orden",
            "customer":"Cliente",
            "service":"Servicio",
            "service_order":"Orden Serv",
            "cellphone":"Celular",
            "number":"Numero",
            "state_id":"Estado",
            "failure":"Falla",
            "reception_date":"Recibido el",
          }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url.includes("reparaciones-por-estado-de-servicio")){
        const columns = 
        {
            "id":"Orden",
            "customer":"Cliente",
            "service":"Servicio",
            "service_order":"Orden Serv",
            "cellphone":"Celular",
            "number":"Numero",
            "state_id":"Estado",
            "service_status_id":"Estado del servicio",
            "failure":"Falla",
            "reception_date":"Recibido el"
            
          }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}usuarios`){
        const columns = 
        {
            'name' : 'Nombre',
            'email' : 'Email',
            'last_connection':'Ultima conexion',
            'rol_id' : 'Rol',
            'active' : 'Activo'
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }
}