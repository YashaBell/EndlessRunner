let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 1920,
    fps:{target: 30,},
    scene: [ Menu , Play ],
    //physics: {default: 'arcade',arcade: {debug: true}}
};
let game = new Phaser.Game(config);


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