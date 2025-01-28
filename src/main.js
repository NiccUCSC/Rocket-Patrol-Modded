// Name: Nicolas Vaillancourt
// Date: 1-27-25
//
// Title: ShitPatrol
// Time: ~9000000 ms (2.5 hrs)
//
// Changes:
//
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
// Implement mouse control for player movement and left mouse click to fire (5)
// Display the time remaining (in seconds) on the screen (3)
// Implement parallax scrolling for the background (3)
// Create a new scrolling tile sprite for the background (1)


"use strict"

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    scale: {
        // mode: Phaser.Scale.FIT, // Ensures the game scales proportionally to fit
        autoCenter: Phaser.Scale.CENTER_BOTH // Centers the game both horizontally and vertically
    },
    pixelArt: true,
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3