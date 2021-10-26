jQuery(document).ready(function( $ ) {

  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 3000
  });
  
  // Initiate the wowjs
  new WOW().init();
  
  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });
  
  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
      
      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });
      
      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });
      
      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }
  
  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {
              
              var top_space = 0;
              
              if( $('#header').length ) {
                top_space = $('#header').outerHeight();
              }
              
              $('html, body').animate({
                  scrollTop: target.offset().top - top_space
              }, 1500, 'easeInOutExpo');

              if ( $(this).parents('.nav-menu').length ) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
              }

              if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
              
              return false;
          }
      }
  });
  
  // Back to top button
  $(window).scroll(function() {

      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
      
  });
  
  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
  });

});


function postToSendMessage(){
    var name = $('#Name').val();
    var email = $('#Email').val();
    var subject = $('#Subject').val();
    var message = $('#Message').val();
    if(name == "" || email == "" || subject == ""){
        alert("Mandatory Field not filled");
        return false;
    }
    
    //validating mobile number
    var filter = /^\d*(?:\.\d{1,2})?$/;
    if (filter.test(subject)) {
        if(subject.length==10){
              if(subject<1000000000){
                  alert("Not a valid Mobile Number");
                  document.getElementById("Subject").value ="";
                  return false;
              }
         } else {
            alert('Please put 10  digit mobile number');
            document.getElementById("Subject").value ="";
            return false;
          }
    }
    else {
      alert('Not a valid number');
      document.getElementById("Subject").value ="";
      return false;
   }
    /*if(pattern.test(mobile)){
        alert("Invalid mobile number");
        return false;
    }}*/
    
    //validating email
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        alert("Not a valid e-mail address");
        document.getElementById("Email").value ="";
        return false;
    }
    
    
    
    $.ajax({
        url : "https://docs.google.com/forms/d/e/1FAIpQLSf1g9lL5uAoxkFBNk7_wmSYhLpFi-BVQtUPNDXz6YGeuTINaA/formResponse",
        data : {"entry.1984542204":name, "entry.1522010132":email, "entry.653681789":subject, "entry.730854699":message},
        type : "POST",
        dataType : "xml",
        statusCode : {
            0 : function() {
                //alert("response successfully added")
                document.getElementById('sendmessage').style.display = "block";
            },
            200 : function() {
                //alert("response successfully added")
                document.getElementById('sendmessage').style.display = "block";
            },
            404 : function() {
                //alert("Error while sending message")
                document.getElementById('errormessage').style.display = "block";
            }
        }
    });
}