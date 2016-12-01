define(
[
  'text!./mine.html',
  'css!./mine.css'
],
function(html){

  function render(){
  	$("footer").show();
    $('#container').html(html);
  }
  return {
    render:render
  }

})