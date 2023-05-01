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



const Table = () =>{

    const [dataApi, setDataApi] = useState([]);
    const [dataBrands, setDataBrands] = useState([]);
    const [superAdmin, setSuperAdmin] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalAddBrand, setOpenModalAddBrand] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToSee, setItemToSee] = useState(null);
    const [chain,setChain] = useState("");
    const [errors, setErrors] = useState([]);
    const [classesErrors, setClassesErrors] = useState(false);


    const location = useLocation();

    const getUser = localStorage.getItem("user");

    const tables = [
      {
        "brands":"Marcas",
        "cellphones":"Celulares",
        "services":"Servicios",
        "customers":"Clientes",
        "reparations":"Reparaciones"
     }
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
      const queryParams = new URLSearchParams(location.search);
      const txt = queryParams.get("txt");
      const config = HelperBuildRequest('GET', null, 'dataTable');

      await fetch(`http://localhost:8000/api/${txt}`, config)
        .then( res  => res.json())
        .then( datos =>{
          console.log(datos);
          setDataApi(datos)
        });
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
        };  
    };

    const changeModal = () =>{
      setOpenModalAdd(false);
      setOpenModalAddBrand(true);
    }

    const addBrandInCellphones = async (data) =>{

      if(data){

        try{

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
                };
            };

            if(request.status === 422){
              const response = await request.json();
              console.log(response);
                if(response.errors){
                  console.log(response.errors);
                  setErrors(response.errors)
                };
            };
        }catch(error){
          console.log(error)
        };    
      };

    };

    const closeForm = () =>{

      setOpenModalAdd(false); 
      setOpenModalAddBrand(false);
      setOpenModalEdit(false);
      setOpenModalView(false);
      setItemToEdit(null);

    }


    const add = async (data) =>{

        if(data){
            try {

              const queryParams = new URLSearchParams(location.search);
              const txt = queryParams.get("txt");
              const config = HelperBuildRequest("POST", data, "dataTablePost");                    
              const request = await fetch(`http://localhost:8000/api/${txt}`, config);

                if(request.status === 200){
                  const response = await request.json();
                    if(response.error){
                      setTimeout(()=>{
                        console.log(response.error);
                      },1000);
                    }else{                      
                      setOpenModalAdd(false);
                      window.location.reload();
                    };  
                };

                if(request.status === 422){
                  const response = await request.json();
                    if(response.errors){
                      setErrors(response.errors);
                      setClassesErrors(true);
                    };
                };
            }catch(error){
                console.log(error);
            };    
        };
        
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
           };   
    };   
  
      
          
    const edit =  async (data) =>{

      let id = data["id"];
    
        if(data){

          try {

            const queryParams = new URLSearchParams(location.search);
            const txt = queryParams.get("txt");
            const config = HelperBuildRequest("PUT", data, "dataTablePut");
            const request = await fetch(`http://localhost:8000/api/${txt}/${id}`, config);

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
                console.log(response);
                  if(response.errors){
                    console.log(response.errors);
                    setErrors(response.errors);
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

      const controlList = ['title', 'model', 'name'  ];
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

              const queryParams = new URLSearchParams(location.search);
              const txt = queryParams.get("txt");
              const config = HelperBuildRequest("DELETE", "dataTable");
              const request = await fetch(`http://localhost:8000/api/${txt}/${id}`, config);

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

          };
        });

    };


    const OpenModalView = (element) => {

      setItemToSee(element);
      setOpenModalView(true); 

    };


    if(dataApi.length != 0){

      const fact = Object.values(dataApi.columns).filter((fact) =>{       
        const listaDeColumnas = ['Marca', 'Modelo', 'Nombre', 'id','Numero de Telefono','Email'];
          if(listaDeColumnas.includes(fact)){
            return fact;
          } ;
      });

      return(  

        <>
          
          <div className='titulo-tabla'>
            {tables.map((titulo)=>{
              const queryParams = new URLSearchParams(location.search)
              const txt = queryParams.get("txt")
                if(Object.keys(titulo).includes(txt)){
                return <h1 key={txt}>Datos de {titulo[txt]}</h1>
                }
            })};
          </div>
          
          <div className='contenedor-body'>

            <div className='contenedor-barra-botonagregar'>
              <AddButton openModal={openModal}></AddButton>
                <div className='contenedor-barra'>
                  <input type='text' placeholder={`buscar por... ${fact}`} className='barra-busqueda' onChange={(e) => setChain(e.target.value.toLocaleLowerCase())}/>
                </div>      
            </div>
          
            <div className="contenedor-tabla">
              <table className='tabla'>
                <thead className='thead'>
                  <tr className='tr-column'>
                    {Object.values(dataApi.columns).map((column)=>(
                      <th key={column} className='th-columnas'>{column}</th>
                    ))}
                    <th className='ultima-columna'>Acciones</th>
                  </tr>
                </thead>
                <tbody className='tbody'>
                  {dataApi.data.filter((fact) =>{

                    const controlList = ['title', 'model', 'name', 'description', 'id','phone_number','email'];
                    const keys = controlList;
                      for(let property in fact ){
                        if(keys.includes(property)){
                          const value = fact[property];
                          if(value && typeof value == 'string'){
                            if(value.toLocaleLowerCase().includes(chain))
                              return value
                          }if(value && typeof value == 'number'){
                            if(value.toString().includes(chain))
                              return value
                          };
                        };
                      };
                    return false

                  }).map((element) =>
                      
                      <tr className='tr-data' key={element["id"]}>
                        {Object.keys(dataApi.columns).map((column)=>{
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
                              <button className='boton-ver' onClick={() => OpenModalView(element)}><FontAwesomeIcon icon={faEye} /></button>
                            </div>
                            :
                            <div>
                              <button className='boton-editar' onClick={() => OpenModalEdit(element)}><FontAwesomeIcon icon={faEdit} /></button>
                              <button className='boton-eliminar' onClick={() => eliminate(element)}><FontAwesomeIcon icon={faTrashAlt} /></button> 
                              <button className='boton-ver' onClick={() => OpenModalView(element)}><FontAwesomeIcon icon={faEye} /></button>
                            </div>
                          }
                        </td>
                      </tr>  
                  )}
                </tbody>
              </table>
            </div>
              
            <ModalEdit
              openModalEdit={openModalEdit}
              itemToEdit={itemToEdit}
              onsubmit={edit}
              closeForm={closeForm}
              dataBrands={dataBrands}
              errors={errors}>
            </ModalEdit>

            <ModalAdd
              openModalAdd={openModalAdd}
              openModalAddBrand={openModalAddBrand}
              changeModal={changeModal}
              dataApi={dataApi}
              closeForm={closeForm}
              onSubmit={add}
              onSubmitMarca={addBrandInCellphones}
              dataBrands={dataBrands}
              errors={errors}
              addBrandInCellphones={addBrandInCellphones}
              classesErrors={classesErrors}>
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