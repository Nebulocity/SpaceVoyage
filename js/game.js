

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

const Phaser = window.Phaser; // Phaser is loaded via <script> in index.html

import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    scene: [TitleScene, GameScene]
};

var game = new Phaser.Game(config);
