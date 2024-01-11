export class Component {
  constructor([left, right]) {
    this.used = false;
    this.left = left;
    this.right = right;
    this.strength = left + right;
  }
}
