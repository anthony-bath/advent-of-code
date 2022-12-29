import { write } from '../utility.js';
import { tickets, fields } from './common.js';

write(
  16,
  1,
  tickets.reduce((error, ticket) => {
    return (
      error +
      ticket.reduce((sum, value) => {
        if (fields.some((field) => field.validate(value))) {
          return sum;
        }

        return sum + value;
      }, 0)
    );
  }, 0)
);
