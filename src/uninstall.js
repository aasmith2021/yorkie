import fs from 'fs'
import findParent from './utils/find-parent.js'
import findHooksDir from './utils/find-hooks-dir.js'
import is from './utils/is.js'
import hooks from './hooks.js'

function removeHook(dir, name) {
  const filename = `${dir}/${name}`

  if (fs.existsSync(filename) && is.huskyOrYorkie(filename)) {
    fs.unlinkSync(`${dir}/${name}`)
  }
}

export default function uninstallFrom(dir) {
  try {
    const hooksDir = findHooksDir(findParent(dir, '.git'))

    hooks.forEach(function(hookName) {
      removeHook(hooksDir, hookName)
    })
    console.log('done\n')
  } catch (e) {
    console.error(e)
  }
}
