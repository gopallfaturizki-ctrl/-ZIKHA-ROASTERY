import { getSiteContent } from '@/lib/markdown'
import { Storefront } from '@/components/Storefront'

export default async function HomePage() {
  const { config, about, services, products, articles } = getSiteContent()

  return <Storefront config={config} about={about} services={services} products={products} articles={articles} />
}
