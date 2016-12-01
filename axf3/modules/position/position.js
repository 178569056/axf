define(
[
  'text!./position.html',
  'css!./position.css'
],
function(html){

  function render(){
  	$("footer").hide();
    $('#container').html(html);
	function delayer(){ 
		window.location.href="#home";
	}
	setTimeout(delayer, 3000);
  }
  return {
    render:render
  }

})