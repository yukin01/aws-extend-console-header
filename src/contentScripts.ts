import { client } from './header'

const changeBackground = (color: string) => (element: HTMLElement | null) => {
  // element?.style.background = color;
  if (element) {
    element.style.background = color
  }
}

;(async () => {
  console.info('[Info] AWS Extend Console Header has started')

  const id = 'awsc-login-display-name-account'
  const account = document.getElementById(id)?.textContent
  if (!account) {
    console.error('[Error] Failed to get account')
    return
  }
  console.info(`[Info] Account is ${account}`)

  const { patterns } = await client.get()
  // const color = patterns.find(p => p.expr === account)?.color ?? '#00008B'
  const pattern = patterns.find(p => p.expr === account)
  if (!pattern) {
    console.info(`[Info] No pattern to match`)
    return
  }

  ;['nav-menubar', 'nav-menu-right', 'console-nav-footer']
    .map(id => document.getElementById(id))
    .concat([...document.querySelectorAll('.nav-menu')] as HTMLElement[])
    .forEach(changeBackground(pattern.color))
})()
