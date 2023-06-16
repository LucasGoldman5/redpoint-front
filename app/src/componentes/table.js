import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt, faComments} from '@fortawesome/free-solid-svg-icons';
import AddButton from './add-button';
import 'bootstrap/dist/css/bootstrap.css';
import ModalAdd from './modal-add';
import ModalEdit from './modal-edit';
import ModalView from './modal-view';
import Paginator from './paginator';
import HelperBuildRequest from "../helpers/buildRequest";
import {  useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import getManualColumns from '../helpers/getManualColumns';
import { PulseLoader } from "react-spinners";
import Error404 from './page404';


function Table  ({urlTable, enviroment,dataBrandsApp,dataCellphonesApp,dataCustomersApp,dataServicesApp,dataRolesApp,dataStatusApp}) {


    const [dataApi, setDataApi] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const [superAdmin, setSuperAdmin] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToSee, setItemToSee] = useState(null);
    const [chain,setChain] = useState("");
    const [errors, setErrors] = useState([]);
    const [over, setOver] = useState(false);
    const [changePage,setChangePage] = useState(false);
    const [spinnerLoadTable, setSpinnerLoadTable] = useState(false);
    const [spinnerLoadPage, setSpinnerLoadPage] = useState(false);
    const [notfound, setNotFound] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [resetSelectBox, setResetSelectBox] = useState(false);
    const [entitiNotFound, setEntitiNotFound] = useState("");
    const tableRef = useRef(null)
    const [scroll, setScroll] = useState(0)
    const { id } = useParams();
    
    const location = useLocation();
    const getUser = localStorage.getItem("user");
  

    const tables = [
      
        {"marcas":"Marcas"},
        {"celulares":"Celulares"},
        {"servicios":"Servicios"},
        {"clientes":"Clientes"},
        {"reparaciones":"Reparaciones"},
        {"reporte/reparaciones-pendientes":"Reparaciones Pendientes"},
        {"reporte/reparaciones-entregadas":"Reparaciones Entregadas"},
        {"usuarios":"Usuarios"}    
    ];

    const title = {
      "marcas":"Marca",
      "celulares":"Celular",
      "servicios":"Servicio",
      "clientes":"Cliente",
      "reparaciones":"Reparacion",
      "reporte":"Reparacion",
      "usuarios":"Usuario"
    }

    const admin = () =>{
      let usuario = JSON.parse(getUser);
        if(usuario.user.rol_id.rol  === "admin"){
          setSuperAdmin(true)

        }else if(usuario.user.rol_id.rol  === "super-admin"){
          setSuperAdmin(false)
        };
    };
    
    useEffect(() => {
        getData();
        admin();
        setChain("")
    }, [urlTable]);

    const urlApi = () =>{

      const id = window.location.href.split("/").slice(6).join('/');
      const newUrl = () =>{
        if(id){
          return window.location.href.split("/").slice(4, -1).join("/");
        }else{
          return urlTable
        }
      }
     
      const key = Object.keys(enviroment.selfUrl.localEntities).find(key => enviroment.selfUrl.localEntities[key] === newUrl());
        if(id){
          return  enviroment.apiURL.url+key+id
        }else{
          return  enviroment.apiURL.url + key;
        }
    }

    const urlLocal = () =>{
      return enviroment.selfUrl
    }
  
    const getData = async () => {

      setItemToEdit(null)

      setSpinnerLoadTable(true);
      const entiti = () =>{
        const result = window.location.href.split("-").slice(2).join("/");
        const url = result.split("/")[0];
        if(Object.keys(title).includes(urlTable)){
          return title[urlTable]
        }else if(url) {
          return url
        }else{
          return ""
        }
      } 

      try{
        await getManualColumns(window.location.href,enviroment.selfUrl);
        setDataColumns(JSON.parse(localStorage.getItem('column')));
        const config = await HelperBuildRequest('GET', null, 'dataTable');
        const apiURL = urlApi()

          const request = await fetch(apiURL, config)

          if(request.status === 200){
            setNotFound(false);
            const response = await request.json();
            if(response.error){
              setTimeout(()=>{
                console.log(response.error);
              },1000);
            }else{
              const data = await response
              setDataApi(data)
              setTimeout(()=>{
                setSpinnerLoadTable(false);
              },2000) 
            }
          }else if(request.status === 404){
            setEntitiNotFound(entiti());
             setTimeout(()=>{
              setNotFound(true);
             },500)
          }else if(request.status === 405){
            setTimeout(()=>{
             setNotFound(true);
            },500)
         }else if(request.status === 500){
          localStorage.removeItem('user');
          localStorage.removeItem('column');
         }
      }catch(error){
        console.log(error);
        setTimeout(()=>{
          setNotFound(true);
         },500)
      }   
    };

    const openModalAdd = () =>{
      setOpenModal(true);
    }

    const create = async (data) =>{
    
      console.log(data);

        if(data){
  
            try {

              const apiURL = urlApi()
              const localUrl = urlLocal()
              const ent = enviroment.selfUrl.localEntities;
              const location = window.location.href;
              const config = await HelperBuildRequest("POST", data, "dataTablePost");                    
              const request = await fetch(apiURL, config);
  
                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                    }else{               
                      setOpenModal(false);
                      setErrors([]);
                      if(window.location.href.includes("users")){
                        const hash = response.data.hash
                        setTimeout(() =>{
                          alert(`El usuario a sido creado con exito, para ingresar a la aplicacion debe ingresar a la siguiente url: ${localUrl.main}${localUrl.generatePass}#${hash}`)
                        },1000)
                        setDataApi({...dataApi,data:dataApi.data.concat(response.data)});
                      }else{
                        setDataApi({...dataApi,data:dataApi.data.concat(response.data)});
                        setResetSelectBox(true);
                      }    
                    };  
                };
  
                if(request.status === 422){
                  const response = await request.json();
                    if(response.errors){
                      alert("Debe completar o corregir el formulario")
                      setErrors(response.errors);
                      
                    };
                };
            }catch(error){
                console.log(error);
            };    
        }; 
    };

    
    const closeForm = () =>{
       
      setErrors([]);
      setOpenModal(false);
      setOpenModalEdit(false);
      setOpenModalView(false);
      setItemToEdit(null);
      setTimeout(()=>{
        setRowId(null);
      },1000)
      setResetSelectBox(true);
    };

    const selectRowOff = (count) =>{
      if(count === 1){
        setTimeout(()=>{
          setRowId(null);
        },1000)
        setOpenModalEdit(false)
        setItemToEdit(null)
      }
    }

    const closeModal = () =>{
    
          setOpenModal(false);
    }
    
    useEffect(() => {

      if (tableRef.current) {
        tableRef.current.scrollTop = scroll;
      } 
    }, [openModalEdit,rowId]);

    const OpenModalEdit =  (element,event) =>{
      
      setItemToEdit(null);
      setItemToEdit(element);
      setScroll(event.currentTarget.offsetTop - 150)
      setRowId(element.id);
      setOpenModalEdit(true);

    };   
      
    const edit =  async (data) =>{

      console.log(data);

      const urlEdit = () =>{

        if(window.location.href.includes("report")){
          return enviroment.apiURL.url + "reparations"
        }else{
          return urlApi()
        }
      }

      const ent = enviroment.selfUrl.localEntities;
      const location = window.location.href;
      let id = data["id"];
    
        if(data){

          const newData = () =>{
            
            if(location.includes(`${ent.users}`)){
              return {
                ...data,
                "last_connection":data.last_connection,
                "rol_id":data.rol_id,
                "active":data.active == 1 ? true : false
              }
            }else if(location.includes(`${ent.repatations}`)){
              if(data.has_security === false){
                return {
                  ...data,
                  "pin":null,
                  "pattern":null
                }
              }else{
                return data
              }
            }else{
              return data
            }
          }

          console.log(newData());
  
          try {
                const config =await HelperBuildRequest("PUT", newData(), "dataTablePut");
                const apiURL = await urlEdit()
                const request = await fetch(`${apiURL}/${id}`, config);

                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        console.log(response.error);
                    }else{
                      setTimeout(()=>{
                        setRowId(null);
                      },1000)
                      setResetSelectBox(true)                      
                      setOpenModalEdit(false);
                      setErrors([]);
                      setItemToEdit(null)
                      const result = dataApi.data.map((row) => row.id == response.data.id ? response.data : row);
                      setDataApi({...dataApi,data:result})  
                    }  
                }

                if(request.status === 422){
                  const response = await request.json();
                    if(response.errors){
                      setErrors(response.errors);
                      alert("Debe completar o corregir el formulario");
                    };
                };

                if(request.status === 400){
                
                }
             
          }catch(error){
            console.log(error);
            
          };          
        };
    }; 


    const eliminate= async (element)=>{

      console.log(element);
      
      setTimeout(()=>{
        setOpenModalEdit(false);
      })
      const include = element.title ? element.title : element.model ? element.model : element.name ? element.name : element.description ? element.description : "";
      console.log(include);
      const id = element.id;
      const location = window.location.href;
      const ent = enviroment.selfUrl.localEntities;
      
        swal({
          title:"Eliminar",
          text:location.includes(`${ent.reparations}`||`${ent.report}`) ? element.customer ? `¿Seguro que desea eliminar la reparacion de ${element.customer.customer}?` : `¿Seguro que desea eliminar la reparacion ?`: `¿Seguro que desea eliminar a ${include}`,
          buttons: ["No","Si"]
        }).then(async response0 =>{

          if(response0){
            
          
            try{

                const urlDelete = () =>{

                  if(window.location.href.includes("report")){
                    return enviroment.apiUrl.url + "reparations"
                  }else{
                    return  urlApi()
                  }
                }             
                  const config = await HelperBuildRequest("DELETE", "dataTable");
                  const apiURL = await urlDelete()
                  const request = await fetch(`${apiURL}/${id}`, config);
  
                  if(request.status === 200){
                    const response = await request.json();
                      if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                      }else{         
                      const result =  dataApi.data.filter(object => object !== element);
                      setDataApi({...dataApi,data:result});
                      setErrors([]);
                      setItemToEdit(null)
                      };
                  };
              
            }catch(error){
              console.log(error)
            };
          }else{
            setRowId(null);
          }
        });
    };

    

    const actionUser = async (data,id) => {

      const newData = () =>{
        
        if(data.active == 0){
          return {
            ...data,
            "active":1,
            "rol_id":data.rol_id.id ? data.rol_id.id : data.rol_id
          }
        }else if(data.active == 1){
          return {
            ...data,
            "active":0,
            "rol_id":data.rol_id.id ? data.rol_id.id : data.rol_id
          }
        }
      }

      setTimeout(()=>{
        setOpenModalEdit(false);
      })
      try {
        
        const config =await HelperBuildRequest("PUT", newData(), "dataTablePut");
        const apiURL = urlApi()
        const request = await fetch(`${apiURL}/${id}`, config);

        if(request.status === 200){
          const response = await request.json();
            if(response.error){
              setTimeout(()=>{
                console.log(response.error);
              },1000);
            }else{
              setTimeout(()=>{
                setRowId(null)
              },500)
              const result = dataApi.data.map((row) => row.id == newData().id ? newData() : row);                      
              setDataApi({...dataApi, data:result})
            }  
        }

        if(request.status === 422){
          const response = await request.json();
            if(response.errors){
              console.log(response.errors);
            };
        };
     
      }catch(error){
        console.log(error);
        
      }; 
    };

    const nextPage = async (url) =>{

      const config = await HelperBuildRequest('GET', null, 'dataTable');

        if(url){

          setChangePage(true)
          await fetch(`${url}`, config)
          .then( res  => res.json())
          .then( datos =>{
            setTimeout(()=>{
              setChangePage(false);
             },500)
            setDataApi(datos);
          });  
        }else{
          alert("Ya se encuentra en la ultima Pagina")
        };
    };

    const previousPage = async (url) =>{
      const config = await HelperBuildRequest('GET', null, 'dataTable');

        if(url){

          setChangePage(true);
          await fetch(`${url}`, config)
          .then( res  => res.json())
          .then( datos =>{
            setTimeout(()=>{
              setChangePage(false);
             },500)
            setDataApi(datos);
          });  
        }else{
          alert("Ya se encuentra en la primer Pagina")
        };
    };

    const specifyPage = async (i) =>{

  
      const config = await HelperBuildRequest('GET', null, 'dataTable');
      const apiURL = urlApi()

        if(i){

          setChangePage(true);
          await fetch(`${apiURL}?page=${i}`, config)
          .then( res  => res.json())
          .then( datos =>{
            setTimeout(()=>{
              setChangePage(false);
             },500)
            setDataApi(datos);
          });  
        }else{
          alert("kk")
        };
    };
   
    const openWhatsApp = (number) => {
      setTimeout(()=>{
        setOpenModalEdit(false);
        setRowId(null)
      })
      setTimeout(()=>{
        setItemToEdit(null);
      },2000)
      
      const message = encodeURIComponent('¡Hola! Tenemos Informacion sobre la reparacion de tu Celular.');
      const phoneNumber = number; 
    
      const link = `https://web.whatsapp.com/send/?phone=${phoneNumber}&text=${message}`;
      window.open(link, '_blank');
    };

    const generateMailLink = (email) => {
      setTimeout(()=>{
        setOpenModalEdit(false);
        setRowId(null)
      })
      setTimeout(()=>{
        setItemToEdit(null);
      },2000)
      const subject = encodeURIComponent('Asunto del correo');
      const body = encodeURIComponent('¡Hola! Tenemos Informacion sobre la reparacion de tu Celular.');

      const link = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`
    
      window.open(link, '_blank');
    };


    if(dataApi.data && dataColumns && notfound === false){

      const dataFilter = (e) => {
        let filteredData = dataApi.data;
      
        if (e) {
          setChain(e.target.value.toLowerCase());
        }
      
        if (chain.length >= 1) {
          filteredData = filteredData.filter((fact) => {
         
            for (let property in fact) {
                const value = fact[property];
                if (value && typeof value == 'string') {
                  if (value.toLowerCase().includes(chain)) {
                    return true;
                  }
                }
                if (value && typeof value == 'number') {
                  if (value.toString().includes(chain)) {
                    return true;
                  }
                }
                if (value && typeof value === "object" && value !== null) {
                   if(value.model != undefined){
                   if(value.model.toLowerCase().includes(chain)){
                    return true
                   }
                  }
                  if(value.service != undefined && typeof value.service !== "object"){
                    if(value.service.toLowerCase().includes(chain)){
                     return true
                    }
                   }
                }
                  
                }
            
      
            return false;
          });
        }
        return filteredData;
      };


    const uniqueKeys = {
      contenedorTabla: uuidv4(),
      tabla: uuidv4(),
      thead: uuidv4(),
      trColumn: uuidv4(),
      thColumn: uuidv4(),
      thColumnActions: uuidv4(),
      tbody: uuidv4(),
      trBody: uuidv4(),
      tdBody : uuidv4(),
      trBodyNd:uuidv4(),
      tdBodyNd: uuidv4(),
      tdBodyDiv: uuidv4(),
    };


      return(  

        <>
      
          {
            (dataApi.data.length >= 1)
            ?
            (spinnerLoadPage === true)
            ?
            <div className='div-load-page'><PulseLoader color="#d41c1c" size={20}></PulseLoader></div>
            :    
            <>
              <div id='rootTable'>

                <div className='contenedor-body'>

                  <div className={window.location.href.includes("report") ? 'contenedor-barra-botonagregar-report' : 'contenedor-barra-botonagregar'}>
                    {
                      (window.location.href.includes("report"))
                      ?
                      ""
                      :
                      <AddButton onClick={()=>openModalAdd()}></AddButton>
                    }
                      <div className='contenedor-barra'>
                        <input type='text' placeholder={`buscar...`} className='barra-busqueda' onChange={(e) => dataFilter(e)}/>
                      </div>      
                  </div>
                  {
                    (dataApi.columns)
                    ?
                    <>
                      <div className='general-container-table' id='myDiv'>
                        <div ref={tableRef} style={{ scrollTop: scroll }} className="contenedor-tabla"  key={uniqueKeys.contenedorTabla} >
                          <table  className='tabla'  key={uniqueKeys.tabla}>
                            <thead className='thead' key={uniqueKeys.thead}>
                              <tr className='tr-column' key={uniqueKeys.trColumn}>
                                {Object.values(dataColumns).map((column,index)=>(
                                  <th key={`${uniqueKeys.thColumn}-${index}`} className='th-columnas'>{column}</th>
                                ))}
                                {
                                  (window.location.href.includes("usuarios"))
                                  ?
                                  ""
                                  :
                                  <th className='ultima-columna' key={uniqueKeys.thColumnActions} >Eliminar</th>
                                }
                              </tr>
                            </thead>
                            <tbody className='tbody' key={uniqueKeys.tbody}>
                              {
                              
                              (dataFilter().length > 0 && spinnerLoadTable === false)
                              ?
                             
                              dataFilter().map((element,index) =>
                              
                                    <tr onClick={(event) => OpenModalEdit(element,event)}  id={index} className={rowId ? rowId == element.id ? "tr-active" : "tr-data" : "tr-data"} key={`${uniqueKeys.trBody}-${index}`}>
                                    {Object.keys(dataColumns).map((column)=>{
                                      for(let i = 0 ; i < Object.keys(element).length ; i++){
                                        if(Object.keys(element)[i] === column){
                                          let item = Object.values(element)[i];
                                          
                                          if(column === "url"){
                                            return <td className='td-a' key={`${uniqueKeys.tbody}-${i}`}><a href={item} >{item}</a></td>
                                          }
                                          if(column === "cost"){
                                            return <td className='td-cost' key={`${uniqueKeys.tbody}-${i}`}>${item}</td>
                                          }
                                          if(column === "phone_number"){
                                            return <td className='td-number' key={`${uniqueKeys.tbody}-${i}`}>{item} <FontAwesomeIcon className='icon-chat' icon={faComments} onClick={()=>openWhatsApp(item)}/></td>
                                          }
                                          if(column === "number"){
                                            return <td className='td-number' key={`${uniqueKeys.tbody}-${i}`}>{item} <FontAwesomeIcon className='icon-chat' icon={faComments} onClick={()=>openWhatsApp(item)}/> </td>
                                          }
                                          if(column === "service"  && dataFilter()[index].service){
                                            
                                            return <td className='td-service'  key={`${uniqueKeys.tbody}-${i}`}>
                                              <p>{item.service ? item.service : ""}</p>
                                              <span className="tooltiptext-service">{item.service}</span>                                            
                                              </td>
                                          }
                                          if(column === "state_id"){
                                            
                                            return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>{item.description}</p></td>
                                          }
                                          if(column === "cellphone" && dataFilter()[index].cellphone){
                                            
                                            return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>{item.model ? item.model : ""}</p></td>
                                          }
                                          if(column === "customer"  && dataFilter()[index].customer){  
                                            return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>{item.customer ? item.customer : ""}</p></td>
                                          }
                                          if(column === "rol_id"){         
                                              if(item == 1){
                                                return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>admin</p></td>
                                              }else if(item == 3){
                                                return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>Super-admin</p></td>
                                              }else{
                                                return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>{item.rol}</p></td>
                                              }
                                          }
                                          if(column === "failure"){
                                            return <td className='td-failure' key={`${uniqueKeys.tbody}-${i}`}>
                                              <p>{item}</p>
                                              <span className="tooltiptext-failure">{item}</span> 
                                            </td>
                                          }
                                          if(column === "amount"){
                                            return <td className='td-amount' key={`${uniqueKeys.tbody}-${i}`}>${item}</td>
                                          }
                                          if(column === "notice_date"){
                                            if(Object.values(element)[i] === null){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }
                                          if(column === "delivery_date"){
                                            if(Object.values(element)[i] === null){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }
                                          if(column === "service_start_date"){
                                            if(Object.values(element)[i] === null){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }
                                          if(column === "service_end_date"){
                                            if(Object.values(element)[i] === null){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }if(column === "last_connection"){
                                            if(Object.values(element)[i] === null || Object.values(element)[i] === ""){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }
                                          if(column === "email" ){
                                            return <td className='td-a' key={`${uniqueKeys.tbody}-${i}`}><p className='td-p-link' onClick={()=>generateMailLink(item)} >{item}</p></td>
                                          }
                                          if(column === "has_security"){
                                            if(Object.values(element)[i] === 1){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>Si</p></td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>No</p></td>
                                            }
                                          }
                                          if(column === "active"){
                                            if(Object.values(element)[i] == 1){
                                              return <td className='td-active' key={`${uniqueKeys.tbody}-${i}`}><p className='p-active-yes'>Si</p><button className='button-active' onClick={()=>actionUser(element,element.id)}>Desactivar</button></td>
                                            }else{ 
                                               return <td className='td-active' key={`${uniqueKeys.tbody}-${i}`}><p className='p-active-no'>No</p><button className='button-desactive' onClick={()=>actionUser(element,element.id)}>Activar</button></td> 
                                            }
                                          }
                                            return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>{item}</p></td>
                                        }
                                      }
                                    })}
                                        
                                    {
                                      (window.location.href.includes("usuarios"))
                                      ?
                                      ""
                                      :
                                      <td className='ultima-celda' key={uniqueKeys.tdBody}>
                                      {
                                        <div className='botones-acciones' >                                        
                                          <button className='boton-eliminar' onClick={() => eliminate(element)}><FontAwesomeIcon icon={faTrashAlt} /></button> 
                                        </div>
                                      }
                                    </td>
                                    }
                                  </tr>
                              )
                              :
                              (spinnerLoadTable === true)
                              ?
                              <tr className='tr-coincidence'><td className='div-no-coincidence'><PulseLoader color="#d41c1c" size={16}></PulseLoader></td></tr>
                              :
                              <tr className='tr-coincidence'><td className='p-no-coincidence'>No hay coincidencias</td></tr>
                              }
                            </tbody>
                          </table>
                        </div>
                        <Paginator
                        dataApi={dataApi}
                        dataFilter={dataFilter}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        specifyPage={specifyPage}
                        changePage={changePage}
                        ></Paginator>
                      </div>
                    </>
                    :
                    ""
                  }
                   
                  {
                    itemToEdit
                    ?
                    <ModalEdit
                    getOpenModalEdit={openModalEdit}
                    itemToEdit={itemToEdit}
                    selectRowOff={selectRowOff}
                    onsubmit={edit}
                    closeForm={closeForm}
                    errorsInTable={errors}
                    enviroment={enviroment}
                    dataBrandsApp={dataBrandsApp}
                    dataCustomersApp={dataCustomersApp}
                    dataServicesApp={dataServicesApp}
                    dataCellphonesApp={dataCellphonesApp}
                    dataStatusApp={dataStatusApp}
                    dataRolesApp={dataRolesApp}>
                  </ModalEdit>
                  :
                  ""
                  }

                  <ModalAdd
                    create={create}
                    closeModal={closeModal}
                    closeForm={closeForm}
                    dataApi={dataApi}
                    openModal={openModal}
                    errorsInTable={errors}
                    enviroment={enviroment}
                    dataBrandsApp={dataBrandsApp}
                    dataCustomersApp={dataCustomersApp}
                    dataServicesApp={dataServicesApp}
                    dataCellphonesApp={dataCellphonesApp}
                    dataRolesApp={dataRolesApp}
                    dataStatusApp={dataStatusApp}
                    resetSelectBox={resetSelectBox}
                    urlTable={urlTable}>
                  </ModalAdd>

                  <ModalView
                    openModalView={openModalView}
                    closeForm={closeForm}
                    itemToSee={itemToSee}>
                  </ModalView>

                </div>
              </div>
            </>
              :
              (spinnerLoadPage === true)
              ?
              <div className='div-load-page'><PulseLoader color="#d41c1c" size={20}></PulseLoader></div>
              :
            <>
              <div>
                <h1 className='h1-no-results'>No hay Resultados</h1>
              </div>
            </>
          }
        </>

      );

    }else if(notfound === true){
      return (
        <>
        <Error404 entitiNotFound={entitiNotFound}/>
        </>
      )
    } 
};

export default Table;