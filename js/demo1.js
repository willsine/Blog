
    function createXHR(){
        if(typeof XMLHttpRequest !='undefined'){
            return new XMLHttpRequest();
        }else if( typeof  ActiveXObject !='undefined'){
            var version= [
                'MSXML2.XMLHttp.6.0',
                'MSXML2.XMLHttp.3.0',
                'MSXML2.XMLHttp'
            ];
            for(var i = 0;i<version.length;i++){
                try{
                    return new ActiveXObject(version[i]);
                }catch (e){
                    //skip
                }
            }
        }else{
            throw new Error('不支持XMLHTTPREQUEST');
        }
    }

    //    var xhr = createXHR();
    ////    xhr.open('get','test.jsp',false);
    //    xhr.open('post','test.jsp',false);
    //    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //    xhr.send('name=lee&age=21');
    //    alert(xhr.getAllResponseHeaders());
    //    alert(xhr.getResponseHeader('Date').toString());
    //    if(xhr.status==200){
    //        var s  = xhr.responseText;
    //        alert(s);
    //    }else{
    //        alert('错误代码:'+xhr.status)
    //    }



    function param(data){

        var arr=[];
        for(var i in data){
            arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
        }
        return arr.join('&');
    }


    function ajax(obj){
        var xhr = createXHR();

        if(obj.method=='get'){   //同步
            obj.url+=obj.url.indexOf('?')==-1 ? '?'+param(obj.data) :'&'+param(obj.data);
            alert(obj.url);
            callBack();

        }
        xhr.open(obj.method,obj.url,obj.asyn);

        if(obj.method=='post'){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(param(obj.data));
        }else{
            xhr.send(null);
        }

        if(obj.asyn==true){    //异步
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    callBack();
                }
            }
        }
        if(obj.asyn==false){
            callBack();
        }

        function callBack(){
            if(xhr.status==200 || xhr.status==304){
                return obj.success(xhr.responseText)
            }
            else{
                alert('错误代码:'+xhr.status)
            }

        }
    }

    ajax({
        method:'post',
        url:'testServlet',
        asyn:false,
        data:{
            name:'tom',
            age:21
        },
        success:function(data){
            alert(data);
        }
    });


