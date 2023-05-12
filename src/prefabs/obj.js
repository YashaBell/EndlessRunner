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
            this.scene.time.delayedCall(Math.floor(Math.random() * 10000), () => {
                this.y = UIBorderY;
                this.enableBody(true, this.x, this.y, true, true);
                randomTargetX = false;
                if(Math.floor(Math.random() * 2) == 0){
                    randomTargetX = false;
                    targetX = game.config.width / 2 + roadWidth / 2;
                    this.scene.warning.x = game.config.width / 2 - roadWidth / 2;
                    this.scene.warning.alpha = 1;
                    this.scene.warning.anims.play('warningFlash');
                this.scene.time.delayedCall(500, () =>{
                    this.alpha = 1;
                    this.scene.warning.alpha = 0;
                    this.setOrigin(0,0);
                    this.x = grassWidth;
                    this.anims.play('standAndUnfoldYourself');
                    this.enableBody(true, this.x, this.y, true, true);
                    this.playSpike = true;
                });
                }else {
                    targetX = game.config.width / 2 - roadWidth / 2;
                    this.scene.warning.x = game.config.width / 2 + roadWidth / 2;
                    this.scene.warning.alpha = 1;
                    this.scene.warning.anims.play('warningFlash');
                    this.scene.time.delayedCall(500, () => {
                        this.alpha = 1;
                        this.scene.warning.alpha = 0;
                        this.flipX = true;
                        this.setOrigin(1,0);
                        this.x = game.config.width - grassWidth;
                        this.enableBody(true, this.x, this.y, true, true);
                        this.anims.play('standAndUnfoldYourself');
                        this.playSpike = true;
                    });
                }
            }, null, this);

        }
        if(this.playSpike){
            if(this.y > game.config.height && !this.inPlayerReset){
                randomTargetX = true;
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
