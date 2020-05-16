export type HeaderPattern = {
  color: string
  expr: string
}

export type HeaderConfig = {
  patterns: HeaderPattern[]
}

const key = 'config'

const defaultConfig: HeaderConfig = {
  patterns: []
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
