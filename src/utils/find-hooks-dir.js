import fs from 'fs'
import path from 'path'

export default function findHooksDir(dir) {
  if (dir) {
    let gitDir = path.join(dir, '.git')
    if (!fs.existsSync(gitDir)) {
      return
    }

    const stats = fs.lstatSync(gitDir)

    if (stats.isFile()) {
      // Expect following format
      // git: pathToGit
      // On Windows pathToGit can contain ':' (example "gitdir: C:/Some/Path")
      const gitFileData = fs.readFileSync(gitDir, 'utf-8')
      gitDir = gitFileData
        .split(':')
        .slice(1)
        .join(':')
        .trim()
    }

    return path.resolve(dir, gitDir, 'hooks')
  }
}
