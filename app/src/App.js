import StartHeader from './componentes/start-header';
import GeneralHeader from './componentes/general-header';
import InformationHeader from './componentes/information-header';
import Table from './componentes/table';
import PersonalInformation from './componentes/personal-information';
import Login from './componentes/login';
import {  Route, Routes } from 'react-router-dom';
import {  useState } from 'react';
import './App.css';
import GetUserData from './helpers/getUserData';





function App() {

  
  const [ user, setUser ] = useState(GetUserData());




  const enterAplication = () =>{

    window.location.assign(`/Table/?txt=${"cellphones"}`);

  } 



  if( user && window.location.href != "http://localhost:3000/InformacionPersonal" ){

    return(
      <>
        <div className="App">
          <GeneralHeader></GeneralHeader>
            <Routes>
                <Route path='/Table' element={<Table/>}></Route>
                <Route path= '/Login'  element={<Login enterAplication={enterAplication}  />}  ></Route> 
                <Route path='/personal-information' element={<PersonalInformation />}></Route>  
            </Routes>
        </div>
      </>

    );

  }else if( user && window.location.href === "http://localhost:3000/InformacionPersonal" ){
 
    return(
      <>
        <div className="App">
          <InformationHeader></InformationHeader>
            <Routes>
                <Route path={`/personal-information`} element={<PersonalInformation></PersonalInformation>}></Route>
                <Route path={`*`} element={<Table />}></Route>
            </Routes>
        </div>
      </>

     );

  }else{
    return(
      <>
        <div className="App">
          <StartHeader></StartHeader>
            <Routes>
                <Route path= '*'  element={<Login enterAplication={enterAplication} />}></Route>   
            </Routes>
        </div>
      </>

    );

  }
 
}

export default App;
