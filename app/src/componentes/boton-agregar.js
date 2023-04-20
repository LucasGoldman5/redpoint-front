import './agregar-boton.css'

const BotonAgregar=({abrirModal})=>{



    return(
        <div className='contenedor-boton-agregar'>
        <button onClick={abrirModal} className="boton boton-agregar" >Crear</button>
    </div>
    )
}

export default BotonAgregar;