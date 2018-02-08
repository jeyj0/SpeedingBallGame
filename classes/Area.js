export default class Area {
  constructor(isGreen) {
    if (isGreen !== undefined) {
      this.value = isGreen;
    } else {
      this.value = Math.random() >= 0.5;
    }
  }

  isGreen() {
    return this.value;
  }
}
