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
import { Await, useLocation } from 'react-router-dom';




const Tabla = () =>{

    const [dataApi, setDataApi] = useState([]);
    const [superAdmin, setSuperAdmin] = useState(null)
    const [abrirModalAgregar, setAbrirModalAgregar] = useState(false);
    const [abrirModalEditar, setAbrirModalEditar] = useState(false);
    const [abrirModalVer, setAbrirModalVer] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToSee, setItemToSee] = useState(null)
    const [cadena,setCadena] = useState("");


    const location = useLocation();
    const traerUsuario = localStorage.getItem("Usuario");
    

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
      .then(res => res.json())
      .then(datos =>{
        console.log(datos);
        setDataApi(datos)
      })
    }

  const abrirModal = () =>{
    setAbrirModalAgregar(true)
  }

  const cerrarFormulario=()=>{
    setAbrirModalAgregar(false); 
    setAbrirModalEditar(false)
    setAbrirModalVer(false)
    setItemToEdit(null)
  }

  const agregar= async (data)=>{

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
                          const nuevaData = {columns:dataApi.columns,data:dataApi.data.concat([response.data]),links:dataApi.links}
                          setDataApi(nuevaData);
                          window.location.reload()
                      }  
                  }
           }catch(error){
            console.log(error)
           }    
       }
       setAbrirModalAgregar(false)
    }


    const AbrirModalEditar = (element) =>{
            setItemToEdit(element)
            setAbrirModalEditar(true)
          }   
  
      
          
    const editar =  async (data) =>{
      
      if(data){
        console.log(data)
      setAbrirModalEditar(false);
      }
      
    }  


    const eliminar=(i)=>{
      swal({
        title:"Eliminar",
        text:`¿Seguro que desea eliminar a ${Object.values(i)[1]}`,
        buttons: ["No","Si"]
      }).then(respuesta =>{
        if(respuesta){
          const nuevaData = {columns:dataApi.columns,data:dataApi.data.filter(item => item.id !== i.id),links:dataApi.links};
          setDataApi(nuevaData);
        }
      })

    }


    const AbrirModalVer = (element) => {
      setItemToSee(element)
      setAbrirModalVer(true); 
    }


    if(dataApi.length != 0){
      return(  
        <>
        
        <div className='contenedor-body'>
        <div className='contenedor-barra-botonagregar'>
            <BotonAgregar abrirModal={abrirModal}> </BotonAgregar>
            <div className='contenedor-barra'>
              <input type='text' placeholder='buscar...' className='barra-busqueda' onChange={(e) => setCadena(e.target.value)}/>
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
                dataApi.data.filter((dato) => Object.values(dato)[1].includes(cadena)).map( (element)=>  
                  <tr className='tr-data' key={element["id"]}>
                 
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
                  )
                }
              </tbody>
            </table>
            </div>
            

          <ModalEditar
            abrirModalEditar={abrirModalEditar}
            itemToEdit={itemToEdit}
            onsubmit={editar}
            cerrarFormulario={cerrarFormulario}
          ></ModalEditar>

          <ModalAgregar
            abrirModalAgregar={abrirModalAgregar}
            dataApi={dataApi}
            cerrarFormulario={cerrarFormulario}
            onSubmit={agregar}
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