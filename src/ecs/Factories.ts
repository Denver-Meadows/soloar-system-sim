import { Entity } from "./Entity";
import * as PIXI from "pixi.js";
import { Orbit, Position, Visual } from "./Components";
import { COMPONENTS } from "../constants";

export function createSun(): Entity {
  const sun = new Entity();
  const sunGraphic = new PIXI.Graphics();
  sunGraphic.circle(50, 50, 140).fill("FFA500");
  console.log("sun", sunGraphic);

  sun.addComponent(COMPONENTS.POSITION, new Position(500, 300));
  sun.addComponent(COMPONENTS.VISUAL, new Visual(sunGraphic));

  return sun;
}

export function createPlanet(
  centerX: number,
  centerY: number,
  radius: number,
  angularSpeed: number
): Entity {
  const planet = new Entity();
  const planetGraphic = new PIXI.Graphics();
  planetGraphic.circle(25, 25, 25).fill("1E90FF");
  console.log("planet", planetGraphic);

  planet.addComponent(COMPONENTS.POSITION, new Position(100, 200));
  planet.addComponent(COMPONENTS.VISUAL, new Visual(planetGraphic));
  planet.addComponent(
    COMPONENTS.ORBIT,
    new Orbit(centerX, centerY, radius, angularSpeed)
  );

  return planet;
}
