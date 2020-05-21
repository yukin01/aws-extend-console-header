export type HeaderColorPattern = {
  key: string
  color: string
  account: string
}

export type HeaderConfig = {
  patterns: HeaderColorPattern[]
}

const key = 'config'

export const defaultConfig: HeaderConfig = {
  patterns: [...Array(5)].map((_, i) => ({
    key: `${i}`,
    color: '',
    account: ''
  }))
}

export const client = {
  get: async (): Promise<HeaderConfig> =>
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
  set: async (config: HeaderConfig): Promise<void> =>
    new Promise(resolve => {
      try {
        chrome.storage.sync.set({ [key]: config }, () => resolve())
      } catch (e) {
        console.log(e)
        resolve()
      }
    })
}
