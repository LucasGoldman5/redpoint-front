import React from "react";
import './pageNotAuthorized.css'

const NotAuthorized = () =>{

    return(
        <>
          <div className="body-container-not-authorized">
            <div className="container-h1">
                <h1 className="h1">No esta autorizado para ingresar!</h1>
            </div>
            <div className="container-p-not-authorized">
                <p className="p">Primero debe Logearse, haga click en Inicio para ir a login</p>
            </div>
          </div>
        </>
    )
}

export default NotAuthorized;