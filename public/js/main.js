'use strict';

var site = {
  /****************************************************************
   * utils, helpers, etc
   */
  
  reset: function() {
    $('pre').hide();
    $('#update_section').hide();
    $('.alert').hide().text('');
    $('#find_results').text('');
  },
  setupUpdate: function(data) {
    if (!data) {
      return  $('.alert-danger').text('Could not find that trigger').show();
    }
    var key = Object.keys(data)[0];
    $('#find_results').text(JSON.stringify(data[key], null, 2));
    $('pre').show();
    
    $('#triggerObj').val(JSON.stringify(data));
    $('#triggerText').val(data[key].Returns);
    
    $('#update_section').show();
  },

  /****************************************************************
   * Login page
   */
  login : function() {

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

  },
  /****************************************************************
   * Home page
   */
  home : function() {
 
    $('#submit_find').on('click', function(e){
      e.preventDefault();
      site.reset();
      
      var trig = $('input[name="trigger"]').val();

      $.getJSON( "api/trigger/"+trig, function( data ) {
        site.setupUpdate(data);
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

    var options = {
        valueNames: [ 'trigger' , 'returns', 'author'],
        page : 50,
        plugins: [ ListPagination({}), ListFuzzySearch() ] 
    };

    var triggerList = new List('trigger-list', options);

  },

  /****************************************************************
   * Admin page
   */
  admin : function() {
    var socket = io(location.origin);
    socket.on('log', function (data) {
      var log =  $("#log");
      var currentLog = log.html();
      log.html(currentLog + data);
    });
  }
};

/****************************************************************
 * Init and other functions that should always run
 */

// init the proper page
var route = document.body.id;
if (route && site[route]) {
  site[route]();
}

$("#logout").on('click', function(e){
   e.preventDefault();
   $.ajax({
     url : 'api/logout',
     method: 'POST'
   }).done(function(data) {
     location.href = location.origin;
   });
 });