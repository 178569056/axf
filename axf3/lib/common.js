//封装兼容低版本IE浏览器的xhr创建函数ie低版本支持参数："MSXML.XMLHttp.6.0","MSXML.XMLHttp.3.0","MSXML.XMLHttp"
		function createXhr(){
			if(typeof XMLHttpRequest !="undefined"){
				return new XMLHttpRequest();
			}else if(typeof ActiveXObject != "undefined"){
				//低版本IE使用ActiveXObject 传参方式创建xhr对象，主要支持一下参数
				var strList = ["MSXML.XMLHttp.6.0","MSXML.XMLHttp.3.0","MSXML.XMLHttp"];
				var tmp = "";
				for(var n in strList){
					//异常处理， try 中的代码出现异常会执行catch中的代码，而不会影响到外部后续代码执行
					try{
						new ActiveXObject(strList[n]);
						var tmp = n;
						break;
					}catch(e){
						console.log(e);
					}
				}
				if(tmp = ""){
					console.log("您的浏览器目前不支持ajax请求！！");
				}else{
				return new ActiveXObject(tmp);
			}
		}else{
			console.log("您的浏览器目前不支持ajax请求！！");
			}
		}

		/*
		封装公共请求函数
		type : get/post
		url : 请求路径
		isSyn : true 异步， false 同步
		data: 上送参数对象
		callback： 回调函数
		*/
		function sendRequest(type, url, isSyn, data, callback){
			//创建请求对象
			var xhr= createXhr();
			//绑定readyState监听事件
			xhr.onreadystatechange=function(){

				if(xhr.status == "200" ||xhr.status =="304"){
					if(xhr.readyState =="4"){
						//JSON.parse(); 
						callback && callback(JSON.parse(xhr.responseText));
					}
				}
			}
			if(type == "get"){
				url +="?";
				for(n in data){
					url += (n+"="+data[n]+"&");
				}
				url = url.substr(0,url.length-1);
			}else{
				data = JSON.stringify(data);
			}

			xhr.open(type, url, isSyn);

			xhr.send(type == "get"?null:data);
		}
		