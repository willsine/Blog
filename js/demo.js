//
//  window.onload=function(){
////      var b= new Base();
//      $().getId('test').css('backgroundColor','red').addClass('a');
//
////      var a = new Base();
////      $().getTagName('p').css('backgroundColor','blue').html('test').click(function(){
////          alert('ok');
////      });
////      $().getClass('bb','aa').css('backgroundColor','black')
//      $().getTagName('p').addClass('a').addClass('b').addClass('c').addClass('d').removeClass('c');
//  };


//  window.onload=function(){
//
//      //下拉列表
//     $().getClass('member').hover(function(){
//
//         $(this).css('background','url(../images/arrow2.png) no-repeat right 45%');
//         $().getTagName('ul').show();
//
//     },function(){
//         $(this).css('background','url(../images/arrow.png) no-repeat right 45%');
//         $().getTagName('ul').hide();
//
//     });
//
//      //弹出登陆
//      var login=$().getClass('login');
//      var lock= $().getClass('lock');
//
////      login.center(350,250);  //居中
//
//      login.center(350, 250).resize(function () {
//          if (login.css('display') == 'block') {
//              lock.lock();
//          }
//      });
//
//
//
//    $().getClass('close').click(function(){
//        login.css('display','none');
//        lock.unlock();    //遮罩效果去除
//
//    });
//
//    $().getClass('login_point').click(function(){
//        login.center(350,250);
//        login.css('display','block');
//        lock.lock();
//    });
//
//
//
//      //拖拽效果
//     $().getId('login').drag([$().getTagName('h2').getElement(0),$().getClass('login-footer').getElement(0)]);
//
////      window.onresize=function(){
////          alert(getInner().width+' '+getInner().height);
////      }
//  };

//window.onload=function(){
//
//    //下拉列表
//    $('.member').hover(function(){
//        $(this).css('background','url(../images/arrow2.png) no-repeat right 45%');
//        $('ul').show();
//
//    },function(){
//        $(this).css('background','url(../images/arrow.png) no-repeat right 45%');
//        $('ul').hide();
//
//    });
//
//    //弹出登陆
//    var login=$('.login');
//    var lock= $('.lock');
//
////      login.center(350,250);  //居中
//
//    login.center(350, 250).resize(function () {
//        if (login.css('display') == 'block') {
//            lock.lock();
//        }
//    });
//
//
//
//    $('.close').click(function(){
//        login.css('display','none');
//        lock.unlock();    //遮罩效果去除
//
//    });
//
//    $('.login_point').click(function(){
//        login.center(350,250);
//        login.css('display','block');
//        lock.lock();
//    });
//
//
//
//
//    //拖拽效果
//    $('#login').drag([$('h2').getElement(0),$('.login-footer').getElement(0)]);
//
////      window.onresize=function(){
////          alert(getInner().width+' '+getInner().height);
////      }
//};


$().ready(function(){
    var btn = document.getElementById('btn');
    addEvent(btn,'click',function(){
//        alert('ok');
        $('#test').animate({
            'attr' : 'x',
            'start' : 100,
            'alter' : 100,
            'target' : 700,
            'step' : 7
        });
    });


});




$(function(){
    //下拉列表
    $('.member').hover(function(){
        $(this).css('background','url(../images/arrow2.png) no-repeat right 45%');
//        alert($('.member ul'));
        $('.member ul').show();

    },function(){
        $(this).css('background','url(../images/arrow.png) no-repeat right 45%');
        $('.member ul').hide();

    });

    //弹出登陆
    var login=$('.login');
    var lock= $('.lock');

//      login.center(350,250);  //居中

    login.center(350, 250).resize(function () {
        if (login.css('display') == 'block') {
            lock.lock();
        }
    });



    $('.close').click(function(){
        login.css('display','none');
        lock.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn:function(){   //先执行渐变动画再去除遮罩效果
                lock.unlock();
            }
        })

    });

    $('.login_point').click(function(){
        login.center(350,250).css('display','block');
        lock.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });
    });




    //拖拽效果
    $('#login').drag([$('h2').getElement(0),$('.login-footer').getElement(0)]);

    //百度分享栏初始化位置
    $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
    //跟随滚动条运动
    addEvent(window,'scroll',function(){
        $('#share').animate({
            attr:'y',
            target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
});

    });

    //百度分享栏
    $('#share').hover(function(){
//        alert(getInner().height);
//        alert(parseInt(getStyle(this,'height')));
        $(this).animate({
            attr:'x',
            target:0,
            t:24
        });
    },function(){
        $(this).animate({
            attr:'x',
            target:-215
        });
    });

    //导航栏跟随鼠标运动
    $('.nav .about li').hover(function(){
        var target = $(this).first().offsetLeft;
        $('.nav-over').animate({
            attr:'x',
            target:target,
            t : 30,
            step : 10,
            fn:function(){
                $('.nav .white').animate({
                    attr : 'x',
                    target : -target+20,
                    t : 30,
                    step : 10
                });
            }
        })
    },function(){
        $('.nav-over').animate({
            attr:'x',
            target:20,
            t : 30,
            step : 10,
            fn:function(){
                $('.nav .white').animate({
                    attr : 'x',
                    target : 0,
                    t : 30,
                    step : 10
                });
            }
        })
    })

    //侧栏切换
    $('.main #slidebar .news').toggle(function(){
//        alert($(this).next().first().innerHTML);
        $(this).next().animate({
            mul:{
                h:0,
                o:0
            }
        })
    },function(){
        $(this).next().animate({
            mul:{
                h:152,
                o:100
            }
        })
    });

//    //轮播器初始化
//    $('#banner img').css('display', 'none');
//    $('#banner img').eq(0).css('display', 'block');
//    $('#banner ul li').eq(0).css('color', '#333');
//    $('#banner strong').html($('#banner img').eq(0).attr('alt'));
//
//    //自动轮播器
//    var count=1;
//    var timer=setInterval( banner_set,2000);
////   alert( $('#banner ul li').length());
//
//    //手动轮播器
//    $('#banner ul li').hover(function(){
//        clearInterval(timer);
//        banner(this);
//
//    },function(){
//       count=$(this).index() + 1;
//        timer=setInterval( banner_set,2000);
//    });
//
//    function banner(obj){
//
//        $('#banner img').css('display', 'none');
//        $('#banner img').eq($(obj).index()).css('display', 'block');
//        $('#banner ul li').css('color', '#999');
//        $('#banner ul li').eq($(obj).index()).css('color', '#333');
//        $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
//    }
//
//    function banner_set(){
//        if(count>=$('#banner ul li').length()){
//            count=0;
//        }
////        banner($('#banner ul li').)
//        banner($('#banner ul li').eq(count).first());
//        count++;
//    }


    //轮播器初始化
    //$('#banner img').css('display', 'none');
    //$('#banner img').eq(0).css('display', 'block');
    $('#banner img').opacity(0);
    $('#banner img').eq(0).opacity(100);
    $('#banner ul li').eq(0).css('color', '#333');
    $('#banner strong').html($('#banner img').eq(0).attr('alt'));

    //轮播器计数器
    var banner_index = 1;

    //轮播器的种类
    var banner_type = 2; 		//1表示透明度，2表示上下滚动

    //自动轮播器
    var banner_timer = setInterval(banner_fn, 3000);

    //手动轮播器
    $('#banner ul li').hover(function () {
        clearInterval(banner_timer);
//        alert($(this).css('color'));
        if ($(this).css('color') != 'rgb(51, 51, 51)px' && $(this).css('color') != '#333') {
            banner(this, banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
        }
    }, function () {
        banner_index = $(this).index() + 1;
        banner_timer = setInterval(banner_fn, 3000);
    });

    function banner(obj, prev) {
        $('#banner ul li').css('color', '#999');
        $(obj).css('color', '#333');
        $('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));

        if (banner_type == 1) {
            $('#banner img').eq(prev).animate({
                attr : 'o',
                target : 0,
                t : 30,
                step : 10
            }).css('zIndex', 1);
            $('#banner img').eq($(obj).index()).animate({
                attr : 'o',
                target : 100,
                t : 30,
                step : 10
            }).css('zIndex', 2);
        } else if (banner_type == 2) {
            $('#banner img').eq(prev).animate({
                attr : 'y',
                target : 150,
                t : 30,
                step : 10
            }).css('zIndex', 1).opacity(100);
            $('#banner img').eq($(obj).index()).css('top', '-150px').css('zIndex', 2).opacity(100).animate({
                attr : 'y',
                target : 0,
                t : 30,
                step : 10
            });
        }

    }

    function banner_fn() {
        if (banner_index >= $('#banner ul li').length()) banner_index = 0;
        banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
        banner_index++;
    }


    //图片延迟加载
//    alert($('#photo dl dt img').first().xsrc);

//    alert($('#photo dl dt img').eq(0).attr('xsrc'));



//    alert($('#photo dl dt img').first().offsetTop);
//    alert($('#photo dl dt img').first().innerHTML);
//    alert(offsetTop($('#photo dl dt img').first()));
//    alert(getInner().height+getScroll().top)

    var wait_load = $('.wait_load');
    wait_load.opacity(0);
    $(window).bind('scroll',loadfn);
    $(window).bind('resize',loadfn);
    function loadfn(){
        setTimeout(function(){
//            alert('');

//            alert(wait_load.length());
            for(var i=0; i<wait_load.length();i++){
                var _this=wait_load.getElement(i);
                if(getInner().height+getScroll().top>=offsetTop(_this)){//图片所在位置到达视窗内

                    $(_this).attr('src',$(_this).attr('xsrc')).animate({
                        attr:'o',
                        target:100
                    });
                }
//                alert(wait_load.length());
            }

        },100);
    }

    //弹出预加载框
    $('#photo dl dt img').bind('click',function(){
//        alert(this.innerHTML);
//        alert($(this).attr('bigsrc'));
        $('#photo_big').center(620,511).show();
        lock.lock().animate({
            attr : 'o',
            target : 30,
            t : 30,
            step : 10
        });

//        alert($(this).attr('bigsrc'));

        //点击图片进行预加载
//        $('#photo_big .big img').attr('src','http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg').opacity(0).animate({
//            target:100,
//            attr:'o',
//            t:30,
//            step:10
//        }).css('width', '600px').css('height', '450px').css('top', 0);

//        var temp_img = new Image();			//创建一个临时区域的图片对象
//
//        $(temp_img).bind('load', function () {
//            $('#photo_big .big img').attr('src', temp_img.src).animate({
//                attr : 'o',
//                target : 100,
//                t : 30,
//                step : 10
//            }).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
//        });
//
//        //IE必须把src这个属性放在load事件的下面才有效
//        temp_img.src = 'http://www.planeart.cn/demo/imgReady/vistas24.jpg';  //src属性可以在后台加载这张图片到本地缓存


        //预加载函数
//        var url = 'http://www.planeart.cn/demo/imgReady/vistas24.jpg';
//        loadImage(url,callback);
//        function callback(img){
//
//            $('#photo_big .big img').attr('src',img.src).animate({
//                attr:'o',
//                target:100,
//                t:30,
//                step:10
//            }).css('width','600px').css('height','450px').css('top',0).opacity(0);
//        }
//
//        function loadImage(url, callback) {
//            var img = new Image(); //创建一个Image对象，实现图片的预下载
//            img.onload = function(){
//                img.onload = null;
//                callback(img);
//            };
//            img.src = url;
//        }



        var temp_img = new Image();

        $(temp_img).bind('load', function () {
            $('#photo_big .big img').attr('src', temp_img.src).animate({
                attr : 'o',
                target : 100,
                t : 30,
                step : 10
            }).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
        });

        temp_img.src = $(this).attr('bigsrc');
//        alert(this);
        var child = this.parentNode.parentNode;
        var prev_index = prevIndex($(child).index(),child.parentNode);
        var next_index = nextIndex($(child).index(),child.parentNode);
        var image1 = new Image();
        var image2 = new Image();
        image1.src=$('#photo dl dt img').eq(prev_index).attr('bigsrc');
        image2.src=$('#photo dl dt img').eq(next_index).attr('bigsrc');


    });

    $('.close_load').click(function(){
        $('#photo_big').css('display','none');
        lock.animate({
            attr : 'o',
            target : 0,
            t : 30,
            step : 10,
            fn:function(){   //先执行渐变动画再去除遮罩效果
                lock.unlock();
            }
        })

    });

    //拖拽
    $('#photo_big').drag([$('#photo_big h2').getElement(0)]);



});
