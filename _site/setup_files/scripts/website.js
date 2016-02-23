//Contains site wide javascript functions
//======================================================================================================================

//Function to load the navigation bar and footer onto the page
function loadHeaderandFooter() {
    $( "#loadNavBar" ).load( "base_html_files/navbar.html", function() {
        updateNavBar();
    });
    $( "#loadFooter" ).load( "base_html_files/footer.html" );
}

$(loadHeaderandFooter);
//======================================================================================================================

//Function to make sure the correct tab of the nav bar is highlighted
function updateNavBar() {

    //Get the current page
    var current_page = $(location).attr('pathname');
    console.log(current_page);

    //Chop off the file type at the end of the url
    var res = current_page.split('.');
    current_page = res[0];
    console.log(current_page);

    //Split string by / and save just the page name
    res = current_page.split('/');
    current_page = res[res.length - 1];
    console.log(current_page);

    //Handle case where user is on site index page
    if (current_page == '/') {
        $("#index").attr('class', 'active tab');

        $('.tab').each(function() {
            var tabID = $(this).attr('id');

            if (tabID != "index") {
                $(this).attr('class', 'tab');
            }
        });
    }

    else {
        //Go through nav bar tabs and update them
        $('.tab').each(function() {
            var tabID = $(this).attr('id');
            console.log("ID IS: " + tabID + "\n");

            //If tab id equals the current page, highlight that tab
            if (tabID == current_page) {
                $(this).attr('class', 'active tab');
            }

            //If tab id does not equal the current page, make sure that tab is not highlighted
            else {
                $(this).attr('class', 'tab');
            }
        });
    }

}
//======================================================================================================================


