let config = {
    type: Phaser.CANVAS,
    width: 360,
    height: 640,
    fps:{target: 30,},
    scene: [ Menu , Play, GameUI ],
    physics: {default: 'arcade',arcade: {debug: true}},
    health: 3   
};

let game = new Phaser.Game(config);
let keyA, keyD, keyW, keyS;
let playerBuffer = game.config.height/10;
let playerSpeed = 100;
let UIBorderX = game.config.width/20;
let UIBorderY = game.config.height/20;
let grassWidth = 5/36 * (360-(UIBorderX *2));
let roadWidth = game.config.width - (grassWidth * 4 + UIBorderX * 2);
let targetX = game.config.width / 2;
const sceneEvents = new Phaser.Events.EventEmitter();
let defaultTextConfig = {
    fontFamily: 'Impact',
    fontStyle: 'normal',
    fontSize: '40px',
    backgroundColor: '#000000',
    color: '#71b09f',
    align: 'center',
    padding: {
        top: 10,
        bottom: 10
    },
    fixedWidth: 0
}



function MouseInTextBox(pointerX, pointerY, textBox){
    let x1 = textBox.x - textBox.width/2;
    let x2 = textBox.x + textBox.width/2;
    let y1 = textBox.y - textBox.height/2;
    let y2 = textBox.y + textBox.height/2;
    if(pointerX >= x1 && pointerX <= x2 && pointerY >= y1 && pointerY <= y2){
        return(true);
    }else {
        return(false);
    }
}