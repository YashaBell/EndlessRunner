class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        //this.load.spritesheet('miniNukeF', './assets/miniNuke.png', {frameWidth: 20, frameHeight: 43, startFrame: 0, endFrame: 3});
        //this.load.image('pBiker', './assets/biker.png');
        //this.load.atlas('debris', './assets/vertibirdBits.png', './assets/vertibirdBits.json')
    }
    create(){
        //tile sprite
        // this.city = this.add.tileSprite(0,0,640,480, 'city').setOrigin(0,0);

        // this.anims.create({
        //     key: 'zoom',
        //     frames: this.anims.generateFrameNumbers('vertibird', {start: 0, end: 7, first: 0}),
        //     frameRate: 10
        // });
        
        //key binds
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //this.P1 = new pBiker(this, game.config.width / 2, game.config.height, 'pBiker', 0, 40, 2).setOrigin(0,0);
        
        }
    update(){
        //const pointer = this.input.activePointer;
        //pX = pointer.worldX;
        //this.city.tilePositionX -= 4;
    }
}   
