import * as PIXI from "pixi.js";

export class Position {
  constructor(public x: number = 0, public y: number = 0) {}
}

export class Orbit {
  constructor(
    public centerX: number, // Center of the orbit (typically sun's position)
    public centerY: number,
    public radius: number, // Distance from the sun
    public angularSpeed: number, // Current position in orbit
    public angle: number = 0 // How fast it moves in orbit
  ) {}
}

export class Visual {
  public graphic: PIXI.Graphics;

  constructor(graphic: PIXI.Graphics) {
    this.graphic = graphic;
  }
}

export class Size {
  constructor(public radius: number) {}
}

// TODO: implement the following components
// Size: for planets/sun to define their radius
// Rotation: for planets/sun to rotate around their own axis
// Rotation System: If planets have their own spin, this system could update the angle of rotation.
