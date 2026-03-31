const Phaser = window.Phaser; // Phaser is loaded via <script> in index.html;

function gameUpdate() {
    // If update runs too early, dip out
    if (!this.player || !this.cursors || !this.asteroids) {
        return;
    }

    // Space background effect.
    this.space_layer1.tilePositionX += 0.05;
    this.space_layer2.tilePositionX += 0.15;
    this.space_layer3.tilePositionX += 0.25;

    // Camera follows player.
    const scrollX = this.player.x - this.game.config.width / 2;
    this.cameras.main.scrollX = scrollX;

    // Reset velocity so the player does not keep moving between frames.
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    // Move asteroids.
    this.asteroids.children.iterate((asteroid) => {
        if (asteroid) {
            asteroid.x -= 1;
        }
    });

    // Player movement.
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-300);
        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(300);
        this.player.anims.play('right', true);
    }
    else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('turn');
    }
}

export default gameUpdate;
