// https://usehooks-ts.com/react-hook/use-boolean
import { Dispatch, SetStateAction, useState } from 'react'

interface ReturnType {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

/**
 * A simple abstraction to play with a boolean state
 * @param {boolean} [defaultValue=false]
 * @return {
 *    value: boolean,
 *    setValue: Dispatch<SetStateAction<boolean>>,
 *    setTrue: () => void,
 *    setFalse: () => void,
 *    toggle: () => void,
 * }
 */
function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const toggle = () => setValue(x => !x)

  return { value, setValue, setTrue, setFalse, toggle }
}

export default useBoolean
