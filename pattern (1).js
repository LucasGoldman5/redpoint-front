document.addEventListener("DOMContentLoaded", () => {
    const pattern = new Pattern(document.getElementById("pattern"));
    pattern.setSequence("8,4,9,1,6,5,2,3,7");
});

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

    constructor(canvas, horizontalCount = 3, verticalCount = 3, radio = 60, font = "60px Arial") {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.metrics = { height: canvas.height, width: canvas.width };
        this.radio = radio;
        this.font = font;
        this.horizontalCount = horizontalCount;
        this.verticalCount = verticalCount;

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
    getPointData(index) {
        const margin = this.radio
        const width = (this.metrics.width - (margin * 2)) / (this.horizontalCount - 1);
        const height = (this.metrics.height - (margin * 2)) / (this.verticalCount - 1);
        const horizontalIndex = index % this.horizontalCount;
        const verticalIndex = Math.floor(index / this.horizontalCount);
        const x = margin + (horizontalIndex * width);
        const y = this.metrics.height - margin - (verticalIndex * height);

        return { x, y, radio: this.radio, index };
    }
    registerEvents() {
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDownEvent(e));
        this.canvas.addEventListener("mouseup", (e) => this.onMouseUpEvent(e));
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMoveEvent(e));
    }
    onMouseUpEvent(event) {
        this.mousePressed = false;
        this.draw();
    }
    onMouseDownEvent(event) {
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
    font = "20px Arial";
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
        this.context.fillStyle = "blue";
        this.context.fill(this.circle);
    }
    drawFilled() {
        this.context.fillStyle = "red";
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
        this.context.strokeStyle = "green";

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