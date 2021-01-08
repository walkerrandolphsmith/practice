import test from 'ava';
import { Context } from './index';

const isDivisibleByThree = binaryString => {
  const context = new Context();
  binaryString.split('').forEach((digit) => {
    if (digit === '1') context.nextInputOne()
    else context.nextInputZero()
  });
  return context.isDivisibleByThree();
}

test('Given a collection of states and transitions I can ', (t) => {
  const zero = '0'
  const one = '1'
  const two = '10'
  const three = '11'
  const six = '110';
  const seven = '111';
  const threeHunderdThirtyThree = '101001101'
  t.is(isDivisibleByThree(zero), true);
  t.is(isDivisibleByThree(one), false);
  t.is(isDivisibleByThree(two), false);
  t.is(isDivisibleByThree(three), true);
  t.is(isDivisibleByThree(six), true);
  t.is(isDivisibleByThree(seven), false);
  t.is(isDivisibleByThree(threeHunderdThirtyThree), true);
})