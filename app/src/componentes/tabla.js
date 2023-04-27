import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';
import './tabla.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import BotonAgregar from './boton-agregar';
import 'bootstrap/dist/css/bootstrap.css';
import ModalAgregar from './modal-agregar';
import ModalEditar from './modal-editar';
import ModalVer from './modal-ver';
import HelperBuildRequest from "../helpers/buildRequest";
import {  useLocation } from 'react-router-dom';




const Tabla = () =>{

    const [dataApi, setDataApi] = useState([]);
    const [dataBrands, setDataBrands] = useState([])
    const [superAdmin, setSuperAdmin] = useState(null)
    const [abrirModalAgregar, setAbrirModalAgregar] = useState(false);
    const [abrirModalAgregarMarca, setAbrirModalAgregarMarca] = useState(false)
    const [abrirModalEditar, setAbrirModalEditar] = useState(false);
    const [abrirModalVer, setAbrirModalVer] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToSee, setItemToSee] = useState(null)
    const [cadena,setCadena] = useState("");
    const [errores, setErrores] = useState([]);
    const [clasesErrores, setClasesErrores] = useState(false)


    const location = useLocation();
    const traerUsuario = localStorage.getItem("Usuario");
    const tablas = [
      {
        "brands":"Marcas",
        "cellphones":"Celulares",
        "services":"Servicios",
        "customers":"Clientes",
        "reparations":"Reparaciones"
     }]

    const admin = () =>{
      let usuario = JSON.parse(traerUsuario)
      if(usuario.user.roles === "admin"){
        setSuperAdmin(true)
      }else if(usuario.user.roles === "super-admin"){
        setSuperAdmin(false)
      }
    }
    

    useEffect(() => {
      if(dataApi.length===0){
        getData();
        admin()
      }
    }, [])

    const getData = async () => {
      const queryParams = new URLSearchParams(location.search)
      const txt = queryParams.get("txt")
      console.log(txt);
      const config = HelperBuildRequest('GET', null, 'dataTable');
      await fetch(`http://localhost:8000/api/${txt}`, config)
      .then( res  => res.json())
      .then( datos =>{
        console.log(datos);
        setDataApi(datos)
      })
    }


    const abrirModal =  async () =>{
      setAbrirModalAgregar(true)
      
        try {
                    
          const config = HelperBuildRequest("GET",null, "dataTable");
          const request = await fetch(`http://localhost:8000/api/brands`, config);

            if(request.status === 200){
                const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                      
                    setDataBrands(response.data);
                }  
            }
        }catch(error){
          console.log(error)
        }    

    }

    const cambiarModal = () =>{
      setAbrirModalAgregar(false)
      setAbrirModalAgregarMarca(true)
    }

    const agregarMarcaEnCellphones = async (data)=>{

      if(data ){
        try {

            const config = HelperBuildRequest("POST", data, "dataTablePost");
            const request = await fetch(`http://localhost:8000/api/brands`, config);

              if(request.status === 200){
                  const response = await request.json();
                  if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                  }else{                      
                      window.location.reload()

                  }  
              }
             if(request.status === 422){
              const response = await request.json()
              console.log(response);
              if(response.errors){
                console.log(response.errors);
                setErrores(response.errors)
              }
             }
      }catch(error){
        console.log(error)
      }    
  }

    }

    const cerrarFormulario=()=>{
      setAbrirModalAgregar(false); 
      setAbrirModalAgregarMarca(false)
      setAbrirModalEditar(false)
      setAbrirModalVer(false)
      setItemToEdit(null)
    }


    const agregar= async (data)=>{
    console.log(data);
        if(data ){
              try {
                  const queryParams = new URLSearchParams(location.search)
                  const txt = queryParams.get("txt")
                  const config = HelperBuildRequest("POST", data, "dataTablePost");
                  const request = await fetch(`http://localhost:8000/api/${txt}`, config);

                    if(request.status === 200){
                        const response = await request.json();
                        if(response.error){
                            setTimeout(()=>{
                              console.log(response.error);
                            },1000);
                        }else{                      
                            setAbrirModalAgregar(false)
                            window.location.reload()
                        }  
                    }
                   if(request.status === 422){
                    const response = await request.json()
                    if(response.errors){
                      setErrores(response.errors)
                      setClasesErrores(true);
                    }
                   }
            }catch(error){
              console.log(error)
            }    
        }
        
      }


    const AbrirModalEditar = async(element) =>{
            setItemToEdit(element)
            setAbrirModalEditar(true)
            
            try {
                
              const config = HelperBuildRequest("GET",null, "dataTable");
              const request = await fetch(`http://localhost:8000/api/brands`, config);
        
                if(request.status === 200){
                    const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataBrands(response.data);
                    }  
                }
            }catch(error){
              console.log(error)
            }    
          }   
  
      
          
    const editar =  async (data) =>{
      let id = data["id"]
      console.log(data);
      if(data){
        try {
          const queryParams = new URLSearchParams(location.search)
          const txt = queryParams.get("txt")
          const config = HelperBuildRequest("PUT", data, "dataTablePut");
          const request = await fetch(`http://localhost:8000/api/${txt}/${id}`, config);

            if(request.status === 200){
                const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                      
                    setAbrirModalEditar(false);
                    window.location.reload()
                }  
            }
            if(request.status === 422){
              const response = await request.json();
              console.log(response);
              if(response.errors){
                console.log(response.errors);
                setErrores(response.errors)
              }
              
            }
            if(request.status === 400){
              
            }
        }catch(error){
          console.log(error)
        }    
        
      }
      
    }  


    const eliminar= async (i)=>{
      const controlList = ['title', 'model', 'name', 'phone_number'  ];
      const keys = Object.keys(i);
      const include = keys.filter( (key) => controlList.includes(key) ).sort( (a,b) => a.localeCompare(b));
      const id = i.id;
      swal({
        title:"Eliminar",
        text:`¿Seguro que desea eliminar a ${include} ${i[include]}`,
        buttons: ["No","Si"]
      }).then(async respuesta =>{
        if(respuesta){
          try {
            const queryParams = new URLSearchParams(location.search)
            const txt = queryParams.get("txt")
            const config = HelperBuildRequest("DELETE", "dataTable");
            const request = await fetch(`http://localhost:8000/api/${txt}/${id}`, config);

              if(request.status === 200){
                  const response = await request.json();
                  if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                  }else{                      
                      const nuevaData = {columns:dataApi.columns,data:dataApi.data.filter(item => item.id !== i.id)};
                      setDataApi(nuevaData);
                      window.location.reload()
                  }  
              }
          }catch(error){
            console.log(error)
          }  

          
        }
      })

    }


    const AbrirModalVer = (element) => {
      setItemToSee(element)
      setAbrirModalVer(true); 
    }


    if(dataApi.length != 0){

     const dato = dataApi.columns.filter((dato)=>{
                 const listaDeColumnas = ['title', 'model', 'name', 'description', 'id','phone_number','email']
                 if(listaDeColumnas.includes(dato)){
                  return dato
                 } 
              });

    return(  

      <>
          
          <div className='titulo-tabla'>
            {tablas.map((titulo)=>{
              const queryParams = new URLSearchParams(location.search)
              const txt = queryParams.get("txt")
                if(Object.keys(titulo).includes(txt)){
                return <h1 key={txt}>Datos de {titulo[txt]}</h1>
                }
            })}
          </div>
          
          
          <div className='contenedor-body'>
          <div className='contenedor-barra-botonagregar'>
              <BotonAgregar abrirModal={abrirModal}> </BotonAgregar>
              <div className='contenedor-barra'>
                <input type='text' placeholder={`buscar por... ${dato}`} className='barra-busqueda' onChange={(e) => setCadena(e.target.value.toLocaleLowerCase())}/>
              </div>      
          </div>
          
          <div className="contenedor-tabla">
              <table className='tabla'>
                <thead className='thead'>
                  <tr className='tr-column'>
                  {dataApi.columns.map((column)=>(
                    <th key={column} className='th-columnas'>{column}</th>
                  ))}
                  <th className='ultima-columna'>Acciones</th>
                  </tr>
                </thead>
                <tbody className='tbody'>
                  {
                  dataApi.data.filter((dato) =>{ 
                    const controlList = ['title', 'model', 'name', 'description', 'id','phone_number','email'];
                    const keys = controlList;
                    for(let property in dato ){
                      if(keys.includes(property)){
                        const value = dato[property];
                        if(value && typeof value == 'string'){
                          if(value.toLocaleLowerCase().includes(cadena))
                            return value
                        }if(value && typeof value == 'number'){
                          if(value.toString().includes(cadena))
                            return value 
                        }
                      }
                    }
                    return false;
                  }).map( (element)=>
                      
                        <tr className='tr-data' key={element["id"]}>

                            {dataApi.columns.map((column)=>{
                              for(let i = 0 ; i < Object.keys(element).length ; i++){
                                if(Object.keys(element)[i] === column){
                                  if(Object.keys(element)[i] === column && column === "url"){
                                    return <td className='td-a' key={i}><a href={Object.values(element)[i]} >{Object.values(element)[i]}</a></td>
                                  }
                                  if(Object.keys(element)[i] === column && column === "email"){
                                    return <td className='td-a' key={i}><a href={""} >{Object.values(element)[i]}</a></td>
                                  }
                                  return <td className='td' key={i}>{Object.values(element)[i]}</td>
                                }
                              }
                            })}
                            
                              <td className='ultima-celda'>
                              {
                              (superAdmin)
                              ?
                              <div>
                                <button className='boton-ver' onClick={() => AbrirModalVer(element)}><FontAwesomeIcon icon={faEye} /></button>
                              </div>
                              :
                              <div>
                                <button className='boton-editar' onClick={() => AbrirModalEditar(element)}><FontAwesomeIcon icon={faEdit} /></button>
                                <button className='boton-eliminar' onClick={() => eliminar(element)}><FontAwesomeIcon icon={faTrashAlt} /></button> 
                                <button className='boton-ver' onClick={() => AbrirModalVer(element)}><FontAwesomeIcon icon={faEye} /></button>
                              </div>
                              }
                            </td>   
                          </tr>     
                  )}
                </tbody>
              </table>
              </div>
              

            <ModalEditar
              abrirModalEditar={abrirModalEditar}
              itemToEdit={itemToEdit}
              onsubmit={editar}
              cerrarFormulario={cerrarFormulario}
              dataBrands={dataBrands}
              errores={errores}
            ></ModalEditar>

            <ModalAgregar
              abrirModalAgregar={abrirModalAgregar}
              abrirModalAgregarMarca={abrirModalAgregarMarca}
              cambiarModal={cambiarModal}
              dataApi={dataApi}
              cerrarFormulario={cerrarFormulario}
              onSubmit={agregar}
              onSubmitMarca={agregarMarcaEnCellphones}
              dataBrands={dataBrands}
              errores={errores}
              agregarMarcaEnCellphones={agregarMarcaEnCellphones}
              clasesErrores={clasesErrores}
            ></ModalAgregar>

            <ModalVer
              abrirModalVer={abrirModalVer}
              cerrarFormulario={cerrarFormulario}
              itemToSee={itemToSee}
            ></ModalVer>
          </div>

      </>

    )
  }

   
}

export default Tabla