import { execute } from '../IntCode_v1.js';
import { getCombinations } from '../../../utilities/array.js';

export function part1({ data }) {
  const program = data.split(',').map(Number);

  function toASCIICommand(text) {
    return [...text.split('').map((c) => c.charCodeAt(0)), 10];
  }

  const COMMAND = {
    NORTH: toASCIICommand('north'),
    SOUTH: toASCIICommand('south'),
    EAST: toASCIICommand('east'),
    WEST: toASCIICommand('west'),
    TAKE: (item) => toASCIICommand(`take ${item}`),
    DROP: (item) => toASCIICommand(`drop ${item}`),
  };

  // Solution specific to my input
  const COLLECTION_COMMANDS = [
    COMMAND.EAST,
    COMMAND.TAKE('loom'),
    COMMAND.EAST,
    COMMAND.TAKE('fixed point'),
    COMMAND.NORTH,
    COMMAND.TAKE('spool of cat6'),
    COMMAND.WEST,
    COMMAND.TAKE('shell'),
    COMMAND.EAST,
    COMMAND.SOUTH,
    COMMAND.WEST,
    COMMAND.SOUTH,
    COMMAND.TAKE('ornament'),
    COMMAND.WEST,
    COMMAND.NORTH,
    COMMAND.TAKE('candy cane'),
    COMMAND.SOUTH,
    COMMAND.EAST,
    COMMAND.NORTH,
    COMMAND.WEST,
    COMMAND.NORTH,
    COMMAND.TAKE('wreath'),
    COMMAND.NORTH,
    COMMAND.EAST,
  ];

  const DROP_ALL_COMMANDS = [
    COMMAND.DROP('loom'),
    COMMAND.DROP('fixed point'),
    COMMAND.DROP('spool of cat6'),
    COMMAND.DROP('wreath'),
    COMMAND.DROP('shell'),
    COMMAND.DROP('ornament'),
    COMMAND.DROP('candy cane'),
  ];

  function dropAllItems(state) {
    const drops = [...DROP_ALL_COMMANDS];

    while (!state.halted) {
      const result = execute(state, input);

      if (result === 63) {
        if (drops.length) {
          input = drops.shift();
        } else {
          break;
        }
      }
    }
  }

  function takeItems(state, items) {
    while (!state.halted) {
      const result = execute(state, input);

      if (result === 63) {
        if (items.length) {
          input = COMMAND.TAKE(items.shift());
        } else {
          break;
        }
      }
    }
  }

  const state = { pointer: 0, program: [...program], relativeBase: 0 };

  let input = [];

  // COLLECTION PHASE
  while (!state.halted) {
    const result = execute(state, input);

    if (result === 63) {
      if (COLLECTION_COMMANDS.length) {
        input = COLLECTION_COMMANDS.shift();
      } else {
        dropAllItems(state);
        break;
      }
    }
  }

  // TEST COMBOS
  const ITEMS = [
    'ornament',
    'loom',
    'spool of cat6',
    'wreath',
    'fixed point',
    'shell',
    'candy cane',
  ];
  const combos = getCombinations(ITEMS);

  let combinationIndex = 0;
  let password = null;
  let output = [];

  while (combinationIndex < combos.length) {
    const combo = combos[combinationIndex];
    takeItems(state, combo);
    output = [];

    while (!state.halted) {
      const result = execute(state, COMMAND.SOUTH);
      output.push(result);

      if (result === 63) {
        combinationIndex++;
        break;
      } else if (result === 10) {
        const message = output.map((char) => String.fromCharCode(char)).join('');

        if (message.includes('typing')) {
          password = message.match(/\d+/g).pop();
        }
      }
    }

    if (!password) {
      dropAllItems(state);
    } else {
      break;
    }
  }

  return password;
}
