import NotAuthorized from "../componentes/pageNotAuthorized";

/* global HelperBuildRequest */
export default async function  HelperBuildRequest ( method, data = {}, type = null ) {

    const headers = new Headers().append('Accept', 'application/json');

    
    if(type === 'login') {
        return {
            method: method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        };
    }

    if(type === 'register') {
        return {
            method: method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        };
    }
        
    const userData = JSON.parse( localStorage.getItem('user') );
    const tokenType = userData.token_type[0].toUpperCase() + userData.token_type.slice(1, userData.token_type.length );

    const tokenArr = userData.access_token.split('.');
    const tokenDecode =  JSON.parse( atob(tokenArr[1]) );
 
    const expired = tokenDecode.exp * 1000;
    const now = Date.now();
    const limit = (expired - 600000) - now;

    if( limit > 2222222 ) {      
        return buildCallServer(method, data, type);
    } else {
        const config ={ 
            "method": "GET",
            "headers": {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': tokenType + ' ' + userData.access_token
            }
        };

        try {
            const response = await fetch('http://localhost:8000/api/refresh', config);
            if(response.status === 200){
              const datos = await response.json();
            localStorage.setItem('user', JSON.stringify(datos));
            return buildCallServer(method, data, type);  
            }else if(response.status === 401){
                console.log("fallo");
                localStorage.removeItem('user');
                localStorage.removeItem('column');
                window.location.reload()
                setTimeout(()=>{
                    console.log("fallo 2");
                    
                },1500)
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
            // Manejar el error según sea necesario
            return <NotAuthorized/>; // O cualquier otro valor que desees devolver en caso de error
          }
        await fetch(`http://localhost:8000/api/refresh`, config)
          .then( res  => res.json())
          .then( datos =>{           
            //setear datos nuevos
            localStorage.setItem("user",JSON.stringify(datos)) 
          });
          return buildCallServer(method, data, type) 
    }

}

function buildCallServer( method, data = {}, type = null) {

    const userData = JSON.parse( localStorage.getItem('user') );
    const tokenType = userData.token_type[0].toUpperCase() + userData.token_type.slice(1, userData.token_type.length );

          
    if(type === 'dataTable'){
        return {
            method: method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': tokenType + ' ' + userData.access_token
            },
        };
    }
    
    if(type === 'dataTablePost'){
        return{
            method: method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': tokenType + ' ' + userData.access_token
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
            'Authorization': tokenType + ' ' + userData.access_token
        },
        body: JSON.stringify(data)
        };
    };

    return {
        method: method,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': tokenType + ' ' + userData.access_token
        },
        body: JSON.stringify(data) 
    };  
}