class pBiker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.body.setCollideWorldBounds(true);
        this.body.setSize(this.width / 4 , this.height);   
        this.body.onOverlap = true;
        this.breakDown = false;
        this.accel = 200;
        this.drag = 400;
        this.health = 3;
        this.scale = game.config.width / 720;
        this.health = 3;
        this.currentPlayerSpeed = playerSpeed;
    }
    create() {}
    
    update() {
        if(this.breakDown){
            this.angle = 0;
            this.body.setAccelerationX(0);
                if(playerSpeed > 0){
                    playerSpeed -= Math.floor(playerSpeed / 40);
                if(this.x <= UIBorderX + grassWidth + this.body.width){
                    this.body.velocity.x += 10;
                }else {
                    if(this.x >= game.config.width - ( UIBorderX + grassWidth + this.body.width)){
                    this.body.velocity.x -= 10;
                    }
                }
                this.body.velocity.x = Math.floor(this.body.velocity.x / 2);   
            }
        }else{
            this.angle = this.body.velocity.x/7;
            if(keyA.isDown && this.x >= this.width){
                this.body.setAccelerationX(-this.accel)
            } else if (keyD.isDown && this.x <= game.config.width - this.width) {
                this.body.setAccelerationX(this.accel);
            }else {
                this.body.setAccelerationX(0);
                // if(this.body.velocity.x < 0){
                //     this.body.setAccelerationX(this.accel);
                // }
                // if(this.body.velocity.x > 0){
                //     this.body.setAccelerationX(-this.accel);
                // }
            }

            if(keyW.isDown && this.x >= this.width){
                playerSpeed = 125;
            }else if (keyS.isDown && this.x <= game.config.width - this.width) {
                playerSpeed = 90;
            }else {
                playerSpeed = 100;
            }
        }
    }
}
