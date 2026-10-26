(function ($) {
  "use strict";

  var nav = $("#mainNav");

  function onScroll() {
    if ($(window).scrollTop() > 50) {
      nav.addClass("navbar-reduce").removeClass("navbar-trans");
    } else {
      nav.addClass("navbar-trans").removeClass("navbar-reduce");
    }

    if ($(window).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  }

  $(window).on("scroll", onScroll);
  onScroll();

  $(".navbar-toggler").on("click", function () {
    if (!$("#mainNav").hasClass("navbar-reduce")) {
      $("#mainNav").addClass("navbar-reduce");
    }
  });

  $(".back-to-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  $(window).on("load", function () {
    $("#preloader").delay(100).fadeOut("slow", function () {
      $(this).remove();
    });
  });
})(jQuery);
