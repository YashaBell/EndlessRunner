let config = {
    type: Phaser.CANVAS,
    width: 360,
    height: 640,
    fps:{target: 30,},
    scene: [ Load, Menu , Play, GameUI, Credits, GameOver ],
    physics: {default: 'arcade',arcade: {debug: false}},
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
let randomTargetX = true;
let highScore = 100;
let newHighScore = false;
let raceScore = 0;
let addAI = false;
const sceneEvents = new Phaser.Events.EventEmitter();
let defaultTextConfig = {
    fontFamily: 'Impact',
    fontStyle: 'normal',
    fontSize: '36px',
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
/*
    Use multiple Scene classes (dictated by your game's style) (5)
    Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
    Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
    Have some form of player input/control appropriate to your game design (5)
    Include one or more animated characters that use a texture atlas (5)
    Simulate scrolling with a tileSprite (or equivalent means) (5)
    Implement proper collision detection (via Arcade Physics or a custom routine) (5)
Have looping background music (5)
Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
    Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
    Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
    Be theoretically endless (5)
    Be playable for at least 15 seconds for a new player of low to moderate skill (5)
    Run without significant crashes or errors (5)
    Include in-game credits for all roles, assets, music, etc. (5)
*/