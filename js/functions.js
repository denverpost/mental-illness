$(document).foundation('reveal', {
    animation: 'fade',
    animationspeed: 200
});

function revealCredits() {
    $('#credits').foundation('reveal', 'open');
}

function scrollDownTo(whereToScroll, scrollOffset) {
    scrollOffset = typeof scrollOffset !== 'undefined' ? scrollOffset : 60;
    $('html,body').animate({
        scrollTop: ($(whereToScroll).offset().top - scrollOffset)
    }, 300);
}

var playerClear = false;

function playerCreator(embedId, playerId, divId) {
    divId = typeof divId !== 'undefined' ? divId : false;
    playerClear = true;
    if (divId) {
        $(divId).animate({backgroundColor:'rgba(153,0,0,0.4)',paddingLeft:'.5em',paddingRight:'.5em'}, 350).delay(2000).animate({backgroundColor:'transparent',paddingLeft:'0',paddingRight:'0'},1000);
    }
    OO.Player.create(embedId, playerId, {'autoplay':true});
    setTimeout(function() { playerClear = false; },2000);
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

function createChartOne() {
    var pieData = [{
        value: 68,
        color: "rgba(0,70,70,0.75)",
        label: "Medicaid (state and federal)"
    }, {
        value: 27,
        color: "rgba(0,23,70,0.75)",
        label: "State general funds"
    }, {
        value: 2,
        color: "rgba(23,0,70,0.75)",
        label: "Medicare"
    }, {
        value: 1,
        color: "rgba(70,0,70,0.75)",
        label: "Mental health block grant"
    }, {
        value: 2,
        color: "rgba(70,0,47,0.75)",
        label: "Other"
    }];
    var helpers = Chart.helpers;
    var funding = new Chart(document.getElementById("funding").getContext("2d")).Doughnut(pieData, {
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
        animateRotate: true
    });
    var legendHolder = document.createElement('div');
    legendHolder.innerHTML = funding.generateLegend();

    // Include a html legend template after the module doughnut itself
    helpers.each(legendHolder.firstChild.childNodes, function (legendNode, index) {
        helpers.addEvent(legendNode, 'mouseover', function () {
            var activeSegment = funding.segments[index];
            activeSegment.save();
            funding.showTooltip([activeSegment]);
            activeSegment.restore();
        });
    });
    helpers.addEvent(legendHolder.firstChild, 'mouseout', function () {
        funding.draw();
    });

    funding.chart.canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);
}

function createChartTwo() {
    var pieData = [{
        value: 77,
        color: "rgba(0,70,70,0.75)",
        label: "Community programs"
    }, {
        value: 22,
        color: "rgba(0,23,70,0.75)",
        label: "State hospitals"
    }, {
        value: 1,
        color: "rgba(23,0,70,0.75)",
        label: "Other"
    }];
    var helpers = Chart.helpers;
    var spending = new Chart(document.getElementById("spending").getContext("2d")).Doughnut(pieData, {
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
        animateRotate: true
    });
    var legendHolder = document.createElement('div');
    legendHolder.innerHTML = spending.generateLegend();

    // Include a html legend template after the module doughnut itself
    helpers.each(legendHolder.firstChild.childNodes, function (legendNode, index) {
        helpers.addEvent(legendNode, 'mouseover', function () {
            var activeSegment = spending.segments[index];
            activeSegment.save();
            spending.showTooltip([activeSegment]);
            activeSegment.restore();
        });
    });
    helpers.addEvent(legendHolder.firstChild, 'mouseout', function () {
        spending.draw();
    });

spending.chart.canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);
}

function createChartThree() {
    var barChartData = {
        labels : ["2007","2008","2009","2010","2011","2012"],
        datasets : [
            {
                fillColor : "rgba(0,70,70,0.65)",
                strokeColor : "rgba(0,70,70,0.8)",
                highlightFill: "rgba(0,70,70,0.75)",
                highlightStroke: "rgba(0,70,70,1)",
                data : [71748,82237,80141,83767,87977,94033]
            },
            {
                fillColor : "rgba(70,0,0,0.65)",
                strokeColor : "rgba(70,0,0,0.8)",
                highlightFill: "rgba(70,0,0,0.75)",
                highlightStroke: "rgba(70,0,0,1)",
                data : [3401,3880,2608,2040,1635,1956]
            }
        ]
    }
    var ctx = document.getElementById("patients").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true,
    });
}

function createChartFour() {
    var lineChartData = {
        labels : ["2005","2006","2007","2008","2009","2010*","2011","2012","2013","2014"],
        datasets : [
            {
                label: "Homeless mental illness",
                fillColor : "rgba(0,70,70,0.2)",
                strokeColor : "rgba(0,70,70,1)",
                pointColor : "rgba(0,70,70,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : [15.4,18.7,21.1,24.2,28.0,23.7,19.4,20.8,23.1,34.4]
            }
        ]
    }
    var ctx = document.getElementById("homelessline").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true,
        bezierCurve: false
    });
}

function swapGridBox(box) {
    if ( !$(box).hasClass('expanded') ) {
        $(box).parent('li').siblings().css('display','none');
        $(box).parents('ul').removeClass('small-block-grid-3');
        $(box).find('p.gridcaption').css('display','none');
        $(box).find('.gridphotograd').css('display','block');
        $(box).addClass('expanded');
        scrollDownTo('#profiles');
        document.body.style.overflow='hidden';
        playerClear = false;
    } else if (!playerClear) {
        $(box).parent('li').siblings().css('display','block');
        $(box).parents('ul').addClass('small-block-grid-3');
        $(box).find('p.gridcaption').css('display','block');
        $(box).find('.gridphotograd').css('display','none');
        $(box).removeClass('expanded');
        document.body.style.overflow='auto';
        playerClear = false;
    }
}

$('.gridbox').on("click", function() {
    swapGridBox(this);
});

$(document).mouseup(function (e)
{
    var container = $('.gridbox.expanded');
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        swapGridBox(container);
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
    if ( $('.gridbox.expanded').length ) {
        $('.gridbox').each(function() {
            if ( $(this).hasClass('expanded') ) {
                swapGridBox(this);
            }
        });    
    } else if (!moreAd && e.keyCode == 27) {
        hideAdManual();
    }    
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
    if (window.location.hash.length) {
        setTimeout(function() {
            scrollDownTo(window.location.hash, 60);
        },1000);
    }
    setTimeout(function() {
        createChartOne();
        createChartTwo();
        createChartThree();
        createChartFour();
    },3000);
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

$('#panel1').on('toggled', function (event, tab) {
    $('.tabs-content .active table').trigger('footable_resize');
});
$('#panel2').on('toggled', function (event, tab) {
    $('.tabs-content .active table').trigger('footable_resize');
});
$('#panel3').on('toggled', function (event, tab) {
    $('.tabs-content .active table').trigger('footable_resize');
});
$(function () {
    $('#panel1 table').footable({
        breakpoints: {
            phone: 540,
        }
    });
    $('#panel2 table').footable({
        breakpoints: {
            phone: 540,
        }
    });
    $('#panel3 table').footable({
        breakpoints: {
            phone: 540,
        }
    });
    $('.tabs-content .active table').trigger('footable_resize');
    $('.sort-column').click(function (e) {
        e.preventDefault();
        var footableSort = $('table').data('footable-sort');
        var index = $(this).data('index');
        footableSort.doSort(index, 'toggle');
    });
});