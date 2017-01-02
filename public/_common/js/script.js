var $container;
var onclose_url;
var onclose_title;

function change(state) {
  if(state === null) { // initial page
    $('#cntModal').modal('hide');
  } else { // page added with pushState
    $("div").text(state.url);
  }
}

$(window).on("popstate", function(e) {
  change(e.originalEvent.state);
});

(function(original) { // overwrite history.pushState so that it also calls
                      // the change function when called
  history.pushState = function(state) {
    change(state);
    return original.apply(this, arguments);
  };
})(history.pushState);

$(function() {
  if (typeof(cx) !== "undefined") {
    jQuery(".rientro  .searchresults").append($("<gcse:searchresults-only></gcse:searchresults-only>"));
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }
  $(".tooltips").tooltip();
  $container = $('.isotope');
  $container.imagesLoaded( function(){
    $container.isotope({
      itemSelector: 'div.isotopeitem',
      masonry: {}
    });
  });
  $(".ajaxloader").click(function() {
    var options = {};
    onclose_url = window.location.href;
    onclose_title = document.title;
    var url = this.href;
    var title = this.title;
    $('#cntModal').modal();
    history.pushState({}, title, url);
    $(document).prop('title',title);
    $( "#cntModal .modal-body" ).load( url+" #result" , function(response) {
      /*console.log($(response).find(".entry-title").html());*/
    });

    return false;
  });
  $('#cntModal').on('hidden.bs.modal', function (e) {
    $( "#cntModal .modal-body" ).html("<div class='loading'>Loading...</div>");
    history.pushState({}, onclose_title, onclose_url);
    $(document).prop('title',onclose_title);
  });
});
