  //浏览器检测
  (function(){
      window.sys=[];
      var ua = navigator.userAgent.toLowerCase();  //获取userAgent字符串并转化为小写。
      var s=[];     //存储浏览器特性字符串数组

      if((/msie\s[\d+\.]+/).test(ua)){     //判断IE
          s=ua.match(/msie\s[\d+\.]+/);
          var version = s[0].match(/\d+\.\d+[\.\d]*/);

          sys.ie=version[0];
      }

      if((/firefox\/[\d\.]+/).test(ua)){   //判断firefox

          s=ua.match(/firefox\/[\d+\.]+/);
          var version = s[0].match(/\d+\.\d+[\.\d]*/);

          sys.firefox=version[0];
      }

      if((/chrome\/[\d+\.]+/).test(ua)){   //判断chrome

          s=ua.match(/chrome\/[\d+\.]+/);
          var version = s[0].match(/\d+\.\d+[\.\d]*/);

          sys.chrome=version[0];
      }

      if((/version\/[\d+.\d+]+.*safari/).test(ua)){   //判断safari

          s=ua.match(/version\/[\d+.\d+]+.*safari/);
          var version = s[0].match(/\d+\.\d+[\.\d]*/);

          sys.safari=version[0];
      }

      if((/webkit\/[\d+\.]+/).test(ua)){   //获取webkit版本。

          s=ua.match(/webkit\/[\d+\.]+/);
          var version = s[0].match(/\d+\.\d+[\.\d]*/);

          sys.webkit=version[0];
      }

  })();

  //DOM加载完毕就执行事件
  function DOMLoaded(fn){
      var flag = true;
      var timer=null;

      function doReady(){

          if(flag){
              fn();
              flag=false;
              clearInterval(timer);
          }

      }

      if((sys.firefox && sys.firefox<3)||(sys.webkit && sys.webkit<525)){
          timer=setInterval(function(){
              if(document && document.getElementById && document.getElementsByTagName && document.body){
                  doReady()
              }
          },1)
      }else if(document.addEventListener){  //W3C
          addEvent(document,'DOMContentLoaded',function(){   //DOM就绪 firefox、chrome支持
             fn();
              removeEvent(document,'DOMContentLoaded',arguments.callee);
          });


      }else if((sys.ie && sys.ie <9)){
//          alert(sys.ie);
          timer =setInterval(function(){
              try{
                  document.documentElement.doScroll('left');
                  doReady();
              }catch (e){
                  //
              }

          },1);
      }
  }

  //跨浏览器获取浏览器窗口大小

  function getInner(){
      if(typeof window.innerHeight!='undefined'){
          return{
              width:window.innerWidth,
              height:window.innerHeight
          }
      }else{
          return{
              width:document.documentElement.clientWidth,
              height:document.documentElement.clientHeight
          }
      }
  }


  //跨浏览器获取Style

  function getStyle(elements,attr){
      var value;
      if(typeof window.getComputedStyle!='undefined'){  //W3c
          value=window.getComputedStyle(elements,null)[attr];
      }else if(typeof elements.currentStyle!='undefined'){ //IE
          value=elements.currentStyle[attr];
      }
      return value;
  }

  //判断元素是否存在某一个class属性

  function hasClass(elements,className){
      return elements.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))
  }

  //获取Eventd对象

  function getEvent(e){
      return e || window.event;
  }

  //获取target对象
  function getTarget(e){
      var event= getEvent(e);
      if(event.target){
          return event.target;
      }else{
          return event.srcElement;
      }
  }

  //阻止默认行为
  function preDft(e){
      var evt = getEvent(e);
      if(typeof evt.preventDefault !='undefined'){
          evt.preventDefault()
      }else{
          evt.returnValue=false;
      }

  }

  function preBuble(event){
      var e = getEvent(event);
      if(typeof e.stopPropagation !='undefined'){
          e.stopPropagation()
      }else{
          e.cancelBubble=true;
      }
  }

  //跨浏览器事件绑定
//  function addEvent(obj,type,fn){
//      if(typeof obj.addEventListener !='undefined'){
//          obj.addEventListener(type,fn,false);
//      }else if(typeof obj.attachEvent !='undefined'){
//          obj.attachEvent('on'+type,function(){
//              fn.call(obj,window.event);
//          });
//      }else{
//          obj['on'+type]=fn;
//      }
//  }



//  function addEvent(obj,type,fn){
//      if(typeof obj.addEventListener !='undefined'){
//          obj.addEventListener(type,fn,false);
//      }else {
//          //创建一个存放事件的哈希表(散列表)
//          if(!obj.events) obj.events={};
//          //第一次运行时
//          if(!obj.events[type]){
//              //创建一个存放事件处理函数的数组
//              obj.events[type]=[];
//              if (obj['on' + type]) obj.events[type][0] = fn;
//          }
//          obj.events[type][addEvent.ID++]=fn;
//
//          obj['on'+type]=function(){
//              for(var i in obj.events[type]){
//                  obj.events[type][i]();
//              }
//          }
//      }
//  }

  //给每个事件分配计数器
  addEvent.ID=1;

  //跨浏览器事件绑定
  function addEvent(obj,type,fn){
      if(typeof obj.addEventListener !='undefined'){
//      if(obj.addEventListener){
          obj.addEventListener(type,fn,false);
      }else {
          if(!obj.events)  obj.events={}; //创建一个存放事件的哈希表(散列表)

          if(!obj.events[type]) { //第一次运行时
              obj.events[type]=[]; //创建一个存放事件处理函数的数组
              if(obj['on'+type]) { ////把第一次的事件处理函数先储存到第一个位置上
                  obj.events[type][0]=fn;
              }
              else{ //同一个注册函数进行屏蔽，不添加到计数器中
                  if(addEvent.equal(obj.events[type],fn)) return false;
              }
          }
             // 从第二次开始用事件计数器来存储
              obj.events[type][addEvent.ID++]=fn;
              //执行事件处理函数
              obj['on'+type]=addEvent.execute


      }
  }
  //执行事件处理函数
  addEvent.execute=function(event){
      var e = event || window.event;
      var es= this.events[e.type];
      for(var i in es){
          es[i].call(this,e);
      }
  };

  //IE多次注册同一个事件函数屏蔽
  addEvent.equal=function(type,fn){
      for(var i in type){
          if(type[i]==fn) return true;
      }
      return false;
  };


//  function removeEvent(obj,type,fn){
//      if(typeof obj.removeEventListener !='undefined'){
//          obj.removeEventListener(type,fn,false);
//      }else if(typeof obj.detachEvent !='undefined'){
//          obj.detachEvent('on'+type,fn);
//      }else{
//          obj['on'+type]=null;
//      }
//  }

  //跨浏览器删除事件
  function removeEvent(obj,type,fn){
      if(typeof obj.removeEventListener !='undefined'){
          obj.removeEventListener(type,fn,false);
      }else{
          for(var i in  obj.events[type]){
              if(obj.events[type][i] == fn){
                  delete obj.events[type][i];
              }
          }
      }

  }

  function trim(str){
      return str.replace(/(^\s*)|(\s*$)/g,'')
  }


  //跨浏览器获取滚动条位置
  function getScroll() {
      return {
          top : document.documentElement.scrollTop || document.body.scrollTop,
          left : document.documentElement.scrollLeft || document.body.scrollLeft
      }
  }

  //去除chrom、firefoxj节点的空子节点
  function clearLinefeed(nodeList){
      if(sys.ie==undefined){
          var newNodeList=[];
          for(var i=0;i<nodeList.length;i++){
              var node = nodeList[i];
              if(node.nodeType=3 && node.innerHTML==undefined) continue;
              newNodeList.push(node);
          }

      }else{
          newNodeList=nodeList;
      }
      return newNodeList;

  }

  function removeEmpty(node){
      var nodeList=node.childNodes;

      for(var i=0;i<nodeList.length;i++){
//          var node = nodeList[i];
          if(nodeList[i].nodeType=3 && /^\s+$/.test(nodeList[i])){
              nodeList[i].parentNode.removeChild(nodeList[i])
          }

      }
      return nodeList;

  }

  //跨浏览器获取元素到最顶层元素的距离
  function offsetTop(element){
      var parent = element.offsetParent;
      var value = element.offsetTop;
      while(parent!=null){
          value+=parent.offsetTop;
          parent = parent.offsetParent;

      }
      return value;
  }


  /*
  * 获取某一个节点的下一个节点的索引
  * @param 当前节点索引
  * @param 父节点
  * */
  function nextIndex(current,parent){
//      alert(parent.children.length);
      if(current==parent.children.length-1) return 0;
      return current+1
  }

  //获取某一个节点的上一个节点的索引
  function prevIndex(current,parent){
//      alert(parent.children.length);
      if(current==0) return parent.children.length-1;
      return current - 1
  }

