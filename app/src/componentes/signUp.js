import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import './signUp.css';
import { Link } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { PulseLoader } from "react-spinners";


const SignUp = () =>{

  const [verContraseña, setVerContraseña] = useState(false);
  const [verContraseñaConfirmada, setVerContraseñaConfirmada] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  



  useEffect(() =>{

    if(registros.length >= 1){

      setLoading(true);
      setTimeout(() => {
        setLoading(false)
        setRespuesta(true)       
      }, 3000); 

    };
  },[registros]);


  const onSubmit = (data) =>{ 
    let usuario = {data}
    setRegistros([...registros, usuario]);
    limpiarFormulario();
  };
  
  const limpiarFormulario = () =>{ 
    document.getElementById("formularioSignUp").reset();
  };

  const verContraseñaClick = () =>{
    setVerContraseña(!verContraseña)
  }

  const verContraseñaConfirmadaClick = () =>{
    setVerContraseñaConfirmada(!verContraseñaConfirmada)
  }

  const contraeña = watch('contraseña');


  const { register, formState: { errors }, handleSubmit ,watch} = useForm ();


    if(loading === false && respuesta===null){

      return(
            <>
                <div className="contenedor-form-registrarse">
                    <h4 className="h4-registro">Registrarse</h4>
                        <div className="form-registrarse">
                            <form id="formularioSignUp" onSubmit={handleSubmit(onSubmit)}>
                                <div className="inputs ">
                                    <label>Nombre de Usuario</label>
                                    <input className="input" type="text"  {...register('nombre', {
                                        required: true,
                                        maxLength: 10
                                    })}>   
                                    </input>
                                    {errors.nombre?.type === 'required' && <p className="p-validacion">El campo Nombre de Usuario debe ser completado</p>}
                                    {errors.nombre?.type === 'maxLength' && <p className="p-validacion">El campo Nombre de Usuario debe tener menos de 10 caracteres</p>}        
                                </div>
                                <div className="inputs contraseña">
                                    <label>Contraseña</label>
                                    <input className="input" type={(verContraseña === false)? 'password' : 'text'}  {...register('contraseña', {
                                        required: true,
                                        pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
                                    })}>
                                    </input>
                                    {errors.contraseña?.type === 'pattern' && <p className="p-validacion">La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.Puede tener otros símbolos.</p>}
                                    {errors.contraseña?.type === 'required' && <p className="p-validacion">El campo contraseña debe completarse.</p>}
                                    <div className="iconos">
                                            {
                                            (verContraseña === false) ? <AiFillEyeInvisible  onClick={verContraseñaClick}/> : <AiFillEye onClick={verContraseñaClick}/>
                                            }
                                    </div>
                                </div>
                                <div className="inputs contraseña">
                                    <label>Confirmar contraseña</label>
                                    <input className="input" type={(verContraseñaConfirmada === false)? 'password' : 'text'}  {...register('contraseña2', {
                                        required: true, 
                                        validate : (value) => value === contraeña
                                    })}>
                                    </input>
                                    {errors.contraseña2?.type === 'validate' && <p className="p-validacion">La contraeña no coincide</p>}
                                    {errors.contraseña2?.type === 'required' && <p className="p-validacion">El campo contraseña debe completarse.</p>}
                                    <div className="iconos">
                                        {
                                        (verContraseñaConfirmada === false) ? <AiFillEyeInvisible  onClick={verContraseñaConfirmadaClick}/> : <AiFillEye onClick={verContraseñaConfirmadaClick}/>
                                        }
                                    </div>
                                </div>
                                <div className="inputs">
                                    <label>Correo Electronico</label>
                                    <input className="input" type="email"  {...register('email')}></input>
                                </div>
                                <div className="input-submit">
                                    <input  type="submit" value="Registrar" name=""></input>
                                </div>
                                <div className="contenedor-p">
                                    <p className="p-volver">Si ya esta registrado haga click en <Link to={'/Login'}>Inicio</Link></p>
                                </div>
                            </form>
                        </div>
                </div>
            </>
      )
    }else if(loading === true && respuesta === null){

        return(
                <>
                   <div className="contenedor-form-registrarse-loading">
                        <h3>Enviando Registro</h3>
                        <PulseLoader className="animacion-loading" color="#36d7b7" size={20}></PulseLoader>
                    </div>
                </>
        )

    }else if(loading === false && respuesta === true){

        return(
                <>
                    <div className="contenedor-form-registrarse-loading">
                        <h3>Registro enviado exitosamente</h3>  
                        <div className="contenedor-p">
                             <p className="p-volver">Haga click en <Link to={'/Login'}>Inicio</Link> para comenzar</p>
                        </div>
                    </div>
               </>
        )
    };
};

export default SignUp;