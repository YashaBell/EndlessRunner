class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    preload(){
        //load audio
       
    }
    create(){
        this.add.text(game.config.width/2, game.config.height/6, 'Game Credits', defaultTextConfig).setOrigin(0.5);
        defaultTextConfig.fontSize = '18px'
        this.add.text(game.config.width / 2 , game.config.height / 2, 'Game created by: Yasha Bell\nArt created by:Yasha Bell\nRoyalty-Free audio downloads:\n\nBike petalling/background:\nmixkit\n\nFlat tire:\nsamuelgremaud and johnsonbrandediting\nfreesound.org\n\nCow bell:\namy2018\nfreesound.org\n\nselect SFX:\ndiesel_freesound\nfreesound.org', defaultTextConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, (game.config.height* 5) / 6, 'press (S) to return to menu', defaultTextConfig).setOrigin(.5,.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update() {
        if(keyS.isDown){
            this.sound.play('selectSFX');
            this.scene.start('menuScene');
        }
    }
}
