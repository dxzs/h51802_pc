require(['config'],function(){
	require(["jquery","load"],function($){
		function Carousel({imgs, width, height}) {
			this.imgs = imgs;
			this.width = width;
			this.height = height;
			this.container = null; // 放置轮播图的容器
			this.lis = null; // 所有轮播图片的li盒子
			this.len = imgs.length; // 所有轮播图片的张数
			this.currentIndex = 0; // 当前显示图片的索引
			this.nextIndex = 1; // 即将显示图片的索引
			this.xiao = null;//小圆点
			this.timer = null;
		};
		// 向 Carousel.prototype 中添加属性
		$.extend(Carousel.prototype, {
			createDom : function(container){
				this.container = $(container)
				this.container.addClass("dx-container");
				var lis = "",circles = "";
				for(var i=0,len=this.imgs.length;i<len;i++){
					lis +=`<li ${ i==0 ? 'style="display:block;"' : ''}>
						<a href="${this.imgs[i].href}">
							<img src="${this.imgs[i].src}">
						</a>
					</li>`
					circles += `<i ${ i == 0 ? 'class="current"' : ''}></i>`;
					}		
				var html = `<ul class="imgs">${lis}</ul>
						<div class="pages">${circles}</div>`
						
					this.container.html(html);
					
					this.container.css({
						width : this.width,
						height : this.height
					});
					$(".imgs, li",this.container).css({
						width : this.width,
						height : this.height
					});
					$(".pages",this.container).css("width",this.width);
					this.lis=$("li",this.container);
					this.xiao=$("i",this.container);
					this.rel();
		},
		autoPlay : function(){
			this.timer = setInterval($.proxy(this.move,this),2000);	
		},
		move : function(){
			this.lis.eq(this.currentIndex).stop().fadeOut();
			this.lis.eq(this.nextIndex).stop().fadeIn();
			this.xiao.eq(this.currentIndex).removeClass("current");
			this.xiao.eq(this.nextIndex).addClass("current");
			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if(this.nextIndex >= this.len)
				this.nextIndex = 0;
		},
		rel : function(){
			this.container.hover($.proxy(this.stopPlay,this),$.proxy(this.autoPlay,this));
			this.xiao.mouseover($.proxy(this.over,this));
		},
		stopPlay : function(){
			clearInterval(this.timer);
		},
		over : function(e){
			var _index = $(e.target).index();
			console.log(_index)
			if(this.currnetIndex == _index)
				return;
			this.nextIndex = _index;
			this.move();
		}
		});
		var a = new Carousel({
			imgs : [
				{src:"../img/01.jpg",href:"#"},
				{src:"../img/02.jpg",href:"#"},
				{src:"../img/03.jpg",href:"#"},
				{src:"../img/04.png",href:"#"},
				{src:"../img/05.png",href:"#"}
			],
		})
		a.createDom(".box");
		a.autoPlay();
	});
});

