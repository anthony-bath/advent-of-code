import { write } from '../utility.js';
import { tickets, fields, myTicket } from './common.js';

const validTickets = [
  myTicket,
  ...tickets.filter((ticket) =>
    ticket.every((value) => fields.some((field) => field.validate(value)))
  ),
];

// Go over all valid tickets and determine possible fields for each
// Ends up with values with 1,2,3,4...19 possible fields
const possibleFields = Array.from({ length: fields.length }).map(() => []);

for (const ticket of validTickets) {
  for (const [i, value] of ticket.entries()) {
    const base = possibleFields[i].length > 0 ? possibleFields[i] : fields;

    if (base.length === 1) {
      continue;
    } else {
      possibleFields[i] = [...base.filter((field) => field.validate(value))];
    }
  }
}

// Continually update the collection of possible fields removing any that are
// the only possible field for another value. Eventually will end up with only
// one possible field for every value
do {
  const onlyPossibles = possibleFields.filter((pf) => pf.length === 1).map((pf) => pf[0].name);

  for (let i = 0; i < possibleFields.length; i++) {
    if (possibleFields[i].length === 1) {
      continue;
    }

    possibleFields[i] = possibleFields[i].filter((pf) => !onlyPossibles.includes(pf.name));
  }
} while (possibleFields.some((pf) => pf.length > 1));

//
let result = 1;

for (const [i, [field]] of possibleFields.entries()) {
  if (field.name.startsWith('departure')) {
    result *= myTicket[i];
  }
}

write(16, 2, result);
