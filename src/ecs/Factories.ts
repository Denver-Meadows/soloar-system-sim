import { Entity } from "./Entity";
import * as PIXI from "pixi.js";
import { Orbit, Position, Visual } from "./Components";
import { COMPONENTS } from "../constants";

export function createSun(): Entity {
  const sun = new Entity();
  const sunGraphic = new PIXI.Graphics();
  sunGraphic.circle(0, 0, 40).fill("FFA500");
  console.log("sun", sunGraphic);

  sun.addComponent(COMPONENTS.POSITION, new Position(1265, 600));
  sun.addComponent(COMPONENTS.VISUAL, new Visual(sunGraphic));

  return sun;
}

export function createPlanet(
  centerX: number,
  centerY: number,
  radius: number,
  angularSpeed: number,
  color: string
): Entity {
  const planet = new Entity();
  const planetGraphic = new PIXI.Graphics();
  planetGraphic.circle(25, 25, 5).fill(color);
  console.log("planet", planetGraphic);

  planet.addComponent(COMPONENTS.POSITION, new Position(100, 200));
  planet.addComponent(COMPONENTS.VISUAL, new Visual(planetGraphic));
  planet.addComponent(
    COMPONENTS.ORBIT,
    new Orbit(centerX, centerY, radius, angularSpeed)
  );

  return planet;
}
