class AI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.body.setCollideWorldBounds(false);
        this.body.setSize(this.width / 3 , this.height);   
        this.body.onOverlap = true;
        this.breakDown = false;
        this.accel = 300;
        this.drag = 400;
        this.scale = game.config.width / 720;
        this.newAccel = true;
        this.currentPlayerSpeed = playerSpeed;
    }
    update() {
        if(this.breakDown){
            this.angle = 0;
            this.body.setAccelerationX(0);
            if(this.body.velocity.y> 0){
                this.body.velocity.y -=0.1;
                this.body.velocity.x = this.body.velocity.x /1.5;
            }else{
                this.body.velocity.y = 0; 
                this.body.velocity.x = 0;
            }
        }else{
            if(this.newAccel){
                this.newAccel = false;
                this.clock = this.scene.time.delayedCall(1000, () => {
                    this.newAccel = true;
                    this.body.setAccelerationY(Math.floor((0.5 - Math.random()) * 50));
                });
            }
            if(this.currentPlayerSpeed != playerSpeed){
                this.body.velocity.y -= this.currentPlayerSpeed - playerSpeed;
                this.currentPlayerSpeed = playerSpeed;
            }
        }
        if(this.y > game.config.height){
            this.x = Math.floor(Math.random()*360-(UIBorderX + grassWidth)*2)+UIBorderX + grassWidth;
            this.y = UIBorderY;
            this.currentPlayerSpeed = playerSpeed;
        }
        if(this.y < 0){
            this.x = Math.floor(Math.random()*360-(UIBorderX + grassWidth)*2)+UIBorderX + grassWidth;
            this.y = game.config.height - UIBorderY
            this.currentPlayerSpeed = playerSpeed;

        }
    }
}
