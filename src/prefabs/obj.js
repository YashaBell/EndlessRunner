class obj extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.onOverlap = true;
        this.waitingForSpikes = false;
        this.playSpike = false;
        this.scene = scene;
        this.scale = .5 * game.config.width/ 720;
        this.inPlayerReset = false
    }
    update() {
        if(!this.waitingForSpikes && !this.playSpike){
            this.waitingForSpikes = true;
            this.clock = this.scene.time.delayedCall(Math.floor(Math.random() * 10000), () => {
                this.playSpike = true;
                this.y = UIBorderY;
                this.alpha = 1;
                this.enableBody(true, this.x, this.y, true, true);
                if(Math.floor(Math.random() * 2) == 0){
                    this.setOrigin(0,0);
                    this.x = grassWidth;
                    targetX = game.config.width / 2 + roadWidth / 2;
                }else {
                    this.flipX = true;
                    this.setOrigin(1,0);
                    this.x = game.config.width - grassWidth;
                    targetX = game.config.width / 2 - roadWidth / 2;

                }
                this.anims.play('standAndUnfoldYourself');
            }, null, this);

        }
        if(this.playSpike){
            if(this.y > game.config.height && !this.inPlayerReset){
                targetX = game.config.width / 2;
                this.alpha = 0;
                this.disableBody(true, true);
                this.flipX = false;
                this.waitingForSpikes = false;
                this.playSpike = false;
            } else{
                this.y += playerSpeed / 50;
            }
        }
    }
}
