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
    pixelArt: true
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3