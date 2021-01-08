interface IDiscount {
  discount: number;
  execute(originalPrice: number) : number;
}

class NoDiscount implements IDiscount {
  discount;
  constructor() {
    this.discount = 0;
  }
  execute(originalPrice: number) : number {
    return originalPrice - (originalPrice * this.discount);
  }
}

class SeasonalDiscount implements IDiscount {
  discount;
  constructor() {
    this.discount = 0.1;
  }
  // In this example we vary the discount by the member discount, but the implementation of 
  // execute could be wildy different as long as the interface is preserved.
  execute(originalPrice: number) : number {
    return originalPrice - (originalPrice * this.discount);
  }
}

class EmployeeDiscount implements IDiscount {
  discount;
  constructor() {
    this.discount = 0.5;
  }
  execute(originalPrice: number) : number {
    return originalPrice - (originalPrice * this.discount);
  }
}

export class DiscountStrategy {
  static choose(context:any) : IDiscount {
    if (context.isEmployee) return new EmployeeDiscount();
    if (context.isBetweenMarchAndMay) return new SeasonalDiscount();
    return new NoDiscount();
  }
}
