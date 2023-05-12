class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    // loading bar code adapted from paddle parkour loading bar
    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 
            loadingBar.fillStyle(0xFFFFFF, 1);                  
            loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5);  
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.audio('selectSFX', './assets/audio/104550__diesel_freesound-cervelo-p2-changing-gears.wav');
        this.load.image('road', './assets/roadTile.png');
        this.load.image('playerBike', './assets/playerStraight.png');
        this.load.atlas('spikeTrap', './assets/spikeTrap.png', './assets/spikeTrap.json');
        this.load.atlas('warning', './assets/warning.png', './assets/warning.json');
        this.load.atlas('AIBike', './assets/aiBike-sheet.png', './assets/aiBike.json');
        this.load.audio('bikePetal', './assets/audio/mixkit-bike-pedalling-on-street-loop-1603.wav');
        this.load.audio('tirePop', './assets/audio/samuelgremaud__puncture+johnsonbrandediting__tire-puncture-pop-hit.wav');
        this.load.audio('cowBell', './assets/audio/cowBell.wav');
    }

    create() {
        this.scene.start('menuScene');
    }
}