import test from "ava";
import {
  Client,
  ThirdPartyOrLegacyUnchangableService,
  ServiceChangedToComply,
  Adapter
} from './index'; 

test("The existing business logic in client can collaborate with a service that has been changed to comply with its requirements", (t) => {
  const service = new ServiceChangedToComply();
  const client = new Client(service);
  t.notThrows(client.print);
});

test("The existing business logic in client can not collaborate with a service that can't be changed to comply with its requirements", (t) => {
  const service = new ThirdPartyOrLegacyUnchangableService();
  const client = new Client(service);
  const error = t.throws(() => {
    client.print();
  }, { instanceOf: TypeError });
  t.is(error.message, 'this.transformer.transform is not a function');
});

test("The existing business logic in client can collaborate with a service that can't be changed to comply with its requirements by using an adapter", (t) => {
  const service = new ThirdPartyOrLegacyUnchangableService();
  const adapter = new Adapter(service);
  const client = new Client(adapter);
  t.notThrows(client.print);
});
