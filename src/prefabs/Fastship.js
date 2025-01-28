// Spaceship prefab
class Fastship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
    
        // add object to existing scene
        scene.add.existing(this)

        this.points = pointValue
        this.moveSpeed = Math.PI * 0.5 * game.settings.spaceshipSpeed


        this.anims.create({
            key: 'fastshipspin',  // The key for the animation
            frames: this.anims.generateFrameNumbers('fastship', { start: 0, end: 3, first: 0 }),  // The frame range
            frameRate: 5,  // Speed of the animation (frames per second)
            repeat: -1  // Ensures the animation loops infinitely
        })

        this.anims.play('fastshipspin')
    }

    update(time, dt) {
        this.x -= this.moveSpeed * 120 * dt

        if (this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }

    reset() {
        this.x = game.config.width
    }
  }