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

function getNodePosition(node) {
    var eTop = $(node).offset().top;
    return Math.abs(eTop - $(window).scrollTop());
}

$('.top-top').click(function(evt) {
    $('.toggle-topbar').click();
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
    $('#name1').css("opacity", 1 - opacityNew * .75);
    $('#name2').css("opacity", opacityNew * .75);
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

function showNumberChart() {
    $('#high_chart_div_wrap').fadeOut(300);
    $('#large_chart_div_wrap').fadeIn(300);
    $('.percentLink').removeClass('livechart');
    $('.numberLink').addClass('livechart');
}

function showPercentChart() {
    $('#large_chart_div_wrap').fadeOut(300);
    $('#high_chart_div_wrap').fadeIn(300);
    $('.numberLink').removeClass('livechart');
    $('.percentLink').addClass('livechart');
}

function loadFirstChart() {
    google.load("visualization", "1", {
        packages: ["corechart"]
    });
    google.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['District', '2004', '2013'],
            ["Denver", 753, 1066],
            ["Jefferson", 717, 1731],
            ["Douglas", 0, 590],
            ["Cherry Creek", 7, 52],
            ["Adams 12", 281, 1055],
            ["Aurora", 237, 2300],
            ["Boulder", 123, 400],
            ["St. Vrain", 391, 1060],
            ["Poudre", 326, 588],
            ["Colo. Springs", 79, 437],
            //["Academy 20",75,12],
            //["Mesa County Valley",155,151],
            //["Greeley",1073,61],
            //["Falcon",47,1],
            //["Pueblo City",1108,940]
        ]);

        var options = {
            title: 'Large school districts: Number of homeless students',
            legend: {
                position: 'top'
            },
            isStacked: false,
            hAxis: {
                textPosition: 'none'
            },
            vAxis: {
                textPosition: 'out'
            },
            vAxis: {
                textStyle: {
                    fontSize: 13,
                    bold: true
                }
            },
            series: {
                0: {
                    color: 'lightgray'
                },
                1: {
                    color: 'steelblue'
                }
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('large_chart_div'));

        chart.draw(data, options);
    }
}

function loadSecondChart() {
    google.load("visualization", "1", {
        packages: ["corechart"]
    });
    google.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['District', 'Pct. homeless 2004', 'Pct. homeless 2013'],
            ["Mtn. Valley", {v: 5.3, f: '5.3%'}, {v: 21.5, f:'21.5%'}],
            ["Mtn. BOCES", {v: 0, f: '0%'}, {v: 15.3, f: '15.3%'}],
            ["Sheridan", {v: 4.5, f: '4.5%'}, {v: 14.7, f: '14.7%'}],
            ["Center", {v: 0.3, f: '0.3%'}, {v: 13.4, f: '13.4%'}],
            ["Hanover", {v: 17.1, f: '17.1%'}, {v: 11.2, f: '11.2%'}],
            ["Moffat", {v: 0, f: '0%'}, {v: 11.1, f: '11.1%'}],
            ["Cripple Creek", {v: 4.5, f: '4.5%'}, {v: 8.7, f: '8.7%'}],
            ["Westminster", {v: 6.7, f: '6.7%'}, {v: 8.3, f: '8.3%'}],
            ["Del Norte", {v: 0, f: '0%'}, {v: 6.8, f: '6.8%'}],
            ["Adams 14", {v: 0.2, f: '0.2%'}, {v: 6.7, f: '6.7%'}]
        ]);

        var options = {
            title: 'School districts with highest percentage of homeless students',
            legend: {
                position: 'top'
            },
            isStacked: false,
            hAxis: {
                textPosition: 'none'
            },
            vAxis: {
                textPosition: 'out'
            },
            vAxis: {
                textStyle: {
                    fontSize: 13,
                    bold: true
                }
            },
            series: {
                0: {
                    color: 'lightgray'
                },
                1: {
                    color: 'steelblue'
                }
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('high_chart_div'));

        chart.draw(data, options);
    }
}
loadFirstChart();
loadSecondChart();


function loadTheMap() {
    //Width and height
    var w = parseInt(d3.select('#map').style('width'));
    var h = w / 2;

    //Set the map projection and center it on Colorado
    var projection = d3.geo.mercator()
        .translate([w / 2, h / 2])
        .center([105, 39])
        .scale(w * 1.85 * Math.PI)
        .rotate([-150, 0]);

    //Define default path generator
    var path = d3.geo.path().projection(projection);

    //Create SVG element
    var svg = d3.select("#map")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //Load in data
    d3.csv("./data/homeless.csv", function(data) {

        var colorValues = new Array();
        for (var l = 0; l < data.length; l++) {
            if (parseFloat(data[l].pcthomeless2013, 1) > 0) {
                colorValues[l] = parseFloat(data[l].pcthomeless2013, 1);
            }
        }

        //Set input domain for color scale
        var color = d3.scale.quantile()
            .domain(colorValues)
            .range(["#CDD5F0", "#BDC3E8", "#92A1CF", "#8C97B9", "#7083A8"]);

        var legend = d3.select('#legend')
            .append('ul')
            .attr('class', 'list-inline');

        var keys = legend.selectAll('li.key')
            .data(color.range());

        keys.enter().append('li')
            .attr('class', 'key')
            .style('border-top-color', String)
            .text(function(d) {
                var r = color.invertExtent(d);
                return r[0].toFixed(1) + '% - ' + r[1].toFixed(1) + '%';
            });
        d3.select('.list-inline').append('div').attr('class', 'clear');

        //Load in GeoJSON data
        d3.json("./data/colorado_school_district_good.json", function(json) {

            var dataArray = [];

            //Merge the data and GeoJSON
            //Loop through once for each ag. data value
            for (var i = 0; i < data.length; i++) {

                //Grab school district name
                dataArray[i] = [
                    data[i].district,
                    parseFloat(data[i].homeless2013.replace(',', '')),
                    parseFloat(data[i].pcthomeless2013),
                    parseFloat(data[i].homeless2004.replace(',', '')),
                    parseFloat(data[i].pcthomeless2004)
                ];
            }
            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonName = json.features[j].properties.NAME;

                for (var k = 0; k < dataArray.length; k++) {

                    var noMatch = true;

                    if (dataArray[k][0] == jsonName) {

                        //Copy the data value into the JSON
                        json.features[j].properties.homeless2013 = dataArray[k][1];
                        json.features[j].properties.pcthomeless2013 = dataArray[k][2];
                        json.features[j].properties.homeless2004 = dataArray[k][3];
                        json.features[j].properties.pcthomeless2004 = dataArray[k][4];

                        var noMatch = false;
                        break;

                    }
                }
                if (noMatch) {
                    console.log('not matched: ' + jsonName);
                }
            }

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-5, 0])
                .html(function(d) {
                    return "<div class=\"maptip\"><h3>" + d.properties.NAME + "</h3><p style='font-weight: bold'>2013</p><p>Homeless students: <span style='color:black'>" + d.properties.homeless2013 + "</span></p><p>Pct. homeless: <span style='color:black'>" + d.properties.pcthomeless2013 + "</span></p><p style='font-weight:bold'>2004</p><p>Homeless students: <span style='color:black'>" + d.properties.homeless2004 + "</span></p><p>Pct. homeless: <span style='color:black'>" + d.properties.pcthomeless2004 + "</span></p></div>";
                });
            svg.call(tip);

            //Bind data and create one path per GeoJSON feature
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d) {
                    //Get data value
                    var value = d.properties.pcthomeless2013;

                    if (value) {
                        //If value exists…
                        return color(value);
                    } else {
                        //If value is undefined…
                        return "#E6E6FA";
                    }
                })
                .on("mouseover", tip.show)
                .on("click", tip.show)
                .on("mouseenter", function(d) {
                    d3.select(this).style("fill", "#FFFF50");
                })
                //.on("mouseover", tip.show)      
                .on("mouseout", function(d) {
                    d3.select(this)
                        .attr("d", path)
                        .style("fill", function(d) {
                                //Get data value
                                var value = d.properties.pcthomeless2013;
                                if (value) {
                                    //If value exists…
                                    return color(value);
                                } else {
                                    //If value is undefined…
                                    return "#E6E6FA";
                                }
                            }
                            //.on("mouseout", tip.hide)
                 ).on("mouseleave", tip.hide);
                })

        });

    });
}
setTimeout(function(){
	loadTheMap();
}, 10000);