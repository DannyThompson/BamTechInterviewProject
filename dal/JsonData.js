/* 
 * DAL -> This file is where the Data from the url is actually obtained.
 */

var url = 'http://gdx.mlb.com/components/game/mlb';
//Default url since image links are broken on any given current day. Also added a cors proxy link to bypass CORS issues.
var defaultUrl = 'https://cors.io/?https://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json';

var date = new Date();
var year = date.getFullYear();
var day = date.getDay();
var month = date.getMonth();
var globalGamesData;

/* Ran into issues with lots of broken urls, especially for images.
 * The given base url didn't work at all, 
 * and the thumbnail image for each day when I got the current date was broken.
 * So, I increased the day by one from the given default url, and that worked so I left it.
 * The work to dynamically generate the url based on the day is left in place.
 * All you need to do is call this function in getJsonData where 'defaultUrl' is used instead to observe this behavior, if you wish.
 */
function getGameDayUrl() {
    url += '/year_' + year;
    
    if(month < 9) {
        url += '/month_0' + month;
    } else {
        url += '/month_' + month;
    }
    
    if(day < 9) {
        url += '/day_0' + day + '/master_scoreboard.json';
    } else {
        url += '/day_' + day + '/master_scoreboard.json';
    } 
    
    return url;
}

//Return the JSON data from the URL.
function getJsonData() {
    //Don't want to get data asynchronously, since we can't do anything else until we get it.
    //This is deprecated, so may not be entirely good practice, but for the project it will suffice.
    jQuery.ajaxSetup({async:false}); 
    $.getJSON(defaultUrl, function(json) {
        globalGamesData = json.data;
    });
    
    return globalGamesData;
}

