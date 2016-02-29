var aboutUs = $("#aboutUs");
var studentLeaders = $("#studentLeadership");
var facultyLeaders = $("#facultyLeadership");
var constitution = $("#acmwConstitution");

var aboutUsB = $( "#aboutUsB" );
var studentLeadersB = $("#studentLeadersB");
var facultyLeadersB = $("#facultyLeadersB");
var constitutionB = $("#constitutionB");

$(function onPageLoad() {
    aboutUs.show();
    studentLeaders.hide();
    facultyLeaders.hide();
    constitution.hide();
});
/* ================================================================================================================== */
/* When About Us button is clicked, display About Us section and hide all others. */
aboutUsB.click(function() {
    aboutUs.show();
    studentLeaders.hide();
    facultyLeaders.hide();
    constitution.hide();

    aboutUsB.attr('class', 'active');
    studentLeadersB.attr('class', 'nonactive');
    facultyLeadersB.attr('class', 'nonactive');
    constitutionB.attr('class', 'nonactive');
});
/* ================================================================================================================== */
/* When Constitution button is clicked, display Constitution PDF and hide all other sections. */
constitutionB.click(function() {
    aboutUs.hide();
    studentLeaders.hide();
    facultyLeaders.hide();
    constitution.show();

    aboutUsB.attr('class', 'nonactive');
    studentLeadersB.attr('class', 'nonactive');
    facultyLeadersB.attr('class', 'nonactive');
    constitutionB.attr('class', 'active');
});
/* ================================================================================================================== */
facultyLeadersB.click(function() {
    aboutUs.hide();
    studentLeaders.hide();
    facultyLeaders.show();
    constitution.hide();

    aboutUsB.attr('class', 'nonactive');
    studentLeadersB.attr('class', 'nonactive');
    facultyLeadersB.attr('class', 'active');
    constitutionB.attr('class', 'nonactive');
});

