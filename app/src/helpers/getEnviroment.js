
/* global getEnviroment */
export default async function getEnviroment(){

    const enviroment = await fetch ('/enviroment.json')
    .then(res  => res.json())
    .then( datos =>{
        return datos
      }) 
    .catch(error => {
        console.log('Error al obtener el archivo enviroment.json:', error);
      });
    return enviroment;
}