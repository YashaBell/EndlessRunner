class pBiker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, [ frame ]) {
        super(scene, x, y, texture, [ frame])
        this.scene.add.existing(this);
        this.scene.physics.add.existing
    }
    create() {}
}
