function gameUpdate() {

    var asteroids, cursors;
    var scrollX, scrollY;

    // Space background effect
    this.space_layer1.tilePositionX += .05;
    this.space_layer2.tilePositionX += .15;
    this.space_layer3.tilePositionX += .25;

    // Camera follows player
    //scrollX = player.x - game.config.width / 2;
    this.cameras.main.scrollX = scrollX;

    // Set velocity so player doesn't keep moving
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    //this.asteroid.x = this.asteroid.x - 1;
    asteroids.children.iterate(asteroid => {
        asteroid.x = asteroid.x - 1;
    });

    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-300);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(300);
        player.anims.play('right', true);
    }

    else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('turn');
    }
}

export default gameUpdate;