# Target Practice
## Overview
Target practice is a simple yet satisfying archery game. The browser-based challenge allows two players to take 30 second turns as they use their bow and arrow to try and hit moving targets that are falling from the sky. Players will aim at the targets by rotating their bow on a 180 degreee axis for a fixed anchor point. Players will earn one point for each time they hit a target.

 Once a player earns enough points to meet the threshold, they will be declared the winner and the game will end.

TLDR: Using your mouse, aim your bow and arrow to hit moving targets and out-bullseye your opponent.
## Tech Stack
Target Pracitce will be built using HTML, CSS, and JavaScript. Some potential roadblocks I forsee when building this game will be rendering the arrows on the screen using Canvas. Making sure each follows a straight-line path once it is launched will present its own challange, let alone tracking the position of every moving arrow an every moving target to detect a bullseye.
## Wire Frames
![frameOne](wireFrames/archery_frame1.png)
Levels, Turns, and Player's points will be tracked in the bottom right corner of the game board. The current player's point counter will be highlighted.

![frameTwo](wireFrames/archery_frame2.png)
Targets will fall from the top of the screen to the bottom. When a player's arrow makes contact with a target's bullseye, their respective "Player X" counter will increment by 1.



## MVP Goals
* Render falling targets on the screen at different intervals
* Track and render Player points in their respective boxes at the bottom right of the screen
* Track whose turn it is and highlight the points box of the current player
* Implement a start button so the next player's turn does not begin until they are ready.
* Once a turn has begun, allow the player to move the bow 180 degrees from the anchor point.
* Render arrows on the screen, moving in a straight line from the angle at which they were fired
* Increment the current player's point counter when an arrow tip comes into contact with a bullseye.


## Stretch Goals
* Create two additional levels, each with smaller, faster moving targets.

![frameThree](wireFrames/archery_frame3.png)
Targets will get smaller and move faster for each consecutive level.

![frameFour](wireFrames/archery_frame4.png)
The "Level" box will track and display the incrementing levels of the game.

* Animate a "+1" to appear next to the respective target when a player gets a bullseye
* Create levels with targets moving vertically and horizontally across the screen
* Create a smashing-pumpkins theme where targets are replaced with pumpkins


