/* global HelperBuildRequest */
export default function  HelperBuildRequest(method, data = {}, type = null) {
    const headers = new Headers().append('Accept', 'application/json');

    
    if(type === 'login')
        return {
            method: method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data) 
        };
        
    const userData = JSON.parse( localStorage.getItem('Usuario') );
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
        }
    }
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