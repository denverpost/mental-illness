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
    $(divId).animate({backgroundColor:'rgba(153,0,0,0.5)',paddingLeft:'.5em',paddingRight:'.5em'}, 300).delay(5000).animate({backgroundColor:'transparent',paddingLeft:'0',paddingRight:'0'},900);
    OO.Player.create(embedId, playerId, {'autoplay':true});
}

function getNodePosition(node) {
    var eTop = $(node).offset().top;
    return Math.abs(eTop - $(window).scrollTop());
}

$('.gridbox').on("click", function() {
    if ( !$(this).hasClass('expanded') ) {
        $(this).parent('li').siblings().css('display','none');
        $(this).parents('ul').removeClass('small-block-grid-3');
        $(this).find('p.caption').css('display','none');
        $(this).addClass('expanded');
    } else {
        $(this).parent('li').siblings().css('display','block');
        $(this).parents('ul').addClass('small-block-grid-3');
        $(this).find('p.caption').css('display','block');
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

function fadeTitles() {
    var s = $(window).scrollTop();
    var t = getNodePosition('.opener.opener2');
    var u = getNodePosition('.opener.opener3');
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    opacityNew = s / h;
    opacityNewTwo = t / h;
    opacityNewThree = u / h;
    if (opacityNew > 1 && opacityNew < 1.1) {
        showAd();
    }
    $(".opener.opener1 div#title").children().css("opacity", 1 - opacityNew);
    $(".opener.opener2 div.title-below").children().css("opacity", 1 - opacityNewTwo * .75);
    $(".opener.opener3 div.title-below").children().css("opacity", 1 - opacityNewThree * .75);
    $('#name1').css("opacity", 1 - opacityNew * .9);
    $('#name2').css("opacity", opacityNew * .9);
}

$('document').ready(function() {
    fadeTitles();
});

$(window).scroll(function() {
    fadeTitles();
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

function hideAdManual() {
    $('#adwrapper').fadeOut(200);
    $('a.boxclose').css('display', 'none');
    moreAd = false;
}

function showAd() {
    if (moreAd && $("#adwrapper").html().length > 3100) {
        $('#adwrapper').fadeIn(300);
        $('a.boxclose').fadeIn(300);
        moreAd = false;
    }
}