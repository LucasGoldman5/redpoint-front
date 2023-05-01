import './add-button.css';

const AddButton=({openModal})=>{

    return(
        <div className='contenedor-boton-agregar'>
            <button onClick={openModal} className="boton boton-agregar" >Crear</button>
        </div>
    );
};

export default AddButton;