import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashCan,faWrench, faComments, faPrint, faFileLines} from '@fortawesome/free-solid-svg-icons';
import AddButton from './add-button';
import 'bootstrap/dist/css/bootstrap.css';
import ModalAdd from './modal-add';
import ModalEdit from './modal-edit';
import Paginator from './paginator';
import HelperBuildRequest from "../helpers/buildRequest";
import { v4 as uuidv4 } from 'uuid';
import getManualColumns from '../helpers/getManualColumns';
import { PulseLoader } from "react-spinners";
import Error404 from './page404';
import ModalNotification from './notifications-modal';


function Table  ({urlTable, enviroment, dataTotal,pagePrint}) {


    const [dataApi, setDataApi] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);
    const [superAdmin, setSuperAdmin] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [chain,setChain] = useState("");
    const [errors, setErrors] = useState([]);
    const [changePage,setChangePage] = useState(false);
    const [spinnerLoadTable, setSpinnerLoadTable] = useState(false);
    const [spinnerLoadPage, setSpinnerLoadPage] = useState(false);
    const [notfound, setNotFound] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [resetSelectBox, setResetSelectBox] = useState(false);
    const [entitiNotFound, setEntitiNotFound] = useState("");
    const [checkBox, setCheckBox] = useState(null);
    const [modalClosed, setModalClosed] = useState(null);
    const [actionModal, setActionModal] = useState(false);
    const [openModalNoti, setOpenModalNoti] = useState(false);
    const tableRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const [scroll, setScroll] = useState(0);
    const { id } = useParams();

    
    const getUser = () =>{
      if(localStorage.user){
        return localStorage.getItem("user");
      }else{
        window.location.reload()
      }
    } 

    const ent = enviroment.selfUrl.localEntities;
    const table = enviroment.selfUrl.dataTable;
    const entitie = enviroment.entities
    const location = window.location.href


    const handleScroll = () => {
      // Actualizar la posición del scroll en el ref
      if (tableRef.current) {
        scrollPositionRef.current = tableRef.current.scrollTop;
      }
    };

    const titleTable = () =>{
      
      if(location.includes(`${table}${ent.reparations}`)){
        return "Reparaciones"
      }else if(location.includes(ent.brands)){
        return "Marcas"
      }
      else if(location.includes(ent.customers)){
        return "Clientes"
      }
      else if(location.includes(ent.cellphones)){
        return "Celulares"
      }
      else if(location.includes(ent.services)){
        return "Servicios"
      }else if(location.includes(ent.users)){
        return "Usuarios"
      }else if(location.includes(entitie.pending)){
        return "Reparaciones En Service"
      }else if(location.includes(entitie.finished)){
        return "Reparaciones Para Entregar"
      }else if(location.includes(entitie.quote)){
        return "Reparaciones a presupuestar"
      }else if(location.includes(entitie.delivered)){
        return "Reparaciones Entregadas"
      }else if (dataTotal[4]){

          if(location.includes(entitie.reparationsBrand) && dataTotal[0]){
            const id = window.location.href.split("/").slice(6).join('/');
            const title = dataTotal[0].brands.map((element)=>{
              if(element.id == id){
                return `Reparaciones de ${element.title}`
              }
            })
            return title
          }else if(location.includes(entitie.reparationsCustomer)){
            const id = window.location.href.split("/").slice(6).join('/');
            const title = dataTotal[2].customers.map((element)=>{
              if(element.id == id){
                return `Reparaciones de ${element.name}`
              }
            })
            return title
          }else if(location.includes(entitie.reparationsService)){
            const id = window.location.href.split("/").slice(6).join('/');
            const title = dataTotal[3].service.map((element)=>{
              if(element.id == id){
                return `Reparaciones de ${element.description}`
              }
            })
            return title
          }else if(location.includes(entitie.reparationsCellphone)){
            const id = window.location.href.split("/").slice(6).join('/');
            const title = dataTotal[1].cellphones.data.map((element)=>{
              if(element.id == id){
                return `Reparaciones de ${element.model}`
              }
            })
            return title
          }else if(location.includes(entitie.reparationsManager)){
            const id = window.location.href.split("/").slice(6).join('/');
            const title = dataTotal[4].managers.map((element)=>{
              if(element.id == id){
                return `Reparaciones de ${element.name}`
              }
            })
            return title
          }
      }
    }

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
      if(localStorage.user){
        let usuario = JSON.parse(getUser());
        if(usuario.user.rol_id.rol  === "admin"){
          setSuperAdmin(true)

        }else if(usuario.user.rol_id.rol  === "super-admin"){
          setSuperAdmin(false)
        };
      }else{
        window.location.reload()
      }
    };
    
    useEffect(() => {
        setSpinnerLoadTable(true);
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
        
          if(localStorage.column){
            setDataColumns(JSON.parse(localStorage.getItem('column')));
          }else{
            window.location.reload()
          }
        
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
              setSpinnerLoadTable(false);
              setRowId(null);
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
          localStorage.removeItem('reparation');
         }
      }catch(error){
        console.log(error);
        setTimeout(()=>{
          setNotFound(true);
         },500)
      }   
    };


    const openModalAdd = async () =>{

      setOpenModal(true);
      setActionModal(true);
      setTimeout(()=>{
        setActionModal(false);
      },300)
    
  }

    const create = async (data) =>{

    console.log(data);
        if(data){
  
            try {

              const apiURL = urlApi()
              const localUrl = urlLocal()
              const config = await HelperBuildRequest("POST", data, "dataTablePost");                    
              const request = await fetch(apiURL, config);
  
                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                    }else{               
                      setOpenModal(true);
                      setTimeout(()=>{
                        setOpenModal(false);
                      },300)
                      setErrors([]);
                      if(window.location.href.includes("users")){
                        const hash = response.data.hash
                        setTimeout(() =>{
                          alert(`El usuario a sido creado con exito, para ingresar a la aplicacion debe ingresar a la siguiente url: ${localUrl.main}${localUrl.generatePass}#${hash}`)
                        },1000)
                        getData()
                      }else{
                        getData();
                        setActionModal(true);
                        setCheckBox(false);
                        setTimeout(()=>{
                          setActionModal(false);
                        },500)
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
      setOpenModal(true)
      setModalClosed(true);
      setOpenModalNoti(true)
      setTimeout(()=>{
        setOpenModal(false);
        setCheckBox(false);
        setModalClosed(false);
        setOpenModalNoti(false);
      },100)
      setCheckBox(true)
      setOpenModalEdit(false);
      setItemToEdit(null);
      setActionModal(true);
      setTimeout(()=>{
        setRowId(null);
        setActionModal(false)
      },200)
      setResetSelectBox(true);
    };

    const selectRowOff = (count) =>{
      if(count === 1){
        setTimeout(()=>{
          setRowId(null);
        },300)
        setOpenModalEdit(false);
        setOpenModalNoti(false);
        setItemToEdit(null)
      }
    }

    const closeModal = () =>{
          setOpenModal(false);
    }
    
    useEffect(() => {
      if (tableRef.current) {
        tableRef.current.scrollTop = scrollPositionRef.current;
      } 
    }, [rowId]);



    const OpenModalEdit = async (element,event) =>{
      
      setItemToEdit(null);
      setItemToEdit(element);
      //setScroll(event.currentTarget.offsetTop - 100)
      setRowId(element.id);
      setOpenModalEdit(true);

    };   
      
    const edit =  async (data) =>{

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
  
          try {
                const config =await HelperBuildRequest("PUT", newData(), "dataTablePut");
                const apiURL = await urlEdit()
                const request = await fetch(`${apiURL}/${id}`, config);

                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        console.log(response.error);
                    }else{
                      setResetSelectBox(true)                      
                      setOpenModalEdit(false);
                      setErrors([]);
                      setItemToEdit(null)
                      getData()
                      setActionModal(true);
                      setCheckBox(false);
                      setActionModal(false)
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

      setItemToEdit(null)
      setTimeout(()=>{
        setOpenModalEdit(false);
      })
      const include = element.title ? element.title : element.model ? element.model : element.name ? element.name : element.description ? element.description : "";
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
                    return enviroment.apiURL.url + "reparations"
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
                      getData()
                      setErrors([]);
                      setItemToEdit(null)
                      };
                  };
              
            }catch(error){
              console.log(error)
            };
          }else{
            setItemToEdit(null)
            setRowId(null);
          }
        });
    };

    const print = (element,event) =>{

      event.stopPropagation()
      setItemToEdit(null)
      setTimeout(()=>{
        setOpenModalEdit(false);
      })
      setRowId(null)
      pagePrint(element)
      window.open(`${enviroment.selfUrl.main}${enviroment.selfUrl.print}`)
    }

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
              },500);
            }else{
              getData()
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

    const sendService = async (data, event) =>{
      event.stopPropagation()
      setRowId(data.id)
      //setScroll(event.currentTarget.offsetTop - 100)
      const id = data.id
      const newData = () =>{
        
        if(data.state_id.id != 2){
          return {
            ...data,
            "customer_id":data.customer.id,
            "cellphone_id":data.cellphone.id,
            "service_id":data.service.id,
            "state_id":2
          }
        }return {
          ...data,
          "customer_id":data.customer.id,
          "cellphone_id":data.cellphone.id,
          "service_id":data.service.id,
          "state_id":2
        }
      }

      try {
        
        const config =await HelperBuildRequest("PUT", newData(), "dataTablePut");
        const apiURL = urlApi()
        const request = await fetch(`${enviroment.apiURL.url}${enviroment.entities.reparations}/${id}`, config);

        if(request.status === 200){
          const response = await request.json();
            if(response.error){
              setTimeout(()=>{
                console.log(response.error);
              },500);
            }else{
              getData()
              setRowId("")
            }  
        }

        if(request.status === 422){
          const response = await request.json();
            if(response.errors){
              alert("Los datos de la Reparacion no estan completos")
              setRowId("")
              console.log(response.errors);
            };
        };
     
      }catch(error){
        console.log(error);
        
      }; 

    }

    const openModalNotification = (e,element) =>{
      e.stopPropagation();
      setOpenModalNoti(true);
      setItemToEdit(element);
      setRowId(element.id);
    }

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
                  if(value.customer != undefined && typeof value.customer !== "object"){
                    if(value.customer.toLowerCase().includes(chain)){
                     return true
                    }
                   }
                   if(value.description != undefined && typeof value.description !== "object"){
                    if(value.description.toLowerCase().includes(chain)){
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
                      <AddButton onClick={()=>openModalAdd()} dataApi={dataApi}></AddButton>
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
                        <div ref={tableRef} onScroll={handleScroll} style={{ scrollTop: scroll }} className="contenedor-tabla"  key={uniqueKeys.contenedorTabla} >
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
                                  <th className='ultima-columna' key={uniqueKeys.thColumnActions} >Acciones</th>
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
                                          if(column === "phone_number"){
                                            return <td className='td-number' key={`${uniqueKeys.tbody}-${i}`}>{item} <FontAwesomeIcon className='icon-chat' icon={faComments} onClick={()=>openWhatsApp(item)}/></td>
                                          }
                                          if(column === "number"){
                                            return <td className='td-number' key={`${uniqueKeys.tbody}-${i}`}>{item} <FontAwesomeIcon className='icon-chat' icon={faComments} onClick={()=>openWhatsApp(item)}/> </td>
                                          }
                                          if(column === "dni"){
                                            return <td className='td-number' key={`${uniqueKeys.tbody}-${i}`}>{item ? item : ""}</td>
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
                                          if(column === "reception_date"){
                                            if(Object.values(element)[i] === null){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }
                                          if(column === "last_connection"){
                                            if(Object.values(element)[i] === null || Object.values(element)[i] === ""){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }
                                          if(column === "email" ){
                                            return <td className='td-a' key={`${uniqueKeys.tbody}-${i}`}><p className='td-p-link' onClick={()=>generateMailLink(item)} >{item}</p></td>
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
                                        <div className={window.location.href.includes("reparaciones") ? 'botones-acciones' : 'boton-accion'} >      
                                          {
                                            window.location.href.includes("reparaciones")
                                            ?                                           
                                            (element.state_id)
                                            ?
                                            (element.state_id.id != 2)
                                            ?
                                            <>
                                              <button className='boton-service'  onClick={(event) => sendService(element,event)}><FontAwesomeIcon  icon={faWrench} /></button>
                                              <button className='boton-notificaciones' onClick={(event)=> openModalNotification(event,element)}><FontAwesomeIcon icon={faFileLines} /></button>
                                              <button className='boton-imprimir'  onClick={(event) => print(element,event)}><FontAwesomeIcon  icon={faPrint} /></button>
                                            </>
                                            :
                                            <>
                                              <button className='boton-notificaciones' onClick={(event)=> openModalNotification(event,element)}><FontAwesomeIcon icon={faFileLines} /></button>
                                              <button className='boton-imprimir'  onClick={(event) => print(element,event)}><FontAwesomeIcon  icon={faPrint} /></button>
                                            </>
                                            :
                                            ""
                                            :
                                            ""
                                          }
                                                                             
                                          <button className='boton-eliminar' onClick={() => eliminate(element)}><FontAwesomeIcon icon={faTrashCan} /></button>
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
                    enviroment={enviroment}>
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
                    resetSelectBox={resetSelectBox}
                    urlTable={urlTable}
                    checkBox={checkBox}
                    modalClosed={modalClosed}
                    actionModal={actionModal}>
                  </ModalAdd>

                  {
                    (openModalNoti && itemToEdit)
                    ?
                    <ModalNotification
                    openModalNoti={openModalNoti}
                    itemToEdit={itemToEdit}
                    closeForm={closeForm}
                    enviroment={enviroment}
                    selectRowOff={selectRowOff}>
                    </ModalNotification>
                    :
                    ""
                  }

                </div>
              </div>
            </>
              :
              (spinnerLoadPage === true)
              ?
              <div className='div-load-page'><PulseLoader color="#d41c1c" size={20}></PulseLoader></div>
              :
            <>
              <div className='div-no-results'>
              
                <h1 className='h1-no-results'>No hay {titleTable()}</h1>
                <ModalAdd
                    create={create}
                    closeModal={closeModal}
                    closeForm={closeForm}
                    dataApi={dataApi}
                    openModal={openModal}
                    errorsInTable={errors}
                    enviroment={enviroment}
                    resetSelectBox={resetSelectBox}
                    urlTable={urlTable}
                    checkBox={checkBox}
                    modalClosed={modalClosed}
                    actionModal={actionModal}>
                  </ModalAdd>


                {
                  window.location.href.includes("por")
                  ?
                  ""
                  :
                  <AddButton onClick={()=>openModalAdd()} dataApi={dataApi}></AddButton>
                }
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