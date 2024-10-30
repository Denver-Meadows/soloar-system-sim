class Entity {
  id: number;
  // A Map that holds the components attached to the entity.
  // The Map key is a string representing the component name,
  // and the value is the actual component data (could be of any type).
  components: Map<string, any> = new Map();

  constructor(id: number) {
    this.id = id;
  }

  // Adds the component to the components Map
  addComponent(name: string, component: any) {
    this.components.set(name, component);
  }

  // Fetches the component from the Map by its name
  getComponent(name: string) {
    return this.components.get(name);
  }
}

export default Entity;
