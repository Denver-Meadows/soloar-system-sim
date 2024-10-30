import Entity from "../Entity";

export class RenderSystem {
  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const position = entity.getComponent("Position");
      const visual = entity.getComponent("Visual");

      // update pixi graphics position
      visual.graphic.x = position.x;
      visual.graphic.y = position.y;
    });
  }
}
