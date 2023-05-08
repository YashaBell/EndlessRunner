class obj extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, objType, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.objType = objType;
        this.waitingForSpikes = false;
        this.playSpike = false;
        this.scene = scene;
    }
    update() {
        if(this.objType = 'spike'){
            if(!this.waitingForSpikes){
                this.waitingForSpikes = true;
                this.clock = this.scene.time.delayedCall(Math.floor(Math.random() * 15000), () => {
                    this.playSpike = true;
                    this.y = 0;
                    this.alpha = 1;
                    //if(Math.floor(Math.random() * 2) == 0){
                        this.setOrigin(0,0);
                        this.x = 100;
                    /*}else {
                        this.setOrigin(.5,0);
                        this.setScale(-1,1);
                        this.setOrigin(1,0);
                        this.x = 620;
                    }  */
                    console.log(this.x, this.y, this.playSpike);
                    this.anims.play('standAndUnfoldYourself');
                }, null, this);
            }
            if(this.playSpike){
                console.log(playerSpeed);
                this.y += playerSpeed;
                if(this.y > game.config.height - playerBuffer){
                    this.alpha = 0;
                    this.x = -100;
                    this.y = -100;
                    this.playSpike = false;
                    this.waitingForSpikes = false;
                }
            }
        }    
    }
}
