/* global getManualColumns */

export default async function getManualColumns (url){

    if(url === "http://localhost:3000/Table/reparations"){
        const columns = 
        {
          "customer":"Cliente",
          "service":"Servicio",
          "cellphone":"Celular",
          "number":"Numero",
          "email":"Email",
          "failure":"Falla",
          "notice_date":"Recibido el",
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === "http://localhost:3000/Table/brands"){
        const columns = 
        {
            'id' : 'id',
            'title' : 'Marca',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === "http://localhost:3000/Table/cellphones"){
        const columns = 
        {
            'id' : 'id',
            'model' : 'Modelo',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === "http://localhost:3000/Table/customers"){
        const columns = 
        {
            'name' : 'Cliente',
            'email' : 'Email',
            'phone_number':'Telefono' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === "http://localhost:3000/Table/services"){
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
          "failure":"Falla",
          "notice_date":"Recibido el",
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }
}