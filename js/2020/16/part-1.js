import { getInputElements } from './common.js';

export function part1({ lines }) {
  const { tickets, fields } = getInputElements(lines);

  return tickets.reduce((error, ticket) => {
    return (
      error +
      ticket.reduce((sum, value) => {
        if (fields.some((field) => field.validate(value))) {
          return sum;
        }

        return sum + value;
      }, 0)
    );
  }, 0);
}
