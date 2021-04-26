import { useCallback, useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

export function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function'
}

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
    } else {
      effect()
    }
  }, deps)
}

export interface IFuncUpdater<T> {
  (previousState?: T): T
}

export type StorageStateResult<T> = [T | undefined, (value?: T | IFuncUpdater<T>) => void]

export function createUseStorageState(nullishStorage: Storage | null) {
  const useStorageState = <T>(key: string, defaultValue?: T | IFuncUpdater<T>): StorageStateResult<T> => {
    const storage = nullishStorage!
    const [state, setState] = useState<T | undefined>(() => getStoredValue())
    useUpdateEffect(() => {
      setState(getStoredValue())
    }, [key])

    function getStoredValue() {
      const raw = storage.getItem(key)
      if (raw) {
        try {
          return JSON.parse(raw)
        } catch (e) {
          //
        }
      }
      if (isFunction<IFuncUpdater<T>>(defaultValue)) {
        return defaultValue()
      }
      return defaultValue
    }

    const updateState = useCallback(
      (value?: T | IFuncUpdater<T>) => {
        if (typeof value === 'undefined') {
          storage.removeItem(key)
          setState(undefined)
        } else if (isFunction<IFuncUpdater<T>>(value)) {
          const previousState = getStoredValue()
          const currentState = value(previousState)
          storage.setItem(key, JSON.stringify(currentState))
          setState(currentState)
        } else {
          storage.setItem(key, JSON.stringify(value))
          setState(value)
        }
      },
      [key],
    )

    return [state, updateState]
  }

  if (!nullishStorage) {
    return function (_: string, defaultValue: any) {
      return [
        isFunction<IFuncUpdater<any>>(defaultValue) ? defaultValue() : defaultValue,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
      ]
    } as typeof useStorageState
  }
  return useStorageState
}

export const useStorageState = createUseStorageState(typeof window === 'object' ? window.localStorage : null)

export const useStoragedUserId = () => {
  const [userId] = useStorageState<string>('__USER_ID__', nanoid())
  return userId
}
