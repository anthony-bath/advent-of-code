export class CookieTrait {
  constructor(factor) {
    this.factors = [factor];
  }

  addFactor(factor) {
    this.factors.push(factor);
  }

  total(quantities) {
    return this.factors.reduce((total, factor, i) => total + quantities[i] * factor, 0);
  }
}
