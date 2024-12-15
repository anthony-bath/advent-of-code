import { ops } from './common.js';

export function part1({ lines }) {
  const registers = new Map();

  lines.forEach((line) => {
    const [change, condition] = line.split(' if ');
    const [updateRegister, updateOperation, updateValue] = change.split(' ');
    const [conditionRegister, conditionOperation, conditionValue] = condition.split(' ');

    if (!registers.has(updateRegister)) {
      registers.set(updateRegister, 0);
    }

    if (!registers.has(conditionRegister)) {
      registers.set(conditionRegister, 0);
    }

    if (ops[conditionOperation](registers.get(conditionRegister), Number(conditionValue))) {
      const newValue = ops[updateOperation](registers.get(updateRegister), Number(updateValue));
      registers.set(updateRegister, newValue);
    }
  });

  return Math.max(...registers.values());
}
