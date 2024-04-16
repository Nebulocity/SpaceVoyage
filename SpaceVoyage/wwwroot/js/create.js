function gameCreate() {
    var backgroundProps, cables;
    var reactor_on, reactor_off, engineTerminal, cryotube, cryoFluid1, cryoFluid2, cryoFluid3,
        helm, helmterminal, warnings;
    var reactorGlow, engineTerminalGlow, cryotubeGlow, fluidGlow, helmTerminalGlow;
    var reactorWarnings, engineTerminalWarnings, cryotubeWarnings, fluidsWarnings, helmTerminalWarnings;
    var ship, player, asteroids, cursors, events;

    // Set world bounds
    this.physics.world.setBounds(0, 0, 800, 252);

    // Create space background
    const space_layer1 = this.make.graphics({ x: 0, y: 0, add: false });
    space_layer1.generateTexture('space_layer1', 0, 0);
    this.space_layer1 = this.add.tileSprite(0, 0, 2400, 900, 'space_layer1').setScale(1);
    this.space_layer1.depth = -99;

    const space_layer2 = this.make.graphics({ x: 0, y: 0, add: false });
    space_layer2.generateTexture('space_layer2', 0, 0);
    this.space_layer2 = this.add.tileSprite(0, 0, 2400, 900, 'space_layer2').setScale(1);
    this.space_layer1.depth = -98;

    const space_layer3 = this.make.graphics({ x: 0, y: 0, add: false });
    space_layer3.generateTexture('space_layer3', 0, 0);
    this.space_layer3 = this.add.tileSprite(0, 0, 2400, 900, 'space_layer3').setScale(1);
    this.space_layer1.depth = -97;

    // Ship background
    this.shipbackground = this.add.tileSprite(-8, 115, 3270, 600, "shipbackground").setScale(.25).setOrigin(0).setScrollFactor(1);
    backgroundProps = this.physics.add.staticGroup();
    backgroundProps.create(160, 150, 'horizontalvent').setScale(.15);
    backgroundProps.create(320, 150, 'horizontalvent').setScale(.15);
    backgroundProps.create(260, 150, 'verticalvent').setScale(.15);
    backgroundProps.create(650, 150, 'horizontalvent').setScale(.15);

    // Cables
    cables = this.physics.add.staticGroup();
    cables.create(50, 160, 'tallcable').setScale(.16);
    cables.create(20, 185, 'thickcable').setScale(.15);
    cables.create(70, 140, 'tallcable').setScale(.1);
    cables.create(75, 130, 'widecable').setScale(.15);
        
    // Create engine room
    this.engineroomwall = this.add.tileSprite(200, 116, 171, 1350, "shipwall").setScale(.07).setOrigin(0).setScrollFactor(1);
    reactor_on = this.physics.add.sprite(75, 196, 'reactor_on').setScale(.09);
    reactor_off = this.physics.add.sprite(75, 196, 'reactor_off').setScale(.09);
    reactor_off.setVisible = false; // Hide reactor being off for now.
    engineTerminal = this.physics.add.sprite(160, 222, 'engineTerminal').setScale(.07);

    // Create Cryo Room
    this.cryoroomwall = this.add.tileSprite(500, 116, 171, 1350, "shipwall").setScale(.07).setOrigin(0).setScrollFactor(1);   
    cryotube = this.physics.add.sprite(325, 195, 'cryotube').setScale(.25);
    cryoFluid1 = this.physics.add.sprite(440, 205, 'fluid').setScale(.15);
    cryoFluid2 = this.physics.add.sprite(460, 205, 'fluid').setScale(.15);
    cryoFluid3 = this.physics.add.sprite(480, 205, 'fluid').setScale(.15);
    cables.create(300, 150, 'tallcable').setScale(.1);
    cables.create(300, 130, 'widecable').setScale(.1);
    cables.create(440, 160, 'tallcable').setScale(.15);
    cables.create(350, 130, 'widecable').setScale(.1);

    // Create Helm
    helm = this.physics.add.sprite(883, 185, 'helm').setScale(.42);
    helmterminal = this.physics.add.sprite(745, 213, 'helmterminal').setScale(.1);
    backgroundProps.create(570, 155, 'indicator').setScale(.1);
    cables.create(600, 130, 'widecable').setScale(.1);
    cables.create(650, 130, 'widecable').setScale(.15);
    cables.create(700, 130, 'widecable').setScale(.1);
    cables.create(750, 160, 'tallcable').setScale(.15);

    // Set up warnings for random events
    warnings = this.physics.add.staticGroup();
    warnings.create(115, 186, 'warning').setScale(.05).setName("reactor_off");
    warnings.create(350, 186, 'warning').setScale(.05).setName("engineTerminal");
    warnings.create(575, 186, 'warning').setScale(.05).setName("cryotube");
    warnings.create(575, 186, 'warning').setScale(.05).setName("cryoFluid2");
    warnings.create(575, 186, 'warning').setScale(.05).setName("helmTerminal");

    reactorGlow = reactor_off.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32)
    engineTerminalGlow = engineTerminal.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32)
    cryotubeGlow = cryotube.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32)
    fluidGlow = cryoFluid2.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32)
    helmTerminalGlow = helmterminal.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32)

    reactorWarnings = this.add.group(warnings.getMatching('name', 'reactor_off'));
    engineTerminalWarnings = this.add.group(warnings.getMatching('name', 'engineTerminal'));
    cryotubeWarnings = this.add.group(warnings.getMatching('name', 'cryotube'));
    fluidsWarnings = this.add.group(warnings.getMatching('name', 'cryofluid'));
    helmTerminalWarnings = this.add.group(warnings.getMatching('name', 'helmterminal'));

    reactor_off.setData('warnings', reactorWarnings);
    engineTerminal.setData('warnings', engineTerminalWarnings);
    cryotube.setData('warnings', cryotubeWarnings);
    cryoFluid2.setData('warnings', fluidsWarnings);
    helmterminal.setData('warnings', helmTerminalWarnings);

    warnings.children.iterate(function (warning) {
        warning.visible = false;
    });

    // Turn off glow by default     
    reactorGlow.active = false;
    engineTerminalGlow.active = false;
    cryotubeGlow.active = false;
    fluidGlow.active = false;
    helmTerminalGlow.active = false;

    // Create ship interior
    ship = this.physics.add.group();
    this.shipfloor = this.add.tileSprite(-8, 252, 8170, 171, "shipfloor").setScale(.1).setOrigin(0).setScrollFactor(1);
    this.shipceiling = this.add.tileSprite(-8, 101, 8170, 171, "shipfloor").setScale(.1).setOrigin(0).setScrollFactor(1);
    this.shipleftwall = this.add.tileSprite(-8, 101, -171, 2400, "shipwall").setScale(.07).setOrigin(0).setScrollFactor(1);
    this.shiprightwall = this.add.tileSprite(810, 101, 171, 2400, "shipwall").setScale(.07).setOrigin(0).setScrollFactor(1);
    this.shipleftwall = this.add.tileSprite(-8, 101, -171, 2400, "shipwall").setScale(.07).setOrigin(0).setScrollFactor(1);
    //ship.add(this.shipfloor);
    //ship.add(this.shipceiling);
    //ship.add(this.shipleftwall);
    ship.add(this.shiprightwall);


    // Player
    player = this.physics.add.sprite(1000, 252, 'dude');
    player.body.setGravityY(800);
    player.setCollideWorldBounds(true);
    player.setBodySize(10, 30, false);
    player.setOffset(10, 15);

    // Asteroids
    const frameNames = this.anims.generateFrameNames('asteroid', {
        start: 0, end: 119, zeroPad: 3,
        prefix: 'Asteroid-A-09-', suffix: '.png'
    });

    this.anims.create({
        key: 'spin',
        frames: frameNames,
        frameRate: 20,
        repeat: -1
    });

    asteroids = this.physics.add.group({
        key: 'asteroid',
        repeat: 5,
    });
    
    // Overlaps
    this.physics.add.overlap(
        player,
        [reactor_off, engineTerminal, cryotube, cryoFluid2, helmterminal],
        function (_player, object) {
            if (cursors.space.isDown) {
                object.preFX.list[0].active = false;
                reactor_off.setVisible = false;
                reactor_on.setVisible = true;
            }
        }
    );

    this.physics.add.overlap(
        ship,
        asteroids,
        function (ship, asteroid) {
            // I only want to shake the camera if the depth of the colliding asteroid
            //  is greater than -1 (it's in the foreground).
            // Then I can call the shatter animation on that asteroid.
            if (asteroid.depth > -1) {
                this.cameras.main.shake(50, .01);
            }
        },
        undefined,
        this
    );

    // Keyboard control
    cursors = this.input.keyboard.createCursorKeys();

    // Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    // Create a random event
    events = this.time.addEvent({
        delay: Phaser.Math.Between(1000, 100000),
        loop: true,
        callback: createEvent,
        callbackScope: this,
        args: [this]
    });
}

function createEvent(scene) {

    const eventType = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    if (eventType == 1) {
        console.log("Uh oh, it looks like the reactor shut off!");
        if (!reactorGlow.active) {
            reactor_off.setVisible = true;
            reactor_on.setVisible = false;
            this.cameras.main.shake(700);

            reactorGlow.active = true;

            scene.tweens.add({
                targets: reactorGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType == 2) {
        console.log("Oh no, the reactor terminal is freaking out!");
        if (!engineTerminalGlow.active) {
            engineTerminalGlow.active = true;

            scene.tweens.add({
                targets: engineTerminalGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType == 3) {
        console.log("The person in the cryotube is flatlining!");
        if (!cryotubeGlow.active) {
            cryotubeGlow.active = true;

            scene.tweens.add({
                targets: cryotubeGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType == 4) {
        console.log("The cryo fluids are getting low");
        if (!fluidGlow.active) {
            fluidGlow.active = true;

            scene.tweens.add({
                targets: fluidGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType == 5) {
        console.log("We're off course, please adjust course at the helm terminal!");
        if (!helmTerminalGlow.active) {
            helmTerminalGlow.active = true;

            scene.tweens.add({
                targets: helmTerminalGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType == 6) {
        console.log("We're heading into an asteroid field!");

        // Asteroids
        for (var i = 0; i < 3; i++) {
            var newAsteroid = this.physics.add.sprite(Math.floor(Math.random() * (1500 - 1 + 1300) + 1300), Math.floor(Math.random() * (400 - 1 + 25) + 25), 'asteroid');
            var depth = Math.round(Math.random());
            if (depth == 0) { depth = -1 };

            newAsteroid.depth = depth;

            asteroids.add(newAsteroid);
            newAsteroid.play('spin');

        }
    }
}

export default gameCreate;