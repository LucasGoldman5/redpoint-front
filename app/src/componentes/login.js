import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import './formsRegister.css';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { PulseLoader } from "react-spinners";
import HelperBuildRequest from "../helpers/buildRequest";



const Login = ({enviroment}) =>{


  const [viewPassword, setViewPassword] = useState(false);       
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [txtError, setTxtError] = useState("");

  useEffect(()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('column');
    localStorage.removeItem('reparation');
  },[])

  
  const onSubmit = async (data, event) =>{

    event.preventDefault()

    const env = enviroment.selfUrl
    const env2 = enviroment

    setLoading(true)
      if(data){
         
        try{

            const config = await HelperBuildRequest("POST", data, 'login');
            const request = await fetch(`${enviroment.apiURL.url}login`, config);
            console.log(request);
            if(request.status === 200){
                const response = await request.json();
                  if(response.error){
                    setTimeout(()=>{
                        setLoading(false)
                        setError(true)
                        setTxtError(`${response.error}`)
                    },2000);
                  }else{
                    setError(false)
                    setTimeout( () => {
                        window.location.assign(`${env.main}${env.dataTable}${env2.entities.pending}`);
                        localStorage.setItem("user",JSON.stringify(response))
                    },2000);  
                  }  
            }else if(request.status === 422){
              setLoading(false)
              const response = await request.json();
                    if(response.errors){
                      alert("Debe completar o corregir el formulario")
                      setErrors(response.errors); 
                    };
            }else if(request.status === 403){
              const response = await request.json();
              if(response.error){                
                  setLoading(false)
                  setError(true)
                  setTxtError(`El usuario ingresado no es valido`) 
              }              
            }

        }catch(error){
            console.log(error);
        };          
      };
  };


  const viewPasswordClick = () =>{
    setViewPassword(!viewPassword)
  }

  const returnLogin = () =>{
    window.location.reload()
  }

  const changeError = (entity,value) =>{
    if(entity === "name"){
      setErrors({name:null, password:errors.password, email:errors.email})
    }
    else if(entity === "password"){
      setErrors({name:errors.name, password:null, email:errors.email})
    }
    else if(entity === "email"){
      setErrors({name:errors.name, password:errors.password, email:"El email requiere este formato : xxxx@xx.xx"})
      if(value.includes("@" && ".")){
        setErrors({name:errors.name, password:errors.password, email:null})
      }
    }
  }
        
  const { register,  handleSubmit} = useForm ();
  
  
    if(loading === false  && error === false){

        return(
          <>
            
            <div className="contenedor-body-login">
              <div className="contenedor-form-registrarse">
                <h4 className="h4-registro">Iniciar</h4>
                <div className="form-registrarse-container">
                    <form className="form-login" id="formularioLogin" onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputs">
                            <label>Correo Electronico</label>
                            <input className={errors.email ? "input error" : "input"} type="email"  {...register('email',{
                              onChange: (e) => changeError("email",e.target.value)
                                })}>                             
                            </input>
                                {errors.email ? <p className="p-validacion">{errors.email}</p> : ""}
                        </div>
                        <div className="inputs contraseña">
                            <label>Contraseña</label>
                            <div className="label-input-password">
                              <input className={errors.password ? "input error" : "input"} type={(viewPassword === false)? 'password' : 'text'}  {...register('password', {
                                onChange: () => changeError("password")
                                  })}>                                    
                              </input>
                                  {errors.password ? <p className="p-validacion">{errors.password}</p> : ""}
                              <div className="iconos">
                                  {
                                  (viewPassword === false) ? <AiFillEyeInvisible  onClick={viewPasswordClick}/> : <AiFillEye onClick={viewPasswordClick}/>
                                  }
                              </div>
                            </div>
                        </div>
                        <div  className="input-submit">
                            <button  type="submit" value="Inicio" >Inicio</button>
                        </div>                                        
                    </form>
                </div>
              </div>
            </div>
            
          </>
        )
    }else if(loading === true  && error === false ){

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

    }else if(loading === false  && error === true){

        return(
          <>
            
           <div className="contenedor-body-login">
                <div className="contenedor-form-registrarse-loading">
                    <h3 className="h3-error">{txtError}</h3>
                    {
                      txtError.includes("activo")
                      ?
                      <p>Un super-admin debe activarlo para poder ingresar</p>
                      :
                      ""
                    }
                    <div className="input-submit">
                    <button onClick={returnLogin}>volver</button>
                    </div>
                </div>
           </div>
          </>
        );
    };
};

export default Login;