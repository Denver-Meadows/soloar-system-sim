import * as PIXI from "pixi.js";

export class Position {
  constructor(public x: number = 0, public y: number = 0) {}
}

export class Orbit {
  constructor(
    public centerX: number,
    public centerY: number,
    public radius: number,
    public angularSpeed: number,
    public angle: number = 0
  ) {}
}

export class Visual {
  constructor(public grapic: PIXI.Graphics) {}
}
