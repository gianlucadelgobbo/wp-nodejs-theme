! function(a) {
  "use strict";

  function b() {
    edgtf.scroll = a(window).scrollTop(), edgtf.body.hasClass("edgtf-dark-header") && (edgtf.defaultHeaderStyle = "edgtf-dark-header"), edgtf.body.hasClass("edgtf-light-header") && (edgtf.defaultHeaderStyle = "edgtf-light-header")
  }

  function c() {}

  function d() {
    edgtf.windowWidth = a(window).width(), edgtf.windowHeight = a(window).height()
  }

  function e() {
    edgtf.scroll = a(window).scrollTop()
  }
  switch (window.edgtf = {}, edgtf.modules = {}, edgtf.scroll = 0, edgtf.window = a(window), edgtf.document = a(document), edgtf.windowWidth = a(window).width(), edgtf.windowHeight = a(window).height(), edgtf.body = a("body"), edgtf.html = a("html, body"), edgtf.htmlEl = a("html"), edgtf.menuDropdownHeightSet = !1, edgtf.defaultHeaderStyle = "", edgtf.minVideoWidth = 1500, edgtf.videoWidthOriginal = 1280, edgtf.videoHeightOriginal = 720, edgtf.videoRatio = 1280 / 720, edgtf.passepartoutTop = edgtfPerPageVars.vars.edgtfPassepartout, edgtf.passepartoutBottom = edgtfPerPageVars.vars.edgtfPassepartout, edgtf.passepartout = edgtf.passepartoutTop + edgtf.passepartoutBottom, edgtf.edgtfOnDocumentReady = b, edgtf.edgtfOnWindowLoad = c, edgtf.edgtfOnWindowResize = d, edgtf.edgtfOnWindowScroll = e, a(document).ready(b), a(window).load(c), a(window).resize(d), a(window).scroll(e), !0) {
    case edgtf.body.hasClass("edgtf-grid-1300"):
      edgtf.boxedLayoutWidth = 1350;
      break;
    case edgtf.body.hasClass("edgtf-grid-1200"):
      edgtf.boxedLayoutWidth = 1250;
      break;
    case edgtf.body.hasClass("edgtf-grid-1000"):
      edgtf.boxedLayoutWidth = 1050;
      break;
    case edgtf.body.hasClass("edgtf-grid-800"):
      edgtf.boxedLayoutWidth = 850;
      break;
    default:
      edgtf.boxedLayoutWidth = 1150
  }
}(jQuery),
  function(a) {
    "use strict";

    function b() {
      C(), f(), g(), h(), j(), k(), E().init(), o(), p(), q(), i(), w(), x(), A(), z()
    }

    function c() {
      l(), n(), B(), m()
    }

    function d() {
      p(), x()
    }

    function e() {}

    function f() {
      Modernizr.touch && !edgtf.body.hasClass("edgtf-no-animations-on-touch") && edgtf.body.addClass("edgtf-no-animations-on-touch")
    }

    function g() {
      var a = navigator.appVersion.toLowerCase();
      a.indexOf("mac") > -1 && edgtf.body.hasClass("edgtf-smooth-scroll") && edgtf.body.removeClass("edgtf-smooth-scroll")
    }

    function h() {
      fluidvids.init({
        selector: ["iframe"],
        players: ["www.youtube.com", "player.vimeo.com"]
      })
    }

    function i() {
      var b = a(".edgtf-slick-slider:not(.slick-initialized)");
      b.length && b.each(function() {
        var b, c = a(this);
        c.on("init", function(d) {
          b = c.find(".slick-slide"), b.each(function() {
            var b = a(this),
              c = 0;
            b.on("mousedown", function() {
              c = 0
            }), b.on("mousemove", function() {
              c = 1
            }), b.on("mouseup", function(a) {
              0 === c ? edgtf.modules.common.edgtfPrettyPhoto() : 1 === c && b.find('a[data-rel^="prettyPhoto"]').unbind("click")
            })
          })
        }), c.slick({
          infinite: !0,
          autoplay: !0,
          slidesToShow: 1,
          arrows: !0,
          dots: !1,
          adaptiveHeight: !0,
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="lnr lnr-chevron-right"></span></span>'
        })
      })
    }

    function j() {
      a(".edgtf-preload-background").each(function() {
        var b = a(this);
        if ("" !== b.css("background-image") && "none" != b.css("background-image")) {
          var c = b.attr("style");
          if (c = c.match(/url\(["']?([^'")]+)['"]?\)/), c = c ? c[1] : "") {
            var d = new Image;
            d.src = c, a(d).load(function() {
              b.removeClass("edgtf-preload-background")
            })
          }
        } else a(window).load(function() {
          b.removeClass("edgtf-preload-background")
        })
      })
    }

    function k() {
      var b = '<div class="pp_pic_holder">                         <div class="ppt">&nbsp;</div>                         <div class="pp_top">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                         <div class="pp_content_container">                             <div class="pp_left">                             <div class="pp_right">                                 <div class="pp_content">                                     <div class="pp_loaderIcon"></div>                                     <div class="pp_fade">                                         <a href="#" class="pp_expand" title="Expand the image">Expand</a>                                         <div class="pp_hoverContainer">                                             <a class="pp_next" href="#"><span class="lnr lnr-chevron-right"></span></a>                                             <a class="pp_previous" href="#"><span class="lnr lnr-chevron-left"></span></a>                                         </div>                                         <div id="pp_full_res"></div>                                         <div class="pp_details">                                             <div class="pp_nav">                                                 <a href="#" class="pp_arrow_previous">Previous</a>                                                 <p class="currentTextHolder">0/0</p>                                                 <a href="#" class="pp_arrow_next">Next</a>                                             </div>                                             <p class="pp_description"></p>                                             {pp_social}                                             <a class="pp_close" href="#">Close</a>                                         </div>                                     </div>                                 </div>                             </div>                             </div>                         </div>                         <div class="pp_bottom">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                     </div>                     <div class="pp_overlay"></div>';
      a("a[data-rel^='prettyPhoto']").prettyPhoto({
        hook: "data-rel",
        animation_speed: "normal",
        slideshow: !1,
        autoplay_slideshow: !1,
        opacity: .8,
        show_title: !0,
        allow_resize: !0,
        horizontal_padding: 0,
        default_width: 960,
        default_height: 540,
        counter_separator_label: "/",
        theme: "pp_default",
        hideflash: !1,
        wmode: "opaque",
        autoplay: !0,
        modal: !1,
        overlay_gallery: !1,
        keyboard_shortcuts: !0,
        deeplinking: !1,
        custom_markup: "",
        social_tools: !1,
        markup: b
      })
    }

    function l() {
      if (a("[data-edgtf_header_style]").length > 0 && edgtf.body.hasClass("edgtf-header-style-on-scroll")) {
        var b = a(".wpb_row.edgtf-section"),
          c = function(a) {
            void 0 !== a.data("edgtf_header_style") ? edgtf.body.removeClass("edgtf-dark-header edgtf-light-header").addClass(a.data("edgtf_header_style")) : edgtf.body.removeClass("edgtf-dark-header edgtf-light-header").addClass("" + edgtf.defaultHeaderStyle)
          };
        b.waypoint(function(b) {
          "down" === b && c(a(this.element))
        }, {
          offset: 0
        }), b.waypoint(function(b) {
          "up" === b && c(a(this.element))
        }, {
          offset: function() {
            return -a(this.element).outerHeight()
          }
        })
      }
    }

    function m() {
      var b, c, d = a(".edgtf-no-animations-on-touch"),
        e = !0,
        f = a(".edgtf-grow-in, .edgtf-fade-in,  .edgtf-fade-in-down, .edgtf-fade-in-up, .edgtf-fade-in-left, .edgtf-fade-in-right, .edgtf-element-from-fade, .edgtf-element-from-left, .edgtf-element-from-right, .edgtf-element-from-top, .edgtf-element-from-bottom");
      d.length && (e = !1), f.length > 0 && e && f.each(function() {
        a(this).appear(function() {
          c = a(this).data("animation"), "undefined" != typeof c && "" !== c && (b = c, a(this).addClass(b + "-on"))
        }, {
          accX: 0,
          accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
        })
      })
    }

    function n() {
      a(".edgtf-parallax-section-holder").length && a(".edgtf-parallax-section-holder").each(function() {
        var b = a(this);
        b.hasClass("edgtf-full-screen-height-parallax") && (b.height(edgtf.windowHeight), b.find(".edgtf-parallax-content-outer").css("padding", 0));
        var c = .4 * b.data("edgtf-parallax-speed");
        b.parallax("50%", c)
      })
    }

    function o() {
      a(".edgtf-section .edgtf-video-wrap .edgtf-video").mediaelementplayer({
        enableKeyboard: !1,
        iPadUseNativeControls: !1,
        pauseOtherPlayers: !1,
        iPhoneUseNativeControls: !1,
        AndroidUseNativeControls: !1
      }), navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/) && (p(), a(".edgtf-section .edgtf-mobile-video-image").show(), a(".edgtf-section .edgtf-video-wrap").remove())
    }

    function p() {
      a(".edgtf-section .edgtf-video-wrap").each(function() {
        var b = a(this),
          c = b.closest(".edgtf-section").outerWidth();
        b.width(c);
        var d = b.closest(".edgtf-section").outerHeight();
        edgtf.minVideoWidth = edgtf.videoRatio * (d + 20), b.height(d);
        var e = c / edgtf.videoWidthOriginal,
          f = d / edgtf.videoHeightOriginal,
          g = f;
        e > f && (g = e), g * edgtf.videoWidthOriginal < edgtf.minVideoWidth && (g = edgtf.minVideoWidth / edgtf.videoWidthOriginal), b.find("video, .mejs-overlay, .mejs-poster").width(Math.ceil(g * edgtf.videoWidthOriginal + 2)), b.find("video, .mejs-overlay, .mejs-poster").height(Math.ceil(g * edgtf.videoHeightOriginal + 2)), b.scrollLeft((b.find("video").width() - c) / 2), b.find(".mejs-overlay, .mejs-poster").scrollTop((b.find("video").height() - d) / 2), b.scrollTop((b.find("video").height() - d) / 2)
      })
    }

    function q() {
      var b = a(".edgtf-footer-uncover");
      b.length && a(".edgtf-content").css("margin-bottom", a(".edgtf-footer-inner").height())
    }

    function r() {
      window.addEventListener && window.addEventListener("DOMMouseScroll", t, !1), window.onmousewheel = document.onmousewheel = t, document.onkeydown = u, edgtf.body.hasClass("edgtf-smooth-scroll") && (window.removeEventListener("mousewheel", smoothScrollListener, !1), window.removeEventListener("DOMMouseScroll", smoothScrollListener, !1))
    }

    function s() {
      window.removeEventListener && window.removeEventListener("DOMMouseScroll", t, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null, edgtf.body.hasClass("edgtf-smooth-scroll") && (window.addEventListener("mousewheel", smoothScrollListener, !1), window.addEventListener("DOMMouseScroll", smoothScrollListener, !1))
    }

    function t(a) {
      v(a)
    }

    function u(a) {
      for (var b = [37, 38, 39, 40], c = b.length; c--;)
        if (a.keyCode === b[c]) return void v(a)
    }

    function v(a) {
      a = a || window.event, a.preventDefault && a.preventDefault(), a.returnValue = !1
    }

    function w() {
      var b = a(".edgtf-self-hosted-video");
      b.mediaelementplayer({
        audioWidth: "100%"
      })
    }

    function x() {
      a(".edgtf-self-hosted-video-holder .edgtf-video-wrap").each(function() {
        var b = a(this),
          c = b.closest(".edgtf-self-hosted-video-holder").outerWidth(),
          d = c / edgtf.videoRatio;
        navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/) && (b.parent().width(c), b.parent().height(d)), b.width(c), b.height(d), b.find("video, .mejs-overlay, .mejs-poster").width(c), b.find("video, .mejs-overlay, .mejs-poster").height(d)
      })
    }

    function y(b) {
      var c = a("#edgtf-back-to-top");
      c.removeClass("off on"), "on" === b ? c.addClass("on") : c.addClass("off")
    }

    function z() {
      edgtf.window.scroll(function() {
        var b, c = a(this).scrollTop(),
          d = a(this).height();
        b = c > 0 ? c + d / 2 : 1, y(b < 1e3 ? "off" : "on")
      })
    }

    function A() {
      var b = a("#edgtf-back-to-top"),
        c = a("footer"),
        d = a(".edgtf-content-bottom"),
        e = 0;
      d.length && (e = d.outerHeight()), b.on("click", function(a) {
        a.preventDefault(), edgtf.html.animate({
          scrollTop: 0
        }, edgtf.window.scrollTop() / 3, "easeInOutQuint")
      }), c.length && a(window).scroll(function() {
        var d = c.offset().top - a(window).scrollTop() - edgtf.windowHeight - e - b.height() / 2;
        d < 0 ? b.addClass("edgtf-light") : b.removeClass("edgtf-light")
      })
    }

    function B() {
      var b = a("body > .edgtf-smooth-transition-loader.edgtf-mimic-ajax");
      b.length && (b.find(".edgtf-st-loader1").animate({
        opacity: 0
      }, function() {
        b.slideUp(1200, "easeInOutQuint")
      }), a(window).bind("pageshow", function(a) {
        a.originalEvent.persisted && b.find(".edgtf-st-loader1").animate({
          opacity: 0
        }, function() {
          b.slideUp(1200, "easeInOutQuint")
        })
      }), a("a").click(function(c) {
        var d = a(this);
        !(1 == c.which && d.attr("href").indexOf(window.location.host) >= 0 && "undefined" == typeof d.data("rel") && "undefined" == typeof d.attr("rel")) || d.hasClass("edgtf-like") || d.parent().hasClass("edgtf-blog-load-more-button") || d.parents(".edgtf-single-product-images") || "undefined" != typeof d.attr("target") && "_self" !== d.attr("target") || d.attr("href").split("#")[0] === window.location.href.split("#")[0] || (c.preventDefault(), b.addClass("edgtf-hide-spinner"), b.fadeIn(500, function() {
          window.location = d.attr("href")
        }))
      }))
    }

    function C() {
      var b = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        c = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
      b && edgtf.body.addClass("edgtf-chrome"), c && edgtf.body.addClass("edgtf-safari"), a.browser.msie && parseInt(a.browser.version, 10) > 8 && edgtf.body.addClass("edgtf-ms-explorer-9-10")
    }
    var D = {};
    edgtf.modules.common = D, D.edgtfIsTouchDevice = f, D.edgtfDisableSmoothScrollForMac = g, D.edgtfFluidVideo = h, D.edgtfPreloadBackgrounds = j, D.edgtfPrettyPhoto = k, D.edgtfCheckHeaderStyleOnScroll = l, D.edgtfInitParallax = n, D.edgtfEnableScroll = s, D.edgtfDisableScroll = r, D.edgtfWheel = t, D.edgtfKeydown = u, D.edgtfPreventDefaultValue = v, D.edgtfSlickSlider = i, D.edgtfInitSelfHostedVideoPlayer = w, D.edgtfSelfHostedVideoSize = x, D.edgtfInitBackToTop = A, D.edgtfBackButtonShowHide = z, D.edgtfSmoothTransition = B, D.edgtfOnDocumentReady = b, D.edgtfOnWindowLoad = c, D.edgtfOnWindowResize = d, D.edgtfOnWindowScroll = e, a(document).ready(b), a(window).load(c), a(window).resize(d), a(window).scroll(e);
    var E = edgtf.modules.common.edgtfInitAnchor = function() {
      var b = function(b) {
          a(".edgtf-main-menu .edgtf-active-item, .edgtf-mobile-nav .edgtf-active-item, .edgtf-vertical-menu .edgtf-active-item, .edgtf-fullscreen-menu .edgtf-active-item").removeClass("edgtf-active-item"), b.parent().addClass("edgtf-active-item"), a(".edgtf-main-menu a, .edgtf-mobile-nav a, .edgtf-vertical-menu a, .edgtf-fullscreen-menu a").removeClass("current"), b.addClass("current")
        },
        c = function() {
          a("[data-edgtf-anchor]").waypoint(function(c) {
            "down" === c && b(a("a[href='" + window.location.href.split("#")[0] + "#" + a(this.element).data("edgtf-anchor") + "']"))
          }, {
            offset: "50%"
          }), a("[data-edgtf-anchor]").waypoint(function(c) {
            "up" === c && b(a("a[href='" + window.location.href.split("#")[0] + "#" + a(this.element).data("edgtf-anchor") + "']"))
          }, {
            offset: function() {
              return -(a(this.element).outerHeight() - 150)
            }
          })
        },
        d = function() {
          var b = window.location.hash.split("#")[1];
          if ("" !== b && a('[data-edgtf-anchor="' + b + '"]').length > 0) {
            var c = window.location.href.split("#")[0] + "#" + b;
            if (a("a[href='" + c + "']").length) a("a[href='" + c + "']").trigger("click");
            else {
              var d = a("<a/>").attr({
                href: c,
                class: "edgtf-anchor"
              }).appendTo("body");
              d.trigger("click")
            }
          }
        },
        e = function(a) {
          "edgtf-sticky-header-on-scroll-down-up" == edgtf.modules.header.behaviour && (a > edgtf.modules.header.stickyAppearAmount ? edgtf.modules.header.isStickyVisible = !0 : edgtf.modules.header.isStickyVisible = !1), "edgtf-sticky-header-on-scroll-up" == edgtf.modules.header.behaviour && (a > edgtf.scroll ? edgtf.modules.header.isStickyVisible = !1 : "");
          var b = edgtf.modules.header.isStickyVisible ? edgtfGlobalVars.vars.edgtfStickyHeaderTransparencyHeight : edgtfPerPageVars.vars.edgtfHeaderTransparencyHeight;
          return b
        },
        f = function() {
          edgtf.document.on("click", ".edgtf-main-menu a, .edgtf-vertical-menu a, .edgtf-fullscreen-menu a, .edgtf-btn, .edgtf-anchor, .edgtf-mobile-nav a", function() {
            var c, d = a(this),
              f = d.prop("hash").split("#")[1];
            if ("" !== f && a('[data-edgtf-anchor="' + f + '"]').length > 0) {
              var g = a('[data-edgtf-anchor="' + f + '"]').offset().top;
              return c = a('[data-edgtf-anchor="' + f + '"]').offset().top - e(g), b(d), edgtf.html.stop().animate({
                scrollTop: Math.round(c)
              }, 1e3, function() {
                history.pushState && history.pushState(null, null, "#" + f)
              }), !1
            }
          })
        };
      return {
        init: function() {
          a("[data-edgtf-anchor]").length && (f(), c(), a(window).load(function() {
            d()
          }))
        }
      }
    }
  }(jQuery),
  function(a) {
    "use strict";

    function b() {
      f(), g(), h(), i(), j(), k(), l(), m(), n(), q().init(), o()
    }

    function c() {
      l(), m()
    }

    function d() {
      m()
    }

    function e() {}

    function f() {
      var b, c = a(".edgtf-page-header"),
        d = a(".edgtf-sticky-header"),
        e = a(".edgtf-fixed-wrapper"),
        f = a(".edgtf-page-header").find(".edgtf-fixed-wrapper").length ? a(".edgtf-page-header").find(".edgtf-fixed-wrapper").offset().top : null;
      switch (!0) {
        case edgtf.body.hasClass("edgtf-sticky-header-on-scroll-up"):
          edgtf.modules.header.behaviour = "edgtf-sticky-header-on-scroll-up";
          var g = a(document).scrollTop();
          b = edgtfGlobalVars.vars.edgtfTopBarHeight + edgtfGlobalVars.vars.edgtfLogoAreaHeight + edgtfGlobalVars.vars.edgtfMenuAreaHeight + edgtfGlobalVars.vars.edgtfStickyHeaderHeight;
          var h = function() {
            var c = a(document).scrollTop();
            c > g && c > b || c < b ? (edgtf.modules.header.isStickyVisible = !1, d.removeClass("header-appear").find(".edgtf-main-menu .edgtf-menu-second").removeClass("edgtf-drop-down-start")) : (edgtf.modules.header.isStickyVisible = !0, d.addClass("header-appear")), g = a(document).scrollTop()
          };
          h(), a(window).scroll(function() {
            h()
          });
          break;
        case edgtf.body.hasClass("edgtf-sticky-header-on-scroll-down-up"):
          edgtf.modules.header.behaviour = "edgtf-sticky-header-on-scroll-down-up", 0 !== edgtfPerPageVars.vars.edgtfStickyScrollAmount ? edgtf.modules.header.stickyAppearAmount = edgtfPerPageVars.vars.edgtfStickyScrollAmount : edgtf.modules.header.stickyAppearAmount = 0 !== edgtfGlobalVars.vars.edgtfStickyScrollAmount ? edgtfGlobalVars.vars.edgtfStickyScrollAmount : edgtfGlobalVars.vars.edgtfTopBarHeight + edgtfGlobalVars.vars.edgtfLogoAreaHeight + edgtfGlobalVars.vars.edgtfMenuAreaHeight;
          var h = function() {
            edgtf.scroll < edgtf.modules.header.stickyAppearAmount ? (edgtf.modules.header.isStickyVisible = !1, d.removeClass("header-appear").find(".edgtf-main-menu .edgtf-menu-second").removeClass("edgtf-drop-down-start")) : (edgtf.modules.header.isStickyVisible = !0, d.addClass("header-appear"))
          };
          h(), a(window).scroll(function() {
            h()
          });
          break;
        case edgtf.body.hasClass("edgtf-fixed-on-scroll"):
          edgtf.modules.header.behaviour = "edgtf-fixed-on-scroll";
          var i = function() {
            edgtf.scroll <= f ? (e.removeClass("fixed"), c.css("margin-bottom", 0)) : (e.addClass("fixed"), c.css("margin-bottom", e.height()))
          };
          i(), a(window).scroll(function() {
            i()
          })
      }
    }

    function g() {
      var b, c = a(".edgtf-wrapper"),
        d = a(".edgtf-side-menu"),
        e = a("a.edgtf-side-menu-button-opener"),
        f = !1,
        g = !1,
        h = !1;
      edgtf.body.hasClass("edgtf-side-menu-slide-from-right") ? (a(".edgtf-cover").remove(), b = "edgtf-right-side-menu-opened", c.prepend('<div class="edgtf-cover"/>'), f = !0) : edgtf.body.hasClass("edgtf-side-menu-slide-with-content") ? (b = "edgtf-side-menu-open", g = !0) : edgtf.body.hasClass("edgtf-side-area-uncovered-from-content") && (b = "edgtf-right-side-menu-opened", h = !0), a("a.edgtf-side-menu-button-opener, a.edgtf-close-side-menu").click(function(i) {
        if (i.preventDefault(), e.hasClass("opened")) {
          if (e.removeClass("opened"), edgtf.body.removeClass(b), h) var j = setTimeout(function() {
            d.css({
              visibility: "hidden"
            }), clearTimeout(j)
          }, 400)
        } else {
          e.addClass("opened"), edgtf.body.addClass(b), f && a(".edgtf-wrapper .edgtf-cover").click(function() {
            edgtf.body.removeClass("edgtf-right-side-menu-opened"), e.removeClass("opened")
          }), h && d.css({
            visibility: "visible"
          });
          var k = a(window).scrollTop();
          a(window).scroll(function() {
            if (Math.abs(edgtf.scroll - k) > 400 && (edgtf.body.removeClass(b), e.removeClass("opened"), h)) var a = setTimeout(function() {
              d.css({
                visibility: "hidden"
              }), clearTimeout(a)
            }, 400)
          })
        }
        g && (i.stopPropagation(), c.click(function() {
          i.preventDefault(), e.removeClass("opened"), edgtf.body.removeClass("edgtf-side-menu-open")
        }))
      })
    }

    function h() {
      var b = a(".edgtf-side-menu");
      b.length && b.niceScroll({
        scrollspeed: 60,
        mousescrollstep: 40,
        cursorwidth: 0,
        cursorborder: 0,
        cursorborderradius: 0,
        cursorcolor: "transparent",
        autohidemode: !1,
        horizrailenabled: !1
      })
    }

    function i() {
      if (a("a.edgtf-fullscreen-menu-opener").length) {
        var b, c = a("a.edgtf-fullscreen-menu-opener"),
          d = a(".edgtf-fullscreen-menu-holder-outer"),
          e = !1,
          f = !1,
          g = a(".edgtf-fullscreen-above-menu-widget-holder"),
          h = a(".edgtf-fullscreen-below-menu-widget-holder"),
          i = a(".edgtf-fullscreen-menu-holder-outer nav > ul > li > a"),
          j = a(".edgtf-fullscreen-menu > ul li.edgtf-has-sub > a"),
          k = a(".edgtf-fullscreen-menu ul li:not(.edgtf-has-sub) a");
        d.height(edgtf.windowHeight).niceScroll({
          scrollspeed: 30,
          mousescrollstep: 20,
          cursorwidth: 0,
          cursorborder: 0,
          cursorborderradius: 0,
          cursorcolor: "transparent",
          autohidemode: !1,
          horizrailenabled: !1
        }), a(window).resize(function() {
          d.height(edgtf.windowHeight)
        }), edgtf.body.hasClass("edgtf-fade-push-text-right") ? (b = "edgtf-push-nav-right", e = !0) : edgtf.body.hasClass("edgtf-fade-push-text-top") && (b = "edgtf-push-text-top", f = !0), (e || f) && (g.length && g.children().css({
          "-webkit-animation-delay": "0ms",
          "-moz-animation-delay": "0ms",
          "animation-delay": "0ms"
        }), i.each(function(b) {
          a(this).css({
            "-webkit-animation-delay": 70 * (b + 1) + "ms",
            "-moz-animation-delay": 70 * (b + 1) + "ms",
            "animation-delay": 70 * (b + 1) + "ms"
          })
        }), h.length && h.children().css({
          "-webkit-animation-delay": 70 * (i.length + 1) + "ms",
          "-moz-animation-delay": 70 * (i.length + 1) + "ms",
          "animation-delay": 70 * (i.length + 1) + "ms"
        })), c.on("click", function(d) {
          d.preventDefault(), c.hasClass("opened") ? (c.removeClass("opened"), edgtf.body.removeClass("edgtf-fullscreen-menu-opened"), edgtf.body.removeClass("edgtf-fullscreen-fade-in").addClass("edgtf-fullscreen-fade-out"), edgtf.body.addClass(b), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfEnableScroll(), a("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function() {
            a("nav.popup_menu").getNiceScroll().resize()
          })) : (c.addClass("opened"), edgtf.body.addClass("edgtf-fullscreen-menu-opened"), edgtf.body.removeClass("edgtf-fullscreen-fade-out").addClass("edgtf-fullscreen-fade-in"), edgtf.body.removeClass(b), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfDisableScroll(), a(document).keyup(function(d) {
            27 == d.keyCode && (c.removeClass("opened"), edgtf.body.removeClass("edgtf-fullscreen-menu-opened"), edgtf.body.removeClass("edgtf-fullscreen-fade-in").addClass("edgtf-fullscreen-fade-out"), edgtf.body.addClass(b), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfEnableScroll(), a("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function() {
              a("nav.popup_menu").getNiceScroll().resize()
            }))
          }))
        }), j.on("tap click", function(b) {
          if (b.preventDefault(), a(this).parent().hasClass("edgtf-has-sub")) {
            var c = a(this).parent().find("> ul.sub_menu");
            c.is(":visible") ? (c.slideUp(200, function() {
              d.getNiceScroll().resize()
            }), a(this).parent().removeClass("open_sub")) : (a(this).parent().siblings().hasClass("open_sub") && a(this).parent().siblings().each(function() {
              var b = a(this);
              if (b.hasClass("open_sub")) {
                var c = b.find("> ul.sub_menu");
                c.slideUp(200, function() {
                  d.getNiceScroll().resize()
                }), b.removeClass("open_sub")
              }
              if (b.find(".open_sub")) {
                var e = b.find(".open_sub").find("> ul.sub_menu");
                e.slideUp(200, function() {
                  d.getNiceScroll().resize()
                }), b.find(".open_sub").removeClass("open_sub")
              }
            }), a(this).parent().addClass("open_sub"), c.slideDown(200, function() {
              d.getNiceScroll().resize()
            }))
          }
          return !1
        }), k.click(function(d) {
          return "http://#" !== a(this).attr("href") && "#" !== a(this).attr("href") && void(1 == d.which && (c.removeClass("opened"), edgtf.body.removeClass("edgtf-fullscreen-menu-opened"), edgtf.body.removeClass("edgtf-fullscreen-fade-in").addClass("edgtf-fullscreen-fade-out"), edgtf.body.addClass(b), a("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function() {
              a("nav.popup_menu").getNiceScroll().resize()
            }), edgtf.modules.common.edgtfEnableScroll()))
        })
      }
    }

    function j() {
      var b = a(".edgtf-mobile-header .edgtf-mobile-menu-opener"),
        c = a(".edgtf-mobile-header .edgtf-mobile-nav"),
        d = a('.edgtf-mobile-nav .mobile_arrow, .edgtf-mobile-nav h4, .edgtf-mobile-nav a[href*="#"]'),
        e = 200;
      b.length && c.length && b.on("tap click", function(a) {
        a.stopPropagation(), a.preventDefault(), c.is(":visible") ? c.slideUp(e) : c.slideDown(e)
      }), d.length && d.each(function() {
        a(this).on("tap click", function(b) {
          var c = a(this).nextAll("ul").first();
          if (c.length) {
            b.preventDefault(), b.stopPropagation();
            var d = a(this).parent("li");
            c.is(":visible") ? (c.slideUp(e), d.removeClass("edgtf-opened")) : (c.slideDown(e), d.addClass("edgtf-opened"))
          }
        })
      }), a(".edgtf-mobile-nav a, .edgtf-mobile-logo-wrapper a").on("click tap", function(b) {
        "http://#" !== a(this).attr("href") && "#" !== a(this).attr("href") && c.slideUp(e)
      })
    }

    function k() {
      if (edgtf.body.hasClass("edgtf-sticky-up-mobile-header")) {
        var b, c = a(".edgtf-top-bar"),
          d = a(".edgtf-mobile-header"),
          e = a("#wpadminbar"),
          f = d.length ? d.height() : 0,
          g = c.is(":visible") ? c.height() : 0,
          h = e.length ? e.height() : 0,
          i = a(document).scrollTop();
        b = g + f + h, a(window).scroll(function() {
          var c = a(document).scrollTop();
          c > b ? (d.addClass("edgtf-animate-mobile-header"), d.css("margin-bottom", f)) : (d.removeClass("edgtf-animate-mobile-header"), d.css("margin-bottom", 0)), c > i && c > b || c < b ? (d.removeClass("mobile-header-appear"), e.length && d.find(".edgtf-mobile-header-inner").css("top", 0)) : d.addClass("mobile-header-appear"), i = a(document).scrollTop()
        })
      }
    }

    function l() {
      var b = a(".edgtf-drop-down > ul > li.edgtf-menu-narrow");
      b.each(function(b) {
        var c = edgtf.windowWidth - 16,
          d = a(this).offset().left,
          e = a(this).find(".edgtf-menu-second .edgtf-menu-inner ul").width(),
          f = 0;
        f = edgtf.body.hasClass("boxed") ? edgtf.boxedLayoutWidth - (d - (c - edgtf.boxedLayoutWidth) / 2) : c - d;
        var g;
        a(this).find("li.sub").length > 0 && (g = f - e), (f < e || g < e) && (a(this).find(".edgtf-menu-second").addClass("right"), a(this).find(".edgtf-menu-second .edgtf-menu-inner ul").addClass("right"))
      })
    }

    function m() {
      var b = a(".edgtf-drop-down > ul > li");
      b.each(function(c) {
        if (a(b[c]).find(".edgtf-menu-second").length > 0) {
          var d = a(b[c]).find(".edgtf-menu-second");
          if (a(b[c]).hasClass("edgtf-menu-wide")) {
            var e = a(this).find(".edgtf-menu-inner > ul"),
              f = parseInt(e.css("padding-left").slice(0, -2)) + parseInt(e.css("padding-right").slice(0, -2)),
              g = e.outerWidth();
            a(this).hasClass("edgtf-menu-left-position") || a(this).hasClass("edgtf-menu-right-position") || d.css("left", 0);
            var h = 0;
            if (a(this).find(".edgtf-menu-second > .edgtf-menu-inner > ul > li").each(function() {
                var b = a(this).height();
                b > h && (h = b)
              }), a(this).find(".edgtf-menu-second > .edgtf-menu-inner > ul > li").css("height", ""), a(this).find(".edgtf-menu-second > .edgtf-menu-inner > ul > li").height(h), a(this).hasClass("edgtf-wide-background")) {
              if (!a(this).hasClass("edgtf-menu-left-position") && !a(this).hasClass("edgtf-menu-right-position")) {
                var i = a(this).offset().left;
                d.css("left", -i), d.css("width", edgtf.windowWidth)
              }
            } else if (!a(this).hasClass("edgtf-menu-left-position") && !a(this).hasClass("edgtf-menu-right-position")) {
              var i = (edgtf.windowWidth - 2 * (edgtf.windowWidth - e.offset().left)) / 2 + (g + f) / 2;
              d.css("left", -i)
            }
          }
          if (edgtf.menuDropdownHeightSet || (a(b[c]).data("original_height", d.height() + "px"), d.height(0)), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) a(b[c]).on("touchstart mouseenter", function() {
            d.css({
              height: a(b[c]).data("original_height"),
              overflow: "visible",
              visibility: "visible",
              opacity: "1"
            })
          }).on("mouseleave", function() {
            d.css({
              height: "0px",
              overflow: "hidden",
              visibility: "hidden",
              opacity: "0"
            })
          });
          else if (edgtf.body.hasClass("edgtf-dropdown-animate-height")) a(b[c]).mouseenter(function() {
            d.css({
              visibility: "visible",
              height: "0px",
              opacity: "0"
            }), d.stop().animate({
              height: a(b[c]).data("original_height"),
              opacity: 1
            }, 200, function() {
              d.css("overflow", "visible")
            })
          }).mouseleave(function() {
            d.stop().animate({
              height: "0px"
            }, 0, function() {
              d.css({
                overflow: "hidden",
                visibility: "hidden"
              })
            })
          });
          else {
            var j = {
              interval: 0,
              over: function() {
                setTimeout(function() {
                  d.addClass("edgtf-drop-down-start"), d.stop().css({
                    height: a(b[c]).data("original_height")
                  })
                }, 100)
              },
              timeout: 100,
              out: function() {
                d.stop().css({
                  height: "0px"
                }), d.removeClass("edgtf-drop-down-start")
              }
            };
            a(b[c]).hoverIntent(j)
          }
        }
      }), a(".edgtf-drop-down ul li.edgtf-menu-wide ul li a").on("click", function(b) {
        if (1 == b.which) {
          var c = a(this);
          setTimeout(function() {
            c.mouseleave()
          }, 500)
        }
      }), edgtf.menuDropdownHeightSet = !0
    }

    function n() {
      function b() {
        g.click(function(b) {
          b.preventDefault();
          var c = 0;
          a(".title").hasClass("has_parallax_background") && (c = parseInt(a(".title.has_parallax_background").css("backgroundPosition").split(" ")[1])), "0" == f.height() ? (a('.edgtf-search-slide-window-top input[type="text"]').focus(), edgtf.body.addClass("edgtf-search-open"), a(".title.has_parallax_background").animate({
            "background-position-y": c + 50 + "px"
          }, 150)) : (edgtf.body.removeClass("edgtf-search-open"), a(".title.has_parallax_background").animate({
            "background-position-y": c - 50 + "px"
          }, 150)), a(window).scroll(function() {
            "0" != f.height() && edgtf.scroll > 50 && (edgtf.body.removeClass("edgtf-search-open"), a(".title.has_parallax_background").css("backgroundPosition", "center " + c + "px"))
          }), e.click(function(b) {
            b.preventDefault(), edgtf.body.removeClass("edgtf-search-open"), a(".title.has_parallax_background").animate({
              "background-position-y": c + "px"
            }, 150)
          })
        })
      }

      function c() {
        g.click(function(b) {
          b.preventDefault();
          var c, d, e, f = a(".edgtf-search-cover .edgtf-form-holder-outer");
          a(".edgtf-search-cover .edgtf-form-holder");
          a(this).closest(".edgtf-grid").length ? (d = a(this).closest(".edgtf-grid").children().first(), e = d.parent()) : (d = a(this).closest(".edgtf-menu-area").children().first(), e = d), a(this).closest(".edgtf-sticky-header").length > 0 && (d = a(this).closest(".edgtf-sticky-header").children().first(), e = d.parent()), a(this).closest(".edgtf-mobile-header").length > 0 && (d = a(this).closest(".edgtf-mobile-header").children().children().first()), e.parent().hasClass("edgtf-logo-area") ? c = edgtfGlobalVars.vars.edgtfLogoAreaHeight : e.parent().hasClass("edgtf-top-bar") ? c = edgtfGlobalVars.vars.edgtfTopBarHeight : e.parent().hasClass("edgtf-menu-area") ? c = edgtfGlobalVars.vars.edgtfMenuAreaHeight - edgtfGlobalVars.vars.edgtfTopBarHeight : e.hasClass("edgtf-sticky-header") ? c = edgtfGlobalVars.vars.edgtfStickyHeaderHeight : e.parent().hasClass("edgtf-mobile-header") && (c = a(".edgtf-mobile-header-inner").height()), f.height(c), d.stop(!0).fadeIn(450, "easeInOutQuart"), d.find(".edgtf-search-close").css("left", a(this).offset().left - 85), a('.edgtf-search-cover input[type="text"]').focus(), a(".edgtf-search-close, .edgtf-content, footer").click(function(a) {
            a.preventDefault(), d.stop(!0).fadeOut(450, "easeInOutQuart")
          }), d.blur(function() {
            d.stop(!0).fadeOut(450, "easeInOutQuart")
          })
        })
      }

      function d(b, c) {
        var d = a(".edgtf-fullscreen-search-holder"),
          f = a(".edgtf-fullscreen-search-overlay");
        g.click(function(h) {
          h.preventDefault();
          var i = !1;
          if ("yes" === a(this).data("icon-close-same-position")) {
            var j = a(this).offset().top,
              k = a(this).offset().left;
            i = !0
          }
          b && (d.hasClass("edgtf-animate") ? (edgtf.body.removeClass("edgtf-fullscreen-search-opened"), edgtf.body.addClass("edgtf-search-fade-out"), edgtf.body.removeClass("edgtf-search-fade-in"), d.removeClass("edgtf-animate"), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfEnableScroll()) : (edgtf.body.addClass("edgtf-fullscreen-search-opened"), edgtf.body.removeClass("edgtf-search-fade-out"), edgtf.body.addClass("edgtf-search-fade-in"), d.addClass("edgtf-animate"), i && e.css({
            top: j - edgtf.scroll,
            left: k
          }), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfDisableScroll()), e.click(function(a) {
            a.preventDefault(), edgtf.body.removeClass("edgtf-fullscreen-search-opened"), d.removeClass("edgtf-animate"), edgtf.body.removeClass("edgtf-search-fade-in"), edgtf.body.addClass("edgtf-search-fade-out"), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfEnableScroll()
          }), a(document).keyup(function(a) {
            27 == a.keyCode && (edgtf.body.removeClass("edgtf-fullscreen-search-opened"), d.removeClass("edgtf-animate"), edgtf.body.removeClass("edgtf-search-fade-in"), edgtf.body.addClass("edgtf-search-fade-out"), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfEnableScroll())
          })), c && (f.hasClass("edgtf-animate") ? (f.removeClass("edgtf-animate"), d.css({
            opacity: 0,
            display: "none"
          }), e.css({
            opacity: 0,
            visibility: "hidden"
          }), g.css({
            opacity: 1
          })) : (f.addClass("edgtf-animate"), d.css({
            display: "block"
          }), setTimeout(function() {
            d.css("opacity", "1"), e.css({
              opacity: 1,
              visibility: "visible",
              top: j - edgtf.scroll,
              left: k
            }), i && e.css({
              top: j - edgtf.scroll,
              left: k
            }), g.css({
              opacity: 0
            })
          }, 200), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfDisableScroll()), e.click(function(a) {
            a.preventDefault(), f.removeClass("edgtf-animate"), d.css({
              opacity: 0,
              display: "none"
            }), e.css({
              opacity: 0,
              visibility: "hidden"
            }), g.css({
              opacity: 1
            }), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfEnableScroll()
          }), a(document).keyup(function(a) {
            27 == a.keyCode && (f.removeClass("edgtf-animate"), d.css({
              opacity: 0,
              display: "none"
            }), e.css({
              opacity: 0,
              visibility: "hidden"
            }), g.css({
              opacity: 1
            }), edgtf.body.hasClass("page-template-full_screen-php") || edgtf.modules.common.edgtfEnableScroll())
          }))
        }), a(".edgtf-fullscreen-search-holder .edgtf-search-field").focus(function() {
          a(".edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line").css("width", "100%")
        }), a(".edgtf-fullscreen-search-holder .edgtf-search-field").blur(function() {
          a(".edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line").css("width", "0");
        })
      }
      var e, f, g = a("a.edgtf-search-opener"),
        h = !1;
      if (a("html").hasClass("touch") && (h = !0), g.length > 0) {
        if (edgtf.body.hasClass("edgtf-fullscreen-search")) {
          var i = !1,
            j = !1;
          e = a(".edgtf-fullscreen-search-close"), edgtf.body.hasClass("edgtf-search-fade") ? i = !0 : edgtf.body.hasClass("edgtf-search-from-circle") && (j = !0), d(i, j)
        } else edgtf.body.hasClass("edgtf-search-slides-from-window-top") ? (f = a(".edgtf-search-slide-window-top"), e = a(".edgtf-search-close"), b()) : edgtf.body.hasClass("edgtf-search-covers-header") && c();
        g.each(function() {
          var b = a(this);
          if ("undefined" != typeof b.data("hover-color")) {
            var c, d = function(a) {
              a.data.thisSearchOpener.css("color", a.data.color)
            };
            c = "undefined" != typeof b.data("color") ? b.data("color") : b.css("color");
            var e = b.data("hover-color");
            b.on("mouseenter", {
              thisSearchOpener: b,
              color: e
            }, d), b.on("mouseleave", {
              thisSearchOpener: b,
              color: c
            }, d)
          }
        })
      }
    }

    function o() {
      var b = a(".edgtf-header-expanding"),
        c = a("header .edgtf-menu-appear");
      b.length && c.on("click", function(a) {
        a.preventDefault(), c.hasClass("edgtf-opened") ? (c.removeClass("edgtf-opened"), edgtf.body.removeClass("edgtf-menu-expanded")) : (c.addClass("edgtf-opened"), edgtf.body.addClass("edgtf-menu-expanded"))
      })
    }
    var p = {};
    edgtf.modules.header = p, p.isStickyVisible = !1, p.stickyAppearAmount = 0, p.behaviour, p.edgtfSideArea = g, p.edgtfSideAreaScroll = h, p.edgtfFullscreenMenu = i, p.edgtfInitMobileNavigation = j, p.edgtfMobileHeaderBehavior = k, p.edgtfSetDropDownMenuPosition = l, p.edgtfDropDownMenu = m, p.edgtfSearch = n, p.edgtfOnDocumentReady = b, p.edgtfOnWindowLoad = c, p.edgtfOnWindowResize = d, p.edgtfOnWindowScroll = e, a(document).ready(b), a(window).load(c), a(window).resize(d), a(window).scroll(e);
    var q = function() {
      var b = a(".edgtf-vertical-menu-area"),
        c = function() {
          function c() {
            var b = d.find("ul li.menu-item-has-children"),
              c = b.find(" > .edgtf-menu-second, > ul");
            b.each(function() {
              var d = a(this).find(" > .edgtf-menu-second, > ul"),
                e = this;
              if (Modernizr.touch) {
                var f = a(this).find("> a");
                f.on("click tap", function(f) {
                  f.preventDefault(), f.stopPropagation(), d.hasClass("edgtf-float-open") ? (d.removeClass("edgtf-float-open"), a(e).removeClass("open")) : (a(this).parents("li").hasClass("open") || (b.removeClass("open"), c.removeClass("edgtf-float-open")), d.addClass("edgtf-float-open"), a(e).addClass("open"))
                })
              } else a(this).hoverIntent({
                over: function() {
                  d.addClass("edgtf-float-open"), a(e).addClass("open")
                },
                out: function() {
                  d.removeClass("edgtf-float-open"), a(e).removeClass("open")
                },
                timeout: 300
              })
            })
          }
          var d = b.find(".edgtf-vertical-menu"),
            e = "undefined" != typeof d.data("navigation-type") ? d.data("navigation-type") : "";
          switch (e) {
            default: c()
          }
        };
      return {
        init: function() {
          b.length && c()
        }
      }
    }
  }(jQuery),
  function(a) {
    "use strict";

    function b() {
      f()
    }

    function c() {}

    function d() {}

    function e() {}

    function f() {
      if (a(".edgtf-title.edgtf-has-parallax-background").length > 0 && 0 === a(".touch").length) {
        var b = a(".edgtf-title.edgtf-has-parallax-background"),
          c = a(".edgtf-title.edgtf-has-parallax-background.edgtf-zoom-out"),
          d = parseInt(b.data("background-width").match(/\d+/)),
          e = b.data("height"),
          f = e / 1e4 * 7,
          g = -(edgtf.scroll * f);
        b.css({
          "background-position": "center " + (g + edgtfGlobalVars.vars.edgtfAddForAdminBar) + "px"
        }), c.css({
          "background-size": d - edgtf.scroll + "px auto"
        }), a(window).scroll(function() {
          g = -(edgtf.scroll * f), b.css({
            "background-position": "center " + (g + edgtfGlobalVars.vars.edgtfAddForAdminBar) + "px"
          }), c.css({
            "background-size": d - edgtf.scroll + "px auto"
          })
        })
      }
    }
    var g = {};
    edgtf.modules.title = g, g.edgtfParallaxTitle = f, g.edgtfOnDocumentReady = b, g.edgtfOnWindowLoad = c, g.edgtfOnWindowResize = d, g.edgtfOnWindowScroll = e, a(document).ready(b), a(window).load(c), a(window).resize(d), a(window).scroll(e)
  }(jQuery),
  function(a) {
    "use strict";

    function b() {
      f(), g(), k(), V().init(), i(), j(), l(), m(), n(), p(), q(), r(), X().init(), s(), t(), u(), z(), y(), v(), C(), F(), A(), H(), I(), K(), Y().init(), W().init(), Z().init(), P(), S(), T()
    }

    function c() {
      R()
    }

    function d() {
      s(), u(), C(), F()
    }

    function e() {}

    function f() {
      var b = a(".edgtf-counter");
      b.length && b.each(function() {
        var b = a(this);
        b.appear(function() {
          if (b.parent().addClass("edgtf-counter-holder-show"), b.hasClass("zero")) {
            var a = parseFloat(b.text());
            b.countTo({
              from: 0,
              to: a,
              speed: 1500,
              refreshInterval: 100
            })
          } else b.absoluteCounter({
            speed: 2e3,
            fadeInDelay: 1e3
          })
        }, {
          accX: 0,
          accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
        })
      })
    }

    function g() {
      var b = a(".edgtf-progress-bar");
      b.length && b.each(function() {
        var b = a(this);
        b.appear(function() {
          if (h(b), 0 !== b.find(".edgtf-floating.edgtf-floating-inside")) {
            var a = b.find(".edgtf-progress-content").height();
            a += parseFloat(b.find(".edgtf-progress-title-holder").css("padding-bottom")), a += parseFloat(b.find(".edgtf-progress-title-holder").css("margin-bottom")), b.find(".edgtf-floating-inside").css("margin-bottom", -a + "px")
          }
          var c = b.find(".edgtf-progress-content").data("percentage"),
            d = b.find(".edgtf-progress-content"),
            e = b.find(".edgtf-progress-number");
          d.css("width", "0%"), d.animate({
            width: c + "%"
          }, 1500), e.css("left", "0%"), e.animate({
            left: c + "%"
          }, 1500)
        })
      })
    }

    function h(b) {
      var c = parseFloat(b.find(".edgtf-progress-content").data("percentage")),
        d = b.find(".edgtf-progress-number .edgtf-percent");
      d.length && d.each(function() {
        var b = a(this);
        b.parents(".edgtf-progress-number-wrapper").css("opacity", "1"), b.countTo({
          from: 0,
          to: c,
          speed: 1500,
          refreshInterval: 50
        })
      })
    }

    function i() {
      var b = a(".edgtf-message");
      b.length && b.each(function() {
        var b = a(this);
        b.find(".edgtf-close").click(function(b) {
          b.preventDefault(), a(this).parent().parent().fadeOut(500)
        })
      })
    }

    function j() {
      var b = a(".edgtf-message.edgtf-with-icon");
      b.length && b.each(function() {
        var b = a(this),
          c = b.find(".edgtf-message-text-holder").height(),
          d = b.find(".edgtf-message-icon-holder").height();
        c > d ? b.find(".edgtf-message-icon-holder").height(c) : b.find(".edgtf-message-text-holder").height(d)
      })
    }

    function k() {
      var b, c, d, e, f, g, h, i, j, k, l, m = a(".edgtf-countdown");
      m.length && m.each(function() {
        function m() {
          q.find(".countdown-amount").css({
            "font-size": n + "px",
            "line-height": n + "px"
          }), q.find(".countdown-period").css({
            "font-size": o + "px"
          })
        }
        var n, o, p = a(this).attr("id"),
          q = a("#" + p);
        b = q.data("year"), c = q.data("month"), d = q.data("day"), e = q.data("hour"), f = q.data("minute"), g = q.data("timezone"), h = q.data("month-label"), i = q.data("day-label"), j = q.data("hour-label"), k = q.data("minute-label"), l = q.data("second-label"), n = q.data("digit-size"), o = q.data("label-size"), q.countdown({
          until: new Date(b, c - 1, d, e, f, 44),
          labels: ["Years", h, "Weeks", i, j, k, l],
          format: "ODHMS",
          timezone: g,
          padZeroes: !0,
          onTick: m
        })
      })
    }

    function l() {
      var b = a(".edgtf-testimonials");
      b.length && b.each(function() {
        var b = a(this);
        b.appear(function() {
          b.css("visibility", "visible")
        }, {
          accX: 0,
          accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
        });
        var c, d = !0,
          e = !0,
          f = !0,
          g = 800,
          h = 1,
          i = !0;
        "undefined" != typeof b.data("animation-speed") && b.data("animation-speed") !== !1 && (g = b.data("animation-speed")), "undefined" != typeof b.data("dots-navigation") && (e = b.data("dots-navigation")), "undefined" != typeof b.data("arrows-navigation") && (f = b.data("arrows-navigation")), "undefined" != typeof b.data("autoplay") && "yes" !== b.data("autoplay") && (d = "false"), "undefined" != typeof b.data("loop") && "yes" !== b.data("loop") && (i = "false"), b.hasClass("edgtf-testimonials-type-carousel") && (h = 3, c = [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: !0
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]), b.slick({
          loop: i,
          speed: g,
          infinite: !0,
          autoplay: d,
          slidesToShow: h,
          arrows: f,
          dots: e,
          dotsClass: "edgtf-slick-dots",
          adaptiveHeight: !0,
          easing: "easeInOutQuart",
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="lnr lnr-chevron-right"></span></span>',
          customPaging: function(a, b) {
            return '<span class="edgtf-slick-dot-inner"></span>'
          },
          responsive: c
        })
      })
    }

    function m() {
      var b, c, d, e, f = a(".edgtf-carousel-holder");
      f.length && f.each(function() {
        b = a(this).children(".edgtf-carousel"), c = b.data("items"), d = "yes" == b.data("arrows-navigation"), e = "yes" == b.data("dots-navigation"), b.slick({
          infinite: !0,
          autoplay: !0,
          slidesToShow: c,
          arrows: d,
          dots: e,
          dotsClass: "edgtf-slick-dots",
          adaptiveHeight: !0,
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="lnr lnr-chevron-right"></span></span>',
          customPaging: function(a, b) {
            return '<span class="edgtf-slick-dot-inner"></span>'
          },
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: !0,
              dots: !0
            }
          }, {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }, {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        })
      })
    }

    function n() {
      var b = a(".edgtf-pie-chart-holder, .edgtf-pie-chart-with-icon-holder");
      b.length && b.each(function() {
        var b = a(this),
          c = b.children(".edgtf-percentage, .edgtf-percentage-with-icon"),
          d = "#303030",
          e = "#d3d3d3",
          f = "2",
          g = 180;
        "undefined" != typeof c.data("bar-color") && "" !== c.data("bar-color") && (d = c.data("bar-color")), "undefined" != typeof c.data("track-color") && "" !== c.data("track-color") && (e = c.data("track-color")), c.appear(function() {
          o(b), c.css("opacity", "1"), c.easyPieChart({
            barColor: d,
            trackColor: e,
            scaleColor: !1,
            lineCap: "butt",
            lineWidth: f,
            animate: 1500,
            size: g
          })
        }, {
          accX: 0,
          accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
        })
      })
    }

    function o(a) {
      a.css("opacity", "1");
      var b = a.find(".edgtf-to-counter"),
        c = parseFloat(b.text());
      b.countTo({
        from: 0,
        to: c,
        speed: 1500,
        refreshInterval: 50
      })
    }

    function p() {
      var b = a(".edgtf-pie-chart-doughnut-holder, .edgtf-pie-chart-pie-holder");
      b.each(function() {
        for (var b = a(this), c = b.find("canvas"), d = c.attr("id"), e = document.getElementById(d).getContext("2d"), f = [], g = a(e.canvas), h = 1; h <= 10; h++) {
          var i, j = g.data("value-" + h),
            k = g.data("color-" + h);
          "undefined" != typeof j && "undefined" != typeof k && (i = {
            value: j,
            color: k
          }, f.push(i))
        }
        c.hasClass("edgtf-pie") ? new Chart(e).Pie(f, {
          segmentStrokeColor: "transparent"
        }) : new Chart(e).Doughnut(f, {
          segmentStrokeColor: "transparent"
        })
      })
    }

    function q() {
      var b = a(".edgtf-tabs");
      b.length && b.each(function() {
        var b = a(this);
        b.children(".edgtf-tab-container").each(function(b) {
          b += 1;
          var c = a(this),
            d = c.attr("id"),
            e = c.parent().find(".edgtf-tabs-nav li:nth-child(" + b + ") a"),
            f = e.attr("href");
          d = "#" + d, d.indexOf(f) > -1 && e.attr("href", d)
        }), b.hasClass("edgtf-horizontal-tab") ? b.tabs() : b.hasClass("edgtf-vertical-tab") && (b.tabs().addClass("ui-tabs-vertical ui-helper-clearfix"), b.find(".edgtf-tabs-nav > ul >li").removeClass("ui-corner-top").addClass("ui-corner-left"))
      })
    }

    function r() {
      var b = a(".edgtf-tab-container");
      b.length && b.each(function() {
        var b = a(this),
          c = b.attr("id"),
          d = "";
        "undefined" == typeof b.data("icon-html") && "false" === b.data("icon-html") || (d = b.data("icon-html"));
        var e = b.parents(".edgtf-tabs").find('.edgtf-tabs-nav > li > a[href="#' + c + '"]');
        "undefined" != typeof e && e.children(".edgtf-icon-frame").append(d)
      })
    }

    function s() {
      var b = a(".edgtf-blog-list-holder.edgtf-masonry .edgtf-blog-list");
      b.length && b.each(function() {
        var c = a(this);
        b.waitForImages(function() {
          c.isotope({
            itemSelector: ".edgtf-blog-list-masonry-item",
            masonry: {
              columnWidth: ".edgtf-blog-list-masonry-grid-sizer",
              gutter: ".edgtf-blog-list-masonry-grid-gutter"
            }
          }), c.addClass("edgtf-appeared")
        })
      })
    }

    function t() {
      var b = a(".edgtf-blog-slider");
      b.length && b.each(function() {
        var b, c = a(this),
          d = !1,
          e = 1;
        "undefined" != typeof c.data("type") && c.data("type") !== !1 && "carousel" == c.data("type") && (b = [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: !0,
            dots: !0
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }], e = 3), c.slick({
          infinite: !0,
          autoplay: !1,
          slidesToShow: e,
          arrows: d,
          dots: !0,
          dotsClass: "edgtf-slick-dots",
          adaptiveHeight: !0,
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="lnr lnr-chevron-right"></span></span>',
          customPaging: function(a, b) {
            return '<span class="edgtf-slick-dot-inner"></span>'
          },
          responsive: b
        })
      })
    }

    function u() {
      var b = a(".edgtf-custom-font-holder");
      b.length && b.each(function() {
        var b, c, d = a(this),
          e = 1,
          f = 1;
        edgtf.windowWidth < 1200 && (e = .8), edgtf.windowWidth < 1e3 && (e = .7), edgtf.windowWidth < 768 && (e = .6, f = .7), edgtf.windowWidth < 600 && (e = .5, f = .6), edgtf.windowWidth < 480 && (e = .4, f = .5), "undefined" != typeof d.data("font-size") && d.data("font-size") !== !1 && (b = parseInt(d.data("font-size")), b > 70 ? b = Math.round(b * e) : b > 35 && (b = Math.round(b * f)), d.css("font-size", b + "px")), "undefined" != typeof d.data("line-height") && d.data("line-height") !== !1 && (c = parseInt(d.data("line-height")), c > 70 && edgtf.windowWidth < 1200 ? c = "1.2em" : c > 35 && edgtf.windowWidth < 768 ? c = "1.2em" : c += "px", d.css("line-height", c))
      })
    }

    function v() {
      a(".edgtf-google-map").length && a(".edgtf-google-map").each(function() {
        var b, c = a(this);
        "undefined" != typeof c.data("custom-map-style") && (b = c.data("custom-map-style"));
        var d;
        "undefined" != typeof c.data("color-overlay") && c.data("color-overlay") !== !1 && (d = c.data("color-overlay"));
        var e;
        "undefined" != typeof c.data("saturation") && c.data("saturation") !== !1 && (e = c.data("saturation"));
        var f;
        "undefined" != typeof c.data("lightness") && c.data("lightness") !== !1 && (f = c.data("lightness"));
        var g;
        "undefined" != typeof c.data("zoom") && c.data("zoom") !== !1 && (g = c.data("zoom"));
        var h;
        "undefined" != typeof c.data("pin") && c.data("pin") !== !1 && (h = c.data("pin"));
        var i;
        "undefined" != typeof c.data("height") && c.data("height") !== !1 && (i = c.data("height"));
        var j;
        "undefined" != typeof c.data("unique-id") && c.data("unique-id") !== !1 && (j = c.data("unique-id"));
        var k;
        "undefined" != typeof c.data("scroll-wheel") && (k = c.data("scroll-wheel"));
        var l;
        "undefined" != typeof c.data("addresses") && c.data("addresses") !== !1 && (l = c.data("addresses"));
        var m = "map_" + j,
          n = "geocoder_" + j,
          o = "edgtf-map-" + j;
        w(b, d, e, f, k, g, o, i, h, m, n, l)
      })
    }

    function w(a, b, c, d, e, f, g, h, i, j, k, l) {
      var m, n = [{
        stylers: [{
          hue: b
        }, {
          saturation: c
        }, {
          lightness: d
        }, {
          gamma: 1
        }]
      }];
      m = a ? "edgtf-style" : google.maps.MapTypeId.ROADMAP;
      var o = new google.maps.StyledMapType(n, {
        name: "Edge Google Map"
      });
      k = new google.maps.Geocoder;
      var p = new google.maps.LatLng((-34.397), 150.644);
      isNaN(h) || (h += "px");
      var q = {
        zoom: f,
        scrollwheel: e,
        center: p,
        zoomControl: !0,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: !1,
        scaleControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl: !1,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        panControl: !1,
        panControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeControl: !1,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, "edgtf-style"],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeId: m
      };
      j = new google.maps.Map(document.getElementById(g), q), j.mapTypes.set("edgtf-style", o);
      var r;
      for (r = 0; r < l.length; ++r) x(l[r], i, j, k);
      var s = document.getElementById(g);
      s.style.height = h
    }

    function x(a, b, c, d) {
      if ("" !== a) {
        var e = '<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p>' + a + "</p></div></div>",
          f = new google.maps.InfoWindow({
            content: e
          });
        d.geocode({
          address: a
        }, function(d, e) {
          if (e === google.maps.GeocoderStatus.OK) {
            c.setCenter(d[0].geometry.location);
            var g = new google.maps.Marker({
              map: c,
              position: d[0].geometry.location,
              icon: b,
              title: a.store_title
            });
            google.maps.event.addListener(g, "click", function() {
              f.open(c, g)
            }), google.maps.event.addDomListener(window, "resize", function() {
              c.setCenter(d[0].geometry.location)
            })
          }
        })
      }
    }

    function y() {
      var b = a(".edgtf-accordion-holder");
      b.length && b.each(function() {
        var b = a(this);
        if (b.hasClass("edgtf-accordion") && b.accordion({
            animate: "easeInOutQuart",
            collapsible: !0,
            active: 0,
            icons: "",
            heightStyle: "content"
          }), b.hasClass("edgtf-toggle")) {
          var c = a(this),
            d = c.find(".edgtf-title-holder"),
            e = d.next();
          c.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset"), d.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom"), e.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(), d.each(function() {
            var b = a(this);
            b.hover(function() {
              b.toggleClass("ui-state-hover")
            }), b.on("click", function() {
              b.toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom"), b.next().toggleClass("ui-accordion-content-active").slideToggle(400)
            })
          })
        }
      })
    }

    function z() {
      var b = a(".edgtf-image-gallery");
      b.length && b.each(function() {
        var b, c = a(this).children(".edgtf-image-gallery-sliding"),
          d = c.data("autoplay"),
          e = "fade" == c.data("animation"),
          f = "yes" == c.data("navigation"),
          g = "yes" == c.data("pagination"),
          h = 1,
          i = !1,
          j = !1;
        "disable" == d ? d = !1 : (b = 1e3 * d, d = !0), c.hasClass("edgtf-gallery-image-carousel") && (i = !0, j = !0), c.slick({
          infinite: !0,
          autoplay: d,
          autoplaySpeed: b,
          speed: 600,
          slidesToShow: h,
          fade: e,
          arrows: f,
          dots: g,
          easing: "easeOutQuart",
          dotsClass: "edgtf-slick-dots",
          adaptiveHeight: !1,
          variableWidth: i,
          centerMode: j,
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"></span>',
          customPaging: function(a, b) {
            return '<span class="edgtf-slick-dot-inner"></span>'
          }
        })
      })
    }

    function A() {
      var b = a(".edgtf-portfolio-list-holder-outer.edgtf-ptf-standard, .edgtf-portfolio-list-holder-outer.edgtf-ptf-gallery, .edgtf-portfolio-list-holder-outer.edgtf-ptf-gallery-with-space");
      b.length && b.each(function() {
        var b = a(this);
        b.waitForImages(function() {
          B(b)
        })
      })
    }

    function B(a) {
      var b = "";
      a.hasClass("edgtf-ptf-has-filter") && (b = a.find(".edgtf-portfolio-filter-holder-inner ul li").data("class"), b = "." + b);
      var c = a.find(".edgtf-portfolio-list-holder");
      c.mixItUp({
        callbacks: {
          onMixLoad: function() {
            c.addClass("edgtf-appeared"), c.find("article").css("visibility", "visible"), c.find("article").css("display", "inline-block")
          },
          onMixStart: function() {
            c.find("article").css("visibility", "visible"), c.find("article").css("display", "inline-block")
          },
          onMixBusy: function() {
            c.find("article").css("visibility", "visible")
          }
        },
        selectors: {
          filter: b
        },
        animation: {
          effects: "fade",
          duration: 600
        }
      })
    }

    function C() {
      var b = a(".edgtf-portfolio-list-holder-outer.edgtf-ptf-masonry");
      b.length && b.each(function() {
        var b = a(this).children(".edgtf-portfolio-list-holder"),
          c = b.find(".edgtf-portfolio-list-masonry-grid-sizer").width();
        E(c, b), D(b), a(window).resize(function() {
          E(c, b), D(b)
        })
      })
    }

    function D(a) {
      a.waitForImages(function() {
        a.isotope({
          itemSelector: ".edgtf-portfolio-item",
          masonry: {
            columnWidth: ".edgtf-portfolio-list-masonry-grid-sizer"
          }
        }), a.addClass("edgtf-appeared")
      })
    }

    function E(a, b) {
      var c = b.find(".edgtf-default-masonry-item"),
        d = b.find(".edgtf-large-width-masonry-item"),
        e = b.find(".edgtf-large-height-masonry-item"),
        f = b.find(".edgtf-large-width-height-masonry-item");
      c.css("height", a), e.css("height", Math.round(2 * a)), edgtf.windowWidth > 600 ? (f.css("height", Math.round(2 * a)), d.css("height", a)) : (f.css("height", a), d.css("height", Math.round(a / 2)))
    }

    function F() {
      var b = a(".edgtf-portfolio-list-holder-outer.edgtf-ptf-pinterest");
      b.length && b.each(function() {
        var b = a(this).children(".edgtf-portfolio-list-holder");
        G(b), a(window).resize(function() {
          G(b)
        })
      })
    }

    function G(a) {
      a.waitForImages(function() {
        a.isotope({
          itemSelector: ".edgtf-portfolio-item",
          masonry: {
            columnWidth: ".edgtf-portfolio-list-masonry-grid-sizer"
          }
        })
      }), a.addClass("edgtf-appeared")
    }

    function H() {
      var b = a(".edgtf-portfolio-filter-holder.edgtf-masonry-filter");
      b.length && b.each(function() {
        var b = a(this),
          c = null;
        b.find("ul li").data("class");
        b.find(".filter:first").addClass("current"), b.find(".filter").click(function() {
          var d = a(this);
          clearTimeout(c), a(".isotope, .isotope .isotope-item").css("transition-duration", "0.8s"), c = setTimeout(function() {
            a(".isotope, .isotope .isotope-item").css("transition-duration", "0s")
          }, 700);
          var e = a(this).attr("data-filter");
          return b.siblings(".edgtf-portfolio-list-holder-outer").find(".edgtf-portfolio-list-holder").isotope({
            filter: e
          }), b.find(".filter").removeClass("current"), d.addClass("current"), !1
        })
      })
    }

    function I() {
      var b = a(".edgtf-portfolio-list-holder-outer.edgtf-portfolio-slider-holder");
      b.length && b.each(function() {
        var b = a(this),
          c = b.children(".edgtf-portfolio-list-holder"),
          d = b.data("items"),
          e = !1,
          f = !0,
          g = !0;
        b.hasClass("edgtf-portfolio-related-holder") && (g = !1);
        var h = [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }];
        "undefined" != typeof b.data("centered") && b.data("centered") !== !1 && (e = "yes" == b.data("centered")), c.slick({
          infinite: !0,
          autoplay: !0,
          autoplaySpeed: 5e3,
          speed: 600,
          slidesToShow: d,
          centerMode: e,
          arrows: f,
          dots: g,
          easing: "easeOutQuart",
          dotsClass: "edgtf-slick-dots",
          adaptiveHeight: !0,
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="lnr lnr-chevron-right"></span></span>',
          customPaging: function(a, b) {
            return '<span class="edgtf-slick-dot-inner"></span>'
          },
          responsive: h
        })
      })
    }

    function J(a, b) {
      E(a, b)
    }

    function K() {
      var b = a(".edgtf-portfolio-list-holder-outer.edgtf-ptf-show-more");
      b.length && b.each(function() {
        var b, c, d = a(this),
          e = d.find(".edgtf-portfolio-list-holder"),
          f = d.find(".edgtf-portfolio-list-masonry-grid-sizer").width(),
          g = d.find(".edgtf-ptf-list-load-more a"),
          h = g.children(".edgtf-btn-text");
        "undefined" != typeof d.data("max-num-pages") && d.data("max-num-pages") !== !1 && (c = d.data("max-num-pages")), d.hasClass("edgtf-ptf-load-more") ? g.on("click", function(i) {
          var j = M(d);
          if (b = j.nextPage, i.preventDefault(), i.stopPropagation(), b <= c) {
            var k = N(j);
            h.text(edgtfGlobalVars.vars.edgtfLoadingMoreText), a.ajax({
              type: "POST",
              data: k,
              url: edgtCoreAjaxUrl,
              success: function(i) {
                b++, d.data("next-page", b);
                var j = a.parseJSON(i),
                  k = L(j.html);
                d.waitForImages(function() {
                  setTimeout(function() {
                    d.hasClass("edgtf-ptf-masonry") || d.hasClass("edgtf-ptf-pinterest") ? e.isotope().append(k).isotope("appended", k, J(f, d)).isotope("reloadItems") : e.mixItUp("append", k), h.text(edgtfGlobalVars.vars.edgtfLoadMoreText), b > c && g.hide()
                  }, 600)
                })
              }
            })
          }
        }) : d.hasClass("edgtf-ptf-infinite-scroll") && g.appear(function(h) {
          var i = M(d);
          if (b = i.nextPage, h.preventDefault(), h.stopPropagation(), g.css("visibility", "visible"), b <= c) {
            var j = N(i);
            a.ajax({
              type: "POST",
              data: j,
              url: edgtCoreAjaxUrl,
              success: function(h) {
                b++, d.data("next-page", b);
                var i = a.parseJSON(h),
                  j = L(i.html);
                d.waitForImages(function() {
                  setTimeout(function() {
                    d.hasClass("edgtf-ptf-masonry") || d.hasClass("edgtf-ptf-pinterest") ? e.isotope().append(j).isotope("appended", j, J(f, d)).isotope("reloadItems") : e.mixItUp("append", j), g.css("visibility", "hidden")
                  }, 400)
                }), b > c && (console.log("test"), setTimeout(function() {
                  g.fadeOut(400)
                }, 400))
              }
            })
          }
        }, {
          one: !1,
          accX: 0,
          accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
        })
      })
    }

    function L(b) {
      var c = a.trim(b),
        d = a(c),
        e = a();
      return d.each(function(a, b) {
        1 === b.nodeType && (e = e.add(this))
      }), e
    }

    function M(a) {
      var b = {};
      return b.type = "", b.columns = "", b.gridSize = "", b.orderBy = "", b.order = "", b.number = "", b.imageSize = "", b.hoverType = "", b.filter = "", b.filterOrderBy = "", b.category = "", b.selectedProjectes = "", b.showMore = "", b.titleTag = "", b.nextPage = "", b.maxNumPages = "", "undefined" != typeof a.data("type") && a.data("type") !== !1 && (b.type = a.data("type")), "undefined" != typeof a.data("grid-size") && a.data("grid-size") !== !1 && (b.gridSize = a.data("grid-size")), "undefined" != typeof a.data("columns") && a.data("columns") !== !1 && (b.columns = a.data("columns")), "undefined" != typeof a.data("order-by") && a.data("order-by") !== !1 && (b.orderBy = a.data("order-by")), "undefined" != typeof a.data("order") && a.data("order") !== !1 && (b.order = a.data("order")), "undefined" != typeof a.data("number") && a.data("number") !== !1 && (b.number = a.data("number")), "undefined" != typeof a.data("image-size") && a.data("image-size") !== !1 && (b.imageSize = a.data("image-size")), "undefined" != typeof a.data("hover-type") && a.data("hover-type") !== !1 && (b.hoverType = a.data("hover-type")), "undefined" != typeof a.data("filter") && a.data("filter") !== !1 && (b.filter = a.data("filter")), "undefined" != typeof a.data("filter-order-by") && a.data("filter-order-by") !== !1 && (b.filterOrderBy = a.data("filter-order-by")), "undefined" != typeof a.data("category") && a.data("category") !== !1 && (b.category = a.data("category")), "undefined" != typeof a.data("selected-projects") && a.data("selected-projects") !== !1 && (b.selectedProjectes = a.data("selected-projects")), "undefined" != typeof a.data("show-more") && a.data("show-more") !== !1 && (b.showMore = a.data("show-more")), "undefined" != typeof a.data("title-tag") && a.data("title-tag") !== !1 && (b.titleTag = a.data("title-tag")), "undefined" != typeof a.data("next-page") && a.data("next-page") !== !1 && (b.nextPage = a.data("next-page")), "undefined" != typeof a.data("max-num-pages") && a.data("max-num-pages") !== !1 && (b.maxNumPages = a.data("max-num-pages")), b
    }

    function N(a) {
      var b = {
        action: "edge_cpt_portfolio_ajax_load_more",
        type: a.type,
        columns: a.columns,
        gridSize: a.gridSize,
        orderBy: a.orderBy,
        order: a.order,
        number: a.number,
        imageSize: a.imageSize,
        hoverType: a.hoverType,
        filter: a.filter,
        filterOrderBy: a.filterOrderBy,
        category: a.category,
        selectedProjectes: a.selectedProjectes,
        showMore: a.showMore,
        titleTag: a.titleTag,
        nextPage: a.nextPage
      };
      return b
    }

    function O(b, c) {
      if (a(".edgtf-slider .carousel").not(".edgtf-disable-slider-header-style-changing").length > 0) {
        var d = "",
          e = "";
        b.hasClass("light") && (d = "edgtf-light-header", e = "edgtf-light-slider"), b.hasClass("dark") && (d = "edgtf-dark-header", e = "edgtf-dark-slider"), "" !== d ? c ? edgtf.body.removeClass("edgtf-dark-header edgtf-light-header").addClass(d) : edgtf.body.removeClass("edgtf-dark-slider edgtf-light-slider").addClass(e) : c ? edgtf.body.removeClass("edgtf-dark-header edgtf-light-header").addClass(edgtf.defaultHeaderStyle) : edgtf.body.removeClass("edgtf-dark-slider edgtf-light-slider").addClass(edgtf.defaultHeaderStyle)
      }
    }

    function P() {
      var b = edgtf.body;
      if (b.hasClass("edgtf-vertical-split-screen-initialized") && (b.removeClass("edgtf-vertical-split-screen-initialized"), a.fn.multiscroll.destroy()), a(".edgtf-vertical-split-slider").length) {
        var c = a(".edgtf-vertical-split-slider");
        c.height(edgtf.windowHeight).animate({
          opacity: 1
        }, 300), c.multiscroll({
          scrollingSpeed: 500,
          navigation: !0,
          useAnchorsOnLoad: !1,
          sectionSelector: ".edgtf-vss-ms-section",
          leftSelector: ".edgtf-vss-ms-left",
          rightSelector: ".edgtf-vss-ms-right",
          afterRender: function() {
            Q(a(".edgtf-vss-ms-right .edgtf-vss-ms-section:last-child").data("bullet-style")), b.addClass("edgtf-vertical-split-screen-initialized"), X().init(), a("div.wpcf7 > form").length && (_wpcf7.supportHtml5 = a.wpcf7SupportHtml5(), a("div.wpcf7 > form").wpcf7InitForm());
            var d = a("<div class='edgtf-vertical-split-slider-responsive' />");
            c.after(d);
            for (var e = a(".edgtf-vertical-split-slider .edgtf-vss-ms-left > div"), f = a(".edgtf-vertical-split-slider .edgtf-vss-ms-right > div"), g = 0; g < e.length; g++) d.append(a(e[g]).clone(!0)), d.append(a(f[e.length - 1 - g]).clone(!0));
            a(".edgtf-vertical-split-slider-responsive .edgtf-google-map").length && a(".edgtf-vertical-split-slider-responsive .edgtf-google-map").each(function() {
              var b = a(this);
              b.empty();
              var c = Math.floor(1e5 * Math.random() + 1);
              b.attr("id", "edgtf-map-" + c), b.data("unique-id", c)
            }), C(), F(), A(), v()
          },
          onLeave: function(b, c, d) {
            Q(a(a(".edgtf-vss-ms-right .edgtf-vss-ms-section")[a(".edgtf-vss-ms-right .edgtf-vss-ms-section").length - c]).data("bullet-style"))
          }
        }), edgtf.windowWidth <= 1024 ? a.fn.multiscroll.destroy() : a.fn.multiscroll.build(), a(window).resize(function() {
          edgtf.windowWidth <= 1024 ? a.fn.multiscroll.destroy() : a.fn.multiscroll.build()
        })
      }
    }

    function Q(a) {
      "undefined" != typeof a && "" != a ? edgtf.body.removeClass("edgtf-vss-light-slider edgtf-vss-dark-slider").addClass("edgtf-vss-" + a + "-slider") : edgtf.body.removeClass("edgtf-vss-light-slider edgtf-vss-dark-slider")
    }

    function R() {
      var b = a(".edgtf-typed");
      b.length && b.each(function() {
        var b, c = a(this),
          d = c.parents(".edgtf-typed-wrap"),
          e = d.parents(".edgtf-custom-font-holder"),
          f = e.offset(),
          g = e.find(".edgtf-custom-font-original"),
          h = c.find(".edgtf-typed-1").text(),
          i = c.find(".edgtf-typed-2").text(),
          j = c.find(".edgtf-typed-3").text(),
          k = edgtfGlobalVars.vars.edgtfElementAppearAmount;
        i.trim() && j.trim() || (b = [h]), !j.trim() && i.length && (b = [h, i]), h.length && i.length && j.length && (b = [h, i, j]), g.text().indexOf("&") != -1 && g.html(g.text().replace("&", '<span class="edgtf-amp">&</span>')), f.top < Math.abs(k) && (k = 0), setTimeout(function() {
          e.appear(function() {
            c.typed({
              strings: b,
              typeSpeed: 120,
              backDelay: 900,
              loop: !0,
              contentType: "text",
              loopCount: !1,
              cursorChar: "_"
            })
          }, {
            accX: 0,
            accY: k
          })
        }, 100)
      })
    }

    function S() {
      var b = a("#edgtf-image-merge");
      b.length && (a("html").hasClass("touch") ? b.waitForImages(function() {
        b.css("height", b.find("img").first().height())
      }) : (window.edgtf_im = new function() {
        this.$im = a("#edgtf-image-merge"), this.$vers = this.$im.find(".edgtf-im-vert-img"), this.$hors = this.$im.find(".edgtf-im-hor-img"), this.$shader = this.$im.find(".edgtf-image-merge-cover"), this.$backgroundColor = this.$im.closest(".vc_row").css("background-color"), this.init_state = {
          ver1: 30,
          ver2: 70,
          ver3: -40,
          ver4: 140,
          hor1: -40,
          hor2: 140
        }, this.h = this.$im.height() - edgtf.windowHeight, this.boundary = {
          start: Math.round(.4 * this.h),
          end: Math.round(this.h - .8 * edgtf.windowHeight)
        }, this.$shader.css("background-color", this.$backgroundColor);
        var c = !1,
          d = !1,
          e = !1;
        this.position = function() {
          c || (setTimeout(function() {
            b.css("visibility", "visible")
          }, 300), c = !0), edgtf.scroll < edgtf_im.$im.offset().top ? d || (edgtf_im.$im.find("img").css("opacity", "0"), d = !0) : c && d && (edgtf_im.$im.find("img").css("opacity", "1"), d = !1), edgtf.scroll > edgtf_im.$im.offset().top && !e && (edgtf_im.$im.find("img").css("opacity", "1"), e = !0);
          for (var a = edgtf.scroll - edgtf_im.$im.offset().top, f = 1; f <= 4; f++) {
            var g;
            a < edgtf_im.boundary.start ? (g = edgtf_im.init_state["ver" + f] + a / edgtf_im.boundary.start * (50 - edgtf_im.init_state["ver" + f]), edgtf_im.$vers.eq(f - 1).css({
              top: g + "%",
              left: "50%",
              transform: "translate3d(-50%," + (g - 100) + "%,0)",
              opacity: 1
            })) : a >= edgtf_im.boundary.start && a <= edgtf_im.boundary.end ? (g = 50, edgtf_im.$vers.eq(f - 1).css({
              top: g + "%",
              left: "50%",
              transform: "translate3d(-50%," + (g - 100) + "%,0)",
              opacity: 1
            })) : a > edgtf_im.boundary.end && (g = 50 - Math.round((a + edgtf_im.boundary.end) / 100) + b.outerHeight() / 100, edgtf_im.$vers.eq(f - 1).css({
              opacity: 1,
              transform: "translate3d(-50%," + (g - 100) + "%,0)"
            }))
          }
          for (var f = 1; f <= 2; f++) {
            var h;
            a < edgtf_im.boundary.start ? (h = edgtf_im.init_state["hor" + f] + a / edgtf_im.boundary.start * (50 - edgtf_im.init_state["hor" + f]), edgtf_im.$hors.eq(f - 1).css({
              left: h + "%",
              top: "50%",
              opacity: 1,
              transform: "translate3d(-50%,-50%,0)"
            })) : a >= edgtf_im.boundary.start && a <= edgtf_im.boundary.end ? (h = 50, edgtf_im.$hors.eq(f - 1).css({
              left: h + "%",
              top: "50%",
              opacity: 1,
              transform: "translate3d(-50%,-50%,0)"
            }), edgtf_im.$shader.css({
              opacity: 0
            })) : a > edgtf_im.boundary.end && (h = edgtf_im.init_state["hor" + (3 - f)], g = 50 - Math.round((a + edgtf_im.boundary.end) / 100) + b.outerHeight() / 100, edgtf_im.$hors.eq(f - 1).css({
              opacity: 1,
              transform: "translate3d(-50%," + (g - 100) + "%,0)"
            }), edgtf_im.$shader.css({
              opacity: 1
            }))
          }
        }, this.handle_resize = function() {
          edgtf_im.h = edgtf_im.$im.height() - edgtf.windowHeight, edgtf_im.boundary = {
            start: Math.round(.3 * this.h),
            end: Math.round(this.h - .75 * edgtf.windowHeight)
          }, edgtf_im.position()
        }, this.init = function() {
          edgtf_im.position(), a(window).scroll(edgtf_im.position), a(window).resize(edgtf_im.handle_resize)
        }
      }, edgtf_im.init()))
    }

    function T() {
      var b = a(".edgtf-device-presentation");
      b.length && !a("html").hasClass("touch") && b.each(function() {
        var b = a(this);
        b.hasClass("edgtf-animate-on-appear") ? setTimeout(function() {
          b.appear(function() {
            b.addClass("edgtf-appeared"), setTimeout(function() {
              b.addClass("edgtf-animated")
            }, 1200)
          }, {
            accX: 0,
            accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
          })
        }, 30) : b.addClass("edgtf-animated")
      })
    }
    var U = {};
    edgtf.modules.shortcodes = U, U.edgtfInitCounter = f, U.edgtfInitProgressBars = g, U.edgtfInitCountdown = k, U.edgtfInitMessages = i, U.edgtfInitMessageHeight = j, U.edgtfInitTestimonials = l, U.edgtfInitCarousels = m, U.edgtfInitPieChart = n, U.edgtfInitPieChartDoughnut = p, U.edgtfInitTabs = q, U.edgtfInitTabIcons = r, U.edgtfInitBlogListMasonry = s, U.edgtfCustomFontResize = u, U.edgtfInitImageGallery = z, U.edgtfInitAccordions = y, U.edgtfShowGoogleMap = v, U.edgtfInitPortfolioListMasonry = C, U.edgtfInitPortfolioListPinterest = F, U.edgtfInitPortfolio = A, U.edgtfInitPortfolioMasonryFilter = H, U.edgtfInitPortfolioSlider = I, U.edgtfInitPortfolioLoadMore = K, U.edgtfCheckSliderForHeaderStyle = O, U.edgtfCustomFontTypeOut = R, U.edgtfDevicePresentation = T, U.edgtfOnDocumentReady = b, U.edgtfOnWindowLoad = c, U.edgtfOnWindowResize = d, U.edgtfOnWindowScroll = e, a(document).ready(b), a(window).load(c), a(window).resize(d), a(window).scroll(e);
    var V = edgtf.modules.shortcodes.edgtfIcon = function() {
        var b = a(".edgtf-icon-shortcode"),
          c = function(a) {
            a.hasClass("edgtf-icon-animation") && a.appear(function() {
              a.parent(".edgtf-icon-animation-holder").addClass("edgtf-icon-animation-show");
            }, {
              accX: 0,
              accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
            })
          },
          d = function(a) {
            if ("undefined" != typeof a.data("hover-color")) {
              var b, c = function(a) {
                  a.data.icon.css("color", a.data.color)
                },
                d = a.find(".edgtf-icon-element"),
                e = a.data("hover-color"),
                f = d.css("color");
              a.parents(".edgtf-iwt").hasClass("edgtf-iwt-flip-enabled-yes") && (d.clone().addClass("edgtf-icon-element-clone").appendTo(d.parent()), b = a.find(".edgtf-icon-element-clone"), b.css("color", e)), (b || void 0 === b) && (b = d), "" !== e && (a.on("mouseenter", {
                icon: b,
                color: e
              }, c), a.on("mouseleave", {
                icon: d,
                color: f
              }, c))
            }
          },
          e = function(a) {
            if ("undefined" != typeof a.data("hover-background-color")) {
              var b = function(a) {
                  a.data.icon.css("background-color", a.data.color)
                },
                c = a.data("hover-background-color"),
                d = a.css("background-color");
              "" !== c && (a.on("mouseenter", {
                icon: a,
                color: c
              }, b), a.on("mouseleave", {
                icon: a,
                color: d
              }, b))
            }
          },
          f = function(a) {
            if ("undefined" != typeof a.data("hover-border-color")) {
              var b = function(a) {
                  a.data.icon.css("border-color", a.data.color)
                },
                c = a.data("hover-border-color"),
                d = a.css("border-color");
              "" !== c && (a.on("mouseenter", {
                icon: a,
                color: c
              }, b), a.on("mouseleave", {
                icon: a,
                color: d
              }, b))
            }
          };
        return {
          init: function() {
            b.length && b.each(function() {
              c(a(this)), d(a(this)), e(a(this)), f(a(this))
            })
          }
        }
      },
      W = edgtf.modules.shortcodes.edgtfSocialIconWidget = function() {
        var b = a(".edgtf-social-icon-widget-holder"),
          c = function(a) {
            if ("undefined" != typeof a.data("hover-color")) {
              var b = function(a) {
                  a.data.icon.css("color", a.data.color)
                },
                c = a,
                d = a.data("hover-color"),
                e = c.css("color");
              "" !== d && (a.on("mouseenter", {
                icon: c,
                color: d
              }, b), a.on("mouseleave", {
                icon: c,
                color: e
              }, b))
            }
          };
        return {
          init: function() {
            b.length && b.each(function() {
              c(a(this))
            })
          }
        }
      },
      X = edgtf.modules.shortcodes.edgtfButton = function() {
        var b = a(".edgtf-btn"),
          c = function(a) {
            if ("undefined" != typeof a.data("hover-color")) {
              var b = function(a) {
                  a.data.button.css("color", a.data.color)
                },
                c = a.css("color"),
                d = a.data("hover-color");
              a.on("mouseenter", {
                button: a,
                color: d
              }, b), a.on("mouseleave", {
                button: a,
                color: c
              }, b)
            }
          },
          d = function(a) {
            if ("undefined" != typeof a.data("hover-bg-color")) {
              var b = function(a) {
                  a.data.button.css("background-color", a.data.color)
                },
                c = a.css("background-color"),
                d = a.data("hover-bg-color");
              a.on("mouseenter", {
                button: a,
                color: d
              }, b), a.on("mouseleave", {
                button: a,
                color: c
              }, b)
            }
          },
          e = function(a) {
            if ("undefined" != typeof a.data("hover-border-color")) {
              var b = function(a) {
                  a.data.button.css("border-color", a.data.color)
                },
                c = a.css("borderTopColor"),
                d = a.data("hover-border-color");
              a.on("mouseenter", {
                button: a,
                color: d
              }, b), a.on("mouseleave", {
                button: a,
                color: c
              }, b)
            }
          };
        return {
          init: function() {
            b.length && b.each(function() {
              c(a(this)), d(a(this)), e(a(this))
            })
          }
        }
      },
      Y = edgtf.modules.shortcodes.edgtfSlider = function() {
        var b = a(".edgtf-slider .carousel"),
          c = /url\(["']?([^'")]+)['"]?\)/,
          d = function(b) {
            b.find(".item .edgtf-image").each(function() {
              var b = a(this);
              if (edgtf.windowWidth <= 600) "undefined" != typeof b.data("responsive-phone-image") && b.data("responsive-phone-image") !== !1 && "" !== b.data("responsive-phone-image") && b.css("background-image", "url(" + b.data("responsive-phone-image") + ")");
              else if (edgtf.windowWidth < 800) "undefined" != typeof b.data("responsive-tablet-image") && b.data("responsive-tablet-image") !== !1 && "" !== b.data("responsive-tablet-image") && b.css("background-image", "url(" + b.data("responsive-tablet-image") + ")");
              else if ("undefined" != typeof b.data("original-image") && b.data("original-image") !== !1 && "" !== b.data("original-image")) {
                var c = b.data("original-image");
                b.css("background-image", "url(" + c + ")")
              }
            })
          },
          e = function(a, b, c, d) {
            var e = b;
            d || (edgtf.windowWidth > c[0] ? e = b : edgtf.windowWidth > c[1] ? e = .75 * b : edgtf.windowWidth > c[2] ? e = .6 * b : edgtf.windowWidth > c[3] ? e = .55 * b : edgtf.windowWidth <= c[3] && (e = .45 * b)), a.css({
              height: e + "px"
            }), a.find(".edgtf-slider-preloader").css({
              height: e + "px"
            }), a.find(".edgtf-slider-preloader .edgtf-ajax-loader").css({
              display: "block"
            }), a.find(".item").css({
              height: e + "px"
            }), 0 === edgtfPerPageVars.vars.edgtfStickyScrollAmount && (edgtf.modules.header.stickyAppearAmount = e)
          },
          f = function(b) {
            var c = edgtf.windowWidth <= 1024 ? edgtfGlobalVars.vars.edgtfMobileHeaderHeight + a(".edgtf-top-bar").height() : 0,
              d = edgtf.windowWidth > 1024 ? edgtf.passepartout : 0;
            b.css({
              height: edgtf.windowHeight - c - d + "px"
            }), b.find(".edgtf-slider-preloader").css({
              height: edgtf.windowHeight - c - d + "px"
            }), b.find(".edgt-slider-preloader .edgtf-ajax-loader").css({
              display: "block"
            }), b.find(".item").css({
              height: edgtf.windowHeight - c - d + "px"
            }), 0 === edgtfPerPageVars.vars.edgtfStickyScrollAmount && (edgtf.modules.header.stickyAppearAmount = edgtf.windowHeight)
          },
          g = function(b) {
            b.find(".edgtf-slide-element-text-small, .edgtf-slide-element-text-normal, .edgtf-slide-element-text-large, .edgtf-slide-element-text-extra-large").each(function() {
              var b = a(this);
              "undefined" == typeof b.data("default-font-size") && b.data("default-font-size", parseInt(b.css("font-size"), 10)), "undefined" == typeof b.data("default-line-height") && b.data("default-line-height", parseInt(b.css("line-height"), 10)), "undefined" == typeof b.data("default-letter-spacing") && b.data("default-letter-spacing", parseInt(b.css("letter-spacing"), 10))
            }), b.find(".edgtf-slide-element-responsive-text").each(function() {
              "undefined" == typeof a(this).data("default-font-size") && a(this).data("default-font-size", parseInt(a(this).css("font-size"), 10)), "undefined" == typeof a(this).data("default-line-height") && a(this).data("default-line-height", parseInt(a(this).css("line-height"), 10)), "undefined" == typeof a(this).data("default-letter-spacing") && a(this).data("default-letter-spacing", parseInt(a(this).css("letter-spacing"), 10))
            }), b.find(".edgtf-slide-element-responsive-button").each(function() {
              var b = a(this).find("a");
              "undefined" == typeof a(this).data("default-font-size") && a(this).data("default-font-size", parseInt(b.css("font-size"), 10)), "undefined" == typeof a(this).data("default-line-height") && a(this).data("default-line-height", parseInt(b.css("line-height"), 10)), "undefined" == typeof a(this).data("default-letter-spacing") && a(this).data("default-letter-spacing", parseInt(b.css("letter-spacing"), 10)), "undefined" == typeof a(this).data("default-ver-padding") && (b.hasClass("edgtf-btn-solid") ? a(this).data("default-ver-padding", parseInt(b.find(".edgtf-btn-text").css("padding-top"), 10)) : a(this).data("default-ver-padding", parseInt(b.css("padding-top"), 10))), "undefined" == typeof a(this).data("default-hor-padding") && (b.hasClass("edgtf-btn-solid") ? a(this).data("default-hor-padding", parseInt(b.find(".edgtf-btn-text").css("padding-left"), 10)) : a(this).data("default-hor-padding", parseInt(b.css("padding-left"), 10)))
            }), b.find(".edgtf-slide-element").each(function() {
              var b = a(this);
              "undefined" == typeof b.data("default-margin-top") && b.data("default-margin-top", parseInt(b.css("margin-top"), 10)), "undefined" == typeof b.data("default-margin-bottom") && b.data("default-margin-bottom", parseInt(b.css("margin-bottom"), 10)), "undefined" == typeof b.data("default-margin-left") && b.data("default-margin-left", parseInt(b.css("margin-left"), 10)), "undefined" == typeof b.data("default-margin-right") && b.data("default-margin-right", parseInt(b.css("margin-right"), 10))
            }), h(b)
          },
          h = function(b) {
            var c = {
              mobile: 600,
              tabletp: 800,
              tabletl: 1024,
              laptop: 1440
            };
            b.find(".edgtf-slider-elements-container").each(function() {
              var b = a(this),
                d = b.filter(".edgtf-custom-elements").add(b.not(".edgtf-custom-elements").find(".edgtf-slider-elements-holder-frame")).not(".edgtf-grid");
              d.length && (c.mobile >= edgtf.windowWidth && b.attr("data-width-mobile").length ? d.css("width", b.data("width-mobile") + "%") : c.tabletp >= edgtf.windowWidth && b.attr("data-width-tablet-p").length ? d.css("width", b.data("width-tablet-p") + "%") : c.tabletl >= edgtf.windowWidth && b.attr("data-width-tablet-l").length ? d.css("width", b.data("width-tablet-l") + "%") : c.laptop >= edgtf.windowWidth && b.attr("data-width-laptop").length ? d.css("width", b.data("width-laptop") + "%") : b.attr("data-width-desktop").length && d.css("width", b.data("width-desktop") + "%"))
            }), b.find(".item").each(function() {
              var b = a(this),
                d = b.find(".edgtf-slider-elements-holder-frame").data("default-width"),
                e = b.find(".edgtf-slide-element");
              e.each(function() {
                var b, e = a(this),
                  f = e.data("default-margin-top"),
                  g = e.data("default-margin-bottom"),
                  h = e.data("default-margin-left"),
                  i = e.data("default-margin-right"),
                  j = "undefined" != typeof e.data("resp-scale") ? e.data("resp-scale") : void 0;
                b = c.mobile >= edgtf.windowWidth ? "undefined" == typeof j ? edgtf.windowWidth / d : parseFloat(j.mobile) : c.tabletp >= edgtf.windowWidth ? "undefined" == typeof j ? edgtf.windowWidth / d : parseFloat(j.tabletp) : c.tabletl >= edgtf.windowWidth ? "undefined" == typeof j ? edgtf.windowWidth / d : parseFloat(j.tabletl) : c.laptop >= edgtf.windowWidth ? "undefined" == typeof j ? edgtf.windowWidth / d : parseFloat(j.laptop) : "undefined" == typeof j ? edgtf.windowWidth / d : parseFloat(j.desktop), e.css({
                  "margin-top": Math.round(b * f) + "px",
                  "margin-bottom": Math.round(b * g) + "px",
                  "margin-left": Math.round(b * h) + "px",
                  "margin-right": Math.round(b * i) + "px"
                })
              }), e.filter(".edgtf-slide-element-responsive-text, .edgtf-slide-element-responsive-button, .edgtf-slide-element-responsive-image").add(e.find("a.edgtf-slide-element-responsive-text, span.edgtf-slide-element-responsive-text")).each(function() {
                var b, e, f, g = a(this),
                  h = "undefined" != typeof g.data("resp-scale") ? g.data("resp-scale") : void 0,
                  i = "undefined" != typeof g.data("resp-left") ? g.data("resp-left") : void 0,
                  j = "undefined" != typeof g.data("resp-top") ? g.data("resp-top") : void 0;
                if (c.mobile >= edgtf.windowWidth ? (b = "undefined" == typeof h ? edgtf.windowWidth / d : parseFloat(h.mobile), e = "undefined" == typeof i ? "undefined" != typeof g.data("left") ? g.data("left") + "%" : "" : "" != i.mobile ? i.mobile + "%" : g.data("left") + "%", f = "undefined" == typeof j ? "undefined" != typeof g.data("top") ? g.data("top") + "%" : "" : "" != j.mobile ? j.mobile + "%" : g.data("top") + "%") : c.tabletp >= edgtf.windowWidth ? (b = "undefined" == typeof h ? edgtf.windowWidth / d : parseFloat(h.tabletp), e = "undefined" == typeof i ? "undefined" != typeof g.data("left") ? g.data("left") + "%" : "" : "" != i.tabletp ? i.tabletp + "%" : g.data("left") + "%", f = "undefined" == typeof j ? "undefined" != typeof g.data("top") ? g.data("top") + "%" : "" : "" != j.tabletp ? j.tabletp + "%" : g.data("top") + "%") : c.tabletl >= edgtf.windowWidth ? (b = "undefined" == typeof h ? edgtf.windowWidth / d : parseFloat(h.tabletl), e = "undefined" == typeof i ? "undefined" != typeof g.data("left") ? g.data("left") + "%" : "" : "" != i.tabletl ? i.tabletl + "%" : g.data("left") + "%", f = "undefined" == typeof j ? "undefined" != typeof g.data("top") ? g.data("top") + "%" : "" : "" != j.tabletl ? j.tabletl + "%" : g.data("top") + "%") : c.laptop >= edgtf.windowWidth ? (b = "undefined" == typeof h ? edgtf.windowWidth / d : parseFloat(h.laptop), e = "undefined" == typeof i ? "undefined" != typeof g.data("left") ? g.data("left") + "%" : "" : "" != i.laptop ? i.laptop + "%" : g.data("left") + "%", f = "undefined" == typeof j ? "undefined" != typeof g.data("top") ? g.data("top") + "%" : "" : "" != j.laptop ? j.laptop + "%" : g.data("top") + "%") : (b = "undefined" == typeof h ? edgtf.windowWidth / d : parseFloat(h.desktop), e = "undefined" == typeof i ? "undefined" != typeof g.data("left") ? g.data("left") + "%" : "" : "" != i.desktop ? i.desktop + "%" : g.data("left") + "%", f = "undefined" == typeof j ? "undefined" != typeof g.data("top") ? g.data("top") + "%" : "" : "" != j.desktop ? j.desktop + "%" : g.data("top") + "%"), b) {
                  g.show();
                  var k, l, m, n, o, p;
                  if (g.is(".edgtf-slide-element-responsive-button")) k = g.data("default-font-size"), l = g.data("default-line-height"), m = g.data("default-letter-spacing"), n = g.data("default-ver-padding"), o = g.data("default-hor-padding"), p = g.find(".edgtf-btn"), g.css({
                    left: e,
                    top: f
                  }), p.css({
                    "font-size": Math.round(b * k) + "px",
                    "line-height": Math.round(b * l) + "px",
                    "letter-spacing": Math.round(b * m) + "px"
                  }), p.hasClass("edgtf-btn-solid") ? p.find(".edgtf-btn-text").css({
                    "padding-left": Math.round(b * o) + "px",
                    "padding-right": Math.round(b * o) + "px",
                    "padding-top": Math.round(b * n) + "px",
                    "padding-bottom": Math.round(b * n) + "px"
                  }) : p.css({
                    "padding-left": Math.round(b * o) + "px",
                    "padding-right": Math.round(b * o) + "px",
                    "padding-top": Math.round(b * n) + "px",
                    "padding-bottom": Math.round(b * n) + "px"
                  });
                  else if (g.is(".edgtf-slide-element-responsive-image"))
                    if (b != edgtf.windowWidth / d) {
                      var q = g.data("upload-width"),
                        r = g.data("upload-height");
                      g.filter(".custom-image").css({
                        left: e,
                        top: f
                      }).add(g.not(".custom-image").find("img")).css({
                        width: Math.round(b * q) + "px",
                        height: Math.round(b * r) + "px"
                      })
                    } else {
                      var s = g.data("width");
                      g.filter(".custom-image").css({
                        left: e,
                        top: f
                      }).add(g.not(".custom-image").find("img")).css({
                        width: s + "%",
                        height: ""
                      })
                    }
                  else k = g.data("default-font-size"), l = g.data("default-line-height"), m = g.data("default-letter-spacing"), g.css({
                      left: e,
                      top: f,
                      "font-size": Math.round(b * k) + "px",
                      "line-height": Math.round(b * l) + "px",
                      "letter-spacing": Math.round(b * m) + "px"
                    })
                } else g.hide()
              })
            });
            var d = b.find(".carousel-indicators");
            b.find(".edgtf-slide-element-section-link").css("bottom", d.length ? parseInt(d.css("bottom"), 10) + d.outerHeight() + 10 + "px" : "20px")
          },
          i = function(b) {
            b.find(".item").each(function() {
              var b = a(this).find(".edgtf-slide-element-button-inline");
              b.css("display", "inline-block").wrapAll('<div class="edgtf-slide-elements-buttons-wrapper" style="text-align: ' + b.eq(0).css("text-align") + ';"/>')
            })
          },
          j = function(b) {
            var c = [1600, 1200, 900, 650, 500, 320];
            if (g(b), b.hasClass("edgtf-full-screen")) f(b), a(window).resize(function() {
              f(b), h(b)
            });
            else if (b.hasClass("edgtf-responsive-height")) {
              var d = b.data("height");
              e(b, d, c, !1), a(window).resize(function() {
                e(b, d, c, !1), h(b)
              })
            } else {
              var d = b.data("height");
              b.find(".edgtf-slider-preloader").css({
                height: b.height() + "px"
              }), b.find(".edgtf-slider-preloader .edgtf-ajax-loader").css({
                display: "block"
              }), edgtf.windowWidth < 1e3 ? e(b, d, c, !1) : e(b, d, c, !0), a(window).resize(function() {
                edgtf.windowWidth < 1e3 ? e(b, d, c, !1) : e(b, d, c, !0), h(b)
              })
            }
          },
          k = function(b) {
            d(b), a(window).resize(function() {
              d(b)
            })
          },
          l = function(a, b, c) {
            1 == b ? (a.find(".left.carousel-control .prev").html(c), a.find(".right.carousel-control .next").html(b + 1)) : b == c ? (a.find(".left.carousel-control .prev").html(b - 1), a.find(".right.carousel-control .next").html(1)) : (a.find(".left.carousel-control .prev").html(b - 1), a.find(".right.carousel-control .next").html(b + 1))
          },
          m = function(b) {
            var c = 1500,
              d = 1920,
              e = 1080,
              f = 1920 / 1080;
            b.find(".item .edgtf-video .edgtf-video-wrap").each(function() {
              var b = edgtf.windowWidth,
                g = a(this).closest(".carousel").height();
              a(this).width(b), c = f * (g + 20), a(this).height(g);
              var h = b / d,
                i = (g - edgtfGlobalVars.vars.edgtfMenuAreaHeight) / e,
                j = i;
              h > i && (j = h), j * d < c && (j = c / d), a(this).find("video, .mejs-overlay, .mejs-poster").width(Math.ceil(j * d + 2)), a(this).find("video, .mejs-overlay, .mejs-poster").height(Math.ceil(j * e + 2)), a(this).scrollLeft((a(this).find("video").width() - b) / 2), a(this).find(".mejs-overlay, .mejs-poster").scrollTop((a(this).find("video").height() - g) / 2), a(this).scrollTop((a(this).find("video").height() - g) / 2)
            })
          },
          n = function(b) {
            a(".item .edgtf-video-wrap .edgtf-video-element").mediaelementplayer({
              enableKeyboard: !1,
              iPadUseNativeControls: !1,
              pauseOtherPlayers: !1,
              iPhoneUseNativeControls: !1,
              AndroidUseNativeControls: !1
            }), m(b), a(window).resize(function() {
              m(b)
            }), navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/) && (a(".edgtf-slider .edgtf-mobile-video-image").show(), a(".edgtf-slider .edgtf-video-wrap").remove())
          },
          o = function(b) {
            if (b.hasClass("edgtf-slide-peek")) {
              var c, d = function(a, b) {
                  var d = a.is(".left") ? "left" : "right",
                    e = h.filter("." + d);
                  if (b) {
                    a.addClass("hovered");
                    var f = (g.index(g.filter(".active")) + ("left" == d ? -1 : 1) + g.length) % g.length;
                    e.find(".edgtf-slider-peeker-inner").css({
                      "background-image": g.eq(f).find(".edgtf-image, .edgtf-mobile-video-image").css("background-image"),
                      width: c + "px"
                    }), e.addClass("shown")
                  } else a.removeClass("hovered"), h.removeClass("shown")
                },
                e = function(a, b) {
                  if (b) {
                    a.addClass("hovered");
                    var d = a.data("slide-to"),
                      e = g.index(g.filter(".active"));
                    if (e != d) {
                      var f = d < e ? "left" : "right",
                        i = h.filter("." + f);
                      i.find(".edgtf-slider-peeker-inner").css({
                        "background-image": g.eq(d).find(".edgtf-image, .edgtf-mobile-video-image").css("background-image"),
                        width: c + "px"
                      }), i.addClass("shown")
                    }
                  } else a.removeClass("hovered"), h.removeClass("shown")
                },
                f = function() {
                  c = g.filter(".active").width(), c += c % 2 ? 1 : 0, g.children(".edgtf-image, .edgtf-video").css({
                    position: "absolute",
                    width: c + "px",
                    height: "110%",
                    left: "50%",
                    transform: "translateX(-50%)"
                  })
                },
                g = b.find(".item");
              f(), a(window).resize(f), b.find(".carousel-inner").append('<div class="edgtf-slider-peeker left"><div class="edgtf-slider-peeker-inner"></div></div><div class="edgtf-slider-peeker right"><div class="edgtf-slider-peeker-inner"></div></div>');
              var h = b.find(".edgtf-slider-peeker"),
                i = b.find(".carousel-control"),
                j = b.find(".carousel-indicators > li");
              i.hover(function() {
                d(a(this), !0)
              }, function() {
                d(a(this), !1)
              }), j.hover(function() {
                e(a(this), !0)
              }, function() {
                e(a(this), !1)
              }), b.on("slide.bs.carousel", function() {
                setTimeout(function() {
                  h.addClass("edgtf-slide-peek-in-progress").removeClass("shown")
                }, 500)
              }), b.on("slid.bs.carousel", function() {
                i.filter(".hovered").each(function() {
                  d(a(this), !0)
                }), setTimeout(function() {
                  j.filter(".hovered").each(function() {
                    e(a(this), !0)
                  })
                }, 200), h.removeClass("edgtf-slide-peek-in-progress")
              })
            }
          },
          p = function(b) {
            if (b.hasClass("edgtf-slider-thumbs")) {
              var d, e, f, g = b.find(".item").length,
                h = b.find(".item").index(a(".item.active")[0]) + 1;
              l(b, h, g), b.find(".item.active").prev(".item").length ? (b.find(".item.active").prev("div").find(".edgtf-image").length ? (d = c.exec(b.find(".active").prev("div").find(".edgtf-image").attr("style")), e = new Image, e.src = d[1]) : (e = b.find(".active").prev("div").find("> .edgtf-video").clone(), e.find(".edgtf-video-overlay, .mejs-offscreen").remove(), e.find(".edgtf-video-wrap").width(150).height(84), e.find(".mejs-container").width(150).height(84), e.find("video").width(150).height(84)), b.find(".left.carousel-control .img .old").fadeOut(300, function() {
                a(this).remove()
              }), b.find(".left.carousel-control .img").append(e).find("div.thumb-image, > img, div.edgtf-video").fadeIn(300).addClass("old")) : (b.find(".carousel-inner .item:last-child .edgtf-image").length ? (d = c.exec(b.find(".carousel-inner .item:last-child .edgtf-image").attr("style")), e = new Image, e.src = d[1]) : (e = b.find(".carousel-inner .item:last-child > .edgtf-video").clone(), e.find(".edgtf-video-overlay, .mejs-offscreen").remove(), e.find(".edgtf-video-wrap").width(150).height(84), e.find(".mejs-container").width(150).height(84), e.find("video").width(150).height(84)), b.find(".left.carousel-control .img .old").fadeOut(300, function() {
                a(this).remove()
              }), b.find(".left.carousel-control .img").append(e).find("div.thumb-image, > img, div.edgtf-video").fadeIn(300).addClass("old")), b.find(".active").next("div.item").length ? (b.find(".active").next("div").find(".edgtf-image").length ? (d = c.exec(b.find(".active").next("div").find(".edgtf-image").attr("style")), f = new Image, f.src = d[1]) : (f = b.find(".active").next("div").find("> .edgtf-video").clone(), f.find(".edgtf-video-overlay, .mejs-offscreen").remove(), f.find(".edgtf-video-wrap").width(150).height(84), f.find(".mejs-container").width(150).height(84), f.find("video").width(150).height(84)), b.find(".right.carousel-control .img .old").fadeOut(300, function() {
                a(this).remove()
              }), b.find(".right.carousel-control .img").append(f).find("div.thumb-image, > img, div.edgtf-video").fadeIn(300).addClass("old")) : (b.find(".carousel-inner .item:first-child .edgtf-image").length ? (d = c.exec(b.find(".carousel-inner .item:first-child .edgtf-image").attr("style")), f = new Image, f.src = d[1]) : (f = b.find(".carousel-inner .item:first-child > .edgtf-video").clone(), f.find(".edgtf-video-overlay, .mejs-offscreen").remove(), f.find(".edgtf-video-wrap").width(150).height(84), f.find(".mejs-container").width(150).height(84), f.find("video").width(150).height(84)), b.find(".right.carousel-control .img .old").fadeOut(300, function() {
                a(this).remove()
              }), b.find(".right.carousel-control .img").append(f).find("div.thumb-image, > img, div.edgtf-video").fadeIn(300).addClass("old"))
            }
          },
          q = function(b) {
            var c = b.find(".edgtf-video");
            if (c.each(function() {
                var b = a(this);
                if (!b.parents(".active").length) {
                  var c = b.find("video.edgtf-video-element").attr("id");
                  a("#" + c).get(0).pause(), a("#" + c).get(0).currentTime = 0
                }
              }), b.find(".active .edgtf-video").length) {
              var d = b.find(".active .edgtf-video video.edgtf-video-element").attr("id");
              a("#" + d).get(0).play()
            }
          },
          r = function(b, c, d) {
            b.find(".carousel-inner .item:first-child").addClass("active"), O(a(".carousel .active"), b.hasClass("edgtf-header-effect")), b.hasClass("edgtf-slider-numbers") && l(b, 1, c), b.find(".item video").length && (n(b), q(b)), p(b), o(b), b.find(".edgtf-slide-element-wrapper-link").mouseenter(function() {
              a(this).removeClass("inheriting")
            }).mouseleave(function() {
              a(this).addClass("inheriting")
            }), b.hasClass("edgtf-auto-start") ? b.carousel({
              interval: d,
              pause: !1
            }) : b.carousel({
              interval: 0,
              pause: !1
            }), a(window).scroll(function() {
              b.hasClass("edgtf-full-screen") && edgtf.scroll > edgtf.windowHeight && edgtf.windowWidth > 1e3 ? b.carousel("pause") : !b.hasClass("edgtf-full-screen") && edgtf.scroll > b.height() && edgtf.windowWidth > 1e3 ? b.carousel("pause") : b.carousel("cycle")
            })
          };
        return {
          init: function() {
            if (b.length) {
              if (b.each(function() {
                  var b = a(this),
                    d = b.data("slide_animation_timeout"),
                    e = b.find(".item").length;
                  if (k(b), i(b), j(b), edgtf.htmlEl.hasClass("touch")) {
                    if (b.find(".item:first-child .edgtf-mobile-video-image").length > 0) var f = c.exec(b.find(".item:first-child .edgtf-mobile-video-image").attr("style"));
                    else var f = c.exec(b.find(".item:first-child .edgtf-image").attr("style"));
                    if (f) {
                      var g = new Image;
                      g.src = f[1], a(g).load(function() {
                        a(".edgtf-slider-preloader").fadeOut(500), r(b, e, d)
                      })
                    }
                  } else if (b.find(".item:first-child video").length > 0) b.find(".item:first-child video").eq(0).one("loadeddata", function() {
                    a(".edgtf-slider-preloader").fadeOut(500), r(b, e, d)
                  });
                  else {
                    var f = c.exec(b.find(".item:first-child .edgtf-image").attr("style"));
                    if (f) {
                      var g = new Image;
                      g.src = f[1], a(g).load(function() {
                        a(".edgtf-slider-preloader").fadeOut(500), r(b, e, d), setTimeout(function() {
                          b.find(".active").addClass("edgtf-animate-slide-image")
                        }, 250)
                      })
                    }
                  }
                  b.on("slide.bs.carousel", function() {
                    b.addClass("edgtf-in-progress"), b.find(".active .edgtf-slider-elements-holder-frame, .active .edgtf-slide-element-section-link").fadeTo(250, 0)
                  }), b.on("slid.bs.carousel", function() {
                    if (b.removeClass("edgtf-in-progress"), b.find(".active .edgtf-slider-elements-holder-frame, .active .edgtf-slide-element-section-link").fadeTo(0, 1), b.find(".item video").length && q(b), setTimeout(function() {
                        b.find(".item:not(.active)").removeClass("edgtf-animate-slide-image"), b.find(".item.active").addClass("edgtf-animate-slide-image")
                      }, 250), b.hasClass("edgtf-slider-numbers")) {
                      var c = a(".item").index(a(".item.active")[0]) + 1;
                      l(b, c, e)
                    }
                    b.hasClass("edgtf-slider-thumbs") && p(b)
                  }), b.swipe({
                    swipeLeft: function() {
                      b.carousel("next")
                    },
                    swipeRight: function() {
                      b.carousel("prev")
                    },
                    threshold: 20
                  })
                }), a(".no-touch .carousel").length) {
                var d = skrollr.init({
                  smoothScrolling: !1,
                  forceHeight: !1
                });
                d.refresh()
              }
              a(window).scroll(function() {
                a(".edgtf-slider .carousel").height() < edgtf.scroll ? a(".edgtf-slider .carousel").addClass("edgtf-disable-slider-header-style-changing") : (a(".edgtf-slider .carousel").removeClass("edgtf-disable-slider-header-style-changing"), O(a(".edgtf-slider .carousel .active"), a(".edgtf-slider .carousel").hasClass("edgtf-header-effect"))), a(".edgtf-slider .carousel").hasClass("edgtf-full-screen") && edgtf.scroll > edgtf.windowHeight && edgtf.windowWidth > 1e3 ? a(".edgtf-slider .carousel").find(".carousel-inner, .carousel-indicators").hide() : !a(".edgtf-slider .carousel").hasClass("edgtf-full-screen") && edgtf.scroll > a(".edgtf-slider .carousel").height() && edgtf.windowWidth > 1e3 ? a(".edgtf-slider .carousel").find(".carousel-inner, .carousel-indicators").hide() : a(".edgtf-slider .carousel").find(".carousel-inner, .carousel-indicators").show()
              })
            }
          }
        }
      },
      Z = edgtf.modules.shortcodes.edgtfInitIconList = function() {
        var b = a(".edgtf-animate-list"),
          c = function(a) {
            setTimeout(function() {
              a.appear(function() {
                a.addClass("edgtf-appeared")
              }, {
                accX: 0,
                accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
              })
            }, 30)
          };
        return {
          init: function() {
            b.length && b.each(function() {
              c(a(this))
            })
          }
        }
      }
  }(jQuery),
  function(a) {
    "use strict";

    function b() {
      f(), g(), h(), i(), j()
    }

    function c() {}

    function d() {}

    function e() {}

    function f() {
      a(document).on("click", ".edgtf-quantity-minus, .edgtf-quantity-plus", function(b) {
        b.stopPropagation();
        var c, d = a(this),
          e = d.parent().siblings(".edgtf-quantity-input"),
          f = parseFloat(e.attr("step")),
          g = parseFloat(e.attr("max")),
          h = !1,
          i = parseFloat(e.val());
        d.hasClass("edgtf-quantity-minus") && (h = !0), h ? (c = i - f, c >= 1 ? e.val(c) : e.val(0)) : (c = i + f, void 0 === g ? e.val(c) : c >= g ? e.val(g) : e.val(c)), e.trigger("change")
      })
    }

    function g() {
      a(".add_to_cart_button").click(function() {
        a(this).children(".edgtf-btn-text").text(edgtfGlobalVars.vars.edgtfAddingToCart)
      })
    }

    function h() {
      (a(".woocommerce-ordering .orderby").length || a("#calc_shipping_country").length) && (a(".woocommerce-ordering .orderby").select2({
        minimumResultsForSearch: 1 / 0
      }), a("#calc_shipping_country, .dropdown_product_cat, .dropdown_layered_nav_color").select2())
    }

    function i() {
      var b = a(".edgtf-single-product-wrapper-top .images .thumbnails > a"),
        c = a(".edgtf-single-product-wrapper-top .images .woocommerce-main-image");
      c.length && c.on("click", function(b) {
        b.preventDefault(), c.children(".edgtf-fake-featured-image").length && a(".edgtf-fake-featured-image").stop().animate({
          opacity: "0"
        }, 100, function() {
          a(this).remove()
        })
      }), b.length && b.each(function() {
        var b = a(this),
          d = b.attr("href");
        b.on("click", function(b) {
          b.preventDefault(), "" !== d && "" !== c && (c.append('<img itemprop="image" class="edgtf-fake-featured-image" src="' + d + '" />'), c.children(".edgtf-fake-featured-image").length > 1 && a(".edgtf-fake-featured-image").first().remove())
        })
      })
    }

    function j() {
      var b = a(".related.products");
      if (b.length) {
        var c, d, e = b.find("ul.products"),
          f = b.find(".edgtf-related-prev"),
          g = b.find(".edgtf-related-next"),
          h = b.data("columns-number"),
          i = [{
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: !0
            }
          }, {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: !0
            }
          }, {
            breakpoint: 601,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }];
        e.slick({
          infinite: !0,
          slidesToShow: h,
          arrows: !0,
          dots: !1,
          slide: "li",
          dotsClass: "edgtf-slick-dots",
          adaptiveHeight: !0,
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"></span>',
          responsive: i
        }), c = b.find(".edgtf-slick-prev"), d = b.find(".edgtf-slick-next"), f.click(function() {
          c.trigger("click")
        }), g.click(function() {
          d.trigger("click")
        })
      }
    }
    var k = {};
    edgtf.modules.woocommerce = k, k.edgtfInitQuantityButtons = f, k.edgtfInitSelect2 = h, k.edgtfOnDocumentReady = b, k.edgtfOnWindowLoad = c, k.edgtfOnWindowResize = d, k.edgtfOnWindowScroll = e, a(document).ready(b), a(window).load(c), a(window).resize(d), a(window).scroll(e)
  }(jQuery),
  function(a) {
    "use strict";

    function b() {
      f(), j(), n().init(), i()
    }

    function c() {
      l().init(), m().init()
    }

    function d() {}

    function e() {}

    function f() {
      var b = a(".edgtf-portfolio-single-holder.small-masonry .edgtf-portfolio-media, .edgtf-portfolio-single-holder.big-masonry .edgtf-portfolio-media");
      b.length && b.each(function() {
        var b = a(this);
        b.waitForImages(function() {
          var a = b.find(".edgtf-single-masonry-grid-sizer").width();
          h(a, b), g(b)
        }), a(window).resize(function() {
          var a = b.find(".edgtf-single-masonry-grid-sizer").width();
          h(a, b), g(b)
        })
      })
    }

    function g(a) {
      a.animate({
        opacity: 1
      }), a.isotope({
        itemSelector: ".edgtf-portfolio-single-media",
        masonry: {
          columnWidth: ".edgtf-single-masonry-grid-sizer"
        }
      })
    }

    function h(a, b) {
      var c = b.find(".edgtf-default-masonry-item"),
        d = b.find(".edgtf-large-width-masonry-item"),
        e = b.find(".edgtf-large-height-masonry-item"),
        f = b.find(".edgtf-large-width-height-masonry-item");
      c.css("height", a), e.css("height", Math.round(2 * a)), edgtf.windowWidth > 600 ? (f.css("height", Math.round(2 * a)), d.css("height", a)) : (f.css("height", a), d.css("height", Math.round(a / 2)))
    }

    function i() {
      var b = a(".edgtf-portfolio-related-holder");
      if (b.length) {
        var c = b.find(".edgtf-related-prev"),
          d = b.find(".edgtf-related-next"),
          e = b.find(".edgtf-slick-prev"),
          f = b.find(".edgtf-slick-next");
        c.click(function() {
          e.trigger("click")
        }), d.click(function() {
          f.trigger("click")
        })
      }
    }

    function j() {
      var b = a(".edgtf-ptf-wide-slider");
      if (b.length) {
        var c;
        b.on("init", function(d) {
          c = b.find(".slick-slide"), c.each(function() {
            var b = a(this),
              c = 0;
            b.on("mousedown", function() {
              c = 0
            }), b.on("mousemove", function() {
              c = 1
            }), b.on("mouseup", function(a) {
              0 === c ? edgtf.modules.common.edgtfPrettyPhoto() : 1 === c && b.find('a[data-rel^="prettyPhoto"]').unbind("click")
            })
          })
        }), b.slick({
          infinite: !0,
          autoplay: !0,
          slidesToShow: 3,
          centerMode: !0,
          arrows: !0,
          dots: !1,
          adaptiveHeight: !0,
          prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="lnr lnr-chevron-left"></span></span>',
          nextArrow: '<span class="edgtf-slick-next edgtf-next-icon"><span class="lnr lnr-chevron-right"></span></span>'
        })
      }
    }
    var k = {};
    edgtf.modules.portfolio = k, k.edgtfOnDocumentReady = b, k.edgtfOnWindowLoad = c, k.edgtfOnWindowResize = d, k.edgtfOnWindowScroll = e, k.edgtfPortfolioSingleMasonry = f, k.edgtfPortfolioWideSlider = j, k.edgtfPortfolioRelatedProducts = i, a(document).ready(b), a(window).load(c), a(window).resize(d), a(window).scroll(e);
    var l = function() {
        var b = a(".edgtf-follow-portfolio-info .small-images.edgtf-portfolio-single-holder .edgtf-portfolio-info-holder, .edgtf-follow-portfolio-info .small-slider.edgtf-portfolio-single-holder .edgtf-portfolio-info-holder, .edgtf-follow-portfolio-info .wide-images.edgtf-portfolio-single-holder .edgtf-portfolio-info-holder, .edgtf-follow-portfolio-info .gallery.edgtf-portfolio-single-holder .edgtf-portfolio-info-holder");
        if (b.length) var c = b.parent(),
          d = c.offset().top,
          e = c.height(),
          f = a(".edgtf-portfolio-media"),
          g = f.height(),
          h = a(".header-appear, .edgtf-fixed-wrapper"),
          i = h.length ? h.height() : 0;
        var j = function() {
            if (b.length && edgtf.windowWidth > 1024 && g > e && edgtf.scroll > d) {
              var a = edgtf.scroll - d + edgtfGlobalVars.vars.edgtfAddForAdminBar + i + 20;
              a + e > g && (a = g - e), b.animate({
                marginTop: a
              })
            }
          },
          k = function() {
            b.length && edgtf.windowWidth > 1024 && g > e && (edgtf.scroll > d ? edgtf.scroll + i + edgtfGlobalVars.vars.edgtfAddForAdminBar + e + 100 < d + g ? (a(".header-appear, .edgtf-fixed-wrapper").length && (i = a(".header-appear, .edgtf-fixed-wrapper").height()), b.stop().animate({
              marginTop: edgtf.scroll - d + edgtfGlobalVars.vars.edgtfAddForAdminBar + i + 20
            }), i = 0) : b.stop().animate({
              marginTop: g - e
            }) : b.stop().animate({
              marginTop: 0
            }))
          };
        return {
          init: function() {
            j(), a(window).scroll(function() {
              k()
            })
          }
        }
      },
      m = function() {
        var b = a(".edgtf-portfolio-single-holder.split-screen"),
          c = a(".edgtf-follow-portfolio-info .split-screen.edgtf-portfolio-single-holder .edgtf-portfolio-info-holder");
        if (c.length && edgtf.htmlEl.hasClass("no-touch")) var d = c.parent(),
          e = d.offset().top,
          f = c.outerHeight() + 100,
          g = a(".edgtf-portfolio-media"),
          h = g.height(),
          i = a(".edgtf-page-header"),
          j = i.find(".edgtf-fixed-wrapper"),
          k = i.length ? i.height() : 0,
          l = j.length ? j.height() : 0,
          m = k + 15;
        var n = function() {
            c.length && edgtf.htmlEl.hasClass("no-touch") && c.css("width", c.width())
          },
          o = function() {
            if (c.length && edgtf.htmlEl.hasClass("no-touch")) {
              var a = i.find(".edgtf-sticky-header");
              if (a.length)
                if (a.hasClass("header-appear")) m = edgtfGlobalVars.vars.edgtfStickyHeaderTransparencyHeight + edgtfGlobalVars.vars.edgtfAddForAdminBar + 15;
                else {
                  var b = k - edgtf.scroll > 0;
                  m = b ? edgtfGlobalVars.vars.edgtfAddForAdminBar + k - 5 : 24
                }
              else j.length && (m = edgtfGlobalVars.vars.edgtfAddForAdminBar + l + 15);
              c.length && h > f && edgtf.htmlEl.hasClass("no-touch") && c.css("top", m + "px")
            }
          },
          p = function() {
            c.length && edgtf.htmlEl.hasClass("no-touch") ? (f = c.outerHeight() + 30, h = g.height(), h > f && edgtf.htmlEl.hasClass("no-touch") && (j.length && (k = l), edgtf.scroll >= e - k - edgtfGlobalVars.vars.edgtfAddForAdminBar ? "fixed" !== c.css("position") && (c.css("position", "fixed"), edgtf.scroll > 0 && (c.addClass("edgtf-animating"), c.one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
              c.removeClass("edgtf-animating")
            }))) : c.css("position", "static"), e + h <= edgtf.scroll + f + m ? c.stop().css("margin-top", e + h - edgtf.scroll - f - m + "px") : c.css("margin-top", "0")), c.hasClass("edgtf-appeared") || c.addClass("edgtf-appeared")) : edgtf.htmlEl.hasClass("touch") && (c.hasClass("edgtf-appeared") || c.addClass("edgtf-appeared"))
          };
        return {
          init: function() {
            b.length && (n(), p(), o(), a(window).scroll(function() {
              p(), o()
            }), a(window).resize(function() {
              o(), p()
            }))
          }
        }
      },
      n = function() {
        var b = a(".edgtf-full-screen-slider-holder"),
          c = a(".edgtf-wrapper .edgtf-content"),
          d = a(".edgtf-portfolio-full-screen-slider"),
          e = a(".full-screen-slider"),
          f = function() {
            if (b.length) {
              var d = parseInt(c.css("margin-top")),
                f = b.find(".edgtf-portfolio-single-media"),
                g = a(".edgtf-title"),
                h = 0,
                i = edgtf.windowHeight;
              if (edgtf.body.hasClass("edgtf-passepartout")) {
                var j = a(".edgtf-passepartout-top");
                h = 2 * j.outerHeight(),
                  i -= h
              }
              g.length && (i -= g.height()), edgtf.windowWidth > 1024 ? d >= 0 && (i -= edgtfGlobalVars.vars.edgtfMenuAreaHeight) : i -= edgtfGlobalVars.vars.edgtfMobileHeaderHeight, e.css("height", i), b.css("height", i), f.css("height", i)
            }
          },
          g = function() {
            b.length && d.each(function() {
              var b = a(this);
              b.on("init", function(a) {
                var c = b.find(".slick-active.edgtf-portfolio-single-media");
                c.hasClass("edgtf-slide-dark-skin") ? b.removeClass("edgtf-slide-light-skin").addClass("edgtf-slide-dark-skin") : b.removeClass("edgtf-slide-dark-skin").addClass("edgtf-slide-light-skin")
              }), b.on("afterChange", function(a, c) {
                var d = b.find(".slick-active.edgtf-portfolio-single-media");
                d.hasClass("edgtf-slide-dark-skin") ? b.removeClass("edgtf-slide-light-skin").addClass("edgtf-slide-dark-skin") : b.removeClass("edgtf-slide-dark-skin").addClass("edgtf-slide-light-skin")
              }), b.slick({
                vertical: !0,
                verticalSwiping: !0,
                infinite: !0,
                slidesToShow: 1,
                arrows: !0,
                dots: !1,
                easing: "easeOutQuart",
                dotsClass: "edgtf-slick-dots",
                prevArrow: '<span class="edgtf-slick-prev edgtf-prev-icon"><span class="arrow_up"></span></span>',
                nextArrow: '<span class="edgtf-slick-next edgtf-prev-icon"><span class="arrow_down"></span></span>',
                customPaging: function(a, b) {
                  return '<span class="edgtf-slick-dot-inner"></span>'
                }
              }).animate({
                opacity: 1
              }, 600)
            })
          },
          h = function() {
            if (b.length) {
              var c = a(".edgtf-portfolio-slider-content"),
                d = a(".edgtf-control.edgtf-close"),
                e = a(".edgtf-description"),
                f = a(".edgtf-portfolio-slider-content-info");
              c.on("click", function(b) {
                b.preventDefault(), c.hasClass("opened") || e.fadeOut(400, function() {
                  c.addClass("opened"), setTimeout(function() {
                    f.fadeIn(400)
                  }, 400), setTimeout(function() {
                    a(".edgtf-portfolio-slider-content-info").niceScroll({
                      scrollspeed: 60,
                      mousescrollstep: 40,
                      cursorwidth: 0,
                      cursorborder: 0,
                      cursorborderradius: 0,
                      cursorcolor: "transparent",
                      autohidemode: !1,
                      horizrailenabled: !1
                    })
                  }, 800)
                })
              }), d.on("click", function(a) {
                a.preventDefault(), a.stopPropagation(), f.fadeOut(400, function() {
                  c.removeClass("opened"), setTimeout(function() {
                    e.fadeIn(400)
                  }, 400)
                })
              })
            }
          };
        return {
          init: function() {
            f(), g(), h(), a(window).resize(function() {
              f()
            })
          }
        }
      }
  }(jQuery);