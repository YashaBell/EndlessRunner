class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        //load audio
       
    }
    create(){
        this.add.text(game.config.width/2, game.config.height/2, 'Infinite Cycle');
    }
    update() {
        const pointer = this.input.activePointer;
        if(pointer.isDown){
            this.scene.start('playScene');
        }
    }
}
