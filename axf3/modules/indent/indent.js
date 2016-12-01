define(
[
  'text!./indent.html',
  'css!./indent.css'
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