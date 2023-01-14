import { write } from '../../utilities/io.js';
import { loadData } from './common.js';

const [YEAR, DAY, PART] = [2020, 16, 1];

const { tickets, fields } = loadData(PART);

write(
  YEAR,
  DAY,
  PART,
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
