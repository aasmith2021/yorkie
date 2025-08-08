import fs from 'fs'
import path from 'path'

export default function findParent(currentDir, name) {
  const dirs = currentDir.split(path.sep)

  while (dirs.pop()) {
    const dir = dirs.join(path.sep)

    if (fs.existsSync(path.join(dir, name))) {
      return path.resolve(dir)
    }
  }
}
