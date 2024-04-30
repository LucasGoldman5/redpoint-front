import NotAuthorized from "../componentes/pageNotAuthorized";
import getEnviroment from "./getEnviroment";


/* global HelperBuildRequest */
export default async function  HelperBuildRequest ( method, data = {}, type = null ) {

    const headers = new Headers();
    headers.append('Accept', 'application/json')
    // headers.append('Referrer Policy', 'origin-when-cross-origin');
    headers.append('Content-Type','application/json');
    const enviroment = await getEnviroment();

    
    if(type === 'login') {
      return {
            method: method,
            headers,
            body: JSON.stringify(data),
        };
    }

    if(type === 'register') {
        return {
            method: method,
            headers
        };
    }
        
    const userData = () =>{
        if(localStorage.user){
            return JSON.parse( localStorage.getItem('user') );
        }else{
            window.location.reload()
        }
    } 
    const tokenType = userData().token_type[0].toUpperCase() + userData().token_type.slice(1, userData().token_type.length );

    const tokenArr = userData().access_token.split('.');
    const tokenDecode =  JSON.parse( atob(tokenArr[1]) );
 
    const expired = tokenDecode.exp * 1000;
    const now = new Date().getTime();
    const limit = (expired - 600000) - now;

    if( limit > 500000) {  
        return buildCallServer(method, data, type);
    } else {
        headers.append('Authorization', tokenType + ' ' + userData().access_token); 
        const config ={ 
            "method": "GET",
            headers
        };

        if(enviroment){
            try {
                const response = await fetch(`${enviroment.apiURL.url}refresh`, config);
                if(response.status === 200){
                    console.log("refrescado");
                  const datos = await response.json();
                localStorage.setItem('user', JSON.stringify(datos));
                return buildCallServer(method, data, type);  
                }else if(response.status === 401){
                    localStorage.removeItem('user');
                    localStorage.removeItem('column');
                    localStorage.removeItem('reparation');
                    
                      window.location.reload()
                    
                }
              } catch (error) {
                localStorage.removeItem('user');
                localStorage.removeItem('column');
                localStorage.removeItem('reparation');
                console.error('Error en la solicitud:', error);
                // Manejar el error según sea necesario
                return <NotAuthorized/>; // O cualquier otro valor que desees devolver en caso de error
              }
    
            await fetch(`${enviroment.apiURL.url}refresh`, config)
              .then( res  => res.json())
              .then( datos =>{
                console.log("refrescado2");           
                //setear datos nuevos
                localStorage.setItem("user",JSON.stringify(datos)) 
              });
              return buildCallServer(method, data, type) 
        }
    }

}

async function buildCallServer( method, data = {}, type = null) {


    const userData = () =>{
        if(localStorage.user){
            return JSON.parse( localStorage.getItem('user') );
        }else{
            window.location.reload()
        }
    } 
    const tokenType = userData().token_type[0].toUpperCase() + userData().token_type.slice(1, userData().token_type.length );

          
    if(type === 'dataTable'){
        return {
            method: method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': tokenType + ' ' + userData().access_token
            },
        };
    }
    
    if(type === 'dataTablePost'){
        return{
            method: method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': tokenType + ' ' + userData().access_token
        },
        body: JSON.stringify(data) 
        };
    };

    if(type === 'dataTablePut'){
        return{
            method: method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': tokenType + ' ' + userData().access_token
        },
        body: JSON.stringify(data)
        };
    };

    return {
        method: method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': tokenType + ' ' + userData().access_token
        },
        body: JSON.stringify(data) 
    };  
}