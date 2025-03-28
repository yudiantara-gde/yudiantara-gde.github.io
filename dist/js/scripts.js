/**
 * Table of Contents:
 *
 * 1 - Superfish Menu
 * 2 - Collapsed
 * 2 - Popup windows (magnificPopup)
 */

( function( $ ) {
	'use strict';

    $( document ).ready( function() {

        var $html = $('html'),
            $body = $('body'),
            $header = $('#header'),
            $nav = $('#nav');

        /*
		* 1 - Main Navigation
		* -------------------
		*/

        var $nav = $('#nav'),    
            $navbarul = $('#nav ul'),
            $navbarli = $('#nav ul li');


        $navbarul.parent('li').addClass('has-child');
        $navbarul.parent('li').find('a:first').addClass('with-child');
        $navbarli.parent('ul').addClass('sub-child');

        function navHover() {
            
            $('.nav-hover ul').parent("li").hover(function() {
                $(this).toggleClass('active ');
                $(this).find('>.with-child').toggleClass('active');
                $(this).find('>.sub-child').slideToggle('normal');
            });
            
            $navbarul.parent("li").mouseleave(function() {
                $(this).find('>.with-child').removeClass('active');
                $(this).find(">.sub-child").slideUp('normal');
            });
        }

        function navClick() {
            
            $(".nav-click .navbar a.with-child").click(function() {
                var link = $(this);
                var closest_ul = link.closest("ul");
                var parallel_active_links = closest_ul.find(".active")
                var closest_li = link.closest("li");
                var link_status = closest_li.hasClass("active");
                var count = 0;

                closest_ul.find("ul").slideUp(function() {
                    if (++count == closest_ul.find("ul").length){
                        parallel_active_links.removeClass("active");
                    }
                });
        
                if (!link_status) {
                    closest_li.children("ul").slideToggle('normal');
                    closest_li.parent().parent("li.active").find('ul').find("li.active").removeClass("active");
                    
                    link.addClass('active');
                    link.parent().addClass("active");
                }
            });

            // $("#accordian a").click(function() {
            //     var link = $(this);
            //     var closest_ul = link.closest("ul");
            //     var parallel_active_links = closest_ul.find(".active")
            //     var closest_li = link.closest("li");
            //     var link_status = closest_li.hasClass("active");
            //     var count = 0;
        
            //     closest_ul.find("ul").slideUp(function() {
            //         if (++count == closest_ul.find("ul").length){
            //             parallel_active_links.removeClass("active");
            //             parallel_active_links.children("ul").removeClass("show-dropdown");
            //         }
            //     });
        
            //     if (!link_status) {
            //         closest_li.children("ul").slideDown().addClass("show-dropdown");
            //         closest_li.parent().parent("li.active").find('ul').find("li.active").removeClass("active");
            //         link.parent().addClass("active");
            //     }
            // })
        }

        function isTouchDevice(){
            return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        }
        
        if(isTouchDevice()===true) {
            $nav.addClass('nav-click');
            $nav.removeClass('nav-hover');

            navClick();
        }
        else {
            $nav.addClass('nav-hover');
            $nav.removeClass('nav-click');

            navHover();
        }

        /*
		* 2 - Collapsed
		* -------------
		*/

        $('.collapsed .collapsed__btn').on('click', function(){
            if($(this).parents('.collapsed__wrp').hasClass('active')){
                $(this).parents('.accr__wrp').removeClass('active');
                $(this).parents('.accr__wrp').find('.collapsed__content').slideUp();
            }else{
                $(this).parents('.collapsed').find('.collapsed__wrp.active .collapsed__content').slideUp();
                $(this).parents('.collapsed').find('.collapsed__wrp.active').removeClass('active');
                $(this).parents('.collapsed__wrp').toggleClass('active');
                $(this).parents('.collapsed__wrp').find('.collapsed__content').slideDown();
            }
        });

        $(document).on('click', '.nav-lang .nav-lang__btn', function(){
            $(this).toggleClass('active');
            $(this).parent('.nav-lang').find('.nav-lang__content').slideToggle('normal');			
            return false;
        });
    });
})( jQuery );