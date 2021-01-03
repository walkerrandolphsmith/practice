export class Playstation {
  state : boolean;
  constructor() {
    this.state = false;
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.getState = this.getState.bind(this);
  }
  on() : void { this.state = true; }
  off() : void { this.state = false; }
  getState() : boolean { return this.state; }
}

export class Television {
  isOn: boolean;
  constructor() {
    this.isOn = false;
    this.On = this.On.bind(this);
    this.Off = this.Off.bind(this);
    this.IsPoweredOn = this.IsPoweredOn.bind(this);
  }
  On() : void { this.isOn = true; }
  Off() : void { this.isOn = false; }
  IsPoweredOn() : boolean { return this.isOn; }
}

interface IControlDevice {
  powerOn() : void,
  powerOff(): void,
  isOn(): boolean,
}

export class TelevisionAdapter implements IControlDevice {
  adaptee : Television;
  constructor(adaptee) {
    this.adaptee = adaptee;
  }

  powerOn() { this.adaptee.On(); }
  powerOff() { this.adaptee.Off(); }
  isOn() { return this.adaptee.IsPoweredOn(); }
}


export class PlaystationAdapter implements IControlDevice {
  adaptee : Playstation;
  constructor(adaptee) {
    this.adaptee = adaptee;
  }

  powerOn() { this.adaptee.on(); }
  powerOff() { this.adaptee.off(); }
  isOn() { return this.adaptee.getState(); }
}

export class UniversalRemote {
  inputs : IControlDevice[] = [];
  currentInput = 0;
  pair(controller : IControlDevice) {
    this.inputs.push(controller);
  }
  handleInputChange() : void {
    const numberOfInputs = this.inputs.length;
    const nextInput = (this.currentInput + 1) === numberOfInputs ? 0 : this.currentInput + 1;
    this.currentInput = nextInput;
  }
  getController() : IControlDevice {
    return this.inputs[this.currentInput];
  }
  handlePowerOn () : void {
    this.getController()?.powerOn();
  }
  handlePowerOff () : void {
    this.getController()?.powerOff();
  }
  isOn () : boolean {
    return this.getController()?.isOn();
  }
}