import { client } from './header'

const changeBackground = (color: string) => (element: HTMLElement | null) => {
  // element?.style.background = color; // If Swift...
  if (element) {
    element.style.background = color
  }
}

;(async () => {
  console.info('[Info] AWS Extend Console Header has started')

  const loginId = 'awsc-login-display-name-account'
  const roleId = 'awsc-role-display-name-account'
  const account = (
    document.getElementById(roleId) || document.getElementById(loginId)
  )?.textContent
  if (!account) {
    console.error('[Error] Failed to get account')
    return
  }
  console.info(`[Info] Account is ${account}`)

  const { patterns } = await client.get()
  const pattern = patterns.find(p => new RegExp(p.account).test(account))
  if (!pattern) {
    console.info(`[Info] No pattern to match`)
    return
  }

  ;['nav-menubar', 'nav-menu-right', 'console-nav-footer']
    .map(id => document.getElementById(id))
    .concat([...document.querySelectorAll('.nav-menu')] as HTMLElement[])
    .forEach(changeBackground(pattern.color))
})()
