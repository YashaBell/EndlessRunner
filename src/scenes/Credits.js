class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    preload(){
        //load audio
       
    }
    create(){
        this.add.text(game.config.width/2, game.config.height/6, 'Game Credits', defaultTextConfig).setOrigin(0.5);
        defaultTextConfig.fontSize = '24px'
        this.add.text(game.config.width / 2 , 72 + (game.config.height / 6), 'Game created by: Yasha Bell', defaultTextConfig).setOrigin(0.5)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update() {
        if(keyS.isDown){
            this.scene.start('menuScene');
        }
    }
}
