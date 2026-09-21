/* ===================================================================
 * Sublime - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800 // smoothscroll duration
    },

    $WIN = $(window);

    // reduceMotion: Visitor asked their OS for less motion, so skip animations & parallax
    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduceMotion) {
        cfg.scrollDuration = 0;
    }

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (!Modernizr.svg) {
        $(".header-logo img").attr("src", "assets/images/logo/logo.png");
    }

   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, reduceMotion ? 0 : 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };
    

   /* ------------------------------------------------------ */
   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var ssMenuOnScrolldown = function() {
        
        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var ssOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // setMenuState: Keeps the toggle's screen reader label in step with the menu
        var setMenuState = function(isOpen) {
            menuTrigger.attr({
                'aria-expanded': isOpen ? 'true' : 'false',
                'aria-label': isOpen ? 'Close menu' : 'Open menu'
            });
        };

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
            setMenuState(siteBody.hasClass('menu-is-open'));
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                siteBody.removeClass('menu-is-open');
                setMenuState(false);
            }
        });

    };








   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };




   /* Animate On Scroll
    * ------------------------------------------------------ */
    var ssAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: reduceMotion ? true : 'mobile'
        });

    };


   /* Hero Image Alt
    * ------------------------------------------------------ */
    // ssHeroAlt: Parallax builds the hero <img> at runtime, so copy data-image-alt onto it
    var ssHeroAlt = function() {

        $WIN.on('load', function() {
            var alt = $('.s-home').data('image-alt');
            if (alt) {
                $('.parallax-mirror .parallax-slider').attr('alt', alt);
            }
        });
    };


   /* Reduced Motion
    * ------------------------------------------------------ */
    // ssReducedMotion: Runs before parallax starts, swapping it for a still background
    var ssReducedMotion = function() {

        if (!reduceMotion) return;

        var $hero = $('.s-home');
        $hero.removeAttr('data-parallax').css({
            'background-image': 'url(' + $hero.data('image-src') + ')',
            'background-size': 'cover',
            'background-position': 'center'
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        ssReducedMotion();
        ssPreloader();
        ssMenuOnScrolldown();
        ssOffCanvas();
        ssSmoothScroll();
        ssAOS();
        ssHeroAlt();

    })();

})(jQuery);