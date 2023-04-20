import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import './signUp.css'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { PulseLoader } from "react-spinners";
import HelperBuildRequest from "../helpers/buildRequest";
import GetUserData from "../helpers/getUserData";


const Login = ({ingresarAplicacion}) =>{

 const caca = GetUserData()

 console.log(caca)

    const [verContraseña, setVerContraseña] = useState(false)       
    const [loading, setLoading] = useState(false);
    const [respuesta, setRespuesta] = useState(null);
    const [errores, setErrores] = useState(false);
    const [txtErrores, setTxtErrores] = useState("")



    const onSubmit = async (data) =>{ 
    limpiarFormulario();
    
    if(data ){
        
        setLoading(true) 

            try {
                const config = HelperBuildRequest("POST", data, 'login');
                
                const request = await fetch("http://localhost:8000/api/login", config);

                console.log(request);

                if(request.status === 200){
                    const response = await request.json();
                    console.log(response);
                    if(response.error){
                        setTimeout(()=>{
                            setLoading(false)
                            setRespuesta(false)
                            setErrores(true)
                            setTxtErrores(`${response.error}`)
                        },1000);
                    }else{
                       setTimeout( () => {
                        setLoading(false)
                        setRespuesta(true)
                        localStorage.setItem("Usuario",JSON.stringify(response))
                    }, 2000);  
                    }  
                }else{
                    setLoading(false)
                    setRespuesta(false)
                    setErrores(true)
                    setTxtErrores(`El usuario ingresado no es valido`);
                }
           }catch(error){
            console.log(error)
           }
           
       }
    }


    const limpiarFormulario = () =>{
    document.getElementById("formularioLogin").reset()
    }
        

    const { register, formState: { errors }, handleSubmit} = useForm ();
  
    const verContraseñaClick = () =>{
        setVerContraseña(!verContraseña)
    }

    const volverLogin = () =>{
        window.location.reload()
    }


       if(loading ===false && respuesta === null && errores===false){
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
                                })}></input>
                                {errors.name?.type === 'required' && <p className="p-validacion">El campo Nombre de Usuario debe ser completado</p>}
                                {errors.name?.type === 'maxLength' && <p className="p-validacion">El campo Nombre de Usuario debe tener menos de 10 caracteres</p>}
                            </div>
                            <div className="inputs contraseña">
                                <label>Contraseña</label>
                                <input className="input" type={(verContraseña === false)? 'password' : 'text'}  {...register('password', {
                                    required: true,
                                    pattern: /^\S{4,16}$/
                                })}></input>
                                {errors.password?.type === 'pattern' && <p className="p-validacion">La contraseña debe tener entre 4 y 16 caracteres.</p>}
                                {errors.password?.type === 'required' && <p className="p-validacion">El campo contraseña debe completarse.</p>}
                                <div className="iconos">
                                    {
                                        (verContraseña === false) ? <AiFillEyeInvisible  onClick={verContraseñaClick}/> : <AiFillEye onClick={verContraseñaClick}/>
                                    }
                                </div>
                            </div>
                            <div className="inputs">
                                <label>Correo Electronico</label>
                                <input className="input" type="email"  {...register('email',{
                                    required: true
                                })}></input>
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
       }else if(loading===true && respuesta===null && errores===false){
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
    }else if(loading===false && respuesta===true && errores===false){
        return(
            <>
            
            <div className="contenedor-body-login">
                <div className="contenedor-form-registrarse-loading">
                    <h3 className="h3-encontrado">Usuario Encontrado!</h3>
                    <p>Para iniciar la aplicacion haga click en el siguiente boton:</p>
                    <div>
                        <button onClick={ingresarAplicacion}>Ingresar</button>
                    </div>  
                </div>
            </div>
            </>
        )
    }else if(loading===false && respuesta===false && errores===true){
        return(
            <>
            
           <div className="contenedor-body-login">
            <div className="contenedor-form-registrarse-loading">
                <h3 className="h3-error">{txtErrores}</h3>
                <p>Presione el siguiente boton para volver a intentarlo</p>
                <button onClick={volverLogin}>volver</button>
                </div>
           </div>
            </>
        )

    }
}

export default Login;