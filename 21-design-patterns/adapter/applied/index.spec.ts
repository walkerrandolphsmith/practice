import test from "ava";
import {
  UniversalRemote,
  Television,
  TelevisionAdapter,
  Playstation,
  PlaystationAdapter,
} from './index'; 

test('I can control a television or a playstation with the same remote despite the television and playstation having different interfaces.', (t) => {
  const television = new Television();
  const playstation = new Playstation();
  const televisionAdapter = new TelevisionAdapter(television);
  const playstationAdapter = new PlaystationAdapter(playstation);

  const remote = new UniversalRemote();
  remote.pair(televisionAdapter);
  t.is(remote.isOn(), false);
  remote.handlePowerOn();
  t.is(remote.isOn(), true);
  remote.handlePowerOff();
  t.is(remote.isOn(), false);
  remote.handlePowerOn();
  remote.pair(playstationAdapter);
  remote.handleInputChange();
  t.is(remote.isOn(), false);
  remote.handlePowerOn();
  t.is(remote.isOn(), true);
  remote.handlePowerOff();
  t.is(remote.isOn(), false);
});