define(
[
  'text!./search1.html',
  'css!./search1.css'
],
function(html){

  function render(){
	  	$("footer").hide();
	    $('#container').html(html);
  }

  return {
    render:render
  }

})