export
default {
  /**
   * [regUrl 的到url后面参数]
   * @param  {[String]} searchStr [url参数]
   * @return {[Object]}           [返回的]
   */
  regUrl: function regUrl(searchStr) {
    let reg = /([^=?&]+)=([^=?&]+)/g;
    let obj = {};
    let arr = reg.exec(searchStr);
    while (arr) {
      obj[arr[1]] = arr[2];
      arr = reg.exec(searchStr);
    }
    return obj;
  },
  /**
   * [getCss 去掉后缀]
   * @param  {[Element]} ele  [element元素]
   * @param  {[str]} attr [元素的属性]
   * @return {[number]}      [返回一个去掉后缀的属性值]
   */
  getCss: function(ele, attr) {
    return parseFloat(ele.css(attr));
  },
  createElement: {
    getCss: function(ele, attr) {
      try {
        //可以取得伪类的样式值
        return parseFloat(getComputedStyle(ele)[attr]);
      } catch (e) {
        //不可以得到伪类样式
        return parseFloat(ele.currentStyle[attr]);
      }
    }
  },
  /*
  得到哥哥元素节点
  */
  prev: function prev(ele) {
    if (ele.previousElementSibling) {
      return ele.previousElementSibling;
    } else {
      for (let p = ele.previousSibling; p && p.nodeType !== 1; p = p.previousSibling);
    }
    return p;
  },
  /*得到弟弟元素节点*/
  next: function next(ele) {
    if (ele.nextElementSibling) {
      return ele.nextElementSibling
    } else {
      for (let p = ele.nextSibling; p && p !== 1; p = p.nextSibling);
      return p;
    }
  },
  /*添加class*/
  addClassName: function addClassName(ele, str) {
    //定义一个正则 正则判断
    if (typeof str != "string") throw new Error("str参数有问题")
    if (typeof ele == "object" ? (ele instanceof Element ? 0 : 1) : 1) throw new Error("ele参数出错")
    let reg = new RegExp("(^| )" + str + "( |$)");
      if (!reg.test(ele.className)){
       if(ele['className'].substr(-1)!=" "){
          //添加
          ele['className'] += " " + str;
        }else{
          ele['className'] += str;
        }
      }
  },
  /*移除css*/
  removeClassName: function removeClassName(ele, str) {
    if (typeof str != "string") throw new Error("str参数有问题")
    if (typeof ele == "object" ? (ele instanceof Element ? 0 : 1) : 1) throw new Error("ele参数出错")
    //定义一个正则 正则判断
    let reg = new RegExp("(^| )" + str + "( |$)", "g");
    if (reg.test(ele.className)) {
      ele.className = ele.className.replace(/ /g, " "); //掺水计划
      ele.className = ele.className.replace(reg, "");
    }
  },
  
  myToggleClass: function(ele, str) {
    let reg = RegExp('' + str + '');
    try{
        if (reg.test(ele.className)) {
          // true要移除
          ele.className = ele.className.replace(/ /g, " ");
          ele.className = ele.className.replace(reg, "");
        } else {
          if(ele['className'].substr(-1)!=" "){
            //添加
            ele['className'] += " " + str;
          }else{
            ele['className'] += str;
          }
        }
    }catch(e){
      console.error('错误原因是这个ele'+ele)
      return null

    }


  },
  parentEle: function(ele, parentNodeName) {

    let curParent = ele.parentNode;
    while (curParent && curParent.nodeName.toUpperCase() != parentNodeName.toUpperCase()) {
      curParent = curParent.parentNode;
    }
    return curParent;

  },
  children: function(ele, label) {

    let childrenFilter = '', eles = ele.children;
    if (typeof label == "string") {
      for (var i = 0, l = eles.length; i < l; i++) {
        childrenFilter = eles[i];
        if (childrenFilter.nodeType === 1 && childrenFilter.nodeName.toLocaleLowerCase() === label.toLocaleLowerCase()) {
          return childrenFilter
        }
      }
    }
  },
  previousEleSibling: function previousEleSibling(ele) {
        let ary = [];
        if (ele.previousElementSibling) {
            for (let p = ele.previousElementSibling; p; p = p.previousElementSibling) {
                ary.push(p);
            }
        } else {
            for (let p = ele.previousSibling; p; p = p.previousSibling) {
                if (p.nodeType === 1)  ary.push(p);
            }
        }
        return ary;
    },
  nextEleSibling: function nextEleSibling(ele) {
        
        let ary = [];
        if (ele.nextElementSibling) {
            for (let p = ele.nextElementSibling; p; p = p.nextElementSibling) {
                ary.push(p);
            }
        } else {
            for (let p = ele.nextSibling; p; p = p.nextSibling) {
                if (p.nodeType === 1)  ary.push(p);
            }
        }
        return ary;
    },
  siblings:function (ele) {
        return this.previousEleSibling(ele).concat(this.nextEleSibling(ele));

    },
  strToClass:function(styles,str){
  	
  	let classArr=[],className='';
  		classArr=str.replace(/^ +| +$/g,'').split(/ +/g);
			className=classArr.length>1?styles[classArr[0]]+' '+styles[classArr[1]]:styles[classArr[0]];
			classArr=[];
			return className;
  }



}