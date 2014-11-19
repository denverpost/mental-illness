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
    $(divId).animate({backgroundColor:'rgba(153,0,0,0.4)',paddingLeft:'.5em',paddingRight:'.5em'}, 350).delay(2000).animate({backgroundColor:'transparent',paddingLeft:'0',paddingRight:'0'},1000);
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

$('.gridbox').on("click", function() {
    if ( !$(this).hasClass('expanded') ) {
        $(this).parent('li').siblings().css('display','none');
        $(this).parents('ul').removeClass('small-block-grid-3');
        $(this).find('p.gridcaption').css('display','none');
        $(this).addClass('expanded');
    } else {
        $(this).parent('li').siblings().css('display','block');
        $(this).parents('ul').addClass('small-block-grid-3');
        $(this).find('p.gridcaption').css('display','block');
        $(this).removeClass('expanded');
    }
});

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
        centerPadding: '20%',
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

function fadeNavBar(reverse) {
    if (reverse) {
        $('.fixed').animate({top:'-45px'},250);
        titleFade = true;
    } else {
        $('.fixed').animate({top:'0'},500);
        titleFade = false;
    }
}

function hideAdManual() {
    $('#adwrapper').fadeOut(300);
    $('#adwrapper a.boxclose').css('display', 'none');
    moreAd = false;
}

$(document).keyup(function(e) {
  if (!moreAd && e.keyCode == 27) { hideAdManual(); }
});

function showAd() {
    if (moreAd && $("#adwrapper").html().length > 3100) {
        $('#adwrapper').fadeIn(400);
        $('a.boxclose').fadeIn(400);
        moreAd = false;
    }
}

$(document).ready(function() {
    if ( $(window).scrollTop() > (window.innerHeight / 2) ) {
        if (titleFade) {
            fadeNavBar(false);
        }
    }
    if ( $(window).scrollTop() > (window.innerHeight *2) ) {
        if (moreAd) {
            showAd();
        }
    }
    $('#fade1').animate({opacity:'1'},1400);
    $('#fade2').delay(550).animate({opacity:'1'},1900);
});

$(window).scroll(function() {
    if ($(window).scrollTop() > (window.innerHeight * 2) ) {
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
});