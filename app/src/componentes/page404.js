import React from "react";
import './page404.css'

const Error404 = ({entitiNotFound}) =>{


    return(
        <>
          <div className="body-container-page404">
            <div className="container-404">
                <h1 className="h1-404">404</h1>
            </div>
            <div className="container-p-notfound">
                {
                    entitiNotFound
                    ?
                    entitiNotFound == "reparacion" || entitiNotFound == "marca"
                    ?
                    <p className="p-notfound">{`Esta ${entitiNotFound} fue Eliminada`}</p>
                    :
                    <p className="p-notfound">{`Este ${entitiNotFound} fue Eliminado`}</p>
                    :
                    <p className="p-notfound">{`pagina no encontrada`}</p>
                }
            </div>
          </div>
        </>
    )

}

export default Error404