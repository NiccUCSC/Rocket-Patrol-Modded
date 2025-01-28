class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }
    
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield1').setOrigin(0, 0)
        this.starfield1 = this.add.tileSprite(0, 0, 640, 480, 'starfield1').setOrigin(0, 0).setScale(1.5)
    
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(100)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(100)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(100)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(100) 
        

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
    
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderPadding*20, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderPadding*25, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderPadding*30, 'spaceship', 0, 10).setOrigin(0,0)
        this.ship04 = new Fastship(this, game.config.width, borderPadding*12, 'fastship', 0, 60).setOrigin(0,0).setScale(2)

        console.log(borderPadding)
        console.log(borderUISize)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    
        // initialize score
        this.p1Score = 0
        this.timeLeft = 60

        // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig)

        this.clock = this.add.text(320, borderUISize + borderPadding*2, this.timeLeft, {...this.scoreConfig, align: 'center'}).setOrigin(0.5, 0)
    
        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        this.scoreConfig.fixedWidth = 0
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        this.timeLeft -= dt
        if (this.timeLeft < 0) {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', this.scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        this.starfield.tilePositionX -= 4 * 60 * dt
        this.starfield1.tilePositionX -= 6 * 60 * dt

        if(!this.gameOver) {               
            this.p1Rocket.update(time, dt)         // update rocket sprite
            this.ship01.update(time, dt)           // update spaceships (x3)
            this.ship02.update(time, dt)
            this.ship03.update(time, dt)
            this.ship04.update(time, dt)
        } 

        // check collisions

        let ships = [this.ship01, this.ship02, this.ship03, this.ship04]
        for (let ship of ships) {
            if (this.checkCollision(this.p1Rocket, ship)) {
                this.p1Rocket.reset()
                this.shipExplode(ship)
            }
        }

        this.clock.setText(Math.max(Math.round(this.timeLeft), 0))
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship.y) {
          return true
        } else {
          return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')           // play explode animation
        boom.on('animationcomplete', () => { // callback after ani completes
          ship.reset()                       // reset ship position
          ship.alpha = 1                     // make ship visible again
          boom.destroy()                     // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.timeLeft += ship.points / 10 - 0.7
        this.scoreLeft.text = this.p1Score       
    }
}