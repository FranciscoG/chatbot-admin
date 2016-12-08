$('#submit').on('click', function(e){
  e.preventDefault();
  var jqxhr = $.ajax({
    url : 'api/login',
    method: 'POST',
    data: 'code=' + $("#code").val()
  }).done(function(data) {
    if (data === 'success') {
      location.href = location.origin;
    }
  });
});

function setupUpdate(data) {
  var key = Object.keys(data)[0];
  $('#find_results').text(JSON.stringify(data, null, 2));
  
  $('#triggerObj').val(JSON.stringify(data));
  $('#triggerText').val(data[key].Returns);
  
  $('#update_section').show();
}

$('#submit_find').on('click', function(e){
  e.preventDefault();
  var trig = $('input[name="trigger"]').val();

  $.getJSON( "api/trigger/"+trig, function( data ) {
    setupUpdate(data);
  });

});

$('#submit_up').on('click', function(e){
  e.preventDefault();
  var trigText = $('#triggerText').val();
  var trigObj = $('#triggerObj').val();
  
  var jqxhr = $.ajax({
    url : 'api/trigger/update',
    method: 'POST',
    data: {
      triggerText : trigText,
      triggerObj :trigObj
    }
  }).done(function(data) {
    console.log(data);
    if (data === 'success') {
      $('#trigObj').text(data);
    }
  });

});