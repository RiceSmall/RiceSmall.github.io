import domUtils from './domUtils'
export
default {
  moveScroll: function moveScroll(oLi, direction) {

    if (direction == 'per') {
      oLi.style.webkitTransition = "1s";
      oLi.style.webkitTransform = 'translateX(0px)';
      return
    }
    let documentEle = document.documentElement || document.body,
    oUl = document.getElementById('oUl'),
    deviceWidth = domUtils.createElement.getCss(documentEle, 'width'),
    oBannerPdingLeft = domUtils.createElement.getCss(oUl, 'paddingLeft'),
    oLiWidth = domUtils.createElement.getCss(oLi, 'width'),
    moveDone = null,
    translateX = null,
    moveValue = oLiWidth + oBannerPdingLeft - deviceWidth;
    this.zdy = 1;
    oLi.style.webkitTransition = "1s"; //得到已经move的值
    translateX = oLi.style.webkitTransform || oLi.style.transform;
    if (translateX) {
      moveDone = /^translate[XYZ]\((\-|)(\d+|\d+\.\d+)px\)$/.exec(translateX)[2];
    }
    if (moveValue > 0) { //可以向右移动
      if (moveValue / deviceWidth >= 1) { //要移动一屏
        if (moveDone - 0 > 0 && (moveValue - moveDone) / deviceWidth >= 1) {
          ++this.zdy;
          oLi.style.webkitTransform = 'translateX(' + (-deviceWidth) * this.zdy + 'px)';
          oLi.style.transform = 'translateX(' + (-deviceWidth) * this.zdy + 'px)';

        } else if (moveDone && (moveValue - moveDone) / deviceWidth < 1) { // 移动不了一屏 
          if (parseFloat(moveDone) + 1 <= moveValue) {
            oLi.style.webkitTransform = 'translateX(' + (-deviceWidth - (moveValue - moveDone)) * this.zdy + 'px)';
            oLi.style.transform = 'translateX(' + (-deviceWidth) - (moveValue - moveDone) * this.zdy + 'px)';
          }
        } else { // 第一移动
          oLi.style.webkitTransform = 'translateX(' + (-deviceWidth) + 'px)';
          oLi.style.transform = 'translateX(' + (-deviceWidth) + 'px)';
        }
      } else { // 移动偏移量就是了
        oLi.style.webkitTransform = 'translateX(' + (-moveValue) + 'px)';
        oLi.style.transform = 'translateX(' + (-moveValue) + 'px)';
      }
    }

  }
}