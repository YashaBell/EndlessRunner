let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 1280,
    fps:{target: 30,},
    scene: [ Menu , Play, GameUI ],
    physics: {default: 'arcade',arcade: {debug: true}}
};

let game = new Phaser.Game(config);
let keyA, keyD, keyW, keyS;
let playerBuffer = game.config.height/10;
let playerSpeed = 3;
let UIBorderX = game.config.width/20;
let UIBorderY = game.config.height/20;


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