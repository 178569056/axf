define(
[
  'text!./cart.html',
  'css!./cart.css'
],
function(html){

  function render(){
  	$("footer").show();
    $('#container').html(html);
	if(localStorage.arr==""||localStorage.arr==undefined){
		$(".empty").show();
		$(".cartmain").hide();
	}else{
		$(".empty").hide();
		$(".cartmain").show();
	}


    banEvent();
    click();
  }

  //事件绑定事件
	function banEvent(){
		if(localStorage.arr=="") return;
		var array =localStorage.arr.split(",");
		var str ="";
		var totalnum=0;
		for(var n=0;n<array.length;n++){
			var xhr =JSON.parse(JSON.parse(localStorage.getItem(array[n])).data);
			str +=	'<tr id='+array[n]+'>'+
		            '<td class="img1"><span style="display:none">0</span></td>'+
		          	'<td class="img2" style="background:url('+xhr.img+') no-repeat center;background-size: 100%;"></td>'+
		          	'<td>'+
		            	'<div>'+xhr.name+'</div>'+
		            	'<div>￥<span class="price">'+xhr.price+'</span>'+
			            	'<div>'+
								'<span class="min"></span>'+
								'<span class="num">'+JSON.parse(JSON.parse(localStorage.getItem(array[n])).number)+'</span>'+
								'<span class="add"></span>'+
							'</div>'+
						'</div>'+
						'<textarea style="display:none">'+
							JSON.parse(localStorage.getItem(array[n])).data+
						'</textarea>'+
		          	'</td>'+
		    	'</tr>';
		    totalnum += xhr.price*JSON.parse(JSON.parse(localStorage.getItem(array[n])).number);
		} 	
		document.getElementById('cartlist').innerHTML=str;
		document.getElementById("total").innerHTML = parseFloat(totalnum).toFixed(1) ;
	}


	function click(){
		var sumPrice = parseFloat($("#total").text());
		$(".add").on("click",function(e){
			$("footer #cart_num").css("display","inline-block");
			// 获取数量
			num = $("#cart_num").text();
			count = $(this).prev().text();
			// 增加
			$(this).prev().html(++count);
			$("#cart_num").html(++num);
			// 存储更改
			var parent = $(this).closest('tr'),
				id = parent.attr("id"),
				json = parent.find('textarea').val(),
				value = localStorage.getItem(id);
			if(value){
				localStorage.setItem(id,JSON.stringify({
					data:json,
					number:JSON.parse(value).number+1
				}));			
			}
			// 总价改变
			var Price =parseFloat($(this).closest("tr").find('.price').text());
			sumPrice += Price;
			$("#total").text(parseFloat(sumPrice).toFixed(1));
		})

	$("#cartlist").on("click",".min",function(e){
			
			// 商品数量
			count= $(this).next().text();
			//购物车数量
			num = $("#cart_num").text();
			// 实现减少
			$(this).next().html(count-1);
			$("#cart_num").html(num-1);

			var Price =parseFloat($(this).closest("tr").find('.price').text());
			sumPrice -= Price;
			$("#total").text(parseFloat(sumPrice).toFixed(1));

			

			var parent = $(this).closest('tr'),
				id = parent.attr("id"),
				json = parent.find('textarea').val(),
				value = localStorage.getItem(id);
				if(value){
					localStorage.setItem(id,JSON.stringify({
						data:json,
						number:JSON.parse(value).number-1
					}));			
				}
			

			if(num == 1){
				$("#cart_num").hide();
			}
			if(count == 1){
				$(this).closest("tr").remove();
				delete localStorage[id];
				var index = $("tr").index($(this).closest("tr"));
				var array =localStorage.arr.split(",");
				for(i=0;i<array.length;i++){
					if(array[i] == id){
						array.splice(i,1);
					}
				}
			var trNum = $("tr").length;
			if(trNum == 0){
				$(".empty").show();
    			$(".cartmain").hide();
			}else{
				$(".empty").hide();
    			$(".cartmain").show();
			}


				if(array == []){
					localStorage.arr = null;
				}else{
					localStorage.arr = array;
				}
			}
		})

	$(".img1").on("click", function(){
		var judge =  $(this).children().text();
			sumPrice = parseFloat($("#total").text());
		if(judge == 0){
			flag = true;
			$(this).children().text(1);
			$(this).css({'background':"url(images/shop3.png) no-repeat center",'backgroundSize':"2rem 2rem"});
			var Price =parseFloat($(this).closest("tr").find('.price').text()),
				num = parseFloat($(this).closest("tr").find(".num").text());
			sumPrice -= parseFloat(Price*num).toFixed(1);
			$("#total").text(parseFloat(sumPrice).toFixed(1));
			$("#all").css({'background':"url(images/shop3.png) no-repeat center",'backgroundSize':"2rem 2rem"})
			sumPrice = $("#total").text();
			if(sumPrice==0){
				$("#ok").css("background","gray");
				$("#ok").text("满0￥起送");
			}
		}else if(judge == '1'){
			$(this).css({'background':"url(images/shop2.png) no-repeat center",'backgroundSize':"2rem 2rem"});
			$(this).children().text(0);
			var Price =parseFloat($(this).closest("tr").find('.price').text()),
				num = parseFloat($(this).closest("tr").find(".num").text());
			sumPrice += parseFloat(Price*num);
			$("#total").text(parseFloat(sumPrice).toFixed(1));
			sumPrice = $("#total").text();
			if(sumPrice>0){
				$("#ok").css("background","#ffd600");
				$("#ok").text("选好了");
			}
			var judgeNum = 0
			for(i=0;i<$(".img1").length;i++){
				if($(".img1").eq(i).children().text() == "0"){
					++judgeNum;
				}	
			}
			if(judgeNum == $(".img1").length){
				$("#all").css({'background':"url(images/shop2.png) no-repeat center",'backgroundSize':"2rem 2rem"})
			}
		}

	})

	var flag = false;
	$("#all").on("click", function(){
		if(flag == false){
			flag = true;
			$("#ok").css("background","gray");
			$("#ok").text("满0￥起送");
			$(this).css({'background':"url(images/shop3.png) no-repeat center",'backgroundSize':"2rem 2rem"});
			$("#total").text(0);
			$(".img1").each(function(){
				$(this).css({'background':"url(images/shop3.png) no-repeat center",'backgroundSize':"2rem 2rem"});
				$(this).children().text(1);
			})
		}else{
			flag = false;
			$("#ok").css("background","#ffd600");
			$("#ok").text("选好了");
			$(this).css({'background':"url(images/shop2.png) no-repeat center",'backgroundSize':"2rem 2rem"});
			$(".img1").each(function(){
				$(this).css({'background':"url(images/shop2.png) no-repeat center",'backgroundSize':"2rem 2rem"});
				$(this).children().text(0);
			})
			sumPrice = 0;
			for(i=0;i<$("tr").length;i++){
				price = $("tr").eq(i).find(".price").text();
				num = $("tr").eq(i).find(".num").text();
				sumPrice += price*num;
				}	
			$("#total").text(parseFloat(sumPrice).toFixed(1));
		}
	})


	}







  return {
    render:render
  }

})