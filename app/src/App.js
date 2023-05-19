import StartHeader from './componentes/start-header';
import GeneralHeader from './componentes/general-header';
import InformationHeader from './componentes/information-header';
import Table from './componentes/table';
import PersonalInformation from './componentes/personal-information';
import Login from './componentes/login';
import {  BrowserRouter, Route, Routes} from 'react-router-dom';
import {  useState } from 'react';
import './App.css';
import GetUserData from './helpers/getUserData';






function App() {

  
  const [ user, setUser ] = useState(GetUserData());

  
  const enterAplication = () =>{

    window.location.assign("http://localhost:3000/Table/report/reparations-pending");

  };

 
  if(user){

    return(
      <>
        <div className='App' >
        <BrowserRouter>
          <GeneralHeader></GeneralHeader>

              <div>
              <Routes>
                  <Route path='/Table/cellphones' element={<Table urll={"pedrito"}/>}  ></Route>
                  <Route path='/Table/brands' element={<Table/>}></Route>
                  <Route path='/Table/services' element={<Table/>}></Route>
                  <Route path='/Table/customers' element={<Table/>}></Route>
                  <Route path='/Table/reparations' element={<Table/>}></Route>
                  <Route path= '/Login'  element={<Login enterAplication={enterAplication}  />}  ></Route> 
                  <Route path='/personal-information' element={<PersonalInformation />}></Route>
                  <Route path='/Table/report/reparations-pending' element={<Table />} />
                  <Route path='/Table/report/reparations-success' element={<Table />} />
                  <Route path='/Table/report/reparations-by-brand/:id' element={<Table />} />
                  <Route path='/Table/report/reparations-by-customer/:id' element={<Table />} />
                  <Route path='/Table/report/reparations-by-cellphone/:id' element={<Table />} />
                  <Route path='/Table/report/reparations-by-service/:id' element={<Table />} />  
              </Routes>  
              </div>
          </BrowserRouter>       
        </div>
      </>
    )
  }else if(user && window.location.href === "http://localhost:3000/personal-information"){

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
