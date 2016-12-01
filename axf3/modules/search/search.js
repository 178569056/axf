define(
[
  'text!./search.html',
  'css!./search.css'
],
function(html){

  function render(){
	  	$("footer").hide();
	    $('#container').html(html);
		$("ul").eq(0).click(function(){
			window.location.href="#search1";
		})
  }

  return {
    render:render
  }

})