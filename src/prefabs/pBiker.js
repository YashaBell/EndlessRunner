class pBiker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }
    update() {
        if(keyA.isDown && this.x >= this.width){
            this.x -= 3;
            this.anims.play('left');
        } else if (keyD.isDown && this.x <= game.config.width - this.width) {
            this.x += 3;
            this.anims.play('right');
        }else {this.anims.play('straight');}
        if(keyW.isDown && this.x >= this.width){
            playerSpeed = 20;
        }else if (keyS.isDown && this.x <= game.config.width - this.width) {
            playerSpeed = 5;
        }else {
            playerSpeed = 10;
        }
    }
}
