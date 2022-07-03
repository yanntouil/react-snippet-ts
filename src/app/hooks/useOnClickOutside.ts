// https://usehooks-ts.com/react-hook/use-on-click-outside
import { RefObject } from 'react'
import { useEventListener } from './'

type Handler = (event: MouseEvent) => void

/**
 * React hook for listening for clicks outside of a specified element (see useRef).
 * This can be useful for closing a modal, a dropdown menu etc.
 * @param {RefObject<HTMLElement>} ref 
 * @param {(event: MouseEvent) => void} handler 
 * @param {'mousedown' | 'mouseup'} [mouseEvent='mousedown'] 
 */
function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, event => {
    const el = ref?.current

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return
    }

    handler(event)
  })
}

export default useOnClickOutside
