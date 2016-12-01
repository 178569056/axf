define(
[
  'text!./home.html',
  'css!./home.css',
  './swiper.jquery.min.js',
  'css!./swiper.min.css',
  'md5'
],
function(html){

	function render(){
		$("footer").show();
		$('#container').html(html);
	}
	//图片轮播
	function swiper(){
		var mySwiper = new Swiper ('.swiper-container', {
			// direction: 'vertical',
			direction: 'horizontal',
			autoplay:1000,
			loop: true,
			autoplayDisableOnInteraction:false,
			// 如果需要分页器
			pagination: '.swiper-pagination',

			// 如果需要前进后退按钮
			// nextButton: '.swiper-button-next',
			// prevButton: '.swiper-button-prev',
			 // 如果需要滚动条
			// scrollbar: '.swiper-scrollbar',

		})
	}

	function getData(){
		$("#hot").load("tem/beeindex.html", function() {
			sendRequest('get', 'data/hotsale.json', true, {}, show1);
			function show1(data) {
				var html1 = baidu.template('hotlist', data);
				$('#hot').html(html1);
				eventClick();
				bindEvent();
			};
		});
	}

	
	function eventClick(){
		
		// 下方热卖
		$("#hot .add").on("click", function(){
			// 增加显示
			$(this).prev().prev().css("display","inline-block");
			$(this).prev().css("display","inline-block");
			$("#cart_num").css("display","inline-block");
			// 获取数量
			num = $("#cart_num").text();
			count = $(this).prev().text();
			// 增加
			if(count<=4){
				$(this).prev().html(++count);
				$("#cart_num").html(++num);

				var b = $(this).closest("li").find("img");
				var newBox = b.clone().appendTo(document.body);
					newBox.css({
		                'z-index': 10,
		                'border-radius':'50%',
		                'display': 'block',
		                'position': 'absolute',
		                'top': b.offset().top +'px',
		                'left': b.offset().left +'px',
		                'width': b.width() +'px',
		                'height': b.height() +'px'
		            });
		            newBox.animate({
		                top:  $('footer div:eq(3)').offset().top,
		                left:  $('footer div:eq(3)').offset().left+ $('footer div:eq(3)').width()/2,
		                width: 20,
		                height: 32
		            }, 'slow', function() {
		                newBox.remove();
		            });
				}else{
					alert("库存不足");
				}
			

		})
		$("#hot .min").on("click", function(){

			var count1= $(this).next().text();
			var num1= $("#cart_num").text();
			$(this).next().next().show();
			// 实现减少
			$(this).next().html(count1-1);
			$("#cart_num").html(num1-1);
			// 更新数量
			count= $(this).next().text();
			num = $("#cart_num").text();

			// 判断是否隐藏
			if(count1==1){
				$(this).hide();
				$(this).next().hide();
			}
			if(num1==1){
				$("#cart_num").hide();
			}
		})

	}


function bindEvent(){
		//购物车添加
        if(localStorage.arr){
          var  array = localStorage.arr.split(",")
        }else{
          var array =[];
        }
		$('#hot .add').on('click',function(e){
			// console.log(this);
			var parent = $(this).closest('li');
			var json = parent.find('textarea').val();
			var id = parent.attr('id');
			var value = localStorage.getItem(id);
			if(value){
				localStorage.setItem(id,JSON.stringify({
					data:json,
					number:JSON.parse(value).number+1
				}));			
				// console.log(JSON.parse(localStorage.getItem(id)))
			}else{
				array.push(id);
				localStorage.arr = array;
				localStorage.setItem(id,JSON.stringify({
					data:json,
					number:1
				}));
			}
		})



		$('#hot .min').on('click',function(e){
		var parent = $(this).closest('li');
				var json = parent.find('textarea').val();
				var id = parent.attr('id');
				var value = localStorage.getItem(id);
				if (value) {
					localStorage.setItem(id, JSON.stringify({
						data: json,
						number: JSON.parse(value).number - 1
					}))
					if (JSON.parse(value).number - 1 == "0") {
						delete localStorage[id]
              			array.pop(id);
              			// console.log(abc);
              			localStorage.arr =array;
					}
				}
			})
	}





  return {
    render:render,
    swiper:swiper,
    getData:getData,
  }

})