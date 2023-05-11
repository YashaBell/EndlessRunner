class AI extends Phaser.GameObjects.Sprite {
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
        this.scale = game.config.width / 720;
        //this.y += this.height/2;
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
            this.body.velocity.y = -(100 - playerSpeed);
        }
    }
}
