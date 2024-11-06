import * as PIXI from "pixi.js";
import { COMPONENTS } from "./constants";
import { Entity } from "./ecs/Entity";
import { createPlanet, createSun } from "./ecs/Factories";
import { OrbitSystem } from "./ecs/systems/OrbitSystem";
import { RenderSystem } from "./ecs/systems/RenderSystem";

// This essentially functions as a basic game engine within the ECS framework.
// will manage the main loop, initialize entities and systems,
// and update them on each frame.
// which are core responsibilities of a game engine.
export class Game {
  private app: PIXI.Application; // PixiJS application instance, which handles rendering and the main loop (ticker)
  private entities: Entity[] = []; // Array to hold all entities in the game.

  // ECS systems
  private orbitSystem: OrbitSystem;
  private renderSystem: RenderSystem;

  // Initialize the game with the PixiJS app instance, sets up systems and the main loop
  constructor(app: PIXI.Application) {
    this.app = app;

    // initialize systems
    this.orbitSystem = new OrbitSystem();
    this.renderSystem = new RenderSystem();

    // Main Loop:  Attach the update method to the PixiJS application's ticker
    // This will invoke the update method on every frame automatically
    this.app.ticker.add(this.update.bind(this));

    // init the entities
    this.initializeEntities();
  }

  // Add new entities to the game
  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  // The update method, called on every frame via the PixiJS ticker
  // This function acts as the main loop for the game, updating all systems
  private update(ticker: PIXI.Ticker) {
    // deltaTime represents the time passed since the last frame
    // and helps make movement and updates smooth and frame-rate independent
    const deltaTime = ticker.deltaTime;

    // Update systems with the current list of entities and deltaTime.
    this.orbitSystem.update(this.entities, deltaTime);
    this.renderSystem.update(this.entities);
  }

  // Init the entities.  For now its just the sun and earth
  initializeEntities() {
    const sun = createSun();
    this.addEntity(sun);

    const mercury = createPlanet(1265, 600, 90, 0.024, "8D9093", 3);
    this.addEntity(mercury);

    const venus = createPlanet(1265, 600, 130, 0.016, "D9BF77", 5);
    this.addEntity(venus);

    const earth = createPlanet(1265, 600, 160, 0.01, "#1E90FF", 6);
    this.addEntity(earth);

    const mars = createPlanet(1265, 600, 210, 0.008, "#B22222", 4);
    this.addEntity(mars);

    const jupiter = createPlanet(1265, 600, 320, 0.004, "#D19A66", 12);
    this.addEntity(jupiter);

    const saturn = createPlanet(1265, 600, 400, 0.003, "#D2B48C", 10);
    this.addEntity(saturn);

    const uranus = createPlanet(1265, 600, 480, 0.002, "#AFDBF5", 7);
    this.addEntity(uranus);

    const neptune = createPlanet(1265, 600, 560, 0.0015, "#2E3A8C", 7);
    this.addEntity(neptune);

    // Add each visual graphic to the stage
    // If I decide to add or remove entities dynamically at runtime,
    // move this to the Render System.
    this.entities.forEach((entity) => {
      const visual = entity.getComponent(COMPONENTS.VISUAL);
      if (visual && !this.app.stage.children.includes(visual.graphic)) {
        this.app.stage.addChild(visual.graphic);
      }
    });
  }

  destroy() {
    this.app.ticker.stop();
    this.entities = [];
  }
}

// TODO: to further develop Game.ts as an engine, you could add features like:
// Collision Detection System: Handle interactions between entities.
// Input Handling: Manage user input for entity control or scene changes.
// Physics Simulation: Add more realistic physics with gravity, friction, etc.
// Scene Management: Allow switching between different scenes or levels.
