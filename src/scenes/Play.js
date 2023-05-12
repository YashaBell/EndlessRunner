class Play extends Phaser.Scene {
    constructor() {
        super("playScene");        
    }
    preload() {
        //this.load.spritesheet('miniNukeF', './assets/miniNuke.png', {frameWidth: 20, frameHeight: 43, startFrame: 0, endFrame: 3});
        // this.load.image('road', './assets/roadTile.png');
        // this.load.image('playerBike', './assets/playerStraight.png');
        // this.load.atlas('spikeTrap', './assets/spikeTrap.png', './assets/spikeTrap.json');
        // this.load.atlas('warning', './assets/warning.png', './assets/warning.json');
        // this.load.atlas('AIBike', './assets/aiBike-sheet.png', './assets/aiBike.json');
        // this.load.audio('bikePetal', './assets/audio/mixkit-bike-pedalling-on-street-loop-1603.wav');
        // this.load.audio('tirePop', './assets/audio/samuelgremaud__puncture+johnsonbrandediting__tire-puncture-pop-hit.wav');
        // this.load.audio('cowBell', './assets/audio/cowBell.wav');
    }
    create(){
        //audio set up based on paddleParkour
        this.bikeSFX = this.sound.add('bikePetal', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
            });
            this.bikeSFX.play();

        this.tirePop = this.sound.add('tirePop', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });
    
        this.cowBell = this.sound.add('cowBell', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
            });

        //tilesprite
        this.road = this.add.tileSprite(UIBorderX, UIBorderY,  342, 608, 'road').setOrigin(0,0); 
        this.road.scale = (game.config.height - UIBorderY * 2)/ this.road.displayHeight;
        this .physics.world.setBounds(UIBorderX, UIBorderY, game.config.width - UIBorderX * 2, game.config.height - UIBorderY * 2);
        this.gameOver = false;
        
        this.grassL = this.add.zone(UIBorderX, UIBorderY, grassWidth, game.config.height - UIBorderY * 2).setOrigin(0);
        this.grassR = this.add.zone(game.config.width - UIBorderX - grassWidth , UIBorderY, grassWidth, game.config.height - UIBorderY * 2).setOrigin(0);
        
        this.physics.add.existing(this.grassL, false);
        this.grassL.moves = false;
        this.physics.add.existing(this.grassR, false);
        this.grassR.moves = false;
        
        this.grassL.name = "grass";
        this.grassR.name = "grass";
        this.grassL.onOverlap = true;
        this.grassR.onOverlap = true;
        
        console.log(this.grassL);

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
                duration: 250,
        });
        this.anims.create({
            key: 'warningFlash',
            defaultTextureKey: 'warning',
            frames:  this.anims.generateFrameNames('warning', {
                prefix: 'warning',
                suffix: '.png',
                start: 0,
                end: 2,
                zeroPad: 0,
            }),
                loop: 4,
                duration: 1000,
        });
        
        //key binds
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        this.spike = new obj(this, -100, -100, 'spikeTrap');
        this.AIFrames = ['white', 'lightBlue', 'red', 'green', 'pink', 'blue'];
        console.log(this.AIFrames)
        this.AIBikers = this.add.group({
            classType: AI,
            runChildUpdate: true,
            maxsize: -1
        });
        this.totalAI = 5;
        for(let i = 0;  i < 5; i++){
            this.AIBikers.add(new AI(this,
            (i/5) * ( 360 - (UIBorderX + grassWidth) * 2 )  + UIBorderX * 2 + grassWidth ,
            UIBorderY, 
            'AIBike',
            this.AIFrames[Math.floor(Math.random()*6)]
            ));
            
        }
        this.P1 = new pBiker(this, game.config.width / 2, game.config.height - playerBuffer, 'playerBike').setDepth(1);
        
        this.warning = this.add.sprite(game.config.width / 2 - roadWidth / 2, UIBorderY, 'warning').setOrigin(0.5,0);
        this.warning.alpha = 0;
        
        this.physics.world.on('overlap',  (gameObject1, gameObject2, body1, body2) =>{
            if(gameObject1.texture.key == 'playerBike'){
                this.PlayerOverlap(gameObject1);
            }else {
                if(gameObject1.texture.key == 'AIBike'){
                    gameObject1.breakDown = true;
                }
            }
            if(gameObject2.type == gameObject1.type){
                this.tirePop.play();
            }
        });
            
        this.scene.run('gameUIScene', {active: true});
    }
    update(){
        if(addAI){     
            this.AIBikers.add(new AI(this,
                game.config.width / 2,
                UIBorderY, 
                'AIBike',
                this.AIFrames[Math.floor(Math.random()*6)]
            ));
            addAI = false;  
        } 
        if(this.P1.health == 0){
            this.gameOver = true;
            //this.AIBikers.runChildUpdate = false;
            this.tweens.add({
                targets: this.bikeSFX,
                volume: 0,
                ease: 'Linear',
                duration: 2000
            });
            this.time.delayedCall(4000, () => { this.scene.stop('gameUIScene');this.scene.start('gameOverScene'); });
        }
        
        //const pointer = this.input.activePointer;
        //pX = pointer.worldX;
        this.P1.update();
        if(!this.gameOver){
            this.road.tilePositionY -= playerSpeed / 50;
            this.spike.update();
            this.P1.update();
            this.physics.world.overlap(this.P1, this.spike);
            this.physics.world.collide(this.P1, this.AIBikers);
            this.grassLOverlap = this.physics.world.overlap(this.P1, this.grassL);
            this.grassROverlap = this.physics.world.overlap(this.P1, this.grassR);
            this.physics.world.overlap(this.AIBikers, this.spike);
            this.physics.world.collide(this.AIBikers, this.AIbikers);
            this.physics.world.overlap(this.AIBikers, this.grassL);
            this.physics.world.overlap(this.AIBikers, this.grassR);
        }
    }
    PlayerOverlap(gameObject1, gameObject2){

        gameObject1.body.onOverlap = false;
        gameObject1.health --;
        gameObject1.breakDown = true;
        gameObject1.offRoad = true;
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
                gameObject1.breakDown = false;
                gameObject1.body.onOverlap = true;
                gameObject1.body.velocity.x = 0;
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
 */