import test from 'ava';
import { SubsystemOne, SubsystemTwo, Client, ClientWithFacade, Facade } from './index';

test("The facade will change how the client interfaces with the subsystems but produce the same results", (t) => {
  const subsystemOne = new SubsystemOne();
  const subsystemTwo = new SubsystemTwo();
  const client = new Client(subsystemOne, subsystemTwo);
  const facade = new Facade(subsystemOne, subsystemTwo);
  const clientWithFacade = new ClientWithFacade(facade);

  t.is(client.getSumOfDoubles(["1", "2"]), clientWithFacade.getSumOfDoubles(["1", "2"]))
  t.is(client.isGoalMet(["1", "2"]), clientWithFacade.isGoalMet(["1", "2"]))
})