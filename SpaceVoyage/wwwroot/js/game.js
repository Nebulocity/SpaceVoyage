

//var config = {
//    type: Phaser.AUTO,
//    width: 800,
//    height: 450,
//    physics: {
//        default: 'arcade',
//        arcade: {
//            debug: false
//        }
//    },
//    scene: {
//        preload: preload,
//        create: create,
//        update: update
//    }
//};



import TitleScene from '/js/titleScene.js';
import GameScene from '/js/gameScene.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    scene: [TitleScene, GameScene]
};

var game = new Phaser.Game(config);