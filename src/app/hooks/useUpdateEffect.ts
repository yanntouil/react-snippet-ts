import { DependencyList, EffectCallback, useEffect } from 'react'
import { useIsFirstRender } from './'

/**
 * Just modified version of useEffect that is skipping the first render.
 * @param {EffectCallback} effect 
 * @param {DependencyList} deps 
 */
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()
  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useUpdateEffect
