import z from '@deepseek-ai/schemastery'
import { createReadStream } from 'node:fs'
import { realpath, stat } from 'node:fs/promises'
import { extname, isAbsolute, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'
import { exec } from 'node:child_process'

export const name = 'deepseek-harness-kr'
export const inject = ['webServer']

export const Config = z.object({
  character: z.boolean().default(true).volatile(),
  theme: z.boolean().default(true).volatile(),
  translation: z.boolean().default(true).volatile(),
  avatarName: z.string().default('ZENA').volatile(),
  speechStyle: z.union([z.const('cute'), z.const('tsundere'), z.const('queen')]).default('cute').volatile(),
  // 소품·옷·체형 (데스크톱 펫의 "소품·옷" 메뉴와 같은 항목)
  glasses: z.boolean().default(false).volatile(),
  monocle: z.boolean().default(false).volatile(),
  skirt: z.boolean().default(false).volatile(),
  chestClothes: z.boolean().default(false).volatile(),
  shoesOff: z.boolean().default(false).volatile(),
  tailHide: z.boolean().default(false).volatile(),
  bodyType: z.union([z.const('default'), z.const('type1'), z.const('full')]).default('default').volatile(),
})
export const ASSET_PATH = '/deepseek-harness-kr/assets'
const assets = fileURLToPath(new URL('../assets/', import.meta.url))
const types = { '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.moc3': 'application/octet-stream', '.vrm': 'application/octet-stream', '.vrma': 'application/octet-stream', '.glb': 'application/octet-stream' }

export function createAssetHandler(root = assets) {
  return async (req, res) => {
    try {
      const path = decodeURIComponent((req.url || '').split('?')[0])

      // 클라이언트에서 '여기' 또는 폴더 열기 클릭 시 실제 파일 탐색기로 assets/model/ 폴더 열기
      if (path === ASSET_PATH + '/api/open-model-folder') {
        const base = await realpath(root)
        const modelDir = resolve(base, 'model')
        if (process.platform === 'win32') {
          const winPath = modelDir.replace(/\//g, '\\')
          exec(`explorer.exe "${winPath}"`, (err) => {
            if (err) console.error('[deepseek-harness-kr] explorer launch error:', err)
          })
        } else if (process.platform === 'darwin') {
          exec(`open "${modelDir}"`)
        } else {
          exec(`xdg-open "${modelDir}"`)
        }
        res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-cache' })
        res.end(JSON.stringify({ ok: true, path: modelDir }))
        return
      }

      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { Allow: 'GET, HEAD, POST' }); res.end(); return
      }
      // Decode before resolving; both lexical traversal and symlink escapes fail closed.
      if (!path.startsWith(ASSET_PATH + '/')) { res.writeHead(404); res.end(); return }
      const suffix = path.slice(ASSET_PATH.length + 1)
      if (!suffix || suffix.includes('\\') || suffix.includes('\0')) { res.writeHead(404); res.end(); return }
      const base = await realpath(root)
      const target = await realpath(resolve(base, suffix))
      const rel = relative(base, target)
      if (!rel || rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) { res.writeHead(404); res.end(); return }
      const type = types[extname(target)]
      const info = await stat(target)
      if (!type || !info.isFile()) { res.writeHead(404); res.end(); return }
      res.writeHead(200, { 'content-type': type, 'content-length': info.size, 'cache-control': 'no-cache', 'x-content-type-options': 'nosniff' })
      if (req.method === 'HEAD') res.end()
      else await pipeline(createReadStream(target), res)
    } catch (error) {
      if (!res.headersSent) { res.writeHead(error instanceof URIError ? 400 : 404); res.end() }
      else if (!res.destroyed) res.destroy(error)
    }
  }
}

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({ kind: 'prefix', path: ASSET_PATH, handler: createAssetHandler() }), 'deepseek-harness-kr: assets')
}
