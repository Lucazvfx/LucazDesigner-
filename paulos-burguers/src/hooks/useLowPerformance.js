import { useEffect, useState } from 'react'

/**
 * Heurística conservadora para desligar o pin em aparelhos fracos.
 * Nenhum sinal isolado decide: só contamos como "fraco" quando o aparelho
 * é touch/pequeno E tem pouca memória ou poucos núcleos.
 */
export function useLowPerformance() {
  const [low, setLow] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const isSmall = window.matchMedia('(max-width: 480px)').matches
    const memory = navigator.deviceMemory ?? 8
    const cores = navigator.hardwareConcurrency ?? 8
    const saveData = navigator.connection?.saveData === true

    setLow(saveData || ((isTouch || isSmall) && (memory <= 4 || cores <= 4)))
  }, [])

  return low
}
