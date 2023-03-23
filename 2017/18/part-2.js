import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 18, 2];

const instructions = read(YEAR, DAY, PART).map((line) => line.split(' '));

const STATE = {
  WAITING: 1,
  RUNNING: 2,
  READY: 3,
};

class Program {
  constructor(id) {
    this.id = id;
    this.pointer = 0;
    this.registers = new Map([['p', id]]);
    this.received = [];
    this.sent = 0;
    this.state = STATE.READY;
  }

  setPartner(program) {
    this.partner = program;
  }

  receive(data) {
    this.received.push(data);
    this.state = STATE.READY;
  }

  getValue(arg) {
    if (/[a-z]/.test(arg)) {
      if (!this.registers.has(arg)) {
        this.registers.set(arg, 0);
      }

      return this.registers.get(arg);
    }

    return Number(arg);
  }

  run() {
    this.state = STATE.RUNNING;

    while (true) {
      const [command, arg1, arg2] = instructions[this.pointer];

      switch (command) {
        case 'set':
          {
            this.registers.set(arg1, this.getValue(arg2));
            this.pointer++;
          }
          break;

        case 'add':
          {
            this.registers.set(arg1, (this.registers.get(arg1) ?? 0) + this.getValue(arg2));
            this.pointer++;
          }
          break;

        case 'mul':
          {
            this.registers.set(arg1, (this.registers.get(arg1) ?? 0) * this.getValue(arg2));
            this.pointer++;
          }
          break;

        case 'mod':
          {
            this.registers.set(arg1, (this.registers.get(arg1) ?? 0) % this.getValue(arg2));
            this.pointer++;
          }
          break;

        case 'rcv':
          {
            if (this.received.length === 0) {
              this.state = STATE.WAITING;
            } else {
              this.registers.set(arg1, this.received.shift());
              this.pointer++;
            }
          }
          break;

        case 'jgz':
          {
            if (this.getValue(arg1) > 0) {
              this.pointer += this.getValue(arg2);
            } else {
              this.pointer++;
            }
          }
          break;

        case 'snd': {
          this.partner.receive(this.getValue(arg1));
          this.sent++;
          this.pointer++;
        }
      }

      if (this.state === STATE.WAITING || this.pointer >= instructions.length) {
        break;
      }
    }
  }
}

const p0 = new Program(0);
const p1 = new Program(1);

p0.setPartner(p1);
p1.setPartner(p0);

while (p0.state !== STATE.WAITING || p1.state !== STATE.WAITING) {
  p0.run();
  p1.run();
}

write(YEAR, DAY, PART, p1.sent);
