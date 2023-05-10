class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        //this.load.spritesheet('miniNukeF', './assets/miniNuke.png', {frameWidth: 20, frameHeight: 43, startFrame: 0, endFrame: 3});
        this.load.image('road', './assets/roadTile.png');
        this.load.atlas('playerBike', './assets/playerBike.png', './assets/playerBike.json');
        this.load.atlas('spikeTrap', './assets/spikeTrap.png', './assets/spikeTrap.json');
        //this.load.atlas('debris', './assets/vertibirdBits.png', './assets/vertibirdBits.json')
    }
    create(){
        //tile sprite
        this.scene.run('gameUIScene');
        this.add.text('Play Scene');
        this.road = this.add.tileSprite(UIBorderX, UIBorderY,  720, 1280, 'road').setOrigin(0,0); 
        this.road.scale = (game.config.height - UIBorderY * 2)/ this.road.displayHeight;
        this.anims.create({
             key: 'left',
            defaultTextureKey: 'playerBike',
            frames: [
                {frame: 'playerLeft'}
            ],
            frameRate: 10
        });
        this.anims.create({
            key: 'right',
           defaultTextureKey: 'playerBike',
           frames: [
               {frame: 'playerRight'}
           ],
           frameRate: 10
        });
        this.anims.create({
            key: 'straight',
            defaultTextureKey: 'playerBike',
            frames: [
                {frame: 'playerStraight'}
            ],
            frameRate: 10
        });
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
        this.physics.world.on('overlap',  (gameObject1, gameObject2, body1, body2) =>
        {
            this.spike.disableBody(true,false);
            gameObject1.breakDown = true;
            this.cameras.main.shake(10,2);

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
                loop: 20,
                onComplete: () => this.P1.breakDown = false
            });
        });
        }
    update(){
        console.log(this.P1.breakDown);
        //const pointer = this.input.activePointer;
        //pX = pointer.worldX;
        this.road.tilePositionY -= playerSpeed;
        this.spike.update();
        this.P1.update();
        this.physics.world.overlap(this.P1, this.spike);

    }
}