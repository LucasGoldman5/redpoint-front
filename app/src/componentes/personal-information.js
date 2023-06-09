import React, { useState } from "react";
import './personal-information.css'
import GetUserData from "../helpers/getUserData";


const PersonalInformation = () => {

    const [ user,setUser] = useState(GetUserData());

    return(
      <div className="personal-information-general-container">
        <div className="personal-information-container">
            <div className="personal-information-header">
                <h2>Datos del Usuario</h2>   
            </div>
            <div className="personal-information-body">
                <label>Nombre:</label>
                <input type="text" readOnly defaultValue={user.name}></input>
                <label>Email:</label>
                <input type="text" readOnly defaultValue={user.email}></input>
                <label>Cargo:</label>
                <input type="text" readOnly defaultValue={user.rol_id.rol}></input>
            </div>
        </div>
      </div>
    );
};

export default PersonalInformation;