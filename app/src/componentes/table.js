import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import AddButton from './add-button';
import 'bootstrap/dist/css/bootstrap.css';
import ModalAdd from './modal-add';
import ModalEdit from './modal-edit';
import ModalView from './modal-view';
import HelperBuildRequest from "../helpers/buildRequest";
import {  useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const Table = () =>{

    const [dataApi, setDataApi] = useState([]);
    const [dataBrands, setDataBrands] = useState([]);
    const [dataCustomers, setDataCustomers] = useState([]);
    const [dataCellphones, setDataCellPhones] = useState([]);
    const [dataServices, setDataServices] = useState([]);
    const [dataCustomersEdit, setDataCustomersEdit] = useState([]);
    const [dataCellphonesEdit, setDataCellPhonesEdit] = useState([]);
    const [dataServicesEdit, setDataServicesEdit] = useState([])
    const [superAdmin, setSuperAdmin] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalAddBrand, setOpenModalAddBrand] = useState(false);
    const [openModalAddCustomer, setOpenModalAddCustomer] = useState(false);
    const [openModalAddCellphone, setOpenModalAddCellphone] = useState(false);
    const [openModalAddService, setOpenModalAddService] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToSee, setItemToSee] = useState(null);
    const [chain,setChain] = useState("");
    const [errors, setErrors] = useState([]);
    
    


    const location = useLocation();
    const getUser = localStorage.getItem("user");

    const tables = [
      
        {"brands":"Marcas"},
        {"cellphones":"Celulares"},
        {"services":"Servicios"},
        {"customers":"Clientes"},
        {"reparations":"Reparaciones"},
        {"pending":" pendientes"}
     
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
      if(dataApi.length === 0){
        getData();
        admin()
      }
    }, []);


    const getData = async () => {
      const identityApi = ["brands","cellphones","customers","reparations","services","report/reparations-pending"]
      const currentUrl = window.location.href;
      
      const findEntity = identityApi.find( (entity) =>{
        if(currentUrl === `http://localhost:3000/Table/${entity}`){
          return entity
        }
      } );

      if( typeof findEntity != 'string') {
        return(
          <h1>no se econtro la pagina</h1>
        )
      } else {
        //se encontro 
        const config = HelperBuildRequest('GET', null, 'dataTable');

        await fetch(`http://localhost:8000/api/${findEntity}`, config)
          .then( res  => res.json())
          .then( datos =>{
            console.log(datos);
            setDataApi(datos);
          });  
      }
       
    };


    const openModal =  async () =>{
      setOpenModalAdd(true)
      
        try{
                    
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
            };

        }catch(error){
          console.log(error)
        }
        
        try{
                    
          const config = HelperBuildRequest("GET",null, "dataTable");
          const request = await fetch(`http://localhost:8000/api/customers`, config);

            if(request.status === 200){
                const response = await request.json();
                  if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                  }else{                      
                      setDataCustomers(response.data);
                  }  
            };

        }catch(error){
          console.log(error)
        }
        
        try{
                    
          const config = HelperBuildRequest("GET",null, "dataTable");
          const request = await fetch(`http://localhost:8000/api/cellphones`, config);

            if(request.status === 200){
                const response = await request.json();
                  if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                  }else{                      
                      setDataCellPhones(response.data);
                  }  
            };

        }catch(error){
          console.log(error)
        }
        
        try{
                    
          const config = HelperBuildRequest("GET",null, "dataTable");
          const request = await fetch(`http://localhost:8000/api/services`, config);

            if(request.status === 200){
                const response = await request.json();
                  if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                  }else{                      
                      setDataServices(response.data);
                  }  
            };

        }catch(error){
          console.log(error)
        }
    };


    const create= async (data) =>{
    
      console.log(data);
        if(data){
  
            try {
  
              const identityApi = ["brands","cellphones","customers","reparations","services"]
              const currentUrl = window.location.href;
              const findEntity = identityApi.find( (entity) =>  currentUrl.includes(entity));
  
              const config = HelperBuildRequest("POST", data, "dataTablePost");                    
              const request = await fetch(`http://localhost:8000/api/${findEntity}`, config);
  
                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                    }else{                      
                      window.location.reload();
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


    const changeModal = (fact) =>{
      if(fact === "brand"){
        setOpenModalAdd(false);
        setOpenModalAddBrand(true);
      }else if(fact === "customer"){
        setOpenModalAdd(false);
        setOpenModalAddCustomer(true)
      }else if(fact === "cellphone"){
        setOpenModalAdd(false);
        setOpenModalAddCellphone(true);
      }else if(fact === "service"){
        setOpenModalAdd(false);
        setOpenModalAddService(true);
      }
    }

    
    const closeForm = () =>{

      setOpenModalAdd(false); 
      setOpenModalAddBrand(false);
      setOpenModalEdit(false);
      setOpenModalView(false);
      setItemToEdit(null);
      setOpenModalAddCellphone(false);
      setOpenModalAddCustomer(false);
      setOpenModalAddService(false);

    };


    const OpenModalEdit = async (element) =>{
        console.log(element);
        setItemToEdit(element);
        setOpenModalEdit(true);
            
          try{
                
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
                  };  
              };

          }catch(error){
              console.log(error);
           }
           
           try{
                    
            const config = HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`http://localhost:8000/api/customers`, config);
  
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataCustomersEdit(response.data);
                    }  
              };
  
          }catch(error){
            console.log(error)
          }
          
          try{
                      
            const config = HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`http://localhost:8000/api/cellphones`, config);
  
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataCellPhonesEdit(response.data);
                    }  
              };
  
          }catch(error){
            console.log(error)
          }
          
          try{
                      
            const config = HelperBuildRequest("GET",null, "dataTable");
            const request = await fetch(`http://localhost:8000/api/services`, config);
  
              if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                        setTimeout(()=>{
                          console.log(response.error);
                        },1000);
                    }else{                      
                        setDataServicesEdit(response.data);
                    }  
              };
  
          }catch(error){
            console.log(error)
          } 
    };   
  
               
    const edit =  async (data) =>{
      console.log(data);

      let id = data["id"];
    
        if(data){

          try {

            const identityApi = ["brands","cellphones","customers","reparations","services"]
            const currentUrl = window.location.href;

            for(let i = 0; i<identityApi.length; i++){
              if(currentUrl.includes(identityApi[i])){
                const config = HelperBuildRequest("PUT", data, "dataTablePut");
                const request = await fetch(`http://localhost:8000/api/${identityApi[i]}/${id}`, config);

                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                    }else{                      
                      setOpenModalEdit(false);
                      window.location.reload();
                    }  
                }

                if(request.status === 422){
                  const response = await request.json();
                    if(response.errors){
                      alert("Debe completar o corregir el formulario")
                      setErrors(response.errors);
                    };
                };

                if(request.status === 400){
                
                };

              };
            };
            
          }catch(error){
            console.log(error);
            
          };          
        };  
    }; 


    const eliminate= async (i)=>{

      const controlList = ['title', 'model', 'name'];
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

              const identityApi = ["brands","cellphones","customers","reparations","services"]
              const currentUrl = window.location.href;
  
              for(let i = 0; i<identityApi.length; i++){
                if(currentUrl.includes(identityApi[i])){
                  const config = HelperBuildRequest("DELETE", "dataTable");
                  const request = await fetch(`http://localhost:8000/api/${identityApi[i]}/${id}`, config);
  
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
  
                };
              };
              
            }catch(error){
              console.log(error)
            };
          };
        });
    };


    const OpenModalView = (element) => {

      setItemToSee(element);
      setOpenModalView(true); 

    };


    if(dataApi.length != 0 && dataApi.columns){

      const fact = Object.values(dataApi.columns).filter((fact) =>{       
        const listaDeColumnas = ['Marca', 'Modelo', 'Nombre', 'id','Numero de Telefono','recibido por'];
          if(listaDeColumnas.includes(fact)){
            return fact;
          } ;
      });


      const dataFilter = (e) => {
        let filteredData = dataApi.data;
      
        if (e) {
          setChain(e.target.value.toLocaleLowerCase());
        }
      
        if (chain.length >= 1) {
          filteredData = filteredData.filter((fact) => {
            const controlList = [
              'title',
              'model',
              'name',
              'description',
              'id',
              'phone_number',
              'customer'
            ];
      
            const keys = controlList;
                    
            for (let property in fact) {
              if (keys.includes(property)) {
                const value = fact[property];
                if (value && typeof value == 'string') {
                  if (value.toLocaleLowerCase().includes(chain)) {
                    return true;
                  }
                }
                if (value && typeof value == 'number') {
                  if (value.toString().includes(chain)) {
                    return true;
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
      // ... y así sucesivamente para los demás elementos
    };

      return(  

        <>
          
          <div className='titulo-tabla'>
             <h1>Datos de {tables.map((titulo)=>{
              if(window.location.href.toString().includes(Object.keys(titulo))){
                return Object.values(titulo)
              }
             })}
             </h1>
          </div>
          
          <div className='contenedor-body'>

            <div className='contenedor-barra-botonagregar'>
              <AddButton openModal={()=>openModal()}></AddButton>
                <div className='contenedor-barra'>
                  <input type='text' placeholder={`buscar por... ${fact}`} className='barra-busqueda' onChange={(e) => dataFilter(e)}/>
                </div>      
            </div>
          
            <div className="contenedor-tabla" key={uniqueKeys.contenedorTabla} >
              <table className='tabla' key={uniqueKeys.tabla}>
                <thead className='thead' key={uniqueKeys.thead}>
                  <tr className='tr-column' key={uniqueKeys.trColumn}>
                    {Object.values(dataApi.columns).map((column,index)=>(
                      <th key={`${uniqueKeys.thColumn}-${index}`} className='th-columnas'>{column}</th>
                    ))}
                    <th className='ultima-columna' key={uniqueKeys.thColumnActions} >Acciones</th>
                  </tr>
                </thead>
                <tbody className='tbody' key={uniqueKeys.tbody}>
                  {
                  
                  (dataFilter().length > 0)
                  ?
                  dataFilter().map((element,index) =>
                      
                        <tr className='tr-data' key={`${uniqueKeys.trBody}-${index}`}>
                        {Object.keys(dataApi.columns).map((column)=>{
                          for(let i = 0 ; i < Object.keys(element).length ; i++){
                            if(Object.keys(element)[i] === column){
                              if(Object.keys(element)[i] === column && column === "url"){
                                return <td className='td-a' key={`${uniqueKeys.tbody}-${i}`}><a href={Object.values(element)[i]} >{Object.values(element)[i]}</a></td>
                              }
                              if(Object.keys(element)[i] === column && column === "email"){
                                return <td className='td-a' key={`${uniqueKeys.tbody}-${i}`}><a href={""} >{Object.values(element)[i]}</a></td>
                              }
                              if(Object.keys(element)[i] === column && column === "has_security"){
                                if(Object.values(element)[i] === 1){
                                  return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>Si</p></td>
                                }else{
                                  return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>No</p></td>
                                }
                              }
                                return <td className='td' key={`${uniqueKeys.tbody}-${i}`}><p>{Object.values(element)[i]}</p></td>
                            }
                          }
                        })}
                            
                        <td className='ultima-celda' key={uniqueKeys.tdBody}>
                          {
                            (superAdmin)
                            ?
                            <div >
                              <button className='boton-ver' onClick={() => OpenModalView(element)}><FontAwesomeIcon icon={faEye} /></button>
                            </div>
                            :
                            <div className='botones-acciones' >
                              <button className='boton-editar' onClick={() => OpenModalEdit(element)}><FontAwesomeIcon icon={faEdit} /></button>
                              <button className='boton-eliminar' onClick={() => eliminate(element)}><FontAwesomeIcon icon={faTrashAlt} /></button> 
                              <button className='boton-ver' onClick={() => OpenModalView(element)}><FontAwesomeIcon icon={faEye} /></button>
                            </div>
                          }
                        </td>
                      </tr> 
                   )
                  :
                  <tr className='tr-coincidence' key={uniqueKeys.trBodyNd} ><td className='td-coincidence'key={uniqueKeys.tdBodyNd}>No hay coincidencias</td></tr>
                  }
                  
                </tbody>
              </table>
            </div>
              
            <ModalEdit
              openModalEdit={openModalEdit}
              itemToEdit={itemToEdit}
              onsubmit={edit}
              closeForm={closeForm}
              dataBrands={dataBrands}
              dataCustomersEdit={dataCustomersEdit}
              dataCellphonesEdit={dataCellphonesEdit}
              dataServicesEdit={dataServicesEdit}
              errors={errors}>
            </ModalEdit>

            <ModalAdd
              create={create}
              openModalAdd={openModalAdd}
              openModalAddBrand={openModalAddBrand}
              openModalAddCustomer={openModalAddCustomer}
              openModalAddCellphone={openModalAddCellphone}
              openModalAddService={openModalAddService}
              changeModal={changeModal}
              dataApi={dataApi}
              closeForm={closeForm}
              dataBrands={dataBrands}
              dataCustomers={dataCustomers}
              dataCellPhones={dataCellphones}
              dataServices={dataServices}
              errors={errors}>
            </ModalAdd>

            <ModalView
              openModalView={openModalView}
              closeForm={closeForm}
              itemToSee={itemToSee}>
            </ModalView>

          </div>

        </>

      );

    };
   
};

export default Table;