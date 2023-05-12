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
        this.accel = 300;
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
                playerSpeed -= playerSpeed / 100;
                this.body.velocity.x = this.body.velocity.x /2;
            }else{
                playerSpeed = 0;
                this.body.velocity.x = 0;
            }
        }else{
            console.log(this.body.velocity.x);
            this.angle = this.body.velocity.x/7;
            if(keyA.isDown && this.x >= this.width){
                this.body.setAccelerationX(-this.accel)
            } else if (keyD.isDown && this.x <= game.config.width - this.width) {
                this.body.setAccelerationX(this.accel);
            }else {
                this.body.setAccelerationX(0);
                if(this.body.velocity.x < 0){
                    this.body.setAccelerationX(this.accel);
                }
                if(this.body.velocity.x > 0){
                    this.body.setAccelerationX(-this.accel);
                }
            }

            if(keyW.isDown && this.x >= this.width){
                playerSpeed = 200;
            }else if (keyS.isDown && this.x <= game.config.width - this.width) {
                playerSpeed = 75;
            }else {
                playerSpeed = 100;
            }
        }
    }
}
