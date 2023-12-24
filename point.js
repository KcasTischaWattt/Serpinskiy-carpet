class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y);
      this.color = color;
    }
  }