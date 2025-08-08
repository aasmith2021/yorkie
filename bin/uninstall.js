#!/user/bin/env node

// Run when package is uninstalled
import path from 'path'
import uninstallFrom from '../src/uninstall.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('yorkie: uninstalling Git hooks')

const depDir = path.join(__dirname, '..')
uninstallFrom(depDir)
