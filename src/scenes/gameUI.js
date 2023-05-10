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
        this.add.rectangle(0, 0, game.config.width, UIBorderY, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - UIBorderY, game.config.width, UIBorderY, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, 0, UIBorderX, game.config.height, 0x000000).setOrigin(0,0);
        this.add.rectangle(game.config.width - UIBorderX, 0, UIBorderX, game.config.height, 0x000000).setOrigin(0,0);
        
        const repairs = this.add.group({
            classType: Phaser.GameObjects.image
        });

        repairs.createMultiple({
            key: 'bikeRepair',
            setXY: {
                x: 32,
                y: 32, 
                stepX:64
            },
            setOrigin: (0,0),
            quantity: 3
        });
    }
}