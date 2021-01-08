interface TRequest{};
interface TReturn{}; 

class RuleHandler<TRequest, TReturn> {
  next : RuleHandler<TRequest, TReturn>;
  setNext(handler: RuleHandler<TRequest, TReturn>) : RuleHandler<TRequest, TReturn> {
    this.next = handler;
    return this.next;
  }
  eval(request : TRequest, response : TReturn) : TReturn {
    return this.next.eval(request, response);
  }
}

export interface HTTPRequest {
  headers: Object,
  body: Object,
}

export interface HTTPResponse {
  status: number;
  data: Object,
}

export class IsAuthenticated extends RuleHandler<HTTPRequest, HTTPResponse> {
  eval(request : HTTPRequest, response : HTTPResponse) : HTTPResponse {
    if (request.headers["Authorization"] !== 'bearer token') {
      response.status = 401;
      return response;
    }
    return super.eval(request, response);
  }
}

export class IsValidRequestFormat extends RuleHandler<HTTPRequest, HTTPResponse> {
  eval(request : HTTPRequest, response: HTTPResponse) {
    if (Array.isArray(request.body)) {
      response.status = 400;
      response.data = { reason: "Payload can not be an array." }
      return response;
    }

    if (!request.body.hasOwnProperty("prop")) {
      response.status = 400;
      response.data = { reason: "Payload must contain a prop key" }
      return response;
    }

    if (!request.body.hasOwnProperty("value")) {
      response.status = 400;
      response.data = { reason: "Payload must contain a value key" }
      return response;
    }

    if (Object.keys(request.body).length > 2) {
     response.status = 400;
     response.data = { reason: "Payload contains unknown keys." }
     return response;
    }

    return super.eval(request, response);
  }
}

export class ApiResponse extends RuleHandler<HTTPRequest, HTTPResponse> {
  eval(request: HTTPRequest, response: HTTPResponse) {
    // update database with request body
    request.body
    response.status = 200;
    response.data = { "update" : { prop: request.body['prop'], value: request.body['value'] }}
    return response;
  }
}