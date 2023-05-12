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
        this.accel = 150;
        this.drag = 400;
        this.scale = game.config.width / 720;
        this.newAccel = true;
        this.currentPlayerSpeed = playerSpeed;
        this.targetX = game.config.width / 2 + Math.floor((0.5 - Math.random()) * roadWidth)
        this.scene = scene;
    }
    update() {
        if(this.scene.gameOver){
            console.log('over');
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }else{
            if(this.breakDown){
                this.body.velocity.y = playerSpeed;
                this.body.velocity.x = Math.floor(this.body.velocity.x / 2);
                this.body.velocity.x = Math.floor(this.body.velocity.x);
            }else{
                if(this.newAccel){
                    this.newAccel = false;
                    this.clock = this.scene.time.delayedCall(1000, () => {
                        this.newAccel = true;
                        this.body.setAccelerationY(Math.floor((0.5 - Math.random()) * 50));
                    });
                }
                this.body.velocity.y = playerSpeed - 100;

                //this.body.velocity.x = Math.floor(this.body.velocity.x);
                this.angle = this.body.velocity.x/7;
                if(this.x > targetX - 30 && this.x < targetX + 30 ){
                    if(this.body.velocity.x < 0 ){
                        this.body.setAccelerationX(this.accel);
                    } else if (this.body.velocity.x > 0) {
                        this.body.setAccelerationX(-this.accel);
                    }
                    //this.body.velocity.x = Math.floor(this.body.velocity.x / 1.2);
                } else if(this.x < targetX ){
                    this.body.setAccelerationX(this.accel)
                } else if (this.x > targetX ){
                    this.body.setAccelerationX(-this.accel);
                }
            }
            if(this.y > game.config.height){
                this.x = game.config.width / 2 + Math.floor((0.5 - Math.random()) * roadWidth);
                this.y = UIBorderY;
                this.body.velocity.y = 0;
                this.breakDown = false;
                this.currentPlayerSpeed = 0;
                raceScore ++;
                if(raceScore % 5 == 0){
                    addAI = true;                
                }
            }
            if(this.y < 0){
                this.x = game.config.width / 2;
                this.y = game.config.height - UIBorderY
                this.body.velocity.y = 0;
                this.breakDown = false;
                this.currentPlayerSpeed = 0;
                raceScore --;
            }
        }
    }
}
