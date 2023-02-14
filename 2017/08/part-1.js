import { read, write } from '../../utilities/io.js';
import { ops } from './common.js';

const [YEAR, DAY, PART] = [2017, 8, 1];

const registers = new Map();

read(YEAR, DAY, PART).forEach((line) => {
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

write(YEAR, DAY, PART, Math.max(...registers.values()));