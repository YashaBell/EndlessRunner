class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }
    preload(){
        //load audio
       
    }
    create(){
        if(raceScore > highScore){
            highScore = raceScore;
        }
        this.add.rectangle(0,0,game.config.width,game.config.height);
        this.add.text(game.config.width/2, game.config.height/6, 'Game Over', defaultTextConfig).setOrigin(0.5);
        defaultTextConfig.fontSize = '24px'
        this.add.text(game.config.width / 2 , game.config.height / 2, `Overtakes: ${raceScore}\nhigh Score = ${highScore}`, defaultTextConfig).setOrigin(0.5)
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
