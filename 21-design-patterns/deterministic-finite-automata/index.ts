export class Context {
  state: AbstractState;
  constructor() {
    this.state = new RemainderZeroState(this);
  }
  changeState(nextState: AbstractState) : void {
    this.state = nextState;
  }
  nextInputOne() {
    this.state.nextInputOne();
  }
  nextInputZero() {
    this.state.nextInputZero();
  }
  isDivisibleByThree() : boolean {
    return this.state.isDivisibleByThree();
  }
}

class AbstractState {
  context: Context;
  label: string;
  constructor(context: Context) {
    this.context = context;
  }
  nextInputOne() : void {}
  nextInputZero() : void {}
  isDivisibleByThree() : boolean {
    return false;
  }
}

class RemainderZeroState extends AbstractState {
  label: '0';
  nextInputOne() {
    this.context.changeState(new RemainderOneState(this.context));
  }
  nextInputZero() {
    // do nothing
  }
  isDivisibleByThree() : boolean {
    return true;
  }
}

class RemainderOneState extends AbstractState {
  label: '1';
  nextInputOne() {
    this.context.changeState(new RemainderZeroState(this.context));
  }
  nextInputZero() {
    this.context.changeState(new RemainderTwoState(this.context));
  }
  isDivisibleByThree() : boolean {
    return false;
  }
}

class RemainderTwoState extends AbstractState {
  label: '2';
  nextInputOne() {
    // do nothing
  }
  nextInputZero() {
    this.context.changeState(new RemainderOneState(this.context));
  }
  isDivisibleByThree() : boolean {
    return false;
  }
}