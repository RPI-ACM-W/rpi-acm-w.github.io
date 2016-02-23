var upcomingEvents = $("#upcomingEvents");
var pastEvents = $("#pastEvents");

var toggleButtonLeft = $( "#toggleButtonLeft" );
var toggleButtonRight = $( "#toggleButtonRight" );
/* ===================================================================================================================*/
/* User has selected the Upcoming events button. Highlight this button and display upcoming events. */

toggleButtonLeft.click(function() {

    upcomingEvents.show();
    toggleButtonLeft.attr('class', 'active btn btn-primary toggleButton');

    pastEvents.hide();
    toggleButtonRight.attr('class', 'btn btn-primary toggleButton');

});
/* ===================================================================================================================*/
/* User has selected the past events button. Highlight this button and display past events.*/

toggleButtonRight.click(function() {

    pastEvents.show();
    toggleButtonRight.attr('class', 'active btn btn-primary toggleButton');

    upcomingEvents.hide();
    toggleButtonLeft.attr('class', 'btn btn-primary toggleButton');

});
/* ===================================================================================================================*/
/*Load the json event data into the upcomingEvents and pastEvents sections upon page load*/
function loadEventData() {

    pastEvents.hide();
    upcomingEvents.show();

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
                upcomingEvents.prepend(panelOutput);
            }
            else if (eventYear == curYear && eventMonth > curMonth) {
                upcomingEvents.prepend(panelOutput);
            }
            else if (eventYear > curYear) {
                upcomingEvents.prepend(panelOutput);
            }
            else {
                pastEvents.append(panelOutput);
            }
        }
    });
}
loadEventData();

/* Load the announcement data ========================================================================================*/


