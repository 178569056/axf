define(
[
  'text!./order.html',
  'css!./order.css'
],
function(html){

  function render(){
  	$("footer").show();
    $('#container').html(html);
  }

  function getData(){
  	$("#orderlist").load("tem/beeorder.html", function() {
  		sendRequest('get', 'data/order.json', true, {}, show1);
  		function show1(data) {
  			var html1 = baidu.template('orderlist1', data);
  			$('#orderlist').html(html1);
  		};
  	});
  }

  return {
    render:render,
    getData:getData
  }

})