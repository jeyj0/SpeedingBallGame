export default class Ball {
  constructor(maxVelocity) {
    this.velocity = maxVelocity / 2;
    this.maxVelocity = maxVelocity;
    this.minVelocity = 0;
    this.yOffset = 0;
  }

  accelerate(acceleration, time) {
    this.velocity += Math.min(acceleration * time, this.maxVelocity);
  }

  refresh(time) {
    this.yOffset += this.velocity * time;
  }
}
