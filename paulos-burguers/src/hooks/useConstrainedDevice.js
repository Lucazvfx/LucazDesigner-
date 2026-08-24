import { useEffect, useState } from 'react'

/**
 * Só desliga a animação diante de um sinal explícito do usuário ou de um
 * aparelho comprovadamente de entrada.
 *
 * NÃO use `hardwareConcurrency` aqui: o Safari do iPhone reporta 4 núcleos,
 * então qualquer regra baseada nisso desliga a animação justamente nos
 * aparelhos em que ela precisa funcionar. Celular moderno aguenta o pin.
 */
export function useConstrainedDevice() {
  const [constrained, setConstrained] = useState(false)

  useEffect(() => {
    // Escolha explícita do usuário: economia de dados. Um vídeo de 3 MB é
    // justamente o que ele está pedindo para não baixar.
    const saveData = navigator.connection?.saveData === true

    // `deviceMemory` só existe em navegadores Chromium e vem arredondado;
    // 2 GB ou menos é aparelho de entrada de verdade, não um iPhone.
    const tinyMemory =
      typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2

    setConstrained(saveData || tinyMemory)
  }, [])

  return constrained
}
