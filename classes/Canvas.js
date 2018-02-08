import Area from "./Area.js";

export default class Canvas {
  constructor(canvas, debug) {
    this.debug = debug;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.updateSize();
  }

  updateSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.unit = this.canvas.height / 5;
  }

  reset() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ball(ballFromBottom, isAccellarating) {
    let fromTop = (5 - ballFromBottom) * this.unit;
    this.circle(
      this.canvas.width / 2,
      fromTop,
      0.4 * this.unit,
      isAccellarating
    );
    if (this.debug) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, fromTop);
      this.ctx.lineTo(this.canvas.width, fromTop);
      this.ctx.strokeStyle = "#000000";
      this.ctx.stroke();
    }
  }

  circle(x, y, r, isAccellarating) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#FFFFFF";
    if (this.debug) {
      this.ctx.fillStyle = isAccellarating ? "#00ff00" : "#ff0000";
    }
    this.ctx.fill();
  }

  area(index, area, ball, isMouseDown) {
    const defaultOffset = (index - 3) * this.unit;
    const offset = defaultOffset + ball.yOffset * this.unit;

    this.ctx.fillStyle = (isMouseDown ? !area.isGreen() : area.isGreen())
      ? "#009900"
      : "#990000";
    this.ctx.lineWidth = 0;
    this.ctx.fillRect(0, offset, this.canvas.width, offset + 2 * this.unit);
    if (this.debug) this.text(index, offset + 100);
  }

  rect(startX, startY, endX, endY, color) {
    this.ctx.fillStyle = color;
    this.ctx.rect(startX, startY, endX, endY);
    this.ctx.fill();
  }

  text(text, offset) {
    this.ctx.font = (offset ? "30" : canvas.height / 5) + "px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#ffffff99";
    this.ctx.fillText(
      text,
      canvas.width / 2,
      offset ? offset : canvas.height / 5
    );
  }
}
