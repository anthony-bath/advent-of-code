import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 4, 2];

let validCount = 0;
let continueToNextPassport = false;
let fields = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  if (!line) {
    if (
      !continueToNextPassport &&
      (fields.length === 8 || (fields.length === 7 && fields.indexOf('cid') === -1))
    ) {
      validCount++;
    }

    fields = [];
    continueToNextPassport = false;
    return;
  }

  if (continueToNextPassport) {
    return;
  }

  const pairs = line.split(' ');

  for (const pair of pairs) {
    if (continueToNextPassport) break;

    const [key, value] = pair.split(':');
    fields.push(key);

    switch (key) {
      case 'byr':
        {
          const val = parseInt(value);
          if (val < 1920 || val > 2002) {
            continueToNextPassport = true;
          }
        }

        break;

      case 'iyr':
        {
          const val = parseInt(value);
          if (val < 2010 || val > 2020) {
            continueToNextPassport = true;
          }
        }

        break;

      case 'eyr':
        {
          const val = parseInt(value);

          if (val < 2020 || val > 2030) {
            continueToNextPassport = true;
          }
        }

        break;

      case 'hgt':
        if (!/^\d{3}cm$/.test(value) && !/^\d{2}in$/.test(value)) {
          continueToNextPassport = true;
        } else {
          if (value.endsWith('cm')) {
            const height = parseInt(value.replace(/[^0-9]/g, ''));
            if (height < 150 || height > 193) {
              continueToNextPassport = true;
            }
          } else if (value.endsWith('in')) {
            const height = parseInt(value.replace(/[^0-9]/g, ''));
            if (height < 59 || height > 76) {
              continueToNextPassport = true;
            }
          }
        }

        break;

      case 'hcl':
        if (!/^#[a-f0-9]{6}$/.test(value)) {
          continueToNextPassport = true;
        }

        break;

      case 'ecl':
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)) {
          continueToNextPassport = true;
        }

        break;

      case 'pid':
        if (!/^\d{9}$/.test(value)) {
          continueToNextPassport = true;
        }

        break;
    }
  }
});

write(YEAR, DAY, PART, validCount);
