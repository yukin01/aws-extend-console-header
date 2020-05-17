export type HeaderColorPattern = {
  key: string
  color: string
  expr: string
}

export type HeaderConfig = {
  patterns: HeaderColorPattern[]
}

const key = 'config'

export const defaultConfig: HeaderConfig = {
  patterns: [...Array(5)].map((_, i) => ({
    key: `${i}`,
    color: '',
    expr: `${i}`
  }))
}

export const client = {
  get: async (): Promise<HeaderConfig> =>
    new Promise(resolve =>
      chrome.storage.sync.get([key], items =>
        resolve(items[key] || defaultConfig)
      )
    ),
  set: async (config: HeaderConfig): Promise<void> =>
    new Promise(resolve =>
      chrome.storage.sync.set({ [key]: config }, () => resolve())
    )
}
