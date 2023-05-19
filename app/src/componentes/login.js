import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Await, Link } from "react-router-dom";
import './signUp.css';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { PulseLoader } from "react-spinners";
import HelperBuildRequest from "../helpers/buildRequest";
import getEnviroment from "../helpers/getEnviroment";


const Login = ({enterAplication}) =>{


  const [viewPassword, setViewPassword] = useState(false);       
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [txtError, setTxtError] = useState("");

  

  const onSubmit = async (data) =>{

    const url = await getEnviroment();
    const apiURL = await url

    cleanForm();
      if(data){
        
        setLoading(true) 
        try{

            const config = await HelperBuildRequest("POST", data, 'login');
            const request = await fetch(`${apiURL.apiURL}login`, config);

            if(request.status === 200){
                const response = await request.json();
                  if(response.error){
                    setTimeout(()=>{
                        setLoading(false)
                        setResponse(false)
                        setError(true)
                        setTxtError(`${response.error}`)
                    },1000);
                  }else{
                    setTimeout( () => {
                        setLoading(false)
                        setResponse(true)
                        localStorage.setItem("user",JSON.stringify(response))
                    }, 2000);  
                  }  
            }else{
                setLoading(false)
                setResponse(false)
                setError(true)
                setTxtError(`El usuario ingresado no es valido`);
            }

        }catch(error){
            console.log(error);
        };          
      };
  };


  const cleanForm = () =>{
    document.getElementById("formularioLogin").reset();
  };

  const viewPasswordClick = () =>{
    setViewPassword(!viewPassword)
  }

  const returnLogin = () =>{
    window.location.reload()
  }
        
  const { register, formState: { errors }, handleSubmit} = useForm ();
  
  
    if(loading ===false && response === null && error === false){

        return(
          <>
            
            <div className="contenedor-body-login">
              <div className="contenedor-form-registrarse">
                <h4 className="h4-registro">Iniciar</h4>
                <div className="form-registrarse">
                    <form id="formularioLogin" onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputs">
                            <label>Nombre de Usuario</label>
                            <input className="input" type="text"  {...register('name', {
                                required: true,
                                maxLength: 10
                                })}>
                            </input>
                                {errors.name?.type === 'required' && <p className="p-validacion">El campo Nombre de Usuario debe ser completado</p>}
                                {errors.name?.type === 'maxLength' && <p className="p-validacion">El campo Nombre de Usuario debe tener menos de 10 caracteres</p>}
                        </div>
                        <div className="inputs contraseña">
                            <label>Contraseña</label>
                            <input className="input" type={(viewPassword === false)? 'password' : 'text'}  {...register('password', {
                                required: true,
                                pattern: /^\S{4,16}$/
                                })}>                                    
                            </input>
                                {errors.password?.type === 'pattern' && <p className="p-validacion">La contraseña debe tener entre 4 y 16 caracteres.</p>}
                                {errors.password?.type === 'required' && <p className="p-validacion">El campo contraseña debe completarse.</p>}
                            <div className="iconos">
                                {
                                (viewPassword === false) ? <AiFillEyeInvisible  onClick={viewPasswordClick}/> : <AiFillEye onClick={viewPasswordClick}/>
                                }
                            </div>
                        </div>
                        <div className="inputs">
                            <label>Correo Electronico</label>
                            <input className="input" type="email"  {...register('email',{
                                required: true
                                })}>                             
                            </input>
                                {errors.email?.type === 'required' && <p className="p-validacion">El campo e-mail debe ser completado</p>}
                        </div>
                        <div  className="input-submit">
                            <button  type="submit" value="Inicio" >Inicio</button>
                        </div>
                        <div>
                            <p className="mensajealerta-p"></p>
                        </div>
                        <div className="contenedor-p">
                            <p>Si no esta registrado haga click en <Link to={'/SignUp'}>Registrarse</Link></p>
                        </div>
                    </form>
                </div>
              </div>
            </div>
            
          </>
        )
    }else if(loading === true && response === null && error === false){

        return(
          <>
            
            <div className="contenedor-body-login">
                <div className="contenedor-form-registrarse-loading">
                    <h3>Buscando Usuario</h3>
                    <PulseLoader className="animacion-loading" color="#36d7b7" size={20}></PulseLoader>
                </div>
            </div>
          </>
        )

    }else if(loading === false && response === true && error === false){

        return(
          <>
            
            <div className="contenedor-body-login">
                <div className="contenedor-form-registrarse-loading">
                    <h3 className="h3-encontrado">Usuario Encontrado!</h3>
                    <p>Para iniciar la aplicacion haga click en el siguiente boton:</p>
                    <div>
                        <button onClick={enterAplication}>Ingresar</button>
                    </div>  
                </div>
            </div>
          </>
        )

    }else if(loading === false && response === false && error === true){

        return(
          <>
            
           <div className="contenedor-body-login">
                <div className="contenedor-form-registrarse-loading">
                    <h3 className="h3-error">{txtError}</h3>
                    <p>Presione el siguiente boton para volver a intentarlo</p>
                    <button onClick={returnLogin}>volver</button>
                </div>
           </div>
          </>
        );
    };
};

export default Login;