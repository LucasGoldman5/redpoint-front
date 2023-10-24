import React, { useEffect, useState, useRef } from "react";
import "../modales.css";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'; 
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faXmark,faCircle } from '@fortawesome/free-solid-svg-icons';


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
      console.log(this.accumulatedIndex);
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


const ModalAddReparation = ({openModalAdd, actionModal, create, errors, changeError, handleInputChange, activeInputSearch, newCustomerSelected, newCellphoneSelected, newServiceSelected, filteredCellphones, filteredCustomers, filteredServices,dataStates, closeForm, changeModal, addEmail, selectCellphoneActive, selectCustomerActive, selectServiceActive, checkbox, checkBoxTrue, ifChangeModal}) =>{


  const [selectCustomer, setSelectCustomer] = useState({})
  const [selectCellphone, setSelectCellphone] = useState({})
  const [selectService, setSelectService] = useState({})
  const [changeSecurity, setChangeSecurity] = useState(false);
  const [endDateSelected, setEndDateSelected] = useState(null);
  const [startDateSelected, setStartDateSelected] = useState(null);
  const [deliveryDateSelected, setDeliveryDateSelected] = useState(null);
  const patternRef = useRef(null);
  const [pattern, setPattern] = useState(null);

  useEffect(() => {
    console.log(openModalAdd);
    setTimeout(()=>{
      if (patternRef.current) {
        console.log("hola");
        const patternInstance = new Pattern(patternRef.current, setPattern);
        setPattern(patternInstance);
  
        // Puedes setear la secuencia aquí, si es necesario
        // patternInstance.setSequence("8,4,9,1,6,5,2,3,7");
      }
    },2000)
  }, [openModalAdd]);

  const actualityDate = new Date()

  useEffect(()=>{
    setSelectCustomer({})
    setSelectCellphone({})
    setSelectService({})
    setEndDateSelected(null)
    setStartDateSelected(null)
    setDeliveryDateSelected(null)
  },[actionModal])

  useEffect(() => {
    if (typeof pattern === 'string') {
      setValue('pattern', pattern);
    }
  }, [pattern,changeModal]);

    const changueValue = (values) =>{

        if(newCustomerSelected.id){
            setValue("customer_id",newCustomerSelected.id)
            setValue("number",newCustomerSelected.phone_number)
            setValue("email",newCustomerSelected.email)
            addEmail("customer")
        }else if(selectCustomer.id && ifChangeModal === true){
            setValue("customer_id",selectCustomer.id)
            setValue("number",selectCustomer.phone)
            setValue("email",selectCustomer.email)
        }else{
          setValue(("customer_id","Seleccionar"))
        }

        if(newCellphoneSelected.id){
            setValue("cellphone_id",newCellphoneSelected.id)
            changeError("cellphone")
        }else if(selectCellphone.id && ifChangeModal === false){
          setValue("cellphone_id",selectCellphone.id)
        }else{
            setValue("cellphone_id","Seleccionar..")
        }

        if(newServiceSelected.id){
            setValue("service_id",newServiceSelected.id)
            changeError("service")
        }else if(selectService.id && ifChangeModal === false){
          setValue("service_id",selectService.id)
        }else{
            setValue("service_id","Seleccionar..")
        }

        if(values.pin === null && values.patterns === null){
          setChangeSecurity(true);
        }

        if(values.reception_date){
          setValue("reception_date",actualityDate.getFullYear() + '-' + ('00' + (actualityDate.getMonth()+1)).slice(-2) + '-' + ('00' +  actualityDate.getUTCDate()).slice(-2))
        }

        if(endDateSelected){
          setValue("service_end_date",new Date(endDateSelected).getFullYear() + "-" + ("00" + (new Date (endDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(endDateSelected).getUTCDate()).slice(-2) )
        }
        if(startDateSelected){
          setValue("service_start_date",new Date(startDateSelected).getFullYear() + "-" + ("00" + (new Date (startDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(startDateSelected).getUTCDate()).slice(-2) )
        }
        if(deliveryDateSelected){
          setValue("delivery_date",new Date(deliveryDateSelected).getFullYear() + "-" + ("00" + (new Date (deliveryDateSelected).getMonth()+1)).slice(-2) + "-" + ("00" + new Date(deliveryDateSelected).getUTCDate()).slice(-2) )
        }
    }

    const addValues = (id,entity) =>{

        if(entity == "customer"){
          filteredCustomers().map((customer) =>{
            if(customer.id == id){
               setValue("email", customer.email);
               setValue("number", customer.phone);
               setSelectCustomer(customer);
            };
          });
        }
        if(entity == "cellphone"){
          filteredCellphones().map((cellphone) =>{
            if(cellphone.id == id){
               setSelectCellphone(cellphone);
            };
          });
        }
        if(entity == "service"){
          filteredServices().map((service) =>{
            if(service.id == id){
               setSelectService(service);
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

    const securityChange = (e) =>{
      const value = e.target.value;
      console.log(value);
      if(value.length > 1){
        setChangeSecurity(true);
      }else{
        setChangeSecurity(false);
      }
    }


    const filteredStates = () => {
      return dataStates.filter(item => item.description === 'Recibido' || item.description === 'A presupuestar')
      };


    const { register, handleSubmit, getValues, setValue} = useForm ();
   
    return(
        <Modal isOpen={openModalAdd} className="modal-reparations" onOpened={()=>changueValue(getValues())}>
        <ModalHeader style={{display: 'block'}}>
          <div className="div-title-modal">
            <h5  className="h5-modal-add" >Crear Reparacion</h5>
            <FontAwesomeIcon className="icon-close-modal" onClick={()=>closeForm(openModalAdd)} icon={faXmark} /> 
          </div>
        </ModalHeader>
        <ModalBody className="contenedor-modal-body">
          <form className="form-group reparations" onSubmit={handleSubmit(create)}>
            <div className="div-inputs">
              <label >Cliente</label>
              <div className="div-container-select-button">
                <input  type="search" onChange={(e)=>handleInputChange(e,"customer")} placeholder="buscar.." className={selectCustomerActive ? "input-search" : "input-search-none"}></input>
                <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"customer")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.customer_id ? "form-select error" : "form-select"} name="select" defaultValue={newCustomerSelected.id ? newCustomerSelected.id : ""} {...register('customer_id',{
                  shouldUnregister: ifChangeModal ? false : true,
                  onChange: (e) => {
                    addEmail("customer");
                    addValues(e.target.value, "customer")
                  },
                      })}>
                      {
                        (newCustomerSelected.id)
                        ?
                         <option className="option-selected" value={newCustomerSelected.id}>{newCustomerSelected.name}</option>
                        :
                        <option className="option-selected">Seleccionar..</option>
                      }
                      {filteredCustomers().map((customer)=>{
                          return <option className="option-modal" key={customer.id} value={customer.id} >{customer.name}</option>                              
                      })}
                  </select>
                <h1 className="h1-add" onClick={()=>changeModal("customer")}>+</h1>
              </div> 
              {errors.customer_id ? <p className="p-errores">Debe seleccionar un Cliente</p> : ""}
            </div>
            <div className="div-inputs">
              <label >Numero de contacto</label>
              <input className="form-control" type="text" name="contact-number" {...register('number',{
                shouldUnregister: ifChangeModal ? false : true,
                value:null,
                })} />
            </div>
            <div className="div-inputs">
              <label >Email</label>
              <input className="form-control" type="text" defaultValue={""}{...register('email',{
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Celular</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"cellphone")} placeholder="buscar.." className={selectCellphoneActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"cellphone")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.cellphone_id ? "form-select error" : "form-select"} name="select"  defaultValue={newCellphoneSelected.id ? newCellphoneSelected.id : ""} {...register('cellphone_id',{
                  onChange: (e) => {
                    changeError("cellphone")
                    addValues(e.target.value, "cellphone")
                  },
                  shouldUnregister: ifChangeModal ? false : true,
                    })}>
                      {
                      newCellphoneSelected.id
                      ?
                      <option className="option-selected" value={newCellphoneSelected.id}>{newCellphoneSelected.model}</option>
                      :
                      <option className="option-selected">Seleccionar..</option>
                      }
                    {filteredCellphones().map((cellphone)=>{
                        return <option className="option-modal" key={cellphone.id} value={cellphone.id} >{cellphone.brand_id ? cellphone.brand_id.brand + "-" : ""}{cellphone.model}</option>
                    })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("cellphone")}>+</h1>
              </div>
              {errors.cellphone_id ? <p className="p-errores">Debe seleccionar un celular</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label >Falla</label>
              <textarea className="form-control"  name="phone_2" {...register('failure',{
                shouldUnregister: ifChangeModal ? false : true,
                value:null,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Observacion</label>
              <textarea className="form-control" type="text" name="phone_2" {...register('observation',{
                shouldUnregister: ifChangeModal ? false : true,
                value:null,
                })} />
            </div>
            
            <div className="div-inputs">
              <label >Estado de la reparacion</label>
              <select className="form-select" type="text" name="phone_2" {...register('state_id',{ 
                onChange: (Event) => addValues(Event)
              })}>
                <option value={filteredStates().length >= 1 ? filteredStates()[0].id : 1}>Seleccionar</option>
                {
                  filteredStates().map((state) => {
                    return <option className="option-modal" key={state.id} value={state.id}>{state.description}</option>
                  })
                }
              </select>
            </div>
            
            <div className="div-inputs">
              <label >Servicio</label>
              <div className="div-container-select-button">
              <input type="search" onChange={(e)=>handleInputChange(e,"service")} placeholder="buscar.." className={selectServiceActive ? "input-search" : "input-search-none"}></input>
              <FontAwesomeIcon onClick={()=>activeInputSearch(getValues(),"service")} className="icon-search" icon={faMagnifyingGlass} />
                <select  className={errors.service_id ? "form-select error" : "form-select"} name="select"  defaultValue={newServiceSelected.id ? newServiceSelected.id : ""} {...register('service_id',{
                  onChange: (e) => {
                    changeError("service")
                    addValues(e.target.value, "service")
                  },
                  shouldUnregister: ifChangeModal ? false : true,
                    })}>
                      {
                      newServiceSelected.id
                      ?
                      <option className="option-selected" value={newServiceSelected.id}>{newServiceSelected.description}</option>
                      :
                      <option className="option-selected">Seleccionar..</option>
                      }
                    {filteredServices().map((service)=>{
                        return <option className="option-modal" key={service.id} value={service.id} >{service.description}</option>
                    })}
                </select>
                <h1 className="h1-add" onClick={()=>changeModal("service")}>+</h1>
              </div>
              {errors.service_id ? <p className="p-errores">Debe seleccionar un Servicio</p> : ""}
            </div>

            <div className="div-inputs">
              <label >Numero de Orden</label>
              <input className="form-control" type="text" name="phone_2" {...register('service_order',{
                value:null,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs">
              <label style={{color:"red", fontSize:"18px"}}>Costo del Servicio</label>
              <input className={errors.cost ? "form-control error cost" : "form-control cost"} type="text" name="phone_2" defaultValue={0} {...register('cost',{
                onChange: (event) => changeError("cost",event),
                shouldUnregister: ifChangeModal ? false : true,
                })} />
                {errors.cost ? <p className="p-errores">Solo se permiten numeros</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label  style={{color:"green", fontSize:"18px"}}>Precio a cobrar</label>
              <input className={errors.amount ? "form-control error value" : "form-control value"} type="text" name="phone_2" defaultValue={0} {...register('amount',{
                onChange: (event) => changeError("amount",event),
                shouldUnregister: ifChangeModal ? false : true,
                })} />
                {errors.amount ? <p className="p-errores">Solo se permiten numeros</p> : ""}
            </div>
            
            <div className="div-inputs">
              <label >Fecha de Recepcion</label>
              <input className="form-control" type="date" name="phone_2" defaultValue={actualityDate.getUTCFullYear() + '-' + ('00' + (actualityDate.getUTCMonth()+1)).slice(-2) + '-' + ('00' +  actualityDate.getUTCDate()).slice(-2)} {...register('reception_date',{
                shouldUnregister: ifChangeModal ? false : true,
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
              <input className="form-control" type="date"  {...register('delivery_date',{
                onChange: (event) => changeDates("delivery_date",event),
                shouldUnregister: ifChangeModal ? false : true,
                setValueAs : v =>{
                  if(v != null && v){
                    let dateInput = new Date(v)
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
              <label >Fecha de inicio del servicio</label>
              <input className="form-control" type="date"  {...register('service_start_date',{
                onChange: (event) => changeDates("service_start_date",event),
                shouldUnregister: ifChangeModal ? false : true,
                setValueAs : v =>{
                  if(v != null && v){
                    let dateInput = new Date(v)
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
              <label >Fecha de servicio terminado</label>
              <input className="form-control" type="date"  {...register('service_end_date',{
                onChange: (event) => changeDates("service_end_date",event),
                shouldUnregister: ifChangeModal ? false : true,
                setValueAs : v =>{
                  if(v != null && v){
                    let dateInput = new Date(v)
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
              <input className="form-control" type="text" name="phone_2" {...register('imei',{
                value:null,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
            </div>
            
            <div className="div-inputs security">
              <label >Tiene seguridad</label>
              <input onClick={checkBoxTrue}  type="checkbox" name="phone_2" defaultChecked={checkbox} {...register('has_security',{
                value:0,
                shouldUnregister: ifChangeModal ? false : true,
                })} />
                {
                  (checkbox)
                  ?
                  <div className="div-security">
                    <div className="div-inputs pattern">
                      <div className="information-pattern">
                        <p className="pattern">Patron</p>
                        <canvas
                          ref={patternRef}
                          id="pattern"
                          height="100px"
                          width="100px"
                        ></canvas>
                      </div>
                      <input style={{position:"absolute", visibility:"hidden"}} type="text"  defaultValue={typeof pattern === 'string' ? pattern : ""} {...register('pattern',{
                        onChange: (event) => securityChange(event),
                        shouldUnregister: ifChangeModal ? false : true,
                        })} />
                    </div>
                    <div className="div-inputs pin">
                      <label>Pin</label>
                      <input className="form-control pin" type="text"   required={changeSecurity == false && !pattern}{...register('pin',{
                        onChange: (event) => securityChange(event),
                        shouldUnregister: ifChangeModal ? false : true,
                        })} />
                      </div> 
                  </div>
                  :
                  ""
                }
            </div>                                    
            
            <div className="contenedor-boton-modal-dentro-reparations">
              <button type="submit" className="btn btn-success"  >Crear</button>
              <h1 className="btn btn-cancelar" onClick={()=>closeForm(openModalAdd)}>Cancelar</h1>
            </div>
          </form>
        </ModalBody>
      </Modal>  
    )
}

export default ModalAddReparation