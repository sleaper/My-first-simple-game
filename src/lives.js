export default class Live {
  constructor(game, position) {
    this.image = document.getElementById("heart");

    this.size = 30;

    this.position = position;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {}
}
