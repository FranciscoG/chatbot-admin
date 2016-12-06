$('#submit').on('click', function(e){
  e.preventDefault();
  var jqxhr = $.ajax({
    url : 'login',
    method: 'POST',
    data: 'code=' + $("#code").val()
  }).done(function(data) {
    console.log(data);
  });
   

});