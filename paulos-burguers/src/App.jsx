import { Navbar } from './components/layout/Navbar'
import { SiteFooter } from './components/layout/SiteFooter'
import { OrderFab } from './components/layout/OrderFab'
import { ExplodedBurgerHero } from './components/hero/ExplodedBurgerHero'
import { MenuSection } from './components/sections/MenuSection'
import { LocationsSection } from './components/sections/LocationsSection'
import { SocialProofSection } from './components/sections/SocialProofSection'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <ExplodedBurgerHero />
        <MenuSection />
        <LocationsSection />
        <SocialProofSection />
      </main>
      <SiteFooter />
      <OrderFab />
    </>
  )
}
