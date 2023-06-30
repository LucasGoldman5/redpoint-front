import StartHeader from './componentes/start-header';
import GeneralHeader from './componentes/general-header';
import InformationHeader from './componentes/information-header';
import Table from './componentes/table';
import GeneratePassword from './componentes/generateUserPassword';
import PersonalInformation from './componentes/personal-information';
import Error404 from './componentes/page404';
import NotAuthorized from './componentes/pageNotAuthorized';
import Login from './componentes/login';
import {  BrowserRouter, Route, Routes} from 'react-router-dom';
import {  useEffect, useState } from 'react';
import './App.css';
import GetUserData from './helpers/getUserData';
import HelperBuildRequest from './helpers/buildRequest';
import getEnviroment from './helpers/getEnviroment';



 

 const App = () => {

  
  const [ user, setUser ] = useState(GetUserData());
  const [urlTable, setUrlTable] = useState(window.location.href.split("/").slice(4).join('/'));
  const [dataBrands, setDataBrands] = useState([]);
  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataCellphones, setDataCellPhones] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [dataManagers, setDataManagers] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);
  const [seeNavReport, setSeeNavReport] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(true);
  const [error404, setError404] = useState(false)
  const [dataEnviroment, setDataEnviromet] = useState({});

  const setEnviroment = async () =>{
    setDataEnviromet( await getEnviroment())
  }
 

  const urlApi = () =>{
      return  dataEnviroment.apiURL 
  }

  const urlEntities = () =>{
    return dataEnviroment.entities
  }

  const timeOut = () =>{
    setTimeout(()=>{
    setError404(true)
  },2000)
}

  useEffect(()=>{
    timeOut()
    setEnviroment()
  },[])


  const openNavReports = async () =>{
    setSeeNavReport(!seeNavReport);
    setArrowIcon(!arrowIcon);
    const apiURL = urlApi();
    const entitiesUrl = urlEntities();
    
    if(dataBrands.length < 1){
      try{
                   
        const config = await HelperBuildRequest("GET",null, "dataTable");
        const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.brand}`, config);

          if(request.status === 200){
              const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                    
                    setDataBrands(response);
                    setDataTotal((prevDataTotal) => [
                      ...prevDataTotal,
                      { brands: response },
                    ]);
                }  
          };

      }catch(error){
        console.log(error)
      }
    }
    if(dataCellphones.length < 1){
      try{
                    
        const config = await HelperBuildRequest("GET",null, "dataTable");
        const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.cellphone}`, config);

          if(request.status === 200){
              const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                      
                    setDataCellPhones(response);
                    setDataTotal((prevDataTotal) => [
                      ...prevDataTotal,
                      { cellphones: response },
                    ]);
                }  
          };

      }catch(error){
        console.log(error)
      }
    }
    if(dataCustomers.length < 1){
      try{
                    
        const config = await HelperBuildRequest("GET",null, "dataTable");
        const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.customer}`, config);

          if(request.status === 200){
              const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                      
                    setDataCustomers(response);
                    setDataTotal((prevDataTotal) => [
                      ...prevDataTotal,
                      { customers: response },
                    ]);
                }  
          };

      }catch(error){
        console.log(error)
      }
    }
    if(dataServices.length < 1){
      try{
                    
        const config = await HelperBuildRequest("GET",null, "dataTable");
        const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.service}`, config);

          if(request.status === 200){
              const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                      
                    setDataServices(response);
                    setDataTotal((prevDataTotal) => [
                      ...prevDataTotal,
                      { service: response },
                    ]);
                }  
          };

      }catch(error){
        console.log(error)
      }
    }
    if(dataManagers.length < 1){
      try{
                    
        const config = await HelperBuildRequest("GET",null, "dataTable");
        const request = await fetch(`${apiURL.url}${apiURL.selectBox}${entitiesUrl.managers}`, config);

          if(request.status === 200){
              const response = await request.json();
                if(response.error){
                    setTimeout(()=>{
                      console.log(response.error);
                    },1000);
                }else{                      
                    setDataManagers(response);
                    setDataTotal((prevDataTotal) => [
                      ...prevDataTotal,
                      { managers: response },
                    ]);
                }  
          };

      }catch(error){
        console.log(error)
      }
    } 
 };


  const changeUrl = (url,id) =>{
    if(id){
      setSeeNavReport(false)
      return setUrlTable(`${url}/${id}`)
    }else{
      setSeeNavReport(false)
     return setUrlTable(url)
    };
  };
  

  if(user && window.location.href.includes("Tabla") && dataEnviroment.selfUrl){

    return(
      <>
        <div className='App' >
        <BrowserRouter>
          <GeneralHeader
           changeUrl={changeUrl}
           urlTable={urlTable} 
           arrowIcon={arrowIcon}
           openNavReports={openNavReports}
           seeNavReport={seeNavReport}
           dataBrands={dataBrands}
           dataCustomers={dataCustomers}
           dataServices={dataServices}
           dataCellphones={dataCellphones}
           dataManagers={dataManagers}
           enviroment={dataEnviroment}>
           </GeneralHeader>
              
              <Routes>
                  <Route path={`/${dataEnviroment.selfUrl.dataTable}${urlTable}`} element={
                  <Table 
                  urlTable={urlTable} 
                  enviroment={dataEnviroment} 
                  dataTotal={dataTotal}
                  />
                  }></Route>
                  <Route path={`${dataEnviroment.selfUrl.login}`} element={<Login  enviroment={dataEnviroment} />}  ></Route> 
                  <Route path={`/${dataEnviroment.selfUrl.personalInformation}`} element={<PersonalInformation />}></Route> 
                  <Route path={`/${dataEnviroment.selfUrl.dataTable}/*`} element={<Error404 />}></Route>  
              </Routes>  
              
          </BrowserRouter>       
        </div>
      </>
    )
  }else if(user && window.location.href.includes("personal") && dataEnviroment.selfUrl){

      return(
        <>
          <div className="App">
          <BrowserRouter>
            <InformationHeader enviroment={dataEnviroment}/>
                <Routes>
                    <Route path={`/${dataEnviroment.selfUrl.personalInformation}`} element={<PersonalInformation></PersonalInformation>}></Route>
                    <Route path={`/${dataEnviroment.selfUrl.dataTable}/${urlTable}`} element={<Table urlTable={urlTable}/>}></Route>
                    <Route path={`/${dataEnviroment.selfUrl.dataTable}/*`} element={<Error404 />}></Route>
                    <Route path='*' element={<Error404 />}></Route>
                </Routes>
              </BrowserRouter>
          </div>
        </>

      );
  }else if(dataEnviroment.selfUrl){
    return(
        <>
          <div className="App">
          <BrowserRouter>
            <StartHeader></StartHeader>
                <Routes>
                    <Route path={`/${dataEnviroment.selfUrl.login}`}  element={<Login enviroment={dataEnviroment} />}></Route> 
                    <Route path={`/${dataEnviroment.selfUrl.generatePassRoute}`} element={<GeneratePassword enviroment={dataEnviroment}/>}></Route> 
                    <Route path='*' element={<NotAuthorized/>}></Route> 
                </Routes>
              </BrowserRouter>
          </div>
        </>
      );
  }
  
}

export default App;
