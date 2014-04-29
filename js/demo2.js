    var EventUtil={
        addHandler:function(element,type,handler){
            if(window.addEventListener){
                element.addEventListener(type,handler,false)
            }else if(window.attachEvent){
                element.attachEvent('on'+type,function(){
                    handler.call(element);
                });
            }else{
                element['on'+type]=handler;
            }
        },
        removeHandler:function(element,type,handler){
            if(window.removeEventListener){
                element.removeEventListener(type,handler,false)
            }else if(window.detachEvent){
                element.detachEvent('on'+type,function(){
                    handler.call(element);
                });
            }else{
                element['on'+type]=null;
            }
        },
        getEvent:function(evt){
            return window.event ?window.event : evt;
        },
        getTarget:function(e){
            if(window.event){
                return event.srcElement
            }else{
                return e.target;
            }
        }

    };


    var div = document.querySelector('.test');
    EventUtil.addHandler(div,'click',toRed);
    function toRed(event){
        var that = EventUtil.getTarget(event);
        that.className='red';
        EventUtil.removeHandler(that,'click',toRed);
        EventUtil.addHandler(that,'click',toBlue)
    }
    function toBlue(event){
        var that = EventUtil.getTarget(event);
        that.className='blue';
        EventUtil.removeHandler(that,'click',toBlue);
        EventUtil.addHandler(that,'click',toRed);
    }