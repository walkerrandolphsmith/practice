import test from 'ava';
import { DiscountStrategy } from './index';

test('The choosen strategy will be used to determine the discounted price.', (t) => {
  const originalPrice = 100;
  let strategy = DiscountStrategy.choose({ isEmployee: true });
  t.is(strategy.execute(originalPrice), 50);

  strategy = DiscountStrategy.choose({ isBetweenMarchAndMay: true });
  t.is(strategy.execute(originalPrice), 90);

  strategy = DiscountStrategy.choose({});
  t.is(strategy.execute(originalPrice), originalPrice);
})