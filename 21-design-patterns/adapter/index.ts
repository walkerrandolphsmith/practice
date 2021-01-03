/**
 * Service that has been changed to adhere to the client's needs
 */
export class ServiceChangedToComply {
  transform() {
    return 'I have an compatiable interface';
  }
}

/**
 * Service that can't be used by the client beacuse it has an incompatiable interface
 * In this scenario we can't change the service directly to adhere to the client's needs
 * beacuse it is either 3rd party code, too brittle, or just simply out of scope
 */
export class ThirdPartyOrLegacyUnchangableService {
  specificTransform() {
    return "I have an incompatiable interface";
  }
}

/**
 * Describes the interface the client depends on
 */
interface ITransform {
  transform() : string,
}

/**
 * Enables the incompatible interface of the legacy service to be consumed by the client via composition.
 * The Adapter adheres to the client's interface and wraps the legacy service
 * while translating calls from the client to the legacy service's native language
 */
export class Adapter implements ITransform {
  adaptee : ThirdPartyOrLegacyUnchangableService;
  constructor(adaptee) {
    this.adaptee = adaptee;
  }

  transform() { return this.adaptee.specificTransform(); }
}

/**
 * contains the existing business logic
 */
export class Client {
  transformer : ITransform;
  constructor(transformer) {
    this.transformer = transformer;
    this.print = this.print.bind(this);
  }

  print () : string {
    return this.transformer.transform();
  }
}