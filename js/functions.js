$(document).foundation('reveal', {
    animation: 'fade',
    animationspeed: 200
});

function revealCredits() {
    $('#credits').foundation('reveal', 'open');
}

function scrollDownTo(whereToScroll, scrollOffset) {
    $('html,body').animate({
        scrollTop: ($(whereToScroll).offset().top - scrollOffset)
    }, 300);
}

function playerCreator(embedId, playerId, divId) {
    divId = typeof divId !== 'undefined' ? divId : false;
    if (divId) {
        $(divId).animate({backgroundColor:'rgba(153,0,0,0.4)',paddingLeft:'.5em',paddingRight:'.5em'}, 350).delay(2000).animate({backgroundColor:'transparent',paddingLeft:'0',paddingRight:'0'},1000);
    }
    OO.Player.create(embedId, playerId, {'autoplay':true});
}

function playerScroller(embedId, playerId, divId) {
    scrollDownTo(('#' + embedId),100);
    playerCreator(embedId, playerId, divId);
}
function getNodePosition(node) {
    var eTop = $(node).offset().top;
    return Math.abs(eTop - $(window).scrollTop());
}
function isVisible(element) {
    var quarterHeight = $(element).height() / 4;
    var vidTop = $(element).offset().top;
    var vidBot = $(element).offset().top + $(element).height();
    var fromTop = $(window).scrollTop() + quarterHeight * 2;
    if ( fromTop > vidTop && fromTop < vidBot ) {
        return true;
    } else {
        return false;
    }
}

function darkBackground(element, reverse) {
    if (!reverse) {
        $(element).animate({backgroundColor:'#222'}, 750);
        $(element + ' p.caption').animate({color:'rgba(255,255,255,0.6)'}, 750);
        $('.fixed').animate({top:'-45px'},350);
    } else {
        $(element).animate({backgroundColor:'#fff'}, 750);
        $(element + ' p.caption').animate({color:'rgba(0,0,0,0.6)'}, 750);
        $('.fixed').animate({top:'0'},750);
    }
}

$('.gridbox').on("click", function() {
    if ( !$(this).hasClass('expanded') ) {
        $(this).parent('li').siblings().css('display','none');
        $(this).parents('ul').removeClass('small-block-grid-3');
        $(this).find('p.gridcaption').css('display','none');
        $(this).find('.gridphotograd').css('display','block');
        $(this).addClass('expanded');
    } else {
        $(this).parent('li').siblings().css('display','block');
        $(this).parents('ul').addClass('small-block-grid-3');
        $(this).find('p.gridcaption').css('display','block');
        $(this).find('.gridphotograd').css('display','none');
        $(this).removeClass('expanded');
    }
});

$('.gridprofile').scroll(function(){
    $(this).siblings('.gridphotograd').animate({opacity:'0'},700);
})

$('.top-top').click(function(evt) {
    $('.toggle-topbar').click();
});

$('.vid-embed').on("mouseenter", function() {
    $(this).find('.playicon').fadeTo(300, 0);
    $(this).find('.playtext').fadeTo(300, 1);
});
$('.vid-embed').on("mouseleave", function() {
    $(this).find('.playicon').fadeTo(300, 1);
    $(this).find('.playtext').fadeTo(300, 0);
});

$(document).ready(function() {
    $('.centergallery').slick({
        centerMode: true,
        centerPadding: '15%',
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><span>&lt;</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span>&gt;</span></button>',
        responsive: [{
            breakpoint: 800,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '8%',
                slidesToShow: 1
            }
        }]
    });
});

var moreAd = true;
var titleFade = true;
var vidBack = true;
var slideBack = true;

function fadeNavBar(reverse) {
    if (reverse) {
        $('.fixed').animate({top:'-45px'},350);
        titleFade = true;
    } else {
        $('.fixed').animate({top:'0'},750);
        titleFade = false;
    }
}

function hideAdManual() {
    $('#adwrapper').fadeOut(300);
    $('#adwrapper a.boxclose').css('display', 'none');
    $('#footer-bar').delay(150).animate({marginBottom:'0'},300);
    moreAd = false;
}

$(document).keyup(function(e) {
  if (!moreAd && e.keyCode == 27) { hideAdManual(); }
});

function showAd() {
    if (moreAd && $("#adwrapper").html().length > 3100) {
        $('#adwrapper').fadeIn(400);
        $('a.boxclose').fadeIn(400);
        var adH = $('#adwrapper').height();
        $('#footer-bar').css('margin-bottom',adH);
        moreAd = false;
    }
}

$(document).ready(function() {
    if ( $(window).scrollTop() > (window.innerHeight / 2) ) {
        if (titleFade) {
            fadeNavBar(false);
        }
    }
    if ( $(window).scrollTop() > (window.innerHeight * 3) ) {
        if (moreAd) {
            showAd();
        }
    }
    if ( isVisible('#overviewvid') && vidBack ) {
        darkBackground('#overviewvid',false);
        vidBack = false;
    }
    if ( isVisible('#slidesoffset') && slideBack ) {
        darkBackground('#slidesoffset',false);
        slideBack = false;
    }
    $('#fade1').animate({opacity:'1'},1200);
    $('#fade2').delay(500).animate({opacity:'1'},1600);
});

$(window).scroll(function() {
    if ($(window).scrollTop() > (window.innerHeight * 3) ) {
        if (moreAd) {
            showAd();
        }
    }
    if ( $(window).scrollTop() > (window.innerHeight / 2) ) {
        if (titleFade) {
            fadeNavBar(false);
        }
    } else if (!titleFade) {
        fadeNavBar(true);
    }
    if ( isVisible('#overviewvid') && vidBack ) {
        darkBackground('#overviewvid',false);
        vidBack = false;
    } else if ( !isVisible('#overviewvid') && !vidBack ) {
        darkBackground('#overviewvid',true);
        vidBack = true;
    }
    if ( isVisible('#slidesoffset') && slideBack ) {
        darkBackground('#slidesoffset',false);
        slideBack = false;
    } else if ( !isVisible('#slidesoffset') && !slideBack ) {
        darkBackground('#slidesoffset',true);
        slideBack = true;
    }
});