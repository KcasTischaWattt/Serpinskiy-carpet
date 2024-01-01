function serpinskyRecursive() {
    restart();
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4D4D4D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    function deleteCentralRect(inRect) {
      const centralLeftTop = new Point(
        inRect.leftTop.x + inRect.width() / 3,
        inRect.leftTop.y + inRect.height() / 3
      );
      const centralRightBottom = new Point(
        inRect.leftTop.x + inRect.width() * 2 / 3,
        inRect.leftTop.y + inRect.height() * 2 / 3
      );
      const centralRect = new Rectangle(centralLeftTop, centralRightBottom);
      ctx.clearRect(
        centralRect.leftTop.x * canvas.width,
        centralRect.leftTop.y * canvas.height,
        centralRect.width() * canvas.width,
        centralRect.height() * canvas.height
      );
  
      if (centralRect.width() * canvas.width > 4) {
        var rects = new Array();
        rects[0] = new Rectangle(inRect.leftTop, centralRect.leftTop);
        rects[1] = new Rectangle(rects[0].getRightTop(), centralRect.getRightTop());
        rects[2] = new Rectangle(centralRect.rightBottom, inRect.rightBottom);
        rects[3] = new Rectangle(centralRect.getRightTop(), rects[2].getRightTop());
        rects[4] = new Rectangle(rects[1].getRightTop(), rects[3].getRightTop());
        rects[5] = new Rectangle(centralRect.getLeftBottom(), rects[2].getLeftBottom());
        rects[6] = new Rectangle(rects[0].getLeftBottom(), centralRect.getLeftBottom());
        rects[7] = new Rectangle(rects[6].getLeftBottom(), rects[5].getLeftBottom());
  
        for (let i = 0; i < 8; i++) {
          deleteCentralRect(rects[i]);
        }
      }
    }
  
    deleteCentralRect(new Rectangle(new Point(0, 0), new Point(1, 1)));
  }