import StartHeader from './componentes/start-header';
import GeneralHeader from './componentes/general-header';
import InformationHeader from './componentes/information-header';
import Table from './componentes/table';
import PersonalInformation from './componentes/personal-information';
import Login from './componentes/login';
import {  BrowserRouter, Route, Routes} from 'react-router-dom';
import {  useEffect, useState } from 'react';
import './App.css';
import GetUserData from './helpers/getUserData';
import HelperBuildRequest from './helpers/buildRequest';
import getEnviroment from './helpers/getEnviroment';






 function App() {

  
  const [ user, setUser ] = useState(GetUserData());
  const [urlTable, setUrlTable] = useState(window.location.href.split("/").slice(4).join('/'));
  const [dataBrands, setDataBrands] = useState([]);
  const [dataCustomers, setDataCustomers] = useState([]);
  const [dataCellphones, setDataCellPhones] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [seeNavReport, setSeeNavReport] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(true);

  const urlApi = async () =>{
    const enviroment = await getEnviroment()
    return  enviroment.apiURL 
  }

  const urlLocal = async () =>{
    const enviroment = await getEnviroment()
    return  enviroment.url
  }


  const openNavReports = async () =>{
    setSeeNavReport(!seeNavReport);
    setArrowIcon(!arrowIcon);

     const apiURL = await urlApi()
     
    if(seeNavReport === false){
       try{
                   
           const config = await HelperBuildRequest("GET",null, "dataTable");
           const request = await fetch(`${apiURL}select-box/brand`, config);
   
             if(request.status === 200){
                 const response = await request.json();
                   if(response.error){
                       setTimeout(()=>{
                         console.log(response.error);
                       },1000);
                   }else{                      
                       setDataBrands(response);
                   }  
             };
   
         }catch(error){
           console.log(error)
         }
         
         try{
                     
           const config = await HelperBuildRequest("GET",null, "dataTable");
           const request = await fetch(`${apiURL}select-box/customer`, config);
   
             if(request.status === 200){
                 const response = await request.json();
                   if(response.error){
                       setTimeout(()=>{
                         console.log(response.error);
                       },1000);
                   }else{                      
                       setDataCustomers(response);
                       
                   }  
             };
   
         }catch(error){
           console.log(error)
         }
         
         try{
                     
           const config = await HelperBuildRequest("GET",null, "dataTable");
           const request = await fetch(`${apiURL}select-box/cellphone`, config);
   
             if(request.status === 200){
                 const response = await request.json();
                   if(response.error){
                       setTimeout(()=>{
                         console.log(response.error);
                       },1000);
                   }else{                      
                       setDataCellPhones(response);
                       
                   }  
             };
   
         }catch(error){
           console.log(error)
         }
         
         try{
                     
           const config = await HelperBuildRequest("GET",null, "dataTable");
           const request = await fetch(`${apiURL}select-box/service`, config);
   
             if(request.status === 200){
                 const response = await request.json();
                   if(response.error){
                       setTimeout(()=>{
                         console.log(response.error);
                       },1000);
                   }else{                      
                       setDataServices(response);
                   }  
             };
   
         }catch(error){
           console.log(error)
         }
    };
 };


  const changeUrl = (url,id) =>{
    if(id){
      setSeeNavReport(false)
      return setUrlTable(url+`/${id}`)
    }else{
      setSeeNavReport(false)
     return setUrlTable(url)
    };
  };
  
  

  const enterAplication = async () =>{

    const localUrl = await urlLocal();

    window.location.assign(`${localUrl}Table/report/reparations-pending`);

  };


  if(user && window.location.href != `http://localhost:3000/personal-information`){

    return(
      <>
        <div className='App' >
        <BrowserRouter>
          <GeneralHeader
           changeUrl={changeUrl}
           arrowIcon={arrowIcon}
           openNavReports={openNavReports}
           seeNavReport={seeNavReport}
           dataBrands={dataBrands}
           dataCustomers={dataCustomers}
           dataServices={dataServices}
           dataCellphones={dataCellphones}>
           </GeneralHeader>
              
              <Routes>
                  <Route path={`/Table/${urlTable}`} element={<Table urlTable={urlTable}/>}  ></Route>
                  <Route path= '/Login'  element={<Login enterAplication={enterAplication}  />}  ></Route> 
                  <Route path='/personal-information' element={<PersonalInformation />}></Route> 
              </Routes>  
              
          </BrowserRouter>       
        </div>
      </>
    )
  }else if(user && window.location.href === `http://localhost:3000/personal-information`){

      return(
        <>
          <div className="App">
          <BrowserRouter>
            <InformationHeader></InformationHeader>
                <Routes>
                    <Route path={`/personal-information`} element={<PersonalInformation></PersonalInformation>}></Route>
                    <Route path={`*`} element={<Table />}></Route>
                </Routes>
              </BrowserRouter>
          </div>
        </>

      );
  }else{
    return(
        <>
          <div className="App">
          <BrowserRouter>
            <StartHeader></StartHeader>
                <Routes>
                    <Route path= '*'  element={<Login enterAplication={enterAplication} />}></Route>   
                </Routes>
              </BrowserRouter>
          </div>
        </>
      );
  }
  
}

export default App;
