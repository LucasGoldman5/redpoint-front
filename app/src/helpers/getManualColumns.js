/* global getManualColumns */


export default async function getManualColumns (url,urlLocal){

    console.log(urlLocal);

    if(url === `${urlLocal.main}${urlLocal.dataTable}reparations`){
        const columns = 
        {
          "customer":"Cliente",
          "service":"Servicio",
          "cellphone":"Celular",
          "number":"Numero",
          "email":"Email",
          "state_id":"Estado",
          "failure":"Falla",
          "notice_date":"Recibido el",
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}brands`){
        const columns = 
        {
            'id' : 'id',
            'title' : 'Marca',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}cellphones`){
        const columns = 
        {
            'id' : 'id',
            'model' : 'Modelo',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}customers`){
        const columns = 
        {
            'name' : 'Cliente',
            'email' : 'Email',
            'phone_number':'Telefono' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}services`){
        const columns = 
        {
            'description' : 'Servicio',
            'email' : 'Email',
            'phone_number':'Telefono' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url.includes("report")){
        const columns = 
        {
          "customer":"Cliente",
          "service":"Servicio",
          "cellphone":"Celular",
          "number":"Numero",
          "email":"Email",
          "state_id":"Estado",
          "failure":"Falla",
          "notice_date":"Recibido el",
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${urlLocal.main}${urlLocal.dataTable}users`){
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