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

    const earth = createPlanet(500, 300, 150, 0.01);
    this.addEntity(earth);

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
