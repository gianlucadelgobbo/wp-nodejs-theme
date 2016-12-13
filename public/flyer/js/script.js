var $container;
var mySvgPanZoom;
var lastScrollTop = 0;

var onclose_url;
var onclose_title;
function change(state) {
  console.log(state);
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
$(window).load(function(){
  jQuery(".rientro.searchresults").append($("<gcse:searchresults-only></gcse:searchresults-only>"));
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
  })

  $( window ).scroll(function() {
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      if ($('#top-menu').hasClass("navbar-fixed-top") && !$('#mainmenu').hasClass("in")) {
        console.log("rimuovi");
        $('body').removeClass("fixed-top");
        $('#top-menu').removeClass("navbar-fixed-top");
        if (st > 200 && !$('#top-menu').hasClass("navbar-hidden-top")) {
          $('#top-menu').addClass("navbar-hidden-top");
        }
      }
    } else {
      if (!$('#top-menu').hasClass("navbar-fixed-top")) {
        console.log("metti");
        $('body').addClass("fixed-top");
        $('#top-menu').addClass("navbar-fixed-top");
        $('#top-menu').removeClass("navbar-hidden-top");
      }
    }
    if (st>$(window).height() && !$('#top-menu').hasClass("navbar-fixed-top") && $('body').hasClass("expanding")) {
      console.log("metti 2");
      $('#top-menu').addClass("navbar-fixed-top");
      $('body').removeClass("flyer-header-expanding");
    }
    if (st<$(window).height() && $('#top-menu').hasClass("navbar-fixed-top") && $('body').hasClass("expanding")) {
      console.log("rimuovi 2");
      $('#top-menu').removeClass("navbar-fixed-top");
      $('body').addClass("flyer-header-expanding");
    }
    lastScrollTop = st;
  });
  $(".flyer-menu-appear").click(function() {
    if ($('#top-menu').hasClass("flyer-opened")){
      $('#top-menu').removeClass("flyer-opened");
    } else {
      $('#top-menu').addClass("flyer-opened");
    }
    return false;
  });
  $(".flyer-search-opener").click(function() {
    $('.flyer-search-cover').addClass("flyer-search-cover-opened");
    return false;
  });
  $(".flyer-search-close").click(function() {
    $('.flyer-search-cover').removeClass("flyer-search-cover-opened");
    return false;
  });

  $("#container .read-more a").click(function() {
    infiniteScroll(this);
    return false;
  });
  function infiniteScroll(t) {
      var url = t.href;
      $('#container > .read-more a').hide();
      $('#container > .read-more .loading').show();
      $.ajax({
        method: "GET",
        url: url
      }).done(function (msg) {
        console.log(url);
        $("#container > .read-more").html($(msg).find("#container > .read-more").html());
        $("#container .read-more a").click(function() {
          infiniteScroll(this);
          return false;
        });
        $('#container > .read-more .loading').hide();
        var $newItems = $($(msg).find("#container .isotope").html());
        $containerappend = $("#container .isotope").append($newItems);
        $containerappend.imagesLoaded( function(){
          $containerappend.isotope( 'appended', $newItems );
        });
      });
  }
  /*
  $("#loadmore").click(function() {
    $.ajax({
      method: "POST",
      url: "/timeline/" + year + "/",
      data: {ajax: 1}
    }).done(function (msg) {
      $(".timeline").append(msg);
      year--;
      alert("Data Saved: " + msg);
    });
    return false;
  });
  $(".tooltips").tooltip();
  $container = $('.isotope');
  $container.imagesLoaded( function(){
    $container.isotope({
      itemSelector: 'div.isotopeitem',
      masonry: {}
    });
  });
  resetAffix();
  if ($('.svg')) loadMap ();
  if ($('#myAffix .navbar-brand.donttouch').length==0) {
    $('#myAffix').on('affix.bs.affix', function () {
      console.log('Fired!');
      $(".navbar-brand").removeClass( 'visible-xs' );
    } );
    $('#myAffix').on( 'affixed-top.bs.affix', function () {
      console.log('unaff');
      $(".navbar-brand").addClass( 'visible-xs' );
    } );

  }
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });*/
});

/*
$( window ).resize(function() {
  resetAffix();
});
function resetAffix(){
  $('#myAffix').affix({
    offset: {
      top: $('#myHeader').height()
    }
  }); 
}

function loadMap () {
  $(".svg").html("<div class=\"content-padded\">Loading data...</div>");
  var embed = document.createElement('embed');
  embed.setAttribute('style', 'width: 100%; height: 100%;');
  embed.setAttribute('type', 'image/svg+xml');
  $(".svg")
  embed.setAttribute('src', $(".svg").attr('data-img'));
  $(".svg").html("");
  $(".svg").append(embed);

  var eventsHandler;
  
  eventsHandler = {
    haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
    init: function(options) {
      var instance = options.instance
        , initialScale = 1
        , pannedX = 0
        , pannedY = 0
  
      // Init Hammer
      // Listen only for pointer and touch events
      this.hammer = Hammer(options.svgElement, {
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
      })
  
      // Enable pinch
      this.hammer.get('pinch').set({enable: true})
  
      // Handle double tap
      this.hammer.on('doubletap', function(ev){
        instance.zoomIn()
      })
  
      // Handle pan
      this.hammer.on('panstart panmove', function(ev){
        // On pan start reset panned variables
        if (ev.type === 'panstart') {
          pannedX = 0
          pannedY = 0
        }
  
        // Pan only the difference
        instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
        pannedX = ev.deltaX
        pannedY = ev.deltaY
      })
  
      // Handle pinch
      this.hammer.on('pinchstart pinchmove', function(ev){
        // On pinch start remember initial zoom
        if (ev.type === 'pinchstart') {
          initialScale = instance.getZoom()
          instance.zoom(initialScale * ev.scale)
        }
  
        instance.zoom(initialScale * ev.scale)
  
      })
  
      // Prevent moving the page on some devices when panning over SVG
      options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
    },
    destroy: function(){
      this.hammer.destroy()
    }
  }
  
  lastEventListener = function(){
    var panZoom = window.panZoom = svgPanZoom(embed, {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: 1,
      center: 1,
      customEventsHandler: eventsHandler
    });

    $(window).resize(function(){
      panZoom.resize();
      panZoom.fit();
      panZoom.center();
    })
  };
  embed.addEventListener('load', lastEventListener);
}
 */