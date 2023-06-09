
import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import './formsRegister.css';
import { Link } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { PulseLoader } from "react-spinners";
import HelperBuildRequest from "../helpers/buildRequest";
console.log('sads')

const GeneratePassword = ({enviroment}) =>{

    /*generate-password/hash/user_id*/

  const [verContraseña, setVerContraseña] = useState(false);
  const [verContraseñaConfirmada, setVerContraseñaConfirmada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [user, setUser] = useState([]);
  const [txtError, setTxtError] = useState("");

  const hash = window.location.hash.substring(1)
  
  useEffect(()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('column');
    setTimeout(()=>{
        setSpinner(false);
    },2000)
    getUser()
  },[])

  const getUser = async () =>{

    try{
                  
        const config = await HelperBuildRequest("GET",null, "register");
        const request = await fetch(`${enviroment.apiURL.url}${enviroment.apiURL.getUser}${hash}`, config);

          if(request.status === 200){
              const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                    
                    setUser(response.data)
                }  
          };

      }catch(error){
        console.log(error)
      }

  }

  const onSubmit = async (data) =>{
    
    console.log(data);
    setLoading(true);
    
      if(data){
        
        try{

            const config = await HelperBuildRequest("POST", data, 'login');
            const request = await fetch(`${enviroment.apiURL.url}${enviroment.apiURL.generatePassword}${user.hash}/${user.id}`, config);

            if(request.status === 200){
                
                const response = await request.json();
                  if(response.error){
                    setTimeout(()=>{
                        setLoading(false)
                        setResponse(false)
                        setTxtError(`${response.error}`)
                    },1000);
                  }else{
                    setTimeout( () => {
                        setLoading(false)
                        setResponse(true)
                        localStorage.setItem("user",JSON.stringify(response))
                    }, 2000);  
                  }  
            }else if(request.status === 422){
                const response = await request.json();
                    if(response.errors){
                      alert("Debe completar o corregir el formulario")
                      setErrors(response.errors); 
                    };
            }else{
                setLoading(false)
                setResponse(false)
                setTxtError(`El usuario ingresado no es valido`);
            }

        }catch(error){
            console.log(error);
        };          
      }else{
        alert("La informacion del usuario no esta definida")
      }
  };


  const verContraseñaClick = () =>{
    setVerContraseña(!verContraseña)
  }

  const verContraseñaConfirmadaClick = () =>{
    setVerContraseñaConfirmada(!verContraseñaConfirmada)
  }


  const { register, handleSubmit,getValues ,watch} = useForm ();
  const contraeña = watch('contraseña');

    if(spinner === false){
        if(loading === false && response===null && user.name){

            return(
                  <>
                    <div className="body-container">
                      <div className="contenedor-form-registrarse">
                      <h4 className="h4-registro">Generar Contraseña</h4>
                          <div className="form-registrarse-container">
                              <form className="form-generate-password" id="formularioSignUp" onSubmit={handleSubmit(onSubmit)}>
                                  <div className="inputs ">
                                      <label>Nombre de Usuario</label>
                                      <input className={errors.name ? "input error" : "input"} type="text" readOnly value={user.name}  {...register('name', {
                                      })}>   
                                      </input>
                                      {errors.name ?<p className="p-validacion">{errors.name}</p> : ""}       
                                  </div>
                                  <br/>
                                  <div className="inputs contraseña">
                                      <label>Contraseña</label>
                                      <div className="label-input-password">
                                          <input className={errors.password ? "input error" : "input"} type={(verContraseña === false)? 'password' : 'text'}  {...register('password', {
                                          })}>
                                          </input>
                                          {errors.password ? <p className="p-validacion">{errors.password}</p> : ""}
                                          <div className="iconos">
                                                  {
                                                  (verContraseña === false) ? <AiFillEyeInvisible  onClick={verContraseñaClick}/> : <AiFillEye onClick={verContraseñaClick}/>
                                                  }
                                          </div>
                                      </div>
                                  </div>
                                  <br/>
                                  <div className="inputs contraseña">
                                  <label>Confirmar contraseña</label>
                                      <div className="label-input-password">   
                                          <input className={errors.confirm_password ? "input error" : "input"} type={(verContraseñaConfirmada === false)? 'password' : 'text'}  {...register('password_confirmation', {
                                              required: true, 
                                              validate : (value) => value === contraeña
                                          })}>
                                          </input>
                                          {errors.password_confirmation ? <p className="p-validacion">{errors.confirm_password}</p> : ""}                
                                      <div className="iconos">
                                          {
                                          (verContraseñaConfirmada === false) ? <AiFillEyeInvisible  onClick={verContraseñaConfirmadaClick}/> : <AiFillEye onClick={verContraseñaConfirmadaClick}/>
                                          }
                                      </div>
                                      </div>
                                  </div>
                                  <br/>
                                  <div className="inputs">
                                      <label>Correo Electronico</label>
                                      <input className="input" type="email" readOnly value={user.email}  {...register('email')}></input>
                                  </div>
                                  <br/>
                                  <div className="input-submit">
                                      <button  type="submit" onClick={()=> onSubmit(getValues())} name="">Registrar</button>
                                  </div>  
                              </form>
                          </div>
                      </div>
                    </div>
                  </>
            )
          }else if(loading === true && response === null){
      
              return(
                      <>
                         <div className="body-container">
                            <div className="contenedor-form-registrarse-loading">
                              <h3>Enviando Registro</h3>
                              <PulseLoader className="animacion-loading" color="#36d7b7" size={20}></PulseLoader>
                            </div>
                         </div>
                      </>
              )
      
          }else if(loading === false && response === true){
      
              return(
                      <>
                          <div className="body-container">
                            <div className="contenedor-form-registrarse-loading">
                                <h3>Registro enviado exitosamente</h3>  
                                <div className="contenedor-p">
                                    <p className="p-volver">Haga click en <Link to={'/Login'}>Inicio</Link> para ingresar con el usuario activado</p>
                                </div>
                            </div>
                          </div>
                     </>
              )
          };
    }else{
        return(
            <div className="container-spinner">
                <PulseLoader className="animacion-loading" color="#d41c1c" size={20}></PulseLoader>
            </div>
        )
    }
}

export default GeneratePassword