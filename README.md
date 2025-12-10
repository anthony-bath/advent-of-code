# Advent Of Code

- https://adventofcode.com/2025
- https://adventofcode.com/2024
- https://adventofcode.com/2023
- https://adventofcode.com/2022
- https://adventofcode.com/2021
- https://adventofcode.com/2020
- https://adventofcode.com/2019
- https://adventofcode.com/2018
- https://adventofcode.com/2017
- https://adventofcode.com/2016
- https://adventofcode.com/2015

## Setup

For solutions to run, your inputs must exist in a `/problems/inputs/yyyy/dd.txt` file.

## Swift

Daily solutions can be ran via:

```bash
npm run day:swift yyyy dd
```

where

- `yyyy` is the 4 digit year
- `dd` is the 1 or 2 digit day

e.g.:

```bash
npm run day:swift 2023 3
npm run day:swift 2024 24
```

### Benchmarking

To benchmark a Swift solution, run:

```bash
npm run day:swift:benchmark yyyy dd
```

where

- `yyyy` is the 4 digit year
- `dd` is the 1 or 2 digit day

e.g.:

```bash
npm run day:swift:benchmark 2023 3
```

## JavaScript

Daily solutions can be ran via:

```bash
npm run day yyyy dd [-t]
```

where

- `yyyy` is the 4 digit year
- `dd` is the 1 or 2 digit day
- `-t` optionally for running with test input

e.g.:

```bash
npm run day 2022 1
npm run day 2020 18
```

Days can be created with:

```bash
npm run create yyyy dd
```

where

- `yyyy` is the 4 digit year
- `dd` is the 1 or 2 digit day

e.g.:

```bash
npm run create 2023 3
npm run create 2024 24
```
