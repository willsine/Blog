    /**
     * Created by Administrator on 14-4-10.
     */

    //var Base={
    //
    //    getId:function(id){
    //        return document.getElementById(id);
    //    },
    //    getTagName:function(tag){
    //        return document.getElementsByTagName(tag);
    //    }
    //
    //};

    /*
     * 实现连缀，获取的元素保存在数组中，每个方法中都遍历数组，
     * 对元素进行相应操作并返回this本身
     */

    var $=function(args){
        return new Base(args);
    };

    function Base(args){

        //创建数组用来保存获取的节点或节点数组
        this.elements=[];

        if(typeof args=='string'){    //模拟css选择器
            if(args.indexOf(' ')!=-1){
                var elements = args.split(' ');  //把节点拆开分别保存到数组里
                var childElements=[];//存放临时节点对象的数组，解决被覆盖的问题
                var node = [];								//用来存放父节点
                for(var i = 0; i<elements.length;i++){

                    if(node.length==0) node.push(document);

                    switch (elements[i].charAt(0)){
                        case '#':
                            childElements=[];

                            for(var j=0; j<node.length; j++){

                                var temp = this.getId(elements[i].substring(1));

                                    childElements.push(temp);
                            }

                            node=childElements;
                            break;

                        case '.':
                            childElements=[];

                            for(var j=0; j<node.length; j++){

                                var temp = this.getClass(elements[i].substring(1),node[j]);

                                for(var k=0; k<temp.length; k++){
                                    childElements.push(temp[k]);
                                }

                            }

                            node=childElements;
                            break;
                        default :
                            childElements=[];

                            for(var j=0; j<node.length; j++){

                                var temps = this.getTagName(elements[i],node[j]);

                                for(var k=0; k<temps.length; k++){
                                    childElements.push(temps[k]);
                                }

                            }

                            node=childElements;
                    }
                }
                this.elements=childElements



            }else{
                switch (args.charAt(0)){
                    case '#':this.elements.push(this.getId(args.substring(1)));

                        break;
                    case '.': this.elements=this.getClass(args.substring(1));
                        break;
                    default : this.elements=this.getTagName(args);
                }
            }



        }else if(typeof args=='object'){   //传this.
            if(args!=undefined){
                this.elements[0]=args;
            }
        }else if(typeof args=='function'){
            this.ready(args);
        }


    }

    Base.prototype.ready=function(fn){
      DOMLoaded(fn);
    };

    //设置CSS选择器子节点
    Base.prototype.find=function(args){
        var childElements=[];
        for(var i=0;i<this.elements.length;i++){

            switch (args.charAt(0)){
                case '#':
                    childElements.push(this.getId(args.substring(1)));
                    break;

                case '.':
                    var temps = this.getClass(args.substring(1), this.elements[i]);
                    for (var j = 0; j < temps.length; j ++) {
                        childElements.push(temps[j]);
                    }

                        break;
                default :
                    var temp = this.getTagName(args, this.elements[i]);
                    for (var k = 0; k < temps.length; k ++) {
                        childElements.push(temp[k]);
                    }

            }
        }
        this.elements=childElements;
        return this;
    };

    //根据id获取元素
    Base.prototype.getId=function(id){

        return document.getElementById(id);
    };

    //根据标签名获取元素
    Base.prototype.getTagName=function(tag,parent){
        var temp=[];
        var node;
        if(parent !=undefined){
            node = parent;
        }else{
            node= document;
        }
        var nodelist=node.getElementsByTagName(tag);
        for(var i=0;i<nodelist.length;i++){
            temp.push(nodelist[i]);
        }
        return temp;
    };

    //获取某个元素并返回
    Base.prototype.getElement=function(num){
        return this.elements[num];
    };

    //获取某个元素并返回Base对象
    Base.prototype.eq=function(num){
        var element = this.elements[num];
        this.elements=[];
        this.elements[0]=element;
        return this;
    };

    //获取取第一个元素
    Base.prototype.first=function(){
        return this.elements[0];
    };

    //获取当前节点的下一个同级节点
    Base.prototype.next=function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i] = this.elements[i].nextSibling;
            if(this.elements[i] ==null){
                throw  new Error('找不到下一个节点')
            }
            if(this.elements[i].nodeType==3) this.next();
        }
        return this;
    };

    //获取当前节点的下一个同级节点
    Base.prototype.prev=function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i] = this.elements[i].previousSibling;
            if(this.elements[i] ==null){
                throw  new Error('找不到上一个节点')
            }
            if(this.elements[i].nodeType==3) this.prev();
        }
        return this;
    };

    //获取节点在同级节点中的索引
    Base.prototype.index=function(){

//        alert(clearLinefeed(this.elements[0].parentNode.childNodes).length);
//          alert(removeEmpty(this.elements[0].parentNode).length)
        var child = clearLinefeed(this.elements[0].parentNode.childNodes);
        for(var i=0;i<child.length;i++){
            if(child[i]==this.elements[0]) return i;
        }
    };

    //获取元素的属性值
    Base.prototype.attr=function(attr,value){
        for(var i=0;i<this.elements.length;i++){
            if(arguments.length==1){
                return this.elements[i].getAttribute(attr);
            }else if(arguments.length==2){
                this.elements[i].setAttribute(attr,value);
            }

        }
        return this;

    };

    //获取节点数组的长度
    Base.prototype.length=function(){
        return this.elements.length;
    };

    //设置css
    Base.prototype.css=function(attr,value){
        for(var i=0;i<this.elements.length;i++){
            if(arguments.length==1){
                return getStyle(this.elements[i],attr)+'px';
            }
            this.elements[i].style[attr]=value;
        }
        return this;
    };

    //设置html
    Base.prototype.html=function(value){
        for(var i=0;i<this.elements.length;i++){
            if(arguments.length==0){
                return this.elements[i].innerHTML;
            }
            this.elements[i].innerHTML=value;
        }
        return this;
    };

    //设置元素的透明度
    Base.prototype.opacity=function(value){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.opacity=value/100;
            this.elements[i].style.filter='alpha(opacity='+value+')';
        }
        return this;
    };

    //添加点击事件
    Base.prototype.click=function(fn){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].onclick=fn;
        }
        return this;
    };

    //设置事件发生器
    Base.prototype.bind = function (event, fn) {
        for (var i = 0; i < this.elements.length; i ++) {
            addEvent(this.elements[i], event, fn);
        }
        return this;
    };

    /*
    * 获取父元素下的class为claaName的元素
    * parent 为空表示获取class为className的元素
    * */
    Base.prototype.getClass=function(className,parentNode){
        var node = null;
        var temps = [];
        if (parentNode != undefined) {
            node = parentNode;
        } else {
            node = document;
        }
//        var all=node.getElementsByTagName('*');
        var all = node.getElementsByTagName('*');
        for(var i = 0;i<all.length;i++){
            if (all[i].className==className){
                temps.push(all[i]);
            }
        }

//        for (var i = 0; i < all.length; i ++) {
//            if (all[i].className == className) {
//                temps.push(all[i]);
//            }
//        }
        return temps;
    };

    //添加class样式
    Base.prototype.addClass=function(className){
        for(var i=0;i<this.elements.length;i++){
            if(!hasClass(this.elements[i],className)){
                this.elements[i].className+=' '+className;
            }

        }
        return this;
    };

    //删除样式
    Base.prototype.removeClass=function(className){
        for(var i=0;i<this.elements.length;i++){
            if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
                this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
            }

        }
        return this;
    };

    //设置显示
    Base.prototype.show=function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display='block';
        }
        return this;
    };

    //设置影藏
    Base.prototype.hide=function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display='none';
        }
        return this;
    };


    //鼠标移入移除方法
    Base.prototype.hover=function(over,out){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].onmouseover=over;
            this.elements[i].onmouseout=out;

        }
        return this;
    };

    //元素居中
    Base.prototype.center=function(width,height){
        var top=Math.floor((getInner().height-height)/2 + getScroll().top);
        var left = Math.floor((getInner().width-width)/2 + getScroll().left);
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.top=top+'px';
            this.elements[i].style.left=left+'px';
        }
        return this;
    };

    //窗口恢复
    Base.prototype.resize=function(fn){
        for(var i=0;i<this.elements.length;i++){
            var element = this.elements[i];
            window.onresize = function(){
                fn();
                if(element.offsetLeft > getInner().width+getScroll().left - element.offsetWidth){
                    element.style.left = getInner().width+getScroll().left - element.offsetWidth+'px';
                }
                if(element.offsetTop > getInner().height+getScroll().top -element.offsetHeight){
                    element.style.top = getInner().height+getScroll().top -element.offsetHeight + "px";
                }

            };
        }
        return this;
    };

    //遮罩
    Base.prototype.lock=function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display='block';
            this.elements[i].style.width=getInner().width+getScroll().left+'px';
            this.elements[i].style.height=getInner().height+getScroll().top+'px';
            document.documentElement.style.overflow='hidden';
        }
        return this;
    };

    //取消锁屏
    Base.prototype.unlock=function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display='none';
            document.documentElement.style.overflow='auto';
        }
        return this;
    };

    //插件扩展
    Base.prototype.extend=function(name,fn){
        Base.prototype[name]=fn;
    };

    //动画
//    Base.prototype.animate=function(attr,start,step,target){
//        for(var i=0;i<this.elements.length;i++){
//            var element = this.elements[i];
//            element.style[attr]=start+'px';
//            clearInterval(window.timer);
//                timer = setInterval(function(){
//                element.style[attr]=(getStyle(element,attr)+step)+'px';
//
//                if(getStyle(element,attr)>=target){
//                    element.style[attr]=target+'px';
//                    clearInterval(timer);
//                }
//            },50)
//        }
//        return this;
//    };

    Base.prototype.animate=function(obj){

        for(var i=0;i<this.elements.length;i++){

            var element = this.elements[i];

            var attr= obj['attr']=='x'?'left':obj['attr']=='y'?'top':     //属性值为可选 不存在就默认为left
                      obj['attr']=='h'?'height':obj['attr']=='w'?'width':
                      obj['attr']=='o'?'opacity':obj['attr']?obj['attr']:'left';

            var t = obj['t']?obj['t']:50;   //可选 默认为30毫秒执行一次

            var start = obj['start']? obj['start']:attr=='opacity'?parseFloat(getStyle(element,attr))
                        :parseInt(getStyle(element,attr));  //起始位置为可选 不存在就默认为css起始位置
//            alert( start);
            var step = obj['step']? obj['step']:10;       //步长为可选 不存在就默认设为10 每次运行10像素

            var speed = obj['speed']? obj['speed']:6;   //可选 默认缓冲速度为6

            var type = obj['type']==0?'constant':obj['type']==1?'buffer':'buffer'; //可选 运动类型0表示匀速 1表示缓冲 默认为缓冲

            var alter = obj['alter'];
            var target=obj['target'];

            var fn = obj['fn'];

            var mul = obj['mul'];


            if(alter!=undefined && target==undefined){
                target=alter + start;
            }else if(alter==undefined && target==undefined && mul==undefined){
                throw new Error('目标或增量至少定义一个')
            }

            if(start>target) {
                step=-step;
            }

            if(mul==undefined){
                mul={};
                mul[attr]=target;
            }

//            element.style[attr]=start+'px';
            clearInterval(element.timer);          //每次运行前清除动画 避免动画叠加

            element.timer = setInterval(function(){
                var flag = true;
                for(var i in mul){
                    attr = i == 'x' ? 'left' : i == 'y' ? 'top' :
                           i == 'w' ? 'width' : i == 'h' ? 'height' :
                           i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                    target=mul[i];

                    if(type=='buffer'){
                       step= attr=='opacity'?(target-(parseFloat(getStyle(element,attr))*100))/speed:
                           (target-parseInt(getStyle(element,attr)))/speed;

                       step=step>0?Math.ceil(step):Math.floor(step);
                    }
                    if(attr=='opacity'){
                        if(step==0){
                            setOpacity();
                        }else if(step<0 && (parseFloat(getStyle(element,attr))*100 - target)<=Math.abs(step)){
                            setOpacity();
                        }else if(step>0 && Math.abs(parseFloat(getStyle(element,attr))*100 -target)<=step){
                            setOpacity();
                        }else{
                            element.style[attr]=(parseFloat(getStyle(element,attr))*100+step)/100;
                            var temp = parseFloat(getStyle(element,attr))*100;
                            element.style.filter='alpha(opacity='+(temp+step)+')';
                        }
                        if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) flag = false;
//                        document.getElementById('show').innerHTML += getStyle(element, attr) + '<br />';

                    }else{
                        if(step==0){
                            setTarget();
                        }else if(step<0 && (parseInt(getStyle(element,attr)) - target)<=Math.abs(step)){
                            setTarget();
                        }else if(step>0 && Math.abs(parseInt(getStyle(element,attr)) -target)<=step){
                            setTarget();
                        }else{
                            element.style[attr]=(parseInt(getStyle(element,attr))+step)+'px';
                        }
                        if (parseInt(target) != parseInt(getStyle(element, attr))) flag = false;
                    }

                }

                if(flag){
                    clearInterval(element.timer);
                    if(fn!=undefined){
                        fn();
                    }
                }

//                document.body.innerHTML+=getStyle(element,attr);
//                document.getElementById('wrapper').innerHTML += getStyle(element, attr) + '<br />';
            },t);
            function setTarget(){
                element.style[attr]=target+'px';

            }
            function setOpacity(){
                element.style.opacity= parseFloat(target/100);
                element.style.filter='alpha(opacity='+target+')';
            }
        }
        return this;
    };


    Base.prototype.toggle=function(){
        for(var i=0;i<this.elements.length;i++){
//            execTo(arguments,this.elements[i]);

            (function(argument,ele){
                var args = argument;
                var element = ele;
                var count = 0;
                addEvent(element,'click',function(){

                    args[count++ % args.length].call(this);
//                    alert(count);
//                count++;
//                if(count>args.length) count=0;
                })
            })(arguments,this.elements[i])
        }

    };

//    function execTo(argument,ele){
//        var args = argument;
//        var element = ele;
//        var count = 0;
//        addEvent(element,'click',function(){
//            args[count++ % args.length].call(this);
////                count++;
////                if(count>args.length) count=0;
//        })
//    }



