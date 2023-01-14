import { read } from '../../utilities/io.js';

const [YEAR, DAY] = [2020, 16];

class Range {
  constructor(start, end) {
    this.start = Number(start);
    this.end = Number(end);
  }

  validate(value) {
    return value >= this.start && value <= this.end;
  }
}

class Field {
  constructor(name, r1s, r1e, r2s, r2e) {
    this.name = name;
    this.ranges = [new Range(r1s, r1e), new Range(r2s, r2e)];
  }

  validate(value) {
    return this.ranges.some((range) => range.validate(value));
  }
}

const FIELD_EXPR =
  /(?<name>[a-z\s]+): (?<r1start>\d+)-(?<r1end>\d+) or (?<r2start>\d+)-(?<r2end>\d+)/;

export function loadData(part) {
  let parsingMyTicket = false;
  let parsingNearbyTickets = false;

  const fields = [];
  let myTicket;
  const tickets = [];

  read(YEAR, DAY, part).forEach((line) => {
    if (!line && !parsingMyTicket) {
      parsingMyTicket = true;
      return;
    } else if (!line && !parsingNearbyTickets) {
      parsingNearbyTickets = true;
      return;
    }

    if (!parsingMyTicket && !parsingNearbyTickets) {
      const { name, r1start, r1end, r2start, r2end } = line.match(FIELD_EXPR).groups;
      fields.push(new Field(name, r1start, r1end, r2start, r2end));
    } else if (parsingMyTicket && !parsingNearbyTickets) {
      if (line.startsWith('your ticket')) return;

      myTicket = line.split(',').map((n) => Number(n));
    } else if (parsingNearbyTickets) {
      if (line.startsWith('nearby tickets')) return;

      tickets.push(line.split(',').map((n) => Number(n)));
    }
  });

  return { tickets, fields, myTicket };
}
