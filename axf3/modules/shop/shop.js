define(
[
  'text!./shop.html',
  'css!./shop.css'
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