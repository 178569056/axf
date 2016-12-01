define(
[
  'text!./seckill.html',
  'css!./seckill.css'
],
function(html){

  function render(){
	  	$("footer").hide();
	    $('#container').html(html);
	   
  }

   function getData(){
    $("#kill").load("tem/beekill.html", function() {
      sendRequest('get', 'data/seckill.json', true, {}, show1);
      function show1(data) {
        var html1 = baidu.template('kill1', data);
        $('#kill').html(html1);
      };
    });
  }

  return {
    render:render,
    getData:getData
  }

})