class Rectangle {
    constructor(leftTop, rightBottom) {
      this.leftTop = leftTop;
      this.rightBottom = rightBottom;
    }
  
    width() {
      return this.rightBottom.x - this.leftTop.x;
    }
  
    height() {
      return this.rightBottom.y - this.leftTop.y;
    }
  
    getLeftBottom() {
      return new Point(this.leftTop.x, this.rightBottom.y);
    }
  
    getRightTop() {
      return new Point(this.rightBottom.x, this.leftTop.y);
    }
  }