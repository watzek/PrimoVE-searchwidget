<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-1906252-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-1906252-2');
</script>

<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css"/>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"/>
<!--<link rel="stylesheet" type="text/css" href="//libapps.s3.amazonaws.com/sites/5089/include/watzek_style.css">-->
<link rel="stylesheet" type="text/css" href="https://libapps.s3.amazonaws.com/sites/5089/include/watzek-style2023.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-hover-dropdown/2.2.1/bootstrap-hover-dropdown.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
<script type="text/javascript" src="https://api3.libcal.com/js/roombooking.js?002"></script>

<!--<script type="text/javascript" src="https://libapps.s3.amazonaws.com/sites/5089/include/watzek31023.js"></script>-->
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>

<!--<script type="text/javascript" src="https://libapps.s3.amazonaws.com/sites/5089/include/slaask.js"></script>-->

<!-- for testing showcase carousel thingy: -->
<!--<script type="text/javascript" type="module" src="https://libapps.s3.amazonaws.com/sites/5089/include/primo-showcase.js"></script>-->
<!--<script type="text/javascript" src="https://webdev.watzek.cloud/~jeremym/primo-carousel.js"></script>-->


<!-- storing a local copy b/c some ISPs block it - JM 1/24/24 -->

<meta name="google-site-verification" content="vs1BLwSigmZ8fBoY4Lo1nK5ge5bJzcuM_zr_YcdXTPA" />

<style>
#todays-hours {text-align:right; color:white; font-family: Karla, sans-serif; font-size:2rem; font-weight:bold;}
#all-hours {text-align:right; color:white; font-family: Karla, sans-serif; font-size:2rem;}
</style>

<script>
$(document).ready(function() {

/*
    if (window.location.href.indexOf("library.lclark.edu/blog") > -1) {
        _slaask.init('a95292303f47176e9b4a6a9345a4f35d');
    } else {
        _slaask.init('295dd444a1af2c9ab3456b7da45a415a');
    }
*/

    myFavicon = "https://s3.amazonaws.com/libapps/accounts/38495/images/favicon.ico";
    var checkExist = setInterval(function() {

        if ($("link[rel='shortcut icon']").length) {
            $.when($("link[rel='shortcut icon']").remove()).then($("link[rel='icon']").attr("href", myFavicon));
            clearInterval(checkExist);
        }

    }, 100);

$.get("https://library.watzekdi.net/watzek-staff-apps/app/Snow/message/snowMessage.php", function(data) {
var snow=JSON.parse(data)
    console.log(snow);
    if(snow.enabled=="true"){
         setupCarousel(snow);

    }
    else{
         setupCarousel();
     }


});


    setupHeader();
    
    setupSearchWidget();
    addMclLinks();

    console.log("ready!");
});


/* begin watzek_js.js  */

//BEGIN HOURS WIDGET
var apis4librarians_todayshours = function(){$(document).ready(function () {
$.getJSON("https://libcal.lclark.edu/api_hours_today.php?iid=3636&lid=4016&format=json&systemTime=0&callback=?", function (json) {
$('#todays-hours').append("<a href='https://library.lclark.edu/hours-calendar'><span id='todays-hours-text'>Today's Hours:</span> " + "<span id=todays-hours-hours>" + json.locations[0].rendered + "</span<a>");
$('#mobileHours').append("<a href='https://library.lclark.edu/hours-calendar'>Today's Hours: " + ""+ json.locations[0].rendered + "</a>");
});
});}();
//END HOURS WIDGET

/* adds link to register for a Multomah County Library card when mcl icons appear  */
function addMclLinks() {
    var checkGuides = setInterval(function() {
        if ($(".s-lg-icons").length) {
            $(".s-lg-icons").each(function(index) {
                //console.log( index + ": " + $( this ).text() );
                var desc = $(this).find("img").attr("alt")
                if (desc == "Databases provided by Multnomah County Library require a MCL card to access") {
                    //console.log("MCL")
                    $(this).append("<div style='padding=top:20px;font-size:12.5px;font-weight:bold;'>Requires a Multomah County Library Card. Get one <a href='https://multcolib.org/get-library-card' target='_blank'>here</a>.</div>");
                }
            });
            //console.log($(".s-lg-az-result-badges").length);
            clearInterval(checkGuides);
        }
    }, 100);
}



function getImageFromLiveWhaleThumb(thumb_url) {
    url_split = thumb_url.split("/");
    image_gid = url_split[6]; // occasionally the group id will change...
    thumb_stub = url_split[url_split.length - 1];
    image_url = "https://college.lclark.edu/live/image/gid/" + image_gid + "/417/" + thumb_stub;
    return image_url;
}


function setupCarousel(snow=false) {

if(snow){
var html = "";
 image_url = snow.image;
                html += "<div class='carousel-slide'>";
                html += "<img class='carousel-img img-responsive' src='" + image_url + "'>";
                html += "<div class='slide-caption'><h3 class='carousel-slide-title'>" + snow.title + "</h3><p class='carousel-slide-desc'>" + snow.text;
                html +="</p></div></div>";


            $('.carousel-items').html(html).promise().done(function() {
                // initialize carousel
                $('.carousel-items').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    appendDots: $('.carousel-items'),
                    fade: true,
                    cssEase: 'linear',
                    autoplay: true,
                    autoplaySpeed: 6000
                });
                // turn off live reading of slides
                $('.slick-list').attr("aria-live", "off");
            });

}
else{

    //new
    $.get("https://college.lclark.edu/live/json/news/group/College:%20Watzek%20Library/only_starred/true/thumb_crop/false", function(news) {
        $.get("https://college.lclark.edu/live/json/events/group/College%3A%20Watzek%20Library/only_starred/true/hide_repeats/true/", function(events) {

            items = events.concat(news)
            // console.log(news);
            var html = "";
            $.each(items, function(key, item) {
                console.log(item)

                if (item.url != "snow") {
                    image_url = getImageFromLiveWhaleThumb(item.thumbnail);
                } else {
                    image_url = item.thumbnail;
                }


                console.log('summary' in item);
                console.log('description' in item);
                if ('summary' in item) {
                    var desc = item.summary
                }
                if ('description' in item) {
                    var desc = item.description
                }

                html += "<div class='carousel-slide'>";
                html += "<img class='carousel-img img-responsive' src='" + image_url + "'>";
                html += "<div class='slide-caption'><h3 class='carousel-slide-title'>" + item.title + "</h3><p class='carousel-slide-desc'>" + desc;
                if (item.url != "snow") {
                    html += "<a href='" + item.url + "'>  More...</a></p></div></div>";
                }
            });



            $('.carousel-items').html(html).promise().done(function() {
                // initialize carousel
                $('.carousel-items').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    appendDots: $('.carousel-items'),
                    fade: true,
                    cssEase: 'linear',
                    autoplay: true,
                    autoplaySpeed: 6000
                });
                // turn off live reading of slides
                $('.slick-list').attr("aria-live", "off");
            });

        });

    });
    //end new
}


    // pull content from LiveWhale feeds






}




function getAsset(asset_id, fn) { //also works for widgets
    url = 'https://watzek.lclark.edu/src/stag/getAsset.php?asset_id=' + asset_id;
    $.get(url, function(asset) {
        fn(asset[0]);
    });
}

function getAssets(guide_ids, fn) {
    url = 'https://watzek.lclark.edu/src/stag/getAsset.php?guide_id=' + guide_ids;
    $.get(url, function(assets) {
        fn(assets);
    });
}

function setupHeader() {

    //  hoursScript="https://watzek.lclark.edu/src/prod/getAlmaHours.php";
    hoursScript = "https://watzekdi.net/library/getAlmaHours.php";
    $.get(hoursScript, function(data) {
        data = JSON.parse(data);
        today = data.day[0].hour;
        tdate = getTextDate();
        if (today.length == 0) {
            hours = "Library Hours: Closed"
        } else {
            open = today[0].from;
            close = today[0].to;
            switch (true) {
                case (open == "00:00" && close == "23:59"):
                    hours = "Library Hours: Open 24 Hours";
                    break;

                case (open == "00:00" && close != "23:59"):
                    cl = convertDate(close)
                    hours = "Library Hours: Close at " + cl;
                    break;

                case (open != "00:00" && close == "23:59"):
                    op = convertDate(open);
                    hours = "Library Hours: Open at " + op;
                    break;

                default:
                    op = convertDate(open) //custom fx to convert 24hr to 12hr
                    cl = convertDate(close)
                    hours = "Library Hours: " + op + "-" + cl;

            }



            //tdate=getTextDate();


        }
        //swap below if we revert back to hold shelf only
        //$("#hours").text(hours); //now puts hours variable in #hours span
        $("#tdate").text(tdate);
        //$("#mobileHours").text(hours);

        //    $("#tdate").text("Closed");   //now puts hours variable in #hours span
        //    $("#hours").text("Self-Service Hold Shelf M-F 11:00-3:00");

    }).done(function() {
       // $("#api_hours_today_iid3636_lid4016").fadeIn();
    });


}

function getTextDate() {
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    var today = new Date();
    var tdate = today.toLocaleDateString("en-US", options);
    return tdate;
}

function convertDate(military) {

    time = military.split(':'); // convert to array
    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
    } else if (hours > 12) {
        timeValue = "" + (hours - 12);
    } else if (hours == 0) {
        timeValue = "12";
    }
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M."; // get AM/PM
    return timeValue;
}


$(function() {
    $('.s-lg-icon').attr('aria-hidden', 'true');
});


$(function() {
    $('#s-lg-guide-search-terms').attr('placeholder', 'Search library website');
});

function setupSearchWidget() {

    // change placeholder texts on option selection
    var initialText = "Find books and media";
    var scopeSetting = " at L&C ";
    var queryType = "by keyword";

    function updateBooksPlaceholder() {
        placeholder = initialText + scopeSetting + queryType;
        $('.primoinput').prop("placeholder", placeholder);
    }

    $('.primoquery').change(function() {
        switch ($(this).val()) {
            case 'any':
                queryType = "by keyword";
                break;
            case 'subject':
                queryType = "by subject";
                break;
            case 'title':
                queryType = "by title";
                break;
            case 'creator':
                queryType = "by author";
                break;
        }
        updateBooksPlaceholder();
    });
    $('input[name="scope"]').change(function() {
        switch ($(this).val()) {
            case 'lcc_local':
                scopeSetting = " at L&C ";
                break;
            case 'local_nz':
                scopeSetting = " at NW libraries ";
                break;
            case 'worldcat':
                scopeSetting = " worldwide ";
                break;
        }
        updateBooksPlaceholder();
    });

    $('.journalquery').change(function() {
        switch ($(this).val()) {
            case 'article':
                $('.journalinput').prop("placeholder", "Find articles in Primo by keyword");
                break;
            case 'journal':
                $('.journalinput').prop("placeholder", "Find magazines, journals, and newspapers at L&C by title");
                break;
            case 'db':
                $('.journalinput').prop("placeholder", "Find databases by name");
                break;
        }
    });

}


$(document).ready(function() {
    var primoBase = 'https://primo.lclark.edu/discovery/search?';
    var wcBase = "https://watzek.on.worldcat.org/search?";
    var boleyWcBase = "https://lewisclarklaw.on.worldcat.org/search?";





    $(".swSubmit").click(function() {


        var tab = $(this).attr("id");
        if(tab=="miniSearch"){var q= $(this).parent("span").siblings("input[name='q']").val();}
        else{var q = $(this).parent("div").siblings("input[name='q']").val();}
console.log(q)
        var query = q.replace(",", " ");
console.log(tab);
if(tab=="mini"){return false;}
        switch (tab) {

            case "primoTab":
            case "miniSearch":

                var kw = "any,contains," + query
                var opts = {
                    "institution": "01ALLIANCE_LCC",
                    "vid": "01ALLIANCE_LCC:LCC",
                    "query": kw,
                    "tab": "Everything",
                    "search_scope": "EVERYTHING",
                    // on Rapido Day!
                    //"tab": "LCC_owned",
                    //"search_scope": "LCC_owned",                   
                    "lang": "en"
                };
                var getParams = jQuery.param(opts);
                var targetUrl = primoBase + getParams;
                window.location.replace(targetUrl);
                break;

            case "booksTab":

                var scope = $("input[name='scope']:checked").val();
                var idx = $("select[name='index']").children("option:selected").val();
                if (scope == "worldcat") {
                    var wcidx = {
                        "any": "kw",
                        "title": "ti",
                        "creator": "au",
                        "sub": "su"
                    }
                    var i = wcidx[idx];
                    var qString = i + ":" + query;
                    var opts = {
                        "queryString": qString
                    }
                    var lib = $(".searchwidget").attr("id");
                    var getParams = jQuery.param(opts);
                    if (lib == "watzek") {
                        var targetUrl = wcBase + getParams;
                        window.location.replace(targetUrl);

                    }
                    if (lib == "boley") {
                        var targetUrl = boleyWcBase + getParams;
                        window.location.replace(targetUrl);

                    }

                } else {
                    if (scope == "MyInstitution") {
                        tab = "LC";
                    }
                    if (scope == "SUMMIT") {
                        tab = "Summit";
                    }


                    var bookQ = idx + ",contains," + query
                    var opts = {
                        "institution": "01ALLIANCE_LCC",
                        "vid": "01ALLIANCE_LCC:LCC",
                        "query": bookQ,
                        "tab": tab,
                        "search_scope": scope,
                        "lang": "en"
                    };
                    var getParams = jQuery.param(opts);
                    var targetUrl = primoBase + getParams;
                    window.location.replace(targetUrl);
                }

                break;

            case "eonlyTab":
                var kw = "any,contains," + query
                var opts = {
                    "institution": "01ALLIANCE_LCC",
                    "vid": "01ALLIANCE_LCC:LCC",
                    "query": kw,
                    "tab": "EResources",
                    "search_scope": "EResources",
                    "lang": "en"
                };
                var getParams = jQuery.param(opts);
                var targetUrl = primoBase + getParams;
                window.location.replace(targetUrl);

                break;


            case "articlesTab":
                var kw = "any,contains," + query
                var opts = {
                    "institution": "01ALLIANCE_LCC",
                    "vid": "01ALLIANCE_LCC:LCC",
                    "query": kw,
                    "tab": "Everything",
                    "search_scope": "EVERYTHING",
                    // on Rapido Day!
                    //"tab": "LCC_owned",
                    //"search_scope": "LCC_owned",   
                    "lang": "en"
                };
                var getParams = jQuery.param(opts);
                var targetUrl = primoBase + getParams + "&mfacet=rtype,include,articles,1&mfacet=rtype,include,newspaper_articles,1";
                window.location.replace(targetUrl);
                break;

            case "journalsTab":
                var kw = "title,contains," + query
                var opts = {
                    "institution": "01ALLIANCE_LCC",
                    "vid": "01ALLIANCE_LCC:LCC",
                    "query": kw,
                    "tab": "LC",
                    "search_scope": "MyInstitution",
                    "lang": "en"
                };
                var getParams = jQuery.param(opts);
                var targetUrl = primoBase + getParams + "&mfacet=rtype,include,journals,1&mfacet=rtype,include,newspapers,1";
                window.location.replace(targetUrl);
                break;

        }

        return false;

    });

});
</script>

<script>
  window._slaaskSettings = {
    key: "295dd444a1af2c9ab3456b7da45a415a",
  };
</script>
<script src="https://cdn.slaask.com/chat_loader.js" async="true"></script>


