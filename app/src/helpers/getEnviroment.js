
import env from '../enviroment.json';
/* global getEnviroment */
export default async function getEnviroment(){

    /*const enviroment = await fetch('../enviroment.json')
    .then(res  => res.json())
    .then( datos =>{
        return datos
      }) 
    .catch(error => {
        return { message: `<p class="error"> Error al obtener el archivo enviroment.json: ${error}</p>`, error};
      });*/
    return env;
}