define(['jquery'],function($){
	$(function(){
		$("header").load("/html/include/header.html",function(){
			//移入移出显示隐藏
			$(function(){
				$("#h2").hover(function(){
					$("#display").show();
			},function(){
				$("#display").hide();
			});
				$("#right").hover(function(){
					$("#right_none").show();
				},function(){
					$("#right_none").hide();
				});
				$("#a_img").click(function(){
					$("#display").hide();
				});
				$(window).scroll(function(){
					var top = $(window).scrollTop()
					if(top>150){
						$("#buttom").css({position:"fixed",top:0,left:0,width:"100%",opacity:0.8,background:"#000",zIndex:99})
					}else{
						$("#buttom").css({position:"relative",top:0,left:0,opacity:1,background:"#eee"})
					}
				})
				
				$(".input_1").on("keyup",function(){
					let _search = $(this).val(),
					url = `https://suggest.taobao.com/sug?code=utf-8&q=${_search}&callback=?`;
					$.getJSON(url, function(data){
					var html = "";
					data.result.forEach(function(curr){
						html += `<div class="list">${curr[0]}</div>`;
					});
					$(".input_div").html(html);
					$(".input_div").click(function(e){
						var src = e.target;
						if(src.className == "list"){
							$(".input_1").val(src.innerText);
						}
						
					})
					});
					
				})
				
				
			});
		});
	});
});