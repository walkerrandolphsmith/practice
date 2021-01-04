interface IPerformOperation {
  operation(): string;
}

export class Component implements IPerformOperation {
  operation(): string {
    return "component"
  }
}

export class Decorator implements IPerformOperation {
  component : Component;
  constructor(component: Component) {
    this.component = component;
  }

  operation(): string {
    return this.component.operation() + " decorated";
  }
}

export class AnotherDecorator implements IPerformOperation {
  component : Component;
  constructor(component: Component) {
    this.component = component;
  }

  operation(): string {
    return this.component.operation() + " even more";
  }
}