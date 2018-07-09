/*
 * Game class to hold the image, and all of the values that will be used for a given game, once displayed.
 */
var homeTeam;
var awayTeam;
var venue;
var image; 
var timeZone;
var gameTime;

//Getters that were created weren't returning anything, so instead, the values are just accessed directly when needed
function Game(homeTeam, awayTeam, image, venue, timeZone, gameTime) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.image = image;
    this.venue = venue;
    this.timeZone = timeZone;
    this.gameTime = gameTime;
}
