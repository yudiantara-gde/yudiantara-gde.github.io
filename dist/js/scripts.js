(function($) {
    'use strict';
    
    var heroes;

    $(document).ready(function() {
        // Initiate Pretty Dropdowns
        $('.form-select').prettyDropdown();

        //banner heroes swiper
        heroes = new Swiper('.banner .swiper', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0, 
            loop: false,
            speed: 1000,
            a11y: true,
            navigation: {
                nextEl: '.banner .swiper-btn-next',
                prevEl: '.banner .swiper-btn-prev',
            },
            pagination: {
                el: ".banner .swiper-pagination",
                clickable: true,
            }
        });

        //AOS
        AOS.init();

        //swiper our works
        const breakpoint = window.matchMedia("(min-width:768px)");
        let worksSwiper;
        const breakpointChecker = function () {
            if (breakpoint.matches === true) {
                if (worksSwiper !== undefined) worksSwiper.destroy(true, true);
                return;
                
            } else if (breakpoint.matches === false) {
                return enableSwiper();
            }
        };

        const enableSwiper = function () {
            worksSwiper = new Swiper(".l-works .swiper", {
                slidesPerView: "1",
                spaceBetween: 16,
                loop: false,
                speed: 1000,
                a11y: true,
                breakpoints: {
                    512: {
                        slidesPerView: "2"
                    }
                }, 
                pagination: {
                    el: ".swiper .swiper-pagination",
                    clickable: true,
                },
            });
        };

        breakpoint.addListener(breakpointChecker);
        breakpointChecker();
    });
})(jQuery);