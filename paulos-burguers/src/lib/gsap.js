import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// force3D promove as camadas para a GPU e evita repaint durante o pin.
gsap.defaults({ ease: 'power2.out', force3D: true })

// Em mobile a barra de endereço muda a altura do viewport durante o scroll.
// Sem isso o ScrollTrigger recalcula tudo e o pin "pula".
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
