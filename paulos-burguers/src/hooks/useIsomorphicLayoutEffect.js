import { useEffect, useLayoutEffect } from 'react'

/** Evita o warning de useLayoutEffect caso a página seja pré-renderizada. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
