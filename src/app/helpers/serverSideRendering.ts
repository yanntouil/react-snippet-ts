

  
/**
 * Quickly know where your code will be executed
 */
export const isBrowser = (): boolean => !!(typeof window !== 'undefined' && window.document && window.document.documentElement)
export const isServer = (): boolean => !(typeof window !== 'undefined' && window.document && window.document.documentElement)