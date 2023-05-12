class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){}
    create(){
        this.add.text(game.config.width/2, game.config.height/6, 'The Tour of the Infinite', defaultTextConfig).setOrigin(.5,.5);
        defaultTextConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/6 + 36, `High Score: ${highScore}`, defaultTextConfig).setOrigin(.5,.5);
        defaultTextConfig.color = '#990000';
        this.add.text(game.config.width/2, game.config.height/2, 'use (W)(A)(S)(D) to move your bike\novertake the other bikes\navoid the spikeTraps\n\npress (W) to start', defaultTextConfig).setOrigin(.5,.5);
        defaultTextConfig.color = '#71b09f';
        this.add.text(game.config.width/2, (game.config.height* 5) / 6, 'press (S) to see credits', defaultTextConfig).setOrigin(.5,.5);
        
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update() {
        const pointer = this.input.activePointer;
        if(keyW.isDown){
            this.sound.play('selectSFX');
            this.scene.start('playScene');
        }
        if(keyS.isDown){
            this.sound.play('selectSFX');
            this.scene.start('creditsScene');
        }
    }
}
