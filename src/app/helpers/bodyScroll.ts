import { disableBodyScroll as disableScroll, enableBodyScroll as enableScroll, clearAllBodyScrollLocks as clearLocks } from 'body-scroll-lock'
import { isServer } from '.'

/**
 * disableBodyScroll
 * @returns void
 */
const disableBodyScroll = (): void => {
    if (isServer()) return
    document.body.style.width = document.body.clientWidth + 'px'
    disableScroll(document.body)
}

/**
 * enableBodyScroll
 * @returns void
 */
 const enableBodyScroll = (): void => {
    if (isServer()) return
    document.body.style.width = ''
    enableScroll(document.body)
}

/**
 * clearScrollLocks
 * @returns void
 */
 const clearScrollLocks = (): void => {
    if (isServer()) return
    document.body.style.width = ''
    clearLocks()
}

export { disableBodyScroll, enableBodyScroll, clearScrollLocks }