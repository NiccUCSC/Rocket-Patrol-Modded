// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this)

      this.points = pointValue
      this.moveSpeed = game.settings.spaceshipSpeed
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