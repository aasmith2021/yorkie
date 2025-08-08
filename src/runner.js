import fs from 'fs'
import path from 'path'
import { execa } from 'execa'

const cwd = process.cwd()
const pkg = fs.readFileSync(path.join(cwd, 'package.json'))
const hooks = JSON.parse(pkg).gitHooks
if (!hooks) {
  process.exit(0)
}

const hook = process.argv[2]
const command = hooks[hook]
if (!command) {
  process.exit(0)
}

console.log(` > running ${hook} hook: ${command}`)
try {
  await execa(command, { stdio: 'inherit' })
} catch (e) {
  process.exit(1)
}
