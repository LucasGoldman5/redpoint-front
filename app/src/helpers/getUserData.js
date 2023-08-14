/* global GetUserData */

export default function GetUserData() {


    if(localStorage.user){

        let user = JSON.parse(localStorage.getItem('user')).user;

        if(user){
            return user    
        }else{    
            return false
        }
    }else{
        
        return false;

    }
    
}