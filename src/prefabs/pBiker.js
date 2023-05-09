class pBiker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.body.setCollideWorldBounds(true)        
        this.body.onOverlap = true;
        this.breakDown = false;
        this.accel = 300;
        this.drag = 400;
    }
    update() {
        if(this.breakDown){
            this.anims.play('straight');
            this.body.setAccelerationX(0);
            if(playerSpeed > 0){
                playerSpeed -=0.1;
                this.body.velocity.x = this.body.velocity.x /1.5;
            }else{
                playerSpeed = 0;
                this.body.velocityX = 0;
            }
        } else{
            if(keyA.isDown && this.x >= this.width){
                this.body.setAccelerationX(-this.accel)
                this.anims.play('left');
            } else if (keyD.isDown && this.x <= game.config.width - this.width) {
                this.x += 3;
                this.anims.play('right');
                this.body.setAccelerationX(this.accel);
            }else {
                this.body.setAccelerationX(0);
                this.anims.play('straight');
                if(this.body.velocityX < 0){
                    this.body.setVelocityX(-this.accel);
                }
                if(this.body.velocityX > 0){
                    this.body.setVelocityX(this.accel);
                }
            }

            if(keyW.isDown && this.x >= this.width){
                playerSpeed = 10;
            }else if (keyS.isDown && this.x <= game.config.width - this.width) {
                playerSpeed = 5;
            }else {
                playerSpeed = 7;
            }
        }
    }
}
