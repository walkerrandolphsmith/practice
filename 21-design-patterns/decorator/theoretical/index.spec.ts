import test from 'ava';
import {
  Component,
  Decorator,
  AnotherDecorator,
} from './index';

test('I can extend the functionality of a component without changing its interface or implementation', (t) => {
  const component = new Component();
  t.is(component.operation(), 'component');
  const decoratedComponent = new Decorator(component);
  t.is(decoratedComponent.operation(), 'component decorated');
  const decoratedDecoratedComponent = new AnotherDecorator(decoratedComponent);
  t.is(decoratedDecoratedComponent.operation(), 'component decorated even more');
});