import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export default function getYorkiePackageJson() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const pkgJsonFilePath = path.join(__dirname, '../../package.json')

  if (!fs.existsSync(pkgJsonFilePath)) {
    return
  }

  return JSON.parse(fs.readFileSync(pkgJsonFilePath), 'utf-8')
}
