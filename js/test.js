//
//
////window.onload=function(){   //整个文档加载完毕包括图片音频视频等
////    var  div =document.getElementById('div');
////    alert(div.innerHTML);
////};
//
//addEvent(document,'DOMContentLoaded',function(){   //DOM就绪 firefox、chrome支持
//    var  div =document.getElementById('div');
//    alert(div.innerHTML);
//});
//
//document.write('<script defer="defer" src="javascript:void(0)" id="test"></script>');
//var sc= document.getElementById('test');
//sc.onreadystatechange=function(){
//    if(this.readyState=='complete'){
//        var  div =document.getElementById('div');
//        alert(div.innerHTML);
//    }
//
//};
//
//
//function DOMLoaded(fn){
//    var flag = true;
//
//    function doReady(fn){
//
//        if(flag){
//            fn();
//            flag=false;
//            clearInterval(timer);
//        }
//
//    }
//    var timer =setInterval(function(){
//        try{
//            document.documentElement.doScroll('left');
//            doReady();
//        }catch (e){
//            //
//        }
//
//    },1);
//}
//
//DOMLoaded(function(){
//    var  div =document.getElementById('div');
//    alert(div.innerHTML);
//});
//
////alert(3<3.2)

//
//DOMLoaded(function(){
//    var  div =document.getElementById('div');
//    alert(div.innerHTML);
//});


//$(function(){
//    var  div =document.getElementById('div');
//    alert(div.innerHTML);
//});


//$().ready(function(){
//   var test = document.getElementById('test');
//    alert(getStyle(test,'left'));
//
//   var timer = setInterval(function(){
//        test.style.left=(getStyle(test,'left')+1)+'px';
//        if(getStyle(test,'left')>=500){
//            clearInterval(timer);
//        }
//    },50)
//});

//$().ready(function(){
//    var btn = document.getElementById('btn');
//    addEvent(btn,'click',function(){
////        alert('ok');
//        $('#test').animate({
//            attr : 'o',
////            'start' : 100,
//            alter : 100,
//            target : 100,
//            step : 7,
//            fn:function(){
//                $('#test').animate({
//                    attr:'x',
//                    target:700
//                });
////                alert('ok');
//            }
//        });
//    });
//
//
//});

$().ready(function(){
    var btn = document.getElementById('btn');
    addEvent(btn,'click',function(){

        $('#test').animate({

           mul:{
               width:500,
               height:101,
               o:100
           },
           fn:function(){
                $('#test').animate({
                    attr:'w',
                    target:100,
                    fn:function(){
                        $('#test').animate({
                            mul:{
                                o:30,
                                height:300
                            }
                        })
                    }
                });
            }

        });
    });

    $('#btn1').toggle(function(){
        $('#test1').css('backgroundColor','red')
    },function(){
        $('#test1').css('backgroundColor','black')
    })


});



