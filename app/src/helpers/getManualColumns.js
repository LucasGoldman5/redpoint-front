/* global getManualColumns */
import getEnviroment from "./getEnviroment";

export default async function getManualColumns (url){

    const urlLocal = async () =>{
        const enviroment = await getEnviroment();
        return enviroment.url
    } 

    if(url === `${await urlLocal()}Table/reparations`){
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

    }else if(url === `${await urlLocal()}Table/brands`){
        const columns = 
        {
            'id' : 'id',
            'title' : 'Marca',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${await urlLocal()}Table/cellphones`){
        const columns = 
        {
            'id' : 'id',
            'model' : 'Modelo',
            'url':'Visitar' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${await urlLocal()}Table/customers`){
        const columns = 
        {
            'name' : 'Cliente',
            'email' : 'Email',
            'phone_number':'Telefono' ,
        }
        localStorage.setItem("column",JSON.stringify(columns));

    }else if(url === `${await urlLocal()}Table/services`){
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

    }
}