// https://usehooks-ts.com/react-hook/use-effect-once
import { EffectCallback, useEffect } from 'react'

/**
 * Just modified version of useEffect that's executed only one time, at the mounting time.
 * @param {EffectCallback} effect 
 */
function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}

export default useEffectOnce
