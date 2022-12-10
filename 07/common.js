import { read } from '../utility.js';

export function loadDirectories() {
  const allDirectories = [];
  let currentDirectory;

  read(7).forEach((line) => {
    const [p1, p2, p3] = line.split(' ');

    switch (p1) {
      case '$':
        switch (p2) {
          case 'cd':
            if (p3 === '..') {
              currentDirectory = currentDirectory.parent;
            } else {
              const dir = new Directory(p3, currentDirectory);
              allDirectories.push(dir);

              if (currentDirectory) {
                currentDirectory.addDirectory(dir);
              }

              currentDirectory = dir;
            }

            break;
        }
        break;
      case 'dir':
        break;
      default:
        //file
        currentDirectory.addFile(p2, parseInt(p1, 10));
        break;
    }
  });

  return allDirectories;
}

class Directory {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.files = [];
    this.directories = [];
  }

  addFile(name, size) {
    this.files.push(new File(name, size, this));
  }

  addDirectory(directory) {
    this.directories.push(directory);
  }

  calculateSize() {
    return [
      ...this.directories.map((directory) => directory.calculateSize()),
      ...this.files.map((file) => file.size),
    ].reduce((size, item) => item + size, 0);
  }
}

class File {
  constructor(name, size, directory) {
    this.name = name;
    this.size = size;
    this.directory = directory;
  }
}
