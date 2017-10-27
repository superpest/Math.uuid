(function($){

    var defaults = {};

    function Crop(element,options){
        this.settings = $.extend({},defaults,options);
        this.element = $(element);

        //图片 
        if(element.tagName.toLowerCase() === 'img'){
            //设置height width
            var imgAttr = {
                width:this.element.width(),
                height:this.element.height(),
                src:this.element.attr('src')
            }
            this.element.css({
                width:imgAttr.width,
                height:imgAttr.height,
                display:'none'
            });
            //开始创建  html结构 
            //1 底图
            //2 选择的范围 高亮的部分 
            //3 操作层

            var htmlStr = [
                '<div style="width: '+ imgAttr.width +'px; height: '+ imgAttr.height +'px; position: relative;">',
                    '<img src="'+ imgAttr.src +'" style="display: block; visibility: visible; width: '+ imgAttr.width +'px; height: '+ imgAttr.height +'px; position: absolute; top: 0px; left: 0px;">',
                    '<div style="position: absolute; z-index: 2; width: 300px; height: 265px; top: 100px; left: 100px;" class="cutting">',
                        '<div style="width: 100%; height: 100%;overflow: hidden;position:absolute;">',
                            '<img src="'+ imgAttr.src +'" style="visibility: visible;position: absolute; top: 0; left: 0; width: 790px; height: 569px;">',
                            '<div class="line l"></div>',
                            '<div class="line r"></div>',
                            '<div class="line t"></div>',
                            '<div class="line b"></div>',
                            '<div style="cursor: move; position: absolute; z-index: 1;width: 100%;height:100%;" class="js-moveArea"></div>',
                        '</div>',
                        '<div class="other-block" style="width:100%;height:100%;">',
                            '<div class="block tl"></div>',
                            '<div class="block tr"></div>',
                            '<div class="block bl"></div>',
                            '<div class="block br"></div>',
                            '<div class="block tc"></div>',
                            '<div class="block bc"></div>',
                            '<div class="block lc"></div>',
                            '<div class="block rc"></div>',
                            '<div class="strip t"></div>',
                            '<div class="strip b"></div>',
                            '<div class="strip l"></div>',
                            '<div class="strip r"></div>',
                        '</div>',
                    '</div>',
                    '<div style="width: 100%; height: 100%; z-index: 1; position: absolute; overflow: hidden;cursor:crosshair;" class="js-selectArea"></div>',
                '</div>'].join('');
            //选择区域
            this.wrap = $(htmlStr);
            this.element.after(this.wrap);
            var selectArea = this.wrap.find('.js-selectArea');
            var movetArea = this.wrap.find('.js-moveArea');
            var strip = this.wrap.find('.strip');
            var block = this.wrap.find('.block');
            selectArea.on('mousedown',function(e){
                console.log('area')
                // todo
                // 记录点击位置
                // 记录移动位置

                // 建立选择的区域边界

                // 选择区域的高亮预览 和 背景变暗

                return false;
            });
            movetArea.on('click',function(e){
                // 移动选区
                console.log('move');
                return false;
            });
            strip.on('click',function(){
                //滑块
                console.log('strip');
                return false;
            });
            block.on('click',function(){
                //小滑块
                console.log('block');
                return false;
            });


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