import fs from 'fs';
import path from 'path';

function renameFilesInDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const absolutePath = path.join(directory, file);

    if (fs.statSync(absolutePath).isDirectory()) {
      renameFilesInDirectory(absolutePath);
    } else if (file.match(/\d{4}\.\d{2}\.test\.js$/)) {
      const newFileName = file.replace('.', '-');
      const newAbsolutePath = path.join(directory, newFileName);
      fs.renameSync(absolutePath, newAbsolutePath);
      console.log(`Renamed ${absolutePath} to ${newAbsolutePath}`);
    }
  });
}

renameFilesInDirectory('./');
