const Phaser = window.Phaser; // Phaser is loaded via <script> in index.html;

function gameCreate() {
    
    let backgroundProps;
    let cables;
    let reactor_on;
    let reactor_off;
    let engineTerminal;
    let cryotube;
    let cryoFluid1;
    let cryoFluid2;
    let cryoFluid3;
    let helm;
    let helmterminal;
    let warnings;
    let reactorWarnings;
    let engineTerminalWarnings;
    let cryotubeWarnings;
    let fluidsWarnings;
    let helmTerminalWarnings;

    // Set world bounds.
    this.physics.world.setBounds(0, 0, 800, 252);

    // Create space background.
    const space_layer1 = this.make.graphics({ x: 0, y: 0, add: false });
    space_layer1.generateTexture('space_layer1', 0, 0);
    this.space_layer1 = this.add.tileSprite(0, 0, 2400, 900, 'space_layer1').setScale(1);
    this.space_layer1.depth = -99;

    const space_layer2 = this.make.graphics({ x: 0, y: 0, add: false });
    space_layer2.generateTexture('space_layer2', 0, 0);
    this.space_layer2 = this.add.tileSprite(0, 0, 2400, 900, 'space_layer2').setScale(1);
    this.space_layer2.depth = -98;

    const space_layer3 = this.make.graphics({ x: 0, y: 0, add: false });
    space_layer3.generateTexture('space_layer3', 0, 0);
    this.space_layer3 = this.add.tileSprite(0, 0, 2400, 900, 'space_layer3').setScale(1);
    this.space_layer3.depth = -97;

    // Ship background.
    this.shipbackground = this.add.tileSprite(-8, 115, 3270, 600, 'shipbackground').setScale(0.25).setOrigin(0).setScrollFactor(1);
    backgroundProps = this.physics.add.staticGroup();
    backgroundProps.create(160, 150, 'horizontalvent').setScale(0.15);
    backgroundProps.create(320, 150, 'horizontalvent').setScale(0.15);
    backgroundProps.create(260, 150, 'verticalvent').setScale(0.15);
    backgroundProps.create(650, 150, 'horizontalvent').setScale(0.15);

    // Cables.
    cables = this.physics.add.staticGroup();
    cables.create(50, 160, 'tallcable').setScale(0.16);
    cables.create(20, 185, 'thickcable').setScale(0.15);
    cables.create(70, 140, 'tallcable').setScale(0.1);
    cables.create(75, 130, 'widecable').setScale(0.15);

    // Create engine room.
    this.engineroomwall = this.add.tileSprite(200, 116, 171, 1350, 'shipwall').setScale(0.07).setOrigin(0).setScrollFactor(1);
    reactor_on = this.physics.add.sprite(75, 196, 'reactor_on').setScale(0.09);
    reactor_off = this.physics.add.sprite(75, 196, 'reactor_off').setScale(0.09);
    reactor_off.setVisible(false); // Hide reactor-off version at startup.
    engineTerminal = this.physics.add.sprite(160, 222, 'engineTerminal').setScale(0.07);

    // Create cryo room.
    this.cryoroomwall = this.add.tileSprite(500, 116, 171, 1350, 'shipwall').setScale(0.07).setOrigin(0).setScrollFactor(1);
    cryotube = this.physics.add.sprite(325, 195, 'cryotube').setScale(0.25);
    cryoFluid1 = this.physics.add.sprite(440, 205, 'fluid').setScale(0.15);
    cryoFluid2 = this.physics.add.sprite(460, 205, 'fluid').setScale(0.15);
    cryoFluid3 = this.physics.add.sprite(480, 205, 'fluid').setScale(0.15);
    cables.create(300, 150, 'tallcable').setScale(0.1);
    cables.create(300, 130, 'widecable').setScale(0.1);
    cables.create(440, 160, 'tallcable').setScale(0.15);
    cables.create(350, 130, 'widecable').setScale(0.1);

    // Create helm.
    helm = this.physics.add.sprite(883, 185, 'helm').setScale(0.42);
    helmterminal = this.physics.add.sprite(745, 213, 'helmterminal').setScale(0.1);
    backgroundProps.create(570, 155, 'indicator').setScale(0.1);
    cables.create(600, 130, 'widecable').setScale(0.1);
    cables.create(650, 130, 'widecable').setScale(0.15);
    cables.create(700, 130, 'widecable').setScale(0.1);
    cables.create(750, 160, 'tallcable').setScale(0.15);

    this.reactorOn = reactor_on;
    this.reactorOff = reactor_off;
    this.engineTerminal = engineTerminal;
    this.cryotube = cryotube;
    this.cryoFluid1 = cryoFluid1;
    this.cryoFluid2 = cryoFluid2;
    this.cryoFluid3 = cryoFluid3;
    this.helm = helm;
    this.helmterminal = helmterminal;

    // Set up warnings for random events.
    warnings = this.physics.add.staticGroup();
    warnings.create(115, 186, 'warning').setScale(0.05).setName('reactor_off');
    warnings.create(350, 186, 'warning').setScale(0.05).setName('engineTerminal');
    warnings.create(575, 186, 'warning').setScale(0.05).setName('cryotube');
    warnings.create(575, 186, 'warning').setScale(0.05).setName('cryoFluid2');
    warnings.create(575, 186, 'warning').setScale(0.05).setName('helmTerminal');

    // Store glows on the Scene too, because createEvent() fires later.
    this.reactorGlow = reactor_off.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32);
    this.engineTerminalGlow = engineTerminal.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32);
    this.cryotubeGlow = cryotube.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32);
    this.fluidGlow = cryoFluid2.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32);
    this.helmTerminalGlow = helmterminal.preFX.addGlow(0x00ffff, 4, 0, false, 0.1, 32);

    reactorWarnings = this.add.group(warnings.getMatching('name', 'reactor_off'));
    engineTerminalWarnings = this.add.group(warnings.getMatching('name', 'engineTerminal'));
    cryotubeWarnings = this.add.group(warnings.getMatching('name', 'cryotube'));
    fluidsWarnings = this.add.group(warnings.getMatching('name', 'cryoFluid2'));
    helmTerminalWarnings = this.add.group(warnings.getMatching('name', 'helmTerminal'));

    reactor_off.setData('warnings', reactorWarnings);
    engineTerminal.setData('warnings', engineTerminalWarnings);
    cryotube.setData('warnings', cryotubeWarnings);
    cryoFluid2.setData('warnings', fluidsWarnings);
    helmterminal.setData('warnings', helmTerminalWarnings);

    warnings.children.iterate(function (warning) {
        warning.visible = false;
    });

    // Turn off glow by default.
    this.reactorGlow.active = false;
    this.engineTerminalGlow.active = false;
    this.cryotubeGlow.active = false;
    this.fluidGlow.active = false;
    this.helmTerminalGlow.active = false;

    // Create ship interior.
    this.ship = this.physics.add.group();
    this.shipfloor = this.add.tileSprite(-8, 252, 8170, 171, 'shipfloor').setScale(0.1).setOrigin(0).setScrollFactor(1);
    this.shipceiling = this.add.tileSprite(-8, 101, 8170, 171, 'shipfloor').setScale(0.1).setOrigin(0).setScrollFactor(1);
    this.shipleftwall = this.add.tileSprite(-8, 101, -171, 2400, 'shipwall').setScale(0.07).setOrigin(0).setScrollFactor(1);
    this.shiprightwall = this.add.tileSprite(810, 101, 171, 2400, 'shipwall').setScale(0.07).setOrigin(0).setScrollFactor(1);
    this.shipleftwall = this.add.tileSprite(-8, 101, -171, 2400, 'shipwall').setScale(0.07).setOrigin(0).setScrollFactor(1);
    // this.ship.add(this.shipfloor);
    // this.ship.add(this.shipceiling);
    // this.ship.add(this.shipleftwall);
    this.ship.add(this.shiprightwall);

    // Player.
    this.player = this.physics.add.sprite(1000, 252, 'dude');
    this.player.body.setGravityY(800);
    this.player.setCollideWorldBounds(true);
    this.player.setBodySize(10, 30, false);
    this.player.setOffset(10, 15);

    // Asteroids.
    const frameNames = this.anims.generateFrameNames('asteroid', {
        start: 0,
        end: 119,
        zeroPad: 3,
        prefix: 'Asteroid-A-09-',
        suffix: '.png'
    });

    this.anims.create({
        key: 'spin',
        frames: frameNames,
        frameRate: 20,
        repeat: -1
    });

    this.asteroids = this.physics.add.group({
        key: 'asteroid',
        repeat: 5,
    });

    // Overlaps.
    this.physics.add.overlap(
        this.player,
        [reactor_off, engineTerminal, cryotube, cryoFluid2, helmterminal],
        (_player, object) => {
            if (this.cursors && this.cursors.space.isDown) {
                object.preFX.list[0].active = false;
                reactor_off.setVisible(false);
                reactor_on.setVisible(true);
            }
        }
    );

    this.physics.add.overlap(
        this.ship,
        this.asteroids,
        (_ship, asteroid) => {
            // Only shake the camera for foreground asteroids.
            if (asteroid.depth > -1) {
                this.cameras.main.shake(50, 0.01);
            }
        }
    );

    // Keyboard control.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Player animations.
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

    // Create a random event.
    this.eventsTimer = this.time.addEvent({
        delay: Phaser.Math.Between(1000, 100000),
        loop: true,
        callback: createEvent,
        callbackScope: this,
        args: [this]
    });
}

function createEvent(scene) {
    const eventType = Math.floor(Math.random() * 6) + 1;

    if (eventType === 1) {
        console.log('Uh oh, it looks like the reactor shut off!');
        if (!scene.reactorGlow.active) {
            scene.reactorOff.setVisible(true);
            scene.reactorOn.setVisible(false);
            scene.cameras.main.shake(700);

            scene.reactorGlow.active = true;

            scene.tweens.add({
                targets: scene.reactorGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType === 2) {
        console.log('Oh no, the reactor terminal is freaking out!');
        if (!scene.engineTerminalGlow.active) {
            scene.engineTerminalGlow.active = true;

            scene.tweens.add({
                targets: scene.engineTerminalGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType === 3) {
        console.log('The person in the cryotube is flatlining!');
        if (!scene.cryotubeGlow.active) {
            scene.cryotubeGlow.active = true;

            scene.tweens.add({
                targets: scene.cryotubeGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType === 4) {
        console.log('The cryo fluids are getting low');
        if (!scene.fluidGlow.active) {
            scene.fluidGlow.active = true;

            scene.tweens.add({
                targets: scene.fluidGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType === 5) {
        console.log("We're off course, please adjust course at the helm terminal!");
        if (!scene.helmTerminalGlow.active) {
            scene.helmTerminalGlow.active = true;

            scene.tweens.add({
                targets: scene.helmTerminalGlow,
                outerStrength: 10,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        }
    }
    else if (eventType === 6) {
        console.log("We're heading into an asteroid field!");

        // Asteroids.
        for (let i = 0; i < 3; i += 1) {
            const newAsteroid = scene.physics.add.sprite(
                Phaser.Math.Between(1300, 1500),
                Phaser.Math.Between(25, 400),
                'asteroid'
            );

            let depth = Math.round(Math.random());
            if (depth === 0) {
                depth = -1;
            }

            newAsteroid.depth = depth;
            scene.asteroids.add(newAsteroid);
            newAsteroid.play('spin');
        }
    }
}

export default gameCreate;
