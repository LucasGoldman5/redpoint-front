import React from "react";
import './printReparation.css'
import NotAuthorized from "./pageNotAuthorized";
import { useEffect,useState,useRef } from "react";

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

const PrintRearation =  () =>{

  let reparation = null;

  const getReparation = () =>{
    if(localStorage.reparation){
      return localStorage.getItem("reparation");
    }else{
      return (
        <NotAuthorized></NotAuthorized>
      )
    }
  } 
  reparation = JSON.parse(getReparation());

  const patternRef = useRef(null);
  const [pattern, setPattern] = useState(null);

 
  useEffect(() => {
    setTimeout(() => {
      if (patternRef.current) {
        
        const patternInstance = new Pattern(patternRef.current, setPattern);
        setPattern(patternInstance);
  
        // Puedes setear la secuencia aquí, si es necesario
         patternInstance.setSequence(reparation.pattern ? reparation.pattern.toString().split('').join(',') : "");
      }
    },2000)
  }, [reparation]);

  
  if(reparation){

     const date = reparation.reception_date     ;
     const newDate = new Date()
     const formatDate = () =>{
      if(date){
        return new Date(date).getDate()+"/"+(new Date(date).getMonth()+1)+"/"+new Date(date).getFullYear()
      }else{
        return new Date(newDate).getDate()+"/"+(new Date(newDate).getMonth()+1)+"/"+new Date(newDate).getFullYear()
      }
     }

    

    return(
      <>
        <div className="general-container-print">
          <div className="repair-data-container">
            <div className="header-container-print">
              <div className="title-and-adress">
                <h5  style={{ margin: '0px', fontSize: '14px'}}>Red Point</h5>
                <p style={{ fontSize: '12px'}}>Julio A. Roca 269 - Villa General Belgrano | <b>3546406188</b></p>
              </div>
              <div className="information-div">
                <p>Fecha</p>
                <b>{formatDate()}</b>
              </div>
                <h2 style={{fontSize: '20px' }}>Cliente</h2>             
            </div>
            <div >
              <div className="sub-container">
                <div className="information-div">
                  <p>Cliente</p>
                  <b>{reparation.customer ? reparation.customer.customer : ""}</b>
                </div>
                <div className="information-div">
                  <p>Equipo</p>
                  <b>{reparation.cellphone ? reparation.cellphone.brand : ""} - {reparation.cellphone ? reparation.cellphone.model : ""}</b>
                </div>
                <div className="information-div">
                  <p>Orden</p>
                  <b>{reparation.id ? reparation.id : "..."}</b>
                </div>
              </div>
              <br/>
              <div className="sub-container">
                <div className="information-div">
                  <p>IMEI</p>
                  <b>{reparation.imei ? reparation.imei : "---"}</b>
                </div>
                <div className="information-div">
                  <p>Codigo de Seguridad</p>
                  <b>{reparation.pin ? reparation.pin : "---"}</b>
                </div>
                <div className="information-div">
                  <h5 style={{ fontSize: '14px' }}>{"[Chip]"}</h5>
                </div>
                <div className="information-div">
                  <h5 style={{ fontSize: '14px' }}>{"[Memoria]"}</h5>
                </div>
              </div>
              <br/>
              <div className="sub-container-failure">
                <div className="information-div">
                  <p>Falla</p>
                  <b>{reparation.failure ? reparation.failure : ""}</b>
                </div>
              </div>
              <br/>
            </div>
            <div style={{width: '100%'}}>
                <h5 style={{color:"red", fontSize: '14px'}}>CONDICIONES GENERALES</h5>
                <p style={{margin:"0", fontSize:"10px", lineHeight: '1'}}>Para retirar el equipo deberá presentar esta ORDEN ORIGINAL o en su defecto presentando el DNI del titular del equipo. Transcurrido los 15 días de corrido de la reparación iniciada, el precio de la reparación será actualizado según la lista de los precios vigentes. Los presupuestos enviados por los distintos medios de comunicación sólo tienen validez por 2 días hábiles, luego de eso podrán ser actualizados sin previo aviso. Si el equipo no fuese retirado dentro del plazo de los 90 días de la fecha de la presente será considerado abandonado en los términos del artículo 1947 del Nuevo Código Civil y Comercial, quedando facultades a darle destino que considere pertinente. Durante la reparación puede ser necesario el cambio o modificación del software del equipo del cliente. Todas las reparaciones cuentan con garantía. Sujeta al estado físico del repuesto o equipo, quedando anulada ante la presencia de golpes, rayas, roturas, humedad, daños por presión o temperatura y manipulación de terceros. Dado que a raíz de un problema los equipos suelen presentar múltiples fallas, el Servicio Técnico solo se responsabilizará por la/s fallas descrita/s en esta Orden de Servicio. Nunca surgen fallas a partir de la reparación de un equipo, por lo tanto, el Servicio Técnico solo se responsabiliza en caso de no haber corregido la falla descrita por el cliente. El cliente nos autoriza a realizar los traslados necesarios dentro de nuestras instalaciones, dígase, local comercial y servicio técnico. En caso de no querer realizar la reparación (rechazar el presupuesto), debe saber que para retirar el equipo puede contar con demora en el armado o traslado de su equipo, hasta la sucursal de atención al público, debiendo esto ser notificado con tiempo suficiente y dentro de los días de lunes a viernes en los horarios del servicio técnico de 9 a 13hs.</p>
              </div>
          </div>
        </div>
        <hr></hr>
        <div className="general-container-print">
          <div className="repair-data-container">
            <div className="sub-container-registro">
                <div className="title-and-adress">
                  <h5  style={{ margin: '0px', fontSize: '14px'}}>Red Point</h5>
                  <p style={{ fontSize: '12px'}}>Julio A. Roca 269 - Villa General Belgrano | <b>3546406188</b></p>
                </div>
                <div className="information-div">
                  <p>Fecha</p>
                  <b>{formatDate()}</b>
                </div>
                <div className="information-div">
                  <h2 style={{fontSize: '20px' }}>Cliente</h2>
                </div>  

                <div className="information-div">
                  <p>Registro</p>
                  <b>{reparation.customer ? reparation.customer.customer : ""}</b>
                </div>
                <div className="information-div">
                  <p>Equipo</p>
                  <b>{reparation.cellphone ? reparation.cellphone.brand : ""} - {reparation.cellphone ? reparation.cellphone.model : ""}</b>
                </div>
                <div className="information-div">
                  <p>Orden</p>
                  <b>{reparation.id ? reparation.id : "..."}</b>
                </div>
              
                <div className="information-div">
                  <p>IMEI</p>
                  <b>{reparation.imei ? reparation.imei : "---"}</b>
                </div>
                <div className="information-div">
                  <p>Codigo de Seguridad</p>
                  <b>{reparation.pin ? reparation.pin : "---"}</b>
                </div>
                <div className="information-div pattern">
                  <p>Patron</p>
                  <canvas
                    ref={patternRef}
                    id="pattern"
                    height="100px"
                    width="100px"
                  ></canvas>
                </div>
                
                <div className="sub-container-failure">
                  <div className="information-div">
                    <p>Falla</p>
                    <b>{reparation.failure ? reparation.failure : ""}</b>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </>
    )
  }
};

export default PrintRearation;