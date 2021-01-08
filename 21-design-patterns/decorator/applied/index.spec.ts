import test from 'ava';
import {
  Component,
  connect,
} from './index';

test('I can extend the functionality of a component without changing its interface or implementation', (t) => {
  const component = new Component();
  const connectedComponent = new (connect(state => ({ intresting: state.intresting }))(Component));

  t.is(component.render({ external: 'external'}), '{"state":{},"props":{"external":"external"}}');
  t.is(connectedComponent.render({ external: 'external' }), '{"state":{},"props":{"external":"external","intresting":"intresting"}}');
});