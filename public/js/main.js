'use strict';

$('#submit_login').on('click', function(e){
  e.preventDefault();
  $('.alert').hide().text('');
  
  $.ajax({
    url : 'api/login',
    method: 'POST',
    data: 'code=' + $("#code").val()
  }).done(function(data) {
    console.log(data);
    if (data === 'success') {
      location.href = location.origin;
    } else {
      $('.alert-danger').text('Invalid Password').show();
    }
  });
});

function reset() {
  $('pre').hide();
  $('#update_section').hide();
  $('.alert').hide().text('');
  $('#find_results').text('');
}

function setupUpdate(data) {
  if (!data) {
    return  $('.alert-danger').text('Could not find that trigger').show();
  }
  var key = Object.keys(data)[0];
  $('#find_results').text(JSON.stringify(data[key], null, 2));
  $('pre').show();
  
  $('#triggerObj').val(JSON.stringify(data));
  $('#triggerText').val(data[key].Returns);
  
  $('#update_section').show();
}

$('#submit_find').on('click', function(e){
  e.preventDefault();
  reset();
  
  var trig = $('input[name="trigger"]').val();

  $.getJSON( "api/trigger/"+trig, function( data ) {
    setupUpdate(data);
  });

});

$('#submit_up').on('click', function(e){
  e.preventDefault();
  var trigText = $('#triggerText').val();
  var trigObj = $('#triggerObj').val();
  $('.alert').hide().text('');
  
  $.ajax({
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
      $('.alert-success').text('Successfully updated trigger').show();
    } else {
      $('.alert-danger').text('Error updating trigger').show();
    }
  });

});

$("#logout").on('click', function(e){
   e.preventDefault();
   $.ajax({
     url : 'api/logout',
     method: 'POST'
   }).done(function(data) {
     console.log(data);
     location.href = location.origin;
   });
 });