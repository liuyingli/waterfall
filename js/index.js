"use strict";
/*计算整个页面显示的列数*/
$(window).off('load').on('load',function(){
    waterfall();
    var dataArr={
        'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'5.jpg'},{'src':'2.jpg'},{'src':'4.jpg'},{'src':'1.jpg'},{'src':'6.jpg'},{'src':'1.jpg'},{'src':'6.jpg'},{'src':'8.jpg'},]
    }
    $(window).off('scroll').on('scroll',function(){
        if(checkScrollSlide){
            $.each(dataArr.data,function(key,val){
                $('#main>.box').last().after('<div class="box"><div class="pic"><img src="images/'+val.src+'"  width="100%"/></div></div>');
            })
            waterfall();
        }
    })
})
function waterfall() {
    var $boxs=$('#main>.box');
    var rowW=$boxs.eq(0).outerWidth();//每列的宽
    var cols = Math.floor($(window).width()/rowW);//可以放多少列
    $('#main').width(rowW*cols);//设置盒子的宽度并且居中
    var hArr=[];
    $boxs.each(function(index,obj){
        var boxHeight=$boxs.eq(index).outerHeight();//每个div的高度
        if(index < cols){//第一行的div
            hArr[index] = boxHeight;
        }
        else{
            var minH = Math.min.apply(null,hArr);
            var minHIndex = $.inArray(minH,hArr);//返回数组里最小值得下标
            $(obj).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*rowW+'px'
            });
            hArr[minHIndex]=hArr[minHIndex]+$boxs.eq(index).outerHeight();
        }
    });
}

/*判断什么时候加载新的数据*/
function checkScrollSlide(){
    var $lastBox = $('#main>div').last();
    var lastBoxDis=$lastBox.offset().top;//获取最后一个元素距离顶部的距离
    var scrollTopD=$(window).scrollTop();
    var windowHeight = $(window).height();
    return (lastBoxDis<scrollTopD+windowHeight)?true:false;
}