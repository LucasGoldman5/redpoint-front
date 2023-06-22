import './add-button.css';

const AddButton=({onClick,dataApi})=>{

    return(
        <div className={dataApi.data.length >= 1 ? 'contenedor-boton-agregar' : 'container-button-no-results'}>
            <button  className="boton boton-agregar" onClick={onClick}>Crear</button>
        </div>
    );
};

export default AddButton;