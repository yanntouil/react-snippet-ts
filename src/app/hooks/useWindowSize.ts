import { useState } from 'react'
import { useEventListener } from './'
import { useIsomorphicLayoutEffect } from './'

interface WindowSize {
  width: number
  height: number
}

/**
 * Easily retrieve window dimensions with this Hook React which also works onRezise
 * @returns {{
 *    width: number,
 *    height: number
 * }}
 */
function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    })

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
      handleSize()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}

export default useWindowSize