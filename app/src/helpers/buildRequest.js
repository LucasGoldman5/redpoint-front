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
    const expired = new Date(tokenDecode.exp * 1000);
    const now = Date.now();
    const limit = (expired.getTime() - 60000) - now;


    if( limit > 0 ) {
        return buildCallServer(method, data, type);
    } else {
        const config = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': tokenType + ' ' + userData.access_token
        };

        await fetch(`http://localhost:8000/api/refresh`, config)
          .then( res  => res.json())
          .then( datos =>{
            console.log(datos);
            //setear datos nuevos
            localStorage.setItem("user",JSON.stringify(datos))

            return buildCallServer(method, data, type);
          }); 
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