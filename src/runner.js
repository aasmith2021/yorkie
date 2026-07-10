import fs from 'fs'
import path from 'path'
import { execa, parseCommandString } from 'execa'

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
  await execa({ stdio: 'inherit', preferLocal: true })`${parseCommandString(command)}`
  console.log(` > ${hook} hook completed successfully`)
} catch (e) {
  const message = e instanceof Error ? e.message : String(e);
  console.error(` > ${hook} hook failed with error: ${message}`)
  process.exit(1)
}
