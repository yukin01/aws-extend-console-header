export type HeaderColorPattern = {
  color: string
  account: string
}

export type HeaderConfig = {
  patterns: HeaderColorPattern[]
}

const key = 'config'

export const defaultConfig: HeaderConfig = {
  patterns: Array.from({ length: 5 }, _ => ({
    color: '',
    account: ''
  }))
}

export type Client = {
  get: () => Promise<HeaderConfig>
  set: (config: HeaderConfig) => Promise<void>
}

export const client: Client = {
  get: () =>
    new Promise(resolve => {
      try {
        chrome.storage.sync.get([key], items =>
          resolve(items[key] || defaultConfig)
        )
      } catch (e) {
        console.log(e)
        resolve(defaultConfig)
      }
    }),
  set: config =>
    new Promise(resolve => {
      try {
        chrome.storage.sync.set({ [key]: config }, resolve)
      } catch (e) {
        console.log(e)
        resolve()
      }
    })
}

export const mockClient: Client = ((): Client => {
  const map = new Map<string, HeaderConfig>()
  return {
    get: () => Promise.resolve(map.get(key) || defaultConfig),
    set: config => Promise.resolve(map.set(key, config)).then(() => {})
  }
})()
