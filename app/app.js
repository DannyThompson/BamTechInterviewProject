/******************
 *Global Variables*
 ******************/
var globalGamesData;
var selectedImage = 0; //The image of the current game that is focused.
var baseWidth; //Set later since we need to know the base width for resizing of the images.
var row; //Container that will eventually house the images. Will be set later, because we need global access at one point.
var rowLeft; //The left margin of the 'row' container.
var currentImage;
var teamsText = this.document.getElementById("teamsText");
var teamsTextContainer = this.document.getElementById("teamsTextContainer");
var venueText = this.document.getElementById("venueText");
var venueTextContainer = this.document.getElementById("venueTextContainer");
var overlayShown = false; //Whether the user has pressed enter on an image yet or not.

/****************************************************
 *Begin Getting Game data and creating list of games*
 ****************************************************/

globalGamesData = getJsonData();

var numGames = globalGamesData.games.game.length;
var games = globalGamesData.games.game;
var gameViews = [];

//Load each game item into an array of games
games.forEach(function(item) {
    var game = new Game(item.home_team_name, item.away_team_name, item.video_thumbnails.thumbnail[0].content, item.venue, item.home_time_zone, item.home_time);
    gameViews.push(game);    
});

/*****************************************
 *Get the Images and add them to the DOM**
 *****************************************/
for(var i = 0; i < numGames; i++) {
    var row = this.document.getElementById("row");
    var column = this.document.createElement("column");
    var img = this.document.createElement("img");
    
    img.style.marginTop = "10px";
    img.src = gameViews[i].image;
    img.id = "img"+i;
    img.style.marginRight = '20px';
    column.appendChild(img);
    row.style.left = '10px';
    row.appendChild(column);
} 

//Initialize
this.init();

currentImage = this.document.getElementById("img" + selectedImage);

/*********************************************************************
 *Set up the handling of key events, display, and resizing of images**
 *********************************************************************/

/* If right arrow is pressed, move right. If left arrow is pressed, move left.
 * Also resizes images as necessary.
 */
function keyDownEvent(event) {    
    row = document.getElementById("row");
    rowLeft = parseInt(row.style.left);
    if(event.keyCode == '39') { //Keycode for 'right'
        if(selectedImage < numGames - 1) {            
            decreaseImageSize();
            selectedImage++;
            increaseImageSize();
            setFocusedImageDetails();
            row.style.left = (rowLeft - baseWidth) + 'px';
            handleKeyEvent(parseInt(event.keyCode));
        }
    } else if(event.keyCode == '37') { //Keycode for 'left'
        if(selectedImage != 0) {
            decreaseImageSize();
            selectedImage--;
            increaseImageSize();
            setFocusedImageDetails();
            row.style.left = (rowLeft + baseWidth) + 'px';
            handleKeyEvent(parseInt(event.keyCode));
        }
    } else if(event.keyCode == '13') {
        handleKeyEvent(parseInt(event.keyCode));
    }
}


/* Position the text relative to the image. The math done is to account for the margins, offset, etc. f
 * Aligned to the left to ensure the text fits with minimal overlap.
 */
function handleKeyEvent(event) {
    switch(event) {
        case 39: //39 = keycode for 'right'.
            teamsTextContainer.style.marginLeft = (currentImage.offsetLeft - baseWidth + rowLeft - 10) + 'px';
            venueTextContainer.style.marginLeft = (currentImage.offsetLeft - baseWidth + rowLeft - 10) + 'px';
            break;
            
        case 37: //37 = keycode for 'left'.
            teamsTextContainer.style.marginLeft = (currentImage.offsetLeft + baseWidth + rowLeft - 10) + 'px';
            venueTextContainer.style.marginLeft = (currentImage.offsetLeft + baseWidth + rowLeft - 10) + 'px';
            break;
            
        case 13: //13 = keycode for 'enter'.
            toggleOverlay();
    }
}

//Size image up by 125% and add a border.
function increaseImageSize() {
        currentImage = document.getElementById("img" + selectedImage);
        var currentHeight = currentImage.height;
        var currentWidth = currentImage.width;
        currentImage.style.height = currentHeight * 1.25 + 'px';
        currentImage.style.width = currentWidth * 1.25 + 'px';
        currentImage.style.marginTop = "0px";
        currentImage.style.border = '2px solid #F21E42'; //Setting the border color to BAMTech red!
}

//Return image to normal size (decrease by 125%) and remove border.
function decreaseImageSize() {
        currentImage = document.getElementById("img" + selectedImage);
        var currentHeight = currentImage.height;
        var currentWidth = currentImage.width;
        currentImage.style.height = currentHeight / 1.25 + 'px';
        currentImage.style.width = currentWidth / 1.25 + 'px'; 
        currentImage.style.marginTop = "10px";
        currentImage.style.border='';
        if(overlayShown) {
            toggleOverlay();
        }
}

/**************************************
 *Initialization and toggle functions**
 **************************************/

/* Handle the toggling of the time overlay if 'enter' is pressed on the selected game.
 * Meant to simulate some sort of action as if the user selected the game to play.
 */
function toggleOverlay() {
    if(overlayShown) {
        overlayShown = false;
        customCss.removeChild(customCss.childNodes[0]);
        currentImage.style.opacity = '1';
    } else {
        overlayShown = true;
        var content = document.createTextNode("Start time: " + gameViews[selectedImage].gameTime + gameViews[selectedImage].timeZone);
        customCss.appendChild(content);
        currentImage.style.opacity = "0.2";
        currentImage.parentElement.appendChild(customCss);
    }
}

//Initialize the layout
function init() {
    setTimeout(function() {
        initCustomOverlay();
        this.document.onkeydown = keyDownEvent;
        var first = document.getElementById('img0');
        baseWidth = first.width;
        setFocusedImageDetails();
        this.increaseImageSize();
        teamsTextContainer.style.marginLeft = (currentImage.offsetLeft) + 'px';
        venueTextContainer.style.marginLeft = (currentImage.offsetLeft) + 'px';
    }, 100); //For some reason, adding a very slight delay allows for the first image to load properly
}

//Set the text for the given focused game
function setFocusedImageDetails() {
    teamsText.textContent = "Matchup: " + gameViews[selectedImage].awayTeam + ' @ ' + gameViews[selectedImage].homeTeam;
    venueText.textContent = "Venue: " + gameViews[selectedImage].venue;
}

//Initialize the custom overlay for when 'enter' is pressed on a game.
function initCustomOverlay() {
    customCss = document.createElement('center');
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.cssClass { color: white; align-content: center; font-size: 13px; padding-bottom: 0px; margin-top: -55px; margin-left: -20px}';
    document.getElementsByTagName('head')[0].appendChild(style);
    customCss.className = 'cssClass';
}

