import { Entity } from "../Entity";

// Updates the Visual Component to reflect changes in position,
// making sure the graphics in PixiJS are properly displayed.
export class RenderSystem {
  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const position = entity.getComponent("Position");
      const visual = entity.getComponent("Visual");

      // Check if the components exist.  Eventually we may write
      // queries that query for these components.
      if (position && visual) {
        // update pixi graphics position
        visual.graphic.x = position.x;
        visual.graphic.y = position.y;
      }
    });
  }
}

// TODO: If you need RenderSystem to create or remove graphics on the PixiJS stage,
// then you could modify it to take app as a parameter, like this:
// export class RenderSystem {
//   private app: PIXI.Application;

//   constructor(app: PIXI.Application) {
//     this.app = app; // Store reference to the PixiJS app
//   }

//   update(entities: Entity[]) {
//     entities.forEach((entity) => {
//       const position = entity.getComponent("Position");
//       const visual = entity.getComponent("Visual");

//       if (position && visual) {
//         // Update PixiJS graphic position based on Position component
//         visual.graphic.x = position.x;
//         visual.graphic.y = position.y;

//         // Optionally add the graphic to the stage if not already added
//         if (!this.app.stage.children.includes(visual.graphic)) {
//           this.app.stage.addChild(visual.graphic);
//         }
//       }
//     });
//   }

//   // Method to remove a graphic from the stage
//   removeEntityGraphic(entity: Entity) {
//     const visual = entity.getComponent("Visual");
//     if (visual && visual.graphic) {
//       this.app.stage.removeChild(visual.graphic);
//     }
//   }
// }
