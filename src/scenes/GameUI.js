class GameUI extends Phaser.Scene {
    // code developed from https://youtu.be/HSP7xwacX7c
    constructor()
    {
        super("gameUIScene");
    }
    preload(){
        this.load.image('bikeRepair', './assets/bikeRepair.png',);
    }
    create(){
        let scoreConfig = defaultTextConfig;
        scoreConfig.fontSize = `${UIBorderY}px`
        scoreConfig.padding = {
            top: -1,
            bottom: 0
        }
        this.add.rectangle(0, 0, game.config.width, UIBorderY, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - UIBorderY, game.config.width, UIBorderY, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, 0, UIBorderX, game.config.height, 0x000000).setOrigin(0,0);
        this.add.rectangle(game.config.width - UIBorderX, 0, UIBorderX, game.config.height, 0x000000).setOrigin(0,0);
        this.score = this.add.text(game.config.width  / 2, game.config.height - UIBorderY / 2,'Overtakes: 0', scoreConfig).setOrigin(0.5);
        
        this.repairs = this.add.group({});
        const repairArray = this.repairs.getChildren();
        sceneEvents.on('playerUseRepair', health=> {
            const gear = Phaser.Utils.Array.RemoveAt(repairArray, health);
            if(gear){
                gear.alpha = 0;
                this.health --;
            }            
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('playerUseRepair');
        });
        
        this.repairs.createMultiple({
            key: 'bikeRepair',
            setXY: {
                x: UIBorderY / 2,
                y: UIBorderY / 2, 
                stepX: 32
            },
            setOrigin: (0,0),
            setScale: {
                x: game.config.width/720,
                y: game.config.height/1280
            },
            quantity: 3
        });
    }
    update(){
        this.score.text = `Overtakes: ${raceScore}`;
    }
}
