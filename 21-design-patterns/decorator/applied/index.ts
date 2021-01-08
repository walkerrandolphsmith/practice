interface IRender {
  render(props : Object): string;
}

interface Constructable<T> {
  new(...args: any) : T;
}


export class Component implements IRender {
  state: Object;
  constructor() {
    this.state = {};
    this.render = this.render.bind(this);
  }
  render(props: Object): string {
    return JSON.stringify({ state: this.state, props });
  }
}

export function connect(mapStateToProps) {
  return function(WrappedComponent : Constructable<Component>) {
    return class ConnectedComponent implements IRender {
      state: Object;
      constructor() {
        this.state = {
          notInteresting: 'this specific component did not find this data interseting enough to be inlcuded in the projection',
          intresting: 'intresting',
        }
        this.render = this.render.bind(this);
      }
      render(props: Object) {
        const projectedState = mapStateToProps(this.state);
        return (new WrappedComponent(props)).render({ ...props, ...projectedState });
      }
    }
  }
}