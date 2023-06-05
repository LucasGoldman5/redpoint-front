import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
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
import getEnviroment from '../helpers/getEnviroment';
import { PulseLoader } from "react-spinners";
import Error404 from './page404';


function Table  ({urlTable, enviroment, tableActive,dataBrandsApp,dataCellphonesApp,dataCustomersApp,dataServicesApp,dataRolesApp,dataStatusApp}) {


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
    const { id } = useParams();
    const { title } = useParams();
    
    const location = useLocation();
    const getUser = localStorage.getItem("user");
  

    const tables = [
      
        {"brands":"Marcas"},
        {"cellphones":"Celulares"},
        {"services":"Servicios"},
        {"customers":"Clientes"},
        {"reparations":"Reparaciones"},
        {"report/reparations-pending":"Reparaciones Pendientes"},
        {"report/reparations-success":"Reparaciones Entregadas"},
        {"users":"Usuarios"}    
    ];


    const admin = () =>{
      let usuario = JSON.parse(getUser);
        if(usuario.user.roles === "admin"){
          setSuperAdmin(true)

        }else if(usuario.user.roles === "super-admin"){
          setSuperAdmin(false)
        };
    };
    
    useEffect(() => {
        getData();
        admin();
    }, [urlTable]);

    useEffect(()=>{
      tableActive(dataApi)
    },[dataApi])

    const urlApi = () =>{
        return  enviroment.apiURL.url + urlTable;
    }

    const urlLocal = () =>{
      return enviroment.selfUrl
    }


    const getData = async () => {

      setSpinnerLoadTable(true);
      setSpinnerLoadPage(true);

      try{
        await getManualColumns(window.location.href,enviroment.selfUrl);
        setDataColumns(JSON.parse(localStorage.getItem('column')));
        const config = await HelperBuildRequest('GET', null, 'dataTable');
        const apiURL = urlApi()

          const request = await fetch(apiURL, config)

          if(request.status === 200){
            const response = request.json();
            if(response.error){
              setTimeout(()=>{
                console.log(response.error);
              },1000);
            }else{
              const data = await response
              setDataApi(data)
              setTimeout(()=>{
                setSpinnerLoadPage(false);
              },200)
              setTimeout(()=>{
                setSpinnerLoadTable(false);
              },1000) 
            }
          }else if(request.status === 404){
             setTimeout(()=>{
              setNotFound(true);
             },500)
          }else if(request.status === 405){
            setTimeout(()=>{
             setNotFound(true);
            },500)
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
                        setTimeout(async () =>{
                          alert(`El usuario a sido creado con exito, para ingresar a la aplicacion debe ingresar a la siguiente url: ${localUrl.main}${localUrl.generatePass}#${hash}`)
                        },1000)
                        getData();
                      }else{
                        getData();
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

    };


    const OpenModalEdit = async (element) =>{
        console.log(element);
        setItemToEdit(element);
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

      let id = data["id"];
    
        if(data){

          try {

                const config =await HelperBuildRequest("PUT", data, "dataTablePut");
                const apiURL = await urlEdit()
                const request = await fetch(`${apiURL}/${id}`, config);

                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                    }else{                      
                      setOpenModalEdit(false);
                      setErrors([]);
                      setItemToEdit(null)
                      getData();
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


    const eliminate= async (i)=>{
      
      setTimeout(()=>{
        setOpenModalEdit(false);
      })
      const controlList = ['title', 'model', 'name', 'customer'];
      const keys = Object.keys(i);
      const include = keys.filter( (key) => controlList.includes(key) ).sort( (a,b) => a.localeCompare(b));
      const id = i.id;
      
        swal({
          title:"Eliminar",
          text:`¿Seguro que desea eliminar a ${i[include]}`,
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
                       window.location.reload()
                      };
                  };
              
            }catch(error){
              console.log(error)
            };
          }
        });
    };

    

    const actionUser = async (data,id) => {

      const newData = {
        ...data,
        "active":!data.active
      }
      console.log(newData);
      setTimeout(()=>{
        setOpenModalEdit(false);
      })
      try {

        const config =await HelperBuildRequest("PUT", newData, "dataTablePut");
        const apiURL = urlApi()
        const request = await fetch(`${apiURL}/${id}`, config);

        if(request.status === 200){
          const response = await request.json();
            if(response.error){
              setTimeout(()=>{
                console.log(response.error);
              },1000);
            }else{                      
              getData();
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

    /*const OpenModalView = (element) => {

      setItemToSee(element);
      setOpenModalView(true); 

    };*/

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


    if(dataApi.data && dataColumns ){

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
      // ... y así sucesivamente para los demás elementos
    };

    const displayDivService = () =>{
        setOver(!over) 
    }

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
                <div className='titulo-tabla'>
                  <h1>
                    {
                    (window.location.href.includes("by-brand") && dataApi.data[0].cellphone)
                    ?
                    `Reparaciones por ${dataApi.data[0].cellphone.brand}`
                    :
                    (window.location.href.includes("by-customer") && dataApi.data[0].customer)
                    ?
                    `Reparaciones por ${dataApi.data[0].customer.customer}`
                    :
                    (window.location.href.includes("by-cellphone") && dataApi.data[0].cellphone)
                    ?
                    `Reparaciones por ${dataApi.data[0].cellphone.model}`
                    :
                    (window.location.href.includes("by-service") && dataApi.data[0].service)
                    ?
                    `Reparaciones por ${dataApi.data[0].service.service}`
                    :
                    tables.map((titulo)=>{
                      if(window.location.href === `http://localhost:3000/Table/${Object.keys(titulo)}`){
                        return Object.values(titulo)
                      }
                    })
                    }
                  </h1>
                </div>
                
                <div className='contenedor-body'>

                  <div className={window.location.href.includes("report") ? 'contenedor-barra-botonagregar-report' : 'contenedor-barra-botonagregar'}>
                    {
                      (window.location.href.includes("report"))
                      ?
                      ""
                      :
                      <AddButton onClick={openModalAdd}></AddButton>
                    }
                      <div className='contenedor-barra'>
                        <input type='text' placeholder={`buscar...`} className='barra-busqueda' onChange={(e) => dataFilter(e)}/>
                      </div>      
                  </div>
                  {
                    (dataApi.columns)
                    ?
                    <>
                      <div className='general-container-table'>
                        <div className="contenedor-tabla" key={uniqueKeys.contenedorTabla} >
                          <table className='tabla' key={uniqueKeys.tabla}>
                            <thead className='thead' key={uniqueKeys.thead}>
                              <tr className='tr-column' key={uniqueKeys.trColumn}>
                                {Object.values(dataColumns).map((column,index)=>(
                                  <th key={`${uniqueKeys.thColumn}-${index}`} className='th-columnas'>{column}</th>
                                ))}
                                {
                                  (window.location.href.includes("users"))
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
                                  
                                    <tr onClick={() => OpenModalEdit(element)} className='tr-data' key={`${uniqueKeys.trBody}-${index}`}>
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
                                            return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{item} / {element.phhone_number_2}</td>
                                          }
                                          if(column === "service"){
                                            return <td className='td-service' onMouseEnter={()=>displayDivService()} key={`${uniqueKeys.tbody}-${i}`}>
                                              <p>{item.service}</p>
                                              <span className="tooltiptext-service">{item.service}</span>                                            
                                              </td>
                                          }
                                          if(column === "state_id"){
                                            return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>{item.description}</p></td>
                                          }
                                          if(column === "cellphone" && dataApi.data[0].cellphone){
                                            return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>{item.model}</p></td>
                                          }
                                          if(column === "customer"){  
                                            return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>{item.customer}</p></td>
                                          }
                                          if(column === "rol_id"){
                                            if(Object.values(element)[i] === 1){
                                              return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>Admin</p></td>
                                            }else{
                                              return <td className='td'  key={`${uniqueKeys.tbody}-${i}`}><p>Super-admin</p></td>
                                            }
                                          }
                                          if(column === "failure"){
                                            return <td className='td-service' key={`${uniqueKeys.tbody}-${i}`}>
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
                                            if(Object.values(element)[i] === null){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>--/--/--</td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}>{new Date(item).getDate()+"/"+(new Date(item).getMonth()+1)+"/"+new Date(item).getFullYear()}</td>
                                            }
                                          }
                                          if(column === "email"){
                                            return <td className='td-a' key={`${uniqueKeys.tbody}-${i}`}><a href={""} >{item}</a></td>
                                          }
                                          if(column === "has_security"){
                                            if(Object.values(element)[i] === 1){
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>Si</p></td>
                                            }else{
                                              return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>No</p></td>
                                            }
                                          }
                                          if(column === "active"){
                                            if(Object.values(element)[i] === 1){
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
                                      (window.location.href.includes("users"))
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
                   
                  <ModalEdit
                    getOpenModalEdit={openModalEdit}
                    itemToEdit={itemToEdit}
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

                  <ModalAdd
                    create={create}
                    closeForm={closeForm}
                    dataApi={dataApi}
                    openModal={openModal}
                    errorsInTable={errors}
                    enviroment={enviroment}
                    dataBrandsApp={dataBrandsApp}
                    dataCustomersApp={dataCustomersApp}
                    dataServicesApp={dataServicesApp}
                    dataCellphonesApp={dataCellphonesApp}
                    dataRolesApp={dataRolesApp}>
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
        <Error404/>
        </>
      )
    } 
};

export default Table;