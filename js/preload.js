function gamePreload() {

    // Asteroids
    this.load.multiatlas('asteroid', 'assets/spritesheets/asteroidL.json', 'assets/spritesheets');

    // Player
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    // Background Items
    this.load.image('horizontalvent', 'assets/backgrounds/horizontalvent.png');
    this.load.image('indicator', 'assets/backgrounds/indicator.png');
    this.load.image('verticalvent', 'assets/backgrounds/verticalvent.png');
    this.load.image('shipbackground', 'assets/backgrounds/wall.png');

    // Cables
    this.load.image('tallcable', 'assets/cables/tallcable.png');
    this.load.image('thickcable', 'assets/cables/thickcable.png');
    this.load.image('widecable', 'assets/cables/widecable.png');

    // Cryo Room
    this.load.image('engineTerminal', 'assets/cryoroom/computer2.png');
    this.load.image('cryotube', 'assets/cryoroom/cryotube.png');

    // Engine Room
    this.load.image('reactor_off', 'assets/engineroom/reactor_off.png');
    this.load.image('reactor_on', 'assets/engineroom/reactor_on.png');
    this.load.image('tallcable', 'assets/cables/tallcable.png');
    this.load.image('thickcable', 'assets/cables/thickcable.png');
    this.load.image('widecable', 'assets/cables/widecable.png');

    // Helm
    this.load.image('helmterminal', 'assets/helm/computer1.png');

    // Space
    this.load.image('space_layer1', 'assets/space/space_layer1.png');
    this.load.image('space_layer2', 'assets/space/space_layer2.png');
    this.load.image('space_layer3', 'assets/space/space_layer3.png');

    // Walls
    this.load.image('shipfloor', 'assets/walls/shipfloor.png');
    this.load.image('shipwall', 'assets/walls/shipwall.png');
    this.load.image('helm', 'assets/walls/helm.png');

    // Misc.
    this.load.image('warning', 'assets/warning.png');
    this.load.image('light_on', 'assets/light_on.png');
    this.load.image('light_off', 'assets/light_off.png');
    this.load.image('fluid', 'assets/fluid.png');


    /* LOADING SCREEN */

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });

    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.src);
    });

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });

}

export default gamePreload;