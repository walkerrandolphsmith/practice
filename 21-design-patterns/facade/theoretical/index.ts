/**
 * Subsystem One has a single responsibility.
 */
export class SubsystemOne {
  operation(integers : number[]) {
    return integers.map(integer => integer * 2);
  }
}

/**
 * Subsystem Two has a single responsibility distinct from Subsystem One.
 */
export class SubsystemTwo {
  operation(integers : string[]) {
    return integers.map(Number);
  }
}

/**
 * The existing consumer of substystem one and two has to coordinate the chain of command between the two subsystems.
 * Subsystem Two must operate on the input before subsystem One can operate on the input before the client can operate.
 */
export class Client {
  subsystemOne : SubsystemOne;
  subsystemTwo : SubsystemTwo;
  constructor(subsystemOne : SubsystemOne, subsystemTwo: SubsystemTwo) {
    this.subsystemOne = subsystemOne;
    this.subsystemTwo = subsystemTwo;
    this.getSumOfDoubles = this.getSumOfDoubles.bind(this);
  }

  getSumOfDoubles(strings : string[]) : number {
    const integers = this.subsystemTwo.operation(strings);
    const doubles = this.subsystemOne.operation(integers);
    return doubles.reduce((sum : number, integer: number) => sum += integer, 0);
  }

  isGoalMet(strings : string[]) : boolean {
    const integers = this.subsystemTwo.operation(strings);
    const doubles = this.subsystemOne.operation(integers);
    return doubles.length > 1 && doubles.every(integer => integer > 0);
  }
}

/**
 * Facade is responsible to coordinating the collaboration between multiple subsystems while exposing a new interface to the client,
 * One that is void of any details of how the subsystems collaborate.
 */
export class Facade {
  subsystemOne : SubsystemOne;
  subsystemTwo : SubsystemTwo;
  constructor(subsystemOne : SubsystemOne, subsystemTwo: SubsystemTwo) {
    this.subsystemOne = subsystemOne;
    this.subsystemTwo = subsystemTwo;
    this.operation = this.operation.bind(this);
  }

  operation(strings : string[]) : number[] {
    const integers = this.subsystemTwo.operation(strings);
    const doubles = this.subsystemOne.operation(integers);
    return doubles;
  }
}

/**
 * The client can now directly interact with the facade
 * and rely on the subsystems performing their operations correctly before performing its own operation
 */
export class ClientWithFacade {
  facade : Facade;
  constructor(facade : Facade) {
    this.facade = facade;
    this.getSumOfDoubles = this.getSumOfDoubles.bind(this);
  }

  getSumOfDoubles(strings : string[]) : number {
    return this.facade.operation(strings).reduce((sum : number, integer: number) => sum += integer, 0);
  }

  isGoalMet(strings : string[]) : boolean {
    const doubles = this.facade.operation(strings);
    return doubles.length > 1 && doubles.every(integer => integer > 0);
  }
}