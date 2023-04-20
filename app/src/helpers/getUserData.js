/* global GetUserData */
export default function GetUserData() {

    if(localStorage.length >= 1){
       return  JSON.parse(localStorage.getItem('Usuario')).user; 
    }else{
        return false
    }
    
}