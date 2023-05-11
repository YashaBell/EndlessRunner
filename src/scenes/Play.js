class Play extends Phaser.Scene {
    constructor() {
        super("playScene");        
    }
    preload() {
        //this.load.spritesheet('miniNukeF', './assets/miniNuke.png', {frameWidth: 20, frameHeight: 43, startFrame: 0, endFrame: 3});
        this.load.image('road', './assets/roadTile.png');
        this.load.image('playerBike', './assets/playerStraight.png');
        this.load.atlas('spikeTrap', './assets/spikeTrap.png', './assets/spikeTrap.json');
        this.load.image('AIBike', './assets/aiBike.png');
        //this.load.atlas('debris', './assets/vertibirdBits.png', './assets/vertibirdBits.json')
    }
    create(){
        //tile sprite
        this.scene.run('gameUIScene');
        this.add.text('Play Scene');
        this.road = this.add.tileSprite(UIBorderX, UIBorderY,  342, 608, 'road').setOrigin(0,0); 
        this.road.scale = (game.config.height - UIBorderY * 2)/ this.road.displayHeight;
        this .physics.world.setBounds(UIBorderX, UIBorderY, game.config.width - UIBorderX * 2, game.config.height - UIBorderY)
        this.gameOver = false;

        this.anims.create({
            key: 'standAndUnfoldYourself',
            defaultTextureKey: 'spikeTrap',
            frames:  this.anims.generateFrameNames('spikeTrap', {
                prefix: 'spikeTrap_',
                suffix: '.ase',
                start: 0,
                end: 6,
                zeroPad: 0,
        }),
                framerate: 1,
        });
        
        //key binds
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        this.spike = new obj(this, -100, -100, 'spikeTrap');
        this.P1 = new pBiker(this, game.config.width / 2, game.config.height - playerBuffer, 'playerBike');
        this.AIBikers = this.add.group({classType: AI});
        for(let i = 0; a)
            //new AI(this, game.config.width / 2, UIBorderY, 'AIBike')

        })
        this.physics.world.on('overlap',  (gameObject1, gameObject2, body1, body2) =>{
            if(gameObject1.texture.key == 'playerBike' && gameObject2.texture.key == 'spikeTrap'){
                this.PlayerHitSpikes(gameObject1, gameObject2);
            } 
        });
    }
    update(){
        if(this.P1.health == 0){
            this.gameOver = true;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', defaultTextConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', defaultTextConfig).setOrigin(0.5);
        }
        
        //const pointer = this.input.activePointer;
        //pX = pointer.worldX;
        if(!this.gameOver){
            this.road.tilePositionY -= playerSpeed / 50;
            this.spike.update();
            this.P1.update();
            this.physics.world.overlap(this.P1, this.spike);
            this.physics.world.collide(this.P1, this.AIBikers);
            this.physics.world.overlap(this.AIBikers, this.spike);
        }
    }
PlayerHitSpikes(gameObject1, gameObject2){
    gameObject1.health --;
    gameObject2.disableBody(true,false);
    gameObject1.breakDown = true;
    gameObject2.inPlayerReset = true;
    this.cameras.main.shake(10,2);
    sceneEvents.emit('playerUseRepair', gameObject1.health);
    this.blink = this.tweens.chain({
        targets: gameObject1,
        tweens: [
            {
                alpha:0,
                duration: 40
            },
            {
                alpha: 1,
                duration: 40
            },
        ],
        loop: 15,
        onComplete: () => {
            this.P1.breakDown = false;
            gameObject2.inPlayerReset = false;
        }
    });
}            
}
/*
this.AIBikers.createMultiple({
            key: 'AIBike',
            setXY: {
                x: Math.floor(Math.random()*360-(UIBorderX + grassWidth))+UIBorderX + grassWidth,
                y:UIBorderY
            }
           
 */