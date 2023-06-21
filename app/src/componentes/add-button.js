import './add-button.css';

const AddButton=({onClick})=>{

    return(
        <div className='contenedor-boton-agregar'>
            <button  className="boton boton-agregar" onClick={onClick}>Crear</button>
        </div>
    );
};

export default AddButton;