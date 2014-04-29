/*
* 插件库
* 对于不常用的功能比如拖拽、动画等将其封装成插件而不要写在主库里面。
* */
    $().extend('drag', function(drag){
        for(var i=0;i<this.elements.length;i++){
            addEvent(this.elements[i],'mousedown',function(e){
                if (trim(this.innerHTML).length == 0){
                    preDft(e);  //解决低版本火狐拖动空元素的bug 阻止默认行为即可。
                }

                var _this=this;
                var event = getEvent(e);
                var diffX = event.clientX-_this.offsetLeft;
                var diffY = event.clientY-_this.offsetTop;
                var flag;
//                alert(drag.length);

                //自定义拖拽区域
                for(var i=0;i<drag.length;i++){
                    if(getTarget(e)==drag[i]){
                        flag=true;
                        break;
                    }
                }

                if(typeof _this.setCapture !='undefined'){  //防止IE鼠标移除窗口失效
                    _this.setCapture();
                }

                if(flag){
                    addEvent(document,'mousemove',move);
                    addEvent(document,'mouseup',up);

                }else{
                    removeEvent(document,'mousemove',move);
                    removeEvent(document,'mouseup',up);

                }

                function move(e){
                    var evt = getEvent(e);
                    var left = evt.clientX-diffX;
                    var top = evt.clientY-diffY;

                    if(left<0){
                        left=0;
                    }else if(left<getScroll().left){
                        left=getScroll().left;
                    }else if(left>getInner().width + getScroll().left-_this.offsetWidth){

                        left=getInner().width + getScroll().left-_this.offsetWidth;
                    }
                    if(top<0){

                        top=0;

                    }else if(top>getInner() .height + getScroll().top - _this.offsetHeight){

                        top=getInner().height + getScroll().top - _this.offsetHeight;

                    }else if(top<getScroll().top){

                        top=getScroll().top;
                    }
                    _this.style.left=left +'px';
                    _this.style.top=top +'px';
                }
                function up(){
                    removeEvent(document,'mousemove',move);
                    removeEvent(document,'mouseup',up);

                    if(typeof _this.releaseCapture !='undefined'){  //防止IE鼠标移除窗口失效
                        _this.releaseCapture();
                    }
                }

            });

        }
        return this;
    });
