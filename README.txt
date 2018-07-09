Author: Daniel Thompson
BAMTech Media Associate Software Engineer interview assignment.


This project is done in Javascript, HTML, and CSS.
The purpose is to simulate the browsing of video streams for a given day.
The data was retrieved via a provided URL that contains the JSON for the games.

A thumbnail for each game of the day is loaded, with the first one initially being focused.
The user can use the arrow buttons to go back and forth between focused games.
The focused game's thumbnail size will increase by 125% and gain a border.
In addition, a headline with the matchup will appear above the thumbnail,
and the text below the thumbnail will display the venue of the game.

Should the user press enter on the selected game, the opacity will be reduced, and text containing the local start time of the game will appear.
The user can either go to another game, or press enter again for this 'overlay' to go away.
This is done to simulate some sort of behavior as if the user wanted to watch the given video.

In the DAL, an attempt to get the URL for the current day is done within an unused method. 
While the retrieval of the URL is successful if used, for some reason the thumbnails are always broken.
The logic is left in place in case this is fixed or someone wishes to observe how it is done, but 
a default URL that does work is used for now.

This project was done using the "Brackets" IDE/Text editor. 
The 'run live preview' button within this editor was used to run the project and observe it in Google Chrome.

Additionally, if you are running on a Mac, you can type "file:///" into Chrome,
navigate to the directory of the project, and click on "index.html" to run it in the browser window.




Things to note: A CORS issue was ran into, and therefore a workaround was found to use a CORS proxy in the default url.
                There are other workarounds, but with the resources I was using, this was the simplest given the problem,
                and how its only one url of game information anyway.
                
                Also, in app.js, a small timeout is added to the init() function. This is because without it, the first image 
                always failed to load. This could be an issue with how the data is obtained synchronously (my best guess), but
                this workaround was simple and inconsequential enough to be a sufficient enough solution.