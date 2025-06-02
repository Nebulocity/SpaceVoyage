class TitleScene extends Phaser.Scene {

	constructor() {
		super({ key: 'titleScene' });
	}

	preload = function () {
        this.load.image('background', 'assets/title/welcome.png');
    };

    create = function () {
        //var bg = this.add.sprite(0, 0, 'background');
        //bg.setOrigin(0, 0);

        var text = this.add.text(275, 225, 'Space Voyage (click to start)');
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickButton());
    };

    clickButton() {
        this.scene.switch('gameScene');
    }
}

export default TitleScene;