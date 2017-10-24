(function($){

    var defaults = {};

    function Crop(element,options){
        this.settings = $.extend({},defaults,options);
        this.element = $(element);

        //图片 
        if(element.tagName.toLowerCase() === 'img'){
            //设置height width
            this.element.css({
                width:this.element.width(),
                height:this.element.height()
            });

            //开始创建  html结构 
            //1 底图
            //2 选择的范围 高亮的部分 
            //3 操作层

            //clone
            var cloneElement = this.element.clone()
                                .removeAttr('id')
                                .css({
                                    border:'none',
                                    visibility:'visible',
                                    margin:0,
                                    padding:0,
                                    position:'absolute',
                                    top:0,
                                    left:0
                                });
            // 原图隐藏
            this.element.hide();

            // wrap
            var $wrap = $('<div />').css({
                width:this.element.width(),
                height:this.element.height(),
                position: 'relative'
            }).append(cloneElement).insertAfter(this.element);

            //modal
            var $modal = $('<div />').css({
                position:'absolute',
                left:0,
                left:0,
                width:'100%',
                height:'100%',
                zIndex:100,
                cursor:'crosshair'
            }).appendTo($wrap);

            //选择区域
            $modal.on('mousedown',function(e){
                //todo
                //记录点击位置
                //记录移动位置

                //建立选择的区域边界

                //选择区域的高亮预览 和 背景变暗

                return false;
            })


        }
    };

    $.fn.crop = function(options,callback){
        return this.each(function(){

            if( !$.data(this,'crop') ){
                if(this.tagName.toLowerCase()  === 'img'){
                    $(this).on('load',function(){
                        $(this).css({
                            display:'block',
                            visibility:'hidden'
                        });

                        $.data( this,'crop',new Crop(this,options) );

                        if(callback){
                            callback();
                        }
                    });
                }
            }

        });
        
    };
})(jQuery);