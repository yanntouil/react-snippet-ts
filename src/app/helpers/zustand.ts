import { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

/**
 * conditionally return state creator in devtools depending on current dev/prod env
 */

export const maybeDevtools = <S extends {}>(
  creator: StateCreator<S>,
  config: {
    name: string
    anonymousActionType: string
  }
): any =>
  process.env.NODE_ENV === 'development'
    ? devtools(creator as any, config)
    : creator