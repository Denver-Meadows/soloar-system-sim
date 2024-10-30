import Entity from "../Entity";

export class OrbitSystem {
  update(entities: Entity[], delta: number) {
    entities.forEach((entity) => {
      const orbit = entity.getComponent("Orbit");
      const position = entity.getComponent("Position");

      // update angle for orbit
      orbit.angle += orbit.angularSpeed * delta;

      // calculate new position base on orbit
      position.x = orbit.centerX + orbit.radius * Math.cos(orbit.angle);
      position.y = orbit.centerY + orbit.radius * Math.sin(orbit.angle);
    });
  }
}
