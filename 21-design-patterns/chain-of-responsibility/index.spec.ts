import test from 'ava';
import { IsAuthenticated, IsValidRequestFormat, ApiResponse } from './index';

test('Return a 200 status code given a valid access token and properly formatted body ', (t) => {
  const request = {
    headers: { Authorization: 'bearer token' },
    body: { prop: 'myProperty', value: "newValue" }
  };
  const response = {
    status: null,
    data: null,
  }
  const rule = new IsAuthenticated();
  rule
    .setNext(new IsValidRequestFormat())
    .setNext(new ApiResponse());

  t.is(rule.eval(request, response).status, 200);
});

test('Return a 401 given an valid access token', (t) => {
  const request = {
    headers: { Authorization: 'INVALID TOKEN' },
    body: { prop: 'myProperty', value: "newValue" }
  };
  const response = {
    status: null,
    data: null,
  }
  const rule = new IsAuthenticated();
  rule
    .setNext(new IsValidRequestFormat())
    .setNext(new ApiResponse());

  t.is(rule.eval(request, response).status, 401);
});

test('Return a 400 given an improperly formatted body ', (t) => {
  const request = {
    headers: { Authorization: 'bearer token' },
    body: { UNKNOWN_KEY: 'myProperty', value: "newValue" }
  };
  const response = {
    status: null,
    data: null,
  }
  const rule = new IsAuthenticated();
  rule
    .setNext(new IsValidRequestFormat())
    .setNext(new ApiResponse());

  t.is(rule.eval(request, response).status, 400);
});
