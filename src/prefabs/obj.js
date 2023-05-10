class obj extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.onOverlap = true;
        this.waitingForSpikes = false;
        this.playSpike = false;
        this.scene = scene;
        this.scale = .5;
    }
    update() {
        if(!this.waitingForSpikes){
            this.waitingForSpikes = true;
            //this.clock = this.scene.time.delayedCall(Math.floor(Math.random() * 15000), () => {
                this.playSpike = true;
                this.y = UIBorderY;
                this.alpha = 1;
                this.enableBody(true, this.x, this.y, true, true);
                if(Math.floor(Math.random() * 2) == 0){
                    this.setOrigin(0,0);
                    this.x = 100;
                }else {
                    this.flipX = true;
                    this.setOrigin(1,0);
                    this.x = 620;
                }
                this.anims.play('standAndUnfoldYourself');
                    //}, null, this);
        }
        if(this.playSpike){
            this.y += playerSpeed;
            if(this.y > game.config.height){
                this.alpha = 0;
                this.disableBody(true, true);
                this.playSpike = false;
                this.waitingForSpikes = false;
                this.flipX = false;

            }
        }
    }
}
