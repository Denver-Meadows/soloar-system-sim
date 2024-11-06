import { COMPONENTS } from "../../constants";
import { Entity } from "../Entity";

// Responsible for moving entities (planets, moons) along their orbital paths.
// This system would access the Position and Orbit Component of entities
// to update their position based on the current angle.
export class OrbitSystem {
  update(entities: Entity[], delta: number) {
    entities.forEach((entity) => {
      const orbit = entity.getComponent(COMPONENTS.ORBIT);
      const position = entity.getComponent(COMPONENTS.POSITION);

      // Check if the components exist.  Eventually we may write
      // queries that query for these components.
      if (position && orbit) {
        // update angle for orbit
        orbit.angle += orbit.angularSpeed * delta;

        // calculate new position base on orbit
        position.x = orbit.centerX + orbit.radius * Math.cos(orbit.angle);
        position.y = orbit.centerY + orbit.radius * Math.sin(orbit.angle);
      }
    });
  }
}
