//Contains javascript functions specific to the site homepage

var announcements = $("#announcements");
var nextEvent = $("#nextEvent");

var toggleButtonLeft = $( "#toggleButtonLeft" );
var toggleButtonRight = $( "#toggleButtonRight" );
//======================================================================================================================
//Load the carousel of images onto the page dynamically and have them rotate automatically

$(function loadCarousel() {

    var output = "";
    $.getJSON('data_files/carousel.json', function(data) {

        //--------------------------------------------------------------------------------------------------------------
        //Load the indicators for the carousel dynamically, based off the number of photos to be inserted
        for (var i in data.carouselData) {
            if (i == 0) {
                output+="<li data-target=\"#homeCarousel\" data-slide-to=\"0\" class=\"active\"></li>";
            }

            else {
                output+= "<li data-target=\"#homeCarousel\" data-slide-to=\"" + i + "\"></li>";
            }
        }
        var carouselIndicators = $("#carouselIndicators");
        carouselIndicators.empty();
        carouselIndicators.append(output);
        output="";
        //--------------------------------------------------------------------------------------------------------------
        //Load the photos into the carousel slides dynamically
        for (var j in data.carouselData) {
            if (j == 0) {
                output+= "<div class=\"item active\">";
            }
            else {
                output+="<div class=\"item\">";
            }

            output+= "<img src=\"" + data.carouselData[j].img_src + "\" alt=\"" + data.carouselData[j].alt_tag + "\" width=\"815\"" +
                " height=\"458\" id='carouselImage'>";
            output+= "<div class=\"carousel-caption\">";

            if (data.carouselData[j].caption_header != "") {
                output+= "<h1>" + data.carouselData[j].caption_header + "</h1>";
            }
            if (data.carouselData[j].caption_body != "") {
                output+= "<p class='carouselCaption'>" + data.carouselData[j].caption_body + "</p>";
            }

            output+= "</div></div>";
        }
        var carouselInner = $("#carouselInner");
        carouselInner.empty();
        carouselInner.append(output);
        //--------------------------------------------------------------------------------------------------------------
    });

});
/* ===================================================================================================================*/
/* User has selected the Announcements button. Highlight this button and display announcements. */

toggleButtonLeft.click(function() {

    announcements.show();
    toggleButtonLeft.attr('class', 'active btn btn-primary toggleButton');

    nextEvent.hide();
    toggleButtonRight.attr('class', 'btn btn-primary toggleButton');

});
/* ===================================================================================================================*/
/* User has selected the past events button. Highlight this button and display past events.*/

toggleButtonRight.click(function() {

    nextEvent.show();
    toggleButtonRight.attr('class', 'active btn btn-primary toggleButton');

    announcements.hide();
    toggleButtonLeft.attr('class', 'btn btn-primary toggleButton');

});
/* ===================================================================================================================*/
/*Modified event loading function from events.js . Instead of displaying ALL upcoming events, it will only display next
ACM-W event that is going to take place.  Kind of a hacky set up right now, but it works!*/

function loadEventData() {

    announcements.show();
    nextEvent.hide();

    //Get current date information... needed to tell whether event is upcoming or past
    var dateObj = new Date();
    var curMonth = dateObj.getUTCMonth() + 1; //months from 1-12
    var curDay = dateObj.getUTCDate();
    var curYear = dateObj.getUTCFullYear();

    $.getJSON('data_files/events.json', function(data) {
        var panelOutput;

        //Go through each event
        for (var i in data.eventsData) {
            panelOutput = "";

            //Get the event date data
            var eventMonth = data.eventsData[i].date.month;
            var eventDay = data.eventsData[i].date.day;
            var eventYear = data.eventsData[i].date.year;

            //Get the event time data
            var startTime = data.eventsData[i].time.start + " " + data.eventsData[i].time.startAMPM;
            var endTime = data.eventsData[i].time.end + " " + data.eventsData[i].time.endAMPM;

            //Start building the panel
            panelOutput += "<div class='panel panel-default infoPanel'>";

            //Build the panel heading
            panelOutput += "<div class='panel-heading'>";
            panelOutput += "<h3 class='panel-title'>" + data.eventsData[i].title + "</h3>";
            panelOutput += "</div>";

            //Build the table of event info
            panelOutput += "<table class='table'>";
            panelOutput += "<tbody>";

            //Event date
            panelOutput += "<tr>";
            panelOutput += "<td class='tableHeader'>Date</td>";
            panelOutput += "<td>" + eventMonth + "/" + eventDay + "/" + eventYear + "</td>";
            panelOutput += "</tr>";

            //Event time
            panelOutput += "<tr>";
            panelOutput += "<td class='tableHeader'>Time</td>";
            panelOutput += "<td>" + startTime + " to " + endTime + "</td>";
            panelOutput += "</tr>";

            //Event location
            panelOutput += "<tr>";
            panelOutput += "<td class='tableHeader'>Location</td>";
            panelOutput += "<td>" + data.eventsData[i].location + "</td>";
            panelOutput += "</tr>";


            panelOutput += "</tbody>";
            panelOutput += "</table>";

            //Build the panel body
            panelOutput += "<div class='panel-body panelDesc'>";
            panelOutput += "<p class='descHeader'>Description</p>";
            panelOutput += "<section>" + data.eventsData[i].description + "</section>";
            panelOutput += "</div>";

            panelOutput += "</div>";

            //Check to see if event is upcoming or past. Add panel to appropriate section.
            if (eventYear == curYear && eventMonth == curMonth && eventDay >= curDay) {
                nextEvent.empty();
                nextEvent.prepend(panelOutput);
            }
            else if (eventYear == curYear && eventMonth > curMonth) {
                nextEvent.empty();
                nextEvent.prepend(panelOutput);
            }
            else if (eventYear > curYear) {
                nextEvent.empty();
                nextEvent.prepend(panelOutput);
            }
        }
    });
}

loadEventData();
/* ================================================================================================================== */
/* Get the news data from the xml file, parse it, and display it in Bootstrap panels on the homepage.*/
function parseNewsData(document) {
    var panelOutput;
    $(document).find("news").each(function() {
        panelOutput = "";

        //Start building the panel
        panelOutput += "<div class='panel panel-default infoCard'>";

        //Build the panel heading
        panelOutput += "<div class='panel-heading'>";
        panelOutput += "<h3 class='panel-title'>" + $(this).find('title').text() + "</h3>";
        panelOutput += "</div>";

        //Build the table of date info
        panelOutput += "<table class='table'>";
        panelOutput += "<tbody>";

        //Announcement Date
        panelOutput += "<tr>";
        panelOutput += "<td>" + $(this).find('month').text() + " " + $(this).find('day').text() + ", " +
            $(this).find('year').text() + "</td>";
        panelOutput += "</tr>";

        //Close the table of date info
        panelOutput += "</tbody>";
        panelOutput += "</table>";

        //Build the panel body
        panelOutput += "<div class='panel-body panelDesc'>";

        //News description
        $(this).find("paragraph").each(function() {
            panelOutput += "<p>" + $(this).text() + "</p>";
        });

        //Close the panel body
        panelOutput += "</div>";

        //Build the table of links
        panelOutput += "<table class='table'>";
        panelOutput += "<tbody>";

        //Link Row
        $(this).find("link").each(function() {
            panelOutput += "<tr>";
            panelOutput += "<td class='tableHeader'>" + $(this).find('header').text() + "</td>";
            panelOutput += "<td ><a href=\"" + $(this).find('url').text() + "\" target=\"_blank\">" + "LINK" + "</a></td>";
            panelOutput += "</tr>";
        });

        //Close the table of links
        panelOutput += "</tbody>";
        panelOutput += "</table>";

        //Close the panel
        panelOutput += "</div>";

        //Add panel to news feed
        announcements.append(panelOutput);

    });

}
/* ================================================================================================================== */
/* AJAX Request to get the news data from the XML file */
function loadNewsData() {
    $.ajax({
        type: "GET",
        url: 'data_files/news.xml',                 // name of file you want to parse
        dataType: "xml",                            // type of file you are trying to read
        success: parseNewsData,                     // name of the function to call upon success
        error: function(){console.log("Could not read news.xml successfully!\n");}
    });
}
loadNewsData();