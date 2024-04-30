import React, { useState, useEffect, useRef } from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faXmark } from '@fortawesome/free-solid-svg-icons';



  class Pattern {

    points = new Array();
      selection = Array();
      verticalCount = 0;
      horizontalCount = 0;
      mousePressed = false;
      context = null;
      canvas = null;
      font = null;
      metrics = null;
      accumulatedIndex = "";

      constructor(canvas, setPattern, horizontalCount = 3, verticalCount = 3, radio = 6, font = "10px Arial", accumulatedIndex = "") {
          this.canvas = canvas;
          this.setPattern = setPattern;
          this.context = canvas.getContext("2d");
          this.metrics = { height: canvas.height, width: canvas.width };
          this.radio = radio;
          this.font = font;
          this.horizontalCount = horizontalCount;
          this.verticalCount = verticalCount;
          this.accumulatedIndex = accumulatedIndex;

          for (let i = 0; i < verticalCount * horizontalCount; i++) {
              this.points.push(new PatternPoint(this.context, this.getPointData(i), this.font))
          }

          this.registerEvents();
          this.draw();
      }
      setSequence(sequence) {
          sequence.split(",").forEach((i) => this.addPoint(this.points[i - 1]))
          this.draw();
      }
      getSequence() {
          const values = this.points.filter((p) => p.hasPosition()).sort((p1, p2) => p1.getPosition() - p2.getPosition());
          return values.map((p) => p.getIndex() + 1).join(",");
      }
      draw() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.selection.forEach((p, i, a) => {
              if (i > 0) {
                  p.drawConnection(a[i - 1]);
              }
          });
          this.points.forEach((p) => p.draw());
      }

      updatePattern() {
        this.selection.forEach((p, i, a) => {
          if (i > 0) {
            p.drawConnection(a[i - 1]);
          }
        });
    
        // Obtener la secuencia y actualizar el estado pattern
        const newPattern = this.accumulatedIndex;
        this.setPattern(newPattern); // Aquí usamos setPattern para actualizar el estado
      }

      getPointData(index) {
          const margin = this.radio
          const width = (this.metrics.width - (margin * 2)) / (this.horizontalCount - 1);
          const height = (this.metrics.height - (margin * 2)) / (this.verticalCount - 1);
          const horizontalIndex = index % this.horizontalCount;
          const verticalIndex = Math.floor(index / this.horizontalCount);
          const x = margin + (horizontalIndex * width);
          const y = this.metrics.height - margin - (verticalIndex * height);

          const newIndex = (verticalIndex * this.horizontalCount) + horizontalIndex + 1;
          
          return { x, y, radio: this.radio, index: newIndex };
      }
      registerEvents() {
          this.canvas.addEventListener("mousedown", (e) => this.onMouseDownEvent(e));
          this.canvas.addEventListener("mouseup", (e) => this.onMouseUpEvent(e));
          this.canvas.addEventListener("mousemove", (e) => this.onMouseMoveEvent(e));
      }
      onMouseUpEvent(event) {
        
          this.mousePressed = false;
          this.draw();
          this.updatePattern();
      }
      onMouseDownEvent(event) {
        this.accumulatedIndex = ""
          if (!this.mousePressed) {
              this.mousePressed = true;
              this.selection = new Array();
              this.points.forEach((p) => p.setPosition(0));
          }
          const point = this.findAndAddPoint(event.offsetX, event.offsetY);

          if (point) {
              this.draw();
          }
      }
      onMouseMoveEvent(event) {
          if (this.mousePressed) {
              const point = this.findAndAddPoint(event.offsetX, event.offsetY);

              if (point) {
                  this.draw();
              }
          }
      }
      addPoint(point) {
          if (!point) {
              return null;
          }
          if (this.selection.findIndex((p) => point.getIndex() == p.getIndex()) != -1) {
              return null;
          }
          this.accumulatedIndex += point.data.index.toString();
          this.selection.push(point);

          point.setPosition(this.selection.length);

          return point;
      }
      findPoint(x, y) {
          return this.points.find((p) => p.inArea(x, y));
      }
      findAndAddPoint(x, y) {
          return this.addPoint(this.findPoint(x, y));
      }
      getPattern() {
          return this.selection.reduce((p, c, i, a) => p.push(c.position), []);
      }
  }

  class PatternPoint {
    // ... (código de PatternPoint)

    // Resto del código de PatternPoint
    font = "5px Arial";
      data = { x: 0, y: 0, radio: 0, index: 0 };
      position = 0;
      context = null;
      circle = null;

      constructor(context, data, font) {
          this.context = context;

          this.data = data;
          this.font = font;

          this.createCircle();
      }
      createCircle() {
          this.circle = new Path2D();
          this.circle.arc(this.data.x, this.data.y, this.data.radio, 0, 2 * Math.PI);
      }
      draw() {
          if (this.position) {
              this.drawFilled();
          } else {
              this.drawEmpty();
          }
      }
      drawEmpty() {
          this.context.fillStyle = "black";
          this.context.fill(this.circle);
      }
      drawFilled() {
          this.context.fillStyle = "green";
          this.context.fill(this.circle);

          this.drawText();
      }
      drawText() {
          this.context.fillStyle = "white";
          this.context.textAlign = "center";
          this.context.textBaseline = "middle";
          this.context.font = this.font;

          this.context.fillText(this.position.toString(), this.data.x, this.data.y);
      }
      drawConnection(point) {
          this.context.lineWidth = this.data.radio * .5;
          this.context.strokeStyle = "gray";

          this.context.beginPath();
          this.context.moveTo(this.data.x, this.data.y);
          this.context.lineTo(point.data.x, point.data.y);
          this.context.stroke();
      }
      setPosition(position) {
          this.position = position;
      }
      getPosition() {
          return this.position;
      }
      hasPosition() {
          return this.position != 0;
      }
      getIndex() {
          return this.data.index;
      }
      inArea(x, y) {
          const inPath = this.context.isPointInPath(this.circle, x, y);
          return inPath;
      }
  }
const ModalEditReparation = ({openModalEdit, onsubmit, itemToEdit, changeError, changeModal, errors, edit, closeForm, handleInputChange, selectCellphoneActive, selectCustomerActive, selectServiceActive, newCellphoneSelectedEdit, newCustomerSelectedEdit, newServiceSelectedEdit, filteredCellphones, filteredCustomers, filteredServices, activeInputSearch, dataStatesEdit, dataServiceStatusEdit, addEmail}) =>{

    const [checkboxOn, setCheckboxOn] = useState(false);
    const [firstCheckboxOn, setFirstCheckboxOn] = useState(false);
    const [customerSelected, setCustomerSelected] = useState({});
    const [cellphoneSelected, setCellphoneSelected] = useState({});
    const [serviceSelected, setServiceSelected] = useState({});
    const [endDateSelected, setEndDateSelected] = useState(null);
    const [startDateSelected, setStartDateSelected] = useState(null);
    const [deliveryDateSelected, setDeliveryDateSelected] = useState(null);
    const patternRef = useRef(null);
    const [pattern, setPattern] = useState(null);

   
    useEffect(() => {
      setTimeout(() => {
        if (patternRef.current) {
          
          const patternInstance = new Pattern(patternRef.current, setPattern);
          setPattern(patternInstance);
    
          // Puedes setear la secuencia aquí, si es necesario
           patternInstance.setSequence(itemToEdit.pattern ? itemToEdit.pattern.toString().split('').join(',') : "");
        }
      },2000)
    }, [openModalEdit]);

    useEffect(() => {
      if (typeof pattern === 'string') {
        setValue('pattern', pattern);
      }
    }, [pattern]);

    const changeValue = (values) =>{

        if(newCustomerSelectedEdit.id){
            setValue("customer_id",newCustomerSelectedEdit.id)
        }else{
            if(customerSelected.id){
                setValue("customer_id",customerSelected.id)
            }
        }
        if(newCellphoneSelectedEdit.id){
            setValue("cellphone_id",newCellphoneSelectedEdit.id)
        }else{
            if(cellphoneSelected.id){
                setValue("cellphone_id",cellphoneSelected.id)
            }
        }
        if(newServiceSelectedEdit.id){
            setValue("service_id",newServiceSelectedEdit.id)
        }else{
            if(serviceSelected.id){
                setValue("service_id",serviceSelected.id)
            }
        }

        if(values.reception_date){
          setValue("reception_date",new Date(itemToEdit.reception_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.reception_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.reception_date).getUTCDate()).slice(-2) )
        }
        if(endDateSelected){
          setValue("service_end_date",new Date(endDateSelected).getFullYear() + "-" + ("00" + (new Date (endDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(endDateSelected).getUTCDate()).slice(-2) )
        }else if(values.service_end_date){
          setValue("service_end_date",new Date(values.service_end_date).getFullYear() + "-" + ("00" + (new Date (values.service_end_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(values.service_end_date).getUTCDate()).slice(-2) )
        }

        if(startDateSelected){
          setValue("service_start_date",new Date(startDateSelected).getFullYear() + "-" + ("00" + (new Date (startDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(startDateSelected).getUTCDate()).slice(-2) )
        }else if(values.service_start_date){
          setValue("service_start_date",new Date(values.service_start_date).getFullYear() + "-" + ("00" + (new Date (values.service_start_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(values.service_start_date).getUTCDate()).slice(-2) )
        }

        if(deliveryDateSelected){
          setValue("delivery_date",new Date(deliveryDateSelected).getFullYear() + "-" + ("00" + (new Date (deliveryDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(deliveryDateSelected).getUTCDate()).slice(-2) )
        }else if(values.delivery_date){
          setValue("delivery_date",new Date(values.delivery_date).getFullYear() + "-" + ("00" + (new Date (values.delivery_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(values.delivery_date).getUTCDate()).slice(-2) )
        }
    }

    const addValues = (id,entity) =>{

        if(entity == "customer"){
            filteredCustomers().map((customer) =>{
                if(customer.id == id){
                   setCustomerSelected(customer);
                };
              });
        }
        if(entity == "cellphone"){
            filteredCellphones().map((cellphone) =>{
                if(cellphone.id == id){
                   setCellphoneSelected(cellphone);
                };
              });
        }
        if(entity == "service"){
            filteredServices().map((service) =>{
                if(service.id == id){
                   setServiceSelected(service);
                };
              });
        }
    }

    const changeDates = (entity,e) =>{
      let value = e.target.value
      if(entity == "service_end_date"){
        setEndDateSelected(value);
      }else if(entity == "service_start_date"){
        setStartDateSelected(value);
      }else if(entity == "delivery_date"){
        setDeliveryDateSelected(value);
      }
    }

    const checkBoxChange = () =>{
        setCheckboxOn(!checkboxOn)
    }

    const firstCheckBoxChange = () =>{
        setFirstCheckboxOn(!checkboxOn)
    }

    const { register, handleSubmit, setValue, getValues} = useForm ();


    return(
        <Modal id="elementModal" isOpen={openModalEdit} onOpened={() => changeValue(getValues())} className="modal-reparations">
        <ModalHeader style={{display: 'block', color: 'rgb(0, 0, 255)'}}>
          <div className="div-title-modal">
            <h5  style={{float: 'center'}} >{`Editar Reparacion #${itemToEdit.id}`}</h5>
            <FontAwesomeIcon className="icon-close-modal"  onClick={closeForm} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group reparations" onSubmit={handleSubmit(onsubmit)}> 
            <input style={{visibility:"hidden", position:"absolute" }} type="text"  readOnly  defaultValue={itemToEdit ? itemToEdit.id : ''} {...register('id',{ shouldUnregister: true,})} />
            <div className="div-inputs">
              <label>Cliente</label>              
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"customer")} placeholder="buscar.." className={selectCustomerActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.customer_id ? "form-select error" : "form-select"} defaultValue={itemToEdit && newCustomerSelectedEdit == [] ? itemToEdit.customer.id ? itemToEdit.customer.id : "" : newCustomerSelectedEdit.length > 0 ? newCustomerSelectedEdit.id : null}{...register('customer_id',{
                   onChange: (e) =>{ 
                   addEmail(e.target.value,"customer")
                   addValues(e.target.value,"customer")
                   },
                   })}>
                  {
                    (newCustomerSelectedEdit.id)
                    ?
                     <option value={newCustomerSelectedEdit.id}>{newCustomerSelectedEdit.name}</option>
                    :
                    itemToEdit.customer.customer
                    ?
                    <option style={{visibility:"hidden", display:"none"}} value={itemToEdit.customer.id}>{itemToEdit.customer.customer}</option>
                    :
                    <option >Seleccionar..</option>
                  }
                  {filteredCustomers().map((customer)=>{     
                      return <option className={itemToEdit && newCustomerSelectedEdit.length < 1 ? itemToEdit.customer.id == customer.id ? "option-selected" :"option-modal" : newCustomerSelectedEdit.length > 0 ? newCustomerSelectedEdit.id == customer.id ? "option-selected" :"option-modal":"option-modal"} 
                                     key={customer.id} 
                                     value={customer.id} 
                                     >{customer.name}</option>   
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("customer")}>+</h1>
              </div>
              {errors.customer_id? <p className="p-errores">Debe seleccionar un cliente</p>: ""}
            </div>
            
            <div className="div-inputs">
              <label >Numero de contacto</label>
              <input className="form-control" type="text"  defaultValue={itemToEdit ? itemToEdit.number : ''} {...register('number')} />
            </div>
            
            <div className="div-inputs">
              <label >Email</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.email ? itemToEdit.email : '' : ""} {...register('email')} />
                {errors.email? <><p className="p-errores">El campo Email no cumple con el formato</p><p className="p-errores">Ejemplo:xxxxx@xxx.com</p></>: ""}
            </div>
            
            <div className="div-inputs">
              <label >Celular</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"cellphone")} placeholder="buscar.." className={selectCellphoneActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"cellphone")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.cellphone_id ? "form-select error" : "form-select"} type="text" name="email" id="email"  defaultValue={itemToEdit && newCellphoneSelectedEdit == [] ? itemToEdit.cellphone.id ? itemToEdit.cellphone.id : "": newCellphoneSelectedEdit.length > 0 ? newCellphoneSelectedEdit.id : null}{...register('cellphone_id',{
                   onChange: (e) => {
                   changeError("cellphone")
                   addValues(e.target.value,"cellphone")
                   }
                   })}>
                  {
                    (newCellphoneSelectedEdit.id)
                    ?
                     <option value={newCellphoneSelectedEdit.id}>{newCellphoneSelectedEdit.model}</option>
                    :
                    itemToEdit.cellphone.model
                    ?
                    <option style={{visibility:"hidden", display:"none"}} value={itemToEdit.cellphone.id}>{itemToEdit.cellphone.brand ? itemToEdit.cellphone.brand + "-" : ""}{itemToEdit.cellphone.model}</option>
                    :
                    <option >Seleccionar..</option>
                  }
                  {filteredCellphones().map((cellphone)=>{           
                      return <option className={itemToEdit && itemToEdit.cellphone.id == cellphone.id ? "option-selected" :"option-modal"} 
                      key={cellphone.id} 
                      value={cellphone.id} 
                      >{cellphone.brand_id ? cellphone.brand_id.brand + "-" : ""}{cellphone.model}</option>   
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("cellphone")}>+</h1>
              </div>
                {errors.cellphone_id? <p className="p-errores">Debe seleccionar un celular</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label >Falla</label>
              <textarea className="form-control" type="text"  defaultValue={itemToEdit ? itemToEdit.failure : ''}{...register('failure')} />
            </div>
            
            <div className="div-inputs">
              <label >Observacion</label>
              <textarea className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.observation : ''}{...register('observation')} />
            </div>
            
            <div className="div-inputs">
              <label>Estado de la reparacion</label>
              <select  className="form-select" defaultValue={itemToEdit ? itemToEdit.state_id.id : null}{...register("state_id",{
                required:true,
              })}>
                <option style={{visibility:"hidden", display:"none"}}  value={itemToEdit ? itemToEdit.state_id.id : null}>{itemToEdit ? itemToEdit.state_id.description : null}</option>
                {dataStatesEdit.map((state) => {
                  return <option className={itemToEdit ? itemToEdit.state_id.id ? itemToEdit.state_id.id == state.id ? "option-selected" :"option-modal" : "option-modal" : "option-modal"}  value={state.id} key={state.id}>{state.description}</option>
                })}
              </select>
            </div>

            <div className="div-inputs">
              <label>Estado del Servicio</label>
              <select  className="form-select" defaultValue={itemToEdit ? itemToEdit.service_status_id? itemToEdit.service_status_id : null  : null}{...register("service_status_id",{
              })}>
                <option style={{visibility:"hidden", display:"none"}}  value={itemToEdit ?  itemToEdit.service_status_id ? itemToEdit.service_status_id.id : null : null}>{itemToEdit ? itemToEdit.service_status_id ? itemToEdit.service_status_id.description : "Seleccionar" : "Seleccionar"}</option>
                {dataServiceStatusEdit.map((state) => {
                  return <option className={itemToEdit ? itemToEdit.service_status_id ? itemToEdit.service_status_id.id == state.id ? "option-selected" :"option-modal" : "option-modal" : "option-modal"}  value={state.id} key={state.id}>{state.description}</option>
                })}
              </select>
            </div>

            <div className="div-inputs">
              <label >Estado de envio al servicio</label>
              <textarea className="form-control" type="text"  defaultValue={itemToEdit ? itemToEdit.device_status : ''}{...register('device_status')} />
            </div>
            
            <div className="div-inputs">
              <label >Servicio</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"service")} placeholder="buscar.." className={selectServiceActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"service")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.service_id ? "form-select error" : "form-select"} type="text" name="service" id="service"  defaultValue={itemToEdit && newServiceSelectedEdit == [] ? itemToEdit.service.id ? itemToEdit.service.id : "" : newServiceSelectedEdit.length > 0 ? newServiceSelectedEdit.id : null}{...register('service_id',{
                   onChange: (e) =>{
                    changeError("service")
                    addValues(e.target.value,"service")
                   } ,
                   })}>
                  {
                    (newServiceSelectedEdit.id)
                    ?
                     <option value={newServiceSelectedEdit.id}>{newServiceSelectedEdit.description}</option>
                    :
                    itemToEdit.service.service
                    ?
                    <option style={{visibility:"hidden", display:"none"}} value={itemToEdit.service.id}>{itemToEdit.service.service}</option>
                    :
                    <option >Seleccionar..</option>
                  }
                  {filteredServices().map((service)=>{                 
                      return <option className={itemToEdit && itemToEdit.service.id == service.id ? "option-selected" :"option-modal"}
                       key={service.id}
                       value={service.id}>{service.description}</option>   
                  })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("service")}>+</h1>
              </div>
                {errors.service_id? <p className="p-errores">Debe seleccionar un Servicio</p> : ""}
            </div>

            <div className="div-inputs">
              <label >Numero de Orden</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.service_order ? itemToEdit.service_order : '' : ''}{...register('service_order')} />
            </div>
            
            <div className="div-inputs">
              <label style={{color:"red", fontSize:"18px"}}>Costo del Servicio</label>
              <input className={errors.cost ? "form-control error cost" : "form-control cost"} type="text"   defaultValue={itemToEdit ? itemToEdit.cost ? itemToEdit.cost : 0 : 0}{...register('cost',{
                onChange: (event) => changeError("cost",event),
              })} />
              {errors.cost ? <p className="p-errores">Solo se permiten numeros</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label style={{color:"green", fontSize:"18px"}}>Precio a cobrar</label>
              <input className={errors.amount ? "form-control error value" : "form-control value"} type="text" defaultValue={itemToEdit ? itemToEdit.amount ? itemToEdit.amount : 0 : 0}{...register('amount',{
                onChange: (event) => changeError("amount",event)
              })} />
              {errors.amount ? <p className="p-errores">Solo se permiten numeros</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label >Fecha de recepcion</label>
              <input className="form-control" type="date"  defaultValue={itemToEdit && itemToEdit.reception_date  ? new Date(itemToEdit.reception_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.reception_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.reception_date).getUTCDate()).slice(-2)  : null}{...register('reception_date',{
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getUTCFullYear() + '-' +
                    ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            
            <div className="div-inputs">
              <label >Fecha de entrega</label>
              <input className="form-control" type="date"  defaultValue={itemToEdit && itemToEdit.delivery_date !=null ? new Date(itemToEdit.delivery_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.delivery_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.delivery_date).getUTCDate()).slice(-2)  : null}{...register('delivery_date',{
                onChange: (event) => changeDates("delivery_date",event),
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getUTCFullYear() + '-' +
                    ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            <div className="div-inputs">
              <label >Fecha de Inicio del Servicio</label>
              <input className="form-control" type="date"  defaultValue={itemToEdit.service_start_date ? new Date(itemToEdit.service_start_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.service_start_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.service_start_date).getUTCDate()).slice(-2)  : null}{...register('service_start_date',{
                onChange: (event) => changeDates("service_start_date",event),
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getUTCFullYear() + '-' +
                    ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            <div className="div-inputs">
              <label >Fecha de Servicio terminado</label>
              <input className="form-control" type="date"  defaultValue={(itemToEdit && itemToEdit.service_end_date != null)  ? new Date(itemToEdit.service_end_date).getFullYear() + "-" + ("00" + (new Date (itemToEdit.service_end_date).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(itemToEdit.service_end_date).getUTCDate()).slice(-2)  : null} {...register('service_end_date',{
                onChange: (event) => changeDates("service_end_date",event),
                setValueAs : value =>{
                  if(value != null && value){
                    let dateInput = new Date(value)
                    dateInput = dateInput.getUTCFullYear() + '-' +
                    ('00' + (dateInput.getUTCMonth()+1)).slice(-2) + '-' +
                    ('00' + dateInput.getUTCDate()).slice(-2) + ' ' + 
                    ('00' + dateInput.getUTCHours()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCMinutes()).slice(-2) + ':' + 
                    ('00' + dateInput.getUTCSeconds()).slice(-2);

                    return dateInput
                  }else{
                    return null
                  } 
                } 
              })} />
            </div>
            
            <div className="div-inputs">
              <label >Imei</label>
              <input className="form-control" type="text"   defaultValue={itemToEdit ? itemToEdit.imei : ''}{...register('imei')} />
            </div>      
            
            <div className="div-inputs security">
              {
                (itemToEdit.pattern || itemToEdit.pin)
                ?
                <>
                
                 <div className="div-security">
                    <div className="div-inputs pin">
                    <label>Pin:</label>
                    <input className="form-control pin" type="text"    defaultValue={itemToEdit.pin}{...register('pin')}></input>
                    </div>
                    
                    <div className="div-inputs pattern">
                    <label style={{marginBottom:"10px"}}>Orden de patron:</label>
                    <canvas
                          ref={patternRef}
                          id="pattern"
                          height="100px"
                          width="100px"
                          ></canvas>
                    <input style={{position:"absolute", visibility:"hidden"}} type="text"    defaultValue={itemToEdit.pattern}{...register('pattern')}></input>
                    </div>
                 </div>
               </>
                :
                <>
                  <div className="div-security">
                    <div className="div-inputs pin">
                    <label>Pin:</label>
                    <input className="form-control pin" type="text" {...register('pin')}></input>
                    </div>
                    
                    <div className="div-inputs pattern">
                    <label style={{marginBottom:"10px"}}>Orden de patron:</label>
                    <canvas
                          ref={patternRef}
                          id="pattern"
                          height="100px"
                          width="100px"
                          ></canvas>
                    <input style={{position:"absolute", visibility:"hidden"}} type="text" {...register('pattern')}></input>
                    </div>
                 </div>
                </>
              }     
            </div>            
               
            <div className="contenedor-boton-modal-dentro-reparations">
              <button className="btn btn-edit" type="submit" onClick={edit}>Editar</button>
              <h1 className="btn  btn-cancelar" onClick={closeForm}>Cancelar</h1> 
            </div>
          </form>
        </ModalBody> 
      </Modal> 
    )
}

export default ModalEditReparation