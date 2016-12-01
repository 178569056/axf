require.config({
	paths:{
		'jquery':"lib/jquery",
		'backbone':'lib/backbone',
		'css':'lib/css',
		'text':'lib/text',
		'md5':'lib/md5',
		'underscore':'lib/underscore'
	}
})


require([
	'jquery',
	'backbone'],
	function($, backbone){
		var Router = Backbone.Router.extend({

			routes: {
				"home":                 "homeFun",
				"store":        		"storeFun",
				"order": 				"orderFun",
				"cart": 				"cartFun" ,
				"mine": 				"mineFun" , 
				"indent": 				"indentFun",
				"seckill": 				"seckillFun",
				"position": 			"positionFun",
				"search": 				"searchFun",
				"search1": 				"search1Fun",
				"shop": 				"shopFun",
				"*actions":  			"defaultAction"
			},

			homeFun: function() {
				require(['./modules/home/home.js'],function(home){
					home.render();
					home.swiper();
					home.getData();
				})
			},

			storeFun: function() {
				require(['./modules/store/store.js'],function(store){
					store.render();
					store.getData();
					store.click();
				})
			},

			orderFun: function() {
				require(['./modules/order/order.js'],function(order){
					order.render();
					order.getData();
				})
			},

			cartFun: function() {
				require(['./modules/cart/cart.js'],function(cart){
					cart.render();
				})
			},

			mineFun: function() {
				require(['./modules/mine/mine.js'],function(mine){
					mine.render();
				})
			},

			indentFun: function() {
				require(['./modules/indent/indent.js'],function(indent){
					indent.render();
				})
			},

			seckillFun: function() {
				require(['./modules/seckill/seckill.js'],function(seckill){
					seckill.render();
					seckill.getData();
				})
			},

			positionFun: function() {
				require(['./modules/position/position.js'],function(position){
					position.render();
				})
			},
			searchFun: function() {
				require(['./modules/search/search.js'],function(search){
					search.render();
				})
			},
			search1Fun: function() {
				require(['./modules/search1/search1.js'],function(search1){
					search1.render();
				})
			},
			shopFun: function() {
				require(['./modules/shop/shop.js'],function(shop){
					shop.render();
				})
			},

			defaultAction:function(){
				location.hash = "position";
			}
		});
		var router = new Router();

		Backbone.history.start();



		$("footer a").on("click", function(){
			var target = $(this).find("p").html();
			switch(target){
				case "首页" :
					$("footer a").find("img").eq(0).attr("src","images/ft11.png");
					$("footer a").find("img").eq(1).attr("src","images/ft2.png");
					$("footer a").find("img").eq(2).attr("src","images/ft3.png");
					$("footer a").find("img").eq(3).attr("src","images/ft4.png");
					$("footer a").find("img").eq(4).attr("src","images/ft5.png");
					break;
				case "闪送超市" :
					$("footer a").find("img").eq(0).attr("src","images/ft1.png");
					$("footer a").find("img").eq(1).attr("src","images/ft12.png");
					$("footer a").find("img").eq(2).attr("src","images/ft3.png");
					$("footer a").find("img").eq(3).attr("src","images/ft4.png");
					$("footer a").find("img").eq(4).attr("src","images/ft5.png");
					break;
				case "新鲜预定" :
					$("footer a").find("img").eq(0).attr("src","images/ft1.png");
					$("footer a").find("img").eq(1).attr("src","images/ft2.png");
					$("footer a").find("img").eq(2).attr("src","images/ft13.png");
					$("footer a").find("img").eq(3).attr("src","images/ft4.png");
					$("footer a").find("img").eq(4).attr("src","images/ft5.png");
					break;
				case "购物车" :
					$("footer a").find("img").eq(0).attr("src","images/ft1.png");
					$("footer a").find("img").eq(1).attr("src","images/ft2.png");
					$("footer a").find("img").eq(2).attr("src","images/ft3.png");
					$("footer a").find("img").eq(3).attr("src","images/ft14.png");
					$("footer a").find("img").eq(4).attr("src","images/ft5.png");
					break;
				case "我的" :
					$("footer a").find("img").eq(0).attr("src","images/ft1.png");
					$("footer a").find("img").eq(1).attr("src","images/ft2.png");
					$("footer a").find("img").eq(2).attr("src","images/ft3.png");
					$("footer a").find("img").eq(3).attr("src","images/ft4.png");
					$("footer a").find("img").eq(4).attr("src","images/ft15.png");
					break;
			};

			$(this).find("img").addClass("an");
			$(this).parent().siblings("div").find("img").removeClass("an");

			
		})
	})